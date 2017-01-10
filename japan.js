const schedule = require('./alfred-schedule')

function showRegions () {
  const japan = {
    kanto: {
      gunma: ['annaka', 'maebashi'],
      tochigi: ['ashikaga', 'nasushiobara']
    }
  }

  const regions = () => Object.keys(japan)
  return regions().map(region => { return { title: region, arg: region } })
}

function showPrefectures (region) {
  const japan = {
    kanto: {
      gunma: ['annaka', 'maebashi'],
      tochigi: ['ashikaga', 'nasushiobara']
    }
  }

  const prefectures = (region) => Object.keys(japan[region])
  return prefectures(region).map(prefecture => {
    return {
      title: prefecture,
      arg: JSON.stringify([region, prefecture])
    }
  })
}

function showCities ([region, prefecture]) {
  const japan = {
    kanto: {
      gunma: ['annaka', 'maebashi'],
      tochigi: ['ashikaga', 'nasushiobara']
    }
  }

  const cities = (region, prefecture) => japan[region][prefecture]
  return cities(region, prefecture).map(city => {
    return {
      title: city,
      arg: [region, prefecture, city].join(', ')
    }
  })
}

schedule(first =>
  first(showRegions)
  .next(showPrefectures)
  .next(showCities)
)
