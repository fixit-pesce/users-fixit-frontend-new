import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
      Accept: "application/json",
  },
})

export const getAllServices = async() => {
  const response = await api.get(`/service-providers/services`)
  return response.data
}

export const getCategories = async() => {
  const response = await api.get(`/categories`)
  return response.data
}


export const searchService = async(search_term: string) => {
  const response = await api.get(`/search/${search_term}`)
  return response.data
}