const cleverbot = require("cleverbot-free");

module.exports = {
    async execute(message) {
        var messageText = message.content;

        console.log(messageText);

		cleverbot(messageText).then(response => 
            message.channel.send({ content: response})
            );
	},
};
