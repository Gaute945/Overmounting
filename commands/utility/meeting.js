const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("meeting")
    .setDescription("Plan a meeting")
    .addNumberOption(option =>
      option.setName("hour")
        .setDescription("The hour of your meeting (0-23)")
        .setRequired(true)
        .setMinValue(0)
        .setMaxValue(23)
    )
    .addNumberOption(option =>
      option.setName("min")
        .setDescription("The minutes of your meeting (0-59)")
        .setRequired(true)
        .setMinValue(0)
        .setMaxValue(59)
    )
    .addNumberOption(option =>
      option.setName("day")
        .setDescription("The day of your meeting")
        .setRequired(true)
        .setMaxValue(31)
    )
    .addStringOption(option =>
      option.setName("month")
        .setDescription("The month of your meeting")
        .setRequired(true)
        .addChoices(

          {
            name: "January",
            value: "January" },

          {
            name: "February",
            value: "February" },

          {
            name: "March",
            value: "March" },

          {
            name: "April",
            value: "April" },

          {
            name: "May",
            value: "May" },

          {
            name: "June",
            value: "June" },

          {
            name: "July",
            value: "July" },

          {
            name: "August",
            value: "August"
          },

          {
            name: "September",
            value: "September"
          },

          {
            name: "October",
            value: "October"
          },

          {
            name: "November",
            value: "November"
          },

          {
            name: "December",
            value: "December"
          }
        )
    )
    .addUserOption(option =>
      option.setName("user")
        .setDescription("User you want in the meeting")
        .setRequired(true)
    )
    .addUserOption(option =>
      option.setName("user2")
        .setDescription("Another user you want in the meeting")
        .setRequired(false)
    )
    .addUserOption(option =>
      option.setName("user3")
        .setDescription("Another user you want in the meeting")
        .setRequired(false)
    )

    .addUserOption(option =>
      option.setName("user4")
        .setDescription("Another user you want in the meeting")
        .setRequired(false)
    )
    .addUserOption(option =>
      option.setName("user5")
        .setDescription("Another user you want in the meeting")
        .setRequired(false)
    )
    .addUserOption(option =>
      option.setName("user6")
        .setDescription("Another user you want in the meeting")
        .setRequired(false)
    )
    .addUserOption(option =>
      option.setName("user7")
        .setDescription("Another user you want in the meeting")
        .setRequired(false)
    )
    .addUserOption(option =>
      option.setName("user8")
        .setDescription("Another user you want in the meeting")
        .setRequired(false)
    )
    .addUserOption(option =>
      option.setName("user9")
        .setDescription("Another user you want in the meeting")
        .setRequired(false)
    )
    .addUserOption(option =>
      option.setName("user10")
        .setDescription("Another user you want in the meeting")
        .setRequired(false)
    )
    .addBooleanOption(option =>
      option.setName("all")
        .setDescription("Do you want everyone in the meeting?")
        .setRequired(false)
    ),
  async execute(interaction) {
    try {
      const MAll = (interaction.options.getBoolean("all")) ?? false;
      const MHour = (interaction.options.getNumber("hour"));
      const MMin = (interaction.options.getNumber("min"));
      const MDay = (interaction.options.getNumber("day"));
      const MMonth = (interaction.options.getString("month"));
      let MReply ="";
      let i;
      let MUsers;

      if (MAll == true) {
        if (interaction.guild.members.me.permissions.has(
          PermissionsBitField.Flags.MentionEveryone)) {
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
        allowedMentions: { parse: ["everyone", "users"] }
      });

      interaction.channel.send(" can you join the meeting at "+ MHour + ":"+ MMin + " " + MDay + " " + MMonth).then(sentMessage => {
        sentMessage.react("✅");
        sentMessage.react("❌");
      });
    } catch (error) {
      console.error(error);
    }
  }
};

