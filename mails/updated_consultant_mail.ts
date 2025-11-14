const generate_consultant_update_mail = (
  consultant_name: string | false,
  consultant_email: string | false,
  login_url: string,
  consultant_password: string | false
) => {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Consultant Account Update</title>
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
      .highlight {
        background-color: #f3f6fa;
        padding: 15px;
        border-radius: 6px;
        margin: 20px 0;
        font-family: monospace;
      }
      .footer {
        font-size: 12px;
        color: #888;
        margin-top: 30px;
        text-align: center;
      }
      a.button {
        display: inline-block;
        padding: 10px 20px;
        margin-top: 15px;
        background-color: #007bff;
        color: #fff !important;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Consultant Account Update</h2>
      <p>Hello ${consultant_name},</p>
      <p>
        This is to inform you that your vSuite consultant account details have been successfully updated.
        ${
          consultant_password
            ? "This update includes changes to your login credentials."
            : ""
        }
      </p>

      <div class="highlight">
        <p><strong>Email:</strong> ${consultant_email}</p>
        ${
          consultant_password
            ? `<p><strong>New Password:</strong> ${consultant_password}</p>`
            : ""
        }
      </div>

      <p>
        You can log in to your account to review your updated details using the link below:
      </p>

      <p>
        <a href="${login_url}" class="button">Login to vSuite</a>
      </p>


      <p>
        If you did not request or authorize this change, please contact the support team immediately.
      </p>

      <p>Best regards,<br />Benjamin Strategy Group</p>

      <div class="footer">
        This is an automated message. Please do not reply directly to this email.
      </div>
    </div>
  </body>
</html>
  `;
};

export { generate_consultant_update_mail };
