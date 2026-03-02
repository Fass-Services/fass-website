interface Env {
  SMTP2GO_API_KEY: string;
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const RECIPIENT = 'info@fassservices.com';
const SENDER = 'Info@fassservices.com';

/**
 * Escapes HTML special characters to prevent XSS attacks
 */
function escapeHtml(text: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  return text.replace(/[&<>"'/]/g, (char) => htmlEscapes[char]);
}

/**
 * Sanitizes input to prevent email header injection attacks
 */
function sanitizeForHeader(text: string): string {
  return text.replace(/[\r\n]/g, ' ').trim();
}

/**
 * Validates email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitizes all form data
 */
function sanitizeFormData(data: ContactFormData): ContactFormData {
  return {
    name: sanitizeForHeader(data.name).slice(0, 100),
    email: sanitizeForHeader(data.email).slice(0, 254),
    message: data.message.trim().slice(0, 5000),
  };
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const data = await context.request.json() as ContactFormData;
    const sanitized = sanitizeFormData(data);

    // Validate email format
    if (!isValidEmail(sanitized.email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Validate required fields
    if (!sanitized.name || !sanitized.message) {
      return new Response(JSON.stringify({ error: 'Name and message are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Escape HTML for safe rendering
    const safeName = escapeHtml(sanitized.name);
    const safeEmail = escapeHtml(sanitized.email);
    const safeMessage = escapeHtml(sanitized.message);

    const response = await fetch('https://api.smtp2go.com/v3/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: context.env.SMTP2GO_API_KEY,
        sender: `FASS Website <${SENDER}>`,
        to: [RECIPIENT],
        subject: `FASS Website Contact: ${safeName}`,
        html_body: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Message:</strong></p>
          <p>${safeMessage.replace(/\n/g, '<br>')}</p>
        `,
        text_body: `Name: ${sanitized.name}\nEmail: ${sanitized.email}\nMessage: ${sanitized.message}`,
        custom_headers: [
          { header: 'Reply-To', value: sanitized.email }
        ]
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('SMTP2GO error:', result);
      return new Response(JSON.stringify({ error: 'Failed to send email' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
