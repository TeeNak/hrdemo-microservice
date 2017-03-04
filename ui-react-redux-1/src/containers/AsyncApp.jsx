import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchJobsIfNeeded, invalidateContents, saveJobs } from '../actions/actions'
import JobList from '../components/JobList'

class AsyncApp extends Component {
  constructor(props) {
    super(props)
    this.handleLoadDataClick = this.handleLoadDataClick.bind(this)
    this.handleSaveDataClick = this.handleSaveDataClick.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchJobsIfNeeded())
  }


  handleLoadDataClick(e) {
    e.preventDefault()

    const { dispatch } = this.props
    dispatch(invalidateContents())
    dispatch(fetchJobsIfNeeded())
  }

  handleSaveDataClick() {
    const { dispatch } = this.props
    dispatch(saveJobs())
  }

  render() {
    const { items, isFetching, lastUpdated, lastEdited } = this.props
    return (
      <div>
        <h1>Hrdemo</h1>
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <span>
              <button type="button" id="loadData" className="btn btn-success"
                 onClick={this.handleLoadDataClick}>
                Load Data
              </button>
              <span> </span>
            </span>
          }
          {!isFetching &&
            <button type="button" id="saveData" className="btn btn-success"
               onClick={this.handleSaveDataClick}>
              Save Data
            </button>
          }
        </p>
        {isFetching && items.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && items.length === 0 &&
          <h2>Empty.</h2>
        }
        {items.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <JobList items={items} lastEdited={lastEdited} />
          </div>
        }
      </div>
    )
  }
}

AsyncApp.propTypes = {
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  lastEdited: PropTypes.shape({
    rowId: PropTypes.number,
    columnName: PropTypes.string
  })
}

function mapStateToProps(state) {
  const copied = state.jobList.items.map( o => Object.assign({}, o) )
  const props = Object.assign( {}, {
    isFetching: true,
    items: []
  }, {
    isFetching: state.jobList.isFetching,
    lastUpdated: state.jobList.lastUpdated,
    items: copied,
    lastEdited: state.jobList.lastEdited
  } );

  return props
}

export default connect(mapStateToProps)(AsyncApp)
