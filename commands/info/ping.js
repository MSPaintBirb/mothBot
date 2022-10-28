module.exports = {
    name: "ping",
    category: "info",

    // Permissions needed to execute command
    permissions: [],

    devOnly: false,

    run: async ({client, message, args}) => {
        message.reply("Pong!")
    }
}