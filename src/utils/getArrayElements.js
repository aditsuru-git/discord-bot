module.exports = (arr, numElements) => {
  const result = [];

  for (let i = 0; i < numElements; i++) {
    result.push(arr[i] !== undefined ? arr[i] : null);
  }

  return result;
};
