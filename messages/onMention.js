const cleverbot = require("cleverbot-free");
const fs = require('fs');

module.exports = {
    async execute(message) {
        var messageContext = [];

        var messageText = message.content.substring(22);

        console.log(messageText);

		cleverbot(messageText).then(response => message.channel.send({ content: response}));

        fs.writeFile('cleverbot-memory.txt', messageText, err => {
            if (err) {
              console.error(err);
            }
        });

        fs.writeFile('cleverbot-memory.txt', response, err => {
            if (err) {
              console.error(err);
            }
        });
	},
};
