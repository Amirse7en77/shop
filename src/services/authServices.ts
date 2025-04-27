import axios from "axios"
import http from "./httpServices"

export const userApi= async (accessToken)=>{
  return axios.get("https://dummyjson.com/auth/me",{headers:{
    Authorization: `Bearer ${accessToken}`
  }})
  
}
export const signinApi= async (accessToken)=>{
  return axios.get("https://dummyjson.com/user/login",{
    body: JSON.stringify({
      username: username,
      password: password,
      expiresInMins: 30,
    })
  })
  
}
