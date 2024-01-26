import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router/Router";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { UserContextProvider } from "./Context/UserContext";

const App = () => {
    return (
        <BrowserRouter>
            <UserContextProvider>
                <Router />
            </UserContextProvider>
        </BrowserRouter>
    );
};

export default App;
