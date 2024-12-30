const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");
const getArrayElements = require("../../utils/getArrayElements");
const getUserId = require("../../utils/getUserId");

module.exports = {
  name: "purge",
  description: "Bulk delete a set of messages",
  options: [
    {
      name: "count",
      description: "Amount of messages to delete",
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
    {
      name: "user",
      description: "Delete messages from a specific user",
      type: ApplicationCommandOptionType.User,
    },
    {
      name: "all",
      description: "Delete messages from all users",
      type: ApplicationCommandOptionType.Boolean,
    },
  ],
  callback: async (client, interaction, ...args) => {
    const isPrefix = args.pop();
    const userArgs = getArrayElements(args, 2);

    let count;
    let inputUserId;
    let targetUserId;
    let isAll = false;

    if (isPrefix) {
      count = Math.floor(userArgs[0]) + 1;

      inputUserId = userArgs[1];

      if (inputUserId === null) {
        targetUserId = interaction.author.id;
      }
      if (inputUserId === "all") {
        isAll = true;
      }
      if (inputUserId !== null && inputUserId !== "all") {
        targetUserId = getUserId(inputUserId);
        if (targetUserId === null) {
          interaction.reply({
            content: "Invalid user ID.",
            ephemeral: true,
          });
          return;
        }
      }

      if (targetUserId === "all" || targetUserId !== interaction.author.id) {
        const user = interaction.guild.members.cache.get(interaction.author.id);

        if (
          !user.permissions.has(PermissionFlagsBits.ManageMessages) &&
          !user.permissions.has(PermissionFlagsBits.Administrator)
        ) {
          await interaction.reply({
            content: "Permission denied.",
            ephemeral: true,
          });
          return;
        }
      }
    } else {
      count = Math.floor(interaction.options.getInteger("count"));
      count++;

      inputUserId = interaction.options.getUser("user");

      if (inputUserId === null || inputUserId === undefined) {
        targetUserId = interaction.user.id;
      } else {
        targetUserId = inputUserId.id;
      }

      isAllExp = interaction.options.getBoolean("all");
      if (isAllExp) isAll = true;

      const member = interaction.guild.members.cache.get(interaction.user.id);

      if (!member.permissions.has(["ADMINISTRATOR", "MANAGE_MESSAGES"])) {
        await interaction.reply({
          content: "Permission denied.",
          ephemeral: true,
        });
        return;
      }
    }

    if (typeof count !== "number" || count <= 0 || count > 100) {
      let errorMessage =
        typeof count !== "number"
          ? "Provide a valid number."
          : count <= 0
          ? "Number of messages to delete must exceed 0."
          : "Number of messages to delete must not exceed 99.";
      interaction.reply({
        content: errorMessage,
        ephemeral: true,
      });
      return;
    }

    async function respond(messageSize, user) {
      const messageText = `${messageSize} message${
        messageSize === 1 ? " was" : "s were"
      } deleted${user ? ` of user <@${user}>` : ""}`;
      const message = await interaction.channel.send(messageText);
      if (!isPrefix) {
        interaction.deferReply();
        interaction.deleteReply();
      }
      setTimeout(async () => {
        if (message.deletable) {
          await message.delete();
        }
      }, 5000);
    }

    const messages = await interaction.channel.messages.fetch({ limit: count });
    if (isAll) {
      const deletedMessages = await interaction.channel.bulkDelete(
        messages,
        true
      );

      await respond(deletedMessages.size);
    } else {
      const userMessages = messages.filter(
        (msg) => msg.author.id === targetUserId
      );
      const deletedMessages = await interaction.channel.bulkDelete(
        userMessages,
        true
      );
      await respond(deletedMessages.size, targetUserId);
    }
  },
};
