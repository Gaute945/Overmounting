const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("random-number")
    .setDescription("random number min-max")
    .addIntegerOption(option =>
      option.setName("min")
        .setDescription("The minimum value")
        .setRequired(true)
    )

    .addIntegerOption(option =>
      option.setName("max")
        .setDescription("The maximum value")
        .setRequired(true)
    ),

  async execute(interaction) {
    try {
      const min = parseInt(interaction.options.getInteger("min"));
      const max = parseInt(interaction.options.getInteger("max"));

      if (min > max) {
        return await interaction.reply({
          content: "Please provide valid values for both min and max.",
          flags: MessageFlags.Ephemeral
      });
      }

      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      const responseMessage = `from ${min} | to ${max} | ${randomNumber}`;

      await interaction.reply(responseMessage);
    } catch (error) {
      console.error("error with random-number command", error);
      await interaction.reply({
        content: "Error while generating random number",
        flags: MessageFlags.Ephemeral
      });
    }
  }
};

