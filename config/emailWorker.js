const emailQueue = require('../config/emailQueue');
const { Resend } = require('resend');

emailQueue.process(async (job, done) => {
  try {
    const { to, subject, html } = job.data;
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'onboarding@resend.dev',
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