const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Dùng trong dev, bỏ trong production
  },
});

const sendResetPassword = async (email, otp) => {
  const mailOptions = {
    from: `"TRANHUONG" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Mã OTP đặt lại mật khẩu",
    html: `
      <table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Segoe UI', sans-serif; background-color: #f4f6f8; padding: 40px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background-color: #073272; padding: 20px; text-align: center;">
                  <img src="https://res.cloudinary.com/dyu8kdule/image/upload/v1779260296/logo_h62roc.jpg" alt="TRANHUONG" width="120" style="display: block; margin: 0 auto 10px;" />
                  <h1 style="color: #ffffff; font-size: 24px; margin: 0;">Đặt lại mật khẩu</h1>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding: 30px; color: #333333;">
                  <p style="font-size: 16px; margin-top: 0;">Xin chào,</p>
                  <p style="font-size: 15px; line-height: 1.6;">
                    Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.<br/>
                    Vui lòng dùng mã OTP bên dưới để xác thực:
                  </p>

                  <!-- OTP Box -->
                  <p style="text-align: center; margin: 30px 0;">
                    <span style="
                      display: inline-block;
                      background-color: #f0f4ff;
                      border: 2px dashed #073272;
                      border-radius: 8px;
                      padding: 16px 40px;
                      font-size: 36px;
                      font-weight: bold;
                      letter-spacing: 10px;
                      color: #073272;
                    ">${otp}</span>
                  </p>

                  <p style="font-size: 14px; color: #555555; text-align: center;">
                    Mã OTP có hiệu lực trong <strong>2 phút</strong>.<br/>
                    Không chia sẻ mã này cho bất kỳ ai.
                  </p>
                  <p style="font-size: 14px; color: #999999; text-align: center;">
                    Nếu bạn không yêu cầu, vui lòng bỏ qua email này.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #f8f9fa; padding: 20px; font-size: 12px; color: #888888; text-align: center;">
                  <p style="margin: 0;">© 2026 Công ty TNHH Thực Phẩm Thương Mại Dịch Vụ Trân Hương.</p>
                  <p style="margin: 5px 0 0;">Email tự động, vui lòng không trả lời lại.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Lỗi gửi email OTP:", error);
    throw new Error("Không thể gửi email OTP");
  }
};
module.exports = sendResetPassword;