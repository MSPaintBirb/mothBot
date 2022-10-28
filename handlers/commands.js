const { getFiles } = require("../util/functions")
const fs = require("fs")

// I don't know why I wrote this line, it doesn't even seem to be in
// the tutorial I followed. I'm keeping it here as a comment in case
// something breaks and I actually need it for some reason

//const { category } = require("../commands/info/ping")

module.exports = (bot, reload) => {
    const {client} = bot

    fs.readdirSync("./commands/").forEach((category) => {
        let commands = getFiles(`./commands/${category}`, ".js")

        commands.forEach((f) => {

            if (reload){
                delete require.cache[require.resolve(`../commands/${category}/${f}`)]
            }

            const command = require(`../commands/${category}/${f}`)
            client.commands.set(command.name, command)
        })
    })

    console.log(`Loaded ${client.commands.size} commands`)
}