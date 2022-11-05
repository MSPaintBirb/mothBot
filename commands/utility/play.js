//const { MessageEmbed } = require("discord.js")
const { EmbedBuilder } = require('discord.js');
const { QueryType } = require("discord-player")

module.exports = {
    name: "play",
    category: "utility",

    // Permissions needed to execute command
    permissions: [],

    devOnly: false,

    run: async ({client, message, args}) => {

        const channel = message.channel;

        if (!message.member.voice.channel) {
            message.reply("How can you hear a song if you aren't in a voice channel, silly?");
            return;
        }

        const queue = await client.player.createQueue(message.guild);

        if (!queue.connection) {
            await queue.connect(message.member.voice.channel);
        }

        let embed = new EmbedBuilder();

        //----------------------------------------------------------------------//

        // if sent "moth!play song ... "

        if (args[0] == "song") {

            // if put something after the word song (the link)
            // i.e. "moth!play song [url here]"

            if (args[1]) {

                let url = args[1];

                const result = await client.player.search(url, {
                    requestedBy: message.member,
                    searchEngine: QueryType.YOUTUBE_VIDEO
                })

                if (result.tracks.length == 0) {
                    message.reply("Sorry, couldn't find that video :(");
                    return;
                }
                
                const song = result.tracks[0];

                await queue.addTrack(song);

                embed
                    .setDescription(`**[${song.title}](${song.url})** has been added to the queue`)
                    .setThumbnail(song.thumbnail)
                    .setFooter({ text: `Duration: ${song.duration}`})
                
                channel.send({
                    embeds: [embed]
                })
            }

            // If only sent "moth!play song"

            else {
                message.reply("You need to give me a url if you want to hear something, silly!");
            }
        }

        //----------------------------------------------------------------------//

        // if sent "moth!play playlist ... "

        else if (args[0] == "playlist") {
                
            // if put something after the word playlist (the link)
            // i.e. "moth!play playlist [url here]"

            if (args[1]) {

                let url = args[1];

                const result = await client.player.search(url, {
                    requestedBy: message.member,
                    searchEngine: QueryType.YOUTUBE_PLAYLIST
                })

                if (result.tracks.length == 0) {
                    message.reply("Sorry, couldn't find that video :(");
                    return;
                }
                
                const playlist = result.playlist;

                await queue.addTracks(result.tracks);

                embed
                    .setDescription(`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the queue`)
                    .setThumbnail(playlist.thumbnail)

                channel.send({
                    embeds: [embed]
                })
            }

            // If only sent "moth!play playlist"

            else {
                message.reply("You need to give me a url if you want to hear something, silly!");
            }
        }

        //----------------------------------------------------------------------//

        // if sent "moth!play search ... "

        else if (args[0] == "search") {
                
            // if put something after the word search (the search term)
            // i.e. "moth!play search [search term here]"

            if (args[1]) {

                let searchTerm = "";

                for (let i = 1; i < args.length; i++) {
                    searchTerm += args[i];
                }

                const result = await client.player.search(searchTerm, {
                    requestedBy: message.member,
                    searchEngine: QueryType.AUTO
                })

                if (result.tracks.length == 0) {
                    message.reply("Sorry, couldn't find anything that matched that :(");
                    return;
                }
                
                const song = result.tracks[0];

                await queue.addTrack(song);

                embed
                    .setDescription(`**[${song.title}](${song.url})** has been added to the queue`)
                    .setThumbnail(song.thumbnail)
                    .setFooter({ text: `Duration: ${song.duration}`})

                channel.send({
                    embeds: [embed]
                })
            }

            // If only sent "moth!play search"

            else {
                message.reply("You need to give me something to look up, silly!");
            }
        }

        //----------------------------------------------------------------------//

        if (!queue.playing) {
            await queue.play()
        }
    }
}