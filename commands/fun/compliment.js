const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

let db;
(async () => {
	db = await open({
		filename: 'mothDB.sqlite',
		driver: sqlite3.Database
	});
})();

module.exports = {
    name: "compliment",
    category: "fun",

    // Permissions needed to execute command
    permissions: [],

    devOnly: false,

    run: async ({client, message, args}) => {
        const channel = message.channel;

        const adjectives = await db.all("SELECT * FROM adjectives");
        const pastries = await db.all("SELECT * FROM pastries");

        const adjSize = adjectives.length;
        const pasSize = pastries.length;

        // Inclusive random range format:
        // Math.floor(Math.random() * (max - min + 1)) + min

        const randAdjId = Math.floor(Math.random() * (adjSize - 1 + 1)) + 1;
        const randPasId = Math.floor(Math.random() * (pasSize - 1 + 1)) + 1;

        const randAdj = await db.all(`SELECT adjective FROM adjectives WHERE id = ?`, [randAdjId]);
        const randPas = await db.all(`SELECT pastry FROM pastries WHERE id = ?`, [randPasId]);

        const adjStr = randAdj[0].adjective;
        const pasStr = randPas[0].pastry;

        if (args[0]) {
            channel.send("Good " + args[0] + ", my " + adjStr + " " + pasStr + "!");
        }
        else {
            channel.send("Heyo, my " + adjStr + " " + pasStr + "!");
        }
    }
}