require("dotenv").config();
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

  if (interaction.commandName === "randomnum") {
    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var maximumLimit = 100; // Set the maximum limit
    var randomNumber = getRandomNumber(1, Math.min(maximumLimit, 1000));

    return interaction.reply();
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
  if (interaction.commandName === "randomnumber100") {
    function getRandomNumber100() {
      var randomNumber100 = Math.floor(Math.random() * 100) + 1;
      return randomNumber100.toString();
    }
    var randomNumberString100 = getRandomNumber100();
    return interaction.reply(randomNumberString100);
  }
  if (interaction.commandName === "randomnumber50") {
    function getRandomNumber50() {
      var randomNumber50 = Math.floor(Math.random() * 50) + 1;
      return randomNumber50.toString();
    }
    var randomNumberString50 = getRandomNumber50();
    return interaction.reply(randomNumberString50);
  }
  if (interaction.commandName === "randomnumber25") {
    function getRandomNumber25() {
      var randomNumber25 = Math.floor(Math.random() * 25) + 1;
      return randomNumber25.toString();
    }
    var randomNumberString25 = getRandomNumber25();
    return interaction.reply(randomNumberString25);
  }
  if (interaction.commandName === "randomnumber10") {
    function getRandomNumber10() {
      var randomNumber10 = Math.floor(Math.random() * 10) + 1;
      return randomNumber10.toString();
    }
    var randomNumberString10 = getRandomNumber10();
    return interaction.reply(randomNumberString10);
  }
  if (interaction.commandName === "randomnumber5") {
    function getRandomNumber5() {
      var randomNumber5 = Math.floor(Math.random() * 5) + 1;
      return randomNumber5.toString();
    }
    var randomNumberString5 = getRandomNumber5();
    return interaction.reply(randomNumberString5);
  }
});

client.login(process.env.token);
