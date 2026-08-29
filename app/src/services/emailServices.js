const EMAIL_API_URL = import.meta.env.VITE_EMAIL_API_URL; // e.g. https://email-poultry-backend.vercel.app/send
const EMAIL_API_KEY = import.meta.env.VITE_EMAIL_API_KEY; // same value as API_SECRET_KEY on the backend

const email = {
  async sendEmail(to, subject, { title, message, text, footerNote }) {
    try {
      const response = await fetch(EMAIL_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": EMAIL_API_KEY,
        },
        body: JSON.stringify({
          to,
          subject,
          title,
          message,
          text,
          footerNote,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      return data;
    } catch (error) {
      console.error("📧 Failed to send email:", error);
      throw error;
    }
  },
};

export default email;
