import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "./assets/styles/tailwind.css";
import "@fortawesome/fontawesome-free/css/all.css";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";

async function initTF() {
  try {
    // Set the backend to WebGL
    await tf.setBackend("webgl");
    console.log("Current backend:", tf.getBackend());

    // Verify WebGL support
    if (!tf.engine().backend.hasOwnProperty("gpgpu")) {
      console.warn("WebGL not properly initialized");
    }
  } catch (error) {
    console.error("TensorFlow initialization failed:", error);
  }
}

initTF().then(() => {
  // Your existing Vue app initialization code
  createApp(App).use(router).mount("#app");
});
