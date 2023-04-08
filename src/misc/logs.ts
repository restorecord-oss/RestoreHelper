import { Message, TextChannel } from "discord.js";
import { existsSync, readFileSync, writeFileSync } from "fs";

export const appendLog = async (message: Message): Promise<void> => {
    // read file and parse html then append to it
    const date = new Date();
    const dateString = `${date.getDate()}-${date.toLocaleString("default", { month: "2-digit" })}-${date.getFullYear()}`;
    const logPath = `./logs/${dateString}.html`;

    const file = readFileSync(logPath, "utf-8");
    const dom = new DOMParser().parseFromString(file, "text/html");
    const messages = dom.getElementById("messages");
    const messageDiv = dom.createElement("div");
    messageDiv.id = "message";
    messageDiv.classList.add("flex", "flex-row", "gap-2");
    messageDiv.innerHTML = `
        <div id="author" class="flex flex-col">
            <div id="avatar" class="w-8 h-8 rounded-full bg-gray-300">${message.author.displayAvatarURL()}</div>
            <div id="tag" class="text-sm font-bold">${message.author.tag}</div>
        </div>
        <div id="content" class="flex flex-col">
            <div id="message" class="text-sm">${message.content}</div>
        </div>
    `;

    messages?.appendChild(messageDiv);

    // write to file
    writeFileSync(logPath, dom.documentElement.outerHTML);
}

export const createLog = async (message: Message): Promise<void> => {
    const date = new Date();
    const dateString = `${date.getDate()}-${date.toLocaleString("default", { month: "2-digit" })}-${date.getFullYear()}`;
    const logPath = `./logs/${dateString}.html`;

    // use template to create file
    const html = template.replace("{date}", dateString).replace("{message.author.avatar}", message.author.displayAvatarURL()).replace("{message.author.tag}", message.author.tag).replace("{message.content}", message.content);

    // write to file
    writeFileSync(logPath, html);
}



const template = `
<html>
    <head>
        <title>Discord Themed Logs for {date}</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body id="body" style="background-color: #313338;width: 100vw; height: 100vh;margin: 0;padding: 0;">
        <div id="messages" class="flex flex-col gap-2" style="max-height: 100vh; overflow-y: scroll;">
            <div id="message" class="flex flex-row gap-2" style="max-width: 100vw;">
                <div id="author" class="flex flex-col" style="max-width: 100px;">
                    <div id="avatar" class="w-8 h-8 rounded-full bg-gray-300">{message.author.avatar}</div>
                    <div id="name" class="text-sm font-bold text-center text-gray-500">{message.author.tag}</div>
                </div>
                <div id="content" class="flex flex-col" style="max-width: 100%;">
                    <div id="text" class="text-sm bg-white text-gray-900 p-2 rounded">{message.content}</div>
                </div>
            </div>
        </div>
    </body>
</html>
`;