const cleverbot = require("cleverbot-free");
const fs = require('fs');

module.exports = {
    async execute(message) {

        var messageContext = fs.readFileSync('cleverbot-memory.txt').toString().split("\n");
        for(i in messageContext) {
            console.log(messageContext[i]);
        }
        var prompt = message.content.substring(22);

        console.log(prompt);

		cleverbot(prompt, messageContext).then(response => RespondToMessage(message, response, prompt));
	},
};

function RespondToMessage(message, response, prompt)
{
    message.channel.send({ content: response});
    
    fs.writeFile('cleverbot-memory.txt', prompt + "\n", { flag: 'a+' }, err => {
        if (err) {
          console.error(err);
        }
    });

    fs.writeFile('cleverbot-memory.txt', response + "\n", { flag: 'a+' }, err => {
        if (err) {
          console.error(err);
        }
    });
}