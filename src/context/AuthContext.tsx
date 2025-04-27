import { error } from "console";
import { createContext, useContext, useReducer } from "react";

const AuthContext=createContext({

})

const initialState={
  user:null,
  isAuthenticated:false,
  isLoading:true,
  error:null  
}
const authReducer=(action,payload)=>{

}

const AuthProvider=({children})=>{
    const [state,dispatch]=useReducer(authReducer,initialState)
 return(
    <AuthContext.Provider value={{state,dispatch}}>{children}</AuthContext.Provider>
 )   
}
const useAuth=()=>{
    const context=useContext(AuthContext)
    if(context===undefined){
        throw  new Error("sth happend")
       
    }
    return context
}

export default AuthProvider