require("dotenv").config();
const { REST, Routes } = require("discord.js");

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
    description: "Current temp and wind for stord",
  },
  {
    name: "coinflip",
    description: "flips a coins",
  },
  {
    name: "randomnumber100",
    description: "random nummber 1-100",
  },
  {
    name: "randomnumber50",
    description: "random nummber 1-50",
  },
  {
    name: "randomnumber25",
    description: "random nummber 1-25",
  },
  {
    name: "randomnumber10",
    description: "random nummber 1-10",
  },
  {
    name: "randomnumber5",
    description: "random nummber 1-5",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.token);

(async () => {
  try {
    console.log("Registering slash commands...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.clientId,
        process.env.guildId
      ),
      { body: commands }
    );

    console.log("Slash commands were registered successfully!");
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();
