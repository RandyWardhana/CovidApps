'use strict'

import { GET_ALL_CASES, GET_ALL_CASES_START, GET_ALL_CASES_STOP, GET_ALL_COUNTRIES_START, GET_ALL_COUNTRIES, GET_ALL_COUNTRIES_STOP } from '../constants/index'

const defaultState = {
  listAllCases: null,
  listAllCountriesCases: null,

  loadingAllCases: false,
  loadingAllCountriesCases: false,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_ALL_CASES_START:
      state = {
        ...state,
        loadingAllCases: true
      }
      break
    case GET_ALL_CASES:
      state = {
        ...state,
        listAllCases: action.listAllCases
      }
      break
    case GET_ALL_CASES_STOP:
      state = {
        ...state,
        loadingAllCases: false
      }
      break
    case GET_ALL_COUNTRIES_START:
      state = {
        ...state,
        loadingAllCountriesCases: true
      }
      break
    case GET_ALL_COUNTRIES:
      state = {
        ...state,
        listAllCountriesCases: action.listAllCountriesCases
      }
      break
    case GET_ALL_COUNTRIES_STOP:
      state = {
        ...state,
        loadingAllCountriesCases: false
      }
      break
    default:
      break
  }

  return state
}