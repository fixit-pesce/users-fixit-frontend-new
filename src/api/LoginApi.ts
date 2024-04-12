import axios from "axios"

export const loginUser = async ({username, password} : {username: string, password: string}) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
    username,
    password
  },{
    headers : {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
  return response.data
}


export const signupUser = async ({username, email, first_name, last_name, password} : {username : string, email: string, first_name: string, last_name: string, password: string}) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/users`,{
    username, email, first_name, last_name, password
  })
  return response.data
}