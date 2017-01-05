const alfy = require('alfy')
const alfred = require('./alfred')

alfred.getLists().then(listItems => alfy.output(listItems))
