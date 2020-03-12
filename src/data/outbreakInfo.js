/* Rows that we want to aggregate under a different name, or just rename */
export const OUTBREAK_DATA_AGGREGATES = {
  'Hong Kong > Hong Kong': 'China > Other',
  'Hong Kong SAR > Hong Kong': 'China > Other',
  'Macau > Macau': 'China > Other',
  'Macao SAR > Macau': 'China > Other',
  'Tibet': 'China > Other',

  'Taiwan > Taiwan': 'Taiwan',
  'Taipei and environs > Taiwan': 'Taiwan',
  'Taiwan*': 'Taiwan',

  'occupied Palestinian territory': 'Palestine',

  'UK': 'United Kingdom',
  'United Kingdom > UK': 'United Kingdom',
  'Channel Islands': 'United Kingdom',

  'Russian Federation': 'Russia',
  'Republic of Moldova': 'Moldova',
  'Holy See': 'Vatican City',
  'Viet Nam': 'Vietnam',

  'Others > Diamond Princess cruise ship': 'Diamond Princess',
  'US > Diamond Princess': 'Diamond Princess',
  'US > Grand Princess': 'Grand Princess',

  'US > Washington, D.C.': 'USA > District of Columbia',

  'Iran': 'Iran (Islamic Republic of)',

  'Republic of Korea': 'South Korea',
  'Korea, South': 'South Korea',

  'France > France': 'France',

  'Czechia': 'Czech Republic',

  'Congo (Kinshasa)': 'Congo',


  'Cruise Ship > Diamond Princess': 'Diamond Princess'
}

/* Rows that started under one name and now continue under another */
export const OUTBREAK_DATA_OVERLAYS = {
}

