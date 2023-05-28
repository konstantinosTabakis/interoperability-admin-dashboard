import { Navigate, Outlet } from "react-router-dom"
import { useAuthStatus } from "../db/getAuthStatus"
import Spinner from "./Spinner"

function PrivateRoute({ component: RouteComponent, ...rest }) {
    const { loggedIn, checkingStatus } = useAuthStatus()

    if (checkingStatus) {
        return <Spinner />
    }
    return loggedIn ? <Outlet /> : <Navigate to='/signIn' />
}

export default PrivateRoute