const { Events } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`Command not found: ${interaction.commandName}`);
            await interaction.reply({
                content: 'Sorry, that command is no longer available.',
                ephemeral: true
            }).catch(error => {
                console.error('Failed to send command not found message:', error);
            });
            return;
        }

        try {
            if (command.deferReply) {
                await interaction.deferReply({ ephemeral: command.ephemeral ?? false });
            }

            await command.execute(interaction);
        } catch (error) {
            console.error(`Command execution failed: ${interaction.commandName}`, {
                error: error.message,
                stack: error.stack
            });

            const errorMessage = {
                content: 'Sorry, there was an error while executing this command.',
                ephemeral: true
            };

            if (interaction.deferred) {
                await interaction.editReply(errorMessage).catch(console.error);
            } else if (interaction.replied) {
                await interaction.followUp(errorMessage).catch(console.error);
            } else {
                await interaction.reply(errorMessage).catch(console.error);
            }
        }
    },
};
