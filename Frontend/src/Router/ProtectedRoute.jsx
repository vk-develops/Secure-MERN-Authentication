import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import { useErrorToast } from "../Hooks/useToast";

const ProtectedRoute = () => {
    const { loggedIn } = useContext(UserContext);

    if (loggedIn) {
        return <Outlet />;
    } else {
        useErrorToast("You need to login.");
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }
};

export default ProtectedRoute;
