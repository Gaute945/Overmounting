const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('excuse')
		.setDescription('gives you a random excuse from the selected catagory'),
	async execute(interaction) {
		try {
			const axios = require("axios");
			const response = await axios.get("https://excuser-three.vercel.app/v1/excuse");
			const data = response.data
			data.forEach(item => {
				return interaction.reply(item.excuse)
			});
			// refrence random-number.js for options for catagories
		} catch (error) {
			console.error("Error while fetching excuse:", error);
			await interaction.reply("error with command");
		}
  },
};
