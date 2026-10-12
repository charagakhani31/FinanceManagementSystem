import { useState } from "react";
import { createContext } from "react";
import axios from "axios"
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const navigate = useNavigate();
    
    const [user, setUser] = useState(null)

    async function Login(email, password) {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login',  { email, password },  { withCredentials: true } );

    alert(response.data.message);
    setUser(response.data.user);

          if (response.status === 200) {
         navigate("/dashboard");
    }

  } catch (error) {

     alert(error.response?.data?.message || error.message);
  }
}

  async function register(fullName, email, password) {

    try {

        const response = await axios.post('http://localhost:3000/api/auth/register', {fullName, email, password}, { withCredentials: true} );
      
           alert(response.data.message);
           setUser(response.data.user)

           if(response.status === 201) {
            navigate("/dashboard")
           }

    } catch (error) {
      
        alert(error.response?.data?.message || error.message)
    }  
  }

    return (
            <AuthContext.Provider value={{user, setUser, Login, register}}>
          {children}
            </AuthContext.Provider>
    )
}

export default AuthProvider