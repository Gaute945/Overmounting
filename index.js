require("dotenv").config();
require("axios")
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

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "hey") {
    return interaction.reply("hey!");
  }

  if (interaction.commandName === "ping") {
    return interaction.reply("Pong!");
  }

  if (interaction.commandName === "weather") {
    const axios = require("axios");
  
    async function getWeather() {
      const response = await axios.get(
        "https://api.open-meteo.com/v1/forecast?latitude=59.92&longitude=5.45&hourly=temperature_2m,precipitation_probability,precipitation&current_weather=true&forecast_days=1&timezone=auto"
      );
      const json = response.data;
      var temperature = json.current_weather.temperature;
      temperature += 4.5;
      return temperature.toString();
    }
  
    weather = await getWeather();
    return interaction.reply(weather);
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
  if (interaction.commandName === "randomnumber1000") {
    function getRandomNumber1000() {
      var randomNumber1000 = Math.floor(Math.random() * 1000) + 1;
      return randomNumber1000.toString();
    }
    var randomNumberString1000 = getRandomNumber1000();
    return interaction.reply(randomNumberString1000);
  }
});

client.login(process.env.token);
