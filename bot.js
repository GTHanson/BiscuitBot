const { Client, MessageEmbed, Emoji } = require('discord.js');
const fs = require('fs');
const cleverbot = require("cleverbot-free");
global.cleverContext = [];

global.homesteadVCID = "906443091454599168";
global.madisonID = "416946745545719808";
global.griffonID = "178273444041981952";

// Create client.
const client = new Client({
	partials: [ 'GUILD_MEMBER', 'MESSAGE', 'REACTION' ],
	intents: [ 'GUILDS', 'GUILD_MEMBERS', 'GUILD_INVITES', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_VOICE_STATES' ]
});

// Constants.
client.PREFIX = '!';
client.colors = { SUCCESS: '#32CD32', WARNING: '#FDEE00', ERROR: '#FF2400', INFO: '#007FFF', NSFW: "#ff0000" };
client.urls = {
	WEBSITE: 'https://griff.pw',
	ISSUE: 'blah blah',
	SUPPORT: 'blah blah blah'
};

// Invite cache for invite link attribution.
client.cachedInvites = new Map();

// Load commands.
client.commands = [];
fs.readdir('./commands/', (error, fileNames) => {
	if (error) { return console.log(error); }
	for (fileName of fileNames.filter((fileName) => fileName.endsWith('.js'))) { client.commands.push(require(`./commands/${fileName}`)); }
});

// Log errors.
client.on('error', (error) => console.log);
client.on('shardError', (error) => console.log);

process.on('SIGTERM', () => {
	const random = Math.floor(Math.random() * sleepMessages.length);

	client.guilds.cache.forEach((guild) => {
		let embed = new MessageEmbed()
			.setTitle("*Yawn*\t")
			.setDescription(sleepMessages[random]);

		guild.systemChannel.send({embeds: [embed]})
			.then(message => console.log(`Ready`))
			.catch(console.error);
	});
});

client.on('ready', () => {
	client.guilds.cache.forEach((guild) => {
		let embed = new MessageEmbed()
			.setTitle("*Yawn*")
			.setDescription("I'm awake!");

		cleverContext.length = 0;
		global.sysChannel = guild.systemChannel;

		guild.systemChannel.send({embeds: [embed]})
			.then(message => console.log(`Ready`))
			.catch(console.error);
	});

	client.user.setActivity(`the homestead with love.`, {type: 'WATCHING'} );
});

client.on("voiceStateUpdate", function(oldMember, newMember){
	if (newMember.channel === null || typeof newMember.channel == 'undefined') return;

	if(newMember.channelId === homesteadVCID && oldMember.channelId !== homesteadVCID)
	{
		const madisonNames = ["Maddy", "Miss Hanson", "Madison", "Maddie", "Griffy\'s Love", "Madison Lauren Thummel", "Griffon\'s One-And-Only",
                              "Griffy's Cutie", "Mother"];
        const griffonNames = ["Griffy", "Mister Hanson", "Griffon", "Grifster", "Maddy\'s Love", "Gryffindor", "Griffon Thomas-Koke Hanson", 
                              "Madison\'s One-And-Only", "Gwiffy", "Madison\'s Cutie", "GWIFFY!!", "Father"]

		let embed = new MessageEmbed()
			.setTitle("*Arf arf!*");

		if(newMember.id === madisonID)
		{
            const random = Math.floor(Math.random() * madisonNames.length);
			embed.setDescription("Welcome home " + madisonNames[random] + "!");
		}
        else if (newMember.id === griffonID)
        {
            const random = Math.floor(Math.random() * griffonNames.length);
            embed.setDescription("Welcome home " + griffonNames[random] + "!");
        }
		else
		{
			embed.setDescription("Welcome home " + newMember.member.nickname + "!");
		}

		client.channels.cache.get('906443091014201368').send({embeds: [embed]})
			.catch(console.error);
	}
});

// Called once message is fetched if it's partial, or right away otherwise.
client.on('messageReactionAdd', (reaction, user) => {
	let embed;

	const onFetchMember = (member) => {
		embed.fields.forEach((field) => {
			const emojiQuery = field.name.startsWith('<:') && field.name.endsWith('>')
				? field.name.substring('<:'.length, field.name.length - '>'.length)
				: field.name;
			const emoji = emojiQuery instanceof Emoji
				? emojiQuery // Unicode emojis.
				: client.emojis.cache.find((emoji) =>
					emoji === emojiQuery
					|| emoji.id === emojiQuery
					|| emoji.identifier === emojiQuery
					|| emoji.name === emojiQuery
				);
			if (!emoji) {
				return user.send(new MessageEmbed()
					.setColor(client.colors.WARNING)
					.setTitle('Emoji Not Found')
					.setDescription(`The specified emoji, \`${emojiQuery}\`, could not be found.`)
				);
			}

			if (emoji !== reaction.emoji) { return; }

			const roleQuery = field.value.startsWith('<@&') && field.value.endsWith('>')
				? field.value.substring('<@&'.length, field.value.length - '>'.length)
				: field.value
			const role = reaction.message.guild.roles.cache.find((role) =>
				role === roleQuery
				|| role.id === roleQuery
				|| role.name === roleQuery
			);
			if (!role) {
				return user.send(new MessageEmbed()
					.setColor(client.colors.WARNING)
					.setTitle('Role Not Found')
					.setDescription(`The specified role, \`${roleQuery}\`, could not be found.`)
				);
			}

			if (member.roles.cache.has(role.id)) {
				member.roles.remove(role).catch((error) => console.log);
			} else {
				member.roles.add(role).catch((error) => console.log);
			}
		});
	};

	const onFetchMessage = () => {
		if (reaction.message.author !== client.user) { return; }
		if (user.bot) { return; }
		if (!reaction.message.embeds) { return; }

		embed = reaction.message.embeds[0];
		if (embed.title !== 'Role Reactions') { return; }

		reaction.users.remove(user);

		const member = reaction.message.guild.members.cache.find((member) => member.user === user);
		if (member.partial) {
			member.fetch()
				.then(() => onFetchMember(member))
				.catch((error) => console.log)
		} else {
			onFetchMember(member);
		}
	}

	if (reaction.message.partial) {
		reaction.message.fetch()
			.then(() => onFetchMessage())
			.catch((error) => console.log);
	} else {
		onFetchMessage();
	}
});

client.on('messageCreate', (message) => {
	// Execute a command from the message.

	const execute = () => {
		// Get message parts.
		const argRegex = /[^\s"]+|"([^"]*)"/gi;
		const args = [];
		const argsString = message.content.slice(client.PREFIX.length);
		while (true) {
			const match = argRegex.exec(argsString);
			if (match == null) { break; }
			args.push(match[1] ? match[1] : match[0]);
		}
		const commandName = args.shift().toLowerCase();

		// Ignore command names that don't start with a letter, since they're probably markdown.
		if (!commandName.charAt(0).match(/[a-z]/)) { return; }

		const command = client.commands.find((command) => command.names.includes(commandName));

		if (!command) {
			const messageEmbed = new MessageEmbed()
				.setColor(client.colors.WARNING)
				.setTitle('Unknown Command')
				.setDescription(`Unknown command. Use \`${client.PREFIX}help\` to get a list of commands.`);

			return message.channel.send({embeds: [messageEmbed]}
			)	.then(message => console.log(`Sent embed message.`))
				.catch(console.error);
		}

		// Check argument count.
		if (command.usage) {
			const numExpectedArgs = (command.usage.match(/\(/g) || []).length;
			if (numExpectedArgs > args.length) {
				let embed = new MessageEmbed()
					.setColor(client.colors.WARNING)
					.setTitle('Insufficient Arguments')
					.setDescription('The command you tried to execute requires more arguments.')
					.addField('Expected Arguments', numExpectedArgs)
					.addField('Supplied Arguments', args.length);

				return message.channel.send({embeds: [embed]}
				).catch((error) => console.log);
			}
		}

		try {
			command.execute(message, args);
		} catch (error) {
			message.channel.send(new MessageEmbed()
				.setColor(client.colors.ERROR)
				.setTitle('Error')
				.setDescription('There was an error executing that command. Please contact the bot author or report an issue.')
				.addField('Error Message', `${error}`)
				.addField('Support Server', client.urls.SUPPORT)
				.addField('Report an Issue', client.urls.ISSUE)
			).catch((error) => console.log);
		}

	}

	if (message.author.bot) { return; }
	if (message.mentions.members.has(client.user.id))
	{
		let embed = new MessageEmbed()
			.setTitle('*Arf arf!*')
		//cleverbot(message.content, cleverContext).then(response => 
		//{
		//	embed.setDescription(response);
		//	cleverContext.push(message.content.substring(22));
		//	cleverContext.push(response);
		//});
		
		embed.setDescription('Sowwy, my API doesnt work anymore. Gwiffy will fix it later.');
		message.channel.send({embeds: [embed]});
			
	}
	if (message.content.startsWith(client.PREFIX)) { execute(); }
});

client.login(process.env.bot_token);