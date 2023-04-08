import { Client, GuildMember, Message, TextChannel } from "discord.js";
import { slurs } from "../misc/wordlist";
import { existsSync } from "fs";
import { appendLog, createLog } from "../misc/logs";

export default (client: Client): void => {
    client.on("messageCreate", async (message: Message) => {

        const channel = message.channel as TextChannel;
        let content = message.content.toLowerCase();
        const member = message.author as unknown as GuildMember;

        if (message.author.bot) return;
        if (!member || !content) return;

        console.log(`Message: ${message.content} | Author: ${message.author.tag}`);

        // // check if /logs/DD-MM-YYYY.html exists
        // const date = new Date();
        // const dateString = `${date.getDate()}-${date.toLocaleString("default", { month: "2-digit" })}-${date.getFullYear()}`;
        // const logPath = `./logs/${dateString}.html`;

        // if (!existsSync(logPath)) {
        //     createLog(message);
        // } else {
        //     appendLog(message);
        // }



        // if channel name is "chat"
        if (!channel.name.includes("chat")) return;

        
        let hasSlur = false;
        for (const slur of slurs) {
            if (content.includes(slur)) {
                const newSlur = `${slur[0]}${"*".repeat(slur.length - 2)}${slur[slur.length - 1]}`;
                content = content.replaceAll(slur, newSlur);
                hasSlur = true;
            } 
        }

        if (hasSlur) {
            await message.delete().catch(() => {});
        
            member.send({
                embeds: [
                    {
                        title: "<:ricon_denied_color:1092456008326058106> Warning!",
                        description: `Your message was blocked because it contained a slur. Please refrain from using slurs in the future.\n\n**Message:**\n\`\`\`${content}\`\`\``,
                        color: 0x4e46e5,
                    }
                ]
            }).catch(() => {});

            member.timeout(30).catch(() => {});
        }


    });
}