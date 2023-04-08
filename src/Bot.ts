import { Client } from "discord.js";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";
import dotenv from "dotenv";
import error from "./listeners/error";
import messageCreate from "./listeners/messageCreate";
dotenv.config();

const client = new Client({
	intents: ["Guilds", "MessageContent", "GuildMessages", "DirectMessages", "GuildMembers"],
});

client.login(process.env.TOKEN);

ready(client);
messageCreate(client);
interactionCreate(client);
error(client);

process.on('unhandledRejection', error => {
    console.error(error);
});