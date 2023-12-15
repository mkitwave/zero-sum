import { AnnotatedPrediction } from "@tensorflow-models/face-landmarks-detection/dist/mediapipe-facemesh";

export const draw = (
  predictions: AnnotatedPrediction[],
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
) => {
  predictions.forEach((prediction) => {
    if (prediction.kind === "MediaPipePredictionValues") {
      const keypoints = prediction.scaledMesh;

      const leftEyeTop = keypoints[124];
      const leftEyeBottom = keypoints[111];
      const rightEyeTop = keypoints[276];
      const sunglassesWidth = Math.abs(rightEyeTop[0] - leftEyeTop[0]) + 100; // Adjust as needed
      const sunglassesHeight = Math.abs(leftEyeBottom[1] - leftEyeTop[1]) + 30; // Adjust as needed

      const sunglassesX = leftEyeTop[0] - 45;
      const sunglassesY = leftEyeTop[1] - 10;

      ctx.drawImage(
        image,
        sunglassesX,
        sunglassesY,
        sunglassesWidth,
        sunglassesHeight,
      );
    }
  });
};
