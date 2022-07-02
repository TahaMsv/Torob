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
<<<<<<< HEAD
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
=======
        let info = await transporter.sendMail({
            from: MAIL_SETTINGS.auth.user,
            to: params.to,
            subject: 'Hello ✔',
            html: `
        <div
          class="container"
          style="max-width: 90%; margin: auto; padding-top: 20px"
        >
          <h2>Welcome to the club.</h2>
          <h4>You are officially In ✔</h4>
          <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
          <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${params.OTP}</h1>
     </div>
      `,
        });
        return info;
    } catch (error) {
        return false;
>>>>>>> ced3de45a76a97c7fbae1b1a1e26ea8223188373
    }
};

// // The OTP_LENGTH is a number, For my app i selected 10.
// // The OTP_CONFIG is an object that looks like
// OTP_CONFIG: {
//   upperCaseAlphabets: true,
//   specialChars: false,
// },