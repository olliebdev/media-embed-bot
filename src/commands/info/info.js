const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("info")
		.setDescription("Shows infomation about the bot."),
	async execute(interaction) {
		await interaction.reply(
			"This bot fixes media embeds in Discord for Twitter / X, TikTok & Reddit.\n https://github.com/Ollie2304/media-embed-bot",
		);
	},
};
