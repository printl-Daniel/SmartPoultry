import { doc, getDoc, setDoc, db } from "./firebase";
import { successAlert, errorAlert } from "./alertServices.js";

const environment = {
  // ✅ Set Temperature Goal
  async setTemperatureGoal(newTempGoal) {
    try {
      const refTempGoal = doc(db, "poultry_DB", "environmental_monitoring");
      await setDoc(refTempGoal, { temp_goal: newTempGoal }, { merge: true });

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
      return snapshot.exists() ? snapshot.data().temp_goal ?? 0 : 0; // Default: 0°C
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

      return snapshot.exists() ? snapshot.data().hum_goal ?? 0 : 0; // Default: 50%
    } catch (error) {
      errorAlert("Error!", `Error getting humidity goal: ${error}`);
      return 50;
    }
  },

  // ✅ Get Heating Lamp Status
  async getHeatingSettings() {
    try {
      const bulbRef = doc(db, "poultry_DB", "actuators");
      const snapshot = await getDoc(bulbRef);

      if (snapshot.exists()) {
        const bulbValue = snapshot.data().bulb;
        return bulbValue === "true"; // Convert string to boolean
      } else {
        return false; // Default: Off
      }
    } catch (error) {
      errorAlert("Error!", `Error getting heating lamp status: ${error}`);
      return false;
    }
  },

  // ✅ Set Ventilation Settings
  async setVentilationSettings(fanStates) {
    try {
      const fansRef = doc(db, "poultry_DB", "actuators");
      await setDoc(fansRef, fanStates, { merge: true });

      successAlert(
        "Success!",
        `Ventilation settings updated successfully: ${JSON.stringify(
          fanStates
        )}`
      );
    } catch (error) {
      errorAlert("Error!", `Error updating ventilation settings: ${error}`);
      throw error;
    }
  },

  // ✅ Get Exhaust Status
  async getExhaustStatus() {
    try {
      const exhaustRef = doc(db, "poultry_DB", "actuators");
      const snapshot = await getDoc(exhaustRef);

      if (snapshot.exists()) {
        const exhaustData = snapshot.data();

        return {
          ex1: exhaustData?.ex1 === "true",
          ex2: exhaustData?.ex2 === "true",
        };
      } else {
        errorAlert("Warning!", "No exhaust status found in Firestore.");
        return { ex1: false, ex2: false }; // Default values
      }
    } catch (error) {
      errorAlert("Error!", `Error fetching exhaust status: ${error}`);
      return { ex1: false, ex2: false };
    }
  },
};

export default environment;
