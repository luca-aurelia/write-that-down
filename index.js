const schedule = require('./alfred-schedule')

function showLists () {
  const alfred = require('./alfred')
  return alfred.getLists()
}

function showCards () {
  const alfy = require('alfy')
  const alfred = require('./alfred')
  const { listId } = process.env

  const gotCards = alfred.getCards(listId)
  const gotCreateCard = alfred.getCreateCard(alfy.input, listId)

  return Promise.all([gotCards, gotCreateCard]).then(([cardItems, createCardItem]) => {
    cardItems.unshift(createCardItem)
    return cardItems
  })
}

function handleAction ({ action, data }) {
  const notifier = require('node-notifier')
  const open = require('open')
  const { postCard } = require('./trello')

  const notify = (title, message, url) => notifier.notify({ title, message, open: url })

  if (action === 'create') {
    postCard(data)
      .then(newCard => notify('It worked ⚡️', "Your card's now on Trello.", newCard.url))
      .catch(reason => notify('Oops 🌧', `Hit a problem: ${reason}`))
  } else if (action === 'show') {
    open(data.url)
  }
}

schedule(first =>
  first(showLists)
  .next(showCards)
  .next(handleAction)
)

// enqueues functions in the PersistentFunctionQueue
// fq.enqueue(showLists)
// fq.enqueue(showCards)
// fq.enqueue(handleAction)

// final pretty syntax:
// outputResult(showLists)
//   .then(selectedList => outputResult(showCards(selectedList)))
//   .then(selectedCard => handleAction(selectedCard))
