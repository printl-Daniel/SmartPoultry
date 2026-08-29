import { db, doc, getDoc, updateDoc, setDoc } from "./firebase";
import { successAlert, errorAlert } from "./alertServices.js";
import email from "./emailServices.js"; // Your email sender

const logs = {
  async recordLogs({ action, description }) {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (!userData || !userData.name || !userData.role || !userData.email) {
        throw new Error("Missing or invalid user info from localStorage.");
      }

      const logsDocRef = doc(db, "poultry_DB", "system_logs");
      const notificationsRef = doc(db, "poultry_DB", "notifications");

      const now = new Date();
      const formattedDate = now.toLocaleString("en-US", {
        timeZone: "Asia/Manila",
        dateStyle: "medium",
        timeStyle: "medium",
      });

      const logEntry = {
        timestamp: now.toISOString(),
        datetime: formattedDate,
        user: userData.name,
        role: userData.role,
        action,
        description,
      };

      const snapshot = await getDoc(logsDocRef);
      let currentLogs = snapshot.exists() ? snapshot.data().entries || [] : [];

      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth(); // 0 = Jan
      const currentMonthKey = `${currentYear}-${String(
        currentMonth + 1
      ).padStart(2, "0")}`;

      // Keep only logs from this month
      currentLogs = currentLogs.filter((log) => {
        const logDate = new Date(log.timestamp);
        return (
          !isNaN(logDate) &&
          logDate.getFullYear() === currentYear &&
          logDate.getMonth() === currentMonth
        );
      });

      currentLogs.push(logEntry);
      await updateDoc(logsDocRef, { entries: currentLogs });

      // 🔔 Email Reminder Logic (admin only)
      if (userData.role.toLowerCase() === "admin") {
        const daysInMonth = new Date(
          currentYear,
          currentMonth + 1,
          0
        ).getDate();
        const dayOfMonth = now.getDate();
        const notifyThreshold = daysInMonth - 14;

        if (dayOfMonth >= notifyThreshold) {
          // Check Firestore notifications
          const notifSnap = await getDoc(notificationsRef);
          const notifData = notifSnap.exists()
            ? notifSnap.data().log_reminders || {}
            : {};

          const adminEmail = userData.email;
          const notifiedMonths = notifData[adminEmail] || [];

          if (!notifiedMonths.includes(currentMonthKey)) {
            // 📨 Send email
            await email.sendEmail(adminEmail, "Monthly Log Cleanup Reminder", {
              title: "Heads Up: System Log Cleanup Approaching",
              message: `Hello ${userData.name},`,
              text: `Please review or back up logs before the end of this month. Logs are auto-deleted monthly.`,
              footerNote: "Smart Poultry Automation System",
            });

            // Save notification to Firestore
            const updatedMonths = [...notifiedMonths, currentMonthKey];
            await setDoc(
              notificationsRef,
              {
                log_reminders: {
                  ...notifData,
                  [adminEmail]: updatedMonths,
                },
              },
              { merge: true }
            );
          }
        }
      }
    } catch (error) {
      errorAlert("Error recording system logs: " + error.message);
      console.error("❌ Log Error:", error);
    }
  },

  async getAllLogs() {
    try {
      const logsRef = doc(db, "poultry_DB", "system_logs");
      const docSnap = await getDoc(logsRef);

      if (docSnap.exists()) {
        const entries = docSnap.data().entries || [];

        entries.sort((a, b) => {
          const timeA = new Date(a.timestamp || a.createdAt || 0).getTime();
          const timeB = new Date(b.timestamp || b.createdAt || 0).getTime();
          return timeB - timeA;
        });

        return entries;
      } else {
        throw new Error("System logs document not found.");
      }
    } catch (error) {
      console.error("Error fetching logs:", error);
      throw error;
    }
  },
};

export default logs;
