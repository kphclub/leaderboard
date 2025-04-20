# KPH Leaderboard Static Frontend

This is a static frontend for the KPH Leaderboard that can be deployed to Netlify, Vercel, GitHub Pages, or any other static site hosting service.

## Setup

1. Update the API base URL in `js/api.js`:

```js
const API_BASE_URL = 'https://your-worker-url.workers.dev';
```

Replace `your-worker-url.workers.dev` with the actual URL where your Cloudflare Worker API is hosted.

## Deployment

### Netlify

1. Sign up for a [Netlify](https://www.netlify.com/) account if you don't have one.
2. From the Netlify dashboard, click "New site from Git" or drag and drop the `static-frontend` folder into the Netlify UI.
3. Follow the prompts to deploy your site.

### Vercel

1. Sign up for a [Vercel](https://vercel.com/) account if you don't have one.
2. From the Vercel dashboard, click "New Project" and import your repository or upload the `static-frontend` folder.
3. Follow the prompts to deploy your site.

### GitHub Pages

1. Create a new repository on GitHub.
2. Push the contents of the `static-frontend` folder to your repository.
3. Enable GitHub Pages in the repository settings.

## Structure

- `index.html` - Main leaderboard page
- `launches.html` - Product launches leaderboard
- `chat.html` - Chat leaderboard with weekly/monthly tabs
- `js/api.js` - API utilities and shared functions
- `js/main.js` - Main page JavaScript
- `js/launches.js` - Launches page JavaScript
- `js/chat.js` - Chat page JavaScript

## CORS Configuration

Make sure your Cloudflare Worker has the appropriate CORS headers to allow requests from your static frontend domain. Add the following headers to your API responses:

```js
// Add these headers to your API responses
response.headers.set('Access-Control-Allow-Origin', '*'); // Or specify your frontend domain
response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
```

## Features

- Responsive design using Tailwind CSS
- Tabs for switching between weekly and monthly chat data
- Fetches data from your API endpoints
- Matches the look and feel of the original worker-rendered pages 