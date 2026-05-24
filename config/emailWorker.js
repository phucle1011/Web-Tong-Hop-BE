const emailQueue = require('../config/emailQueue');
const nodemailer = require('nodemailer');

emailQueue.process(async (job, done) => {
  try {
    const { to, subject, html } = job.data;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,      // ✅ đổi sang 465
      secure: true,   // ✅ true cho port 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false  // ✅ tránh lỗi cert trên Render
      }
    });

    await transporter.sendMail({
      from: `"TRANHUONG" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    done();
  } catch (err) {
    console.error('Email worker error:', err.message);
    done(err);
  }
});