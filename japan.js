const first = require('./alfred-schedule')

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

function showCities (input) {
  const japan = {
    kanto: {
      gunma: ['annaka', 'maebashi'],
      tochigi: ['ashikaga', 'nasushiobara']
    }
  }
  const [region, prefecture] = input
  console.log(`showCities got ${input}`)
  console.log(`region: ${region}`)
  console.log(`prefecture: ${prefecture}`)
  return japan[region][prefecture].map(city => {
    return {
      title: city,
      arg: [region, prefecture, city].join(', ')
    }
  })
}

first(showRegions)
  .next(showPrefectures)
  .next(showCities)
