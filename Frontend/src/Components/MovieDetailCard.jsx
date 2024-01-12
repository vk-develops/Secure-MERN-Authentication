import React from "react";

const MovieDetailCard = ({ movieDetail }) => {
    const imdbValue =
        movieDetail.Ratings && movieDetail.Ratings.length > 0
            ? movieDetail.Ratings[0].Value
            : "N/A";

    return (
        <div className="h-screen max-w-4xl mx-auto py-5">
            <div className="w-full bg-slate-800 p-6 rounded-2xl flex items-start gap-5 justify-start">
                <div className=" w-2/4">
                    <img
                        className="rounded-lg h-96 w-full object-cover"
                        src={movieDetail.Poster}
                        alt="Movie Poster"
                    />
                </div>
                <div className="w-full">
                    <div className="flex items-center justify-between">
                        <div className="flex items-baseline justify-start gap-2">
                            <h1 className="text-white font-bold text-4xl">
                                {movieDetail.Title}
                            </h1>
                            <h6 className="text-yellow-400 font-medium text-sm">
                                ({imdbValue})
                            </h6>
                        </div>
                        <h6 className="py-1 px-2 capitalize bg-slate-500 text-white font-medium text-xs rounded-md">
                            {movieDetail.Type}
                        </h6>
                    </div>

                    <p className="text-slate-400 text-base font-normal pt-5 pb-1">
                        {movieDetail.Plot}
                    </p>

                    <div className="flex items-center justify-between py-4">
                        <h5 className="text-slate-300 font-normal text-lg">
                            Genre: {movieDetail.Genre}
                        </h5>
                        <h5 className="text-slate-300 font-normal text-lg">
                            Year: {movieDetail.Year}
                        </h5>
                        <h5 className="text-slate-300 font-normal text-lg">
                            Rated: {movieDetail.Rated}
                        </h5>
                    </div>

                    <div className="flex items-center justify-between pb-4">
                        <h5 className="text-slate-300 font-normal text-lg">
                            Director: {movieDetail.Director}
                        </h5>
                        <h5 className="text-slate-300 font-normal text-lg">
                            Writers: {movieDetail.Writer}
                        </h5>
                    </div>

                    <div className="flex items-center justify-between py-4">
                        <h5 className="text-slate-300 font-normal text-lg">
                            Released: {movieDetail.Released}
                        </h5>
                        <h5 className="text-slate-300 font-normal text-lg">
                            Runtime: {movieDetail.Runtime}
                        </h5>
                        <h5 className="text-slate-300 font-normal text-lg">
                            Box-Office: {movieDetail.BoxOffice}
                        </h5>
                    </div>

                    <div>
                        <h5 className="text-slate-300 font-normal text-lg pt-1">
                            Actors: {movieDetail.Actors}
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailCard;
