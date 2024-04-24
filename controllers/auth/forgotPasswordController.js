import OTP from "../../models/otpModel.js"
import USER from "../../models/userModel.js"
import sendEmail from "../../utils/sendEmail.js"

async function forgotPasswordController(req, res, next) {
    const { email } = req.body
    try {
        const savedUser = await USER.findOne({ where: { email: email } })
        if (!savedUser) {
            throw new Error("nO user found")
        }

        const otpGen = generateOTP()
        const storedOtp = await storeOTP(savedUser.email, otpGen)

        const { success, error } = await sendEmail(savedUser.email, "Password Reset OTP", otpEmailTemplate(`${savedUser.firstName} ${savedUser.lastName}`, otpGen))
        if (!success) {
            console.log(error)
        }

        res.send({ message: "Otp sent" })

    } catch (error) {
        console.log(error)
    }
}

export default forgotPasswordController


const otpEmailTemplate = (name, otp) => `
  <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; color: #333;  border: 1px solid #b8b8b8; border-radius:.3rem;">
    <h2 style="font-size: 24px;">Your One-Time Password (OTP)</h2>
    <p style="font-size: 18px;">Hello, ${name}</p>
    <p style="font-size: 18px;">You requested a one-time password to access your letsbug account. Here is your OTP:</p>
    <h1 style="font-size: 48px; text-align: center;">${otp}</h1>
    <p style="font-size: 18px;">This OTP is valid for the next 2 minutes. Do not share this OTP with anyone.</p>
    <p style="font-size: 18px;">If you did not request this OTP, please ignore this email or contact support.</p>
    <p style="font-size: 18px;">Thank you,</p>
    <p style="font-size: 18px;">Team Letsbug</p>
  </div>
`;

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const storeOTP = async (email, otp) => {
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes expiry
    return await OTP.create({
        email,
        otp,
        expiresAt
    });
};