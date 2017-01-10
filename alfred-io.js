const alfy = require('alfy')
const log = require('./log')

module.exports = {
  output (items, variables) {
    items.forEach(item => {
      const workflow = {
        alfredworkflow: {
          arg: item.arg,
          variables
        }
      }
      item.arg = JSON.stringify(workflow)
      log.debug(JSON.stringify(workflow))
    })
    alfy.output(items)
  }
}
