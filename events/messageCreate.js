const Discord = require("discord.js")

// Credit for keysmash-generating code goes to greysdawn on GitHub
// (With personal edits made by me)
const generateKeysmash = () => {

    const CHARS = "asdfghjk";
    const max = 20;
    const min = 10;

    // Inclusive random range format:
    // Math.floor(Math.random() * (max - min + 1)) + min

    let len = Math.floor(Math.random() * (max - min + 1)) + min;

    let keysmash = "";

    for(let i = 0; i < len; i++) {
        keysmash += CHARS[Math.floor(Math.random() * (CHARS.length - 1))];
    }

    let upperChance = Math.floor(Math.random() * (100 - 1 + 1)) + 1;

    // 20% chance to make it all uppercase for extra funnys

    if (upperChance >= 1 && upperChance <= 20) {
        keysmash = keysmash.toUpperCase();
    }

    return keysmash;
}

module.exports = {
    name: "messageCreate",
    run: async function runAll(bot, message) {
        const {client, prefix, owners} = bot
        let channel = message.channel;

        // If message is not in server or written by a bot, ignore it

        if (!message.guild){return}
        if (message.author.bot){return}

        //--------------------Special message conditions--------------------//

        const welcRegex = /say hi to mothbot, everyone/;
        const welcMatch = welcRegex.exec(message.content.toLowerCase());

        if (welcMatch) {

            channel.send("Hi everybody! I'm mothBot!");
            return;
        }

        // Accepting examples:
        // Ohayou, everybody
        // Ohayou everybody!
        // "Ohayou", everyboody~ (mornMatch[1] and [2] will be ")
        // Ohayou, everybody but especially Skye! (mornMatch[3] will be "skye")
        // Ohayou, everybody but especially the birthday boy! (mornMatch[3] will be "birthday boy")

        const mornRegex = /^(")?ohayou(")?,? everybody(?: but especially (?:the )?([a-zA-Z\s']+))?/;
        const mornMatch = mornRegex.exec(message.content.toLowerCase());

        if (mornMatch) {

            let mothing = "";

            if (mornMatch[1] == "\"" && mornMatch[2] == "\"") {
                mothing = "\"mothing\""
            }
            else {
                mothing = "mothing"
            }

            if (mornMatch[3]) {
                channel.send("Yeeee! Have a great day, " + mornMatch[3] + "!");
            }
            else {
                channel.send("Yeah! Good " + mothing + ", everyone!");
            }

            return;
        }

        // (Decided against searching for "pff"s, but this is how to do it if I want to)
        // const pffRegex = /^pff+$/;
        // const pffMatch = pffRegex.exec(message.content.toLowerCase());

        // If in specified channel, isn't a command, and has attachments or embeds

        // ****Eventually will want to have a command that allows you to add a channel to a list of channels for this to apply in***
        if ((message.channelId == 1035396294027513866 || message.channelId == 236364072252211200 || message.channelId == 791032458719658015 || message.channelId == 385895321751781381) && !message.content.startsWith(prefix) && (message.attachments.size > 0 || message.embeds[0])) {

            let sendChance = Math.floor(Math.random() * (100 - 1 + 1)) + 1;

            // 20% chance to send anything at all

            if (sendChance >= 1 && sendChance <= 20) {

                // 25% chance to send image, else keysmash

                if (sendChance >= 1 && sendChance <= 5) {

                    channel.send({
                        files: [{
                            attachment: 'https://i.imgur.com/R4TLAQh.png'
                        }]
                    });
                }
                else {

                    let keysmash = generateKeysmash();

                    channel.send(keysmash);
                }
            }

            return;
        }

        const hiRegex = /(?:hi|hello) mothbot/;
        const hiMatch = hiRegex.exec(message.content.toLowerCase());

        if (hiMatch) {
            message.reply("Hi!!!!!!");
            
            return;
        }

        const thanksRegex = /^(?:thanks|thank you|thankie|thank u),? mothbot/;
        const thanksMatch = thanksRegex.exec(message.content.toLowerCase());

        if (thanksMatch) {
            message.reply("You're welcome!!! :D")

            return;
        }

        const hateRegex = /(?:(?:fuck you|fuck u|i hate you|i hate u|i hate),? mothbot(?:\.|!)?$|^fuck mothbot$)/;
        const hateMatch = hateRegex.exec(message.content.toLowerCase());

        if (hateMatch) {
            message.reply("That wasn't very nice ;-;");

            return;
        }

        const sorryRegex = /sorry,? mothbot/;
        const sorryMatch = sorryRegex.exec(message.content.toLowerCase());

        if (sorryMatch) {
            message.reply("It's ok, I forgive u :)");

            return;
        }

        const rocketRegex = /surrender now,? or prepare to fight!?/;
        const rocketMatch = rocketRegex.exec(message.content.toLowerCase());

        if (rocketMatch) {
            channel.send("Moth, that's right!");

            return;
        }

        const loveRegex = /i love (?:you|u),? mothbot!?/;
        const loveMatch = loveRegex.exec(message.content.toLowerCase());

        if (loveMatch) {
            message.reply("Aww, I love u too! :D");

            return;
        }

        //------------------------------------------------------------------//

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

        // If sender is missing any permissions on the permission list of the command, do same

        if (command.permissions && member.permissions.missing(command.permissions).length !== 0) {
            return message.reply("Nuh uh uh, you didn't say the magic word!")
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