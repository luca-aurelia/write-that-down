const fs = require('fs')
const Log = require('log')
module.exports = new Log('debug', fs.createWriteStream('log.txt'))
