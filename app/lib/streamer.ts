import { EventEmitter } from "events";

// Creates a new EventEmitter instance which sends events to the client
// This allows the server to send real-time updates to the client
export const streamer = new EventEmitter();

// Types for transcription events
export interface TranscriptionEvent {
  text: string;
  participant: string;
  isPartial: boolean;
}
