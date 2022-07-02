const otpGenerator = require('otp-generator');
const MAIL_SETTINGS = {
    service: 'gmail',
    auth: {
        user: "tahamsvj@gmail.com",
        pass: "mcmrvcfiglstgsoc",
    },
};
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(MAIL_SETTINGS);


module.exports.generateOTP = () => {
    const OTP = otpGenerator.generate(10, {
        upperCaseAlphabets: true,
        specialChars: false,
    });
    return OTP;
};

module.exports.sendMail = async (params) => {
    try {
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
        console.log(error);
        return false;
    }
};

// // The OTP_LENGTH is a number, For my app i selected 10.
// // The OTP_CONFIG is an object that looks like
// OTP_CONFIG: {
//   upperCaseAlphabets: true,
//   specialChars: false,
// },