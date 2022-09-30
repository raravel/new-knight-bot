import {
	CommandInteraction,
} from 'discord.js';
import { DiscordCommand } from '@cordwork/core';
import path from 'path';

@DiscordCommand({
  name: '시너지',
  description: '모든 직업 시너지 표를 띄웁니다.',
})
export class SynergyCommand {

  constructor(
  ) {}
  
  async listener(interaction: CommandInteraction): Promise<void> {
	interaction.reply({
		files: [
			path.join(__dirname, '../../assets/synergy.jpg'),
		],
	});
  }

}