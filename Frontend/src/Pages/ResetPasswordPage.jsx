import React, { useState } from "react";

const ResetPasswordPage = () => {
    const [email, setEmail] = useState("");

    return (
        <section className="max-w-xl h-screen mx-auto">
            <div className="mt-10">
                <h1 className="font-bold text-4xl text-white">
                    Reset Password
                </h1>
                <p className="font-regular text-base text-slate-400 py-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quam qui repellendus asperiores at tenetur, voluptas aliquid
                    saepe voluptates
                </p>
            </div>

            <form>
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
