const PersistentQueue = require('./persistent-queue')

function evaluateFunctionSource (source, ...args) {
  args = args.map(arg => JSON.stringify(arg))
  const invocation = `(${source})(...[${args}])`
  // console.log('Invoking')
  // console.log(`  ${invocation}`)
  return eval(invocation)
}

// function evaluateFunction (func, ...args) {
//   const source = func.toString()
//   return evaluateFunctionSource(source, ...args)
// }

class PersistentFunctionQueue {
  constructor (db) {
    this.queue = new PersistentQueue(db)
  }
  enqueue (func) {
    if (typeof func !== 'function') throw new Error(`Expected a function but got ${func}`)
    this.queue.push(func.toString())
  }
  dequeue (input) {
    const nextFunctionSource = this.queue.shift()
    if (!nextFunctionSource) return
    return evaluateFunctionSource(nextFunctionSource, input)
  }
  isEmpty () {
    return this.queue.isEmpty()
  }
}

module.exports = PersistentFunctionQueue

/*

Queue
  enqueue: (func) =>
    load the queue from storage
    add a function at the back of the queue
    store the updated queue
  dequeue: () =>
    load the queue from storage
    retrieve and parse user input (derived from one of the items the last dequeued function returned)
    execute the function at the front of the queue; pass it the parsed user input
    send the return value of the function to alfred
    remove the function from the front of the queue
    store the updated queue

*/
