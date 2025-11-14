const generate_new_consultant_mail = (
  consultant_name: string,
  consultant_email: string,
  consultant_password: string,
  login_url: string
) => {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Welcome to vSuite</title>
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
      .credentials {
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
      <h2>Welcome to vSuite</h2>
      <p>Hello ${consultant_name},</p>
      <p>
        We are excited to have you join us as a new consultant. Below are your
        login credentials for accessing your vSuite consultant account:
      </p>
      <div class="credentials">
        <p><strong>Email:</strong> ${consultant_email}</p>
        <p><strong>Password:</strong> ${consultant_password}</p>
      </div>
      <p>
        You can log in to your account using the link below:
      </p>
      <p>
        <a href="${login_url}" class="button">Login to vSuite</a>
      </p>
      <p>
        For security reasons, we recommend changing your password after your
        first login.
      </p>
      <p>Best regards,<br />Benjamin Strategy Group</p>
      <div class="footer">
        This is an automated message. Please do not reply directly to this
        email.
      </div>
    </div>
  </body>
</html>
    `;
};

export { generate_new_consultant_mail };
