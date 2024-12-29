module.exports = {
  name: "ping",
  description: "Replies with pong",
  callback: async (client, interaction, ...args) => {
    const isPrefix = args.pop();
    const wsPing = client.ws.ping >= 0 ? client.ws.ping : "N/A";
    if (isPrefix) {
      const messageTimestamp = interaction.createdTimestamp;

      const reply = await interaction.reply("Pinging...");

      const ping = reply.createdTimestamp - messageTimestamp;

      reply.edit(
        `Pong!\n\`\`\`Latency: ${ping} ms\nWebSocket: ${wsPing} ms\`\`\``
      );
      return;
    }
    await interaction.deferReply();

    const reply = await interaction.fetchReply();

    const ping = reply.createdTimestamp - interaction.createdTimestamp;

    interaction.editReply(
      `Pong!\n\`\`\`Latency: ${ping} ms\nWebSocket: ${wsPing} ms\`\`\``
    );
  },
};
