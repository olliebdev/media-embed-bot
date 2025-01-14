module.exports = (client) => {
    // Listens for a message to be sent
    client.on("messageCreate", async (message) => {
        // Ignore messages sent from bots
       if (message.author.bot) return;
       const instagramRegex = /https:\/\/(?:www\.)?instagram\.com\/(\S+\/?)/g;
       const content = message.content;
       
         if (
              instagramRegex.test(content) &&
              !content.includes("https://ddinstagram.com") &&
              !content.includes("https://kkinstagram.com")
            ) {
              const editedContent = content.replace(instagramRegex, "https://kkinstagram.com/$1");
              try {
                const webhook = await message.guild.channels.cache
                  .get(message.channel.id)
                  .createWebhook({
                    name: message.member.displayName || message.author.username,
                    avatar: message.author.displayAvatarURL({ dynamic: true }),
                  });
                await webhook.send(editedContent);
                await webhook.delete();
                await message.delete();
              } catch (error) {
                console.error(`Error with message: ${message.content}`, error);
              }
            }
    })
};

