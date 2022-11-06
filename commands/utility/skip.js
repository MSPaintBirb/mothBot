const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: "skip",
    category: "utility",

    // Permissions needed to execute command
    permissions: [],

    devOnly: false,

    run: async ({client, message, args}) => {

        const channel = message.channel;

        const queue = client.player.getQueue(message.guildId)

		if (!queue) {
            message.reply("There isn't anything in the queue rn :( Hey! You should add a song!");
            return;
        }

        const currentSong = queue.current

		queue.skip()

        channel.send({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${currentSong.title} has been skipped!`)
                    .setThumbnail(currentSong.thumbnail)
                ]
        })
    }
}