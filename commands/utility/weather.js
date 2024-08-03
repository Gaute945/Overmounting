const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('weather')
  .setDescription('Current temp and wind for Stord'),
  async execute(interaction) {
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
  },
};
