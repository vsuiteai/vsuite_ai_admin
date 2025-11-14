const generate_verification_mail = (
  client_contact_username: string,
  verification_link: string,
  token_expires_at_hours: number
) => {
  return `
<!DOCTYPE html>
<html>
    <head>
    <meta charset="UTF-8" />
    <title>Additional Files Required</title>
    <style>
        body {
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        padding: 30px;
        color: #333;
        }
        .container {
        background-color: #fff;
        padding: 25px;
        max-width: 600px;
        margin: 0 auto;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
        }
        .footer {
        font-size: 12px;
        color: #888;
        margin-top: 30px;
        text-align: center;
        }
    </style>
    </head>
    <body>
    <div class="container">
        <h2>Email Verification</h2>
        <p>Hello ${client_contact_username},</p>
        <p>Welcome to vSuite. Please click the verification link below to confirm your account. </p>
        <p><a href="${verification_link}">verification link</a></p>
        <p>Please note that this link would expire in ${token_expires_at_hours} hour(s). Thank you for your attention.</p>
        <p>Best regards,<br />Benjamin Strategy Group</p>

        <div class="footer">
        This is an automated message. Please do not reply directly to this email.
        </div>
    </div>
    </body>
</html>
    `;
};

export { generate_verification_mail };
