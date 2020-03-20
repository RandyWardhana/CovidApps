'use strict'

import API from '../constants/listAPI'
import { GET_ALL_CASES, GET_ALL_CASES_START, GET_ALL_CASES_STOP, GET_ALL_COUNTRIES_START, GET_ALL_COUNTRIES, GET_ALL_COUNTRIES_STOP } from '../constants'

let api = API.create()

export const getAllCases = () => {
  return async (dispatch) => {
    try {
      dispatch(showLoading())
      
      let result = await api.getAllCases()         
      dispatch(fetchAllCases(result.data))
      
      dispatch(hideLoading())
    } catch (e) {
      throw e
    }
  }
}

export const getAllCountriesCases = () => {
  return async (dispatch) => {
    try {
      dispatch(showLoadingCountries())

      let result = await api.getAllCountriesCases()
      dispatch(fetchAllCountriesCases(result.data))

      dispatch(hideLoadingCountries())

    } catch (e) {
      throw e
    }
  }
}

function fetchAllCases(listAllCases) {
  return {
    type: GET_ALL_CASES,
    listAllCases
  }
}

function fetchAllCountriesCases(listAllCountriesCases) {
  return {
    type: GET_ALL_COUNTRIES,
    listAllCountriesCases
  }
}

function showLoading() {
  return {
    type: GET_ALL_CASES_START
  }
}

function hideLoading() {
  return {
    type: GET_ALL_CASES_STOP
  }
}

function showLoadingCountries() {
  return {
    type: GET_ALL_COUNTRIES_START
  }
}

function hideLoadingCountries() {
  return {
    type: GET_ALL_COUNTRIES_STOP
  }
}