const fs = require("fs");
const path = require("path");

module.exports = (directory, foldersOnly = false) => {
  const fileNames = [];

  const files = fs.readdirSync(directory, { withFileTypes: true });

  files.forEach((file) => {
    if (foldersOnly && file.isDirectory()) {
      fileNames.push(path.resolve(directory, file.name));
    } else if (!foldersOnly && file.isFile()) {
      fileNames.push(path.resolve(directory, file.name));
    }
  });

  return fileNames;
};
