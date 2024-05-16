"use client"

import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import { load as cocossdLoad } from '@tensorflow-models/coco-ssd';
import {ImSpinner8} from 'react-icons/im';
import renderPredictions from '@/utils/render-prediction';

let detectInterval;

export default function ObjectDetection() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const [isLoading, setIsLoading] = useState(true);

    const runCoco = async () => {
        setIsLoading(true);
        const model = await cocossdLoad();
        setIsLoading(false);

        detectInterval = setInterval(() => {
            runObjectDetection(model);
        }, 10)
    }

    const runObjectDetection = async (model) => {
        if(canvasRef.current && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
            canvasRef.current.width = webcamRef.current.video.videoWidth;
            canvasRef.current.height = webcamRef.current.video.videoHeight;

            const detectedObjects = await model.detect(webcamRef.current.video, undefined, 0.6);

            const context = canvasRef.current.getContext("2d");
            renderPredictions(detectedObjects, context);
    }
}

    const showVideo = () => {
        if(webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            webcamRef.current.video.videoWidth = videoWidth;
            webcamRef.current.video.videoHeight = videoHeight;
    }
}

useEffect(() => {
    runCoco();
    showVideo();
}, [])

    return (
        <div className="mt-8">
            {isLoading ? (<ImSpinner8 className="text-5xl text-white animate-spin" />) : (
            <div className="relative flex items-center justify-center gradient p-1.5 rounded-md">
                <Webcam ref={webcamRef} className="rounded-md w-full lg:h-[720px]" muted/>
                <canvas ref={canvasRef} className="absolute top-0 left-0 z-99999 w-full lg:h-[720px]" />
            </div>)}
        </div>
    )
}