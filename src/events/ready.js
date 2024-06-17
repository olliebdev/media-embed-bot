// Imports events + activity type from discord.js library
const { Events, ActivityType } = require("discord.js");
// Imports external code modules
const twitter = require("./twitter.js");
const x = require("./x.js");
const tiktok = require("./tiktok.js");
const reddit = require("./reddit.js");

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		// Logs in the console that the bot has started
		console.log(`Ready! Logged in as ${client.user.tag}`);
		// Sets the bot's presence
		client.user.setPresence({
			activities: [{ name: "media links", type: ActivityType.Watching }],
			status: "dnd",
		});

		// Execute functions from external modules
		twitter(client);
		x(client);
		tiktok(client);
		reddit(client);
	},
};
