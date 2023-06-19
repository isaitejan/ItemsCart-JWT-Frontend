import { useItemsContext } from "./useItemsContext";
import { useUserContext } from "./useUserContext"

export const useLogout = ()=>{

    const { dispatch } = useUserContext(); //Auth Context
    const { dispatch: itemsDispatch } = useItemsContext(); //Items Context

    const logout = ()=>{
        // remove user from localstorage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({type:'LOGOUT'})
        itemsDispatch({type:'SET_ITEMS', payload:null})
    }

    return {logout};
}