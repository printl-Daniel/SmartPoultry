import { doc, getDoc, setDoc, updateDoc, db, onSnapshot } from "./firebase";
import { successAlert, errorAlert } from "./alertServices.js";

const wateringServices = {
  async saveSchedules(scheduleArray) {
    try {
      const formatted = scheduleArray.map((item, index) => ({
        ...item,
        id: `sched${index + 1}`,
      }));

      await updateDoc(doc(db, "poultry_DB", "watering_system"), {
        watering_schedule: formatted,
      });
      successAlert("Success", "Schedule changes applied successfully");
    } catch (error) {
      console.error("Error saving schedules:", error);
      errorAlert("Error", "Failed to save watering schedules");
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

  async saveCleaningSchedule(newCleaningSched) {
    try {
      const ref = doc(db, "poultry_DB", "watering_system");
      await setDoc(
        ref,
        { cleaning_schedule: newCleaningSched },
        { merge: true }
      );
      successAlert("Success", "Cleaning schedule saved successfully");
    } catch (error) {
      console.error("Error saving cleaning schedule:", error);
      errorAlert("Error", "Failed to save cleaning schedule");
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
