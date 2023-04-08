import { Client, OAuth2Scopes, TextChannel } from "discord.js";
import { Commands } from "../Commands";

export default (client: Client): void => {
	client.on("ready", async () => {
		if (!client.user || !client.application) return;

        await client.application.commands.set(Commands).then(() => {
            console.log(`Registered ${Commands.length} slash commands!`);
        }).catch((err) => console.error(err));

		console.log(`${client.user.tag} Successfully logged in!`);

        console.log(
            client.generateInvite({
                scopes: [OAuth2Scopes.Bot],
                permissions: ["Administrator"],
            })
        );

        const clearTimer = 1000 * 60 * 60 * 2; // 2 hours

        setInterval(async () => {
            console.log("Clearing channel...");

            const server = client.guilds.cache.get("1054439954043895878");
            if (!server) return;

            const channel = server.channels.cache.find((c) => c.name === "chat") as TextChannel;
            if (!channel) return;

			const position = channel.position;

			await channel.clone().then((newChannel) => {
				channel.delete().then(() => {
                    newChannel.setPosition(position).then(() => {
                        newChannel.send({
                            embeds: [
                                {
                                    title: "<:ricon_check_color:1092456013518610522> Success",
                                    description: `Next clear will be <t:${Math.floor(Date.now() / 1000) + clearTimer / 1000}:R>.`,
                                    color: 0x4e46e5,
                                }
                            ]
						}).catch(() => {});
                    }).catch(() => {});
                }).catch(() => {});
			});
        }, clearTimer);
	});
};