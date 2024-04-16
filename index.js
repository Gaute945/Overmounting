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

client.on("ready", async () => {
	console.log(`I am online and ready as ${client.user.username}`);
	await regAllCmd();

  // Get the bot-testing channel by name
  const botTestingChannel = client.channels.cache.find(channel => channel.name === 'bot-testing');

  // Check if the channel is found
  if (botTestingChannel) {
    // Send a message in the bot-testing channel
    botTestingChannel.send('I am now in use!');
    console.log('Message sent to bot-testing channel.');
  } else {
    console.error('Bot-testing channel not found!');
  }
});

async function regAllCmd() {
	client.guilds.cache.forEach((guild) => {
		guild.commands
			.set(commands)
			.then(() => {
				// throw new Error ("test error");
				console.log(`Commands deployed in ${guild.name} successfully!`);
			})
			.catch((error) => {
				console.error(
					`Error deploying commands in ${guild.name}: ${error.message}`
				);
			});
	});
}

client.on("guildCreate", async (guild) => {
	guild.commands
		.set(commands)
		.then(() => console.log(`Bot added to the guild ${guild.name}!`));
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === "help") {
		try {
			// throw new Error ("test error");
			const CommandList = await getCommands(commands);
			await interaction.reply(CommandList);
		} catch (error) {
			console.error("Error while getting commands:", error);
			await interaction.reply("error with function: getCommands");
		}

		async function getCommands(commands) {
			let StringCommands = "/";
			try {
				// throw new Error ("test error");
				for (let track = 0; track < commands.length; track++) {
					StringCommands +=
						commands[track].name + (track < commands.length - 1 ? " /" : "");
				}
				return StringCommands;
			} catch (error) {
				throw Error;
			}
		}
	}

	if (interaction.commandName === "weather") {
		async function fetchWeather() {
			try {
				// throw new Error ("test error");
				const axios = require("axios");
				const response = await axios.get(
					"https://api.open-meteo.com/v1/forecast?latitude=59.92&longitude=5.45&hourly=temperature_2m,precipitation_probability,precipitation&current_weather=true&forecast_days=1&timezone=auto"
				);
				return response.data;
			} catch (error) {
				console.error("Error while fetching weather:", error);
				await interaction.reply("error with function: fetchWeather");
			}
		}

		async function returnWeather() {
			const weatherData = await fetchWeather();
			try {
				// throw new Error ("test error");
				if (weatherData) {
					const temperature =
						Math.round(weatherData.current_weather.temperature) + 4.5;
					const windSpeed = weatherData.current_weather.windspeed;
					const responseText = `${temperature} °C, ${windSpeed} km/h`;
					await interaction.reply(responseText);
				}
			} catch (error) {
				console.error("Error while returning weather:", error);
				await interaction.reply("error with function: returnWeather");
			}
		}

		returnWeather();
	}

	if (interaction.commandName === "coin-flip") {
		async function getCoin() {
			return Math.floor(Math.random() * 2) + 1;
		}

		try {
			// throw new Error ("test error");
			switch (await getCoin()) {
				case 1:
					return await interaction.reply("Head Wins!");

				case 2:
					return await interaction.reply("Tails Wins!");

				default:
					return await interaction.reply("Value is out of valid range");
			}
		} catch (error) {
			console.error("Error while getting coin:", error);
			await interaction.reply("error with function: getCoin");
		}
	}

	if (interaction.commandName === "random-number") {
		try {
			// throw new Error ("test error");
			const min = parseInt(interaction.options.getString("min"));
			const max = parseInt(interaction.options.getString("max"));

			if (min > max) {
				return await interaction.reply(
					"Please provide valid values for both min and max."
				);
			}

			const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
			const responseMessage = `from ${min} | to ${max} | ${randomNumber}`;

			await interaction.reply(responseMessage);
		} catch (error) {
			console.error("error with random-number command", error);
			await interaction.reply("Error while generating random number");
		}
	}

  if (interaction.commandName === "role") {
    try {
      const guild = interaction.guild;
      const name = 'Super Cool Blue People'
      // Create a new role with data and a reason
      const role = guild.roles.create({
        name: name,
        color: '0000FF',
        reason: 'made by overmounting',
      })
      await interaction.reply("role created");
    } catch (error) {
      console.error(error);
    }
  }
});

client.login(process.env.token);

/*
SUB_COMMAND 1   
SUB_COMMAND_GROUP 2 
STRING 3    
INTEGER 4
BOOLEAN 5   
USER 6  
CHANNEL 7
ROLE 8  
MENTIONABLE 9
NUMBER 10
ATTACHMENT 11
*/

// no spaces in name:

const commands = [
  {
    name: "role",
    description: "make and assign your own roles!",
  },
	{
		name: "weather",
		description: "Current temp and wind for Stord",
	},
	{
		name: "coin-flip",
		description: "flips a coin",
	},
	{
		name: "random-number",
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
