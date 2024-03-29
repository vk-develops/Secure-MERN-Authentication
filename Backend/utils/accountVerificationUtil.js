import otpGenerator from "otp-generator";
import nodeMailer from "nodemailer";
import Mailgen from "mailgen";

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

//Setting up the mailgen environment
const Mailgenerator = new Mailgen({
    theme: "default",
    product: {
        name: "MovieMatic",
        link: process.env.APP_FRONTEND_LINK,
    },
});

const mailTransport = () => {
    //Mail Host
    return nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_EMAIL_ID,
            pass: process.env.GMAIL_EMAIL_PASSWORD,
        },
    });
};

//Export
export { generateOTP, mailTransport, Mailgenerator };
