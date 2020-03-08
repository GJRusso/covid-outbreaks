import { csv as d3CSV } from 'd3-fetch'

const SOURCE_URL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv'

const initialState = {
  loaded: false,
  loading: false,
  data: {},
  allDates: []
}

export function reducer (state = initialState, action) {
  switch(action.type) {
    case 'CSSE_DEATHS.LOAD.BEGIN':
      return { ...state, loading: true, error: undefined, errorMessage: '' }

    case 'CSSE_DEATHS.LOAD.SUCCESS':
      return { ...state, loading: false, loaded: true, data: action.data, allDates: action.allDates }

    case 'CSSE_DEATHS.LOAD.FAILURE':
      return { ...state, loading: false, loaded: false, error: action.error, errorMessage: action.errorMessage }

    default:
      return state
  }
}

export function fetchDataDispatcher(dispatch) {
  dispatch({type: 'CSSE_DEATHS.LOAD.BEGIN'})
  return d3CSV(SOURCE_URL)
    .then(data => {
      const allDates =  Object.keys(data[0]).filter(k => k.match(/\d+\/\d+\/\d+/))

      let processedData = {}

      data.forEach(raw => {
        let country = raw['Country/Region']
        let province = raw['Province/State']

        country = COUNTRY_ALIASES[country] || country

        let name = [country, province].filter(x => x).join(' > ')

        name = OUTBREAK_ALIASES[name] || name

        let entry = processedData[name] || {
          name,
          type: province ? 'province' : 'country',
          lat: raw['Lat'],
          lon: raw['Long'],
          deaths: {},
          totalDeaths: 0,
          ...EXTRA_ATTRIBUTES[country],
          ...EXTRA_ATTRIBUTES[name],
        }

        let previousDeaths = 0
        allDates.forEach(d => {
          const totalDeathsSoFar = parseInt(raw[d], 10)
          const newDeaths = totalDeathsSoFar - previousDeaths
          previousDeaths = totalDeathsSoFar

          entry.deaths[d] = (entry.deaths[d] || 0) + newDeaths
          entry.totalDeaths = entry.totalDeaths + newDeaths
        })

        processedData[entry.name] = entry
      })

      processedData = Object.keys(processedData).map(k => processedData[k])
      processedData = processedData.sort((a, b) => (b.totalDeaths - a.totalDeaths))

      dispatch({type: 'CSSE_DEATHS.LOAD.SUCCESS', data: processedData, allDates})
      return processedData
    })
    .catch(error => {
      debugger
      dispatch({type: 'CSSE_DEATHS.LOAD.FAILURE', error})
    })
}

const COUNTRY_ALIASES = {
  'Mainland China': 'China',
  'US': 'USA',
}

const OUTBREAK_ALIASES = {
  'USA > King County, WA': 'USA > WA > Seattle Metro',
  'USA > Snohomish County, WA': 'USA > WA > Seattle Metro',
  'China > Henan': 'China > Other',
  'China > Beijing': 'China > Other',
  'China > Guangdong': 'China > Other',
  'China > Heilongjiang': 'China > Other',
  'China > Anhui': 'China > Other',
  'China > Chongqing': 'China > Other',
  'China > Hainan': 'China > Other',
  'China > Hebei': 'China > Other',
  'China > Shandong': 'China > Other',
  'China > Hunan': 'China > Other',
  'China > Shanghai': 'China > Other',
  'China > Sichuan': 'China > Other',
  'China > Tianjin': 'China > Other',
  'China > Xinjiang': 'China > Other',
  'China > Gansu': 'China > Other',
  'China > Guangxi': 'China > Other',
  'China > Guizhou': 'China > Other',
  'China > Yunnan': 'China > Other',
  'China > Fujian': 'China > Other',
  'China > Inner Mongolia': 'China > Other',
  'China > Jiangxi': 'China > Other',
  'China > Jilin': 'China > Other',
  'China > Liaoning': 'China > Other',
  'China > Shaanxi': 'China > Other',
  'China > Zhejiang': 'China > Other'
}

const EXTRA_ATTRIBUTES = {
  'China': { emoji: '🇨🇳'},
  'China > Hubei': { name: 'China > Hubei (Wuhan)', emoji: '🇨🇳'},
  'Hong Kong > Hong Kong': { name: 'Hong Kong', emoji: '🇭🇰'},
  'Taiwan > Taiwan': { name: 'Taiwan', emoji: '🇹🇼'},
  'USA': { emoji: '🇺🇸' },
  'Iran': { emoji: '🇮🇷' },
  'Italy': { emoji: '🇮🇹' },
  'Spain': { emoji: '🇪🇸' },
  'France': { emoji: '🇫🇷' },
  'Japan': { emoji: '🇯🇵' },
  'South Korea': { emoji: '🇰🇷' },
  'Iraq': { emoji: '🇮🇶' },
  'Thailand': { emoji: '🇹🇭' },
  'Australia': { emoji: '🇦🇺' },
  'Philippines': { emoji: '🇵🇭' },
  'Switzerland': { emoji: '🇨🇭' },
  'Netherlands': { emoji: '🇳🇱' },
  'San Marino': { emoji: '🇸🇲' },
  'UK': { name: 'United Kingdom', emoji: '🇬🇧' },
  'Others > Diamond Princess cruise ship': { name: 'Diamond Princess', emoji: '🛳', type: 'other' }
}

export default reducer

