const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('help')
  .setDescription('Says all the commands'),
  async execute(interaction) {
    try {
      // throw new Error ("test error");
      const CommandList = await getCommands(commands);
      await interaction.reply(CommandList);
    } catch (error) {
      console.error("Error while getting commands:", error);
      await interaction.reply("error with function: getCommands");
    }

    async function getCommands(commands) {
      let StringCommands = "/";
      try {
        // throw new Error ("test error");
        for (let track = 0; track < commands.length; track++) {
          StringCommands +=
          commands[track].name + (track < commands.length - 1 ? " /" : "");
        }
        return StringCommands;
      } catch (error) {
        throw Error;
      }
    }
  },
};
