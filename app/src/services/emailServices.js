const email = {
  async sendEmail(to, subject, { title, message, text, footerNote }) {
    try {
      await fetch("https://email-poultry-backend.onrender.com/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to,
          subject,
          title,
          message,
          text,
          footerNote,
        }),
      });
    } catch (error) {
      console.error("📧 Failed to send email:", error);
    }
  },
};

export default email;
