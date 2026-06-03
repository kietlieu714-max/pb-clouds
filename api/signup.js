export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, whatsapp, email, experience, free_days, time_preference } = req.body;

    const response = await fetch(
      'https://zmpzumykgmugrgepaoef.supabase.co/rest/v1/pickleball_signups',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptcHp1bXlrZ211Z3JnZXBhb2VmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxNTkwNzUsImV4cCI6MjA1OTczNTA3NX0.BhBPsVCpXhVXQ8G0_0dA_L0TFiI1p_ghOj5kBXLj8qE',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptcHp1bXlrZ211Z3JnZXBhb2VmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxNTkwNzUsImV4cCI6MjA1OTczNTA3NX0.BhBPsVCpXhVXQ8G0_0dA_L0TFiI1p_ghOj5kBXLj8qE',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          name,
          whatsapp,
          email: email || null,
          experience: experience || null,
          free_days: free_days || null,
          time_preference: time_preference || null
        })
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Supabase error:', error);
      return res.status(response.status).json({ error: 'Failed to save signup' });
    }

    return res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
