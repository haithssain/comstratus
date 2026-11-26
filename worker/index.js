const recipient = 'hassan.aithssain@gmail.com';

const subjects = {
  fr: [
    'Conseil en technologies de l’information',
    'IA et digitalisation',
    'Services associés',
  ],
  en: [
    'IT consulting',
    'AI and digitalization',
    'Related services',
  ],
  ar: [
    'استشارات تقنية المعلومات',
    'الذكاء الاصطناعي والتحول الرقمي',
    'خدمات مساندة',
  ],
};

const labels = {
  fr: {
    subject: 'Sujet',
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'Courriel',
    phone: 'Téléphone',
    company: 'Entreprise',
    project: 'Projet',
  },
  en: {
    subject: 'Subject',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    phone: 'Phone',
    company: 'Company',
    project: 'Project',
  },
  ar: {
    subject: 'الموضوع',
    firstName: 'الاسم الأول',
    lastName: 'اسم العائلة',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    company: 'الشركة',
    project: 'المشروع',
  },
};

function response(body, status, corsHeaders) {
  return new Response(body, {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function base64Utf8(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  for (let offset = 0; offset < bytes.length; offset += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
  }
  return btoa(binary);
}

function base64UrlUtf8(value) {
  return base64Utf8(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function requiredText(value, maxLength) {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= maxLength;
}

async function getAccessToken(env) {
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: env.GMAIL_CLIENT_ID,
      client_secret: env.GMAIL_CLIENT_SECRET,
      refresh_token: env.GMAIL_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  });

  if (!tokenResponse.ok) {
    throw new Error(`Google OAuth token request failed (${tokenResponse.status})`);
  }

  const token = await tokenResponse.json();
  if (typeof token.access_token !== 'string') {
    throw new Error('Google OAuth response did not contain an access token');
  }
  return token.access_token;
}

async function sendEmail(env, email, mailSubject, body) {
  const accessToken = await getAccessToken(env);
  const encodedBody = base64Utf8(body).replace(/.{1,76}/g, '$&\r\n');
  const rawMessage = [
    `From: ${env.GMAIL_SENDER}`,
    `To: ${recipient}`,
    `Reply-To: ${email}`,
    `Subject: =?UTF-8?B?${base64Utf8(mailSubject)}?=`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    encodedBody,
  ].join('\r\n');

  const sendResponse = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw: base64UrlUtf8(rawMessage) }),
  });

  if (!sendResponse.ok) {
    throw new Error(`Gmail API send request failed (${sendResponse.status})`);
  }
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');
    const allowedOrigins = env.ALLOWED_ORIGINS.split(',').map((item) => item.trim());
    if (!origin || !allowedOrigins.includes(origin)) {
      return response(JSON.stringify({ error: 'Origin not allowed' }), 403, {});
    }

    const corsHeaders = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      Vary: 'Origin',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }
    if (request.method !== 'POST') {
      return response(JSON.stringify({ error: 'Method not allowed' }), 405, corsHeaders);
    }
    if (!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json')) {
      return response(JSON.stringify({ error: 'Content-Type must be application/json' }), 415, corsHeaders);
    }

    const contentLength = Number(request.headers.get('Content-Length') || 0);
    if (contentLength > 65536) {
      return response(JSON.stringify({ error: 'Request is too large' }), 413, corsHeaders);
    }

    let data;
    try {
      data = await request.json();
    } catch {
      return response(JSON.stringify({ error: 'Invalid JSON' }), 400, corsHeaders);
    }

    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      return response(JSON.stringify({ error: 'Invalid form data' }), 400, corsHeaders);
    }
    if (typeof data.website === 'string' && data.website.trim()) {
      return response(JSON.stringify({ error: 'Invalid form submission' }), 400, corsHeaders);
    }

    const locale = data.locale;
    const localeSubjects = subjects[locale];
    if (
      !localeSubjects
      || !localeSubjects.includes(data.subject)
      || !requiredText(data.firstName, 40)
      || !requiredText(data.lastName, 80)
      || !requiredText(data.email, 254)
      || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
      || !requiredText(data.project, 10000)
      || (data.phone != null && (typeof data.phone !== 'string' || data.phone.length > 40))
      || (data.company != null && (typeof data.company !== 'string' || data.company.length > 255))
    ) {
      return response(JSON.stringify({ error: 'Invalid form data' }), 400, corsHeaders);
    }

    const hostname = new URL(origin).hostname.toLowerCase();
    const domain = hostname.endsWith('comstratus.com') ? 'comstratus.com' : 'comstratus.ca';
    const mailSubject = `${domain} - ${data.subject}`;
    const textLabels = labels[locale];
    const message = [
      `${textLabels.subject}: ${data.subject}`,
      '',
      `${textLabels.firstName}: ${data.firstName.trim()}`,
      `${textLabels.lastName}: ${data.lastName.trim()}`,
      `${textLabels.email}: ${data.email.trim()}`,
      `${textLabels.phone}: ${data.phone?.trim() || '-'}`,
      `${textLabels.company}: ${data.company?.trim() || '-'}`,
      '',
      `${textLabels.project}:`,
      data.project.trim().replace(/\r\n?/g, '\n').replace(/\n/g, '\r\n'),
    ].join('\r\n');

    if (!env.GMAIL_CLIENT_ID || !env.GMAIL_CLIENT_SECRET || !env.GMAIL_REFRESH_TOKEN || !env.GMAIL_SENDER) {
      console.error('Contact email is not configured in the Worker secrets.');
      return response(JSON.stringify({ error: 'Email delivery is not configured' }), 503, corsHeaders);
    }

    try {
      await sendEmail(env, data.email.trim(), mailSubject, message);
      return response(JSON.stringify({ ok: true }), 200, corsHeaders);
    } catch (error) {
      console.error('Contact email delivery failed:', error instanceof Error ? error.message : 'Unknown error');
      return response(JSON.stringify({ error: 'Email delivery failed' }), 502, corsHeaders);
    }
  },
};
