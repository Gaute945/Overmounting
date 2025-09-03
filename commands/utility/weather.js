const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('weather')
		.setDescription('shows wheater for the location in Norway that you select')

		.addStringOption(option =>
			option.setName("location")
				.setDescription("where do you want to know the weather?")
				.setAutocomplete(true)
				.addChoices(
					// fetch locations with autocomplete
				)
		)

		.addIntegerOption(option =>
			option.setName("time")
				.setDescription("for what time do you want to know the weather?")
				.addChoices(
					// any date 24 hour
				)
		)

		.addStringOption(option =>
			option.setName("type")
				.setDescription("what category of wheater do you want to know?")
				.setAutocomplete(true)
				.addChoices(
					// fetch the catagories from the location selected
				)
		),
		// timeoffsets=default
		// levels=default
		// qualities=0,1,2,3,4

		async autocomplete(interaction) {

		},

	async execute(interaction) {
		
  },
};
