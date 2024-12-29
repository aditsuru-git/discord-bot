module.exports = (arr, numElements) => {
  const result = [];

  for (let i = 0; i < numElements; i++) {
    const element = arr[i] !== undefined ? arr[i] : null;
    result.push(
      element !== null && typeof element === "string"
        ? element.toLowerCase()
        : element
    );
  }

  return result;
};
