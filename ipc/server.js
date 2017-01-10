var ipc = require('node-ipc')
const { serverId, queueId } = require('./ids')

ipc.config.id = serverId
ipc.config.silent = true

let listeners = []

function setUpWorkflowListeners (server) {
  const log = data => console.log('got a message: ', data)
  const notify = (data, socket) => {
    const reply = message => server.emit(socket, queueId, message)
    listeners.forEach(listener => listener(data, reply))
  }

  server.on(queueId, log)
  server.on(queueId, notify)
}

ipc.serve(() => setUpWorkflowListeners(ipc.server))
ipc.server.start()

module.exports = {
  onWorkflow (listener) {
    listeners.push(listener)
  }
}
