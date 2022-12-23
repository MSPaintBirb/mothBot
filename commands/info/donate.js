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

const generateDonoProgress = (amt) => {

    let progressBar = "";

    if (amt > 0 && amt < 1/20 * 1400) {
        progressBar = "🟪⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜";

        return progressBar;
    }

    for (let i = 1; i <= 20; i++) {
        if (amt >= i/20 * 1400) {
            progressBar += "🟪";
        }
        else {
            progressBar += "⬜"
        }
    }

    return progressBar;
} 

module.exports = {
    name: "donate",
    category: "info",

    // Permissions needed to execute command
    permissions: [],

    devOnly: false,

    run: async ({client, message, args}) => {

        const channel = message.channel;

        let currentDonationCt = await getCurrentDonationCt();

        channel.send({
            components: [
                {
                    "type": 1,
                    "components": [
                    {
                        "style": 5,
                        "label": `Roxy's GoFundMe`,
                        "url": `https://gofund.me/e9f93279`,
                        "disabled": false,
                        "type": 2
                    }
                    ]
                }
                ],
                embeds: [
                {
                    "type": "rich",
                    "title": `Roxy Fundraiser Campaign`,
                    "description": `Due to the IRS being shitty, Rox owes 1.4k by December 26th\nShe can make a payment plan, but it'll cost nearly $500 extra in interest\nLiterally anything you can give would help a bunch!\n\n**Progress**\n${generateDonoProgress(currentDonationCt)}\n$${currentDonationCt} / $1,400\n\nDonations accepted preferably through Zelle (972-670-0899), but her GoFundMe is also linked if you prefer that!`,
                    "color": 0xb19cd9,
                    "url": `https://gofund.me/e9f93279`
                }
                ]
        })
    }
}