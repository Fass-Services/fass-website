interface Env {
  SMTP2GO_API_KEY: string;
  TURNSTILE_SECRET_KEY: string;
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  website: string;
  turnstileToken: string;
}

interface TurnstileVerificationResponse {
  success: boolean;
}

interface RateLimitState {
  count: number;
  windowStartedAt: number;
}

const RECIPIENT = 'info@fassservices.com';
const SENDER = 'Info@fassservices.com';
const RATE_LIMIT_WINDOW_SECONDS = 60;
const RATE_LIMIT_MAX_REQUESTS = 5;

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
    website: data.website.trim().slice(0, 255),
    turnstileToken: sanitizeForHeader(data.turnstileToken).slice(0, 2048),
  };
}

function parseContactPayload(payload: unknown): ContactFormData | null {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const data = payload as Record<string, unknown>;
  const { name, email, message, website, turnstileToken } = data;

  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return null;
  }

  if (typeof website !== 'string' || typeof turnstileToken !== 'string') {
    return null;
  }

  return { name, email, message, website, turnstileToken };
}

async function verifyTurnstileToken(
  token: string,
  secret: string,
  ipAddress: string | null,
): Promise<boolean> {
  const body = new URLSearchParams({
    secret,
    response: token,
  });

  if (ipAddress) {
    body.set('remoteip', ipAddress);
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  if (!response.ok) {
    return false;
  }

  const result = await response.json() as TurnstileVerificationResponse;
  return result.success;
}

async function isRateLimited(ipAddress: string): Promise<boolean> {
  const cache = caches.default;
  const key = new Request(`https://rate-limit.fassservices/contact/${encodeURIComponent(ipAddress)}`);
  const existing = await cache.match(key);
  const now = Date.now();

  let state: RateLimitState = {
    count: 0,
    windowStartedAt: now,
  };

  if (existing) {
    try {
      const parsed = await existing.json() as RateLimitState;
      const withinWindow = now - parsed.windowStartedAt < RATE_LIMIT_WINDOW_SECONDS * 1000;

      state = withinWindow
        ? parsed
        : {
            count: 0,
            windowStartedAt: now,
          };
    } catch (error) {
      console.warn('Failed to parse rate limit cache entry', error);
    }
  }

  state.count += 1;

  await cache.put(
    key,
    new Response(JSON.stringify(state), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `max-age=${RATE_LIMIT_WINDOW_SECONDS}`,
      },
    }),
  );

  return state.count > RATE_LIMIT_MAX_REQUESTS;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const payload = await context.request.json();
    const data = parseContactPayload(payload);

    if (!data) {
      return new Response(JSON.stringify({ error: 'Invalid request payload' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const ipAddress = context.request.headers.get('CF-Connecting-IP') ?? 'unknown';

    if (await isRateLimited(ipAddress)) {
      return new Response(JSON.stringify({ error: 'Too many requests. Please try again later.' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const sanitized = sanitizeFormData(data);

    if (sanitized.website) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    if (!sanitized.turnstileToken) {
      return new Response(JSON.stringify({ error: 'Bot verification is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const turnstileValid = await verifyTurnstileToken(
      sanitized.turnstileToken,
      context.env.TURNSTILE_SECRET_KEY,
      ipAddress,
    );

    if (!turnstileValid) {
      return new Response(JSON.stringify({ error: 'Bot verification failed' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

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
