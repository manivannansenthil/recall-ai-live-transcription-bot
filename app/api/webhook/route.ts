import { NextRequest, NextResponse } from "next/server";
import { streamer } from "../../lib/streamer";

// This function handles the POST request to the webhook endpoints
// It receives events from the Recall.ai API and emits them to the client
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event, data } = body;

    // Handle different types of transcription events
    if (event === "transcript.data" || event === "transcript.partial_data") {
      // Parses the transcription data
      const transcriptData = data.data;
      const words = transcriptData.words
        .map((word: any) => word.text)
        .join(" ");
      const participant = transcriptData.participant;
      const timestamp = new Date(
        transcriptData.words?.[0]?.start_timestamp.absolute || Date.now(),
      ).toLocaleTimeString();

      // Emits the transcription data to any listeners on the client
      streamer.emit("transcription", {
        text: words,
        participant: participant.name || "Unknown",
        isPartial: event === "transcript.partial_data",
        timestamp: timestamp,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
