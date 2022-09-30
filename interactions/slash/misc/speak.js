const { MessageEmbed, Collection } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

// Specifically for button interactions.
const { MessageButton } = require('discord.js');

module.exports = {
	// The only part that makes this different from a default command.
	data: new SlashCommandBuilder()
		.setName("speak")
		.setDescription(
			"Joins the common space."
		),

	async execute(interaction, args) {
		const connection = await joinVoiceChannel({
            channelId: interaction.channel.id,
            guildId: interaction.channel.guild.id,
            adapterCreator: interaction.channel.guild.voiceAdapterCreator,
        });

        await interaction.reply({ content: 'Bark!'});
	},
};
