const { ActivityType } = require("discord.js")

module.exports = {
    name: "ready",
    run: async (bot) => {
        console.log("Logged in as " + bot.client.user.tag)

        const { client } = bot

        client.user.setActivity('L A M P', { type: ActivityType.Watching })
    }
}