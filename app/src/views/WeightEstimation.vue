<template>
  <div class="flex h-screen">
    <!-- Navigation Sidebar -->
    <Nav />

    <!-- Main Content -->
    <main class="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800">
        Poultry Weight Estimation
      </h2>

      <!-- Poultry Camera Component -->
      <div class="poultry-camera">
        <!-- Camera Container -->
        <div class="camera-container">
          <!-- Video Feed (when no image is captured) -->
          <video
            v-if="!capturedImage"
            ref="videoElement"
            class="camera-feed"
            autoplay
            playsinline
            :class="{ 'camera-active': isCameraActive }"
          ></video>

          <!-- Captured Image (when image is captured) -->
          <img
            v-if="capturedImage"
            :src="capturedImage"
            alt="Captured image"
            class="captured-image"
          />

          <!-- Camera Frame Overlay -->
          <div class="frame-overlay" v-if="isCameraActive && !capturedImage">
            <div class="corner top-left"></div>
            <div class="corner top-right"></div>
            <div class="corner bottom-left"></div>
            <div class="corner bottom-right"></div>

            <!-- Positioning Instructions -->
            <div class="positioning-text" v-if="showGuide">
              Center the bird in the frame
            </div>
          </div>

          <!-- Camera Status Messages -->
          <div v-if="!isCameraActive && !cameraError" class="camera-message">
            <div class="message-icon">🐔</div>
            <p>Ready to estimate poultry weight</p>
          </div>

          <!-- Camera Error Message -->
          <div v-if="cameraError" class="camera-error">
            <p>{{ cameraError }}</p>
            <button @click="startCamera" class="camera-button retry-button">
              Try Again
            </button>
          </div>
        </div>

        <!-- Camera Controls Bar -->
        <div class="camera-controls-bar">
          <!-- Camera Selection Dropdown -->
          <div v-if="cameras.length > 2" class="camera-selection">
            <select
              v-model="selectedCameraId"
              @change="switchCamera"
              :disabled="!isCameraActive || capturedImage"
              class="camera-select"
              aria-label="Select Camera"
            >
              <option
                v-for="camera in cameras"
                :key="camera.deviceId"
                :value="camera.deviceId"
              >
                {{ camera.label || `Camera ${camera.index + 1}` }}
              </option>
            </select>
          </div>

          <!-- Camera Rotation Button -->
          <button
            v-if="cameras.length > 1"
            @click="rotateCamera"
            :disabled="!isCameraActive || capturedImage"
            class="control-button rotate-button"
            title="Switch Camera"
            aria-label="Switch Camera"
          >
            <span class="rotate-icon">🔄</span>
          </button>

          <!-- Guide Toggle Button -->
          <button
            @click="toggleGuide"
            :disabled="!isCameraActive || capturedImage"
            class="control-button guide-button"
            :class="{ active: showGuide }"
            title="Toggle Positioning Guide"
            aria-label="Toggle Positioning Guide"
          >
            <span class="guide-icon">📏</span>
          </button>
        </div>

        <!-- Main Camera Controls -->
        <div class="camera-controls">
          <!-- Start Camera Button -->
          <button
            v-if="!isCameraActive && !capturedImage"
            @click="startCamera"
            class="camera-button start-button"
          >
            Start Camera
          </button>

          <!-- Capture Button (when camera is active) -->
          <button
            v-if="isCameraActive && !capturedImage"
            @click="capturePhoto"
            class="camera-button capture-button"
            title="Capture Photo"
            aria-label="Capture Photo"
          >
            <!-- Fixed capture button circle -->
          </button>

          <!-- Retake Button (when image is captured) -->
          <button
            v-if="capturedImage"
            @click="retakePhoto"
            class="camera-button retake-button"
          >
            Retake Photo
          </button>

          <!-- Use Photo Button (when image is captured) -->
          <button
            v-if="capturedImage"
            @click="usePhoto"
            class="camera-button use-button"
          >
            Estimate Weight
          </button>
        </div>

        <!-- Poultry Instructions -->
        <div
          class="poultry-instructions"
          v-if="isCameraActive && !capturedImage"
        >
          <h3>For accurate weight estimation:</h3>
          <ul>
            <li>Ensure the bird is centered in the frame</li>
            <li>Capture the entire body from a side view</li>
            <li>Keep the bird still when taking the photo</li>
            <li>Ensure good lighting conditions</li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Nav from "@/components/templates/Nav.vue";

