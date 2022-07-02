const otpGenerator = require('otp-generator');
const messagebird = require('messagebird');

const error = require("../utilities/errorFunction");
// const MAIL_SETTINGS = {
//     service: 'gmail',
//     auth: {
//         user: "securesally@gmail.com",
//         pass: "mcmrvcfiglstgsoc",
//     },
// };
const nodemailer = require('nodemailer');
// const transporter = nodemailer.createTransport(MAIL_SETTINGS);


module.exports.generateOTP = () => {
    const OTP = otpGenerator.generate(10, {
        upperCaseAlphabets: true,
        specialChars: false,
    });
    return OTP;
};

module.exports.sendSMS = async (params) => {
    try {
        console.log("here24");
        var number = "+98" + "9116455064";
        console.log("here26");
        messagebird.verify.create(number,
            {
                originator: 'TorobClone',
                timeout: 600,
                template: 'Your verification code is %token.'
            },
            function (err, response) {
                console.log("here36");
                if (err) {
                    console.log("here38");
                    return error(res, "SMS Error", 401);
                }
                console.log(response);

            });
        console.log("here40");

    } catch (err) {
        return error(res, error, 401);
    }
};

// // The OTP_LENGTH is a number, For my app i selected 10.
// // The OTP_CONFIG is an object that looks like
// OTP_CONFIG: {
//   upperCaseAlphabets: true,
//   specialChars: false,
// },