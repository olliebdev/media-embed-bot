module.exports = (client) => {
	// Listens for a message to be sent
	client.on("messageCreate", async (message) => {
		// Ignore messages sent from bots
		if (message.author.bot) return;

		// Regex looking for Twitter URLs
		// looks for the pattern https://twitter.com/username/status/1234567890 + optional /photo/<number>
		const twitterRegex =
			/(https:\/\/)twitter\.com\/(\S+\/status\/(\d+)(\/photo\/\d+)?)/g;
		// Gets the content of the sent message
		const content = message.content;

		// Checks if the message contains a Twitter URL by testing it against twitterRegex
		if (twitterRegex.test(content)) {
			// Replace the Twitter URL with the FX version
			const editedContent = content.replace(
				twitterRegex,
				(_, protocol, path, __, photo) => {
					// "_" whole string - ignored
					// "protocol" - https://
					// "path" - username/status/1234567890
					// "__" - 1234567890 - ignored
					// "photo" - /photo/1
					// Check if the URL contains a photo, if it does don't add /en to the end
					if (photo) {
						return `${protocol}fxtwitter.com/${path}`;
					}
					// If the URL doesn't contain a photo add /en to the end.
					return `${protocol}fxtwitter.com/${path}/en`;
				},
			);

			try {
				const guild = message.guild;
				// Create temp webhook with message.author's info
				const webhook = await guild.channels.cache
					.get(message.channel.id)
					.createWebhook({
						name: message.author.username,
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
