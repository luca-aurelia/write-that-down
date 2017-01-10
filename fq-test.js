const fq = require('./persistent-function-queue')
let db = require('./db')('./function-queue-test.json')

const n = db.get('n')
console.log(`About to dequeue with n = ${n}`)
const result = fq.dequeue(n)
console.log(`Storing dequeue result: ${result}`)
db.set('n', result)
