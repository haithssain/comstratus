# Contact form email Worker

The Astro site is static, so direct email delivery is handled by this Cloudflare
Worker. It sends mail through the Gmail API and keeps OAuth credentials out of
the browser.

## Configure Gmail API access

1. In Google Cloud Console, create a project, enable the Gmail API, and create
   an OAuth client.
2. Obtain a refresh token for the account that will send the form messages with
   the `https://www.googleapis.com/auth/gmail.send` scope. The sender account
   must be `hassan.aithssain@gmail.com` or an address authorized to send from
   that Gmail account.
3. Keep the OAuth client secret and refresh token private. Do not put them in
   the site source or GitHub Pages build variables.

For long-term use, publish/verify the OAuth consent screen as required by
Google. Refresh tokens for an external OAuth app left in testing mode can expire
after seven days.

## Deploy the Worker

From the repository root, authenticate Wrangler and deploy:

```powershell
npx wrangler@4 login
npx wrangler@4 deploy --config worker/wrangler.jsonc
```

Set the Gmail credentials as Worker secrets. Wrangler prompts for each value:

```powershell
npx wrangler@4 secret put GMAIL_CLIENT_ID --config worker/wrangler.jsonc
npx wrangler@4 secret put GMAIL_CLIENT_SECRET --config worker/wrangler.jsonc
npx wrangler@4 secret put GMAIL_REFRESH_TOKEN --config worker/wrangler.jsonc
npx wrangler@4 secret put GMAIL_SENDER --config worker/wrangler.jsonc
```

`GMAIL_SENDER` must be the Gmail account authorized by the refresh token. The
Worker URL is printed by `wrangler deploy` and will look like
`https://comstratus-contact.<account-subdomain>.workers.dev`.

## Connect GitHub Pages to the Worker

In the GitHub repository, add the Actions variable `PUBLIC_CONTACT_API_URL` with
the deployed Worker URL. Then rerun the **Deploy Astro to GitHub Pages**
workflow (or push a commit to `main`). The contact form uses this URL at build
time.

The Worker only accepts requests from the production Comstratus domains and
localhost development URLs listed in `worker/wrangler.jsonc`.
