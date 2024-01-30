import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const ModalComponent = () => {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <section
            style={{
                backgroundColor: "rgb(148, 163, 184, .8)",
                backdropFilter: blur("200px"),
            }}
            className="w-full h-screen fixed top-0 left-0 z-0 overflow-y-hidden"
        >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-36 bg-white p-12">
                <div className="relative">
                    <button className="absolute -top-5 right-0">
                        <IoClose size={24} />
                    </button>
                </div>
                <h1 className="font-bold text-2xl text-slate-800">
                    Confirm Deletion
                </h1>
                <p className="font-medium text-base text-slate-600 pt-3">
                    Are you sure, do you want to delete the user @Username and
                    ID: @123456789123456789. Once you deleted you cannot revert
                    your action, make sure before deleting a user
                </p>
                <div className="flex items-center justify-end mt-10 gap-4">
                    <button className="px-8 py-2 bg-slate-500 rounded-md text-base font-medium text-white">
                        Close
                    </button>
                    <button className="px-8 py-2 bg-teal-500 rounded-md text-base font-medium text-white">
                        Yes, Delete
                    </button>
                </div>
            </div>
        </section>
    );
};

const AdminPage = () => {
    const [users, setUsers] = useState([]);

    const fetchAllUserDetails = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_ADMIN_API_URI}/get-users`,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();

            if (response.ok) {
                console.log(data);
                setUsers(data.data);
            } else {
                console.log(data);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchAllUserDetails();
    }, []);

    return (
        <>
            <ModalComponent />
            <section className="max-w-3xl h-screen mx-auto">
                <div className="mt-10">
                    <h1 className="font-bold text-4xl text-white">
                        Admin Pannel
                    </h1>
                    <p className="font-regular text-base text-slate-400 py-5">
                        Welcome, Admin! Dive into the heart of Movie Matic with
                        our comprehensive admin dashboard. Here, you have full
                        visibility into user details, enabling you to manage and
                        monitor user accounts effortlessly.
                    </p>
                </div>
                <div>
                    <h2 className="font-bold text-xl text-white mb-3">Users</h2>
                    <table className="w-full border-collapse border border-slate-300">
                        <thead>
                            <tr className="bg-slate-300">
                                <th className="border border-gray-600 py-2 px-4">
                                    ID
                                </th>
                                <th className="border border-gray-600 py-2 px-4">
                                    Name
                                </th>
                                <th className="border border-gray-600 py-2 px-4">
                                    Email
                                </th>
                                <th className="border border-gray-600 py-2 px-4">
                                    Options
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user._id}
                                    className="hover:bg-slate-500 bg-slate-400"
                                >
                                    <td className="border border-gray-600 py-2 px-4">
                                        {user._id}
                                    </td>
                                    <td className="border border-gray-600 py-2 px-4">
                                        {user.name}
                                    </td>
                                    <td className="border border-gray-600 py-2 px-4">
                                        {user.email}
                                    </td>
                                    <td className="border border-gray-600 py-2 px-4">
                                        <button>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};

export default AdminPage;
