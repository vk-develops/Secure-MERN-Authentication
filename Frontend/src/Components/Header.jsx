import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import useLogout from "../Hooks/useLogout";

const Header = () => {
    const { user } = useContext(UserContext);

    const { logout } = useLogout();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <header className="bg-slate-900 border-b-2 border-slate-800">
            <nav className="max-w-4xl mx-auto py-4 mb-2 flex items-center justify-between">
                <Link to="/">
                    <h1 className="text-4xl font-bold text-yellow-400">
                        Movie Matic
                    </h1>
                </Link>
                <div className="flex items-center justify-center gap-5">
                    {user ? (
                        <>
                            {user.role === "Admin" && (
                                <NavLink
                                    to="admin"
                                    className={({ isActive }) =>
                                        isActive
                                            ? `text-yellow-400 font-medium text-lg`
                                            : `text-white font-medium text-lg`
                                    }
                                >
                                    Admin
                                </NavLink>
                            )}

                            <NavLink
                                to="profile"
                                className={({ isActive }) =>
                                    isActive
                                        ? `text-yellow-400 font-medium text-lg`
                                        : `text-white font-medium text-lg`
                                }
                            >
                                Profile
                            </NavLink>
                            <button
                                onClick={handleLogout}
                                className="text-lg text-white font-medium hover:text-yellow-400"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="login"
                                className={({ isActive }) =>
                                    isActive
                                        ? `text-yellow-400 font-medium text-lg`
                                        : `text-white font-medium text-lg`
                                }
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="register"
                                className={({ isActive }) =>
                                    isActive
                                        ? `text-yellow-400 font-medium text-lg`
                                        : `text-white font-medium text-lg`
                                }
                            >
                                Register
                            </NavLink>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
