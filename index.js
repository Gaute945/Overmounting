require("dotenv").config();
require("axios");
const { Client, IntentsBitField, PermissionsBitField } = require("discord.js");
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

  	if (interaction.commandName === "meeting") {
		try {

			const MAll = (interaction.options.getBoolean("all")) ?? false;
			const MHour = (interaction.options.getNumber("hour"));
			const MMin = (interaction.options.getNumber("min"));
			const MDay = (interaction.options.getNumber("day"));
			const MMonth = (interaction.options.getString("month"));
			let MReply ="";
	
			if (MAll == true) {
					if (interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.MentionEveryone)) {
						MReply = "@everyone ";
					}
					else {
						MReply = "mising permissions to mention everyone ";
					}
			}
			else {
				MReply += await makeReply();
			}

			async function makeReply()
			{
				const MRequiredUser = (interaction.options.getUser("user"));
				let Reply ="";
				Reply += "<@" + MRequiredUser + "> ";
				MUsers = await getUsers();
				
				for(i = 2; i < 11; i++) {
					if(MUsers[i] != "") {
						Reply += "<@" + MUsers[i] + ">";
					}
				}
				return Reply;
			}

			async function getUsers(){
				const Users = [];
				for(i = 2; i < 11; i++) {
					Users[i] = (interaction.options.getUser("user" + i)) ?? "";
				}
				return Users;
			}

			await interaction.reply({
				content: MReply,
				allowedMentions: { parse: ['everyone', 'users'] },
			});
			
			interaction.channel.send(' can you join the meeting at '+ MHour + ":"+ MMin + " " + MDay + " " + MMonth).then(sentMessage => {
				sentMessage.react('✅');
				sentMessage.react('❌');
			});
		}
		catch(error){
			console.error(error);
		}
  	}

  /*
  White: #FFFFFF
  Black: #000000
  Red: #FF0000
  Green: #00FF00
  Blue: #0000FF
  Yellow: #FFFF00
  Cyan: #00FFFF
  Magenta: #FF00FF
  Gray: #808080
  */ 

  if (interaction.commandName === "role") {
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
	//dont put uppercase letter in command name♥
	{
		name: "meeting",
		description: "Plan a meting",
		options: [
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

  {
    name: "role",
    description: "make and assign your own roles!",
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
  },
];
