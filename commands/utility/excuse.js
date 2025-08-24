const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('excuse')
		.setDescription(
			'gives you a random excuse from the selected category')
		.addStringOption(option =>
			option.setName("category")
				.setDescription("what category of excuse do you need?")
				.addChoices(
					{ name: 'Family', value: 'family' },
					{ name: 'Office', value: 'office' },
					{ name: 'Children', value: 'children' },
					{ name: 'College', value: 'college' },
					{ name: 'Party', value: 'party' },
					{ name: 'Funny', value: 'funny' },
					{ name: 'Unbelievable', value: 'unbelievable' },
					{ name: 'Developers', value: 'developers' },
					{ name: 'Gaming', value: 'gaming' },
				)
		),
	async execute(interaction) {
		try {
			const category = interaction.options.getString("category")?.toLowerCase();
			const axios = require("axios");
			let response;
			if (!category) {
				response = await axios.get(
					`https://excuser-three.vercel.app/v1/excuse`
				);
			} else {
				response = await axios.get(
					`https://excuser-three.vercel.app/v1/excuse/${category}`
				);
			}
			const data = response.data
			data.forEach(item => {
				return interaction.reply(item.excuse)
			});
		} catch (error) {
			console.error("Error while fetching excuse:", error);
			await interaction.reply({
				content: "error with command",
				ephemeral: true
			});
		}
	},
};
