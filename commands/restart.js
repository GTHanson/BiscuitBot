const {MessageEmbed} = require("discord.js");
global.sleepMessages = ['dozing off...', 'I\'m going to sleep...', 'beep boop, shutting down...', 'nappy time...', 'zzzzz...'];

module.exports = {
	names: ['restart', 'nap'],
	usage: 'restart, nap',
	description: 'Restarts the pup.',
	execute: (message, args) => {
		const random = Math.floor(Math.random() * sleepMessages.length);
		let title = '*Yawn*\t' + sleepMessages[random];

		let embed = new MessageEmbed()
			.setTitle(title);

		return message.channel.send({embeds: [embed]})
			.then(() => process.exit());
	}
};