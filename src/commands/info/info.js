const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("info")
		.setDescription("Shows information about the bot."),
	async execute(interaction) {
		await interaction.reply(
			"https://github.com/Ollie2304/media-embed-bot",
		);
	},
};
