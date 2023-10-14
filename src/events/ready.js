const { Events, ActivityType, makePlainError } = require("discord.js");
const twitter = require("./twitter.js");
const x = require("./x.js");
const tiktok = require("./tiktok.js");
module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
    client.user.setPresence({
      activities: [{ name: "twitter links", type: ActivityType.Watching }],
      status: "dnd",
    });
    twitter(client);
    x(client);
    tiktok(client);
  },
};
