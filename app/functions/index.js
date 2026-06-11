const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
admin.initializeApp();

// Function to send push notifications to all users
exports.sendPushNotification = functions.https.onRequest(async (req, res) => {
  const message = req.body.message || "Default message"; // Default message if none is provided

  try {
    // Get all users from Firestore
    const userSnapshot = await admin.firestore().collection("users").get();
    const tokens = [];

    // Collect all FCM tokens
    userSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.fcmToken) {
        tokens.push(data.fcmToken);
      }
    });

    // If there are no FCM tokens, return a message
    if (tokens.length === 0) {
      res.status(400).send("No tokens available.");
      return;
    }

    // Define the notification payload
    const payload = {
      notification: {
        title: "Smart Poultry Alert",
        body: message,
      },
    };

    // Send push notification to all users
    const response = await admin.messaging().sendToDevice(tokens, payload);
    res.status(200).send(`Push sent to ${response.successCount} users.`);
  } catch (error) {
    console.error("Error sending push notification:", error);
    res.status(500).send("Error sending push notification.");
  }
});
