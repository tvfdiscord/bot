import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

class Help extends Command {
	constructor() {
		super('help', {
			aliases: ['help'],
			category: 'Core',
			description: 'Get either a list of the available commands or instructions for specified commands! Specifying a command is opitional. If a command was specified, its help text will show up.',
			args: [
				{
					id: 'commandName',
					type: 'string',
					index: 0,
				},
			],
		});

		this.usage = 'help [commandName]';
		this.examples = [
			'help',
			'help ping',
		];
	}

	exec(msg: Message, args) {
		const embed = this.client.util.embed()
			.setAuthor(msg.author.username, msg.author.avatarURL())
			.setColor(this.client.constants.colours.green)
			.setThumbnail(this.client.user.avatarURL());

		if (!args.commandName) {
			embed
				.setTitle('TVF Bot Commands')
				.setDescription(`For detailed information run \`${this.handler.prefix}help <commandName>\``);

			console.log(this.handler.categories.size)
			this.handler.categories.forEach((category) => {
				embed.addField(category, category.map((cmd) => cmd.aliases[0]).join(', '));
				console.log(category.array().length)
			});
		} else {
			const command = this.handler.findCommand(args.commandName);

			if (command) {
				try {
					embed
						.setTitle('TVF Bot Help')
						.setDescription(command.description)
						.addField('Usage', `\`\`\`${command.usage}\`\`\``)
						.addField('Examples', `\`\`\`${command.examples.join('\n')}\`\`\``)
				} catch {;
					embed.fields = [];
					embed
						.setTitle('That command\'s help object is not complete!')
						.setDescription('Please let newt know and they\'ll get right to fixing it!')
						.setColor(this.client.constants.colours.red);
				}
			} else {
				embed
					.setTitle('I could not find that command!')
					.setDescription(`Sorry, but I could not find any information about the command \`${args.commandName}\``)
					.setColor(this.client.constants.colours.red);
			}
		}

		msg.channel.send(embed);
	}
}

module.exports = Help;
export default Help;
