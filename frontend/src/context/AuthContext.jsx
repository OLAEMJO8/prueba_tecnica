import { createContext, useState, useContext} from "react";
import axios from "axios";
export const AuthContext = createContext();

export const useAuth=()=>{
const context = useContext(AuthContext)
if(!context){
    throw new Error("useAuth must be used within an AuthProvider" )
}
return context
}
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState(null);

  const singin = async(data)=>{
  
    const res = await axios.post("http://localhost:3000/api//signin", data, {
      withCredentials: true,
    });
    setUser(res.data)

    console.log(res)
  } 
    const login = async(data)=>{
      const res = await axios.post("http://localhost:3000/api/login", data, {
        withCredentials:true
       });

       setUser(res.data)
    }
  return (
    <AuthContext.Provider value={{ user, isAuth, errors, singin ,login}}>
      {children}
    </AuthContext.Provider>
  );
}
