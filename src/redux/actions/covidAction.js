'use strict'

import API from '../constants/listAPI'
import {
  GET_ALL_CASES, GET_ALL_CASES_START, GET_ALL_CASES_STOP, 
  GET_ALL_COUNTRIES_START, GET_ALL_COUNTRIES, GET_ALL_COUNTRIES_STOP,
  GET_COUNTRIES_START, GET_COUNTRIES, GET_COUNTRIES_STOP
} from '../constants'

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
      dispatch(showAllLoadingCountries())

      let result = await api.getAllCountriesCases()
      dispatch(fetchAllCountriesCases(result.data))

      dispatch(hideAllLoadingCountries())

    } catch (e) {
      throw e
    }
  }
}

export const getCountriesCases = (country) => {
  return async (dispatch) => {
    try {

      let object = [];
      dispatch(showLoadingCountries())
      if (typeof country == 'object' || 'array') {
        country.map(async (item) => {
          let response =  await api.getCountriesCases(item);

          object.push(response.data);

          dispatch(fetchCountriesCases(object))

          dispatch(hideLoadingCountries())
        })
      } else {
        let result = await api.getCountriesCases(country)
        dispatch(fetchCountriesCases(result.data))
  
        dispatch(hideLoadingCountries())
      }
  
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

function fetchCountriesCases(listCountriesCases) {
  return {
    type: GET_COUNTRIES,
    listCountriesCases
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

function showAllLoadingCountries() {
  return {
    type: GET_ALL_COUNTRIES_START
  }
}

function hideAllLoadingCountries() {
  return {
    type: GET_ALL_COUNTRIES_STOP
  }
}

function showLoadingCountries() {
  return {
    type: GET_COUNTRIES_START
  }
}

function hideLoadingCountries() {
  return {
    type: GET_COUNTRIES_STOP
  }
}