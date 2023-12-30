module.exports = (client) => {
	// Listens for a message to be sent
	client.on("messageCreate", async (message) => {
		// Ignore messages sent from bots
		if (message.author.bot) return;

		// Regex looking for Reddit URLs
		const redditRegex = /(reddit\.com\/\S+\/+)/g;
		// Gets the content of the sent message
		const content = message.content;

		// Checks if the message contains a Reddit URL by testing it against redditRegex
		// also checks the user has not already embedded it themselves
		if (
			redditRegex.test(content) &&
			!content.includes("https://vxreddit.com")
		) {
			// Adds "vx" infront of reddit
			const editedContent = content.replace(redditRegex, "vx$1");

			try {
				// Delete the original message
				await message.delete();
				// Send the modified message to the channel
				await message.channel.send(
					`${message.author} I've embedded your Reddit media for you!\n${editedContent}`,
				);
				// If there's an error it's logged to the console
			} catch (error) {
				console.error(`Error with message: ${message.content}`, error);
			}
		}
	});
};
