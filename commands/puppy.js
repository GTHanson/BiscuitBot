const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const captions = ['It me!', 'Arf arf!', 'Puppy in town!'];

module.exports = {
    names: ["puppy"],
    usage: 'puppy',
    description: "Sends a random pic of me with a caption!",
    
    execute: async (message, args) => {
        const res = await fetch('https://dog.ceo/api/breed/retriever/golden/images/random');
        const img = (await res.json()).message;
        const random = Math.floor(Math.random() * captions.length);
        let title = captions[random];

        let embed = new MessageEmbed()
            .setTitle(title)
            .setImage(img)

        return message.channel.send({embeds: [embed]});
    }
};