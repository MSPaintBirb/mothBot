module.exports = {
    name: "help",
    category: "info",

    // Permissions needed to execute command
    permissions: [],

    devOnly: false,

    run: async ({client, message, args}) => {

        const channel = message.channel;

        channel.send({
            embeds: [
              {
                "type": "rich",
                "title": `Moth Commands!`,
                "description": "**help**  -  Displays the list ur reading right now\n\n**ping**  -  Simple way to check if I'm awake\n\n**speak**  -  I'll say a random sentence in moth language!\n\n**draw**  -  I'll draw a random sketch for you! I love art!\n\n**compliment**  -  Automated affection in the form of random adjectives and pastries!\n • ex. Heyo, my dazzling funnel cake!\n • Add a word after compliment to make it more time-specific!\n • ex. `moth!compliment evening` = Good evening, my stupendous bear claw!\n\n__**Music Player Commands:**__\n\n**play** [song/playlist/search]  [url/search term]  -  Pretty self explanatory, tbh\n • ex. `moth!play song https://www.youtube.com/watch?v=voX15vG2gOk`\n • ex. `moth!play playlist https://www.youtube.com/playlist?list=PLqqbIIJ0YzpTATxxyfdOlzlu4O9UG9dGL`\n • ex. `moth!play search smash mouth all star`\n\n**queue**  -  Displays the current song and everything in the queue\n • Include a number after the command to display that page of the queue\n • ex. `moth!queue 2`\n\n**skip**  -  Skips the current song in the queue\n\n**shuffle**  -  Shuffles all songs left in the queue\n\n**quit**  -  Clears the queue and I leave the vc",
                "color": 0xed5d73,
                "thumbnail": {
                  "url": `https://64.media.tumblr.com/25061d5dcbb57841461212ecc59e5b1e/tumblr_ormnmo5GsC1ua4yito1_r2_1280.png`,
                  "height": 0,
                  "width": 0
                },
                "footer": {
                  "text": `Remember, the prefix is: moth!`,
                  "icon_url": `https://64.media.tumblr.com/25061d5dcbb57841461212ecc59e5b1e/tumblr_ormnmo5GsC1ua4yito1_r2_1280.png`
                }
              }]
        })
    }
}