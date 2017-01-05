const alfy = require('alfy')
const open = require('open')
const notifier = require('node-notifier')
const { postCard } = require('./trello')

const input = JSON.parse(alfy.input)

const notify = (title, message, url) => notifier.notify({ title, message, open: url })

if (input.action === 'create') {
  postCard(input.data)
    .then(newCard => notify('It worked ⚡️', "Your card's now on Trello.", newCard.url))
    .catch(reason => notify('Oops 🌧', `Hit a problem: ${reason}`))
} else if (input.action === 'show') {
  open(input.url)
}
