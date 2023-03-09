import { VoiceChannel } from "discord.js";

interface MemoryVoiceChannel {
  member_timestamp: number;
  channel: VoiceChannel;
}

export const tableList: MemoryVoiceChannel[] = [];