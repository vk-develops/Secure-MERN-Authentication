import React from "react";
import { Link } from "react-router-dom";

const NotLoggedInComponent = () => {
    return (
        <div className="max-w-4xl h-auto mx-auto p-10 my-10 border-2 rounded-3xl border-slate-800 flex items-center justify-center">
            <div className="w-4/5">
                <h1 className="text-white font-bold text-4xl text-center">
                    Movie Matic
                </h1>
                <p className="text-slate-300 font-regular text-base text-center pt-4">
                    Movie Matic is an immersive and secure MERN authentication
                    app designed to revolutionize your movie experience. With
                    Movie Matic, logged-in users are welcomed into an engaging
                    platform where they can explore a vast library of movies
                    with ease. Whether you're searching for timeless classics or
                    the latest blockbusters, Movie Matic provides a seamless
                    interface for discovering and accessing comprehensive movie
                    details. From intricate plot summaries to insightful
                    ratings, dynamic actor and director information, noteworthy
                    awards, and intriguing trivia, Movie Matic offers a
                    comprehensive overview of each film. With a focus on user
                    experience and security, Movie Matic ensures that users can
                    navigate the platform effortlessly while enjoying the
                    richness of cinematic exploration. Welcome to Movie Matic,
                    where every movie moment is a captivating journey waiting to
                    unfold.
                </p>
                <div className="flex items-center justify-center mt-8">
                    <Link
                        to="register"
                        className="py-2 px-10 bg-yellow-400 text-base font-medium rounded-sm"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotLoggedInComponent;
