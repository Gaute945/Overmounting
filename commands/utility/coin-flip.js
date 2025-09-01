const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("coin-flip")
    .setDescription("flips a coin"),
  async execute(interaction) {
    async function getCoin() {
      return Math.floor(Math.random() * 2) + 1;
    }

    try {
      // throw new Error ("test error");
      switch (await getCoin()) {
      case 1:
        return await interaction.reply("Head Wins!");

      case 2:
        return await interaction.reply("Tails Wins!");

      default:
        return await interaction.reply({
          content: "Value is out of valid range",
          flags: MessageFlags.Ephemeral
      });
      }
    } catch (error) {
      console.error("Error while getting coin:", error);
      await interaction.reply({
        content: "error with function: getCoin",
        flags: MessageFlags.Ephemeral
      });
    }
  }
};
