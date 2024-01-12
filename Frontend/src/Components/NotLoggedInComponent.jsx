import React from "react";
import { Link } from "react-router-dom";

const NotLoggedInComponent = () => {
    return (
        <div className="max-w-4xl h-auto mx-auto p-10 my-10 border-2 rounded-3xl border-slate-800 flex items-center justify-center">
            <div className="w-4/5">
                <h1 className="text-white font-bold text-4xl text-center">
                    Movie Matic
                </h1>
                <p className="text-slate-300 font-regular text-base text-center pt-5">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Sapiente dignissimos quas, distinctio tenetur numquam eos,
                    consequuntur eveniet animi laudantium adipisci dolores
                    voluptatibus nobis dicta recusandae odio inventore atque
                    consequatur magni. Lorem ipsum dolor sit, amet consectetur
                    adipisicing elit. Sequi fugiat dolores est rerum. Dolorum
                    impedit ex id vel explicabo perferendis odit exercitationem,
                    inventore iste vitae obcaecati ipsam eum laboriosam
                    reiciendis. Lorem ipsum, dolor sit amet consectetur
                    adipisicing elit. Quos neque quod temporibus vitae dolores
                    veniam distinctio ratione dolor quaerat alias libero porro
                    omnis cum, hic adipisci necessitatibus eaque vel delectus.
                </p>
                <div className="flex items-center justify-center mt-10">
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
