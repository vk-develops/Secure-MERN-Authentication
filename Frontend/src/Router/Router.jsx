import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import HomePage from "../Pages/HomePage";
import RegisterPage from "../Pages/RegisterPage";
import Layout from "../Components/Layout";

const Router = () => {
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
            </Route>
        </Routes>
    );
};

export default Router;
