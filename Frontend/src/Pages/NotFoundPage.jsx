import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <section className="h-screen w-full flex items-center justify-center">
            <div className="mb-10">
                <h1 className="text-white font-bold text-4xl text-center p-2">
                    The page you are looking for is
                </h1>
                <h1 className="text-white font-bold text-4xl text-center p-2">
                    Not found
                </h1>
                <div className="flex items-center justify-center">
                    <Link
                        to="/"
                        className="text-yellow-400 font-medium text-lg mt-6"
                    >
                        Go to Home
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default NotFoundPage;
