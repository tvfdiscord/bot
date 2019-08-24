import { Message, TextChannel } from 'discord.js';
import Client from '../structures/Client';

const message = async (client: Client, msg: Message) => {
    // ignore messages from other bots
    if (msg.author.bot) return undefined;

    if (
        msg.mentions.roles.first() &&
        msg.mentions.roles.first().id === client.config.roles.helper &&
        msg.channel.id != client.config.channels.helper
    ) {
        const channel = client.bot.channels.get(
            client.config.channels.helper
        ) as TextChannel;

        const embed = client
            .createEmbed('random')
            .setTitle(`${msg.author.username} needs help!`)
            .addField('Where?', `<#${msg.channel.id}>`)
            .addField('Message:', client.truncate(msg.content, 2048));

        channel.send(embed);

        return msg.reply(
            `Please wait, a helper will arrive shortly. If it's an emergency, call the number in <#${client.config.channels.resources}>. You can also request a one-on-one private session with a staff by typing \`?private\` in any channel.`
        );
    }

    // restricted urls
    if (client.config.restricted.exec(msg.content) != null) {
        // protect people from whois bans
        if (/\?whois/g.exec(msg.content) !== null) return;

        await msg.delete();
        return msg.member.ban({
            reason: 'Restricted URL sent.',
        });
    }

    let prefix: RegExpMatchArray | string = msg.content.match(
        client.config.prefix
    );
    prefix = prefix === null ? prefix : prefix.join('');

    // pluralkit check
    if (
        msg.content.toLowerCase().includes('what is pluralkit') ||
        msg.content.toLowerCase().includes('what is pk')
    ) {
        return msg.reply(
            `check the pins in <#${client.config.channels.announcements}> 📍`
        );
    }

    if (prefix != null) {
        // get the args and command name
        const args = msg.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();

        // find the command
        const command = client.commands.get(commandName);
        if (!command) return undefined;

        // if the command was executed in general
        if (msg.channel.id === client.config.channels.main)
            return await msg.delete();

        // extract the config
        const config = command.config;

        // checks
        if (
            (config.module === 'Admin' &&
                !(
                    msg.member.roles.has(client.config.roles.admin) ||
                    msg.member.roles.has(client.config.roles.techAdmin)
                )) ||
            ((config.module === 'Mod' &&
                !msg.member.roles.has(client.config.roles.mod)) ||
                (config.module === 'FK' &&
                    !msg.member.roles.has(client.config.roles.fk)))
        ) {
            return msg.reply(
                'you do not have permission to run that command 😢'
            );
        }

        if (config.dm && msg.channel.type == 'text') {
            msg.reply('check your DMs.');
        }

        if (config.args && args.length === 0) {
            let reply = 'you did not provide any arguments!';

            if (config.usage) {
                reply += `\nThe correct usage would be: \`${
                    client.isProduction ? 'tvf ' : 'tvfbeta '
                }${config.name} ${config.usage}\``;
            }

            return msg.reply(reply);
        }

        // attempt to execute the command
        try {
            return command.run(client, msg, args);
        } catch (error) {
            client.logger.error(error);
            return msg.reply(
                'there was an error trying to execute that command.'
            );
        }
    }

    // random compliments
    if (
        Math.floor(Math.random() * 150) === 1 &&
        msg.channel.id === client.config.channels.main
    ) {
        const compliment =
            client.config.compliments[
                Math.floor(Math.random() * client.config.compliments.length)
            ];
        return msg.reply(compliment);
    }
};

export default message;
