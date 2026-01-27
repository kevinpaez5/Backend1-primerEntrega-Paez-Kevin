import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

console.log("Mailer auth:", {
  user: process.env.GMAIL_USER,
  pass: process.env.GMAIL_PASS ? "OK" : "MISSING"
});

console.log({
  user: process.env.GMAIL_USER,
  pass: process.env.GMAIL_PASS
});