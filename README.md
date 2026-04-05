# Algo Zeus Landing

Landing page built with Next.js 14.

## Requirements

- Node.js 18+
- npm

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
```

## Vercel deployment

This project is configured for normal Next.js deployment on Vercel.

1. Import the repository into Vercel.
2. Keep default build command: `npm run build`.
3. Keep framework preset as `Next.js`.
4. Deploy.

If you previously had 404 after successful build, redeploy after pulling latest changes because the old GitHub Pages path config was removed.

## Environment variables

Set these in Vercel Project Settings -> Environment Variables:

- `ENZYME_API_TOKEN`
- `ENZYME_VAULT_ADDRESS`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_IDS` (space-separated chat IDs)
- `SPREADSHEET_ID`
- `GOOGLE_SERVICE_ACCOUNT_JSON` (full JSON string for Google service account credentials)

Notes:

- `GOOGLE_SERVICE_ACCOUNT_JSON` is now supported directly for Vercel.
- If `GOOGLE_SERVICE_ACCOUNT_JSON` is not set, the app falls back to a local credentials file named `algozeus-53ef21de39f3.json`.
