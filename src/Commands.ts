import { Command } from "./Command";
import { Clear } from "./commands/Clear";
import { Help } from "./commands/Help"
import { Info } from "./commands/Info";

export const Commands: Command[] = [
    Help,
    Info,
    Clear,
];