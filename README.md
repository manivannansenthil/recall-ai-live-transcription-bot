# Transcribe Google Meet calls in real-time with Recall.ai

AI-powered live transcription for Google Meet — with speaker labels and timestamps, powered by [Recall.ai.](https://www.recall.ai)

Use this template to build your own real-time transcription integration for Google Meets!

## 🤖 How It Works

This app enables a virtual transcription bot to join any Google Meet call and deliver a real-time transcript directly in your browser.
  1. A user submits a Google Meet link via the UI.
  2. The backend sends that link to the Recall.ai API, which spins up a bot that joins the meeting and begins transcribing.
  3. Transcription data — including speaker labels and timestamps — is sent from Recall.ai to a local webhook endpoint.
  4. That data is then emitted to the frontend via a server-sent event (SSE) stream.
  5. The UI listens to this stream and displays live transcription updates as the meeting happens.

## 🛠️ Tech Stack / Requirements
1. Next.js / React
2. Tailwinds CSS
3. [Ngrok](https://ngrok.com/docs/getting-started/)
4. [Google Meets](https://meet.google.com/landing)
5. [Recall API Token](https://www.recall.ai)

## 🏁 Getting Started 
Open your terminal:
```
# Clone down this repo on your local machine
git clone https://github.com/manivannansenthil/recall-ai-live-transcription-bot

# Navigate into the cloned project directory
cd recall-ai-live-transcription-bot
```
### Webhook Setup

Since this app uses webhooks to get the bot transcript in real time, we need a way to forward webhook requests to localhost. Ngrok is the easiest way to do this. Check out [Recall's documentation](https://docs.recall.ai/docs/local-webhook-development) to get set up. Our server will be running on port 3000 by default, so run the following command in the same terminal window:

```bash
ngrok http --domain {YOUR_STATIC_DOMAIN} 3000
```

If you haven't already, you'll need to sign up for a [Recall.ai account](https://www.recall.ai/) and create an API key from the [Dashboard](https://us-west-2.recall.ai/dashboard/).

> **Double Check Your `RECALL_REGION`:**
>
> Recall.ai has different subdomains for different regions.
>
> - If you're an **individual developer**, you should use the **`us-west-2`** region.
> - If you're an **enterprise on a trial with Recall.ai**, you should use the **`us-east-1`** region.

Open a secondary terminal while ^ that one remains running:
```
# Export these environment variables to your local machine (remember to use your personal RECALL_API_KEY!)
export RECALL_API_KEY={YOUR_RECALL_API_KEY}
export RECALL_REGION={YOUR_RECALL_REGION}
export NEXT_PUBLIC_BASE_URL={YOUR_STATIC_DOMAIN}

# Run npm to install required dependencies and run your local dev server
npm install
npm run dev
```
In your browser, navigate to http://localhost:3000 and enter your Google Meet URL here:

![image](https://github.com/user-attachments/assets/4916b6cf-ec46-4aa3-8520-063d1b73b25b)

Press "Start Recording" and then allow the virtual assistant to enter your meeting.

Turn on closed captions in the meeting and start speaking. The application will need a few moments to surface the texts before appearing on the transcript display.

## 💻 Development

Create a .env.local file and provide these environment variables. Follow previous steps to run the application!

```
export RECALL_API_KEY={YOUR_RECALL_API_KEY}
export RECALL_REGION={YOUR_RECALL_REGION}
export NEXT_PUBLIC_BASE_URL={YOUR_STATIC_DOMAIN} 
```

