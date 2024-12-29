const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = async (client, message) => {
  if (message.author.bot || !message.content.startsWith("!")) return;

  const args = message.content.slice(1).trim().split(/\s+/);

  const commandName = args.shift().toLowerCase();

  const localCommands = getLocalCommands();

  const commandObject = localCommands.find((cmd) => cmd.name === commandName);

  if (!commandObject) return;

  try {
    await commandObject.callback(client, message, ...args, true);
  } catch (error) {
    console.log(
      `[MSGCREATE] There was an error running this command: ${error}`
    );
  }
};
