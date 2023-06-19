import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useUserContext = ()=>{
    const context = useContext(AuthContext);

    if(!context){
        throw Error("useItemsContext must be used inside an ItemContextProvider")
    }

    return context;
}