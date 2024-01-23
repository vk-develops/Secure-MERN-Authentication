import nodeMailer from "nodemailer";
import crypto from "crypto";

const generateRandomID = () => {
    //Generating unique id using crypto library
    const uniqueId = crypto.randomBytes(64).toString("hex");
    return uniqueId;
};

//exports

export { generateRandomID };
