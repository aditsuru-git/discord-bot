const getLocalCommands = require("../../utils/getLocalCommands");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const areCommandsDifferent = require("../../utils/areCommandsDifferent");

require("dotenv").config();

module.exports = async (client) => {
  const localCommands = getLocalCommands();
  const applicationCommands = await getApplicationCommands(
    client,
    process.env.GUILD_ID
  );

  for (const localCommand of localCommands) {
    const { name, description, options } = localCommand;

    const existingCommand = await applicationCommands.cache.find(
      (cmd) => cmd.name === name
    );
    if (existingCommand) {
      if (localCommand.deleted) {
        await applicationCommands.delete(existingCommand.id);
        console.log(`[READY-01] The command '${name}' was removed.`);
        continue;
      }
      if (areCommandsDifferent(existingCommand, localCommand)) {
        await applicationCommands.edit(existingCommand.id, {
          description,
          options,
        });
        console.log(`[READY-01] The command '${name}' was updated.`);
      }
    } else {
      if (localCommand.deleted) {
        console.log(
          `[READY-01] Command '${name}' skipped from registration due to deleted status true.`
        );
        continue;
      }
      await applicationCommands.create({
        name,
        description,
        options,
      });
      console.log(`[READY-01] Command '${name}' has been registered.`);
    }
  }

  try {
  } catch (err) {
    console.error(
      `[ERROR-READY-01] An issue occurred while fetching commands:\nerr:\n`,
      err
    );
  }
};
