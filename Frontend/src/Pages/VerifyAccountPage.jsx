import React, { useContext, useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { useErrorToast, useSuccessToast } from "../Hooks/useToast";

const VerifyAccountPage = () => {
    const [otp, setOtp] = useState("");

    const { setUserData } = useContext(UserContext);

    const navigate = useNavigate();

    const handleOTP = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_USER_ACCOUNT_URI}/verify`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ otp }),
                }
            );

            const data = await response.json();

            //Handling response
            if (response.ok) {
                await setUserData();
                useSuccessToast(data.message);
                navigate("/");
            } else {
                useErrorToast(data.message);
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    const handleResendOTP = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_USER_ACCOUNT_URI}/resend-otp`,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();

            if (response.ok) {
                useSuccessToast(data.message);
            } else {
                useErrorToast(data.message);
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <section className="max-w-xl h-auto mt-16 mb-20 mx-auto">
            <div className="mt-10">
                <h1 className="font-bold text-4xl text-white">
                    Verify Account
                </h1>
                <p className="font-regular text-base text-slate-400 py-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quam qui repellendus asperiores at tenetur, voluptas aliquid
                    saepe voluptates
                </p>
            </div>
            <div className="my-8">
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span className="text-white px-4">-</span>}
                    skipDefaultStyles={true}
                    shouldAutoFocus={true}
                    renderInput={(props) => <input {...props} />}
                    inputStyle={{
                        height: 80,
                        width: 50,
                        fontWeight: 600,
                        fontSize: 28,
                        borderWidth: 2,
                        backgroundColor: "rgb(15 23 42)",
                        borderColor: "rgb(100 116 139)",
                        textAlign: "center",
                        color: "white",
                    }}
                />
            </div>
            <div className="flex items-center justify-start gap-8 mt-12">
                <button
                    onClick={handleOTP}
                    className="px-12 py-2 rounded-md text-black font-medium text-lg bg-yellow-400"
                >
                    Submit
                </button>
                <button
                    onClick={handleResendOTP}
                    className="px-8 py-2 rounded-md text-white font-medium text-lg bg-slate-600"
                >
                    Resend OTP
                </button>
            </div>
        </section>
    );
};

export default VerifyAccountPage;
