module.exports = (client) => {
    client.on("messageCreate", async (message) => {
        if (message.author.bot || !message.guild) return;

        const xRegex = /https:\/\/x\.com\/([^\/\s]+)\/status\/(\d+)(?:\/(?:photo|video)\/\d+)?(?:\?[^\s]*)?/g;

        if (!xRegex.test(message.content)) return;

        xRegex.lastIndex = 0;
        const editedContent = message.content.replace(xRegex, (match, username, statusId) => {
            return `https://fixupx.com/${username}/status/${statusId}`;
        });

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
            message.reply('Sorry, something went wrong while processing the X URL.').catch(() => {});
        }
    });
};