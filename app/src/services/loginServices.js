import {
  db,
  doc,
  deleteField,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "./firebase";
import { auth, googleProvider, signInWithPopup, signOut } from "./firebase";
import {
  successAlert,
  errorAlert,
  infoAlert,
  confirmAlert,
} from "./alertServices.js";
import email from "./emailServices.js";

// --- Utility Functions for User Info ---
const getBrowserInfo = async () => {
  if (navigator.userAgentData) {
    const brands = await navigator.userAgentData.getHighEntropyValues([
      "brands",
    ]);
    const browserName = brands.brands.find((b) =>
      ["Edge", "Brave", "Chrome", "Firefox", "Safari", "Opera"].some((name) =>
        b.brand.includes(name),
      ),
    );
    return browserName ? browserName.brand : "Unknown Browser";
  }

  const userAgent = navigator.userAgent;
  if (navigator.brave) return "Brave";
  if (userAgent.includes("Edg")) return "Microsoft Edge";
  if (userAgent.includes("Chrome")) return "Google Chrome";
  if (userAgent.includes("Safari") && !userAgent.includes("Chrome"))
    return "Safari";
  if (userAgent.includes("Firefox")) return "Mozilla Firefox";
  if (userAgent.includes("Opera") || userAgent.includes("OPR")) return "Opera";
  return "Unknown Browser";
};

const getOSInfo = () => {
  const platform = navigator.platform;
  if (platform.includes("Win")) return "Windows";
  if (platform.includes("Mac")) return "MacOS";
  if (platform.includes("Linux")) return "Linux";
  if (platform.includes("iPhone") || platform.includes("iPad")) return "iOS";
  if (platform.includes("Android")) return "Android";
  return "Unknown OS";
};

const getUserIP = async () => {
  try {
    const res = await fetch("https://api64.ipify.org?format=json");
    const data = await res.json();
    return data.ip || "Unknown IP";
  } catch {
    return "Unknown IP";
  }
};

const getGPSLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            { signal: controller.signal },
          );
          const data = await res.json();
          resolve(data.display_name || `Lat: ${latitude}, Long: ${longitude}`);
        } catch {
          resolve(`Lat: ${latitude}, Long: ${longitude}`);
        } finally {
          clearTimeout(timeoutId);
        }
      },
      (error) => {
        reject(new Error("Location access denied"));
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 },
    );
  });
};

function generateTempPassword(length = 12) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

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

async function sendEmail(to, subject, payload) {
  try {
    await email.sendEmail(to, subject, payload);
  } catch (error) {
    console.error("📧 Failed to send email:", error);
  }
}

