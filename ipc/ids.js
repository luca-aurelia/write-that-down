const pkg = require('../package.json')

module.exports = {
  clientId: `${pkg.name}-client`,
  serverId: `${pkg.name}-server`,
  queueId: `${pkg.name}-workflow`
}
