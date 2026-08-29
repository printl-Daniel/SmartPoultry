import {
  db,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "./firebase";
// Import your alert utilities
import { successAlert, errorAlert } from "./alertServices.js";
import logs from "./logsServices.js";

const accounts = {
  // ADD Account
  async addAccount(accountData) {
    try {
      const accountsRef = collection(db, "accounts");

      // Check if email already exists
      const snapshot = await getDocs(accountsRef);
      const emailExists = snapshot.docs.some(
        (docSnap) => docSnap.data().email === accountData.email
      );

      if (emailExists) {
        errorAlert(`Email "${accountData.email}" is already in exist.`);
        return;
      }

      // Generate random temp password
      const generateTempPassword = () => {
        return Math.random().toString(36).slice(-8);
      };
      const tempPassword = generateTempPassword();

      const createdAt = new Date().toISOString(); // Use ISO for consistency

      // Add account data + temp password + context + timestamp
      await addDoc(accountsRef, {
        ...accountData,
        mustChangePassword: true,
        tempPassword: tempPassword,
        tempPasswordFor: "new_account",
        tempPasswordCreatedAt: createdAt,
        createdAt: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      });

      // Send email with temp password
      const emailPayload = {
        to: accountData.email,
        subject: "Your Smart Poultry System Account",
        text: `Your temporary password is: ${tempPassword}`,
        title: "Smart Poultry Account Created",
        message: `Your account has been created successfully.\n\nEmail: ${accountData.email}\nTemporary Password: ${tempPassword}\n\n⚠️ This temporary password will expire in 3 days. If it expires before you use it, please contact the administrator to recreate your account credentials.`,
        footerNote: "Smart Poultry App — Automated System Notification",
      };

      await fetch("https://email-poultry-backend.onrender.com/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailPayload),
      });

      await logs.recordLogs({
        action: "CREATE",
        description: `Created new account for ${accountData.email}`,
      });

      successAlert(
        `Account successfully added!\nTemp password sent to: ${accountData.email}`
      );
    } catch (error) {
      errorAlert("Error adding account: " + error.message);
      console.error(error);
    }
  },

  // GET all accounts (real-time)
  getAccounts(callback) {
    const accountsRef = collection(db, "accounts");

    return onSnapshot(accountsRef, (snapshot) => {
      let accounts = {};
      snapshot.forEach((docSnap) => {
        accounts[docSnap.id] = docSnap.data();
      });
      callback(accounts);
    });
  },

  // UPDATE Account
  async updateAccount(accountId, accountData) {
    try {
      const accountRef = doc(db, "accounts", accountId);
      await updateDoc(accountRef, accountData);

      await logs.recordLogs({
        action: "UPDATE",
        description: `Updated account of ${accountData.email}`,
      });

      successAlert("Account successfully updated!");
    } catch (error) {
      errorAlert("Error updating account: " + error.message);
      console.error(error);
    }
  },

  async deleteAccount(accountId) {
    try {
      const accountRef = doc(db, "accounts", accountId);

      // Get account details first
      const accountSnap = await getDoc(accountRef);
      if (!accountSnap.exists()) {
        throw new Error("Account not found.");
      }

      const accountData = accountSnap.data();
      const userEmail = accountData.email || "Unknown Email";

      // Proceed with deletion
      await deleteDoc(accountRef);

      await logs.recordLogs({
        action: "DELETE",
        description: `Deleted account with email: ${userEmail}`,
      });

      successAlert("Account successfully deleted!");
    } catch (error) {
      errorAlert("Error deleting account: " + error.message);
      console.error(error);
    }
  },

  // GET Account Counts (real-time)
  getAccountCounts(callback) {
    const accountsRef = collection(db, "accounts");

    return onSnapshot(accountsRef, (snapshot) => {
      let total = 0;
      let active = 0;
      let inactive = 0;

      snapshot.forEach((docSnap) => {
        total++;
        const status = docSnap.data().status;
        if (status === "active") active++;
        else if (status === "inactive") inactive++;
      });

      callback({ total, active, inactive });
    });
  },
};

export default accounts;
