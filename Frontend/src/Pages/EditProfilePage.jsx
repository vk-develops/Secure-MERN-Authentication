import React from "react";

const EditProfilePage = () => {
    return (
        <section className="max-w-xl h-auto mx-auto mb-10">
            <div className="pt-10">
                <h1 className="font-bold text-4xl text-white">Edit Profile</h1>
                <p className="font-regular text-base text-slate-400 py-5">
                    Welcome back to Movie Matic! Log in to access your
                    personalized movie experience. With your account, you can
                    explore our extensive movie library, discover new favorites,
                    and dive into detailed movie information
                </p>
            </div>
            <form>
                <div className="mt-5">
                    <label className="text-base text-slate-300">Name:</label>
                    <input
                        className="w-full outline-none text-slate-300 py-3 border-slate-300 my-2 border-2 bg-slate-900 px-4 rounded-md"
                        type="text"
                        placeholder="Edit your name"
                        required
                    />
                </div>
                <div className="mt-5">
                    <label className="text-base text-slate-300">Ph no:</label>
                    <input
                        className="w-full outline-none text-slate-300 py-3 border-slate-300 my-2 border-2 bg-slate-900 px-4 rounded-md"
                        type="text"
                        placeholder="Enter your mobile number"
                        required
                    />
                </div>
                <div className="mt-5">
                    <label className="text-base text-slate-300">Address:</label>
                    <input
                        className="w-full outline-none text-slate-300 py-3 border-slate-300 my-2 border-2 bg-slate-900 px-4 rounded-md"
                        type="text"
                        placeholder="Enter your address"
                        required
                    />
                </div>
                <div className="flex items-center justify-end">
                    <button className="py-2 px-12 text-lg font-medium rounded-sm mt-5 bg-yellow-400">
                        Update profile
                    </button>
                </div>
            </form>
        </section>
    );
};

export default EditProfilePage;
