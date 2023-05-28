import { createContext, useReducer } from "react"
import UserReducer from "./reducers/UserReducer"

const UserContext= createContext()

export const UserProvider = ({ children }) => {

    const initialState = {
        users: null,
        numberOfUsers: null,
        currentUserId:null,
        currentUserEmail: null         
    }

    const [state, dispatch] = useReducer(UserReducer, initialState)

    return <UserContext.Provider value={{ ...state, dispatch }}>
        {children}
    </UserContext.Provider>

}

export default UserContext