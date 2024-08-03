const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('role')
		.setDescription('make and assign your own roles!'),
    options: [
        {
          type: 3,
          name: "name",
          description: "The name of the role",
          required: true,
        },
        {
          type: 3,
          name: "color",
          description: "The color of the role in hexadecimal format",
          required: true,
        },
      ],
	async execute(interaction) {
    try {
      const guild = interaction.guild;
      const name = interaction.options.getString("name");
      const color = interaction.options.getString("color");
      const botMember = await guild.members.fetch(guild.client.user.id);

      let role;

      function isHexcodeValid(str) {
        // Regex to check validlet
        let regex = new RegExp(/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);

        if (regex.test(str) == true) {
          return "true";
        }
        else {
          return "false";
        }
      }

      // stops the creation of faulty roles
      if (isHexcodeValid(color)) {
        role = await guild.roles.create({
          name: name,
          color: color,
          hoist: true, // Display separately from online members
          reason: 'Made by Overmounting',
        });
      }

      const roleId = role.id;
      const roleMention = `<@&${role.id}>`;
      await interaction.member.roles.add(roleId);

      // Get the position of the highest role the bot has
      const highestPosition = botMember.roles.highest.position;
      const updatedRoleIndex = highestPosition - 1; 
      await guild.roles.setPosition(roleId, updatedRoleIndex);

      interaction.reply({ content: "Role Created and Added to User!", ephemeral: true});
      interaction.channel.send(roleMention);
    } catch (error) {

      if (error.code === 'ColorConvert') {
        interaction.reply({ content: "Please use a valid hex color, like: White: #FFFFFF Black: #000000 Red: #FF0000 Green: #00FF00 Blue: #0000FF Yellow: #FFFF00 Cyan: #00FFFF Magenta: #FF00FF Gray: #808080", ephemeral: true});
      } else if (error.message === 'Missing Permissions') {
        interaction.reply({ content: "I don't have the 'manage roles' permission, ask a moderator to add it!", ephemeral: false});
        console.error("Missing 'manage role' permission: ", error);
      } else {
        interaction.reply({ content: "An unknown error occurred. Please try again Later.", ephemeral: true});
        console.error("Unexpected error: ", error, "Error code: ", error.code);
      }
    }
  },
};
