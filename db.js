const JSONStore = require('json-store')
const path = require('path')

module.exports = function (relativePath) {
  const dbPath = path.join(__dirname, './data', relativePath)
  return JSONStore(dbPath)
}
