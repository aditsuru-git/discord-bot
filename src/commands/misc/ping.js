const { PermissionFlagsBits } = require("discord.js");
module.exports = {
  name: "ping",
  description: "Replies with pong.",
  callback(client, interaction) {
    interaction.reply("Pong!");
  },
};
