# Algo Zeus Landing

Landing page built with Next.js 14 and static export output.

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

This project is configured to deploy at root path on Vercel.

1. Import the repository into Vercel.
2. Keep default build command: `npm run build`.
3. Keep default output behavior for Next.js.
4. Deploy.

If you previously had 404 after successful build, redeploy after pulling latest changes so `basePath` is not forced to `/hedge-fund-landing` on Vercel.

## GitHub Pages deployment

For subpath hosting, set:

```bash
NEXT_PUBLIC_BASE_PATH=/hedge-fund-landing npm run build
```

Then publish the generated `out` directory using your Pages workflow.
