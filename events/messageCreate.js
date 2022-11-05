const Discord = require("discord.js")

module.exports = {
    name: "messageCreate",
    run: async function runAll(bot, message) {
        const {client, prefix, owners} = bot

        // If message is not in server or written by a bot, ignore it

        if (!message.guild){return}
        if (message.author.bot){return}

        // Special message conditions

        if (message.content == "Say hi to mothBot, everyone") {
            let channel = message.channel;

            channel.send("Hi everybody! I'm mothBot!");

            return;
        }

        if (message.content == "Ohayou, everybody") {
            let channel = message.channel;

            channel.send("Yeah! Good mothing, everyone!");

            return;
        }

        // Otherwise, if message doesn't start with prefix, ignore it

        if (!message.content.startsWith(prefix)){return}

        // Cuts off the prefix from the message, then splits words into an array
        // (Shifts to lowercase, so commands are not case sensitive)

        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const cmdstr = args.shift().toLowerCase()

        let command = client.commands.get(cmdstr)

        // If not a valid command, don't do anything

        if (!command){return}

        let member = message.member

        // If devOnly flag is true, and sender isn't on the list, use Nedry tactic

        if (command.devOnly && !owners.includes(member.id)) {
            return message.reply("Nuh uh uh, you didn't say the magic word!")
        }

        // If sender is missing any permissions on the permission list of the command, tell them

        if (command.permissions && member.permissions.missing(command.permissions).length !== 0) {
            return message.reply("You don't have permission to use this command")
        }

        try {
            await command.run({...bot, message, args})
        }
        catch (err) {
            let errMsg = err.toString()

            // If error message starts with a '?', then it was triggered manually
            // Returns error message back to user

            if (errMsg.startsWith("?")) {
                errMsg = errMsg.slice(1)
                await message.reply(errMsg)
            }
            else {
                console.error(err)
            }
        }
    }
}