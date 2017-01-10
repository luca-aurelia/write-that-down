const alfy = require('alfy')
const open = require('open')

const requirements = [
  {
    name: 'Developer key',
    value: () => alfy.config.get('developerKey'),
    url: () => 'https://trello.com/app-key'
  },
  {
    name: 'User permission token',
    value: () => alfy.config.get('userPermissionToken'),
    url: () => `https://trello.com/1/authorize?expiration=never&scope=read,write,account&response_type=token&name=Write%20That%20Down&key=${alfy.config.get('developerKey')}`
  }
]

const userPermissionToken = alfy.config.get('userPermissionToken')
const developerKey = () => alfy.config.get('developerKey')
const boardId = () => alfy.config.get('boardId')

const complete = () => requirements.every(requirement => requirement.value())

module.exports = {
  nextSetupRequirement () {
    if (!developerKey()) {

    }
  }
}
