const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('meeting')
  .setDescription('Plan a meeting'),
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
      ],
  async execute(interaction) {
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
  },
};
