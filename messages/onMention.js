const cleverbot = require("cleverbot-free");

module.exports = {
    async execute(message, args) {
        var messageText = "";
		for(var i = 0; i < args.length; i++) {
			messageText += args[i] + " ";
		}

		cleverbot(messageText).then(response => 
            message.channel.send({ content: response})
            );
	},
};
