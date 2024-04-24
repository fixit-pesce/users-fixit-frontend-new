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

export const getService = async({sp_username, service_name}: {sp_username: string, service_name: string}) => {
  const response = await api.get(`/service-providers/${sp_username}/services/${service_name}`)
  return response.data
}


export const getServiceFAQs = async (sp_username: string, service_name: string) => {
  const response = await api.get(`service-providers/${sp_username}/services/${service_name}/faqs`)
  return response.data
}

export const getServiceReviews = async (sp_username: string, service_name: string) => {
  const response = await api.get(`/service-providers/${sp_username}/services/${service_name}/reviews`)
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


export const bookService = async({sp_username, service_name, category, company_name, price, phone_no}: {sp_username: string, service_name: string, company_name: string, category: string, price: number, phone_no: string}) => {
  const response = await api.post(`/service-providers/${sp_username}/services/${service_name}/bookings`, {
    service_name,
    company_name,
    category,
    price,
    username: sp_username,
    phone_no,
  })
  return response.data
}


export const getMyReviews = async({username}: {username: string}) => {
  const response = await api.get(`/users/${username}/reviews`)
  return response.data
}


export const writeReview = async({username, sp_username, service_name, rating, description}: {username: string, service_name: string, sp_username: string, rating: number, description: string}) => {
  const response = await api.post(`/service-providers/${sp_username}/services/${service_name}/reviews`, {
    username,
    rating,
    description
  })
  return response.data
}