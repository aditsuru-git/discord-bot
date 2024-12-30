const chatbotConfig = require("../../models/chatbotConfigSchema");
const getArrayElements = require("../../utils/getArrayElements");
const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");
const getChannelId = require("../../utils/getChannelId");

module.exports = {
  name: "cbconfig",
  description: "Setup chatbot channel",
  options: [
    {
      name: "channel",
      description: "Channel in which chatbot will be active",
      type: ApplicationCommandOptionType.Channel,
      required: true,
    },
  ],
  callback: async (client, interaction, ...args) => {
    const isPrefix = args.pop();
    const userArgs = getArrayElements(args, 1);
    let lchannelId;
    if (isPrefix) {
      const user = interaction.guild.members.cache.get(interaction.author.id);
      if (!user.permissions.has(PermissionFlagsBits.Administrator)) {
        await interaction.reply({
          content: "Permission denied.",
          ephemeral: true,
        });
        return;
      }
      lchannelId = getChannelId(userArgs[0]);
      if (!lchannelId) {
        await interaction.reply({
          content: "Invalid channel.",
          ephemeral: true,
        });
        return;
      }
    } else {
      const member = interaction.guild.members.cache.get(interaction.user.id);
      if (!member.permissions.has(["ADMINISTRATOR"])) {
        await interaction.reply({
          content: "Permission denied.",
          ephemeral: true,
        });
        return;
      }
      interaction.deferReply();
      lchannelId = interaction.options.getChannel("channel").id;
    }

    const chatbot = await chatbotConfig.findOne({
      channelId: { $exists: true },
    });

    if (chatbot) {
      chatbot.channelId = lchannelId;
      await chatbot.save();
    } else {
      const newChatbot = new chatbotConfig({
        channelId: lchannelId,
      });
      await newChatbot.save();
    }

    await interaction.reply({
      content: `Chatbot channel set to <#${lchannelId}>.`,
    });

    if (!isPrefix) {
      interaction.deleteReply();
    }
  },
};
