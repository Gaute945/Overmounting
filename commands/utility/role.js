const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
  cooldown: 5,
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

      function isHexcodeValid(str) {
        const regex = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        return regex.test(str);
      }

      if (!isHexcodeValid(color)) {
        return interaction.reply({
          content: 'Please use a valid hex color like #FF0000.',
          flags: MessageFlags.Ephemeral
        });
      }

      const role = await guild.roles.create({
        name,
        color,
        hoist: true,
        reason: 'Made by Overmounting'
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
        return interaction.reply({
          content: 'Please use a valid hex color like #FF0000.',
          flags: MessageFlags.Ephemeral
        });
      } else if (error.message === 'Missing Permissions') {
        return interaction.reply({
          content: "I don't have the 'manage roles' permission.",
          flags: MessageFlags.Ephemeral
        });
      } else if (error.code === 50035) {
        return interaction.reply({
          content: 'Role name must be 100 characters or fewer.',
          flags: MessageFlags.Ephemeral
        });
      } else {
        console.error(error);
        return interaction.reply({
          content: 'An unknown error occurred.',
          flags: MessageFlags.Ephemeral
        });
      }
    }
  }
};
