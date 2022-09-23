const cleverbot = require("cleverbot-free");
const fs = require('fs');

module.exports = {
    async execute(message) {
        var messageContext = [];
        var prompt = message.content.substring(22);

        console.log(prompt);

		cleverbot(prompt).then(response => RespondToMessage(message, response, prompt));
	},
};

function RespondToMessage(message, response, prompt)
{
    message.channel.send({ content: response});
    
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
}