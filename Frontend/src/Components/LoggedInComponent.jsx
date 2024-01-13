import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import MovieCard from "./MovieCard";
import { SearchMovies } from "../Data/data";
import { Link, useSearchParams } from "react-router-dom";

const NonSearchComponent = () => {
    return SearchMovies.map((movie) => (
        <Link
            key={movie.imdbID}
            to={`movie/${movie.Title}`}
        >
            <MovieCard movieItem={movie} />
        </Link>
    ));
};

const LoggedInComponent = () => {
    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();
    const searchedMovie = searchParams.get("search");

    //Setting the search param
    function handleParamsChange(key, value) {
        setSearchParams((prevParams) => {
            if (value === null) {
                prevParams.delete(key);
            } else {
                prevParams.set(key, value);
            }
            return prevParams;
        });
    }

    const movieSearch = async (e) => {
        e.preventDefault();

        //Setting the search params
        handleParamsChange("search", search);
    };

    const getSearchedMovies = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_MOVIE_APP_URI}&s=${searchedMovie}`
            );

            const data = await response.json();
            console.log(data.Search);

            setMovies(data.Search);
        } catch (error) {
            console.log(error.message);
        }
    };

    //Using useEffect to handle the response on change on the search params
    useEffect(() => {
        if (searchedMovie) {
            getSearchedMovies();
        }
    }, [searchParams]);

    const SearchComponent = () => {
        return (
            <>
                {movies ? (
                    movies.map((movie) => (
                        <Link
                            key={movie.imdbID}
                            to={`movie/${movie.Title}`}
                            state={{
                                search: `?${searchParams.toString()}`,
                            }}
                        >
                            <MovieCard movieItem={movie} />
                        </Link>
                    ))
                ) : (
                    <>
                        <h1 className="text-white font-bold text-3xl">
                            No Movies Found
                        </h1>

                        <p className="text-slate-400 font-medium text-base">
                            This may occur if yoy have'nt clicked the search
                            button or you might have entered a invalid name
                        </p>
                    </>
                )}
            </>
        );
    };

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
                <form
                    onSubmit={movieSearch}
                    className="flex items-center justify-between w-full pr-5"
                >
                    <input
                        className="w-full text-lg outline-none bg-slate-800 text-white font-medium"
                        type="text"
                        placeholder="Search for movies (eg: Thor)"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <button
                        className="text-white py-2 px-10 bg-slate-500 font-medium rounded-full"
                        type="submit"
                    >
                        Search
                    </button>
                </form>
            </div>
            {search ? (
                <h1 className="text-white text-3xl font-bold pt-5">
                    Search results for {search}...
                </h1>
            ) : null}

            <div className="grid grid-cols-3 place-items-center my-10 gap-8">
                {searchedMovie ? (
                    <>
                        <SearchComponent />
                    </>
                ) : (
                    <NonSearchComponent />
                )}
            </div>
        </div>
    );
};

export default LoggedInComponent;