// Refs for state management
const videoElement = ref(null);
const isCameraActive = ref(false);
const capturedImage = ref(null);
const cameraError = ref(null);
const cameras = ref([]);
const selectedCameraId = ref("");
const showGuide = ref(true);
let videoStream = null;

// Toggle positioning guide
const toggleGuide = () => {
  showGuide.value = !showGuide.value;
};

// Enumerate all available video input devices (cameras)
const getCameras = async () => {
  try {
    // We need to request camera permission first to get labeled devices
    if (!videoStream) {
      // Request temporary access to get device labels
      const tempStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      tempStream.getTracks().forEach((track) => track.stop());
    }

    // Get all media devices
    const devices = await navigator.mediaDevices.enumerateDevices();

    // Filter for video input devices only
    const videoDevices = devices
      .filter((device) => device.kind === "videoinput")
      .map((device, index) => ({
        deviceId: device.deviceId,
        label: getLabelForDevice(device, index),
        index,
        isFrontFacing: device.label.toLowerCase().includes("front"),
      }));

    cameras.value = videoDevices;

    // If we have cameras and no selection yet, select the first one
    if (videoDevices.length > 0 && !selectedCameraId.value) {
      // Try to find a back camera first (for mobile devices)
      const backCamera = videoDevices.find(
        (device) =>
          device.label.toLowerCase().includes("back") ||
          device.label.toLowerCase().includes("environment")
      );

      // Use back camera if found, otherwise use the first camera
      selectedCameraId.value = backCamera
        ? backCamera.deviceId
        : videoDevices[0].deviceId;
    }

    return videoDevices;
  } catch (error) {
    console.error("Error enumerating devices:", error);
    cameraError.value =
      "Unable to access camera list. Please ensure you have granted camera permissions.";
    return [];
  }
};

// Get a user-friendly label for the device
const getLabelForDevice = (device, index) => {
  if (device.label) {
    // If we have a label, use it
    const label = device.label;

    // Try to identify front/back cameras on mobile
    if (label.toLowerCase().includes("front")) {
      return "Front Camera";
    } else if (
      label.toLowerCase().includes("back") ||
      label.toLowerCase().includes("environment")
    ) {
      return "Back Camera";
    }

    return label;
  }

  // Fallback labels if no permission yet
  return `Camera ${index + 1}`;
};

