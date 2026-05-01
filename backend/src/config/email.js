import nodemailer from 'nodemailer'

const createTransporter = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'joinus@shivadevifoundation.org',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

export const sendDonationReceipt = async ({ to, name, amount, receiptNumber, paymentId, cause }) => {
  if (!process.env.SMTP_USER) {
    console.log(`[Email] Receipt would be sent to ${to} — SMTP not configured`)
    return
  }
  const transporter = createTransporter()
  await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'Shivadevi Foundation <noreply@shivadevifoundation.org>',
    to,
    subject: `Donation Receipt #${receiptNumber} — Shivadevi Foundation`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1A1A2E;">
        <div style="background: #2D7A4F; padding: 2rem; border-radius: 16px 16px 0 0; text-align: center;">
          <h1 style="color: #fff; font-size: 1.8rem; margin: 0;">BrightEarth Foundation</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 0.5rem 0 0;">Donation Receipt</p>
        </div>
        <div style="background: #fff; padding: 2rem; border: 1px solid #e5e7eb; border-top: none;">
          <p>Dear <strong>${name}</strong>,</p>
          <p>Thank you for your generous donation! Your support helps us empower youth and protect the planet.</p>
          <div style="background: #E6F5EC; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 0.5rem 0; color: #666;">Receipt Number</td><td style="padding: 0.5rem 0; font-weight: 600; text-align: right;">${receiptNumber}</td></tr>
              <tr><td style="padding: 0.5rem 0; color: #666;">Payment ID</td><td style="padding: 0.5rem 0; font-weight: 600; text-align: right;">${paymentId}</td></tr>
              <tr><td style="padding: 0.5rem 0; color: #666;">Donation Amount</td><td style="padding: 0.5rem 0; font-weight: 700; color: #2D7A4F; text-align: right; font-size: 1.2rem;">₹${Number(amount).toLocaleString('en-IN')}</td></tr>
              <tr><td style="padding: 0.5rem 0; color: #666;">Cause</td><td style="padding: 0.5rem 0; font-weight: 600; text-align: right;">${cause || 'General Fund'}</td></tr>
              <tr><td style="padding: 0.5rem 0; color: #666;">Date</td><td style="padding: 0.5rem 0; font-weight: 600; text-align: right;">${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</td></tr>
            </table>
          </div>
          <p style="font-size: 0.85rem; color: #666; background: #FFF8DC; border-radius: 8px; padding: 1rem;">
            <strong>80G Tax Exemption:</strong> This donation is eligible for tax deduction under Section 80G of the Income Tax Act, 1961. 
            PAN: AAATB1234G · Registration: 12A/80G/2012-13/DIT(E)/12A/2012
          </p>
          <p>With gratitude,<br><strong>Team BrightEarth</strong></p>
        </div>
        <div style="background: #f9f7f2; padding: 1rem; text-align: center; border-radius: 0 0 16px 16px; border: 1px solid #e5e7eb; border-top: none;">
          <p style="font-size: 0.8rem; color: #999; margin: 0;">BrightEarth Foundation · 14 Vasant Vihar, New Delhi 110057 · hello@brightearth.org</p>
        </div>
      </div>
    `,
  })
}

export const sendContactNotification = async ({ firstName, email, interest, message }) => {
  if (!process.env.SMTP_USER) {
    console.log(`[Email] Contact notification would be sent — SMTP not configured`)
    return
  }
  const transporter = createTransporter()
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
    replyTo: email,
    subject: `New Contact: ${interest || 'General'} — ${firstName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px;">
        <h2 style="color: #2D7A4F;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Interest:</strong> ${interest || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="background: #f0f0f0; padding: 1rem; border-left: 4px solid #2D7A4F; border-radius: 0 8px 8px 0;">${message}</blockquote>
        <p style="font-size: 0.8rem; color: #999;">Received: ${new Date().toLocaleString('en-IN')}</p>
      </div>
    `,
  })
}

export const sendContactAutoReply = async ({ to, firstName }) => {
  if (!process.env.SMTP_USER) return
  const transporter = createTransporter()
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: 'We received your message — BrightEarth Foundation',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; color: #1A1A2E;">
        <h2 style="color: #2D7A4F;">Hi ${firstName} 👋</h2>
        <p>Thank you for reaching out to BrightEarth Foundation! We've received your message and our team will get back to you within 24 business hours.</p>
        <p>In the meantime, you can explore our work at <a href="${process.env.FRONTEND_URL}" style="color: #2D7A4F;">Shivadevifoundation.org</a>.</p>
        <p>With gratitude,<br><strong>Team Shivadevi</strong></p>
      </div>
    `,
  })
}
