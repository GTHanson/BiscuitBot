const { MessageEmbed, Collection } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const {
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource,
	entersState,
	StreamType,
	AudioPlayerStatus,
	VoiceConnectionStatus,
} = require('@discordjs/voice');

// Specifically for button interactions.
const { MessageButton } = require('discord.js');
const player = createAudioPlayer();

module.exports = {
	// The only part that makes this different from a default command.
	data: new SlashCommandBuilder()
		.setName("speak")
		.setDescription(
			"Joins the common space."
		),

	async execute(interaction, args) {
        var channel = await interaction.guild.channels.fetch('906443091454599168');
		const connection = await connectToChannel(channel)
        connection.subscribe(player);
        await interaction.reply({ content: 'Bark!'});
	},
};


async function connectToChannel(channel) {
	const connection = joinVoiceChannel({
		channelId: channel.id,
		guildId: channel.guild.id,
		adapterCreator: channel.guild.voiceAdapterCreator,
	});

	try {
		await entersState(connection, VoiceConnectionStatus.Ready, 30e3);
		return connection;
	} catch (error) {
		connection.destroy();
		throw error;
	}
}