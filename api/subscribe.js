export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { contact, timestamp } = req.body;
    
    if (!contact) {
      return res.status(400).json({ error: 'Contact info required' });
    }

    // Log to Vercel function logs (viewable in Vercel dashboard)
    console.log(`[SIGNUP] ${timestamp} | ${contact}`);

    // Send to Google Sheets via Apps Script (placeholder — replace URL when ready)
    // You can also connect this to Mailchimp, Sendinblue, etc.
    
    return res.status(200).json({ 
      success: true, 
      message: 'Thank you! We\'ll be in touch.' 
    });
  } catch (error) {
    console.error('[SIGNUP ERROR]', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
