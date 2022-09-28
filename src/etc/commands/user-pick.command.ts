import {
	Collection,
	CommandInteraction,
	DMChannel,
	ThreadMember,
	GuildMember,
	ThreadMemberManager
} from 'discord.js';
import { DiscordCommand, Inject } from '@cordwork/core';
import { random } from '../../utils/shared.utils';

@DiscordCommand({
  name: '추첨',
  description: '현재 채널에 있는 사람 중 한 명을 선택합니다.',
})
export class UserPickCommand {

  constructor(
  ) {}
  
  async listener(interaction: CommandInteraction): Promise<void> {
	const channel = await interaction.channel?.fetch();
	if ( !(channel instanceof DMChannel) ) {
		//random
		let membersManager: Collection<string, GuildMember>|Collection<string, ThreadMember>|undefined;
		if ( channel?.members instanceof ThreadMemberManager ) {
			membersManager = await channel.members.fetch({ cache: false });
		} else {
			membersManager = (await channel?.fetch())?.members as Collection<string, GuildMember>;
		}

		const members = Array.from(membersManager?.values() as IterableIterator<GuildMember|ThreadMember> || []);
		const pickedMember = random(members.map(({ user }) => user));
		if ( pickedMember ) {
			interaction.reply({
				content: `<@${pickedMember.id}>님이 당첨되셨습니다!`,
				ephemeral: false,
			});
		} else {
			interaction.reply({ content: `뭔가... 뭔가 잘못됐음. 후보: ${members.length} 명`, ephemeral: true });
		}
	} else {
		interaction.reply({ content: '뭔가... 뭔가 잘못됐음.', ephemeral: true });
	}
  }

}