import { createContext, useState, useContext, useEffect} from "react";
import Cookie from "js-cookie";
import axios from "../api/axios";
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
  try {
    
    const res = await axios.post("/signin", data );
    setUser(res.data)
    setIsAuth(true)
    return res.data

  } catch (error) {
    if (Array.isArray(error.response.data)) {
      return setErrors(error.response.data);
    }

    setErrors([error.response.data.message]);
  
  }
  } 
    const login = async(data)=>{
    try {
      const res = await axios.post("/login", data);

       setUser(res.data)
       setIsAuth(true)
       return res.data
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
  
      setErrors([error.response.data.message]);
    
    }
    }

    const logout = async()=>{
      await axios.post("/logout");
      setUser(null);
      setIsAuth(false);
    }

    // Traer datos perfil
    useEffect(()=>{
      if (Cookie.get("token")) {
        axios
          .get("/perfil")
          .then((res) => {
            setUser(res.data);
            setIsAuth(true);
          })
          .catch((err) => {
            setUser(null);
            setIsAuth(false);
          });
      }
      
    },[])
  return (
    <AuthContext.Provider value={{ user, isAuth, errors, singin ,login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}
