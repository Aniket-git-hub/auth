import nodemailer from 'nodemailer';
import getEnvVariable from '../utils/env.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: getEnvVariable('MAIL_EMAIL'),
        pass: getEnvVariable('MAIL_PASSWORD'),
    },
});

export default transporter;