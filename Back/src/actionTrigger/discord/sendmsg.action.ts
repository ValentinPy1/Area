import { Action } from '../action'
import { DiscordBot } from './discordBot'
import { TextChannel } from 'discord.js';

export default class discordSend implements Action {
    private discordbot = null
    constructor() {
        this.discordbot = DiscordBot.getInstance();
    }

    public async sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public async startAction(data: any, userId: string, triggerResult: any): Promise<void> {
        const channelName = data['ChannelName'];
        var message = data['body'];
        
        if (!this.discordbot.isReady) {
            console.error('Discord bot is not ready yet.');
            await this.sleep(2000);
            this.startAction(data, null, triggerResult);
            return;
        }

        const guild = this.discordbot.client.guilds.cache.get(data.guildId);
        if (!guild) return console.error('Guild not found.');

        const channel = guild.channels.cache.find(channel => channel.name === channelName);

        if (channel instanceof TextChannel) {
            channel.send(message);
        } else {
            console.error(`Channel with Name ${channelName} is not a text channel.`);
        }
    }
}