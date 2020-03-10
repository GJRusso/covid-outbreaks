import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchDataDispatcher } from '../store/reducers/csseData'

class DataLoader extends Component {
  componentDidMount() {
    this.props.loadData()
  }

  render() {
    const { loading, loaded, errorMessage, lastDate, lastPreliminaryDate } = this.props

    if (loading) {
      return <span>Loading Data...</span>
    } else if (loaded) {
      return (
        <span>
          <span>Most recent date: {lastDate}</span>
          {lastPreliminaryDate &&
            <span>{' • '}preliminary for {lastPreliminaryDate}</span>
          }
        </span>
      )
    } else if (errorMessage) {
      return <span>Error loading data {errorMessage}</span>
    } else {
      return <span></span>
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  loading: state.csseData.loading,
  loaded: state.csseData.loaded,
  errorMessage: state.csseData.errorMessage,
  lastDate: state.csseData.lastDate,
  lastPreliminaryDate: state.csseData.lastPreliminaryDate
})

const mapDispatchToProps = (dispatch) => ({
  loadData: () => fetchDataDispatcher(dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataLoader)
