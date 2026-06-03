export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, whatsapp, email, experience, free_days, time_preference } = req.body;

    // Validate required fields
    if (!name || !whatsapp) {
      return res.status(400).json({ error: 'Name and WhatsApp are required' });
    }

    const response = await fetch(
      'https://zmpzumykgmugrgepaoef.supabase.co/rest/v1/pickleball_signups',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptcHp1bXlrZ211Z3JnZXBhb2VmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1OTk3ODgsImV4cCI6MjA5NDE3NTc4OH0.UpvPE9oIu4geRSVLfSyyOePLtvSBX6nGDHhuAcSVMrk',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptcHp1bXlrZ211Z3JnZXBhb2VmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1OTk3ODgsImV4cCI6MjA5NDE3NTc4OH0.UpvPE9oIu4geRSVLfSyyOePLtvSBX6nGDHhuAcSVMrk',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          name: name.trim(),
          whatsapp: whatsapp.trim(),
          email: email ? email.trim() : null,
          experience: experience || null,
          free_days: free_days || null,
          time_preference: time_preference || null
        })
      }
    );

    const responseText = await response.text();
    
    if (!response.ok) {
      console.error('Supabase error:', responseText, response.status);
      return res.status(response.status).json({ error: 'Failed to save signup', details: responseText });
    }

    return res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
}
