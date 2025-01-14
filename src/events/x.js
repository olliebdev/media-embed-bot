const { MembershipScreeningFieldType } = require("discord.js");

module.exports = (client) => {
	// Listens for a message to be sent
	client.on("messageCreate", async (message) => {
		// Ignore messages sent from bots
		if (message.author.bot) return;

		// Regex looking for X urls
		// looks for the pattern https://x.com/username/status/1234567890 + optional /photo/<number>
		const xRegex = /(https:\/\/x\.com\/\S+\/status\/\d+)(\/photo\/\d+)?/g;
		// Gets the content of the sent message
		const content = message.content;

		// Check if the message contains an X URL by testing it against xRegex
		if (xRegex.test(content)) {
			// Replace the X URL with the fixupx version
			const editedContent = content.replace(
				xRegex,
				(_, baseUrl, photo) => {
					if (photo) {
						return `${baseUrl.replace("https://x.com", "https://fixupx.com")}${photo}`;
					}
					return baseUrl.replace("https://x.com", "https://fixupx.com");
				}
			);

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
