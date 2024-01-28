import React, { useEffect, useState } from "react";

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
        <section className="max-w-xl h-screen mx-auto">
            <div className="mt-10">
                <h1 className="font-bold text-4xl text-white">Admin Pannel</h1>
                <p className="font-regular text-base text-slate-400 py-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Adipisci quo delectus labore accusamus tempora, aut dolore
                    ab minus, doloribus, maiores sunt sequi inventore deserunt
                    natus molestias ea nam commodi corrupti.
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
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <>
                                <tr
                                    key={user.id}
                                    className="hover:bg-gray-600 bg-slate-400"
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
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default AdminPage;
