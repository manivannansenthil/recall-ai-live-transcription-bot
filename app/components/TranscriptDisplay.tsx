"use client";

import { useEffect, useState, useRef } from "react";

// This interface defines the structure of the transcription data
// Text of the transcription, the participant who spoke, whether it's a partial transcription and timestamp
interface Transcription {
  text: string;
  participant: string;
  isPartial: boolean;
  timestamp: string;
}

// This component displays the live transcription of the meeting
export default function TranscriptDisplay() {
  const [transcriptions, setTranscriptions] = useState<Transcription[]>([]);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create a new EventSource to listen for events from the server
    // This acts as a listener on the frontend for the server-sent events and enables real-time updates to the client and
    const eventSource = new EventSource("/api/transcript-stream");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setTranscriptions((prev) => {
        // If it's a partial update, replace the last partial transcription
        if (
          data.isPartial &&
          prev.length > 0 &&
          prev[prev.length - 1].isPartial
        ) {
          return [...prev.slice(0, -1), data];
        }
        return [...prev, data];
      });
    };

    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom of TranscriptDisplay with a small delay to ensure content is rendered
    if (transcriptRef.current) {
      setTimeout(() => {
        if (transcriptRef.current) {
          transcriptRef.current.scrollTo({
            top: transcriptRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [transcriptRef, transcriptions]);

  return (
    <div
      ref={transcriptRef}
      className="w-full max-w-4xl h-96 bg-[#f8f9fa] rounded-md shadow-md justify overflow-y-auto p-4"
    >
      <div className="space-y-2">
        {transcriptions.length === 0 ? (
          <div className="text-center text-gray-400 italic">
            Waiting for transcription...
          </div>
        ) : (
          transcriptions.map((transcript, index) => (
            <div
              key={index}
              className={`p-2 rounded ${transcript.isPartial ? "bg-gray-100" : "bg-[#f8f9fa]"}`}
            >
              <div className="flex flex-col">
                <span className="text-black font-semibold ml-2 text-xs">
                  {transcript.timestamp}
                </span>
                <span className="font-semibold text-[#0D6DFC]">
                  {transcript.participant}:
                </span>
                <span
                  className={
                    transcript.isPartial ? "text-gray-500" : "text-gray-800"
                  }
                >
                  {transcript.text}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
