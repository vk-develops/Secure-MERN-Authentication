import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-slate-900 border-b-2 border-slate-800">
            <nav className="max-w-4xl mx-auto py-4 mb-2 flex items-center justify-between">
                <Link to="/">
                    <h1 className="text-4xl font-bold text-white">
                        Movie Matic
                    </h1>
                </Link>
                <div className="flex items-center justify-center gap-5">
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
                </div>
            </nav>
        </header>
    );
};

export default Header;
