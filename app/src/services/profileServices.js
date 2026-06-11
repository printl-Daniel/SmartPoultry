import { updatePassword } from "firebase/auth";
import {
  db,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "./firebase";
function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function generateSalt(length = 16) {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return bufferToHex(array);
}

async function hashPassword(password, salt) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + salt);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return bufferToHex(hashBuffer);
}

const profileServices = {
  async getUser() {
    const userString = localStorage.getItem("user");
    if (!userString) {
      throw new Error("No user found in localStorage");
    }

    const user = JSON.parse(userString);

    try {
      const accountsRef = collection(db, "accounts");
      const q = query(accountsRef, where("email", "==", user.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data();
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error fetching user by email:", error);
      throw error;
    }
  },

  async saveUserProfile(updatedData) {
    const userString = localStorage.getItem("user");
    if (!userString) {
      throw new Error("No user found in localStorage");
    }

    const user = JSON.parse(userString);

    try {
      const accountsRef = collection(db, "accounts");
      const q = query(accountsRef, where("email", "==", user.email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("User not found");
      }

      const userDoc = querySnapshot.docs[0];
      const userDocRef = doc(db, "accounts", userDoc.id);

      await updateDoc(userDocRef, updatedData);
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  },

  async updatePassword(currentPassword, newPassword) {
    const userString = localStorage.getItem("user");

    if (!userString) {
      throw new Error("No user found in localStorage");
    }

    const user = JSON.parse(userString);

    try {
      const accountsRef = collection(db, "accounts");
      const q = query(accountsRef, where("email", "==", user.email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("User not found");
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      // === Step 1: Verify current password ===
      const currentSalt = userData.salt;
      const storedPasswordHash = userData.password;

      const inputPasswordHash = await hashPassword(
        currentPassword,
        currentSalt
      );

      if (inputPasswordHash !== storedPasswordHash) {
        throw new Error("Current password is incorrect");
      }

      // === Step 2: Generate new hash with new salt ===
      const newSalt = generateSalt();
      const newPasswordHash = await hashPassword(newPassword, newSalt);

      // === Step 3: Update Firestore ===
      const userDocRef = doc(db, "accounts", userDoc.id);
      await updateDoc(userDocRef, {
        password: newPasswordHash,
        salt: newSalt,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    }
  },
};

export default profileServices;
