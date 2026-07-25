"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { generatePeaks } from "@/lib/generatePeaks";
import { generateFingerprints } from "@/lib/generateFingerprints";
import { decodeBlob } from "@/lib/decodeBlob";
import { Button } from "@/components/ui/button";
import { SectionLayout } from "@/components/Layout/Components/SectionLayout";
import { Disc } from "lucide-react";
import { cn } from "@/lib/utils";
import { Player } from "@/Modules/Discover/Components/Player";
import { PlayerBar } from "@/Modules/Discover/Components/PlayerBar";
import { identifySong } from "@/actions/identifySong";

const DiscoverPage = () => {
  const [audioUrl, setAudioUrl] = useState("");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recording, setRecording] = useState(false);
  const [foundedSong, setFoundedSong] = useState({ title: null, error: null });
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const stopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function startRecording() {
    // if resolved, returns a MediaStream object
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      // audio: {
      //   echoCancellation: false,
      //   noiseSuppression: false,
      //   autoGainControl: false,
      // },
    });
    setRecording(true);
    streamRef.current = stream;

    // Creates a new MediaRecorder object based on a file MediaStream to be recorded
    const recorder = new MediaRecorder(stream);

    recorderRef.current = recorder;

    const chunks: Blob[] = [];

    recorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };

    recorder.onstop = () => {
      if (stopTimeoutRef.current) {
        clearTimeout(stopTimeoutRef.current);
        stopTimeoutRef.current = null;
      }

      const blob = new Blob(chunks, {
        type: "audio/webm",
      });

      setAudioBlob(blob);

      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      setRecording(false);

      handleVisualization(blob);
    };

    recorder.start();

    stopTimeoutRef.current = setTimeout(() => {
      stopRecording();
    }, 30_000);
  }

  function stopRecording() {
    if (stopTimeoutRef.current) {
      clearTimeout(stopTimeoutRef.current);
      stopTimeoutRef.current = null;
    }

    if (recorderRef.current?.state === "recording") {
      recorderRef.current.stop();
    }

    streamRef.current?.getTracks().forEach((track) => track.stop());
  }

  const handleVisualization = async (blob: Blob) => {
    if (!blob) return;

    const audioBuffer = await decodeBlob(blob);

    const audioBufferLike = {
      sampleRate: audioBuffer.sampleRate,
      channelData: Array.from(
        { length: audioBuffer.numberOfChannels },
        (_, i) => audioBuffer.getChannelData(i),
      ),
    };
    // console.log({ audioBufferLike });

    const peaks = generatePeaks(audioBufferLike);

    const fingerprints = generateFingerprints(peaks);

    console.log({ fingerprints });
    const result = await identifySong(fingerprints);

    // console.log({ result });

    setFoundedSong(result);
  };

  return (
    <SectionLayout
      headingText="Record your sound to find the song"
      className="relative lg:h-[60vh]"
    >
      <div className="flex flex-row items-start justify-center w-1/2 mx-auto gap-4 mt-10">
        <motion.div
          animate={
            recording
              ? {
                  scale: [1, 1.03, 1],
                  boxShadow: [
                    "0 0 0px rgba(239,68,68,0)",
                    "0 0 20px rgba(239,68,68,0.5)",
                    "0 0 0px rgba(239,68,68,0)",
                  ],
                }
              : {}
          }
          transition={{
            duration: 1.2,
            repeat: recording ? Infinity : 0,
            ease: "easeInOut",
          }}
        >
          <Button
            variant={"noShadow"}
            disabled={recording}
            onClick={startRecording}
            className="min-w-44 flex items-center gap-2"
          >
            <span>{recording ? "Recording" : "Start Recording"}</span>
            <Disc className={cn("mt-0.5", recording ? "text-red-500" : "")} />
          </Button>
        </motion.div>
        <div>
          {!recording && (
            <Button
              className="border"
              variant={"neutralNoShadow"}
              onClick={() => stopRecording()}
            >
              Stop Recording
            </Button>
          )}
        </div>

        {/* <Button onClick={() => handleVisualization()}>Visualization</Button> */}
      </div>

      {foundedSong.title ? (
        <div className="flex justify-center mt-10">
          <p className="text-xl">
            Found it! The song's name is {foundedSong.title}
          </p>
        </div>
      ) : foundedSong.error ? (
        <p className="text-xl">{`Not Found :(`}</p>
      ) : null}
      {/* <div>{audioUrl && <audio controls src={audioUrl} />}</div> */}
      {/* <div className="h-25 flex items-center justify-center">
        <Player />
      </div> */}
    </SectionLayout>
  );
};

export default DiscoverPage;
