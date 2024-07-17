module.exports = (client) => {
	// Listens for a message to be sent
	client.on("messageCreate", async (message) => {
		// Ignore messages sent from bots
		if (message.author.bot) return;

		// Regex looking for Reddit URLs
		const redditRegex = /(https?:\/\/(?:www\.)?reddit\.com\/r\/[a-zA-Z0-9_]+\/comments\/[a-zA-Z0-9_]+\/[^\/\s]*)/g;
		// Gets the content of the sent message
		const content = message.content;

		// Checks if the message contains a Reddit URL by testing it against redditRegex
		// also checks the user has not already embedded it themselves
		if (
			redditRegex.test(content) &&
			!content.includes("https://vxreddit.com")
		) {
			// Adds "vx" infront of reddit
			const editedContent = content.replace(redditRegex, (match) => {
                return match.replace("reddit.com", "vxreddit.com");
            });

			try {
				// Create temp webhook with message.author's info
				const webhook = await message.guild.channels.cache
					.get(message.channel.id)
					.createWebhook({
						name: message.member.displayName || message.author.username,
						avatar: message.author.displayAvatarURL({ dynamic: true }),
					});
				// Send the modified message to the channel
				await webhook.send(editedContent);
				// Delete temp webhook
				await webhook.delete();
				// Delete the original message
				await message.delete();
				// If there's an error it's logged to the console
			} catch (error) {
				console.error(`Error with message: ${message.content}`, error);
			}
		}
	});
};