export const OUTBREAK_ATTRIBUTES = {
  'China': { emoji: '🇨🇳', region: 'asia',
    links: { 'Official Reports': 'http://en.nhc.gov.cn/news.html',
             'Wikipedia': 'https://en.wikipedia.org/wiki/2019%E2%80%9320_coronavirus_outbreak_in_mainland_China' }},
  'Hong Kong': { emoji: '🇭🇰', region: 'asia',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Hong_Kong' }},
  'Taiwan': { emoji: '🇹🇼', region: 'asia',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Taiwan' }},
  'Japan': { emoji: '🇯🇵', region: 'asia',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Japan' }},
  'South Korea': { emoji: '🇰🇷', region: 'asia',
    links: { 'Official Reports': 'https://www.cdc.go.kr/board/board.es?mid=a30402000000&bid=0030',
             'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_South_Korea' }},
  'Thailand': { emoji: '🇹🇭', region: 'asia',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Thailand' }},
  'Singapore': { emoji: '🇸🇬', region: 'asia',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Singapore' }},
  'Malaysia': { emoji: '🇲🇾', region: 'asia',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Malaysia'}},
  'Vietnam': { emoji: '🇻🇳', region: 'asia' },
  'Indonesia': { emoji: '🇮🇩', region: 'asia' },
  'Macau': { emoji: '🇲🇴', region: 'asia' },
  'Cambodia': { emoji: '🇰🇭', region: 'asia' },
  'Laos': { emoji: '🇱🇦', region: 'asia' },
  'Bhutan': { emoji: '🇧🇹', region: 'asia' },
  'Brunei': { emoji: '🇧🇳', region: 'asia' },
  'Nepal': { emoji: '🇳🇵', region: 'asia' },
  'India': { emoji: '🇮🇳', region: 'asia',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_India' }},
  'Sri Lanka': { emoji: '🇱🇰', region: 'asia' },
  'Maldives': { emoji: '🇲🇻', region: 'asia' },
  'Bangladesh': { emoji: '🇧🇩', region: 'asia' },
  'Mongolia': { emoji: '🇲🇳', region: 'asia' },

  'Canada': { emoji: '🇨🇦', region: 'americas',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Canada' }},
  'USA': { emoji: '🇺🇸', region: 'americas',
    links: { 'CDC': 'https://www.cdc.gov/coronavirus/2019-ncov/cases-in-us.html',
             'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_United_States' }},
  'USA > Washington': { emoji: '🇺🇸', region: 'americas',
    links: { 'WA State Dept. of Health': 'https://www.doh.wa.gov/Emergencies/Coronavirus',
             'CDC': 'https://www.cdc.gov/coronavirus/2019-ncov/cases-in-us.html',
             'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_United_States' }},
  'USA > California': { emoji: '🇺🇸', region: 'americas',
    links: { 'CA Dept. Public of Health': 'https://www.cdph.ca.gov/Programs/CID/DCDC/Pages/Immunization/nCoV2019.aspx',
             'CDC': 'https://www.cdc.gov/coronavirus/2019-ncov/cases-in-us.html',
             'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_United_States' }},
  'USA > New York': { emoji: '🇺🇸', region: 'americas',
     links: { 'NY Dept. of Health': 'https://www.health.ny.gov/diseases/communicable/coronavirus/',
          'CDC': 'https://www.cdc.gov/coronavirus/2019-ncov/cases-in-us.html',
          'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_United_States' }},


  'Mexico': { emoji: '🇲🇽', region: 'americas' },
  'Argentina': { emoji: '🇦🇷', region: 'americas' },
  'Brazil': { emoji: '🇧🇷', region: 'americas' },
  'Ecuador': { emoji: '🇪🇨', region: 'americas' },
  'Uruguay': { emoji: '🇺🇾', region: 'americas' },
  'Paraguay': { emoji: '🇵🇾', region: 'americas' },
  'Chile': { emoji: '🇨🇱', region: 'americas' },
  'Colombia': { emoji: '🇨🇴', region: 'americas' },
  'Venezuela': { emoji: '🇻🇪', region: 'americas' },
  'Bolivia': { emoji: '🇧🇴', region: 'americas' },
  'Peru': { emoji: '🇵🇪', region: 'americas' },
  'Panama': { emoji: '🇵🇦', region: 'americas' },
  'Costa Rica': { emoji: '🇨🇷', region: 'americas' },
  'El Salvador': { emoji: '🇸🇻', region: 'americas' },
  'Honduras': { emoji: '🇭🇳', region: 'americas' },
  'Dominican Republic': { emoji: '🇩🇴', region: 'americas' },
  'French Guiana': { emoji: '🇬🇫', region: 'americas' },
  'Martinique': { emoji: '🇲🇶', region: 'americas' },
  'Saint Martin': { emoji: '🇸🇽', region: 'americas' },
  'Saint Barthelemy': { emoji: '🇫🇷', region: 'americas' },
  'Jamaica': { emoji: '🇯🇲', region: 'americas' },

  'Iran (Islamic Republic of)': { displayName: 'Iran', emoji: '🇮🇷', region: 'middle east',
    links: { 'Islamic Republic News Agency': 'https://en.irna.ir/service/news',
             'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Iran' }},
  'Israel': { emoji: '🇮🇱', region: 'middle east' },
  'Palestine': { emoji: '🇵🇸', region: 'middle east' },
  'Kuwait': { emoji: '🇰🇼', region: 'middle east' },
  'Iraq': { emoji: '🇮🇶', region: 'middle east',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Iraq' }},
  'United Arab Emirates': { emoji: '🇦🇪', region: 'middle east',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_United_Arab_Emirates' }},
  'Lebanon': { emoji: '🇱🇧', region: 'middle east' },
  'Bahrain': { emoji: '🇧🇭', region: 'middle east' },
  'Egypt': { emoji: '🇪🇬', region: 'middle east',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Egypt' }},
  'Qatar': { emoji: '🇶🇦', region: 'middle east' },
  'Oman': { emoji: '🇴🇲', region: 'middle east' },
  'Saudi Arabia': { emoji: '🇸🇦', region: 'middle east' },
  'Pakistan': { emoji: '🇵🇰', region: 'middle east' },
  'Afghanistan': { emoji: '🇦🇫', region: 'middle east' },
  'Turkey': { emoji: '🇹🇷', region: 'middle east' },
  'Jordan': { emoji: '🇯🇴', region: 'middle east' },

  'Algeria': { emoji: '🇩🇿', region: 'africa' },
  'Senegal': { emoji: '🇸🇳', region: 'africa' },
  'South Africa': { emoji: '🇿🇦', region: 'africa' },
  'Cameroon': { emoji: '🇨🇲', region: 'africa' },
  'Morocco': { emoji: '🇲🇦', region: 'africa' },
  'Burkina Faso': { emoji: '🇧🇫', region: 'africa' },
  'Tunisia': { emoji: '🇹🇳', region: 'africa' },
  'Togo': { emoji: '🇹🇬', region: 'africa' },
  'Nigeria': { emoji: '🇳🇬', region: 'africa' },
  'Congo': { emoji: '🇨🇩', region: 'africa' },
  'Cote d\'Ivoire': { emoji: '🇨🇮', region: 'africa' },
  'Reunion': { emoji: '🇫🇷', region: 'africa' },

  'Australia': { emoji: '🇦🇺', region: 'oceania',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Australia' }},
  'New Zealand': { emoji: '🇳🇿', region: 'oceania' },

  'Italy': { emoji: '🇮🇹', region: 'europe',
    links: { 'Protezione Civile': 'http://www.protezionecivile.gov.it/media-communication/press-release',
             'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Italy' }},
  'Spain': { emoji: '🇪🇸', region: 'europe',
    links: { 'Ministerio de Sanidad': 'https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov-China/situacionActual.htm',
             'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Spain' }},
  'Portugal': { emoji: '🇵🇹', region: 'europe' },
  'France': { emoji: '🇫🇷', region: 'europe',
    links: { 'Santé publique France': 'https://www.santepubliquefrance.fr/maladies-et-traumatismes/maladies-et-infections-respiratoires/infection-a-coronavirus/articles/infection-au-nouveau-coronavirus-sars-cov-2-covid-19-france-et-monde',
             'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_France' }},
  'United Kingdom': { emoji: '🇬🇧', region: 'europe',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_United_Kingdom' }},
  'Philippines': { emoji: '🇵🇭', region: 'asia',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_Philippines' }},
  'Switzerland': { emoji: '🇨🇭', region: 'europe',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Switzerland' }},
  'Netherlands': { emoji: '🇳🇱', region: 'europe',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_Netherlands' }},
  'San Marino': { emoji: '🇸🇲', region: 'europe',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_San_Marino' }},
  'Germany': { emoji: '🇩🇪', region: 'europe',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Germany' }},
  'Sweden': { emoji: '🇸🇪', region: 'europe',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Sweden' }},
  'Belgium': { emoji: '🇧🇪', region: 'europe' },
  'Ireland': { emoji: '🇮🇪', region: 'europe' },
  'Russia': { emoji: '🇷🇺', region: 'europe' },
  'Poland': { emoji: '🇵🇱', region: 'europe' },
  'Slovenia': { emoji: '🇸🇮', region: 'europe' },
  'Georgia': { emoji: '🇬🇪', region: 'europe' },
  'Romania': { emoji: '🇷🇴', region: 'europe' },
  'Croatia': { emoji: '🇭🇷', region: 'europe' },
  'Estonia': { emoji: '🇪🇪', region: 'europe' },
  'Azerbaijan': { emoji: '🇦🇿', region: 'europe' },
  'Hungary': { emoji: '🇭🇺', region: 'europe' },
  'Armenia': { emoji: '🇦🇲', region: 'europe' },
  'Andorra': { emoji: '🇦🇩', region: 'europe' },
  'Belarus': { emoji: '🇧🇾', region: 'europe' },
  'Latvia': { emoji: '🇱🇻', region: 'europe' },
  'Bulgaria': { emoji: '🇧🇬', region: 'europe' },
  'Finland': { emoji: '🇫🇮', region: 'europe' },
  'Austria': { emoji: '🇦🇹', region: 'europe' },
  'Greece': { emoji: '🇬🇷', region: 'europe' },
  'Norway': { emoji: '🇳🇴', region: 'europe' },
  'Iceland': { emoji: '🇮🇸', region: 'europe' },
  'Moldova': { emoji: '🇲🇩', region: 'europe' },
  'Denmark': { emoji: '🇩🇰', region: 'europe' },
  'Faroe Islands': { emoji: '🇫🇴', region: 'europe' },
  'Czech Republic': { emoji: '🇨🇿', region: 'europe' },
  'Bosnia and Herzegovina': { emoji: '🇧🇦', region: 'europe' },
  'Slovakia': { emoji: '🇸🇰', region: 'europe' },
  'Luxembourg': { emoji: '🇱🇺', region: 'europe' },
  'Malta': { emoji: '🇲🇹', region: 'europe' },
  'North Macedonia': { emoji: '🇲🇰', region: 'europe' },
  'Albania': { emoji: '🇦🇱', region: 'europe' },
  'Cyprus': { emoji: '🇨🇾', region: 'europe' },
  'Gibraltar': { emoji: '🇬🇮', region: 'europe' },
  'Liechtenstein': { emoji: '🇱🇮', region: 'europe' },
  'Lithuania': { emoji: '🇱🇹', region: 'europe' },
  'Monaco': { emoji: '🇲🇨', region: 'europe' },
  'Serbia': { emoji: '🇷🇸', region: 'europe' },
  'Vatican City': { emoji: '🇻🇦', region: 'europe' },
  'Ukraine': { emoji: '🇺🇦', region: 'europe' },


  'Diamond Princess': { displayName: 'Diamond Princess (out of Japan)', emoji: '🛳', region: 'other', type: 'other',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_on_cruise_ships#Diamond_Princess' }},
  'Grand Princess': { displayName: 'Grand Princess (out of US)', emoji: '🛳', region: 'other', type: 'other' }
}

export function findAggregateMapping (name) {
  if (OUTBREAK_DATA_AGGREGATES[name]) {
    return OUTBREAK_DATA_AGGREGATES[name]
  } else {
    let parts

    parts = name.match(/US > (.*), (\w\w)/)
    if (parts && US_STATES[parts[2]]) {
      return false
      // return `USA > ${US_STATES[parts[2]]}`
    }

    parts = name.match(/Mainland China > (.*)/)
    if (parts) {
      if (parts[1].indexOf('Hubei') >= 0) return 'China > Hubei (Wuhan)'
      else return 'China > Other'
    }

    parts = name.match(/^China > (.*)/)
    if (parts) {
      if (parts[1].indexOf('Hubei') >= 0) return 'China > Hubei (Wuhan)'
      else return 'China > Other'
    }
  }

  return false
}

export function findOverlayMapping (name) {
  if (OUTBREAK_DATA_OVERLAYS[name]) {
    return OUTBREAK_DATA_OVERLAYS[name]
  } else {
    let parts

    parts = name.match(/US > ([^,]+)$/)
    if (parts) {
      return `USA > ${parts[1]}`
    }
  }

  return false
}

const US_STATES = {
  'AL': 'Alabama',
  'AK': 'Alaska',
  'AZ': 'Arizona',
  'AR': 'Arkansas',
  'CA': 'California',
  'CO': 'Colorado',
  'CT': 'Connecticut',
  'DE': 'Delaware',
  'DC': 'D.C.',
  'FL': 'Florida',
  'GA': 'Georgia',
  'HI': 'Hawaii',
  'ID': 'Idaho',
  'IL': 'Illinois',
  'IN': 'Indiana',
  'IA': 'Iowa',
  'KS': 'Kansas',
  'KY': 'Kentucky',
  'LA': 'Louisiana',
  'ME': 'Maine',
  'MA': 'Massachusetts',
  'MD': 'Maryland',
  'MI': 'Michigan',
  'MN': 'Minnesota',
  'MS': 'Mississippi',
  'MO': 'Missouri',
  'MT': 'Montana',
  'NE': 'Nebraska',
  'NV': 'Nevada',
  'NH': 'New Hampshire',
  'NJ': 'New Jersey',
  'NM': 'New Mexico',
  'NY': 'New York',
  'NC': 'North Carolina',
  'ND': 'North Dakota',
  'OH': 'Ohio',
  'OK': 'Oklahoma',
  'OR': 'Oregon',
  'PA': 'Pennsylvania',
  'RI': 'Rhode Island',
  'SC': 'South Carolina',
  'SD': 'South Dakota',
  'TN': 'Tennessee',
  'TX': 'Texas',
  'UT': 'Utah',
  'VT': 'Vermont',
  'VA': 'Virginia',
  'WA': 'Washington',
  'WV': 'West Virginia',
  'WI': 'Wisconsin',
  'WY': 'Wyoming',
}
