module.exports = function iconFor (listName) {
  const fileName = listName.toLowerCase().replace(' ', '_')
  return {
    path: `./icons/${fileName}.png`
  }
}
