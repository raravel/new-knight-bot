import { CordWorkClient, DiscordComponent, Inject } from "@cordwork/core";
import { ButtonBuilder, ButtonStyle, ButtonInteraction, TextChannel, ThreadAutoArchiveDuration, FetchedThreads } from "discord.js";
import { useRaidCreated, useRequestMessages, emojiRole } from "./tunnel";

@DiscordComponent()
export class ScheduleSubmitButtonComponent {
	public data: any = {};
	
	constructor(
		@Inject(CordWorkClient) private client: CordWorkClient
	) {}

	create(): ButtonBuilder {
		const builder = new ButtonBuilder()
			.setCustomId('schedule-submit-button-builder')
			.setStyle(ButtonStyle.Success)
			.setLabel('레이드 일정 생성');
		builder['customId'] = 'schedule-submit-button-builder';
		return builder;
	}

	dateFormat(date: Date): string {
		return `${date.getMonth()+1}. ${date.getDate()} ${date.getHours()}시 ${date.getMinutes()}분`;
	}

	async listener(interaction: ButtonInteraction): Promise<void> {
		const channel = await interaction.channel?.fetch() as TextChannel;
		await interaction.deferReply({ ephemeral: true });
		const title = `${this.dateFormat(this.data.date)} ${this.data.raid}(${this.data.level})`;
		const reaction_key = `${this.data.rawRaid}_${this.data.rawLevel}`;

		const raidCreated = useRaidCreated();
		raidCreated[title] = true;
		setTimeout(() => {
			if ( raidCreated[title] ) {
				delete raidCreated[title];
			}
		}, 1000 * 10);

		
		const thread = await channel.threads.create({
			name: title,
			autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
		});
		await interaction.editReply({
			content: `<#${thread.id}> 레이드 일정을 생성했습니다.`,
		});

		const reqMsgs = useRequestMessages();
		const requestMessage = reqMsgs[channel.id];
		if ( requestMessage ) {
			const { threads } = await channel.threads.fetch();
			const emojis = Array.from(channel.guild.emojis.cache.values())
				.filter((emoji) => Object.keys(emojiRole).includes(emoji.name || ''));
			requestMessage.edit({
				content: 
					`현재 활성화된 레이드 일정입니다.\n`+
					`**레이드 공격대 생성**을 눌러 새로운 일정을 만들 수 있습니다.\n\n` +
					Array.from(threads.values())
					.map((thread) => `<#${thread.id}>`)
					.join('\n') + '\n\n' +
					`아래 이모지들을 눌러서 원하는 레이드의 일정을 알림받을 수 있습니다.\n` +
					emojis.map((emoji) => `<:${emoji.name}:${emoji.id}> - ${emojiRole[emoji.name || '']}`).join('\n'),
			});
			const reaction = requestMessage.reactions.cache.find((reaction) => reaction.emoji.name === reaction_key);
			const reactionUsers = await reaction?.users.fetch();
			reactionUsers?.forEach(async (user) => {
				if ( user.id === this.client.user?.id ) return;
				user.send({
					content: `${channel.guild.name}에서 생성된 **${this.data.raid}(${this.data.level})레이드**의 알람입니다.\n` +
						`아래 주소를 클릭해서 레이드 일정 채널로 이동할 수 있습니다.\n\n` +
						thread.url,
				});
			})
		}

		await thread.send({
			content:
				`${this.data.dateString}\n` +
				`${this.data.timeString}\n\n` +
				`${this.data.raid}(${this.data.level}) 레이드 스레드입니다.\n`+
				`생성자: <@${interaction.user.id}>`
		});
	}
}