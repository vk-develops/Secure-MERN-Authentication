import React, { useState } from "react";
import { useErrorToast, useSuccessToast } from "../Hooks/useToast";

const ResetPasswordPage = () => {
    const [email, setEmail] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${
                    import.meta.env.VITE_BACKEND_USER_ACCOUNT_URI
                }/reset-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                useSuccessToast(data.message);
            } else {
                useErrorToast(data.message);
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <section className="max-w-xl h-screen mx-auto">
            <div className="mt-10">
                <h1 className="font-bold text-4xl text-white">
                    Reset Password
                </h1>
                <p className="font-regular text-base text-slate-400 py-5">
                    Forgot your password? No problem! With Movie Matic's
                    password reset feature, you can quickly regain access to
                    your account. Simply enter your email address, and we'll
                    send you a secure password reset link straight to your
                    inbox. Follow the link to set a new password and regain
                    control of your movie-watching experience.
                </p>
            </div>

            <form onSubmit={submitHandler}>
                <div className="mt-5">
                    <label className="text-base text-slate-300">Email: </label>
                    <input
                        className="w-full outline-none text-slate-300 py-3 border-slate-300 my-2 border-2 bg-slate-900 px-4 rounded-md"
                        type="email"
                        placeholder="Enter your email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button
                    className="py-2 px-12 text-lg font-medium rounded-sm mt-5 bg-yellow-400"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </section>
    );
};

export default ResetPasswordPage;
