import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetailPage = () => {
    const { title } = useParams();

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

    return <div>MovieDetailPage</div>;
};

export default MovieDetailPage;
