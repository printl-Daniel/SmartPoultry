import * as tf from "@tensorflow/tfjs";

export const load = async (modelUrl) => {
  try {
    const model = await tf.loadGraphModel(modelUrl);
    return model;
  } catch (error) {
    console.error("Failed to load YOLO model:", error);
    throw error;
  }
};

export const detect = async (model, inputTensor) => {
  const [normalized, width, height] = tf.tidy(() => {
    const resized = tf.image.resizeBilinear(inputTensor, [640, 640]);
    const expanded = resized.expandDims(0);
    const normalized = expanded.div(255.0);
    return [normalized, inputTensor.shape[1], inputTensor.shape[0]];
  });

  try {
    const [rawDetections] = await model.executeAsync(normalized); // Only need predictions[0]
    const rawArray = await rawDetections.array(); // shape: [1, 300, 6]

    tf.dispose(rawDetections);

    const detections = [];
    const results = rawArray[0]; // shape: [300, 6]

    for (let i = 0; i < results.length; i++) {
      const [x1, y1, x2, y2, score, classId] = results[i];

      // Filter poultry class (0) and confidence > 0.5
      if (score > 0.8 && classId === 0) {
        detections.push({
          class: classId,
          confidence: score,
          left: x1,
          top: y1,
          right: x2,
          bottom: y2,
        });
      }
    }

    return detections;
  } catch (error) {
    console.error("YOLO detection failed:", error);
    throw error;
  } finally {
    tf.dispose(normalized);
  }
};
