const admin = require("firebase-admin");

// Path to the service account JSON key
const serviceAccount = require("./config/serviceAccountKey.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log("Firebase Admin SDK initialized.");
