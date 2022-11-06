module.exports = {
    name: "quit",
    category: "utility",

    // Permissions needed to execute command
    permissions: [],

    devOnly: false,

    run: async ({client, message, args}) => {

        const queue = client.player.getQueue(message.guildId);

        if (!queue) {
            message.reply("I'm not even in a voice channel, dummy!");

            // If still in voice channel somehow (Usually if bot restarts while in VC), leave
            // (Doesn't work)
            
            // if (message.guild.me.voice.channel) {
            //     message.guild.me.voice.channel.leave()
            // }

            return;
        }

        queue.destroy();

        message.reply("C ya! Hope you liked the music!");
    }
}
