const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Says all the commands"),

  async execute(interaction) {
    const commandList = interaction.client.commands.map(
      command => `/${command.data.name}`).join(", ");
    await interaction.reply({
      content: `Available commands: ${commandList}`,
      flags: MessageFlags.Ephemeral
    });
  }
};
