const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "reactionrole",
  description: "Create a reaction role",
  options: [
    {
      name: "<option_name>",
      description: "<option_description>",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],
  callback: async (client, interaction, ...args) => {
    const isPrefix = args.pop();
    const userArgs = args;

    // Prefix command logic
    if (isPrefix) {
      const user = interaction.guild.members.cache.get(interaction.author.id);
      if (!user.permissions.has(PermissionFlagsBits.Administrator)) {
        await interaction.reply({
          content: "Permission denied.",
          ephemeral: true,
        });
        return;
      }
    }

    //Slash command logic
    else if (optionValue) {
      const member = interaction.guild.members.cache.get(interaction.user.id);
      if (!member.permissions.has(["ADMINISTRATOR"])) {
        await interaction.reply({
          content: "Permission denied.",
          ephemeral: true,
        });
        return;
      }
    }

    interaction.reply();
  },
};
