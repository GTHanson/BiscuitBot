const { MessageEmbed } = require('discord.js');

module.exports = {
	names: ['ping'],
	usage: 'PING',
	description: 'Checks bot response time.',
	execute: (message, args) => {
		let context = "";
		for (let i = 0; i < cleverContext.length; i++)
		{
			context += cleverContext[i] + " | ";
		}

		let embed = new MessageEmbed()
			.setColor(message.client.colors.INFO)
			.setTitle('Pong!')
			.addField('Client', `${new Date() - message.createdAt}ms`, true)
			.addField('API', `${Math.round(message.client.ws.ping)}ms`, true)
			.setDescription(context);

		return message.channel.send({embeds: [embed]});
	}
};