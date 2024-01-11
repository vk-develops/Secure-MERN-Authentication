import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router/Router";
import "./App.css";
import { AuthProvider } from "./Context/AuthContext";

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Router />
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
