"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MeetingURLInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  // This function sends a POST request to the server with the meeting URL to create the transcription bot and handles the response.
  const handleStartRecording = async () => {

    // Check if the input value is empty
    if (!inputValue.trim()) {
      toast.error("Please enter a Google Meet URL", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    
    // Updates loading state, disables input/button and sends POST request 
    try {

      setIsLoading(true);

      // Send POST request to create bot
      const res = await fetch("/api/start-recording", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meeting_url: inputValue }),
      });
      
      // Store the response data
      const data = await res.json();

      // Error handling
      if (!res.ok) {
        toast.error(data.message || "Something went wrong", {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        toast.success("Recording started!", {
          position: "top-center",
          autoClose: 3000,
        });
        setIsRecording(true);
      }
    } catch (err) {
      console.error("Error starting recording:", err);
      toast.error("Connection failed. Please enter a valid Google Meets URL.", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto mt-10">
      <input
        type="text"
        placeholder="Enter Google Meet URL..."
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        disabled={isRecording}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
      />
      <button
        onClick={handleStartRecording}
        disabled={isLoading || isRecording}
        className={`relative px-4 py-2 rounded-md font-medium transition-all duration-200 ${
          isRecording
            ? "bg-gray-400 text-gray-100 cursor-not-allowed"
            : isLoading
              ? "bg-green-500 text-white cursor-wait"
              : "bg-[#0D6DFC] text-white hover:opacity-90"
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Starting...
          </div>
        ) : isRecording ? (
          "Recording in Progress"
        ) : (
          "Start Recording"
        )}
      </button>
    </div>
  );
};

export default MeetingURLInput;
