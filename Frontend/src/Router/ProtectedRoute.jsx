import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import { useErrorToast } from "../Hooks/useToast";

const ProtectedRoute = () => {
    const { user } = useContext(UserContext);

    const Loading = () => {
        return (
            <div className="max-w-xl h-screen mx-auto mb-10">
                <h1 className="text-white pt-32">Loading</h1>
            </div>
        );
    };

    if (user && user.isVerified) {
        return <Outlet />;
    } else {
        if (!user) {
            // User data is not yet loaded, show loading indicator or handle appropriately
            return <Loading />;
        } else {
            // User is not logged in or not verified, redirect to login page
            useErrorToast("You need to login.");
            return (
                <Navigate
                    to="/login"
                    replace
                />
            );
        }
    }
};

export default ProtectedRoute;
