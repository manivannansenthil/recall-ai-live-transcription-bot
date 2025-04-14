"use client";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import MeetingInput from "./components/MeetingInput";
import TranscriptDisplay from "./components/TranscriptDisplay";

// Homepage
export default function Home() {
  return (
    <main>
      <div className="min-h-screen flex flex-col justify-center">
        <div className="mb-40">
          <h1 className="text-6xl font-bold font-sans text-center">
            Live Transcription Bot
          </h1>
          <div className="text-2xl text-center">
            Transcribe Google Meet calls in real-time
          </div>
          <p className="text-sm bg-[#0d6dfc] font-sans text-center mt-5">
            powered by Recall.ai
          </p>
        </div>

        <h1 className="text-4xl font-bold font-sans text-center">
          Enter a Google Meet URL to begin live transcription
        </h1>
        <div className="text-center space-y-4">
          <MeetingInput />
          <h2 className="text-xl text-white underline mt-8 font-bold">
            Live Transcription
          </h2>
          <div className="flex justify-center">
            <TranscriptDisplay />
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </main>
  );
}
