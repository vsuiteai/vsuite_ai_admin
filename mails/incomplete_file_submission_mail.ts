const generate_incomplete_file_submission_mail = (
  metricsHtmlString: string
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
        <h2>Incomplete File Submission</h2>
        <p>Hello,</p>
        <p>We have reviewed the files you recently uploaded, and unfortunately, they do not contain all the necessary data we require to proceed.</p>
        <p>A few important metrics are still missing. Please ensure you upload files that include all relevant information</p>
        
        <p>The following metrics are still required:</p>
        ${metricsHtmlString}
        <p>Please upload updated files that include these missing metrics so we can continue processing your submission.</p>
        <p>If this message does not apply to your situation, you may safely disregard it.</p>
        <p>Thank you for your attention.</p>
        <p>Best regards,<br />Benjamin Strategy Group</p>

        <div class="footer">
        This is an automated message. Please do not reply directly to this email.
        </div>
    </div>
    </body>
</html>
    `;
};

export { generate_incomplete_file_submission_mail };
