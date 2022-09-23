const discord = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const manager = new discord.ShardingManager('./bot.js', { token: process.env.bot_token });
manager.on('shardCreate', () => console.log());
manager.spawn().then(() => console.log("Spawning"));