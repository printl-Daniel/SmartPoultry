import * as tf from "@tensorflow/tfjs";
import * as YOLO from "./yoloModel"; // Import your YOLO model implementation
tf.env().set("WEBGL_VERSION", 2);

// Model loading configuration
const MODEL_CONFIG = {
  yoloModelUrl:
    process.env.VUE_APP_YOLO_MODEL_URL ||
    "/models/objectDetection/best_web_model/model.json",
  weightModelUrl:
    process.env.VUE_APP_WEIGHT_MODEL_URL ||
    "/models/weightEstimation/tfjs_model/model.json",
  yoloInputSize: 640,
  weightInputShape: [224, 224, 3], // batch size, height, width, channels
  normalizationConstant: 255.0,
};

// Global variables to store loaded models
let yoloModel = null;
let weightModel = null;

/**
 * Load both YOLO and weight estimation models
 */
export const loadDetectionModel = async () => {
  if (!yoloModel) {
    yoloModel = await YOLO.load(MODEL_CONFIG.yoloModelUrl);
  }
};

export const loadWeightModel = async () => {
  if (!weightModel) {
    try {
      // First try loading as a frozen model
      try {
        weightModel = await tf.loadGraphModel(MODEL_CONFIG.weightModelUrl, {
          fromTFHub: false,
        });
        console.log("Loaded as GraphModel");
      } catch (graphError) {
        console.log(
          "GraphModel load failed, trying Layers model...",
          graphError
        );

        // Fall back to layers model
        weightModel = await tf.loadLayersModel(MODEL_CONFIG.weightModelUrl);
        console.log("Loaded as LayersModel");
      }

      // Verify model loading
      if (!weightModel) {
        throw new Error("Model failed to load in both formats");
      }

      // Warm up the model
      await warmUpModel(weightModel);
      return weightModel;
    } catch (error) {
      console.error("Model loading failed:", error);
      throw new Error(`Model loading failed: ${error.message}`);
    }
  }
  return weightModel;
};

export const loadModels = async () => {
  await Promise.all([loadDetectionModel(), loadWeightModel()]);
};

/**
 * Warm up the model with a dummy prediction
 */
const warmUpModel = async (model) => {
  const dummyInput = tf.zeros([1, ...MODEL_CONFIG.weightInputShape]);
  try {
    const prediction = model.predict(dummyInput);
    await prediction.data();
    tf.dispose([dummyInput, prediction]);
  } catch (error) {
    tf.dispose(dummyInput);
    throw error;
  }
};

/**
 * Detect poultry in image using YOLO
 */
export const detectPoultry = async (image) => {
  let inputTensor;
  try {
    // Only load YOLO model (not weight model) for detection
    if (!yoloModel) {
      console.log("Loading YOLO model for detection...");
      yoloModel = await YOLO.load(MODEL_CONFIG.yoloModelUrl);
    }

    inputTensor = tf.browser.fromPixels(image);
    const detections = await YOLO.detect(yoloModel, inputTensor);
    return detections;
  } catch (error) {
    console.error("Detection failed:", error);
    throw new Error(`Detection failed: ${error.message}`);
  } finally {
    tf.dispose(inputTensor);
  }
};

/**
 * Crop image based on bounding box
 */
const cropImageToBoundingBox = (image, box) => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions to match bounding box
    canvas.width = box.right - box.left;
    canvas.height = box.bottom - box.top;

    // Draw the cropped portion
    ctx.drawImage(
      image,
      box.left,
      box.top,
      box.right - box.left,
      box.bottom - box.top,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const croppedImage = new Image();
    croppedImage.onload = () => resolve(croppedImage);
    croppedImage.src = canvas.toDataURL("image/jpeg");
  });
};

/**
 * Estimate poultry weight from an image (can be HTMLImageElement or data URL)
 */
