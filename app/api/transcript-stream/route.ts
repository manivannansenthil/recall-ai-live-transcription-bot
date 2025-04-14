import { NextRequest } from "next/server";
import { streamer } from "../../lib/streamer";

// This function handles the GET request to the /api/transcript-stream endpoint
// the transcript-stream route sets up a Server-Sent Events (SSE) stream that pushes real-time transcription updates from the backend to the frontend.
export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  // Set up the stream to handle incoming data and send it to the frontend client
  const handleTranscription = (data: any) => {
    writer.write(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
  };

  // Listen for transcription events from the streamer
  // The streamer is an EventEmitter that emits events when new transcription data is available
  streamer.on("transcription", handleTranscription);

  // Clean up when the client disconnects
  req.signal.addEventListener("abort", () => {
    streamer.off("transcription", handleTranscription);
    writer.close();
  });

  return new Response(stream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
