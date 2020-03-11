import { csv as d3CSV } from 'd3-fetch'

import { OUTBREAK_ATTRIBUTES, findAggregateMapping, findOverlayMapping } from '../../data/outbreakInfo'
// import { PRELIMINARY_DATA } from '../../data/preliminaryData'

const CASES_URL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv'
const DEATHS_URL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv'

const initialState = {
  loaded: false,
  loading: false,
  data: {},
  allDates: []
}

export function reducer (state = initialState, action) {
  switch(action.type) {
    case 'CSSE_DATA.LOAD.BEGIN':
      return { ...state, loading: true, error: undefined, errorMessage: '', lastDate: undefined, lastPreliminaryDate: undefined }

    case 'CSSE_DATA.LOAD.SUCCESS':
      return { ...state, loading: false, loaded: true, data: action.data, allDates: action.allDates, lastDate: action.lastDate, lastPreliminaryDate: action.lastPreliminaryDate }

    case 'CSSE_DATA.LOAD.FAILURE':
      return { ...state, loading: false, loaded: false, error: action.error, errorMessage: action.errorMessage }

    default:
      return state
  }
}

/* ================================================================================================================== */

function parseRawData (rawData, overrides) {
  overrides = overrides || {}

  let dates = Object.keys(rawData[0]).filter(k => k.match(/\d+\/\d+\/\d+/))
  let rows = {}
  let sources = {}
  let name

  rawData.forEach(rawRow => {
    name = [rawRow['Country/Region'], rawRow['Province/State']].filter(x => x).join(' > ')
    rows[name] = {}

    dates.forEach(d => {
      if (overrides[name] && (overrides[name][d] || overrides[name][d] === 0)) {
        rows[name][d] = overrides[name][d]
      } else if (rawRow[d] || rawRow[d] === '0') {
        rows[name][d] = parseInt(rawRow[d], 10)
      }
    })
  })

  return { dates, rows, names: Object.keys(rows), sources }
}

function combineRows (data, combinationMethod, combinationRules) {
  let targetName
  let row
  let rows = {}
  let sources = data.sources

  data.names.forEach(name => {
    targetName = combinationRules(name)
    if (targetName) {
      row = rows[targetName] || {}
      data.dates.forEach(d => {
        if (data.rows[name][d] || data.rows[name][d] === 0) {
          row[d] = combinationMethod(row[d],data.rows[name][d])
        }
      })
      data.sources[targetName] = (data.sources[targetName] || []).concat(name)
      rows[targetName] = row
    } else {
      rows[name] = data.rows[name]
    }
  })

  return {dates: data.dates, sources, rows, names: Object.keys(rows)}
}

function prepareEntries (data, fieldName, entries) {
  entries = entries || {}

  let sources, nameParts, entry

  Object.keys(data.rows).forEach(name => {
    sources = data.sources[name]

    nameParts = name.split(' > ')

    entry = entries[name] || {
      name,
      country: nameParts[0],
      type: nameParts[1] ? 'province' : 'country',
      ...OUTBREAK_ATTRIBUTES[nameParts[0]],
      ...OUTBREAK_ATTRIBUTES[name]
    }

    entry.sources = entry.sources || {}
    entry.sources[fieldName] = sources

    entry.totals = entry.totals || {}
    entry.totals[fieldName] = {}

    entry.counts = entry.counts || {}
    entry.counts[fieldName] = {}

    entry.latestTotal = entry.latestTotal || {}
    entry.latestTotal[fieldName] = 0

    entry.latestCount = entry.latestCount || {}
    entry.latestCount[fieldName] = 0

    entries[entry.name] = entry
  })

  return entries
}

function processOneFile (fieldName, rawData, entries ) {
  let data
  data = parseRawData(rawData, DATA_OVERRIDES[fieldName])
  data = combineRows(data, (a, b) => (a || 0) + (b || 0), findAggregateMapping)
  data = combineRows(data, (a, b) => (a || b), findOverlayMapping)

  entries = prepareEntries(data, fieldName, entries)

  let row, entry

  data.names.forEach(name => {
    row = data.rows[name]
    entry = entries[name]

    data.dates.forEach(d => {
      entry.totals[fieldName][d] = row[d]
      entry.counts[fieldName][d] = entry.totals[fieldName][d] - entry.latestTotal[fieldName]
      entry.latestTotal[fieldName] = entry.totals[fieldName][d]
      entry.latestCount[fieldName] = entry.counts[fieldName][d]
    })

    entries[entry.name] = entry
  })

  return { entries, names: data.names, dates: data.dates }
}

export function fetchDataDispatcher (dispatch) {
  dispatch({type: 'CSSE_DATA.LOAD.BEGIN'})
  return Promise.all([d3CSV(CASES_URL), d3CSV(DEATHS_URL)])
    .then(results => {
      let caseData = results[0]
      let deathData = results[1]

      let casesResults = processOneFile('cases', caseData, {})
      let deathsResults = processOneFile('deaths', deathData, casesResults.entries)

      let data = Object.keys(deathsResults.entries).map(k => deathsResults.entries[k])

      let allDates = deathsResults.dates
      let lastDate = allDates[allDates.length - 1]

      dispatch({type: 'CSSE_DATA.LOAD.SUCCESS', data, allDates, lastDate})
      return data
    })
    // .catch(error => {
    //   debugger
    //   dispatch({type: 'CSSE_DATA.LOAD.FAILURE', error})
    // })
}

const DATA_OVERRIDES = {
  deaths: {
    'Mainland China > Hubei': {
      // '1/29/20': 125 + (37 / 2) - 0.5,
      // '1/30/20': 162 + (37 / 2) + 0.5,
      // '2/12/20': 1068 + (242 / 2),
      // '2/13/20': 1310 + (242 / 2),
      // '2/21/20': 2144 + (202 / 2),
      // '2/22/20': 2346 + (202 / 2),
      // '2/23/20': 2346 + (149 / 2) + 0.5,
      // '2/24/20': 2495 + (149 / 2) - 0.5
    }
  }
  // 'Iran': {
  //   '3/10/20': { deathsRaw: 291, casesRaw: 8042 },
  // },
  // 'South Korea': {
  //   '3/10/20': { deathsRaw: 54, casesRaw: 7513 },
  // }
}
export default reducer
