import {
	ApplicationCommandOptionType,
	Client,
	CommandInteraction,
	CommandInteractionOption,
	PermissionsBitField,
	TextChannel,
} from "discord.js";
import { Command } from "src/Command";
import { ErrorEmbed } from "../misc/embeds"

export const Clear: Command = {
	name: "clear",
	description: "Clear messages",
	options: [
		{
			name: "all",
			description: "Clear all messages",
			type: ApplicationCommandOptionType.Boolean,
			required: false,
		},
		{
			name: "amount",
			description: "The amount of messages to delete",
			type: ApplicationCommandOptionType.Integer,
			required: false,
		},
		{
			name: "top",
			description: "Delete messages from the top",
			type: ApplicationCommandOptionType.Boolean,
			required: false,
		}
	],
	run: async (client: Client, interaction: CommandInteraction): Promise<void> => {
		const channel = interaction.channel as TextChannel;

		const all = interaction.options.get("all") as CommandInteractionOption;
		const amount = interaction.options.get("amount") as CommandInteractionOption;
		const top = interaction.options.get("top") as CommandInteractionOption;

		if (!(interaction.member?.permissions as Readonly<PermissionsBitField>).has(PermissionsBitField.Flags.Administrator)) {
			await interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "<:ricon_minus_color:1092456005985640598> Error",
						description: "You do not have permission to use this command.",
						color: 0xff0000,
					},
				],
			});
			return;
		}

		if (!all) {
			await interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "<:ricon_clock_rounded:1092459256248270979> Please wait...",
						description: "Deleting messages...",
						color: 0x4e46e5,
					},
				],
			});


			channel.bulkDelete((amount?.value as number) || 50).then(() => {
                interaction.editReply({
                    embeds: [
                        {
                            title: "<:ricon_check_color:1092456013518610522> Success",
                            description: "Deleted messages.",
                            color: 0x4e46e5,
                        },
                    ],
                });
            }).catch(() => {
                interaction.editReply({ embeds: [ErrorEmbed] });
            });
		} else {
			await interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "<:ricon_clock_rounded:1092459256248270979> Please wait...",
						description: "Cloning channel...",
						color: 0x4e46e5,
					},
				],
			});

			const position = channel.position;

			await channel.clone().then((newChannel) => {
				channel.delete().then(() => {
                    newChannel.setPosition(position).then(() => {
                        newChannel.send({
                            embeds: [
                                {
                                    title: "<:ricon_check_color:1092456013518610522> Success",
                                    description: `Cleared the whole channel. This message will self-destruct in <t:${Math.floor(Date.now() / 1000) + 15}:R>.`,
                                    color: 0x4e46e5,
                                }
                            ]
						}).then((message) => {
                            setTimeout(() => { message.delete() }, 14000);
                        }).catch(() => {});
                    }).catch(() => {
                        interaction.editReply({ embeds: [ErrorEmbed] });
                    });
                }).catch(() => {
                    interaction.editReply({ embeds: [ErrorEmbed] });
                });
			});
		}
	},
};
