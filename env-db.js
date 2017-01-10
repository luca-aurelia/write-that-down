const log = require('./log')

const store = {}
const prefix = 'IO_NOISEMACHINES_ENVDB_'
const hasPrefix = (string) => string.indexOf(prefix) > -1
const addPrefix = (string) => prefix + string

log.debug(`env: ${JSON.stringify(process.env)}`)
// sync store with env
const prefixedKeys = Object.keys(process.env).filter(hasPrefix)
prefixedKeys.forEach(key => store[key] = JSON.parse(process.env[key]))
log.debug(`store: ${JSON.stringify(store)}`)

// if (Object.keys(process.env).filter(hasPrefix).length > 0) {
//   console.log(`---\n${JSON.stringify(store)}\n---`)
// }

module.exports = {
  get (key) {
    return store[addPrefix(key)]
  },
  set (key, value) {
    store[addPrefix(key)] = value
  },
  serialize () {
    const serialized = {}
    for (const key in store) {
      serialized[key] = JSON.stringify(store[key])
    }
    return serialized
  }
}
