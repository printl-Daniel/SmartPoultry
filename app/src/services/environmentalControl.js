import { doc, getDoc, setDoc, db } from "./firebase";
import { successAlert, errorAlert } from "./alertServices.js";
import logs from "./logsServices.js";

const environment = {
  // ✅ Set Temperature Goal
  async setTemperatureGoal(newTempGoal) {
    try {
      const refTempGoal = doc(db, "poultry_DB", "environmental_monitoring");
      await setDoc(refTempGoal, { temp_goal: newTempGoal }, { merge: true });
      await logs.recordLogs({
        action: "CONFIG",
        description: `Set new temperature goal: ${newTempGoal}`,
      });

      successAlert(
        "Success!",
        `Temperature goal updated successfully: ${newTempGoal}`
      );
    } catch (error) {
      errorAlert("Error!", `Error updating temperature goal: ${error}`);
    }
  },

  // ✅ Get Temperature Goal
  async getTemperatureGoal() {
    try {
      const refTempGoal = doc(db, "poultry_DB", "environmental_monitoring");
      const snapshot = await getDoc(refTempGoal);
      return snapshot.exists() ? snapshot.data().temp_goal ?? 0 : 0;
    } catch (error) {
      errorAlert("Error!", `Error getting temperature goal: ${error}`);
      return 0;
    }
  },

  // ✅ Set Humidity Goal
  async setHumidityGoal(newHumidityGoal) {
    try {
      const refHumidityGoal = doc(db, "poultry_DB", "environmental_monitoring");
      await setDoc(
        refHumidityGoal,
        { hum_goal: newHumidityGoal },
        { merge: true }
      );

      await logs.recordLogs({
        action: "CONFIG",
        description: `Set new humidity goal: ${newHumidityGoal}`,
      });

      successAlert(
        "Success!",
        `Humidity goal updated successfully: ${newHumidityGoal}`
      );
    } catch (error) {
      errorAlert("Error!", `Error updating humidity goal: ${error}`);
    }
  },

  // ✅ Get Humidity Goal
  async getHumidityGoal() {
    try {
      const refHumidityGoal = doc(db, "poultry_DB", "environmental_monitoring");
      const snapshot = await getDoc(refHumidityGoal);
      return snapshot.exists() ? snapshot.data().hum_goal ?? 0 : 50;
    } catch (error) {
      errorAlert("Error!", `Error getting humidity goal: ${error}`);
      return 50;
    }
  },

  // ✅ Set Air Quality Goal
  async setAirQualityGoal(newAirGoal) {
    try {
      const refAirGoal = doc(db, "poultry_DB", "environmental_monitoring");
      await setDoc(refAirGoal, { air_goal: newAirGoal }, { merge: true });

      await logs.recordLogs({
        action: "CONFIG",
        description: `Set new air quality goal: ${newAirGoal}`,
      });

      successAlert(
        "Success!",
        `Air quality goal updated successfully: ${newAirGoal}`
      );
    } catch (error) {
      errorAlert("Error!", `Error updating air quality goal: ${error}`);
    }
  },

  // ✅ Get Air Quality Goal
  async getAirQualityGoal() {
    try {
      const refAirGoal = doc(db, "poultry_DB", "environmental_monitoring");
      const snapshot = await getDoc(refAirGoal);
      return snapshot.exists() ? snapshot.data().air_goal ?? 100 : 100;
    } catch (error) {
      errorAlert("Error!", `Error getting air quality goal: ${error}`);
      return 100;
    }
  },

  // ✅ Get Heating Lamp Status
  async getHeatingSettings() {
    try {
      const bulbRef = doc(db, "poultry_DB", "actuators");
      const snapshot = await getDoc(bulbRef);

      if (snapshot.exists()) {
        const bulbValue = snapshot.data().bulb;
        return bulbValue === "true";
      } else {
        return false;
      }
    } catch (error) {
      errorAlert("Error!", `Error getting heating lamp status: ${error}`);
      return false;
    }
  },

  async getExhaustStatus() {
    try {
      const exhaustRef = doc(db, "poultry_DB", "actuators");
      const snapshot = await getDoc(exhaustRef);

      if (snapshot.exists()) {
        const exhaustData = snapshot.data();
        const exhaustStatus = {};

        for (const key in exhaustData) {
          if (key.startsWith("ex")) {
            exhaustStatus[key] = exhaustData[key] === "true";
          }
        }

        return exhaustStatus;
      } else {
        errorAlert("Warning!", "No exhaust status found in Firestore.");
        return {};
      }
    } catch (error) {
      errorAlert("Error!", `Error fetching exhaust status: ${error}`);
      return {};
    }
  },
};

export default environment;
