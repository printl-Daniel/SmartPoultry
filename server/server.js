const admin = require("./firebase");
require("dotenv").config();

const message = {
  token: process.env.FCM_DEVICE_TOKEN,
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
