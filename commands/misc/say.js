module.exports = {
	name: "say",
	description: "Says something",

	execute(message, args) {
		message.channel.messages.fetch({ limit: 1 }).then(messages => {
			let lastMessage = messages.first();
			
			if (!lastMessage.author.bot) {
			  lastMessage.delete();
			}
		});
		var messageText = "";
		for(var i = 0; i < args.length; i++) {
			messageText += args[i] + " ";
		}
		message.channel.send({ content: messageText});
	},
};
