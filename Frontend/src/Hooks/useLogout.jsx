import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

const useLogout = () => {
    const { setUser, setLoggedIn } = useContext(UserContext);

    const logout = async () => {
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

            if (response.status === 200) {
                console.log("User logout success");
                setUser(null);
                setLoggedIn(false);
                console.log(response.message);
            } else {
                console.log(response.message);
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    return { logout };
};

export default useLogout;
