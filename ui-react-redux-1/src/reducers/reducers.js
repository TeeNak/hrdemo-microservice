import { combineReducers } from 'redux'
import {
  INVALIDATE_CONTENTS,
  REQUEST_JOBS, RECEIVE_JOBS, ROW_EDITED,
  SAVING_JOBS, SAVED_JOBS
} from '../actions/actions'

function jobList(state = {
  isFetching: false,
  didInvalidate: true,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_CONTENTS:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_JOBS:
    case SAVING_JOBS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case ROW_EDITED:
      const newItems = state.items.map( (element) => {
        if (element.jobId === action.row.jobId) {
          return action.row
        } else {
          return element
        }
      })

      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: newItems,
        lastEdited: {
          rowId: action.row.jobId,
          columnName: action.columnName
        }
      })
    case RECEIVE_JOBS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.items,
        lastUpdated: action.receivedAt
      })
    case SAVED_JOBS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
    jobList
})

export default rootReducer
