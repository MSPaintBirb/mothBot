module.exports = {
    name: "shuffle",
    category: "utility",

    // Permissions needed to execute command
    permissions: [],

    devOnly: false,

    run: async ({client, message, args}) => {

        const channel = message.channel;

        const queue = client.player.getQueue(message.guildId)

		if (!queue) {
            message.reply("There isn't anything in the queue rn :( Hey! You should add a song!")
            return;
        }

		queue.shuffle()

        channel.send(`The queue of ${queue.tracks.length} songs has been shuffled!`)
    }
}