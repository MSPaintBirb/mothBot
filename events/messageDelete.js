module.exports = {
    name: "messageDelete",
    run: async function runAll(bot, message) {
        const channel = message.channel
        const user = message.author

        // Remember to change from author of message to me specifically

        user.send("Deleted message sent by: " + user)

        if (message.content) {
            user.send(message.content);
        }
        if (message.attachments) {
            message.attachments.each(attachment => {
                user.send({files: [attachment]});
            })
        }
        else {
            user.send("Was not able to get message content")
        }
    }
}