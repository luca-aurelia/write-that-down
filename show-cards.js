const alfy = require('alfy')
const { getCards } = require('./trello')

const formatCard = ({ id, name, url }) => ({
  title: name,
  arg: url,
  quicklookurl: url
})

const listId = process.env.listId
getCards(listId).then(cards => {
  const items = cards.map(formatCard)
  alfy.output(items)
})
