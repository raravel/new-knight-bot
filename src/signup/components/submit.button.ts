import { DiscordComponent } from "@cordwork/core";
import { ButtonBuilder, ButtonStyle, ButtonInteraction, GuildMember, Guild } from "discord.js";
import { Setable } from "../../utils/setable.util";

@DiscordComponent()
export class SignupSubmitComponent extends Setable {

	create(): ButtonBuilder {
		const builder = new ButtonBuilder()
			.setCustomId('submit-button-v1')
			.setStyle(ButtonStyle.Success)
			.setLabel('이 캐릭터로 참여');
		builder['customId'] = 'submit-button-v1';
		return builder;
	}

	async listener(interaction: ButtonInteraction): Promise<void> {
		const user = this.get('user');
		const guildRole = this.get('guild-role');
		const serverRole = this.get('server-role');

		const member = interaction.member as GuildMember;
		const guild = interaction.guild as Guild;
		const nameRole = await guild.roles.create({
			name: user.name,
			color: [0, 0, 0],
			reason: '',
		});
		await member.roles.add(serverRole);
		await member.roles.add(guildRole);
		await member.roles.add(nameRole);

		interaction.reply({
			ephemeral: true,
			content: '가입이 완료되었습니다.',
		});
	}

}