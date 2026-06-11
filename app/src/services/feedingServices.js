import { doc, getDoc, setDoc, updateDoc, db, onSnapshot } from "./firebase";

const feedingServices = {
  async saveSchedules(scheduleArray) {
    try {
      // Add ID formatting like "sched1", "sched2", ...
      const formatted = scheduleArray.map((item, index) => ({
        ...item,
        id: `sched${index + 1}`,
      }));

      await updateDoc(doc(db, "poultry_DB", "feeding_system"), {
        feeding_schedule: formatted,
      });
    } catch (error) {
      console.error("Error saving schedules:", error);
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
        return {
          feed_level_1: parseFloat(data.feed_level_1 ?? "0"),
          feed_level_2: parseFloat(data.feed_level_2 ?? "0"),
          feed_level_3: parseFloat(data.feed_level_3 ?? "0"),
        };
      } else {
        errorAlert("Warning!", "No feeding data found.");
        return { feed_level_1: 0, feed_level_2: 0, feed_level_3: 0 };
      }
    } catch (error) {
      errorAlert("Error!", `Failed to fetch feeding data: ${error}`);
      return { feed_level_1: 0, feed_level_2: 0, feed_level_3: 0 };
    }
  },
};

export default feedingServices;
