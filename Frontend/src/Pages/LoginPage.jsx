import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { useErrorToast, useSuccessToast } from "../Hooks/useToast";

const LoginPage = () => {
    const { setUserData } = useContext(UserContext);

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const userReq = {
                email,
                password,
            };

            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_USERS_AUTH_URI}/login`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userReq),
                }
            );

            const data = await response.json();

            if (response.status === 200) {
                setUserData();
                useSuccessToast(data.message);
                navigate("/");
            } else {
                useErrorToast(data.message);
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <section className="bg-slate-900">
            <div className="max-w-xl h-screen mx-auto">
                <form
                    onSubmit={loginHandler}
                    className="pt-10"
                >
                    <h1 className="font-bold text-4xl text-white">Login</h1>
                    <p className="font-regular text-base text-slate-400 py-5">
                        Welcome back to Movie Matic! Log in to access your
                        personalized movie experience. With your account, you
                        can explore our extensive movie library, discover new
                        favorites, and dive into detailed movie information
                    </p>
                    <div className="mt-5">
                        <label className="text-base text-slate-300">
                            Email:{" "}
                        </label>
                        <input
                            className="w-full outline-none text-slate-300 py-3 border-slate-300 my-2 border-2 bg-slate-900 px-4 rounded-md"
                            type="email"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mt-5">
                        <label className="text-base text-slate-300 pb-2">
                            Password:{" "}
                        </label>
                        <input
                            className="w-full outline-none text-slate-300 py-3 border-slate-300 my-2 border-2 bg-slate-900 px-4 rounded-md"
                            type="password"
                            placeholder="Enter your password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="py-2 px-12 text-lg font-medium rounded-sm mt-5 bg-yellow-400"
                            type="submit"
                        >
                            Submit
                        </button>

                        <Link
                            to="/account-password-reset"
                            className="text-white hover:text-yellow-300"
                        >
                            Forgot password?
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default LoginPage;
