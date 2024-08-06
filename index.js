require("dotenv").config();
const { Client, IntentsBitField, PermissionsBitField } = require("discord.js");
const axios = require("axios");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const commands = [
  {
    name: "meeting",
    description: "Plan a meeting",
    options: [
      {
        name: "hour",
        type: 10,
        description: "The hour of your meeting",
        required: true,
        choices: [...Array(24).keys()].map(i => ({ name: String(i).padStart(2, '0'), value: String(i).padStart(2, '0') })),
      },
      {
        name: "min",
        type: 10,
        description: "The minutes of your meeting",
        required: true,
        choices: [...Array(60).keys()].map(i => ({ name: String(i).padStart(2, '0'), value: String(i).padStart(2, '0') })),
      },
      {
        name: "day",
        type: 10,
        description: "The day of your meeting",
        required: true,
        max_value: 31,
      },
      {
        name: "month",
        type: 3,
        description: "The month of your meeting",
        required: true,
        choices: [
          { name: "January", value: "January" },
          { name: "February", value: "February" },
          { name: "March", value: "March" },
          { name: "April", value: "April" },
          { name: "May", value: "May" },
          { name: "June", value: "June" },
          { name: "July", value: "July" },
          { name: "August", value: "August" },
          { name: "September", value: "September" },
          { name: "October", value: "October" },
          { name: "November", value: "November" },
          { name: "December", value: "December" },
        ],
      },
      {
        name: "user",
        type: 6,
        description: "User you want in the meeting",
        required: true,
      },
      ...[...Array(10).keys()].map(i => ({
        name: `user${i + 2}`,
        type: 6,
        description: "User you want in the meeting",
        required: false,
      })),
      {
        type: 5,
        name: "all",
        description: "Do you want everyone in the meeting?",
        required: false,
      },
    ],
  },
  {
    name: "weather",
    description: "Current temperature and wind for Stord",
  },
  {
    name: "coin-flip",
    description: "Flips a coin",
  },
  {
    name: "random-number",
    description: "Random number min-max",
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
    description: "Lists all the commands",
  },
  {
    name: "role",
    description: "Create and assign your own roles!",
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
        description: "The color of the role in hex code",
        required: true,
      },
    ],
  },
];

client.on("ready", async () => {
  console.log(`I am online and ready as ${client.user.username}`);
  await regAllCmd();

  const botTestingChannel = client.channels.cache.find(channel => channel.name === 'bot-testing');

  if (botTestingChannel) {
    botTestingChannel.send('I am now in use!');
    console.log('Message sent to bot-testing channel.');
  } else {
    console.error('Bot-testing channel not found!');
  }
});

async function regAllCmd() {
  client.guilds.cache.forEach(async (guild) => {
    try {
      await guild.commands.set(commands);
      console.log(`Commands deployed in ${guild.name} successfully!`);
    } catch (error) {
      console.error(`Error deploying commands in ${guild.name}: ${error.message}`);
    }
  });
}

client.on("guildCreate", async (guild) => {
  try {
    await guild.commands.set(commands);
    console.log(`Bot added to the guild ${guild.name}!`);
  } catch (error) {
    console.error(`Error deploying commands in ${guild.name}: ${error.message}`);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "help") {
    try {
      const CommandList = await getCommands(commands);
      await interaction.reply(CommandList);
    } catch (error) {
      console.error("Error while getting commands:", error);
      await interaction.reply("Error with function: getCommands");
    }

    async function getCommands(commands) {
      return "/" + commands.map(command => command.name).join(" /");
    }
  }

  if (interaction.commandName === "weather") {
    try {
      const weatherData = await fetchWeather();
      if (weatherData) {
        const temperature = Math.round(weatherData.current_weather.temperature) + 4.5;
        const windSpeed = weatherData.current_weather.windspeed;
        const responseText = `${temperature} °C, ${windSpeed} km/h`;
        await interaction.reply(responseText);
      }
    } catch (error) {
      console.error("Error while fetching weather:", error);
      await interaction.reply("Error with function: fetchWeather");
    }

    async function fetchWeather() {
      try {
        const response = await axios.get("https://api.open-meteo.com/v1/forecast?latitude=59.92&longitude=5.45&hourly=temperature_2m,precipitation_probability,precipitation&current_weather=true&forecast_days=1&timezone=auto");
        return response.data;
      } catch (error) {
        console.error("Error while fetching weather data:", error);
        throw error;
      }
    }
  }

  if (interaction.commandName === "coin-flip") {
    try {
      const result = Math.random() < 0.5 ? "Head Wins!" : "Tails Wins!";
      await interaction.reply(result);
    } catch (error) {
      console.error("Error while flipping coin:", error);
      await interaction.reply("Error with function: getCoin");
    }
  }

  if (interaction.commandName === "random-number") {
    try {
      const min = parseInt(interaction.options.getString("min"));
      const max = parseInt(interaction.options.getString("max"));

      if (min > max) {
        return await interaction.reply("Please provide valid values for both min and max.");
      }

      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      const responseMessage = `from ${min} | to ${max} | ${randomNumber}`;
      await interaction.reply(responseMessage);
    } catch (error) {
      console.error("Error with random-number command:", error);
      await interaction.reply("Error while generating random number");
    }
  }

  if (interaction.commandName === "meeting") {
    try {
      const MAll = interaction.options.getBoolean("all") ?? false;
      const MHour = interaction.options.getNumber("hour");
      const MMin = interaction.options.getNumber("min");
      const MDay = interaction.options.getNumber("day");
      const MMonth = interaction.options.getString("month");
      let MReply = "";

      if (MAll) {
        if (interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.MentionEveryone)) {
          MReply = "@everyone ";
        } else {
          MReply = "Missing permissions to mention everyone ";
        }
      } else {
        MReply += await makeReply();
      }

      async function makeReply() {
        const MRequiredUser = interaction.options.getUser("user");
        let Reply = "<@" + MRequiredUser.id + "> ";
        const MUsers = await getUsers();

        for (let i = 2; i < 11; i++) {
          const user = interaction.options.getUser(`user${i}`);
          if (user) {
            Reply += `<@${user.id}> `;
          }
        }

        return Reply;

        async function getUsers() {
          const users = [];
          for (let i = 2; i < 11; i++) {
            const user = interaction.options.getUser(`user${i}`);
            if (user) {
              users.push(`<@${user.id}>`);
            }
          }
          return users;
        }
      }

      const message = `${MReply} Meeting scheduled for ${MDay} ${MMonth} ${MHour}:${MMin}`;
      await interaction.reply(message);
    } catch (error) {
      console.error("Error with meeting command:", error);
      await interaction.reply("Error while scheduling meeting");
    }
  }

  if (interaction.commandName === "role") {
    try {
      const roleName = interaction.options.getString("name");
      const roleColor = interaction.options.getString("color");
      const role = await interaction.guild.roles.create({
        name: roleName,
        color: roleColor,
        reason: 'Role created via bot command',
      });

      await interaction.reply(`Role created: ${role.name}`);
    } catch (error) {
      console.error("Error with role command:", error);
      await interaction.reply("Error while creating role");
    }
  }
});

client.login(process.env.TOKEN);
