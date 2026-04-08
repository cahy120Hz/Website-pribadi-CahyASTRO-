/**
 * CahyASTRO Portal - AI Chat Endpoint
 * Serverless function for handling AI astronomy queries
 * Uses Google Gemini API
 */

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only POST allowed
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    // Validate input
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid message format' });
    }

    if (message.length > 500) {
      return res.status(400).json({ error: 'Message too long (max 500 characters)' });
    }

    // Sanitize input
    const sanitizedMessage = message.trim().replace(/[<>]/g, '');

    // Check rate limiting (basic)
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    // Get API key from environment
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('[v0] GEMINI_API_KEY not configured');
      return res.status(500).json({ error: 'AI service not configured' });
    }

    // Call Gemini API
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are CahyASTRO, an astronomy AI assistant. Answer questions about astronomy, space, planets, stars, and celestial phenomena in a friendly and educational manner. Keep responses concise (under 150 words). User question: ${sanitizedMessage}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 200
        }
      })
    });

    if (!response.ok) {
      console.error('[v0] Gemini API error:', response.status);
      return res.status(500).json({ error: 'AI service error' });
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'I could not generate a response.';

    return res.status(200).json({
      success: true,
      message: sanitizedMessage,
      response: aiResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('[v0] Chat endpoint error:', error.message);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
