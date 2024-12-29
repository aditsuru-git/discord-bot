const path = require("path");
const getAllFiles = require("./getAllFiles");

module.exports = () => {
  const commandCategories = getAllFiles(
    path.resolve(__dirname, "..", "commands"),
    true
  );
  return commandCategories.flatMap((commandCategory) => {
    const commandFiles = getAllFiles(commandCategory);
    return commandFiles.map((commandFile) => require(commandFile));
  });
};
