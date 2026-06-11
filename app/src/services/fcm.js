import { getToken, onMessage, isSupported } from "firebase/messaging";
import { messaging } from "./firebase.js";

// Add notification sound file to public folder
const NOTIFICATION_SOUND = "/notification.mp3";

export const requestPermissionAndGetToken = async () => {
  try {
    // Check browser support first
    if (!(await isSupported())) {
      console.warn("Browser doesn't support FCM");
      return null;
    }

    // Request permissions
    const permission = await Notification.requestPermission();
    console.log("Notification permission:", permission);

    if (permission !== "granted") {
      console.warn("User blocked notifications");
      return null;
    }

    // Register service worker with error handling
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js",
      { scope: "/" }
    );

    console.log("Service Worker registered:", registration);

    // Wait for service worker to be ready
    await navigator.serviceWorker.ready;

    // Get FCM token with validation
    const token = await getToken(messaging, {
      serviceWorkerRegistration: registration,
      vapidKey: "YOUR_VAPID_KEY",
    });

    if (!token) throw new Error("No token generated");

    console.log("FCM Token:", token);
    return token;
  } catch (error) {
    console.error("FCM Error:", error);
    return null;
  }
};

export const setupOnMessageListener = (callback) => {
  if (!messaging) return;

  onMessage(messaging, (payload) => {
    console.log("Foreground message received:", payload);

    // Show visual notification even in foreground
    if (Notification.permission === "granted") {
      new Notification(payload.notification?.title || "New Message", {
        body: payload.notification?.body,
        icon: "/notification-icon.png",
        badge: "/badge.png",
        sound: NOTIFICATION_SOUND,
        data: payload.data,
      });
    }

    // Optional: Play sound
    if (payload.notification?.sound) {
      const audio = new Audio(NOTIFICATION_SOUND);
      audio.play();
    }

    callback(payload);
  });
};
