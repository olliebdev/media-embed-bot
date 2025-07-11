module.exports = (client) => {
    client.on("messageCreate", async (message) => {
        if (message.author.bot || !message.guild) return;

        const instagramRegex = /https:\/\/(?:www\.)?instagram\.com\/(reel|p)\/[\w-]+\/?/g;

        if (!instagramRegex.test(message.content) ||
            message.content.includes("instagramez.com") ||
            message.content.includes("ddinstagram.com") ||
            message.content.includes("kkinstagram.com")) return;

        instagramRegex.lastIndex = 0;
        const editedContent = message.content.replace(instagramRegex, match =>
            match.replace("instagram.com", "ddinstagram.com")
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
            message.reply('Sorry, something went wrong while processing the Instagram URL.').catch(() => { });
        }
    });
};