// Start the camera with the selected device
const startCamera = async () => {
  try {
    cameraError.value = null;

    // Get available cameras first if we don't have them
    if (cameras.value.length === 0) {
      await getCameras();
    }

    // If we still don't have a selected camera, show error
    if (!selectedCameraId.value && cameras.value.length > 0) {
      selectedCameraId.value = cameras.value[0].deviceId;
    } else if (!selectedCameraId.value) {
      throw new Error("No cameras available on this device");
    }

    // Stop any existing stream
    stopCameraStream();

    // Request camera access with selected device
    const constraints = {
      video: {
        deviceId: { exact: selectedCameraId.value },
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
    };

    // Get media stream
    videoStream = await navigator.mediaDevices.getUserMedia(constraints);

    // Set video source and activate camera
    if (videoElement.value) {
      videoElement.value.srcObject = videoStream;
      isCameraActive.value = true;
    }
  } catch (error) {
    console.error("Error accessing camera:", error);
    cameraError.value =
      "Unable to access camera. Please ensure you have granted camera permissions.";
  }
};

// Rotate between front and back cameras
const rotateCamera = async () => {
  if (!isCameraActive.value || capturedImage.value || cameras.value.length < 2)
    return;

  // Find the current camera
  const currentCameraIndex = cameras.value.findIndex(
    (camera) => camera.deviceId === selectedCameraId.value
  );

  // Get the next camera index (cycling through the available cameras)
  const nextCameraIndex = (currentCameraIndex + 1) % cameras.value.length;

  // Set the new camera
  selectedCameraId.value = cameras.value[nextCameraIndex].deviceId;

  // Switch to the new camera
  await switchCamera();
};

// Switch to a different camera
const switchCamera = async () => {
  if (isCameraActive.value && !capturedImage.value) {
    await startCamera(); // This will use the newly selected camera ID
  }
};

// Capture a photo from the video stream
const capturePhoto = () => {
  if (!videoElement.value || !isCameraActive.value) return;

  // Create canvas to capture the frame
  const canvas = document.createElement("canvas");
  canvas.width = videoElement.value.videoWidth;
  canvas.height = videoElement.value.videoHeight;

  // Draw the current video frame to the canvas
  const ctx = canvas.getContext("2d");
  ctx.drawImage(videoElement.value, 0, 0, canvas.width, canvas.height);

  // Convert canvas to data URL (JPEG format)
  capturedImage.value = canvas.toDataURL("image/jpeg");

  // Stop the camera stream after capturing
  stopCameraStream();
};

// Retake photo - clear the captured image and restart camera
const retakePhoto = () => {
  capturedImage.value = null;
  startCamera();
};

// Use the captured photo (emit event for parent component)
const usePhoto = () => {
  // Emit an event with the captured image data and camera info
  emit("photo-captured", {
    imageData: capturedImage.value,
    cameraId: selectedCameraId.value,
    cameraLabel: cameras.value.find(
      (c) => c.deviceId === selectedCameraId.value
    )?.label,
  });

  console.log("Photo ready for weight estimation");
};

// Stop the camera stream
const stopCameraStream = () => {
  if (videoStream) {
    videoStream.getTracks().forEach((track) => track.stop());
    isCameraActive.value = false;
  }
};

// Define emits for parent component communication
const emit = defineEmits(["photo-captured"]);

// Initialize component
onMounted(async () => {
  // Enumerate cameras on mount, but don't start automatically
  await getCameras();
});

// Clean up on component unmount
onUnmounted(() => {
  stopCameraStream();
});
</script>

<style scoped>
/* Base styles with improved color contrast */
.poultry-camera {
  width: 100%;
  max-width: 650px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
    "Helvetica Neue", sans-serif;
  color: #2d3748;
  background-color: #f7fafc;
  padding: 1rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

/* Camera container */
.camera-container {
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  background-color: #f0f4f8;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(43, 108, 176, 0.15);
  border: 3px solid #2b6cb0;
}

/* Video feed */
.camera-feed {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #000;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.camera-active {
  opacity: 1;
}

/* Captured image */
.captured-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Frame overlay with corner markers */
.frame-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.corner {
  position: absolute;
  width: 25px;
  height: 25px;
  border-color: #2b6cb0;
  border-style: solid;
  border-width: 0;
}

.top-left {
  top: 20px;
  left: 20px;
  border-top-width: 4px;
  border-left-width: 4px;
}

.top-right {
  top: 20px;
  right: 20px;
  border-top-width: 4px;
  border-right-width: 4px;
}

.bottom-left {
  bottom: 20px;
  left: 20px;
  border-bottom-width: 4px;
  border-left-width: 4px;
}

.bottom-right {
  bottom: 20px;
  right: 20px;
  border-bottom-width: 4px;
  border-right-width: 4px;
}

/* Positioning text - improved visibility */
.positioning-text {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  max-width: 90%;
}

/* Camera controls bar */
.camera-controls-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
}

/* Camera selection */
.camera-selection {
  flex: 1;
}

.camera-select {
  width: 100%;
  padding: 0.6rem;
  border-radius: 10px;
  border: 1px solid #cbd5e0;
  background-color: white;
  font-size: 0.9rem;
  color: #2d3748;
  cursor: pointer;
  transition: all 0.2s ease;
}

.camera-select:hover:not(:disabled) {
  border-color: #2b6cb0;
}

.camera-select:focus {
  outline: none;
  border-color: #2b6cb0;
  box-shadow: 0 0 0 3px rgba(43, 108, 176, 0.2);
}

.camera-select:disabled {
  background-color: #edf2f7;
  cursor: not-allowed;
  opacity: 0.7;
}

/* Control buttons in the bar */
.control-button {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background-color: #ebf8ff;
  color: #2b6cb0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1.2rem;
}

.control-button:hover:not(:disabled) {
  background-color: #2b6cb0;
  color: white;
  transform: translateY(-2px);
}

.control-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.control-button.active {
  background-color: #2b6cb0;
  color: white;
}

.rotate-icon,
.guide-icon {
  font-size: 1.2rem;
}

/* Camera messages */
.camera-message {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(240, 244, 248, 0.9);
  color: #2d3748;
  font-size: 1.1rem;
}

.message-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

/* Camera error */
.camera-error {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1.5rem;
  text-align: center;
  border-radius: 16px;
}

.camera-error p {
  margin-bottom: 1.5rem;
  font-size: 1rem;
  line-height: 1.5;
}

.retry-button {
  background-color: white;
  color: #2d3748;
  padding: 0.6rem 1.2rem;
}

/* Main camera controls */
.camera-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 0.5rem 0;
}

