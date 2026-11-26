import assert from 'node:assert/strict';
import { test } from 'node:test';
import worker from './index.js';

const env = {
  ALLOWED_ORIGINS: 'https://www.comstratus.ca,http://localhost:4321',
  GMAIL_CLIENT_ID: 'test-client-id',
  GMAIL_CLIENT_SECRET: 'test-client-secret',
  GMAIL_REFRESH_TOKEN: 'test-refresh-token',
  GMAIL_SENDER: 'hassan.aithssain@gmail.com',
};

test('rejects requests from origins outside the allowlist', async () => {
  const request = new Request('https://worker.example/', {
    method: 'POST',
    headers: {
      Origin: 'https://untrusted.example',
      'Content-Type': 'application/json',
    },
    body: '{}',
  });

  const result = await worker.fetch(request, env);
  assert.equal(result.status, 403);
});

test('sends the localized contact message using Gmail API', async (context) => {
  const originalFetch = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (input, init) => {
    calls.push({ url: String(input), init });
    if (String(input) === 'https://oauth2.googleapis.com/token') {
      return Response.json({ access_token: 'test-access-token' });
    }
    return Response.json({ id: 'test-message-id' });
  };
  context.after(() => {
    globalThis.fetch = originalFetch;
  });

  const request = new Request('https://worker.example/', {
    method: 'POST',
    headers: {
      Origin: 'https://www.comstratus.ca',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      locale: 'fr',
      subject: 'Conseil en technologies de l’information',
      firstName: 'Camille',
      lastName: 'Test',
      email: 'camille@example.ca',
      phone: '',
      company: 'Exemple',
      project: 'Bonjour, voici mon projet.',
      website: '',
    }),
  });

  const result = await worker.fetch(request, env);
  assert.equal(result.status, 200);
  assert.equal(result.headers.get('Access-Control-Allow-Origin'), 'https://www.comstratus.ca');
  assert.equal(calls.length, 2);

  const gmailRequest = calls[1];
  assert.equal(gmailRequest.url, 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send');
  assert.equal(gmailRequest.init.headers.Authorization, 'Bearer test-access-token');

  const { raw } = JSON.parse(gmailRequest.init.body);
  const rawMessage = Buffer.from(raw.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8');
  assert.match(rawMessage, /^To: hassan\.aithssain@gmail\.com$/m);
  assert.match(rawMessage, /^Reply-To: camille@example\.ca$/m);
  assert.match(rawMessage, new RegExp(`^Subject: =\\?UTF-8\\?B\\?${Buffer.from('comstratus.ca - Conseil en technologies de l’information').toString('base64')}\\?=$`, 'm'));

  const encodedBody = rawMessage.split('\r\n\r\n').at(-1).replace(/\s/g, '');
  const decodedBody = Buffer.from(encodedBody, 'base64').toString('utf8');
  assert.match(decodedBody, /Prénom: Camille/);
  assert.match(decodedBody, /Projet:\r\nBonjour, voici mon projet\./);
});
