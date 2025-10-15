const { SlashCommandBuilder, MessageFlags } = require('discord.js');

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
        .addChoices(
          { name: 'Red', value: 'FF0000' },
          { name: 'Green', value: '00FF00' },
          { name: 'Blue', value: '0000FF' },
          { name: 'Yellow', value: 'FFFF00' },
          { name: 'Orange', value: 'FFA500' },
          { name: 'Purple', value: '800080' },
          { name: 'Pink', value: 'FFC0CB' },
          { name: 'Brown', value: 'A52A2A' },
          { name: 'Black', value: '000000' },
          { name: 'White', value: 'FFFFFF' },
          { name: 'Gray', value: '808080' },
          { name: 'Cyan', value: '00FFFF' },
          { name: 'Magenta', value: 'FF00FF' },
          { name: 'Lime', value: '00FF00' },
          { name: 'Teal', value: '008080' },
          { name: 'Navy', value: '000080' },
          { name: 'Olive', value: '808000' },
          { name: 'Maroon', value: '800000' },
          { name: 'Silver', value: 'C0C0C0' },
          { name: 'Gold', value: 'FFD700' },
          { name: 'Beige', value: 'F5F5DC' },
          { name: 'Ivory', value: 'FFFFF0' },
          { name: 'Lavender', value: 'E6E6FA' },
          { name: 'Mint', value: '98FF98' },
          { name: 'Peach', value: 'FFDAB9' }
        )
    ),

  async execute(interaction) {
    try {
      const guild = interaction.guild;
      const name = interaction.options.getString('name');
      const color = interaction.options.getString('color');
      const botMember = await guild.members.fetch(guild.client.user.id);

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
        console.error(error);
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
