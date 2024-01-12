import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import NotLoggedInComponent from "../Components/NotLoggedInComponent";
import useLogout from "../Hooks/useLogout";

const HomePage = () => {
    const { user } = useContext(UserContext);

    const { logout } = useLogout();

    const submitHandler = async () => {
        await logout();
    };

    return (
        <section>
            <NotLoggedInComponent />

            {!!user && (
                <>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                    <p>{user.isVerified}</p>
                    <p>{user.isBanned}</p>
                    <button
                        onClick={submitHandler}
                        className="text-white"
                    >
                        Logout
                    </button>
                </>
            )}
        </section>
    );
};

export default HomePage;
