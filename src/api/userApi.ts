import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
      Accept: "application/json",
  },
})


export const getUser = async ({username}: {username: string}) => {
  const response = await api.get(`/users/${username}`)
  return response.data
}

export const updateUser = async ({username, email, first_name, last_name}: {username: string, email: string, first_name: string, last_name: string}) => {
  const response = await api.patch(`/users/${username}`, {
    email,
    first_name,
    last_name
  })
  return response.data
}

export const updatePassword = async ({username, current_password, new_password}: {username: string, current_password: string, new_password: string}) => {
  const response = await api.post(`/auth/change-password/${username}`, {
    current_password,
    new_password
  })
  return response.data
}

export const getUserBookings = async ({username}: {username: string}) => {
  const response = await api.get(`/users/${username}/booked-services`)
  return response.data
}