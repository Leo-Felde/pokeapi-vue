import axios from 'axios'

const AppURL = 'https://pokeapi.co/api/v2'

const createAPI = (routeURL: string = '', responseType: string = 'json') => {
  const baseURL = AppURL + routeURL

  const api = axios.create({
    baseURL,
    responseType,
  })

  return api
}

export default createAPI
