import React from "react";
import { NavLink } from "react-router-dom";

const MovieCard = ({ movieItem }) => {
    return (
        <NavLink className="w-full p-3 bg-slate-700 rounded-lg">
            <div>
                <img
                    className="w-full h-72 rounded-md object-cover"
                    src={movieItem.Poster}
                    alt="Movie Poster"
                />
                <div className="pt-3">
                    <div className="flex items-center justify-between">
                        <h1 className="text-white font-bold text-2xl">
                            {movieItem.Title.length > 12
                                ? `${movieItem.Title.slice(0, 12)}...`
                                : movieItem.Title}
                        </h1>
                        <h6 className="text-xs font-semibold uppercase text-white py-[2px] px-2 bg-slate-500 rounded-md">
                            {movieItem.Type}
                        </h6>
                    </div>
                    <h5 className="text-slate-400 pt-3 font-medium">
                        {movieItem.Year}
                    </h5>
                    <h5 className="text-slate-400 pt-1 font-normal">
                        IMDB id: {movieItem.imdbID}
                    </h5>
                </div>
            </div>
        </NavLink>
    );
};

export default MovieCard;
