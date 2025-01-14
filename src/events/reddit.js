module.exports = (client) => {
    client.on("messageCreate", async (message) => {
        if (message.author.bot || !message.guild) return;

        const redditRegex = /https?:\/\/(?:www\.)?reddit\.com\/r\/[a-zA-Z0-9_]+\/comments\/[a-zA-Z0-9_]+(?:\/[^\/\s]+)?/g;

        if (!redditRegex.test(message.content) || message.content.includes("vxreddit.com")) return;

        redditRegex.lastIndex = 0;
        const editedContent = message.content.replace(redditRegex, match =>
            match.replace("reddit.com", "vxreddit.com")
        );

        try {
            const webhook = await message.channel.createWebhook({
                name: message.member?.displayName || message.author.username,
                avatar: message.author.displayAvatarURL(),
            });

            await webhook.send(editedContent);
            await message.delete();
            await webhook.delete();
        } catch (error) {
            console.error('Error:', error);
            message.reply('Sorry, something went wrong while processing the Reddit URL.').catch(() => {});
        }
    });
};
