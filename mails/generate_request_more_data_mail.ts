const generate_request_more_data_mail = (
  metricsHtmlString: string,
  asset_upload_link: string,
  fileTypes?: string | string[]
) => {
  const toArray = (v?: string | string[]) =>
    v === undefined ? [] : Array.isArray(v) ? v : [v];

  const normalize = (s: string) => s.trim().toLowerCase();

  const typeLabelMap: Record<string, string> = {
    financial: "Financial",
    operational: "Operational",
    sales: "Sales",
  };

  const types = toArray(fileTypes).map(normalize).filter(Boolean);

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const formattedLabel = (() => {
    if (types.length === 0) return "uploaded file(s)";

    const labels = types.map((t) => typeLabelMap[t] ?? capitalize(t));

    if (labels.length === 1) return `${labels[0]} file(s)`;
    if (labels.length === 2) return `${labels[0]} and ${labels[1]} files`;
    return `${labels.slice(0, -1).join(", ")}, and ${labels.slice(-1)} files`;
  })();

  const uploadPhrase =
    formattedLabel === "uploaded file(s)"
      ? "files"
      : formattedLabel.toLowerCase();

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Request for Additional Data</title>
    <style>
      body { font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 30px; color: #333; }
      .container { background-color: #fff; padding: 25px; max-width: 600px; margin: 0 auto; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05); }
      .footer { font-size: 12px; color: #888; margin-top: 30px; text-align: center; }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Request for Additional Data</h2>
      <p>Hello,</p>
      <p>We reviewed the data you submitted and require additional information for the following ${formattedLabel}.</p>

      <p>The specific metrics still needed are listed below:</p>
      ${metricsHtmlString}

      <p>Please upload updated ${uploadPhrase} that include these metrics so we can continue processing your submission. To upload your file, click the link below:</p>        
    
      <ol>
        <li><a href="${asset_upload_link}">Upload required financial documents.</a></li>
      </ol>

      <p>If this request does not apply, you may disregard this message.</p>

      <p>Thank you for your cooperation.</p>
      <p>Best regards,<br />Benjamin Strategy Group</p>

      <div class="footer">
        This is an automated message. Please do not reply directly to this email.
      </div>
    </div>
  </body>
</html>
  `;
};

export { generate_request_more_data_mail };
