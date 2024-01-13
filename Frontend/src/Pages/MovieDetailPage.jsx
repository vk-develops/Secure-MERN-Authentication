import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import MovieDetailCard from "../Components/MovieDetailCard";

const MovieDetailPage = () => {
    const { title } = useParams();

    const location = useLocation();

    const [movie, setMovie] = useState([]);

    const movieByParams = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_MOVIE_APP_URI}&t=${title}`
            );

            const data = await response.json();
            console.log(data);
            setMovie(data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        movieByParams();
    }, [title]);

    return (
        <div>
            <div className="max-w-4xl mx-auto py-5 mt-5">
                <Link
                    to={`..${location.state.search}`}
                    className="bg-slate-700 border-2 border-slate-500 text-slate-300 font-medium text-base py-3 px-12"
                >
                    Back to home
                </Link>
            </div>
            {movie ? (
                <MovieDetailCard movieDetail={movie} />
            ) : (
                <h1>Movie detail not found!!!</h1>
            )}
        </div>
    );
};

export default MovieDetailPage;
