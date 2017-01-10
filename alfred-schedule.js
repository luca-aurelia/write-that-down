const fq = require('./function-queue')
const server = require('./ipc/server')

function parse (data) {
  console.log(`Parsing ${JSON.stringify(data)}`)
  try {
    if (data === undefined) return
    data = JSON.parse(data)
  } catch (e) {
    console.log('Failed to parse JSON. No biggy.')
  } finally {
    return data
  }
}

function callNextFunction (input) {
  console.log(`Calling next function with input ${input}`)
  const nextFunction = fq.dequeue()
  return Promise.resolve(nextFunction(input))
}

function next (func) {
  fq.enqueue(func)
  return { next }
}

server.onWorkflow((data, reply) => {
  callNextFunction(parse(data)).then(reply)
})

module.exports = next
