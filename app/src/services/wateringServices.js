import { doc, getDoc, setDoc, updateDoc, db, onSnapshot } from "./firebase";
import { successAlert, errorAlert, infoAlert } from "./alertServices.js";
import logs from "./logsServices";

// Define mode durations (in milliseconds) based on your previous calculations.
const modeDurations = {
  "Refill mini tanks": 585000, // 525000 + 60000 = ~9 minutes 45 seconds
  "Refill mini tanks + Mix the water + Water the chickens": 1410000, // 1350000 + 60000 = ~23 minutes 30 seconds
  "Refill mini tanks + Mix the water": 645000, // 585000 + 60000 = ~10 minutes 45 seconds
  "Mix the water + Water the chickens": 420000, // 360000 + 60000 = 7 minutes
  Dispense: 300000, // 240000 + 60000 = 5 minutes
  "Water the chickens": 120000, // 60000 + 60000  = 2 minutes
};

const wateringServices = {
  async saveSchedules(scheduleArray) {
    try {
      // Assume the watering schedules are for today.
      const today = new Date();

      // Process each schedule from the UI.
      const schedulesWithComputedTimes = scheduleArray.map((item) => {
        // Generate a Date object from item.rawTime (e.g., "14:24") for today.
        const [hours, minutes] = item.rawTime.split(":").map(Number);
        const startTime = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          hours,
          minutes,
          0
        );
        return { ...item, startTime };
      });

      // Sort watering schedules by computed startTime.
      schedulesWithComputedTimes.sort((a, b) => a.startTime - b.startTime);

      // Validate each watering schedule.
      for (let i = 0; i < schedulesWithComputedTimes.length; i++) {
        const curr = schedulesWithComputedTimes[i];

        // Ensure the mode is recognized.
        if (!modeDurations[curr.mode]) {
          throw new Error(`Unknown mode: ${curr.mode}`);
        }

        // Set the duration for the mode.
        curr.duration = modeDurations[curr.mode];
        // Compute the scheduled endTime.
        curr.endTime = new Date(curr.startTime.getTime() + curr.duration);

        // Check for overlaps with the next watering schedule.
        if (i < schedulesWithComputedTimes.length - 1) {
          const nextSchedule = schedulesWithComputedTimes[i + 1];
          const currEndFormatted = curr.endTime.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });
          const nextStartFormatted = nextSchedule.startTime.toLocaleTimeString(
            "en-US",
            {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }
          );

          const durationMinutes = Math.floor(curr.duration / 60000);
          const durationSeconds = Math.round((curr.duration % 60000) / 1000);
          const modeDurationFriendly =
            durationSeconds > 0
              ? `${durationMinutes} minutes and ${durationSeconds} seconds`
              : `${durationMinutes} minutes`;

          if (nextSchedule.startTime < curr.endTime) {
            throw new Error(
              `Oops! There's a scheduling conflict: Schedule "${
                curr.id
              }" using mode "${
                curr.mode
              }" runs for approximately ${modeDurationFriendly} and ends at ${currEndFormatted}. However, the next schedule ${
                nextSchedule.id || `"(next schedule)"`
              } starts at ${nextStartFormatted}. Please adjust this schedule to begin after ${currEndFormatted}.`
            );
          }
          curr.availableInterval = nextSchedule.startTime - curr.endTime;
        } else {
          curr.availableInterval = null;
        }
      }

      // Retrieve the current cleaning schedule (if any).
      const ref = doc(db, "poultry_DB", "watering_system");
      const docSnap = await getDoc(ref);
      let existingCleaning = null;
      if (docSnap.exists() && docSnap.data().cleaning_schedule) {
        existingCleaning = docSnap.data().cleaning_schedule;
      }

      // If a cleaning schedule exists, make sure no watering schedule overlaps its window.
      if (existingCleaning) {
        const cleaningStart = new Date(existingCleaning.startTime);
        const cleaningEnd = new Date(existingCleaning.endTime);
        const cleaningStartFormatted = cleaningStart.toLocaleTimeString(
          "en-US",
          {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }
        );
        const cleaningEndFormatted = cleaningEnd.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        for (const ws of schedulesWithComputedTimes) {
          if (ws.startTime < cleaningEnd && ws.endTime > cleaningStart) {
            throw new Error(
              `Oops! The watering schedule "${
                ws.id
              }" (from ${ws.startTime.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })} to ${ws.endTime.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}) overlaps with the cleaning schedule set from ${cleaningStartFormatted} to ${cleaningEndFormatted}. Please adjust one of these schedules.`
            );
          }
        }
      }

      // Format the computed watering schedule times as ISO strings.
      const formattedSchedules = schedulesWithComputedTimes.map((item) => ({
        ...item,
        startTime: item.startTime.toISOString(),
        endTime: item.endTime.toISOString(),
      }));

      // Save the watering schedules to Firestore.
      await updateDoc(ref, {
        watering_schedule: formattedSchedules,
      });

      // Log the update.
      await logs.recordLogs({
        action: "CREATE",
        description: `Updated watering schedule with ${
          scheduleArray.length
        } entr${scheduleArray.length === 1 ? "y" : "ies"}: ${scheduleArray
          .map((item) => `${item.rawTime} (${item.mode})`)
          .join(", ")}`,
      });

      successAlert("Success", "Schedule changes applied successfully");
    } catch (error) {
      console.error("Error saving schedules:", error);
      infoAlert("Error", "Failed to save watering schedules: " + error.message);
    }
  },

  async saveCleaningSchedule(newCleaningSched) {
    try {
      const ref = doc(db, "poultry_DB", "watering_system");
      // Set the cleaning routine duration to 17 minutes.
      const CLEANING_DURATION = 17 * 60000;

      // Build the cleaning start time using nextCleaningDate and cleaningTime.
      const cleaningStartTime = new Date(
        `${newCleaningSched.nextCleaningDate}T${newCleaningSched.cleaningTime}:00`
      );
      const cleaningEndTime = new Date(
        cleaningStartTime.getTime() + CLEANING_DURATION
      );

      // Use today's date as the last cleaning date, formatted as "Jun 10, 2025".
      const today = new Date();
      const lastCleaningDate = today.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      // Retrieve existing watering schedules to check for overlaps.
      const docSnap = await getDoc(ref);
      let wateringSchedules = [];
      if (docSnap.exists() && docSnap.data().watering_schedule) {
        wateringSchedules = docSnap.data().watering_schedule;
      }

      // Check each watering schedule for overlap with the cleaning window.
      for (const ws of wateringSchedules) {
        const wateringStart = new Date(ws.startTime);
        const wateringEnd = new Date(ws.endTime);
        if (
          cleaningStartTime < wateringEnd &&
          cleaningEndTime > wateringStart
        ) {
          const wateringStartFormatted = wateringStart.toLocaleTimeString(
            "en-US",
            {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }
          );
          const wateringEndFormatted = wateringEnd.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });
          const cleaningStartFormatted = cleaningStartTime.toLocaleTimeString(
            "en-US",
            {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }
          );
          const cleaningEndFormatted = cleaningEndTime.toLocaleTimeString(
            "en-US",
            {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }
          );
          throw new Error(
            `Oops! Your cleaning schedule, set from ${cleaningStartFormatted} to ${cleaningEndFormatted} (lasting 17 minutes), overlaps with a watering schedule from ${wateringStartFormatted} to ${wateringEndFormatted}. Please adjust your cleaning schedule.`
          );
        }
      }

      // Build the cleaning schedule object in the desired format.
      const updatedCleaningSched = {
        cleaningTime: newCleaningSched.cleaningTime, // the HH:mm time string
        cleaningType: newCleaningSched.cleaningType || "Clean",
        duration: CLEANING_DURATION,
        startTime: cleaningStartTime.toISOString(),
        endTime: cleaningEndTime.toISOString(),
        lastCleaningDate: lastCleaningDate,
        nextCleaningDate: newCleaningSched.nextCleaningDate,
      };

      // Save the cleaning schedule (merge into the existing Firestore document).
      await setDoc(
        ref,
        { cleaning_schedule: updatedCleaningSched },
        { merge: true }
      );

      // Log the update.
      await logs.recordLogs({
        action: "CREATE",
        description: `Scheduled a ${updatedCleaningSched.cleaningType.toLowerCase()} cleaning on ${
          updatedCleaningSched.nextCleaningDate
        } at ${updatedCleaningSched.cleaningTime} for 17 minutes.`,
      });

      successAlert("Success", "Cleaning schedule saved successfully");
    } catch (error) {
      console.error("Error saving cleaning schedule:", error);
      errorAlert("Error", "Failed to save cleaning schedule: " + error.message);
    }
  },

  async getWaterSchedule() {
    try {
      const docRef = doc(db, "poultry_DB", "watering_system");
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data().watering_schedule || [] : [];
    } catch (error) {
      console.error("Error fetching watering schedule:", error);
      errorAlert("Error", "Failed to load watering schedule");
      return [];
    }
  },

  async getCleaningSchedule() {
    try {
      const ref = doc(db, "poultry_DB", "watering_system");
      const snap = await getDoc(ref);
      return snap.exists() ? snap.data().cleaning_schedule || {} : {};
    } catch (error) {
      console.error("Error fetching cleaning schedule:", error);
      errorAlert("Error", "Failed to load cleaning schedule");
      return {};
    }
  },

  async getMainPumpStatus() {
    try {
      const ref = doc(db, "poultry_DB", "watering_system");
      const snap = await getDoc(ref);
      return snap.exists() ? !!snap.data().main_pump_status : false;
    } catch (error) {
      console.error("Error getting main pump status:", error);
      errorAlert("Error", "Failed to retrieve pump status");
      return false;
    }
  },

  listenForMainPump(callback) {
    const ref = doc(db, "poultry_DB", "watering_system");
    return onSnapshot(
      ref,
      (snap) => {
        const value = snap.exists() ? !!snap.data().main_pump_status : false;
        callback(value);
      },
      (error) => {
        console.error("Listener error:", error);
        errorAlert("Error", "Real-time pump status updates unavailable");
      }
    );
  },

  async getMixerStatus() {
    try {
      const ref = doc(db, "poultry_DB", "watering_system");
      const snap = await getDoc(ref);
      return snap.exists() ? !!snap.data().mixer_system_status : false;
    } catch (error) {
      console.error("Error getting mixer system status:", error);
      errorAlert("Error", "Failed to retrieve mixer status");
      return false;
    }
  },

  listenForMixer(callback) {
    const ref = doc(db, "poultry_DB", "watering_system");
    return onSnapshot(
      ref,
      (snap) => {
        const value = snap.exists() ? !!snap.data().mixer_system_status : false;
        callback(value);
      },
      (error) => {
        console.error("Listener error:", error);
        errorAlert("Error", "Real-time mixer status updates unavailable");
      }
    );
  },
};

export default wateringServices;
