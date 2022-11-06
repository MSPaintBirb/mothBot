const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "queue",
    category: "utility",

    // Permissions needed to execute command
    permissions: [],

    devOnly: false,

    run: async ({client, message, args}) => {

        const channel = message.channel;

        const queue = client.player.getQueue(message.guildId)

        if (!queue || !queue.playing) {

            message.reply("There isn't anything in the queue rn :( Hey! You should add a song!");
            return;
        }

        const totalPages = Math.ceil(queue.tracks.length / 10) || 1;

        var page = 0;

        // If command specified a page and is a number

        if (args[0] && !isNaN(parseInt(args[0]))) {
            page = parseInt(args[0]) - 1;  // -1 because of array indexing
        }
        
        if (page + 1 > totalPages) {
            message.reply("There aren't even that many pages in the queue!");
            return;
        }

        if (page < 0) {
            message.reply("Come on, don't be cheeky with me ;)");
            return;
        }

        const queueStr = queue.tracks.slice(page * 10, page * 10 + 10).map((song, i) => {
            return `**${page * 10 + i + 1}.** \`[${song.duration}]\` ${song.title} -- <@${song.requestedBy.id}>`;
        }).join("\n");

        const currentSong = queue.current;

        channel.send({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`**Currently  Playing**\n` + 
                    (currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} -- <@${currentSong.requestedBy.id}>` : "None") + 
                    `\n\n**Queue**\n${queueStr}`)
                    .setFooter({
                        text: `Page ${page + 1} of ${totalPages}`
                    })
                    .setThumbnail(currentSong.thumbnail)
            ]
        })
    }
}