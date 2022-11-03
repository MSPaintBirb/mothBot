module.exports = {
    name: "speak",
    category: "fun",

    // Permissions needed to execute command
    permissions: [],

    devOnly: false,

    run: async ({client, message, args}) => {

        const channel = message.channel;

        var sentence = "Moth"

        // Inclusive random range format:
        // Math.floor(Math.random() * (max - min + 1)) + min

        const loops = Math.floor(Math.random() * (13 - 0 + 1)) + 0;

        for (let i = 0; i < loops; i++) {
            sentence += " moth";

            // if not the last loop

            if (i != loops - 1) {

                let commaChance = Math.floor(Math.random() * (100 - 1 + 1)) + 1;

                // 20% chance to add a comma

                if (commaChance >= 1 && commaChance <= 20) {
                    sentence += ",";
                }
            }
        }

        const endPunctuation = Math.floor(Math.random() * (3 - 1 + 1)) + 1;

        if (endPunctuation == 1) { sentence += "."; }
        if (endPunctuation == 2) { sentence += "?"; }
        if (endPunctuation == 3) { sentence += "!"; }

        channel.send(sentence);
    }
}