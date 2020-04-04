'use strict'

import { 
  GET_ALL_CASES, GET_ALL_CASES_START, GET_ALL_CASES_STOP, 
  GET_ALL_COUNTRIES_START, GET_ALL_COUNTRIES, GET_ALL_COUNTRIES_STOP,
  GET_COUNTRIES_START, GET_COUNTRIES, GET_COUNTRIES_STOP
} from '../constants/index'

const initialState: Object = {
  listAllCases: null,
  listAllCountriesCases: null,
  listCountriesCases: null,

  loadingAllCases: false,
  loadingAllCountriesCases: false,
  loadingCountriesCases: false,
}

export default (state = initialState, action: any): Object => {
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
    case GET_COUNTRIES_START:
      state = {
        ...state,
        loadingCountriesCases: true
      }
      break
    case GET_COUNTRIES:
      state = {
        ...state,
        listCountriesCases: action.listCountriesCases
      }
      break
    case GET_COUNTRIES_STOP:
      state = {
        ...state,
        loadingCountriesCases: false
      }
      break
    default:
      break
  }

  return state
}