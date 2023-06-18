import {useState } from "react";
import AuthContext from "../context/authContext"
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [token,setToken] = useState();
    const data= {
        user,token,setToken,setUser
    }
    return (
        <AuthContext.Provider value={data}> 
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;