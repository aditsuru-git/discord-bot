const { Schema, model } = require("mongoose");

const channelConfig = new Schema({
  name: {
    type: "string",
    require: true,
  },
  channelId: {
    type: "string",
    require: true,
  },
});

module.exports = model("config", channelConfig);
