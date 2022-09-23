const cleverbot = require("cleverbot-free");
const fs = require('fs');

module.exports = {
    async execute(message) {
        var messageContext = [];
        var response = "";
        var prompt = message.content.substring(22);

        console.log(prompt);

		cleverbot(prompt).then(response => message.channel.send({ content: response}));

        fs.writeFile('cleverbot-memory.txt', prompt, err => {
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
