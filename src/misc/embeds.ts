import { APIEmbed, JSONEncodable } from "discord.js";

export const ErrorEmbed: (APIEmbed | JSONEncodable<APIEmbed>) = {
    title: "<:ricon_minus_color:1092456005985640598> Error",
    description: "An error has occurred.",
    color: 0xff0000,
}