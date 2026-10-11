import { useState } from "react";
import { createContext } from "react";
import axios from "axios"

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    async function Login(email, password) {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login',  { email, password },  { withCredentials: true } );

    alert(response.data.message);
    setUser(response.data.user);

  } catch (error) {

    alert(error.response.data.message || "Login failed");
  }
}

    return (
            <AuthContext.Provider value={{user, setUser, Login}}>
          {children}
            </AuthContext.Provider>
    )
}

export default AuthProvider