//const { MessageEmbed } = require("discord.js")
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "quit",
    category: "utility",

    // Permissions needed to execute command
    permissions: [],

    devOnly: false,

    run: async ({client, message, args}) => {

        const queue = client.player.getQueue(message.guildId);

        if (!queue) {
            message.reply("There aren't even any songs in the queue to quit!");
            return;
        }

        queue.destroy();

        message.reply("Hope you liked the music!");
    }
}
