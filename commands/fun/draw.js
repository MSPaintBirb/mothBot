const Canvas = require("canvas")
const Discord = require("discord.js")
const { MessageAttachment } = require("discord.js")

const generateImage = async () => {

    // Inclusive random range format:
    // Math.floor(Math.random() * (max - min + 1)) + min

    let height = Math.floor(Math.random() * (1500 - 500 + 1)) + 500;
    let width = Math.floor(Math.random() * (1500 - 500 + 1)) + 500;

    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.fillRect(0, 0, width, height);
    
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.beginPath();

    let loops = Math.floor(Math.random() * (50 - 10 + 1)) + 10;

    let randX = Math.floor(Math.random() * (width - 0 + 1)) + 0;
    let randY = Math.floor(Math.random() * (height - 0 + 1)) + 0;

    ctx.moveTo(randX, randY);

    for (let i = 0; i < loops; i++) {

        let randX = Math.floor(Math.random() * (width - 0 + 1)) + 0;
        let randY = Math.floor(Math.random() * (height - 0 + 1)) + 0;

        ctx.lineTo(randX, randY);
    }

    ctx.stroke();

    const attachment = canvas.toBuffer();
    return attachment;
}

module.exports = {
    name: "draw",
    category: "fun",

    // Permissions needed to execute command
    permissions: [],

    devOnly: false,

    run: async ({client, message, args}) => {
        const img = await generateImage();

        const channel = message.channel;

        channel.send({
            content: "I did an art!",
            files: [img]
        })
    }
}