import otpGenerator from "otp-generator";
import nodeMailer from "nodemailer";

const generateOTP = () => {
    //Generating OTP
    const OTP = otpGenerator.generate(6, {
        specialChars: false,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
    });

    //Sending OTP
    return OTP;
};

const mailTransport = () => {
    //Mail Host
    return nodeMailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.EMAIL_TRAP_USER_NAME,
            pass: process.env.EMAIL_TRAP_USER_PASSWORD,
        },
    });
};

//Export
export { generateOTP, mailTransport };
