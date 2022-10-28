module.exports = {
    name: "messageDelete",
    run: async function runAll(bot, message) {
        const channel = message.channel
        const user = message.author

        // Runs into an error when the message was just an image,
        // hence had empty text content
        // Fix later

        channel.send(message.content)
        user.send(message.content)
    }
}