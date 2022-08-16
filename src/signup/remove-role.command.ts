import { ApplicationCommandOptionType, Collection, CommandInteraction, EmbedBuilder, GuildMember, Snowflake } from 'discord.js';
import { DiscordCommand, Inject } from '@cordwork/core';

@DiscordCommand({
  name: '역할삭제',
  description: '디스코드 역할을 삭제합니다.',
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: '참여자',
      description: '역할을 삭제할 참여자',
      required: true,
    },
  ],
})
export class RemoveUserCommand {

  constructor(
  ) {}

  removeRoles(member: GuildMember|undefined): void {
	member?.roles.cache.forEach(async role => {
		if ( role.name === '@everyone' ) return;
		try {
			await member.roles.remove(role);
		} catch {
			return;
		}
	});
  }
  
  async listener(interaction: CommandInteraction): Promise<void> {
	// it's me
	if ( interaction.user.id !== '422963304479064067' ) return;

    const user = interaction.options.get('참여자')?.value as string || '';
	if ( user === 'all' ) {
		const members = await interaction?.guild?.members.fetch() as Collection<Snowflake, GuildMember>;
		for ( const [id, member] of members ) {
			await this.removeRoles(member);
		}
	} else {
		const [org, userId] = user.match(/<@!(\d+)>/) as RegExpMatchArray;
		const member = await interaction?.guild?.members.fetch(userId);
		await this.removeRoles(member);
	}
	interaction.reply({ content: '끝', ephemeral: true });
  }

}