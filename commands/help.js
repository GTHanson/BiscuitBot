const { MessageEmbed } = require('discord.js');

module.exports = {
	names: ['help'],
	usage: 'help [command]',
	description: 'Returns a list of commands.',
	execute: (message, args) => {
		const embed = new MessageEmbed()
			.setColor(message.client.colors.INFO)
			.setTitle('Commands');
		if (args.length > 0) {
			// Specific command.
			console.log("Trying to help with args");
			const command = message.client.commands.find((command) => command.names.includes(args[0]));

            if (command === false) {
                const messageEmbed = new MessageEmbed()
                    .setColor(client.colors.WARNING)
                    .setTitle('Unknown Command')
                    .setDescription(`Unknown command. Use \`${client.PREFIX}help\` to get a list of commands.`);
    
                return message.channel.send({embeds: [messageEmbed]}
                )	.then(message => console.log(`Sent embed message.`))
                    .catch(console.error);
            }

			embed
				.setTitle(`Command: ${command.names[0]}`)
				.setDescription(command.description)
				.addField('Aliases', `${command.names}`)
				.addField('Usage', command.usage);
			return message.channel.send({embeds: [embed]}).catch((error) => console.log);
		}

		// List of commands.
		for (let command of message.client.commands) { embed.addField(`${command.names} `, command.description, true); }
		return message.channel.send({embeds: [embed]}).catch((error) => console.log);
	}
};