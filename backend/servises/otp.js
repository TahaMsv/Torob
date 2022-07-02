const otpGenerator = require('otp-generator');
const MAIL_SETTINGS = {
    service: 'gmail',
    auth: {
        user: "tahamsvj@gmail.com",        
        pass: "onbamchhsngtpecr",
    },
};
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(MAIL_SETTINGS);


module.exports.generateOTP = () => {
    const OTP = otpGenerator.generate(4, {
        upperCaseAlphabets: true,
        specialChars: false,
    });
    return OTP;
};

module.exports.sendMail = async (params) => {
    console.log("here22");
    try {
<<<<<<< HEAD
        console.log("here23");
        let info = await transporter.sendMail({
            from: MAIL_SETTINGS.auth.user,
            to: "tahamousavi.sbu@gmail.com",
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
        console.log("here40");
        return info;
    } catch (error) {
        console.log(error);
        return false;
=======
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
>>>>>>> c496160b92019d86b28634ebebeac6e08eb3db51
    }
};

// // The OTP_LENGTH is a number, For my app i selected 10.
// // The OTP_CONFIG is an object that looks like
// OTP_CONFIG: {
//   upperCaseAlphabets: true,
//   specialChars: false,
// },