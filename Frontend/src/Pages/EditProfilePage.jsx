import React, { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";

const EditProfilePage = () => {
    const { user } = useContext(UserContext);

    const [name, setName] = useState("");
    const [phno, setPhno] = useState("");
    const [address, setAddress] = useState("");
    const [profileImg, setProfileImg] = useState({ myFile: "" });

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const userReq = {
                name,
                phno,
                address,
                profileImg,
            };

            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_USERS_AUTH_URI}`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userReq),
                }
            );
        } catch (err) {
            console.log(err.message);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await converToBase64(file);
        setProfileImg({ ...profileImg, myFile: base64 });
    };

    const converToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(fileReader.error);
            };
        });
    };

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
                        placeholder={`${user.name}`}
                        required
                    />
                </div>
                <div className="mt-5">
                    <label className="text-base text-slate-300">Ph no:</label>
                    <input
                        className="w-full outline-none text-slate-300 py-3 border-slate-300 my-2 border-2 bg-slate-900 px-4 rounded-md"
                        type="text"
                        placeholder="Enter your mobile number"
                        value={phno}
                        onChange={(e) => setPhno(e.target.value)}
                    />
                </div>
                <div className="mt-5">
                    <label className="text-base text-slate-300">Address:</label>
                    <input
                        className="w-full outline-none text-slate-300 py-3 border-slate-300 my-2 border-2 bg-slate-900 px-4 rounded-md"
                        type="text"
                        placeholder="Enter your address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="mt-5">
                    <label className="text-base text-slate-300">
                        Profile image:
                    </label>
                    <input
                        type="file"
                        accept=".jpeg, .png, .jpg"
                        onChange={handleFileUpload}
                        className="pl-2"
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
