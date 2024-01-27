import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { useErrorToast, useSuccessToast } from "./useToast";

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

            const data = await response.json();

            if (response.status === 200) {
                setUser(null);
                useSuccessToast(data.message);
                setLoggedIn(false);
            } else {
                useErrorToast(data.message);
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    return { logout };
};

export default useLogout;
