const alfy = require('alfy')
const trello = require('./trello')
const iconFor = require('./icon-for')

const formatCard = ({ id, name, url }) => ({
  title: name,
  arg: JSON.stringify({action: 'show', url}),
  quicklookurl: url
})

const listId = process.env.listId

const parts = alfy.input.split(';')
var title = parts[0]
if (title.trim().length === 0) title = 'Create a new card'
const subtitle = parts[1]
const newCard = { action: 'create', card: { name: title, desc: subtitle, pos: 'top', idList: listId } }
const newCardItem = {
  title,
  subtitle,
  arg: JSON.stringify(newCard),
  icon: iconFor('new card')
}

trello.getCards(listId).then(cards => {
  const items = alfy.inputMatches(cards, 'name').map(formatCard)
  items.unshift(newCardItem)
  alfy.output(items)
})
