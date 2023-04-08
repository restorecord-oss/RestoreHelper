import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "../Command";

export const Help: Command = {
	name: "help",
	description: "Displays help information about the bot",
    run: async (client: Client, interaction: CommandInteraction): Promise<void> => {
        await interaction.reply({
            ephemeral: true,
            embeds: [
                {
                    title: "Bot Help",
                    description: "This is a list of all the commands available to you.",
                    fields: [
                        {
                            name: "/help",
                            value: "Displays help information about the bot",
                        },
                        {
                            name: "/donate",
                            value: "Shows you how to donate and support us 💜",
                        },
                        {
                            name: "/info",
                            value: "Displays information about the bot",
                        },
                    ],
                    color: 0x4E46E5,
                    footer: {
                        text: `Requested by ${interaction.user.tag}`,
                        icon_url: interaction.user.avatarURL({ forceStatic: true, size: 128 }) || undefined,
                    },
                    author: {
                        name: client.user?.username || "RestoreHelper",
                        icon_url: client.user?.avatarURL({ forceStatic: true, size: 128 }) || undefined,
                    },
                }
            ]
        });
    }
};
