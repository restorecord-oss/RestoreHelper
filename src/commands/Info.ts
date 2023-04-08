import { Client, CommandInteraction } from "discord.js";
import { Command } from "src/Command";

export const Info: Command = {
	name: "info",
	description: "Displays information about the bot",
	run: async (client: Client, interaction: CommandInteraction): Promise<void> => {
		await interaction.reply({
			embeds: [
				{
					title: "Bot Information",
					description: "This is information about the bot.",
					color: 0x4e46e5,
					fields: [
						{
							name: "<:ricon_arrow:1092454857182552185> Author",
							value: "xenos#0001 (<@853058505649029190>)",
						},
						{
							name: "<:ricon_arrow:1092454857182552185> Support Server",
							value: "https://discord.gg/restorebot",
						},
						{
							name: "<:ricon_arrow:1092454857182552185> Website",
							value: "https://restorebot.gg",
						},
						{
							name: "<:ricon_arrow:1092454857182552185> Uptime",
							value: `${convertTime((client?.uptime || 0) / 1024)}`,
						},
					],
				},
			],
		});
	},
};

const convertTime = (time: number): string => {
	const days = Math.floor(time / 86400);
	const hours = Math.floor(time / 3600) % 24;
	const minutes = Math.floor(time / 60) % 60;
	const seconds = Math.floor(time % 60);

	return `${days ? `${days > 1 ? `${days} days` : `${days} day`}, ` : ""}${hours ? `${hours > 1 ? `${hours} hours` : `${hours} hour`}, ` : ""}${minutes ? `${minutes > 1 ? `${minutes} minutes` : `${minutes} minute`}, ` : ""}${seconds ? `${seconds > 1 ? `${seconds} seconds` : `${seconds} second`}, ` : ""}`;
};
