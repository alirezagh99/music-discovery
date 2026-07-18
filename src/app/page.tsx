"use client";

import { useRef, useState } from "react";
import FFT from "fft.js";
import { applyHannWindow } from "@/lib/applyHannWindow";
import { createLandmarks, Peak } from "@/lib/createLandmarks";
import { generateHash } from "@/lib/generateHash";

export default function Home() {
  const [audioUrl, setAudioUrl] = useState("");
  const [audioCtx, setAudioCtx] = useState();
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  async function startRecording() {
    // if resolved, returns a MediaStream object
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    streamRef.current = stream;

    // Creates a new MediaRecorder object based on a file MediaStream to be recorded
    const recorder = new MediaRecorder(stream);

    recorderRef.current = recorder;

    const chunks: Blob[] = [];

    recorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, {
        type: "audio/webm",
      });

      setAudioBlob(blob);

      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    };

    recorder.start();
  }

  function handleStopButton() {
    recorderRef.current?.stop();

    streamRef.current?.getTracks().forEach((track) => {
      track.stop();
    });
  }

  const handleVisualization = async () => {
    if (!audioBlob) return;

    const audioContext = new AudioContext();

    const arrayBuffer = await audioBlob.arrayBuffer();

    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const samples = audioBuffer.getChannelData(0);

    const SAMPLE_RATE = audioBuffer.sampleRate;

    const WINDOW_SIZE = 2048;

    const TOP_PEAKS_PER_FRAME = 10;

    const fft = new FFT(WINDOW_SIZE);

    const peakMap: Peak[] = [];

    for (let offset = 0; offset < samples.length; offset += WINDOW_SIZE) {
      let window = samples.slice(offset, offset + WINDOW_SIZE);

      // Apply Hann window
      window = applyHannWindow(window);

      const spectrum = fft.createComplexArray();

      fft.realTransform(spectrum, window);

      fft.completeSpectrum(spectrum);

      const magnitudes: number[] = [];

      // Convert FFT output to magnitudes
      for (let i = 0; i < WINDOW_SIZE / 2; i++) {
        const real = spectrum[2 * i];

        const imag = spectrum[2 * i + 1];

        const magnitude = Math.sqrt(real * real + imag * imag);

        magnitudes.push(magnitude);
      }

      const framePeaks: {
        frequency: number;
        magnitude: number;
      }[] = [];

      // Find local maxima
      for (let i = 1; i < magnitudes.length - 1; i++) {
        if (
          magnitudes[i] > magnitudes[i - 1] &&
          magnitudes[i] > magnitudes[i + 1]
        ) {
          framePeaks.push({
            frequency: (i * SAMPLE_RATE) / WINDOW_SIZE,

            magnitude: magnitudes[i],
          });
        }
      }

      // Keep strongest peaks in THIS frame
      framePeaks.sort((a, b) => b.magnitude - a.magnitude);

      const strongestPeaks = framePeaks.slice(0, TOP_PEAKS_PER_FRAME);

      const time = offset / SAMPLE_RATE;

      // Add timestamp to peaks
      strongestPeaks.forEach((peak) => {
        peakMap.push({
          time,
          frequency: peak.frequency,
          magnitude: peak.magnitude,
        });
      });
    }

    const landmarks = createLandmarks(peakMap);

    const hashed = [];
    for (const lm of landmarks) {
      hashed.push(
        generateHash(lm["frequency1"], lm["frequency1"], lm["deltaTime"]),
      );
    }

    console.log(hashed);
  };

  return (
    <div className={"flex flex-col gap-6"}>
      <div className="flex flex-row items-center gap-4">
        <button onClick={() => startRecording()}>Start</button>
        <button onClick={() => handleStopButton()}>Stop</button>
        <button onClick={() => handleVisualization()}>Visualization</button>
      </div>
      {audioUrl && <audio controls src={audioUrl} />}
    </div>
  );
}
