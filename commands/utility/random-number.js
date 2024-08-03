const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('random-number')
  .setDescription('random number min-max'),
  options: [
    {
      type: 3,
      name: "min",
      description: "The minimum value",
      required: true,
    },
    {
      type: 3,
      name: "max",
      description: "The maximum value",
      required: true,
    },
  ],
  async execute(interaction) {
    try {
      // throw new Error ("test error");
      const min = parseInt(interaction.options.getString("min"));
      const max = parseInt(interaction.options.getString("max"));

      if (min > max) {
        return await interaction.reply(
          "Please provide valid values for both min and max."
        );
      }

      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      const responseMessage = `from ${min} | to ${max} | ${randomNumber}`;

      await interaction.reply(responseMessage);
    } catch (error) {
      console.error("error with random-number command", error);
      await interaction.reply("Error while generating random number");
    }
  },
};
