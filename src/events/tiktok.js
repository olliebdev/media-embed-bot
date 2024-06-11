module.exports = (client) => {
	// Listens for a message to be sent
	client.on("messageCreate", async (message) => {
		// Ignore messages sent from bots
		if (message.author.bot) return;

		// Regex looking for TikTok URLs
		// looks for the pattern tiktok.com/username/...
		const tiktokRegex = /(tiktok\.com\/\S+\/+)/g;
		// Gets the content of the sent message
		const content = message.content;

		// Checks if the message contains a TikTok URL by testing it against tiktokRegex
		// also checks the user has not already embedded it themselves
		if (
			tiktokRegex.test(content) &&
			!content.includes("https://vm.vxtiktok.com" ||"https://vxtiktok.com" || "https://tnktok.com" || "https://vm.tnktok.com")
		) {
			// Adds "vx" infront of tiktok
			const editedContent = content.replace("tiktok.com", "tnktok.com");

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
