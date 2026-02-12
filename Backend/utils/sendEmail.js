// Backend/utils/sendEmail.js
import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
             auth: {
                user: process.env.EMAIL_USER, // Updated to match .env
                pass: process.env.EMAIL_PASS  // Updated to match .env
            }
        });

        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html
        });

        console.log("Email sent:", info.messageId);
        return info;
    } catch (err) {
        console.error("sendEmail error:", err);
        throw err;
    }
};
