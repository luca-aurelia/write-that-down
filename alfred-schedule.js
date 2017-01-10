const PersistentFunctionQueue = require('./persistent-function-queue')
const alfy = require('alfy')
const io = require('./alfred-io')
const db = require('./env-db')
const log = require('./log')

const fq = new PersistentFunctionQueue(db)

function step (func) {
  fq.enqueue(func)
  return {
    next: step
  }
}

function tick () {
  let input = alfy.input
  try {
    if (input !== undefined) input = JSON.parse(input)
  } catch (e) {
    // console.log(`Got error ${e} when parsing JSON.`)
    // console.log('No biggy. Continuing.')
  }

  const result = fq.dequeue(input)
  Promise.resolve(result).then(output => io.output(output, db.serialize()))
}

function first (func) {
  // run on the next tick of the event loop
  setTimeout(tick, 0)
  return step(func)
}

function schedule (scheduler) {
  if (fq.isEmpty()) {
    log.debug('function queue was empty when scheduling')
    scheduler(first)
  } else {
    tick()
  }
}

module.exports = schedule
