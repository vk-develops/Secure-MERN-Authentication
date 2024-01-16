import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import NotLoggedInComponent from "../Components/NotLoggedInComponent";
import useLogout from "../Hooks/useLogout";
import LoggedInComponent from "../Components/LoggedInComponent";

const HomePage = () => {
    const { user } = useContext(UserContext);

    const { logout } = useLogout();

    const submitHandler = async () => {
        await logout();
    };

    return (
        <section>
            {user ? <LoggedInComponent /> : <NotLoggedInComponent />}
        </section>
    );
};

export default HomePage;
