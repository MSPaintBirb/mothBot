const { Client, GatewayIntentBits, DiscordAPIError, Collection } = require("discord.js")
require("dotenv").config()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
})

let bot = {
    client,
    prefix: "moth!",
    owners: ["226472904420753418"]
}

client.commands = new Collection
client.events = new Collection

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)

client.loadEvents(bot, false)
client.loadCommands(bot, false)

module.exports = bot

client.login(process.env.TOKEN)