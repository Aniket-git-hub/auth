import transporter from "../config/mailer.js";
import getEnvVariable from "./env.js";
async function sendEmail(receiverEmail, subject, template) {
    try {
        const info = await transporter.sendMail({
            from: getEnvVariable('MAIL_EMAIL'),
            to: receiverEmail,
            subject,
            html: template,
        });
        return { success: true, info };
    } catch (error) {
        return { success: false, error };
    }
}

export default sendEmail;