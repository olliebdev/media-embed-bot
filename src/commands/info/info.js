const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("info")
		.setDescription("Shows infomation about the bot."),
	async execute(interaction) {
		await interaction.reply(
			"This bot fixes media embeds in Discord for Twitter / X, TikTok & Reddit. It does this by automatically adding fx in front of Twitter / X links and vx for TikTok & Reddit and reposting the message.\nEmbed fixers:\n<https://github.com/FixTweet/FixTweet>\n<https://github.com/dylanpdx/vxtiktok>",
		);
	},
};
