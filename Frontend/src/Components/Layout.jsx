import React from "react";
import { ToastContainer } from "react-toastify";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Header />
            <ToastContainer />
            <Outlet />
            <Footer />
        </>
    );
};

export default Layout;
