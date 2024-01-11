import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";

const HomePage = () => {
    const { user, setUser } = useContext(UserContext);

    const submitHandler = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_USERS_AUTH_URI}/logout`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            // const data = await response.json();

            if (response.status === 200) {
                console.log("User logout success");
                setUser(null);
                console.log(response.message);
            } else {
                console.log(response.message);
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <section>
            <div>HomePage</div>

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
