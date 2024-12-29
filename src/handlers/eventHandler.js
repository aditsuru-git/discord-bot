const getAllFiles = require("../utils/getAllFiles");
const path = require("path");

module.exports = (client) => {
  const eventFolders = getAllFiles(
    path.resolve(__dirname, "..", "events"),
    true
  );

  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFiles(eventFolder, false).sort((a, b) => a > b);
    const eventName = path.basename(eventFolder);
    client.on(eventName, async (...args) => {
      for (const eventFile of eventFiles) {
        const eventFunction = require(eventFile);
        if (typeof eventFunction === "function") {
          try {
            await eventFunction(client, ...args);
          } catch (err) {
            console.error(
              `[ERROR-HANDLERS] An issue occurred in the event file: ${eventFile}\nerr:\n`,
              err
            );
          }
        }
      }
    });
  }
};
