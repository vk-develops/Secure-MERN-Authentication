import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import NotLoggedInComponent from "../Components/NotLoggedInComponent";
import LoggedInComponent from "../Components/LoggedInComponent";

const HomePage = () => {
    const { loggedIn } = useContext(UserContext);

    return (
        <section>
            {loggedIn ? <LoggedInComponent /> : <NotLoggedInComponent />}
        </section>
    );
};

export default HomePage;
