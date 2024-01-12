import React from "react";

const MovieDetailCard = () => {
    return (
        <div className="h-screen max-w-4xl mx-auto py-5">
            <div className="w-full bg-slate-800 p-6 rounded-2xl flex items-start justify-start">
                <div className=" w-2/4">
                    <img
                        className="rounded-lg h-96"
                        src="https://m.media-amazon.com/images/M/MV5BOGE4NzU1YTAtNzA3Mi00ZTA2LTg2YmYtMDJmMThiMjlkYjg2XkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg"
                        alt="Movie Poster"
                    />
                </div>
                <div className="w-full">
                    <div className="flex items-center justify-between">
                        <div className="flex items-baseline justify-start gap-2">
                            <h1 className="text-white font-bold text-4xl">
                                Thor love and thunder
                            </h1>
                            <h6 className="text-yellow-400 font-medium text-sm">
                                (7.0/10)
                            </h6>
                        </div>
                        <h6 className="py-1 px-2 bg-slate-500 text-white font-medium text-xs rounded-md">
                            Movie
                        </h6>
                    </div>

                    <p className="text-slate-400 text-base font-normal pt-5 pb-1">
                        The powerful but arrogant god Thor is cast out of Asgard
                        to live amongst humans in Midgard (Earth), where he soon
                        becomes one of their finest defenders.
                    </p>

                    <div className="flex items-center justify-between py-4">
                        <h5 className="text-slate-300 font-normal text-lg">
                            Genre: Action, Fantasy
                        </h5>
                        <h5 className="text-slate-300 font-normal text-lg">
                            Year: 2024
                        </h5>
                        <h5 className="text-slate-300 font-normal text-lg">
                            Rated: PG-13
                        </h5>
                    </div>

                    <div className="flex items-center justify-between pb-4">
                        <h5 className="text-slate-300 font-normal text-lg">
                            Director: Kenneth Branagh
                        </h5>
                        <h5 className="text-slate-300 font-normal text-lg">
                            Writers: Ashley Miller, Zack Stentz, Don Payne
                        </h5>
                    </div>

                    <div className="flex items-center justify-between py-4">
                        <h5 className="text-slate-300 font-normal text-lg">
                            Released: 06 May 2011
                        </h5>
                        <h5 className="text-slate-300 font-normal text-lg">
                            Runtime: 115 min
                        </h5>
                        <h5 className="text-slate-300 font-normal text-lg">
                            Box-Office: $181,030,624
                        </h5>
                    </div>

                    <div>
                        <h5 className="text-slate-300 font-normal text-lg pt-1">
                            Actors: Chris Hemsworth, Anthony Hopkins, Natalie
                            Portman
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailCard;
