/**
 * GhoomoBihar — Shartak AI Listing Assistant
 * 
 * Secure Netlify serverless function proxying requests to Groq API.
 * Translates simple vendor briefs into structured tourism listing drafts.
 * Zero GROQ_API_KEY leakage to frontend client.
 */

const https = require('https');

exports.handler = async function (event, context) {
  // CORS Headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS pre-flight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Preflight OK' })
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed. Use POST.' })
    };
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'GROQ_API_KEY is not configured on the server.'
      })
    };
  }

  try {
    const payload = JSON.parse(event.body || '{}');
    const brief = (payload.brief || '').trim();

    if (!brief) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Please describe your service in a few words.' })
      };
    }

    if (brief.length > 1000) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Brief is too long. Please keep it under 1000 characters.' })
      };
    }

    // Strict system prompt for Bihar tourism listing generation
    const systemPrompt = `You are 'Shartak AI Listing Assistant' for GhoomoBihar, a Bihar tourism platform.
Your task is to take a local vendor's brief description and convert it into a concise, attractive, and structured tourism listing.

CRITICAL RULES:
1. Return ONLY a valid, raw JSON object without markdown formatting, code blocks, or explanations.
2. The JSON object must strictly match this exact schema:
{
  "title": "A concise, catchy title (max 65 chars)",
  "category": "guide|homestay|food|craft|other",
  "description": "Clear, appealing description highlighting local authenticity, experience, and heritage (max 280 chars)",
  "price": "Indicative price with currency symbol if mentioned in brief (e.g. ₹500/tour, ₹1,200/night), or empty string if not mentioned",
  "specialty": "A short 2-5 word key specialty tag (e.g. 2-Hour Heritage Walk, Organic Village Meals, Pure Desi Ghee Litti) (max 45 chars)",
  "openHours": "Operating hours if mentioned in brief (e.g. 06:00-18:00, 24 Hours), or empty string if not mentioned"
}
3. Produce concise, accurate Bihar-tourism listing content based ONLY on the vendor's brief.
4. NEVER invent government licenses, official ratings, 'verified' claims, contact phone numbers, specific addresses, prices, or facts absent from the vendor brief.
5. If price or operating hours are unknown or not in the brief, return an empty string "" for those fields.
6. 'category' must be EXACTLY one of: "guide", "homestay", "food", "craft", "other".`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Vendor Brief: "${brief}"\n\nGenerate the structured JSON listing draft.` }
    ];

    const postData = JSON.stringify({
      model: 'openai/gpt-oss-20b',
      messages: messages,
      temperature: 0.2,
      max_tokens: 1000,
      reasoning_effort: 'low'
    });

    const responseText = await new Promise((resolve, reject) => {
      const req = https.request('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        },
        timeout: 12000
      }, (res) => {
        let data = '';
        res.on('data', chunk => { data += chunk; });
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(data);
          } else {
            reject(new Error(`Groq API returned status ${res.statusCode}: ${data}`));
          }
        });
      });

      req.on('error', err => reject(err));
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Groq API request timed out.'));
      });

      req.write(postData);
      req.end();
    });

    const groqResponse = JSON.parse(responseText);
    let rawContent = groqResponse.choices?.[0]?.message?.content || '{}';

    // Strip any markdown code fences if model included them
    rawContent = rawContent.trim();
    if (rawContent.startsWith('```json')) {
      rawContent = rawContent.slice(7);
    } else if (rawContent.startsWith('```')) {
      rawContent = rawContent.slice(3);
    }
    if (rawContent.endsWith('```')) {
      rawContent = rawContent.slice(0, -3);
    }
    rawContent = rawContent.trim();

    // Extract JSON substring between first { and last }
    const firstBrace = rawContent.indexOf('{');
    const lastBrace = rawContent.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace >= firstBrace) {
      rawContent = rawContent.substring(firstBrace, lastBrace + 1);
    }

    let parsedDraft = {};
    try {
      parsedDraft = JSON.parse(rawContent);
    } catch (parseErr) {
      console.error('Failed to parse Groq JSON:', rawContent);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'AI returned an unreadable draft. Please try again.' })
      };
    }

    // Validate and sanitize fields
    const validCategories = ['guide', 'homestay', 'food', 'craft', 'other'];
    let category = (parsedDraft.category || '').toLowerCase().trim();
    if (!validCategories.includes(category)) {
      category = 'other';
    }

    const validatedDraft = {
      title: typeof parsedDraft.title === 'string' ? parsedDraft.title.slice(0, 70).trim() : '',
      category: category,
      description: typeof parsedDraft.description === 'string' ? parsedDraft.description.slice(0, 300).trim() : '',
      price: typeof parsedDraft.price === 'string' ? parsedDraft.price.slice(0, 30).trim() : '',
      specialty: typeof parsedDraft.specialty === 'string' ? parsedDraft.specialty.slice(0, 50).trim() : '',
      openHours: typeof parsedDraft.openHours === 'string' ? parsedDraft.openHours.slice(0, 25).trim() : ''
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        draft: validatedDraft
      })
    };

  } catch (error) {
    console.error('Error in listing-assistant.js:', error.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Unable to generate AI listing draft at this time. Please try again or fill details manually.'
      })
    };
  }
};
