import http from "./httpServices"

export const signinApi= async (user)=>{
  return http.post('/auth/login',user)
  
}