export const estimateWeight = async (image) => {
  let imgElement;
  let inputTensor;

  try {
    // 1. Handle different input types (HTMLImageElement or data URL)
    if (image instanceof HTMLImageElement) {
      imgElement = image;
    } else if (typeof image === "string" && image.startsWith("data:image")) {
      // Create image element from data URL
      imgElement = await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () =>
          reject(new Error("Failed to load image from data URL"));
        img.src = image;
      });
    } else {
      throw new Error(
        "Unsupported image format. Please provide an image element or data URL."
      );
    }

    // 2. Validate image dimensions
    if (imgElement.width < 100 || imgElement.height < 100) {
      throw new Error(
        "Image resolution too low. Please use an image with at least 100x100 pixels."
      );
    }

    // 3. Detect poultry in the image
    const detections = await detectPoultry(imgElement);

    if (!detections || detections.length === 0) {
      throw new Error(
        "No poultry detected in the image. Please ensure: \n" +
          "- The bird is clearly visible\n" +
          "- The image shows a side view of the chicken\n" +
          "- The background is not too cluttered"
      );
    }

    // 4. Use the most confident detection
    const detection = detections[0];

    // 5. Validate detection quality
    if (detection.confidence < 0.8) {
      throw new Error(
        `Detection confidence too low (${(detection.confidence * 100).toFixed(
          1
        )}%).\n` +
          "Please ensure the chicken is clearly visible and properly centered."
      );
    }

    // 6. Validate bounding box size
    const boxWidth = detection.right - detection.left;
    const boxHeight = detection.bottom - detection.top;
    const minSize = Math.min(imgElement.width, imgElement.height) * 0.2; // At least 20% of image dimension

    if (boxWidth < minSize || boxHeight < minSize) {
      throw new Error(
        "Detected object is too small. Please ensure:\n" +
          "- The chicken fills at least 20% of the image\n" +
          "- You capture the bird from a reasonable distance"
      );
    }

    // 7. Validate class (0 = poultry)
    if (detection.class !== 0) {
      throw new Error(
        "Detected object is not poultry. Please capture an image of a chicken."
      );
    }

    // 8. Crop to the detection area
    const croppedImage = await cropImageToBoundingBox(imgElement, detection);

    // 9. Load weight model if not already loaded
    if (!weightModel) {
      await loadWeightModel();
    }

    // 10. Preprocess and predict
    inputTensor = preprocessImage(croppedImage);
    const prediction = weightModel.predict(inputTensor);
    const predictionValue = prediction.dataSync()[0];

    // 11. Validate prediction result
    if (typeof predictionValue !== "number" || isNaN(predictionValue)) {
      throw new Error(
        "Invalid weight prediction result. Please try with a different image."
      );
    }

    // 12. Apply any necessary post-processing (e.g., unit conversion)
    const finalWeight = Math.max(0, predictionValue); // Ensure non-negative weight

    return finalWeight;
  } catch (error) {
    console.error("Weight estimation error:", error);
    throw error;
  } finally {
    // Clean up tensors
    if (inputTensor) {
      tf.dispose(inputTensor);
    }
  }
};

/**
 * Preprocess an image for the weight estimation model
 */
const preprocessImage = (image) => {
  return tf.tidy(() => {
    let tensor;
    try {
      // Convert to tensor first
      tensor = tf.browser.fromPixels(image);

      // Resize in smaller steps if needed
      const targetSize = MODEL_CONFIG.weightInputShape.slice(0, 2);
      const currentSize = [tensor.shape[0], tensor.shape[1]];

      // If image is very large, resize in steps
      if (currentSize[0] > 1000 || currentSize[1] > 1000) {
        const intermediateSize = [
          Math.floor(currentSize[0] / 2),
          Math.floor(currentSize[1] / 2),
        ];
        tensor = tf.image.resizeBilinear(tensor, intermediateSize);
      }

      // Final resize to target size
      tensor = tf.image.resizeBilinear(tensor, targetSize);
      tensor = tensor.div(MODEL_CONFIG.normalizationConstant);
      return tensor.expandDims(0); // Add batch dimension
    } catch (error) {
      if (tensor) tensor.dispose();
      throw error;
    }
  });
};

/**
 * Clean up models
 */
export const disposeModels = () => {
  if (yoloModel) {
    yoloModel.dispose();
    yoloModel = null;
  }
  if (weightModel) {
    weightModel.dispose();
    weightModel = null;
  }
};
