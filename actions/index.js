import 'babel-core/polyfill'
import fetchJsonp from 'fetch-jsonp'
import moment from 'moment'
import * as ActionTypes from '../constants/ActionTypes'
import * as AuthorTypes from '../constants/AuthorTypes'
import * as WorkTypes from '../constants/WorkTypes'

function requestWorksStart() {
  return {
    type: ActionTypes.REQUEST_WORKS_START,
  }
}

function requestWorksSuccess(works) {
  return {
    type: ActionTypes.REQUEST_WORKS_SUCCESS,
    works
  }
}

function requestWorksFailed(error) {
  return {
    type: ActionTypes.REQUEST_WORKS_FAILED,
    error: error.toString()
  }
}

const API_ROOT = 'http://api.tumblr.com/v2/blog/yamadalab-ocu.tumblr.com/posts'

export function fetchWorks() {
  return (dispatch, getStore) => {
    dispatch(requestWorksStart())

    fetchJsonp(`${API_ROOT}?api_key=V7bVvLuqzan8hxMH00AuPcB5sgW3yMTHIIamkpRUy8HUqfJeVO&tag=works`)
      .then(response =>
        response.json()
      )
      .then(json => {
        const { posts } = json.response
        let works = []

        posts.forEach(post => {
          let { title, body, timestamp, tags } = post

          if (title === '' || title === undefined || title === null) {
            title = '無題'
          }

          let author = []
          Object.keys(AuthorTypes).forEach(authorKey => {
            const result = tags.find(tag => tag === AuthorTypes[authorKey])
            if (result) {
              author.push(result)
            } 
          })
          if (author.length === 0) {
            author.push(AuthorTypes.PROFESSOR)
          }

          let type
          Object.keys(WorkTypes).forEach(workKey => {
            const result = tags.find(tag => tag === WorkTypes[workKey])
            if (result) {
              type = result
            } 
          })
          if (type === undefined) {
            type = WorkTypes.THESIS
          }

          const specifiedDate = tags.find(tag => tag.match(/^date-/))
          let date
          if (specifiedDate) {
            const [years, months = 1] = specifiedDate.replace(/^date-/, '').split(/-/)
            date = moment({years, months: months -1})
          } else {
            date = moment.unix(timestamp)
          }

          works = [...works, { title, body, author, type, date }]
        })

        dispatch(requestWorksSuccess(works))
      }).catch(error =>
        dispatch(requestWorksFailed(error))
      )
  }
}
