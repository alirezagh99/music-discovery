"use client";

import { useRef, useState } from "react";
import { generatePeaks } from "@/lib/generatePeaks";
import { generateFingerprints } from "@/lib/generateFingerprints";
import { decodeBlob } from "@/lib/decodeBlob";
import { Hero } from "@/Modules/Home/Components/Hero";
import { HowWorks } from "@/Modules/Home/Components/HowWorks";

export default function Home() {
  const [audioUrl, setAudioUrl] = useState("");
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

    const audioBuffer = await decodeBlob(audioBlob);

    const audioBufferLike = {
      sampleRate: audioBuffer.sampleRate,
      channelData: Array.from(
        { length: audioBuffer.numberOfChannels },
        (_, i) => audioBuffer.getChannelData(i),
      ),
    };

    console.log("audioBufferLike: ", audioBufferLike);
    const peaks = generatePeaks(audioBufferLike);

    console.log("peaks: ", peaks);
    const fingerprints = generateFingerprints(peaks);

    console.log("fingerprints: ", fingerprints);
  };

  return (
    <div className={"flex flex-col gap-6 px-4 container 2xl:max-w-360 mx-auto"}>
      <Hero />
      <HowWorks />
      {/* <div className="flex flex-row items-center gap-4">
        <button onClick={() => startRecording()}>Start</button>
        <button onClick={() => handleStopButton()}>Stop</button>
        <button onClick={() => handleVisualization()}>Visualization</button>
      </div>
      {audioUrl && <audio controls src={audioUrl} />} */}

      {/* <div>
        <Button>Discover</Button>
      </div> */}
    </div>
  );
}
