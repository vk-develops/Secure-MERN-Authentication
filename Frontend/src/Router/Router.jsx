import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import HomePage from "../Pages/HomePage";
import RegisterPage from "../Pages/RegisterPage";
import Layout from "../Components/Layout";
import NotFoundPage from "../Pages/NotFoundPage";
import MovieDetailPage from "../Pages/MovieDetailPage";

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
                <Route
                    path="movie/:title"
                    element={<MovieDetailPage />}
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
