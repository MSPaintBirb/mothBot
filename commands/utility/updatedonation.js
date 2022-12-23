const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

let db;
(async () => {
	db = await open({
		filename: 'numStorage.sqlite',
		driver: sqlite3.Database
	});
})();

const getCurrentDonationCt = async () => {
    const donoCt = await db.all(`SELECT donated FROM donations WHERE id = 1`);
    const donoCtNum = donoCt[0].donated;

    return donoCtNum;
}

module.exports = {
    name: "updatedonation",
    category: "utility",

    // Permissions needed to execute command
    permissions: [],

    devOnly: true,

    run: async ({client, message, args}) => {

        const channel = message.channel;

        if (args[0]) {
            await db.run(`UPDATE donations SET donated = ? WHERE id = 1`, [parseInt(args[0])]);

            let currentDonationCt = await getCurrentDonationCt();
            channel.send(`Database updated, current db value is ${currentDonationCt}`)
        }

        else {
            message.reply("You need to actually give me a number, doofus");
        }

    }
}