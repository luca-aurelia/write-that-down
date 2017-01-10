const fq = require('./persistent-function-queue')

function increment (n) {
  console.log(`incrementing n`)
  return (n + 1) || 0
}

fq.enqueue(increment)
fq.enqueue(increment)
fq.enqueue(increment)
