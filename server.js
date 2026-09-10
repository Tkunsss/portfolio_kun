import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3001);
const configuredFrontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
const frontendOrigin = configuredFrontendUrl.startsWith('http://') || configuredFrontendUrl.startsWith('https://')
  ? configuredFrontendUrl
  : `https://${configuredFrontendUrl}`;

app.use(cors({ origin: frontendOrigin }));
app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).json({
    service: 'portfolio-email-api',
    status: 'running',
    health: '/health',
  });
});

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASSWORD;
  const fromEmail = process.env.FROM_EMAIL;
  const toEmail = process.env.TO_EMAIL;

  if (!smtpHost || !smtpUser || !smtpPass || !fromEmail || !toEmail) {
    if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL || !process.env.RESEND_TO_EMAIL) {
      return res.status(500).json({
        message: 'Email server is not configured. Add Resend or SMTP environment variables.',
      });
    }
  }

  try {
    const emailDetails = {
      subject: `New contact message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<h3>New contact message</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br />')}</p>`,
    };

    if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL) {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL,
          to: [process.env.RESEND_TO_EMAIL],
          reply_to: email,
          ...emailDetails,
        }),
      });

      if (!resendResponse.ok) {
        const errorBody = await resendResponse.text();
        throw new Error(`Resend ${resendResponse.status}: ${errorBody}`);
      }
    } else {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transporter.sendMail({
        from: `Portfolio Contact <${fromEmail}>`,
        to: toEmail,
        replyTo: email,
        ...emailDetails,
      });
    }

    return res.status(200).json({ message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({
      message: 'Failed to send email. Please try again later.',
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
