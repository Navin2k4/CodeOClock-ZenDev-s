import { createContext,useEffect,useState } from "react";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) =>{
    console.log(localStorage.getItem("user"))
    const [currentUser,setCurrentUser]  = useState(
        
        JSON.parse(localStorage.getItem("user")) || null
    );
    console.log(currentUser)
        const updateUser =(data)=>{
        console.log(data)
        setCurrentUser(data);
    }

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentUser));
    },[currentUser])

    return(
        <AuthContext.Provider value={{currentUser,updateUser}}>
            {children}
        </AuthContext.Provider>
    )
    
}

export default AuthContextProvider;