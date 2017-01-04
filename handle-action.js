const alfy = require('alfy')
const open = require('open')
const notifier = require('node-notifier')
const { postCard } = require('./trello')

const input = JSON.parse(alfy.input)

const notify = (title, message) => notifier.notify({ title, message })

if (input.action === 'create') {
  postCard(input.card)
    .then(() => notify('It worked ⚡️', "Your card's now on Trello."))
    .catch(reason => notify('Oops 🌧', `Hit a problem: ${reason}`))
} else if (input.action === 'show') {
  open(input.url)
}
