const ipc = require('node-ipc')
const alfy = require('alfy')
const { clientId, serverId, queueId } = require('./ids')
const log = require('../log')

ipc.config.id = clientId
ipc.config.silent = true

function exit () {
  process.nextTick(() => process.exit())
}

function setUpListeners (client) {
  client.on('connect', () => {
    log.debug(`connected. sending input ${alfy.input}`)
    client.emit(queueId, alfy.input)
  })
  client.on('disconnect', () => {
    log.debug('disconnected from server')
    exit()
  })
  client.on(queueId, data => {
    log.debug('got a message from server: ', data)
    alfy.output(data)
    exit()
  })
}

ipc.connectTo(serverId, () => setUpListeners(ipc.of[serverId]))
