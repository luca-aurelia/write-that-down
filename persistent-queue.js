const log = require('./log')

class PersistentQueue {
  constructor (db) {
    log.debug('initializing persistent queue')
    this.db = db
    this.update(q => {
      if (!Array.isArray(q)) return []
      return q
    })
  }
  update (updater) {
    const q = this.db.get('q')
    const newQ = updater(q)
    this.db.set('q', newQ)
  }
  push (element) {
    // log.debug(`Pushing new element: ${element}`)
    this.update(q => [...q, element])
    // log.debug(`New queue: ${JSON.stringify(this.db.get('q'))}`)
  }
  shift () {
    let result
    this.update(q => {
      const [first, ...rest] = q
      result = first
      return rest
    })
    return result
  }
  isEmpty () {
    return this.db.get('q').length === 0
  }
}

module.exports = PersistentQueue
