// removed nodemon and unused/useless code

require("dotenv").config();
require("axios");
const { Client, IntentsBitField } = require("discord.js");
const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
	],
});

client.on("ready", (c) => {
	console.log(
		"I am online and full of errors, sincerely",
		`${c.user.username}`
	);
});

client.on("guildCreate", async (guild) => {
	guild.commands
		.set(commands)
		.then(() => console.log(`Commands deployed in guild ${guild.name}!`));
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === "help") {
		const CommandList = await getCommands(commands);
		await interaction.reply(CommandList);

		async function getCommands(commands) {
			StringCommands = "/";
			for (let track = 0; track < commands.length; track++) {
				StringCommands +=
					commands[track].name + (track < commands.length - 1 ? " /" : "");
			}
			return StringCommands;
		}
	}

	if (interaction.commandName === "weather") {
		const axios = require("axios");

		async function fetchWeather() {
			try {
				const response = await axios.get(
					"https://api.open-meteo.com/v1/forecast?latitude=59.92&longitude=5.45&hourly=temperature_2m,precipitation_probability,precipitation&current_weather=true&forecast_days=1&timezone=auto"
				);
				return response.data;
			} catch (error) {
				console.error("Failed to fetch weather data:", error);
				return null;
			}
		}

		async function returnWeather() {
			const weatherData = await fetchWeather();
			if (weatherData) {
				const temperature =
					Math.round(weatherData.current_weather.temperature) + 4.5;
				const windSpeed = weatherData.current_weather.windspeed;
				const responseText = `${temperature} °C, ${windSpeed} km/h`;
				await interaction.reply(responseText);
			} else {
				// Handle the case where the API request fails
				await interaction.reply("Failed to fetch weather data.");
			}
		}

		returnWeather();
	}

	if (interaction.commandName === "random-number") {
		const min = parseInt(interaction.options.getString("min"));
		const max = parseInt(interaction.options.getString("max"));

		if (isNaN(min) || isNaN(max)) {
			// if user input is not a valid
			await interaction.reply(
				"Please provide valid values for both min and max."
			);
			return;
		}

		// generates random number
		const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

		// Include min and max values in the response message
		const responseMessage = `from ${min} | to ${max} | ${randomNumber}`;

		// Reply to the channel with the customized response message
		await interaction.reply(responseMessage);
	}
});

client.login(process.env.token);

const commands = [
	{
		name: "weather",
		description: "Current temp and wind for Stord",
	},
	{
		name: "coin-flip", // Updated command name
		description: "flips a coin",
	},
	{
		name: "random-number", // Updated command name
		description: "random number min-max",
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
	},
	{
		name: "help",
		description: "says all the commands",
	},
];
