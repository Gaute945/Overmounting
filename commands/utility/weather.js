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
			)
		)

		// optinal
		.addIntegerOption(option =>
			option.setName("time")
				.setDescription("for what time do you want to know the weather?")
				.addChoices(
				// any date 24 hour
			)
		)

		// optinal
		.addIntegerOption(option =>
			option.setName("date")
				.setDescription("for what date do you want to know the weather? [day month year] eks 15.09.2002")
				.addChoices(
				// valid date
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

	// const response = await fetch('https://api.example.com/data');
	// if(!response.ok) {
	// throw new Error(`HTTP error! status: ${response.status}`);
	// }
	// const data = await response.json();
	// console.log(data);


	async autocomplete(interaction) {
		const focusedOption = interaction.options.getFocused(true);
		let choices;

		if (focusedOption.name === 'location') {
			console.log('location')
		}

		if (focusedOption.name === 'type') {
			console.log('type')
		}
	},

	async execute(interaction) {

	},
};
