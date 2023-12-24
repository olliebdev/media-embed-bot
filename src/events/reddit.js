module.exports = (client) => {
	client.on("messageCreate", async (message) => {
		if (message.author.bot) return;

		const redditRegex = /(reddit\.com\/\S+\/+)/g;
		const redditcontent = message.content;

		if (
			redditRegex.test(redditcontent) &&
			!redditcontent.includes("https://vxreddit.com")
		) {
			const editedredditContent = redditcontent.replace(redditRegex, "vx$1");
			message.delete().catch(console.error);
			message.channel.send(
				`${message.author} I've embedded your Reddit media for you!\n ${editedredditContent}`,
			);
		}
	});
};
