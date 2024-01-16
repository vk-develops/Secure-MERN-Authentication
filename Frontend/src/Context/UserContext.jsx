import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    //Set user data
    const setUserData = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_USERS_URI}/profile`,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();

            if (response.ok) {
                console.log(data.data);
                setUser(data.data);
            } else {
                console.log(data.message);
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        setUserData();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};
