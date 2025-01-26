module.exports = (client) => {
    client.on("messageCreate", async (message) => {
        if (message.author.bot || !message.guild) return;

        const xRegex = /https:\/\/x\.com\/\w+\/status\/\d+(?:\/\w+\/\d+)?(?:\?[^\s]*)?/g;

        if (!xRegex.test(message.content)) return;

        const editedContent = message.content.replace(xRegex, (match) => {
            const [baseUrl] = match.split('?');
            return baseUrl.replace('https://x.com', 'https://fixupx.com');
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
            message.reply('Sorry, something went wrong while processing the X URL.').catch(() => { });
        }
    });
};

