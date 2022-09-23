const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	name: "dice",
	description: "Roll a die",

	async execute(interaction, args) {
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('d4')
					.setLabel('D4')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('d6')
					.setLabel('D6')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('d8')
					.setLabel('D8')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('d10')
					.setLabel('D10')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('d20')
					.setLabel('D20')
					.setStyle('PRIMARY')
			);
		await interaction.reply({ content: "Please choose a die from the selection below.", components: [row] });
	},
};
