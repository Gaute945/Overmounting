require("dotenv").config();
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
  console.log("I am online and full of errors, sincerly", `${c.user.username}`);
});

client.on("messageCreate", async (message) => {
  console.log(message.author.username + ": " + message.content);
  if (message.author.bot) {
    return;
  }

  if (message.content == "hello") {
    message.reply(":wave:");
  }
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "hey") {
    return interaction.reply("hey!");
  }

  if (interaction.commandName === "ping") {
    return interaction.reply("Pong!");
  }

  if (interaction.commandName === "weather") {
    var weatherInfo = "18.7C";
    return interaction.reply(weatherInfo);
  }

  if (interaction.commandName === "coinflip") {
    function getCoin() {
      return Math.floor(Math.random() * 2) + 1;
    }

    var coin = getCoin();

    if (coin == 1) {
      return interaction.reply("Head Wins!");
    }
    if (coin == 2) {
      return interaction.reply("Tails Wins!");
    }
  }
});

client.login(process.env.token);
