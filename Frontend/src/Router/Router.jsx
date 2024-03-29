import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import HomePage from "../Pages/HomePage";
import RegisterPage from "../Pages/RegisterPage";
import Layout from "../Components/Layout";
import NotFoundPage from "../Pages/NotFoundPage";
import MovieDetailPage from "../Pages/MovieDetailPage";
import ProfilePage from "../Pages/ProfilePage";
import VerifyAccountPage from "../Pages/VerifyAccountPage";
import ResetPasswordPage from "../Pages/ResetPasswordPage";
import PasswordResetPage from "../Pages/PasswordResetPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminPage from "../Pages/Admin/AdminPage";
import EditProfilePage from "../Pages/EditProfilePage";

const Router = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <Routes>
            <Route
                path="/"
                element={<Layout />}
            >
                <Route
                    index
                    element={<HomePage />}
                />
                <Route
                    path="login"
                    element={<LoginPage />}
                />
                <Route
                    path="register"
                    element={<RegisterPage />}
                />
                <Route
                    path="verify"
                    element={<VerifyAccountPage />}
                />

                <Route
                    path="movie/:title"
                    element={<ProtectedRoute />}
                >
                    <Route
                        index
                        element={<MovieDetailPage />}
                    />
                </Route>

                <Route
                    path="profile"
                    element={<ProtectedRoute />}
                >
                    <Route
                        index
                        element={<ProfilePage />}
                    />
                    <Route
                        path="edit-profile"
                        element={<EditProfilePage />}
                    />
                </Route>

                <Route
                    path="account-password-reset"
                    element={<ResetPasswordPage />}
                />
                <Route
                    path="reset-password/:userId/:uniqueId"
                    element={<PasswordResetPage />}
                />
                <Route
                    path="admin"
                    element={<AdminPage />}
                />
            </Route>
            <Route
                path="*"
                element={<NotFoundPage />}
            />
        </Routes>
    );
};

export default Router;
