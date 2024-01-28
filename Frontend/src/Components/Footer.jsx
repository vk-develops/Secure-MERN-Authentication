import React from "react";

const Footer = () => {
    return (
        <footer className="bg-slate-900 w-full py-5 mx-auto border-t-2 border-slate-800">
            <p className="text-base font-regular text-white text-center">
                Copyright &copy; 2024 @MovieMatic developed by{" "}
                <a
                    className=" hover:text-yellow-400 font-bold"
                    href="https://www.instagram.com/itz__vimal__93/"
                >
                    Vimal Kumar. V
                </a>
            </p>
        </footer>
    );
};

export default Footer;
