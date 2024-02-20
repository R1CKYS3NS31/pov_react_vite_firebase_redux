import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { auth } from "../../utils/auth_helper"

export const PrivateRoute = ({ component: Component, ...rest }) => {
    const authUser = useSelector((state) => state.accountUser)
    return authUser && auth.isAuthenticated() ? (
        <Component />
    ) : (
        <Navigate
            to={{
                pathname: '/signin',
                state: { from: rest.location }
            }}
            replace
        />
    )
}