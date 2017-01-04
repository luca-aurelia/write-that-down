const alfy = require('alfy')
const { getLists } = require('./trello')

const formatList = ({ id, name, icon, uid }) => ({
  title: name,
  arg: id,
  icon,
  uid
})

getLists().then(lists => {
  var items = lists.map(formatList)
  alfy.output(items)
})
