import nodemailer from "nodemailer";

export const handleContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const subject = `New message from ${name} via your portfolio`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
      },
    });

    const ownerMailOptions = {
      from: `"Portfolio Contact" <${email}>`,
      to: process.env.USER_EMAIL,
      subject,
      html: `
        <h2>📬 New Portfolio Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message?.replace(/\n/g, "<br>")}</p>
      `,
    };

    const autoReplyOptions = {
      from: `"Somyaranjan" <${process.env.USER_EMAIL}>`,
      to: email,
      subject: "Thanks for reaching out! 🌟",
      html: `
        <p>Hey ${name},</p>
        <p>Thanks for contacting me. I’ll reply soon!</p>
        <blockquote>${message?.replace(/\n/g, "<br>")}</blockquote>
      `,
    };

    // Send both emails
    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(autoReplyOptions);

    console.log("✅ Both emails sent successfully!");
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("❌ Email send error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
