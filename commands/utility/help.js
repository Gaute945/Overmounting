const client = require("../../client");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Says all the commands"),

  async execute(interaction) {
    const commandList = client.commands.map(
      command => `/${command.data.name}`).join(", ");
    await interaction.reply(`Available commands: ${commandList}`);
  }
};
