import React from 'react'
import { connect } from 'react-redux'
import { VariableSizeList } from 'react-window';
import { Trans, useTranslation } from 'react-i18next';

import './TableView.css'

import MarkerLegend from '../components/ui/MarkerLegend'
import Information from '../components/ui/Information'
import ViewControls from '../components/ui/ViewControls'
import OneTableEntry from './entries/OneTableEntry'
import OneSummaryEntry from './entries/OneSummaryEntry'

import { viewOptionsForSorting } from '../store/sorters'
import { viewOptionsForFiltering } from '../store/filters'
import { totalizeEntries } from '../store/totalize'

export const TableViewContext = React.createContext({})

const TableView = ({
  loaded, data, allDates, last2weeks, last3weeks, last4weeks, last6weeks, last8weeks,
  view, sort, filter, noScaling, weeks, totals,
  pinPositions, pinEntry, unpinEntry,
  isExpanded, expandEntry, collapseEntry,
  isMobile, isTablet, isDesktop,
  listRef, tableViewRef, listHeight
}) => {
  const { t } = useTranslation();

  if (loaded) {
    let viewOptions = { pinPositions }
    viewOptions = viewOptionsForSorting(sort, viewOptions)
    viewOptions = viewOptionsForFiltering(filter, viewOptions)

    data = data.sort((a, b) => viewOptions.sorter(a, b, viewOptions ))
    data = data.filter((a) => viewOptions.filterer(a, viewOptions ))

    let totalsEntry
    if (totals) {
      totalsEntry = totalizeEntries(data, allDates)
      totalsEntry.displayName = t(
        'entry.totals_title', "{{filter}} • TOTALS",
        {
          filter: t(`filter.description.${viewOptions.filter}`, viewOptions.filterDescription)
        }
      )

      totalsEntry.emoji = '🌎'
    }

    let dates
    if (weeks === 'two') {
      dates = last2weeks
    } else if (weeks === 'three') {
      dates = last3weeks
    } else if (weeks === 'four') {
      dates = last4weeks
    } else if (weeks === 'six') {
      dates = last6weeks
    } else if (weeks === 'eight') {
      dates = last8weeks
    } else if (weeks === 'all') {
      dates = allDates
    } else if (isMobile) {
      dates = last4weeks
    } else if (isTablet) {
      dates = last6weeks
    } else {
      dates = last6weeks
    }

    const comparisonEntry = undefined //data.find(entry => entry.code === 'it')

    const actualProps = {
      data, dates, allDates,
      viewOptions, pinPositions, isExpanded, pinEntry, unpinEntry, expandEntry, collapseEntry,
      totalsEntry, comparisonEntry,
      listRef, tableViewRef, listHeight,
      isMobile, isTablet, isDesktop, view
    }
    return (
      <ActualTableView {...actualProps} />
    )
  } else {
    return (
      <div className='TableView'>
        <div className='TableView-loading'>
          <h2><Trans i18nKey={'general.loading'}>Loading...</Trans></h2>
        </div>
      </div>
    )
  }
}

const ActualTableView = ({
  data, dates, allDates,
  view, noScaling,
  pinPositions, pinEntry, unpinEntry,
  isExpanded, expandEntry, collapseEntry,
  totalsEntry, comparisonEntry,
  listRef, tableViewRef, listHeight,
  isMobile, isTablet, isDesktop
}) => {
  const entryHeights = React.useRef({});

  const setEntryHeight = React.useCallback((code, index, size) => {
    const prev = entryHeights.current[code]
    entryHeights.current = { ...entryHeights.current, [code]: size }
    if (prev !== size) {
      listRef.current.resetAfterIndex(index)
    }
  }, [listRef])

  const getEntryHeight = React.useCallback((index) => {
    if (index === 0) {
      return view === 'classic' ? 140 : 100 // first row with ViewControls
    }
    else {
      return entryHeights.current[data[index - 1].code] || 120
    }
  }, [data, view])

  const sharedProps = { dates, allDates, pinEntry, unpinEntry, expandEntry, collapseEntry, isMobile, isTablet, isDesktop }

  const EntryView = { 'classic': OneTableEntry, 'compact': OneSummaryEntry }[view] || OneSummaryEntry

  return (
    <TableViewContext.Provider value={{ setEntryHeight }}>
      <div className='TableView' ref={tableViewRef}>
        {totalsEntry &&
          <EntryView {...sharedProps} pinEntry={undefined}
            entry={totalsEntry} index={0} pinned={true} expanded={isExpanded['totals']}
            sideBySide={!noScaling}
          />
        }

        <VariableSizeList
          height={listHeight}
          itemCount={data.length}
          itemSize={getEntryHeight}
          ref={listRef}
        >
          {({ index, style }) => {
            if (index === 0) {
              return (
                <div>
                  <ViewControls isMobile={isMobile} />

                  <Information content='numbers' trigger={<button>what do these numbers mean?</button>} />

                  { view === 'classic' && <MarkerLegend /> }
                </div>
              )
            } else {
              const code = data[index - 1] && data[index - 1].code

              return (
                <div style={{...style}}>
                  <EntryView {...sharedProps}
                    entry={data[index - 1]} index={index - 1} pinned={pinPositions[code]} expanded={isExpanded[code]}
                    sideBySide={!noScaling}
                    comparisonEntry={comparisonEntry}
                  />
                </div>
              )
            }
          }}
        </VariableSizeList>

      </div>
    </TableViewContext.Provider>
  )
}

const mapStateToProps = (state, ownProps) => ({
  loaded: state.data.loaded,
  data: state.data.data,
  allDates: state.data.allDates,
  last2weeks: state.data.last2weeks,
  last3weeks: state.data.last3weeks,
  last4weeks: state.data.last4weeks,
  last6weeks: state.data.last6weeks,
  last8weeks: state.data.last8weeks,
  view: state.ui.view,
  sort: state.ui.sort,
  filter: state.ui.filter,
  noScaling: state.ui.noScaling,
  weeks: state.ui.weeks,
  totals: state.ui.totals,
  pinPositions: state.ui.pinPositions,
  isExpanded: state.ui.isExpanded
})

const mapDispatchToProps = (dispatch, props) => ({
  pinEntry: (entry) => {
    console.log('pin', props)
    props.listRef.current.resetAfterIndex(0)
    dispatch({ type: 'UI.PIN_ENTRY', value: entry.code })
  },
  unpinEntry: (entry) => {
    props.listRef.current.resetAfterIndex(0)
    dispatch({ type: 'UI.UNPIN_ENTRY', value: entry.code })
  },
  expandEntry: (entry) => dispatch({ type: 'UI.EXPAND_ENTRY', value: entry.code }),
  collapseEntry: (entry) => dispatch({ type: 'UI.COLLAPSE_ENTRY', value: entry.code })
})

const ConnectedTableView = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableView)

export default ConnectedTableView
