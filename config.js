const alfy = require('alfy')

const userPermissionToken = () => alfy.config.get('userPermissionToken')
const developerKey = () => alfy.config.get('developerKey')
const boardId = () => alfy.config.get('boardId')

const complete = () => userPermissionToken() && developerKey() && boardId()

module.exports = {
  complete
}
