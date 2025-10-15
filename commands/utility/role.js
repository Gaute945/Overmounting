const { SlashCommandBuilder, MessageFlags } = require('discord.js');

function isHexcodeValid(str) {
  const regex = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return regex.test(str);
}

module.exports = {
  // 7 days
  cooldown: 604800,
  data: new SlashCommandBuilder()
    .setName('role')
    .setDescription('make and assign your own roles!')
    .addStringOption(option =>
      option.setName('name')
        .setDescription('The name of the role')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('color')
        .setDescription('The color of the role in hexadecimal format')
        .setRequired(true)
    ),

  async execute(interaction) {
    try {
      const guild = interaction.guild;
      const name = interaction.options.getString('name');
      const color = interaction.options.getString('color');
      const botMember = await guild.members.fetch(guild.client.user.id);

      // if (!isHexcodeValid(color)) {
      //   return interaction.reply({
      //     content: 'Please use a valid hex color like #FF0000.',
      //     flags: MessageFlags.Ephemeral
      //   });
      // }

      const role = await guild.roles.create({
        name,
        color,
        hoist: true,
        reason: 'Made by Overmounting for ' + interaction.member.name
      });

      await interaction.member.roles.add(role.id);

      const highestPosition = botMember.roles.highest.position;
      await guild.roles.setPosition(role.id, highestPosition - 1);

      await interaction.reply({
        content: 'Role Created and Added to User!',
      });

      await interaction.channel.send(`<@&${role.id}>`);
    } catch (error) {
      if (error.code === 'ColorConvert') {
        console.log("error");
        await interaction.reply({
          content: 'Please use a valid hex color like #FF0000.',
          flags: MessageFlags.Ephemeral
        });
        return false;
      } else if (error.message === 'Missing Permissions') {
        await interaction.reply({
          content: "I don't have the 'manage roles' permission.",
          flags: MessageFlags.Ephemeral
        });
        return false;
      } else if (error.code === 50035) {
        await interaction.reply({
          content: 'Role name must be 100 characters or fewer.',
          flags: MessageFlags.Ephemeral
        });
        return false;
      } else {
        console.error(error);
        await interaction.reply({
          content: 'An unknown error occurred.',
          flags: MessageFlags.Ephemeral
        });
        return false;
      }
    }
  }
};
