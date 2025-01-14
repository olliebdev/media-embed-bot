const { Events, ActivityType } = require("discord.js");

const handlers = {
    x: require("./x.js"),
    reddit: require("./reddit.js"),
    instagram: require("./instagram.js")
};

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        try {
            await client.user.setPresence({
                activities: [{
                    name: "media links",
                    type: ActivityType.Watching
                }],
                status: "dnd"
            });

            Object.entries(handlers).forEach(([name, handler]) => {
                try {
                    handler(client);
                    console.log(`✓ ${name} handler initialized`);
                } catch (error) {
                    console.error(`✗ Failed to initialize ${name} handler:`, error);
                }
            });

            console.log(`Ready! Logged in as ${client.user.tag}`);
        } catch (error) {
            console.error('Failed during bot initialization:', error);
        }
    }
};
