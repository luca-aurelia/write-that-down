const alfy = require('alfy')
const alfred = require('./alfred')

const { listId } = process.env
const gotCards = alfred.getCards(listId)
const gotCreateCard = alfred.getCreateCard(alfy.input, listId)

Promise.all([gotCards, gotCreateCard]).then(([cardItems, createCardItem]) => {
  cardItems.unshift(createCardItem)
  alfy.output(cardItems)
})
