require("dotenv").config();
require("axios");
const { Client, IntentsBitField, } = require("discord.js");
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

  if (interaction.commandName === "meeting") {
	try{

		var MUsers = (interaction.options.getUser("user"));
		var MUsers2 = (interaction.options.getUser("user2")) ?? "";
		var MUsers3 = (interaction.options.getUser("user3")) ?? "";
		var MUsers4 = (interaction.options.getUser("user4")) ?? "";
		var MUsers5 = (interaction.options.getUser("user5")) ?? "";
		var MUsers6 = (interaction.options.getUser("user6")) ?? "";
		var MUsers7 = (interaction.options.getUser("user7")) ?? "";
		var MUsers8 = (interaction.options.getUser("user8")) ?? "";
		var MUsers9 = (interaction.options.getUser("user9")) ?? "";
		var MUsers10 = (interaction.options.getUser("user10")) ?? "";
		var MUList = [MUsers2,MUsers3,MUsers4,MUsers5,MUsers6,MUsers7,MUsers8,MUsers9,MUsers10]

		var MAll = (interaction.options.getBoolean("all")) ?? false;
		var MHour = (interaction.options.getNumber("hour"));
		var MMin = (interaction.options.getNumber("min"));
		var MDay = (interaction.options.getNumber("day"));
		var MMonth = (interaction.options.getString("month"));
		var MReply ="";
		if(MAll == true)
			{
				MReply += "@everyone ";
			}
				MReply += "<@" +MUsers + "> ";
			for(i = 0; i < 9;i++)
				{
					if(MUList[i] != "")
						{
							MReply += "<@" + MUList[i] + "> "
						}
				}
			await interaction.reply(MReply);
			
			interaction.channel.send(' can you join the meeting at '+ MHour + ":"+ MMin + " " + MDay + " " + MMonth).then(sentMessage => {
				// Unicode emoji
				sentMessage.react('✅');
				sentMessage.react('❌');
			
			});
			
			
		//const SUsers = client.users.cache.get(MUsers);

		 
	}
	catch(error){
		console.error(error);
	}
    
  } 
  
});

client.login(process.env.token);

const commands = [
	//dont put uppercase letter in command name♥
    {
        name: "meeting",
        description: "Plan a meting",
		options:[
			{
				name: "hour",
				type: 10,
				description: "the Hour of your meeting",
				required: true,
				"choices": [
					{
						"name": "23",
						"value": "23"
					},
					{
						"name": "22",
						"value": "22"
					},
					{
						"name": "21",
						"value": "21"
					},
					{
						"name": "20",
						"value": "20"
					},
					{
						"name": "19",
						"value": "19"
					},
					{
						"name": "18",
						"value": "18"
					},
					{
						"name": "17",
						"value": "17"
					},
					{
						"name": "16",
						"value": "16"
					},
					{
						"name": "15",
						"value": "15"
					},
					{
						"name": "14",
						"value": "14"
					},
					{
						"name": "13",
						"value": "13"
					},
					{
						"name": "12",
						"value": "12"
					},
					{
                		"name": "11",
                		"value": "11"
                	},
                	{
                    	"name": "10",
                    	"value": "10"
                	},
                	{
                    	"name": "09",
                    	"value": "09"
                	},
                	{
                    	"name": "08",
                    	"value": "08"
                	},
					{
                    	"name": "07",
                    	"value": "07"
                	},
					{
                    	"name": "06",
                    	"value": "06"
                	},
					{
                    	"name": "05",
                    	"value": "05"
                	},
					{
                    	"name": "04",
                    	"value": "04"
                	},
					{
                    	"name": "03",
                    	"value": "03"
                	},
					{
                	    "name": "02",
                	    "value": "02"
                	},
					{
                	    "name": "01",
                	    "value": "01"
                	},
					{
                    	"name": "00",
                    	"value": "00"
               		}
            	]
				
	},
	{
	name: "min",
	description: "the minits of your meeting",
	type: 10,
	required: true,			
	"choices": [
		{
			"name": "59",
			"value": "59"
		},
		{
			"name": "55",
			"value": "55"
		},
		{
			"name": "50",
			"value": "50"
		},
		{
			"name": "45",
			"value": "45"
		},
		{
			"name": "40",
			"value": "40"
		},
		{
			"name": "35",
			"value": "35"
		},
		{
			"name": "30",
			"value": "30"
		},
		{
			"name": "25",
			"value": "25"
		},
		{
			"name": "20",
			"value": "20"
		},
		{
			"name": "15",
			"value": "15"
		},
		{
			"name": "10",
			"value": "10"
		},
		{
			"name": "5",
			"value": "5"
		},
		{
			"name": "00",
			"value": "00"
		}
		]
	},
	{
		name: "day",
		description: "the day of your meeting",
		type: 10,
		required: true,			
		max_value: 31,
	},
	{
		name: "month",
		description: "the day of your meeting",
		type: 3,
		required: true,			
		"choices": [
			{
				"name": "January",
				"value": "January"
			},
			{
				"name": "February",
				"value": "February"
			},
			{
				"name": "March",
				"value": "March"
			},
			{
				"name": "April",
				"value": "April"
			},
			{
				"name": "May",
				"value": "May"
			},
			{
				"name": "June",
				"value": "June"
			},
			{
				"name": "July",
				"value": "July"
			},
			{
				"name": "August",
				"value": "August"
			},
			{
				"name": "September",
				"value": "September"
			},
			{
				"name": "October",
				"value": "October"
			},
			{
				"name": "November",
				"value": "November"
			},
			{
				"name": "December",
				"value": "December"
			},
			]
		},
		{
			name: "user",
			description: "User you want in meeting",
			type: 6,
			required: true,
		},
		{
			name: "user2",
			type: 6,
			description: "User you want in meeting",
			required: false,
		},
		{
			name: "user3",
			type: 6,
			description: "User you want in meeting",
			required: false,
		},
		{
			name: "user4",
			type: 6,
			description: "User you want in meeting",
			required: false,
		},
		{
			name: "user5",
			type: 6,
			description: "User you want in meeting",
			required: false,
		},
		{
			name: "user6",
			type: 6,
			description: "User you want in meeting",
			required: false,	
		},
		{
			name: "user7",
			type: 6,
				description: "User you want in meeting",
				required: false,
		},
		{
			name: "user8",
			type: 6,
				description: "User you want in meeting",
				required: false,
		},
		{
			name: "user9",
			type: 6,
				description: "User you want in meeting",
				required: false,
		},
		{
			name: "user10",
			type: 6,
				description: "User you want in meeting",
				required: false,
		},
		{
			type: 5,
			name: "all",
				description: "do you want everyone in the meeting?",
				required: false,	
		}
		]
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
