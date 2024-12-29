const { ApplicationCommandOptionType } = require("discord.js");
const getArrayElements = require("../../utils/getArrayElements");

module.exports = {
  name: "ping",
  description: "Replies with pong",
  options: [
    {
      name: "websocket",
      description: "WebSocket",
      type: ApplicationCommandOptionType.Boolean,
    },
  ],
  callback: async (client, input, ...args) => {
    const isPrefix = args.pop();
    const arg1 = getArrayElements(args, 1)[0];
    const calculatedLatency = Date.now() - input.createdTimestamp;
    let reply = "Pong!";

    const includeWsLatency = isPrefix
      ? arg1 === "ws"
      : input.options.get("websocket")?.value;

    if (includeWsLatency) {
      reply += `\nWebSocket: ${calculatedLatency}ms`;
    }

    input.reply(reply);
  },
};
