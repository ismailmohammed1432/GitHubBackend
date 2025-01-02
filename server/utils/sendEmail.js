import nodemailer from "nodemailer";
import config from "config";

const userEmail = config.get("EMAIL");
const userPassword = config.get("PASSWORD");

async function sendMail(emailData) {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        userEmail,
        userPassword,
      },
    });
    let info =await transporter.sendMail({
      from: `${user}`,
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text,
    });
    console.log("Email sent",info.messageId);
  } catch (error) {
    console.log(error);
  }
}

export default sendMail