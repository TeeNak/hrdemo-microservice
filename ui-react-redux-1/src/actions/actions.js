import fetch from 'isomorphic-fetch'

export const REQUEST_JOBS = 'REQUEST_JOBS'
export const RECEIVE_JOBS = 'RECEIVE_JOBS'
export const INVALIDATE_CONTENTS = 'INVALIDATE_CONTENTS'
export const ROW_EDITED = 'ROW_EDITED'
export const SAVING_JOBS = 'SAVING_JOBS'
export const SAVED_JOBS = 'SAVED_JOBS'

export function invalidateContents() {
  return {
    type: INVALIDATE_CONTENTS
  }
}

function requestJobs() {
  return {
    type: REQUEST_JOBS
  }
}

function receiveJobs(json) {
  return {
    type: RECEIVE_JOBS,
    items: json._embedded.jobs,
    receivedAt: Date.now()
  }
}

export function rowEdited(row, columnName) {
  return {
    type: ROW_EDITED,
    row: row,
    columnName: columnName
  }
}

export function savingJobs() {
  return {
    type: SAVING_JOBS
  }
}


export function savedJobs() {
  return {
    type: SAVED_JOBS
  }
}

function fetchJobs() {
  return dispatch => {
    dispatch(requestJobs())
    const url = '/hrdemo/jobs?size=10000';
    return fetch(url)
      .then(req => req.json())
      .then(json => dispatch(receiveJobs(json)))
  }
}

export function saveJobs() {
  return (dispatch, getState) => {
    dispatch(savingJobs())
    const url = '/hrdemo/jobs/list';
    const data = JSON.stringify(getState().jobList.items);
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    })
      .then( () => dispatch(savedJobs()))
  }
}

function shouldFetchJobs(state) {
  const jobList = state.jobList
  if (!jobList) {
    return true
  } else if (jobList.isFetching) {
    return false
  } else {
    return jobList.didInvalidate
  }
}

export function fetchJobsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchJobs(getState())) {
      return dispatch(fetchJobs())
    }
  }
}

