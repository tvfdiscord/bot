import { Inhibitor } from 'discord-akairo';
import { Message } from 'discord.js';

class GeneralInhibitor extends Inhibitor {
	constructor() {
		super('general', {
			reason: 'Commands can not be run in general!',
		});
	}

	exec(msg: Message) {
		const channels = this.client.constants.channels;
		return [channels.general.id, channels.tw.id].includes(msg.channel.id);
	}
}

module.exports = GeneralInhibitor;
