const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
  //   let testAccount = await nodemailer.createTestAccount();

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports

      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: "Amazon website",
      to: email,
      subject: subject,
      text: text,
      html: `<b>reset Password <br> ${text}</b>`,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent!", error);
    return error;
  }
};
