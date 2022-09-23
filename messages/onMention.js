const cleverbot = require("cleverbot-free");

module.exports = {
    async execute(message) {
        var messageText = message.content;
        console.log("Do we even get here?");
        console.log(messageText);

		cleverbot(messageText).then(response => 
            message.channel.send({ content: response})
            );
	},
};
