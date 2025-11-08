import nodemailer from "nodemailer";

export const handleContactForm=async(req,res)=> {
    const { name, email, message }=req.body    
    const subject=`New message from ${name} via your portfolio`
  // 1️⃣ Configure the transporter
  const transporter = nodemailer.createTransport({
    service: "gmail", // or SMTP host if using another provider
    auth: {
      user: process.env.USER_EMAIL, // your email address
      pass: process.env.USER_PASS, // app password (for Gmail)
    },
  });

  // 2️⃣ Email to YOU (the site owner)
  const ownerMailOptions = {
    from: `"Portfolio Contact" <${email}>`,
    to: process.env.USER_EMAIL, // your email
    subject: `New message from ${name}: ${subject || "No subject"}`,
    html: `
      <h2>📬 New Portfolio Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message?.replace(/\n/g, "<br>")}</p>
      <hr />
      <p style="font-size:12px;color:#888;">Sent on ${new Date()?.toLocaleString()}</p>
    `,
  };

  // 3️⃣ Auto-reply to the USER
  const autoReplyOptions = {
    from: `"Somyaranjan" <${process.env.USER_EMAIL}>`,
    to: email, // send back to user
    subject: "Thanks for reaching out! 🌟",
    html: `
      <div style="font-family:Arial,sans-serif;background:#f9f9f9;padding:20px;">
        <h2 style="color:#4f46e5;">Hey ${name},</h2>
        <p>Thanks for contacting me through my portfolio! 👋</p>
        <p>I’ve received your message and will get back to you soon.</p>
        <hr style="margin:20px 0;">
        <p style="font-size:13px;color:#777;">Here’s a copy of what you sent:</p>
        <blockquote style="background:#fff;border-left:4px solid #4f46e5;padding:10px 15px;">
          ${message?.replace(/\n/g, "<br>")}
        </blockquote>
        <p style="font-size:13px;color:#777;margin-top:20px;">
          Best regards,<br>
          <strong>Somyranjan</strong><br>
          <a href="https://somyportfolio.netlify.app/" style="color:#4f46e5;">Portfolio link</a>
        </p>
      </div>
    `,
  };

  // 4️⃣ Send both emails
  await transporter.sendMail(ownerMailOptions); // send to you
  await transporter.sendMail(autoReplyOptions); // auto reply to user
  console.log("✅ Both emails sent successfully!");
res.status(200).json({message:"Message send successfully"})
}
