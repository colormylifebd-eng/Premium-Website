import "server-only";
import { Resend } from "resend";

/**
 * Sends the admin password-reset email through Resend.
 * In development without Resend keys, the link is printed to the terminal
 * instead so the flow can be tested locally.
 */
export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim();

  if (!apiKey || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`\n[dev] Email is not configured. Password reset link for ${to}:\n${resetUrl}\n`);
      return;
    }
    throw new Error("Email is not configured. Set RESEND_API_KEY and EMAIL_FROM.");
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    subject: "পাসওয়ার্ড রিসেট | Color My Life অ্যাডমিন",
    text: [
      "Color My Life অ্যাডমিন প্যানেলের পাসওয়ার্ড রিসেটের অনুরোধ পাওয়া গেছে।",
      "নিচের লিংকে গিয়ে নতুন পাসওয়ার্ড সেট করুন (লিংকটি ৩০ মিনিট কার্যকর থাকবে):",
      resetUrl,
      "আপনি অনুরোধ না করে থাকলে এই ইমেইলটি উপেক্ষা করুন।",
    ].join("\n\n"),
    html: `<div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:24px;color:#0b1526">
  <h2 style="color:#1d47b8;margin:0 0 16px">Color My Life অ্যাডমিন</h2>
  <p>পাসওয়ার্ড রিসেটের অনুরোধ পাওয়া গেছে। নিচের বাটনে চাপ দিয়ে নতুন পাসওয়ার্ড সেট করুন।</p>
  <p style="margin:28px 0"><a href="${resetUrl}" style="background:#1d47b8;color:#fff;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:bold">নতুন পাসওয়ার্ড সেট করুন</a></p>
  <p style="font-size:13px;color:#556178">লিংকটি ৩০ মিনিট কার্যকর থাকবে। আপনি অনুরোধ না করে থাকলে এই ইমেইলটি উপেক্ষা করুন।</p>
</div>`,
  });

  if (error) throw new Error(`Resend: ${error.message}`);
}
