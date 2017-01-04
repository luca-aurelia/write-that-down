const alfy = require('alfy')
const { userPermissionToken, developerKey, boardId } = require('./secrets')
const Trello = require('node-trello')
const t = new Trello(developerKey, userPermissionToken)
const iconFor = require('./icon-for')

function assignUid (resultType) {
  return function (element) {
    element.uid = `${resultType}/${element.id}`
    return element
  }
}

function get (path, resultsType) {
  const refreshCache = new Promise((resolve, reject) => {
    t.get(path, (err, results) => {
      if (err) {
        reject(err)
      } else {
        results = results.map(assignUid(resultsType))
        alfy.cache.set(path, results)
        resolve(results)
      }
    })
  })

  const cached = alfy.cache.get(path)
  if (cached) return Promise.resolve(cached)
  return refreshCache
}

function post (path, args) {
  return new Promise((resolve, reject) => {
    t.post(path, args, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = {
  getCards (listId) {
    return get(`/1/lists/${listId}/cards`, 'card')
  },
  getLists () {
    return get(`/1/boards/${boardId}/lists`, 'list').then((lists) => {
      lists.forEach(list => list.icon = iconFor(list.name))
      return lists
    })
  },
  postCard (card) {
    return post(`/1/cards`, card)
  }
}
