import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

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
};

export default reportsServices;
