import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useErrorToast, useSuccessToast } from "../Hooks/useToast";

const PasswordResetPage = () => {
    const { userId, uniqueId } = useParams();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isPasswordChanged, setIsPasswordChanged] = useState(false);

    const functionalityHandler = async () => {
        try {
            console.log("User", userId);
            console.log("ID", uniqueId);

            const response = await fetch(
                `${
                    import.meta.env.VITE_BACKEND_USER_ACCOUNT_URI
                }/verify-link?userId=${userId}&uniqueId=${uniqueId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ password }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                useSuccessToast(data.message);
                setIsPasswordChanged(true);
            } else {
                useErrorToast(data.message);
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            functionalityHandler();
        } else {
            useErrorToast("Passwords does'nt match.");
        }
    };

    return (
        <>
            {isPasswordChanged ? (
                <section className="max-w-xl h-screen mx-auto">
                    <div className="mt-10">
                        <h1 className="font-bold text-4xl text-white">
                            Reset Password
                        </h1>
                        <p className="font-regular text-base text-slate-400 py-5">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quam qui repellendus asperiores at tenetur,
                            voluptas aliquid saepe voluptates
                        </p>
                    </div>

                    <form onSubmit={submitHandler}>
                        <div className="mt-5">
                            <label className="text-base text-slate-300">
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
                            <div className="mt-5">
                                <label className="text-base text-slate-300">
                                    Confirm Password:{" "}
                                </label>
                                <input
                                    className="w-full outline-none text-slate-300 py-3 border-slate-300 my-2 border-2 bg-slate-900 px-4 rounded-md"
                                    type="password"
                                    placeholder="Confirm your password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <button
                            className="py-2 px-12 text-lg font-medium rounded-sm mt-5 bg-yellow-400"
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                </section>
            ) : (
                <section className="max-w-xl h-screen mx-auto">
                    <div className="mt-10">
                        <h1 className="font-bold text-2xl text-white">
                            Password reset was successfull
                        </h1>
                        <p className="font-regular text-base text-slate-400 py-5 mb-5">
                            You can now go to home page and login into our app
                            using the changed password to continue your journey
                            to a new realm
                        </p>
                        <Link
                            to="login"
                            className="py-2 px-12 text-lg font-medium rounded-sm bg-yellow-400"
                        >
                            Go to login page
                        </Link>
                    </div>
                </section>
            )}
        </>
    );
};

export default PasswordResetPage;
