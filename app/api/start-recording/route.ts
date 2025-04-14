import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    
  // Get the environment variables
  const region = process.env.RECALL_REGION;
  const apiKey = process.env.RECALL_API_KEY;

  console.log("Recall Region:", region);
  console.log("Recall API Key:", apiKey);

  // Get the body of the request
  const body = await req.json();
  const meeting_url = body.meeting_url;

  // Validate the meeting_url
  if (!meeting_url || typeof meeting_url !== "string") {
    return NextResponse.json(
      { message: "Missing or invalid `meeting_url`" },
      { status: 400 },
    );
  }

  // Check if all required environment variables are present
  if (!region || !apiKey) {
    return NextResponse.json(
      { message: "Server misconfigured. Check .env.local file." },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(`https://${region}.recall.ai/api/v1/bot/`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Token ${apiKey}`,
      },
      body: JSON.stringify({
        meeting_url,
        bot_name: "Recall.ai Transcriber",
        bot_type: "google_meet",
        recording_config: {
          transcript: {
            provider: {
              meeting_captions: {},
              diarization: { use_separate_streams_when_available: true },
            },
          },
          start_recording_on: "call_join",
          realtime_endpoints: [
            {
              type: "webhook",
              url: "https://flexible-narwhal-suitably.ngrok-free.app/api/webhook",
              events: [
                "transcript.data",
                "transcript.partial_data",
                "participant_events.speech_on",
              ],
            },
          ],
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data?.error || "Failed to start recording" },
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error starting recording:", error);
    return NextResponse.json(
      { message: "Internal Server Error from Recall.ai" },
      { status: 500 },
    );
  }
}
