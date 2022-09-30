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
    getVoiceConnection,
} = require('@discordjs/voice');

// Specifically for button interactions.
const { MessageButton } = require('discord.js');
const player = createAudioPlayer();

const sounds = ['https://griff.pw/biscuit/bark1.wav', 'https://griff.pw/biscuit/bark2.wav', 'https://griff.pw/biscuit/bark3.wav',
                'https://griff.pw/biscuit/bark4.wav', 'https://griff.pw/biscuit/bark5.wav', 'https://griff.pw/biscuit/bark6.wav',
                'https://griff.pw/biscuit/bark7.wav', 'https://griff.pw/biscuit/bark8.wav', 'https://griff.pw/biscuit/bark9.wav',
                'https://griff.pw/biscuit/bark10.wav', 'https://griff.pw/biscuit/bark11.wav', 'https://griff.pw/biscuit/bark12.wav',
                'https://griff.pw/biscuit/bark13.wav', 'https://griff.pw/biscuit/bark14.wav', 'https://griff.pw/biscuit/bark15.wav',
                'https://griff.pw/biscuit/bark16.wav', 'https://griff.pw/biscuit/bark17.wav', 'https://griff.pw/biscuit/bark18.wav',
                'https://griff.pw/biscuit/bark19.wav', 'https://griff.pw/biscuit/bark20.wav', 'https://griff.pw/biscuit/bark21.wav',]

module.exports = {
	// The only part that makes this different from a default command.
	data: new SlashCommandBuilder()
		.setName("speak")
		.setDescription(
			"Joins the common space."
		),

	async execute(interaction, args) {
        var channel = await interaction.guild.channels.fetch('906443091454599168');
        var connection = await getVoiceConnection(channel.guild.id);
        if(connection)
        {
            await interaction.reply({ content: 'Already speaking!'});
            return;
        }

		connection = await connectToChannel(channel)
        connection.subscribe(player);
        try {
            await playSong();
        } catch (error) {
            console.error(error);
        }
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

function playSong() {
	const resource = createAudioResource(sounds[Math.floor(Math.random()*sounds.length)], {
		inputType: StreamType.Arbitrary,
	});

	player.play(resource);

    setTimeout(function(){
        try {
            playSong();
        } catch (error) {
            console.error(error);
        }
    }, (Math.random() * (30 - 5) + 5) * 60000);

	return entersState(player, AudioPlayerStatus.Playing, 5e3);
}