import { Op } from 'sequelize';
import OTP from "../../models/otpModel.js";
async function verifyOtpController(req, res, next) {
    const { otp, email } = req.body;
    try {


        const savedOtp = await verifyOTP(email, otp)
        if (!savedOtp || (savedOtp.otp != otp)) {
            throw new Error('InvalidOTP', 'Invalid OTP');
        }
        await OTP.destroy({ where: { email } });
        res.json({ message: 'OTP verified' });
    } catch (error) {
        next(error)
    }
}

export default verifyOtpController;

const verifyOTP = async (email, otp) => {
    const existingOTP = await OTP.findOne({
        where: {
            email,
            otp,
            expiresAt: {
                [Op.gt]: new Date() // Check if OTP hasn't expired
            }
        }
    });
    return existingOTP
};