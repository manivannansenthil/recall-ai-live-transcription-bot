"use client";

import { ToastContainer } from "react-toastify";
import MeetingInput from "./components/MeetingInput";
import "react-toastify/dist/ReactToastify.css";

// Homepage
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center p-4">
      <h1 className="text-4xl font-bold font-sans text-center">
        Enter a Google Meet URL to begin live transcription
      </h1>
      <div className="text-center space-y-4">
        <MeetingInput />
        <h2 className="text-xl text-whtie font-bold mb-4">
          Live Transcription
        </h2>
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
    </main>
  );
}
