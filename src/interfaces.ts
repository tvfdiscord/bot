import { Client } from "discord.js";

/*
.......##.......##.....######..##.......####.########.##....##.########
......##.......##.....##....##.##........##..##.......###...##....##...
.....##.......##......##.......##........##..##.......####..##....##...
....##.......##.......##.......##........##..######...##.##.##....##...
...##.......##........##.......##........##..##.......##..####....##...
..##.......##.........##....##.##........##..##.......##...###....##...
.##.......##...........######..########.####.########.##....##....##...
*/
interface BotConfig {
    // config
    prefix: string;

    // authentication
    token: string;
}

export interface BotClient extends Client {
    config: BotConfig;
}