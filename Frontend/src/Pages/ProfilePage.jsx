import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { Link } from "react-router-dom";
import useLogout from "../Hooks/useLogout";

const ProfilePage = () => {
    const { user } = useContext(UserContext);

    const { logout } = useLogout();

    const handleLogout = async () => {
        await logout();
    };

    return (
        user && (
            <section className="max-w-4xl mx-auto py-8 h-screen bg-slate-800 my-12 rounded-3xl">
                <div className="flex items-start justify-between px-8 gap-8">
                    <div className="w-2/4">
                        <div className="flex items-baseline justify-start gap-2 mb-6">
                            <h1 className="text-white text-5xl font-bold capitalize">
                                {user.name}
                            </h1>
                            <h6 className="text-slate-400 text-lg font-medium">
                                ({user.role})
                            </h6>
                        </div>
                        <div>
                            <h5 className="text-slate-300 text-lg font-medium mb-5">
                                Email: {user.email}
                            </h5>
                            <h5 className="text-slate-300 text-lg font-medium mb-5">
                                {user && user.about
                                    ? `About: ${user.about}`
                                    : null}
                            </h5>
                            <h5 className="text-slate-300 text-lg font-medium mb-5">
                                Verified: Yes,
                            </h5>
                            <h5 className="text-slate-300 text-lg font-medium mb-5">
                                Ph no:{" "}
                                {user && user.phno
                                    ? `${user.phno}`
                                    : "9876543210"}
                            </h5>
                            <h5 className="text-slate-300 text-lg font-medium mb-5">
                                Address:{" "}
                                {user && user.address
                                    ? user.address
                                    : `Address: street number (123), street name (Main
                                Street), city (Anytown), state (USA), and zip
                                code (12345).`}
                            </h5>
                        </div>

                        <div className="flex items-center justify-start gap-5 my-10 flex-wrap">
                            <Link
                                to={`edit-profile`}
                                className="text-lg font-medium px-10 py-2 bg-slate-500 text-white rounded-full"
                            >
                                Edit Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-lg font-medium px-10 py-2 bg-slate-500 text-white rounded-full"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                    <div className="w-2/4">
                        <img
                            className="h-96 w-96 rounded-full object-cover"
                            src={
                                user.image
                                    ? user.image
                                    : "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?cs=srgb&dl=pexels-suliman-sallehi-1704488.jpg&fm=jpg"
                            }
                            alt="Profile image"
                        />
                    </div>
                </div>
            </section>
        )
    );
};

export default ProfilePage;
