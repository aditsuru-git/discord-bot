const { Schema, model } = require("mongoose");

const chatbotConfig = new Schema({
  channelId: {
    type: "string",
    require: true,
  },
});

module.exports = model("chatbot", chatbotConfig);
