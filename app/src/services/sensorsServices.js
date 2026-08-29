import {
  db,
  deleteField,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "./firebase";
import { successAlert, confirmAlert, errorAlert } from "./alertServices";
import logs from "./logsServices.js";

const sensorsServices = {
  // GET Water Level
  async getWaterQuantity() {
    try {
      const docSnap = await getDoc(doc(db, "poultry_DB", "watering_system"));
      return docSnap.exists() ? docSnap.data().water_quantity : 0;
    } catch (error) {
      console.error("Error fetching water quantity:", error);
      return 0;
    }
  },

  listenForWaterQuantity(callback) {
    const docRef = doc(db, "poultry_DB", "watering_system");
    return onSnapshot(
      docRef,
      (docSnap) => {
        const waterQuantity = docSnap.exists()
          ? docSnap.data().water_quantity
          : 0;
        callback(waterQuantity);
      },
      (error) => {
        console.error("Realtime water quantity listener error:", error);
        callback(0); // Default value on error
      }
    );
  },

  async getTemperatures() {
    try {
      const docSnap = await getDoc(
        doc(db, "poultry_DB", "environmental_monitoring")
      );
      if (docSnap.exists()) {
        const data = docSnap.data();
        const temps = {};
        Object.keys(data).forEach((key) => {
          if (/^temp\d+$/.test(key)) {
            temps[key] = parseFloat(data[key]) || 0;
          }
        });
        return temps;
      } else {
        console.warn("No temperature data found.");
        return {};
      }
    } catch (error) {
      console.error("Error fetching temperatures:", error);
      return {};
    }
  },

  listenForTemperatures(callback) {
    const docRef = doc(db, "poultry_DB", "environmental_monitoring");
    return onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const temps = {};
          Object.keys(data).forEach((key) => {
            if (/^temp\d+$/.test(key)) {
              temps[key] = parseFloat(data[key]) || 0;
            }
          });
          callback(temps);
        } else {
          callback({});
        }
      },
      (error) => {
        console.error("Realtime temperature listener error:", error);
        callback({});
      }
    );
  },

  async getHumidity() {
    try {
      const docSnap = await getDoc(
        doc(db, "poultry_DB", "environmental_monitoring")
      );
      if (docSnap.exists()) {
        const data = docSnap.data();
        const hums = {};
        Object.keys(data).forEach((key) => {
          if (/^hum\d+$/.test(key)) {
            hums[key] = parseFloat(data[key]) || 0;
          }
        });
        return hums;
      } else {
        console.warn("No humidity data found.");
        return {};
      }
    } catch (error) {
      console.error("Error fetching humidity:", error);
      return {};
    }
  },

  listenForHumidity(callback) {
    const docRef = doc(db, "poultry_DB", "environmental_monitoring");
    return onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const hums = {};
          Object.keys(data).forEach((key) => {
            if (/^hum\d+$/.test(key)) {
              hums[key] = parseFloat(data[key]) || 0;
            }
          });
          callback(hums);
        } else {
          callback({});
        }
      },
      (error) => {
        console.error("Realtime humidity listener error:", error);
        callback({});
      }
    );
  },

  async getAirQuality() {
    try {
      const docRef = doc(db, "poultry_DB", "environmental_monitoring");
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        console.warn("No air quality data found.");
        return {};
      }

      const data = docSnap.data();
      const air = {};

      Object.keys(data).forEach((key) => {
        if (/^air\d+$/.test(key)) {
          air[key] = parseFloat(data[key]) || "Sensor Error";
        }
      });

      return air;
    } catch (error) {
      console.error("Error fetching air quality:", error);
      return {};
    }
  },

  listenForAirQuality(callback) {
    const docRef = doc(db, "poultry_DB", "environmental_monitoring");

    return onSnapshot(
      docRef,
      (docSnap) => {
        if (!docSnap.exists()) {
          callback({});
          return;
        }

        const data = docSnap.data();
        const air = {};

        Object.keys(data).forEach((key) => {
          if (/^air\d+$/.test(key)) {
            air[key] = parseFloat(data[key]) || "Sensor Error";
          }
        });

        callback(air);
      },
      (error) => {
        console.error("Realtime air quality listener error:", error);
        callback({});
      }
    );
  },

  async deleteSensor(displayName) {
    let sensorKeys = [];

    if (displayName.includes("Temperature Sensor")) {
      const number = displayName.replace(/\D/g, "");
      sensorKeys = [`temp${number}`, `hum${number}`]; // Delete both temp and hum with same number
    } else if (displayName.includes("Air Quality Sensor")) {
      const number = displayName.replace(/\D/g, "");
      sensorKeys = [`air${number}`];
    } else {
      errorAlert("Error!", "Unknown sensor type.");
      return false;
    }

    const result = await confirmAlert(
      "Delete Sensor?",
      `Are you sure you want to permanently remove "${displayName}"? This action cannot be undone.`,
      "Yes, delete it",
      "Cancel",
      {
        icon: "warning",
        confirmButtonColor: "#d33",
      }
    );

    if (!result.isConfirmed) return false;

    try {
      const docRef = doc(db, "poultry_DB", "environmental_monitoring");

      // Construct update object
      const updates = {};
      sensorKeys.forEach((key) => {
        updates[key] = deleteField();
      });

      await updateDoc(docRef, updates);

      await logs.recordLogs({
        action: "DELETE",
        description: `"${displayName}" and related sensors removed from the system.`,
      });

      successAlert("Deleted!", `"${displayName}" has been removed.`);
      return true;
    } catch (error) {
      errorAlert("Error!", `Failed to delete sensor: ${error.message}`);
      return false;
    }
  },
};

export default sensorsServices;