/* Camera buttons */
.camera-button {
  padding: 0.8rem 1.6rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #2b6cb0;
  color: white;
  box-shadow: 0 4px 10px rgba(43, 108, 176, 0.3);
}

.camera-button:hover {
  background-color: #1e4e8c;
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(43, 108, 176, 0.4);
}

.camera-button:active {
  transform: translateY(0);
}

/* Fixed Capture button */
.capture-button {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #2b6cb0;
  border: 4px solid white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.capture-button::after {
  content: "";
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: white;
  opacity: 0.8;
  transition: all 0.2s ease;
}

.capture-button:hover::after {
  width: 56px;
  height: 56px;
  opacity: 1;
}

.capture-button:active::after {
  width: 52px;
  height: 52px;
  opacity: 0.9;
}

/* Retake button */
.retake-button {
  background-color: #718096;
}

.retake-button:hover {
  background-color: #4a5568;
}

/* Use button */
.use-button {
  background-color: #38a169;
}

.use-button:hover {
  background-color: #2f855a;
}

/* Poultry instructions */
.poultry-instructions {
  background-color: #ebf8ff;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  margin-top: 0.5rem;
  border-left: 4px solid #2b6cb0;
}

.poultry-instructions h3 {
  color: #2b6cb0;
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
}

.poultry-instructions ul {
  margin: 0;
  padding-left: 1.5rem;
}

.poultry-instructions li {
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
  color: #2d3748;
}

/* Enhanced Responsive Design */
@media (max-width: 768px) {
  .camera-container {
    aspect-ratio: 3/2;
  }

  .corner {
    width: 20px;
    height: 20px;
  }

  .capture-button {
    width: 75px;
    height: 75px;
  }

  .capture-button::after {
    width: 55px;
    height: 55px;
  }
}

/* Small screens (mobile) */
@media (max-width: 480px) {
  main {
    padding: 0.75rem;
  }

  .poultry-camera {
    padding: 0.75rem;
    gap: 0.75rem;
  }

  .camera-container {
    aspect-ratio: 1/1;
    border-width: 2px;
  }

  .corner {
    width: 16px;
    height: 16px;
    border-width: 0;
  }

  .top-left {
    top: 10px;
    left: 10px;
    border-top-width: 3px;
    border-left-width: 3px;
  }

  .top-right {
    top: 10px;
    right: 10px;
    border-top-width: 3px;
    border-right-width: 3px;
  }

  .bottom-left {
    bottom: 10px;
    left: 10px;
    border-bottom-width: 3px;
    border-left-width: 3px;
  }

  .bottom-right {
    bottom: 10px;
    right: 10px;
    border-bottom-width: 3px;
    border-right-width: 3px;
  }

  .positioning-text {
    font-size: 0.85rem;
    padding: 6px 12px;
    bottom: 20px;
  }

  .camera-button {
    padding: 0.7rem 1.4rem;
    font-size: 0.9rem;
  }

  .capture-button {
    width: 65px;
    height: 65px;
    border-width: 3px;
  }

  .capture-button::after {
    width: 47px;
    height: 47px;
  }

  .capture-button:hover::after {
    width: 45px;
    height: 45px;
  }

  .camera-controls-bar {
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .camera-selection {
    order: 3;
    width: 100%;
  }

  .control-button {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }

  .poultry-instructions {
    padding: 0.75rem 1rem;
  }

  .poultry-instructions h3 {
    font-size: 0.9rem;
  }

  .poultry-instructions li {
    font-size: 0.8rem;
    margin-bottom: 0.25rem;
  }

  .message-icon {
    font-size: 2.5rem;
  }
}

/* Extra small screens */
@media (max-width: 360px) {
  .camera-controls {
    flex-direction: column;
    gap: 0.5rem;
  }

  .camera-button {
    width: 100%;
    padding: 0.6rem 1rem;
  }

  .capture-button {
    width: 60px;
    height: 60px;
    align-self: center;
  }

  .capture-button::after {
    width: 44px;
    height: 44px;
  }
}

/* Landscape orientation on mobile */
@media (max-height: 500px) and (orientation: landscape) {
  .poultry-camera {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }

  .camera-container {
    width: 60%;
    aspect-ratio: 4/3;
  }

  .camera-controls-bar,
  .camera-controls,
  .poultry-instructions {
    width: 40%;
  }

  .poultry-instructions {
    margin-top: 0;
  }

  .camera-controls-bar {
    flex-direction: column;
    align-items: flex-start;
  }

  .camera-selection {
    width: 100%;
  }
}
</style>
