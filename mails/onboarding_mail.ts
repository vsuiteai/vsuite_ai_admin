const generate_onboarding_mail = (
  client_contact_username: string,
  ceo_onboarding_link: string,
  advisior_onboarding_link: string,
  asset_upload_link: string
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
        <h2>Client Onboarding</h2>
        <p>Hello ${client_contact_username},</p>
        <p>Your vSuite account is verified. Click the link below to begin your onboarding process. Our process has three steps.</p>
        
        <ol>
        <li><a href="${advisior_onboarding_link}">Complete Company Questionnaire by CEO or another leader.</a></li>
        <li><a href="${ceo_onboarding_link}">Complete CEO Questionnaire for the CEO only.</a></li>
        <li><a href="${asset_upload_link}">Upload required financial documents.</a></li>
        </ol>
        <p>Please note: the intentionality and accuracy of the information you provide is essential to our process and the intelligence you get from vSuite. Answer every question honestly and candidly.</p>

        <p>Best regards,<br />Benjamin Strategy Group</p>

        <div class="footer">
        This is an automated message. Please do not reply directly to this email.
        </div>
    </div>
    </body>
</html>
    `;
};

export { generate_onboarding_mail };
