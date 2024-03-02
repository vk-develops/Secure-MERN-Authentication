import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useErrorToast, useSuccessToast } from "../Hooks/useToast";

const RegisterPage = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const passwordValidater = (e) => {
        e.preventDefault();
        if (password.length > 8) {
            loginHandler();
        } else {
            useErrorToast("Password length must be greater than 8");
        }
    };

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const userReq = { name, email, password };

            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_USERS_AUTH_URI}/register`,
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
                useSuccessToast(data.message);
                navigate("/verify");
            } else {
                useErrorToast(data.message);
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <section className="bg-slate-900">
            <div className="max-w-xl h-auto mb-10 mx-auto">
                <form
                    onSubmit={passwordValidater}
                    className="pt-10"
                >
                    <h1 className="font-bold text-4xl text-white">Register</h1>
                    <p className="font-regular text-base text-slate-400 py-5">
                        Welcome to Movie Matic! Register now to unlock a world
                        of cinematic exploration. By creating an account, you
                        gain access to our extensive movie database, where you
                        can discover and explore your favorite films.
                    </p>
                    <div className="mt-5">
                        <label className="text-base text-slate-300">
                            Name:{" "}
                        </label>
                        <input
                            className="w-full outline-none text-slate-300 py-3 border-slate-300 my-2 border-2 bg-slate-900 px-4 rounded-md"
                            type="text"
                            placeholder="Enter your name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
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
                    <button
                        className="py-2 px-12 text-lg font-medium rounded-sm mt-5 bg-yellow-400"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </section>
    );
};

export default RegisterPage;
