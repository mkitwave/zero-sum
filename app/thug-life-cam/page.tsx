"use client";

import Webcam from "react-webcam";
import { useEffect, useRef, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import { MediaPipeFaceMesh } from "@tensorflow-models/face-landmarks-detection/dist/types";
import { draw } from "./mask";

const videoSize = {
  width: 640,
  height: 480,
};

const ThugLifeGenerator = () => {
  const webcam = useRef<Webcam>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState<boolean>(false);

  const runFaceDetect = async () => {
    const model = await faceLandmarksDetection.load(
      faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
    );

    const img = new Image();
    img.src = "thug-life.png";

    setLoaded(true);
    detect(model, img);
  };

  const detect = async (model: MediaPipeFaceMesh, img: HTMLImageElement) => {
    if (
      webcam.current &&
      canvas.current &&
      webcam.current.video?.readyState === 4
    ) {
      const video = webcam.current.video;
      const videoWidth = webcam.current.video.videoWidth;
      const videoHeight = webcam.current.video.videoHeight;
      canvas.current.width = videoWidth;
      canvas.current.height = videoHeight;
      const predictions = await model.estimateFaces({
        input: video,
      });
      const ctx = canvas.current.getContext("2d") as CanvasRenderingContext2D;

      requestAnimationFrame(() => {
        draw(predictions, ctx, img);
      });
      detect(model, img);
    }
  };

  useEffect(() => {
    runFaceDetect();
  }, [webcam.current?.video?.readyState]);

  return (
    <main className="w-full h-screen bg-black flex items-center justify-center relative">
      <div className="relative" style={videoSize}>
        <Webcam
          screenshotFormat="image/png"
          ref={webcam}
          className={`absolute top-0 left-0 scale-x-[-1] transition-opacity ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
        <canvas ref={canvas} className="absolute top-0 left-0 scale-x-[-1]" />
      </div>
      {!loaded && (
        <AiOutlineLoading className="text-white z-20 animate-spin w-10 h-10 absolute left-1/2 top-1/2 -translate-y-[1/2] -translate-x-[1/2]" />
      )}
    </main>
  );
};

export default ThugLifeGenerator;
