require("dotenv").config();
require("axios");
const { Client, IntentsBitField } = require("discord.js");
const { stringify } = require("nodemon/lib/utils");
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

client.on("messageCreate", async (message) => {
	if (message.author.bot) {
		return;
	}

	if (message.content == "hello") {
		await message.reply(":wave:");
	}
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === "hey") {
		return await interaction.reply("hey!");
	}

	if (interaction.commandName === "ping") {
		return await interaction.reply("pong!");
	}

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
				const windSpeed = weatherData.current_weather.windSpeed;
				const responseText = `${temperature} °C, ${windSpeed} km/h`;
				await interaction.reply(responseText);
			} else {
				// Handle the case where the API request fails
				await interaction.reply("Failed to fetch weather data.");
			}
		}

		returnWeather();
	}

	if (interaction.commandName === "coin flip") {
		function getCoin() {
			return Math.floor(Math.random() * 2) + 1;
		}

		var coin = getCoin();

		if (coin == 1) {
			return await interaction.reply("Head Wins!");
		}
		if (coin == 2) {
			return await interaction.reply("Tails Wins!");
		}
	}
	if (interaction.commandName === "random number100") {
		function getRandomNumber100() {
			var randomNumber100 = Math.floor(Math.random() * 100) + 1;
			return randomNumber100.toString();
		}
		var randomNumberString100 = getRandomNumber100();
		return await interaction.reply(randomNumberString100);
	}
	if (interaction.commandName === "random number50") {
		function getRandomNumber50() {
			var randomNumber50 = Math.floor(Math.random() * 50) + 1;
			return randomNumber50.toString();
		}
		var randomNumberString50 = getRandomNumber50();
		return await interaction.reply(randomNumberString50);
	}
	if (interaction.commandName === "random number25") {
		function getRandomNumber25() {
			var randomNumber25 = Math.floor(Math.random() * 25) + 1;
			return randomNumber25.toString();
		}
		var randomNumberString25 = getRandomNumber25();
		return await interaction.reply(randomNumberString25);
	}
	if (interaction.commandName === "random number10") {
		function getRandomNumber10() {
			var randomNumber10 = Math.floor(Math.random() * 10) + 1;
			return randomNumber10.toString();
		}
		var randomNumberString10 = getRandomNumber10();
		return await interaction.reply(randomNumberString10);
	}
	if (interaction.commandName === "random number 5") {
		function getRandomNumber5() {
			var randomNumber5 = Math.floor(Math.random() * 5) + 1;
			return randomNumber5.toString();
		}
		var randomNumberString5 = getRandomNumber5();
		return await interaction.reply(randomNumberString5);
	}
	if (interaction.commandName === "random number1000") {
		function getRandomNumber1000() {
			var randomNumber1000 = Math.floor(Math.random() * 1000) + 1;
			return randomNumber1000.toString();
		}
		var randomNumberString1000 = getRandomNumber1000();
		return await interaction.reply(randomNumberString1000);
	}
});

client.login(process.env.token);

const commands = [
	{
		name: "hey",
		description: "Replies with hey!",
	},
	{
		name: "ping",
		description: "Pong!",
	},
	{
		name: "weather",
		description: "Current temp and wind for Stord",
	},
	{
		name: "coin flip",
		description: "flips a coin",
	},
	{
		name: "random number100",
		description: "random number 1-100",
		options: [
			{
				name: "Min",
				description: "The minimum value",
				type: 3,
				required: true,
				choices: [
					{
						name: "Dog",
						value: "animal_dog",
					},
					{
						name: "Cat",
						value: "animal_cat",
					},
					{
						name: "Penguin",
						value: "animal_penguin",
					},
				],
			},
		],
	},
	{
		name: "help",
		description: "says all the commands",
	},
];
