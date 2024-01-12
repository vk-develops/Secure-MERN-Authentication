import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import MovieCard from "./MovieCard";
import { SearchMovies } from "../Data/data";

const LoggedInComponent = () => {
    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);

    // const movieSearch = async () => {
    //     const response = await fetch(
    //         `${import.meta.envVITE_MOVIE_APP_URI}&s=${search}`
    //     );
    //     const data = await response.json();
    //     console.log(data);
    // };

    // useEffect(() => {
    //     movieSearch();
    // }, []);

    return (
        <div className="h-auto max-w-4xl mx-auto py-10">
            <div>
                <h3 className="text-white font-bold text-2xl">Movie Search</h3>
                <p className="text-slate-400 font-regular text-base py-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quibusdam adipisci, molestias deleniti quam ad rerum tempora
                    cum saepe laudantium fuga alias doloribus nisi beatae iste
                    eaque ipsum. Corrupti, unde deserunt!
                </p>
            </div>
            <div className="mt-7 w-full rounded-full bg-slate-800 p-3 pl-7 flex items-center justify-start gap-3">
                <IoSearchOutline
                    color="#fff"
                    size={23}
                />
                <input
                    className="w-full text-lg outline-none bg-slate-800 text-white font-medium"
                    type="text"
                    placeholder="Search for movies"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-3 place-items-center my-10 gap-8">
                {search
                    ? null
                    : SearchMovies.map((movie) => (
                          <MovieCard
                              key={movie.imdbID}
                              movieItem={movie}
                          />
                      ))}
            </div>
        </div>
    );
};

export default LoggedInComponent;
