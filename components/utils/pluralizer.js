const pluralizer = (number, string) => {
  let newString = string.slice();
  if (number === 0) {
    newString = `${string}s`;
  }
  else if (number > 1) {
    newString = `${string}s`;
  }
  return newString;
}

module.exports = {
  pluralizer: pluralizer
}