// --- Main loginService Object ---
const loginService = {
  saveCredentials(email) {
    localStorage.setItem("rememberedEmail", email);
  },

  clearCredentials() {
    localStorage.removeItem("rememberedEmail");
  },

  async checkUser(email) {
    try {
      const accountsRef = collection(db, "accounts");
      const q = query(accountsRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        errorAlert(
          `Sorry, we couldn't find an account associated with "${email}".`,
        );
        return null;
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      const userRole = userData.role || "caretaker";

      if (userData.mustChangePassword === true) {
        infoAlert("Your account requires a password change before continuing.");
      }

      return {
        userKey: userDoc.id,
        userData: userData,
        userRole,
        requiresSetup: !userData.password || userData.mustChangePassword,
      };
    } catch (error) {
      errorAlert("Error checking user account");
      return null;
    }
  },

  ///
  async loginUser(email, enteredPassword) {
    try {
      const userCheck = await this.checkUser(email);
      if (!userCheck) return { success: false };
      const { userKey, userData } = userCheck;

      // TEMP PASSWORD LOGIN FLOW
      if (userData.tempPassword) {
        const createdAt = userData.tempPasswordCreatedAt;
        const tempType = userData.tempPasswordFor;
        if (createdAt && tempType) {
          const createdTime = new Date(createdAt).getTime();
          const now = Date.now();
          const diffMins = (now - createdTime) / 60000;
          let isExpired = false;
          if (tempType === "new_account" && diffMins > 3 * 24 * 60) {
            isExpired = true;
          } else if (tempType === "reset_password" && diffMins > 5) {
            isExpired = true;
          }
          if (isExpired) {
            errorAlert(
              tempType === "new_account"
                ? "Temporary password expired. Please contact admin to recreate your account credentials."
                : "Temporary password reset expired. Please request a new password reset.",
            );
            return { success: false };
          }
        }
        if (enteredPassword !== userData.tempPassword) {
          errorAlert("Incorrect temporary password.");
          return { success: false };
        }

        infoAlert("Your account requires setting up a permanent password.");
        return {
          success: true,
          userKey,
          requiresSetup: true,
        };
      }

      // NORMAL PASSWORD LOGIN FLOW
      if (userData.password && userData.salt) {
        const hashedInput = await hashPassword(enteredPassword, userData.salt);
        if (hashedInput !== userData.password) {
          errorAlert("Incorrect password.");
          return { success: false };
        }
      } else {
        errorAlert("Account is missing a valid password. Contact admin.");
        return { success: false };
      }

      if (userData.mustChangePassword === true) {
        infoAlert("Your account requires a password change before continuing.");
        return {
          success: true,
          userKey,
          requiresSetup: true,
        };
      }

      // 🚫 ENFORCE GPS LOCATION
      let location;
      let ip;
      let browser;
      try {
        [location, ip, browser] = await Promise.all([
          getGPSLocation(),
          getUserIP(),
          getBrowserInfo(),
        ]);
      } catch {
        errorAlert("Location access is required to login. Please enable GPS.");
        return { success: false };
      }

      // ✅ Proceed with login logging
      const userRef = doc(db, "accounts", userKey);
      const lastLogin = new Date().toISOString();
      const os = getOSInfo();

      await updateDoc(userRef, {
        status: "Active",
        lastLogin,
        browser,
        os,
        ip,
        location,
      });

      const createdAt = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Manila",
        dateStyle: "long",
        timeStyle: "medium",
      });

      try {
        await sendEmail(userData.email, "Login Notification", {
          title: "Successful Login Notification",
          message: `Hi ${userData.name || "User"},
  
  You have successfully logged in to the Smart Poultry App.
  
  📍 **Login Details**
  - **Browser:** ${browser}
  - **IP Address:** ${ip}
  - **Location:** ${location}
  - **Email:** ${userData.email}
  - **Account Created At:** ${createdAt}
  - **Last Login:** ${lastLogin}
  
  If this wasn't you, please secure your account immediately.
  
  Thank you for using Smart Poultry App.`,
          text: `
  Login Details:
  
  - Browser: ${browser}
  - IP Address: ${ip}
  - Location: ${location}
  - Email: ${userData.email}
  - Account Created At: ${createdAt}
  - Last Login: ${lastLogin}
  `,
          footerNote: "Smart Poultry App — Automated System Notification",
        });
      } catch (emailError) {
        console.warn(
          "Login succeeded, but email notification failed:",
          emailError,
        );
      }

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userKey", userKey);
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: userData.email,
          role: userData.role,
          name: userData.name || "",
        }),
      );

      return {
        success: true,
        userKey,
        requiresSetup: false,
      };
    } catch (error) {
      console.error("❌ Login error:", error);
      errorAlert("Login failed. Please try again.");
      return { success: false };
    }
  },

  async googleLogin() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userEmail = result.user.email;

      const userCheck = await this.checkUser(userEmail);
      if (!userCheck) return { success: false };
      const { userKey, userData } = userCheck;

      if (userData.mustChangePassword === true) {
        infoAlert("Your account requires a password change before continuing.");
        return {
          success: true,
          userKey,
          requiresSetup: true,
        };
      }

      // 🚫 ENFORCE GPS LOCATION
      let location;
      let ip;
      let browser;
      try {
        [location, ip, browser] = await Promise.all([
          getGPSLocation(),
          getUserIP(),
          getBrowserInfo(),
        ]);
      } catch {
        errorAlert("Location access is required to login. Please enable GPS.");
        return { success: false };
      }

      const userRef = doc(db, "accounts", userKey);
      const lastLogin = new Date().toISOString();
      const os = getOSInfo();

      await updateDoc(userRef, {
        status: "Active",
        lastLogin,
        browser,
        os,
        ip,
        location,
      });

      const createdAt = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Manila",
        dateStyle: "long",
        timeStyle: "medium",
      });

      try {
        await sendEmail(userData.email, "Login Notification", {
          title: "Successful Login Notification",
          message: `Hi ${userData.name || "User"},
  
  You have successfully logged in to the Smart Poultry App.
  
  📍 **Login Details**
  - **Browser:** ${browser}
  - **IP Address:** ${ip}
  - **Location:** ${location}
  - **Email:** ${userData.email}
  - **Account Created At:** ${createdAt}
  - **Last Login:** ${lastLogin}
  
  If this wasn't you, please secure your account immediately.
  
  Thank you for using Smart Poultry App.`,
          text: `
  Login Details:
  
  - Browser: ${browser}
  - IP Address: ${ip}
  - Location: ${location}
  - Email: ${userData.email}
  - Account Created At: ${createdAt}
  - Last Login: ${lastLogin}
  `,
          footerNote: "Smart Poultry App — Automated System Notification",
        });
      } catch (emailError) {
        console.warn(
          "Google login succeeded, but email notification failed:",
          emailError,
        );
      }

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userKey", userKey);
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: userData.email,
          role: userData.role,
          name: userData.name || "",
        }),
      );

      successAlert("Google login was successful!");

      return {
        success: true,
        userKey,
        lastLogin,
      };
    } catch (error) {
      console.error("🚨 Google Login Failed:", error.message);
      errorAlert("We had an issue logging in with Google. Please try again.");
      return { success: false };
    }
  },

  async updatePassword(userKey, newPassword) {
    try {
      const salt = generateSalt();
      const hashedPassword = await hashPassword(newPassword, salt);

      const userRef = doc(db, "accounts", userKey);
      await updateDoc(userRef, {
        password: hashedPassword,
        salt: salt,
        mustChangePassword: false,
        tempPassword: deleteField(), // Remove temp password
        tempPasswordCreatedAt: deleteField(), // Remove timestamp
        tempPasswordFor: deleteField(), // <-- Remove type indicator
      });

      successAlert("Password updated successfully!");
    } catch (error) {
      console.error("❌ Error updating password:", error);
      throw new Error("Failed to update password. Please try again.");
    }
  },

  async sendPasswordResetEmail(email) {
    try {
      // 1. Query Firestore for user by email
      const usersRef = collection(db, "accounts");
      const q = query(usersRef, where("email", "==", email));
      const userQuerySnapshot = await getDocs(q);

      if (userQuerySnapshot.empty) {
        throw new Error("User not found");
      }

      const userDoc = userQuerySnapshot.docs[0];
      const userData = userDoc.data();
      const userDocRef = doc(db, "accounts", userDoc.id);

      // 2. Anti-spam check: see if a reset was requested recently
      const createdAt = userData.tempPasswordCreatedAt?.toDate?.();
      const now = new Date();
      const diffMinutes = createdAt
        ? Math.floor((now - createdAt) / (1000 * 60))
        : null;

      if (diffMinutes !== null && diffMinutes < 5) {
        errorAlert(
          "⚠️ A temporary password was already sent. Please wait before requesting another.",
        );
        return;
      }

      // 3. Generate new temporary password
      const tempPassword = generateTempPassword();

      // 4. Update Firestore with temp password info
      await updateDoc(userDocRef, {
        tempPassword: tempPassword,
        tempPasswordCreatedAt: serverTimestamp(),
        tempPasswordFor: "reset_password",
        mustChangePassword: true,
      });

      // 5. Prepare email payload
      const emailPayload = {
        to: email,
        subject: "Your Password Reset - Temporary Password",
        text: `Your temporary password is: ${tempPassword}\n\nThis reset password will expire in 5 minutes. Please log in and change your password immediately.\n\nIf it expires, kindly request a new reset password again.`,
        title: "Password Reset Request",
        message: `Your password reset request has been processed.\n\nYour temporary password: ${tempPassword}\n\n⚠️ This temporary password will expire in 5 minutes. If it expires, please request a new one.`,
        footerNote: "Smart Poultry App — Automated System Notification",
      };

      // 6. Send email via shared email service
      await email.sendEmail(emailPayload.to, emailPayload.subject, {
        title: emailPayload.title,
        message: emailPayload.message,
        text: emailPayload.text,
        footerNote: emailPayload.footerNote,
      });

      successAlert("✅ Temporary password sent to your email.");
    } catch (error) {
      console.error("❌ Error sending temp password:", error);
      errorAlert("Failed to send temporary password. Please try again later.");
    }
  },

  async logoutUser(userKey, preserveEmail = false) {
    const confirmed = await confirmAlert(
      "Logout?",
      "You will be logged out of your account.",
      "Yes, Logout",
      "Cancel",
      {
        icon: "warning",
        confirmButtonColor: "#d33",
      },
    );

    // Proper check for cancel
    if (!confirmed.isConfirmed) {
      console.log("❎ Logout cancelled by user.");
      return { success: false };
    }

    try {
      await signOut(auth);

      if (userKey) {
        const userRef = doc(db, "accounts", userKey);
        await updateDoc(userRef, { status: "Inactive" });
      }

      if (!preserveEmail) {
        localStorage.removeItem("rememberedEmail");
      }

      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userKey");
      localStorage.removeItem("user");

      successAlert("You have been successfully logged out.");
      console.log("✅ User logged out successfully.");

      return { success: true };
    } catch (error) {
      console.error("🚨 Logout Error:", error.message);
      errorAlert("We encountered an issue logging you out. Please try again.");
      return { success: false };
    }
  },
};

export default loginService;
