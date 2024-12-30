module.exports = (input) => {
  if (input === null) {
    return null;
  }

  const regex = /<#(\d*)>/;

  const match = input.match(regex);

  return match ? match[1] : null;
};
