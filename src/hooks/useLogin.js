import { useState } from "react"
import { useUserContext } from "./useUserContext"

export const useLogin = ()=>{
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useUserContext(); //Auth Context

    const login = async (email, password)=>{
        
        setIsLoading(true);
        setError(null);

        const response = await fetch("http://localhost:4000/api/user/login",{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        console.log(response);

        const json = await response.json()

        if(!response.ok){            
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            setError(null)

            localStorage.setItem('user', JSON.stringify(json))

            dispatch({type:'LOGIN',payload: json})

            setIsLoading(false)
        }
    }
    return {login, error, isLoading}
}