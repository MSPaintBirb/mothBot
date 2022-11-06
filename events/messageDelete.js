module.exports = {
    name: "messageDelete",
    run: async function runAll(bot, message) {
        const { client } = bot
        const channel = message.channel
        const user = message.author

        // me needs to be a user variable, not just an id

        const me = await client.users.fetch("226472904420753418");

        me.send("Deleted message sent by: " + user)

        if (message.content) {
            me.send(message.content);
        }
        if (message.attachments.size > 0) {
            message.attachments.each(attachment => {
                me.send({files: [attachment]});
            })
        }
        else {
            me.send("Was not able to get message content")
        }
    }
}