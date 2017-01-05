const alfy = require('alfy')
const trello = require('./trello')
const iconFor = require('./icon-for')
const isEmpty = string => string.trim().length === 0

const formatList = ({ id, name, icon, uid }) => ({
  title: name,
  arg: id,
  icon,
  uid
})

const formatCard = ({ id, name, url }) => ({
  title: name,
  arg: JSON.stringify({ action: 'show', url }),
  quicklookurl: url
})

const formatCreateCard = (card) => ({
  title: card.data.name,
  subtitle: card.data.desc,
  arg: JSON.stringify(card),
  icon: iconFor('new card')
})

module.exports = {
  getLists () {
    return trello.getLists().then(lists => lists.map(formatList))
  },
  getCards (listId) {
    return trello.getCards(listId).then(cards => alfy.inputMatches(cards, 'name').map(formatCard))
  },
  getCreateCard (userInput, listId) {
    let [name, desc] = userInput.split(';')
    if (isEmpty(name)) name = 'Create a new card'
    const createCard = {
      action: 'create',
      data: { name, desc, pos: 'top', idList: listId }
    }

    return Promise.resolve(formatCreateCard(createCard))
  }
}
