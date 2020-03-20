import axios from 'axios'
import { baseURL } from './index'

export const create = () => {
  let API = axios.create({
    baseURL: baseURL,
    timeout: 30000
  })

  const getAllCases = () => {
    return API.get('all')
  }

  const getAllCountriesCases = () => {
    return API.get('countries')
  }

  const getCountriesCases = (country) => {
    return API.get(`countries/${country}`)
  }

  return {
    getAllCases,
    getAllCountriesCases,
    getCountriesCases
  }
}

export default { create }