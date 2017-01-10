const log = require('./log')

let q = []

module.exports = {
  enqueue (element) {
    q = [...q, element]
  },
  dequeue () {
    const [first, ...rest] = q
    q = rest
    return first
  },
  isEmpty () {
    return q.length === 0
  }
}
