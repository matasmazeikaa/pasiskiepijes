const axios = require('axios')

export const api = axios.create({
  baseURL: process.env.API_URL
})
