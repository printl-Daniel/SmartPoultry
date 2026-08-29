import { db } from "./firebase";
import { doc, getDocs, getDoc } from "firebase/firestore";
import { format } from "date-fns";

const reportsServices = {
  async fetchAlerts() {
    const docRef = doc(db, "poultry_DB", "logs");
    const snapshot = await getDoc(docRef);
    const data = snapshot.data();

    if (!data) {
      return {
        temperatureAlerts: { day: [], week: [] },
        humidityAlerts: { day: [], week: [] },
      };
    }

    const temperatureDayAlerts = [];
    const temperatureWeekAlerts = [];
    const humidityDayAlerts = [];
    const humidityWeekAlerts = [];

    const currentDate = new Date().toLocaleDateString(); // Get today's date

    const processEntries = (entries, alertType) => {
      entries.forEach((item) => {
        // Skip invalid logs
        if (item.goal === undefined || item.goal === null) return;

        // Firestore timestamp handling
        let dateObj;
        if (item.timestamp?.toDate) {
          dateObj = item.timestamp.toDate();
        } else {
          dateObj = new Date(item.timestamp);
        }

        // Adjust time formatting to remove the leading zero
        const timeLabel = dateObj.toLocaleTimeString([], {
          hour: "numeric", // Remove the leading zero
          minute: "2-digit",
        });

        const dayLabel = dateObj.toLocaleDateString("en-US", {
          weekday: "long",
        });
        const logDate = dateObj.toLocaleDateString(); // Get the log's date

        // Combine day + time for formatted alert
        const dayTime = `${dayLabel} ${timeLabel}`; // e.g., "Thursday 10:30 AM"

        const alert = {
          time: timeLabel,
          value: item.value,
          threshold: item.goal, // threshold corresponds to the goal value
          type: alertType, // "exceed" or "below"
          dayTime, // Add day + time to alert
        };

        // If it's today's date, add to day's alerts
        if (logDate === currentDate) {
          if (item.type === "temperature") {
            temperatureDayAlerts.push(alert);
          }

          if (item.type === "humidity") {
            humidityDayAlerts.push(alert);
          }
        }

        // For weekly alerts, we keep the day but add day + time
        if (item.type === "temperature") {
          temperatureWeekAlerts.push({
            day: `${dayLabel} ${timeLabel}`, // Keep the weekday and time
            value: item.value,
            threshold: item.goal,
            type: alertType,
            dayTime, // Include the day and time string for the week
          });
        }

        if (item.type === "humidity") {
          humidityWeekAlerts.push({
            day: `${dayLabel} ${timeLabel}`, // Keep the weekday and time
            value: item.value,
            threshold: item.goal,
            type: alertType,
            dayTime, // Include the day and time string for the week
          });
        }
      });
    };

    // Process both arrays (below + exceeded)
    if (Array.isArray(data.exceeded)) processEntries(data.exceeded, "exceed");
    if (Array.isArray(data.below)) processEntries(data.below, "below");

    return {
      temperatureAlerts: {
        day: temperatureDayAlerts,
        week: temperatureWeekAlerts,
      },
      humidityAlerts: {
        day: humidityDayAlerts,
        week: humidityWeekAlerts,
      },
    };
  },

  async fetchWaterLevelLogs() {
    const docRef = doc(db, "poultry_DB", "logs");
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      console.log("no data");
      return {
        today: 0,
        yesterday: 0,
        weekAverage: 0,
        unit: "Liters",
        weekly: [],
      };
    }

    const data = snapshot.data();
    const waterLogs = data.waterlevel;

    if (!waterLogs || typeof waterLogs !== "object") {
      console.log("no waterlevel data");
      return {
        today: 0,
        yesterday: 0,
        weekAverage: 0,
        unit: "Liters",
        weekly: [],
      };
    }

    const dayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const valuesByDay = Object.fromEntries(dayOrder.map((d) => [d, []]));

    const now = new Date();
    const todayStr = now.toLocaleDateString();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const yesterdayStr = yesterday.toLocaleDateString();

    let todayTotal = 0;
    let yesterdayTotal = 0;
    let weekTotal = 0;
    let weekCount = 0;

    const last7Days = new Date();
    last7Days.setDate(now.getDate() - 6); // include today

    for (const key in waterLogs) {
      const item = waterLogs[key];
      const value = parseFloat(item.water_level);
      const timestamp = item.timestamp;

      if (isNaN(value) || !timestamp?.seconds) continue;

      const dateObj = new Date(timestamp.seconds * 1000);
      if (dateObj < last7Days) continue;

      const dateStr = dateObj.toLocaleDateString();
      const weekday = dateObj
        .toLocaleDateString("en-US", { weekday: "short" })
        .slice(0, 3);

      if (valuesByDay[weekday]) valuesByDay[weekday].push(value);
      if (dateStr === todayStr) todayTotal += value;
      if (dateStr === yesterdayStr) yesterdayTotal += value;

      weekTotal += value;
      weekCount++;
    }

    const weekly = dayOrder.map((day) => {
      const values = valuesByDay[day];
      const avg =
        values.length > 0
          ? values.reduce((a, b) => a + b, 0) / values.length
          : 0;
      return {
        day,
        value: Math.round(avg * 100) / 100,
      };
    });

    const weekAverage =
      weekCount > 0 ? Math.round((weekTotal / weekCount) * 100) / 100 : 0;

    return {
      today: Math.round(todayTotal * 100) / 100,
      yesterday: Math.round(yesterdayTotal * 100) / 100,
      weekAverage,
      unit: "Liters",
      weekly,
    };
  },

  async fetchFeedLevelLogs() {
    const docRef = doc(db, "poultry_DB", "logs");
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      console.log("no data");
      return [];
    }

    const data = snapshot.data();
    const feedLogs = data.feedlevel;

    if (!Array.isArray(feedLogs)) {
      console.log("no feedlevel data");
      return [];
    }

    const dayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const containerKeys = ["sensor1", "sensor2", "sensor3"];
    const colors = ["#8b5cf6", "#ef4444", "#3b82f6"];
    const containerNames = ["Container A", "Container B", "Container C"];

    // Initialize per-container day-wise arrays
    const valuesByContainer = containerKeys.map(() =>
      Object.fromEntries(dayOrder.map((day) => [day, []]))
    );

    const now = new Date();
    const todayStr = now.toLocaleDateString();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const yesterdayStr = yesterday.toLocaleDateString();

    const last7Days = new Date();
    last7Days.setDate(now.getDate() - 6);

    // Initialize totals
    const todayTotals = [0, 0, 0];
    const yesterdayTotals = [0, 0, 0];
    const weekTotals = [0, 0, 0];
    const weekCounts = [0, 0, 0];

    // Loop through feedlevel logs
    feedLogs.forEach((entry) => {
      const ts = entry.timestamp?.seconds
        ? new Date(entry.timestamp.seconds * 1000)
        : null;
      if (!ts || ts < last7Days) return;

      const dateStr = ts.toLocaleDateString();
      const weekday = ts
        .toLocaleDateString("en-US", { weekday: "short" })
        .slice(0, 3);

      containerKeys.forEach((key, i) => {
        const rawVal = parseFloat(entry[key]);
        if (isNaN(rawVal)) return;

        // Group by weekday
        if (valuesByContainer[i][weekday]) {
          valuesByContainer[i][weekday].push(rawVal);
        }

        if (dateStr === todayStr) todayTotals[i] += rawVal;
        if (dateStr === yesterdayStr) yesterdayTotals[i] += rawVal;

        weekTotals[i] += rawVal;
        weekCounts[i]++;
      });
    });

    // Build final containers data
    const feedContainers = containerKeys.map((_, i) => {
      const weekly = dayOrder.map((day) => {
        const values = valuesByContainer[i][day];
        const avg =
          values.length > 0
            ? Math.round(
                (values.reduce((a, b) => a + b, 0) / values.length) * 100
              ) / 100
            : 0;
        return { day, value: avg };
      });

      const avg =
        weekCounts[i] > 0
          ? Math.round((weekTotals[i] / weekCounts[i]) * 100) / 100
          : 0;

      // Determine status
      let status = "normal";
      if (avg >= 170) status = "high";
      else if (avg <= 125) status = "low";

      return {
        id: i + 1,
        name: containerNames[i],
        today: Math.round(todayTotals[i] * 100) / 100,
        yesterday: Math.round(yesterdayTotals[i] * 100) / 100,
        weekAverage: avg,
        unit: "%",
        status,
        weekly,
        color: colors[i],
      };
    });

    return feedContainers;
  },
};

export default reportsServices;
