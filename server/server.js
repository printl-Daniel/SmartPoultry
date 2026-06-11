const admin = require("firebase-admin");
const serviceAccount = require("./config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const message = {
  token:
    "fnc0a14tcsjbryQVyoHgdI:APA91bGjs3HdlA4cNy-XAusLrmfzJwUvIJMYCGbwTZPb2HV2efSdnwoWPaYFdjWiSliRHYBNRIrkquDROQb0jCTg5okr0sO8nVMuAd4DWn6NxJTiRvqCfq0", // Your device token here
  notification: {
    title: "Test Notification",
    body: "This is a test notification from Firebase!",
  },
};

admin
  .messaging()
  .send(message)
  .then((response) => {
    console.log("Successfully sent message:", response);
  })
  .catch((error) => {
    console.error("Error sending message:", error);
  });
