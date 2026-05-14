// Save this as: api/send-whatsapp-alert.js (in your Vercel project)
// This sends you a WhatsApp alert when someone signs up

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const formData = req.body;

  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER;
    const toNumber = '+17144785438'; // YOUR personal WhatsApp number

    // Format the message with all form data
    let message = '🎾 New signup!\n\n';
    message += `Name: ${formData.name || 'N/A'}\n`;
    message += `WhatsApp: ${formData.whatsapp || 'N/A'}\n`;
    message += `May 16: ${formData.may16 || 'N/A'}\n`;
    message += `Pickleball: ${formData.pickleball || 'N/A'}\n`;
    
    if (formData.racquet_sports) {
      message += `Racquet sports: ${formData.racquet_sports}\n`;
    }
    if (formData.activities) {
      message += `Other activities: ${formData.activities}\n`;
    }
    if (formData.racquet_other) {
      message += `Other racquet: ${formData.racquet_other}\n`;
    }
    if (formData.activities_other) {
      message += `Other activities note: ${formData.activities_other}\n`;
    }
    if (formData.comments) {
      message += `\nComments: ${formData.comments}\n`;
    }

    const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');

    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          From: `whatsapp:${fromNumber}`,
          To: `whatsapp:${toNumber}`,
          Body: message,
        }).toString(),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('Twilio error:', error);
      return res.status(response.status).json(error);
    }

    const data = await response.json();
    return res.status(200).json({ success: true, messageSid: data.sid });
  } catch (error) {
    console.error('Error sending WhatsApp alert:', error);
    return res.status(500).json({ error: 'Failed to send alert' });
  }
}
