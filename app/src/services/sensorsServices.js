import { db, collection, doc, getDoc, onSnapshot, updateDoc } from "./firebase";

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

  // GET Temperatures
  async getTemperatures() {
    try {
      const docSnap = await getDoc(
        doc(db, "poultry_DB", "environmental_monitoring")
      );
      if (docSnap.exists()) {
        return {
          temp1: docSnap.data().temp1 || 0,
          temp2: docSnap.data().temp2 || 0,
        };
      } else {
        console.warn("No temperature data found.");
        return { temp1: 0, temp2: 0 };
      }
    } catch (error) {
      console.error("Error fetching temperatures:", error);
      fee;
      return { temp1: 0, temp2: 0 };
    }
  },

  listenForTemperatures(callback) {
    const docRef = doc(db, "poultry_DB", "environmental_monitoring");
    return onSnapshot(
      docRef,
      (docSnap) => {
        const data = docSnap.exists()
          ? {
              temp1: docSnap.data().temp1 || 0,
              temp2: docSnap.data().temp2 || 0,
            }
          : { temp1: 0, temp2: 0 };
        callback(data);
      },
      (error) => {
        console.error("Realtime temperature listener error:", error);
        callback({ temp1: 0, temp2: 0 }); // Default value on error
      }
    );
  },

  // GET Humidity
  async getHumidity() {
    try {
      const docSnap = await getDoc(
        doc(db, "poultry_DB", "environmental_monitoring")
      );
      if (docSnap.exists()) {
        return {
          hum1: docSnap.data().hum1 || 0,
          hum2: docSnap.data().hum2 || 0,
        };
      } else {
        console.warn("No humidity data found.");
        return { hum1: 0, hum2: 0 };
      }
    } catch (error) {
      console.error("Error fetching humidity:", error);
      return { hum1: 0, hum2: 0 };
    }
  },

  listenForHumidity(callback) {
    const docRef = doc(db, "poultry_DB", "environmental_monitoring");
    return onSnapshot(
      docRef,
      (docSnap) => {
        const data = docSnap.exists()
          ? {
              hum1: docSnap.data().hum1 || 0,
              hum2: docSnap.data().hum2 || 0,
            }
          : { hum1: 0, hum2: 0 };
        callback(data);
      },
      (error) => {
        console.error("Realtime humidity listener error:", error);
        callback({ hum1: 0, hum2: 0 }); // Default value on error
      }
    );
  },

  // GET Air Quality
  async getAirQuality() {
    try {
      const docRef = doc(db, "poultry_DB", "environmental_monitoring");
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        console.warn("No air quality data found.");
        return { mq135_1: "Error", mq135_2: "Error" };
      }
      const data = docSnap.data();
      return {
        mq135_1: data?.mq135_1 ?? "Sensor Error",
        mq135_2: data?.mq135_2 ?? "Sensor Error",
      };
    } catch (error) {
      console.error("Error fetching air quality:", error);
      return { mq135_1: "Error", mq135_2: "Error" };
    }
  },

  // LISTEN for Air Quality Changes
  listenForAirQuality(callback) {
    const docRef = doc(db, "poultry_DB", "environmental_monitoring");

    return onSnapshot(
      docRef,
      (docSnap) => {
        if (!docSnap.exists()) {
          callback({ mq135_1: "Error", mq135_2: "Error" });
          return;
        }
        const data = docSnap.data();
        callback({
          mq135_1: data?.mq135_1 ?? "Sensor Error",
          mq135_2: data?.mq135_2 ?? "Sensor Error",
        });
      },
      (error) => {
        console.error("Realtime air quality listener error:", error);
        callback({ mq135_1: "Error", mq135_2: "Error" }); // Default value on error
      }
    );
  },
};

export default sensorsServices;
