import nodemailer from "nodemailer";
import handlebars, { template } from "handlebars";
import fs from "fs";
import path from "path";
import Mail from "nodemailer/lib/mailer";

interface Payload {
  [key: string]: string;
}

export const sendEmail = async (
  sendEmailPayload: Mail.Options
): Promise<void> => {
  try {
    const isDevelopment = process.env.NODE_ENV === "development";
    const transportOptions = isDevelopment
      ? {
          host: "localhost",
          port: 2025,
          secure: false,
        }
      : {
          host: process.env.EMAIL_HOST,
          port: 465,
          secure: true,
          auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
          },
        };
    // Create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport(transportOptions);

    const options = {
      from: process.env.FROM_EMAIL,
      to: sendEmailPayload.to,
      subject: sendEmailPayload.subject,
      html: sendEmailPayload.html,
    };

    // Send email and await the result
    const info = await transporter.sendMail(options);
    console.log("Email sent: ", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const registerHandlebars = (template: string, context?: Payload) => {
  const source = fs.readFileSync(
    path.join(__dirname, "./templates", `${template}.handlebars`),
    "utf8"
  );
  const compiledTemplate = handlebars.compile(source);
  return compiledTemplate(context);
};
