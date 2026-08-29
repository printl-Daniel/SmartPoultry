import { doc, getDoc, updateDoc, db, deleteField } from "./firebase";
import { successAlert, errorAlert, confirmAlert } from "./alertServices.js";
import logs from "./logsServices.js";

const feedingServices = {
  async saveSchedules(scheduleArray) {
    try {
      // Use today's date for constructing the schedule times.
      const today = new Date();

      // Compute schedules with the following fields:
      //   - id e.g. "sched1", "sched2", etc.
      //   - startTime computed from rawTime (e.g., "14:20") using today's date.
      //   - Parse the feeding duration from the amount string and add an extra gap of 1 minute.
      //   - Compute the endTime.
      const computedSchedules = scheduleArray.map((item, index) => {
        const id = `sched${index + 1}`;
        // Create a Date object from rawTime (e.g., "14:20") using today's date.
        const [hours, minutes] = item.rawTime.split(":").map(Number);
        const startTime = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          hours,
          minutes,
          0
        );

        // Parse the duration from the amount string (e.g., "1 minutes").
        // Add an extra 1 minute for processing. (So "1 minutes" becomes 2 minutes.)
        const parsedMinutes = parseInt(item.amount.split(" ")[0]);
        const effectiveMinutes = parsedMinutes + 1; // extra 1-minute gap
        const durationMs = effectiveMinutes * 60000; // convert minutes to milliseconds

        // Calculate the endTime.
        const endTime = new Date(startTime.getTime() + durationMs);

        return {
          ...item,
          id,
          startTime, // used for internal checks
          endTime, // used for internal checks
          duration: durationMs, // optional: duration in ms
        };
      });

      // Sort the schedules by their computed startTime.
      computedSchedules.sort((a, b) => a.startTime - b.startTime);

      // Validate that scheduled times do not overlap.
      for (let i = 0; i < computedSchedules.length - 1; i++) {
        const current = computedSchedules[i];
        const next = computedSchedules[i + 1];
        if (next.startTime < current.endTime) {
          const currentEndFormatted = current.endTime.toLocaleTimeString(
            "en-US",
            {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }
          );
          const nextStartFormatted = next.startTime.toLocaleTimeString(
            "en-US",
            {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }
          );
          throw new Error(
            `Oops! There's a scheduling conflict: Schedule "${current.id}" finishes at ${currentEndFormatted}, but Schedule "${next.id}" starts at ${nextStartFormatted}. Please adjust the start time of "${next.id}" to be exactly ${currentEndFormatted} (after the 1-minute gap).`
          );
        }
      }

      // Format the computed start and end times as ISO strings for storage in Firestore.
      const formatted = computedSchedules.map((item) => ({
        ...item,
        startTime: item.startTime.toISOString(),
        endTime: item.endTime.toISOString(),
      }));

      // Build a user-friendly log message for the feeding schedule.
      const friendlyLogMessage =
        "Feeding schedule created successfully: " +
        formatted
          .map(
            (item) =>
              `${item.id} from ${new Date(item.startTime).toLocaleTimeString(
                "en-US",
                {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                }
              )} to ${new Date(item.endTime).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}`
          )
          .join("; ");

      // Record a log entry using a user-friendly message.
      await logs.recordLogs({
        action: "CREATE",
        description: friendlyLogMessage,
      });

      // Save the feeding schedule to Firestore (under the "feeding_system" document).
      await updateDoc(doc(db, "poultry_DB", "feeding_system"), {
        feeding_schedule: formatted,
      });

      // Provide a friendly success message.
      successAlert(
        "Success",
        "Your feeding schedule has been saved successfully!"
      );
    } catch (error) {
      console.error("Error saving schedules:", error);
      errorAlert("Error", "Failed to save feeding schedules: " + error.message);
    }
  },

  async getFeedSchedule() {
    try {
      const docRef = doc(db, "poultry_DB", "feeding_system");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data().feeding_schedule || [];
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error fetching feeding schedule:", error);
      return [];
    }
  },

  async getFeeding() {
    try {
      const feedRef = doc(db, "poultry_DB", "feeding_system");
      const snapshot = await getDoc(feedRef);

      if (snapshot.exists()) {
        const data = snapshot.data();
        const feedingData = {};

        for (const key in data) {
          if (key.startsWith("feed_level_")) {
            feedingData[key] = parseFloat(data[key] ?? "0");
          }
        }

        return feedingData;
      } else {
        errorAlert("Warning!", "No feeding data found.");
        return {};
      }
    } catch (error) {
      errorAlert("Error!", `Failed to fetch feeding data: ${error}`);
      return {};
    }
  },

  async deleteFeedZone(displayName) {
    const number = displayName.replace(/\D/g, "");
    const feedKey = `feed_level_${number}`;

    const result = await confirmAlert(
      "Delete Feed Zone?",
      `Are you sure you want to delete "${displayName}"?`,
      "Delete",
      "Cancel"
    );

    if (!result.isConfirmed) return false;

    try {
      const docRef = doc(db, "poultry_DB", "feeding_system");
      await updateDoc(docRef, {
        [feedKey]: deleteField(),
      });

      await logs.recordLogs({
        action: "DELETE",
        description: `Feed zone "${displayName}" removed.`,
      });

      successAlert("Deleted!", `"${displayName}" has been removed.`);
      return true;
    } catch (error) {
      errorAlert("Error!", `Failed to delete feed zone: ${error.message}`);
      return false;
    }
  },
};

export default feedingServices;
