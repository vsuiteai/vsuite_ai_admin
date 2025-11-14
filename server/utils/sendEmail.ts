import nodemailer from "nodemailer";

export async function sendEmail(to: string, subject: string, bodyHtml: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "cloudservice@vsuite.ai", // your Gmail address
      pass: "wdwpfdiigybfkxil", // generated app password
    },
  });

  await transporter.sendMail({
    from: `"Benjamin Strategy Group" <cloudservice@vsuite.ai>`,
    to: to,
    subject: subject,
    html: bodyHtml,
  });

  console.log("Email sent.");
}
