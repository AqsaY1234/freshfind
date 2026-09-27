# FreshFind — Fresh All Along

FreshFind is a frontend-only React SPA (built for eGreen Basket / Web Innovation Unleashed) that helps residents find nearby farmers markets, see what produce is in season, and bookmark their favorite stalls. There's no backend — everything runs in the browser, and all market and produce information is loaded from bundled JSON files.

## What to expect from the demo

The Login and Sign Up screens exist for design continuity only; nothing typed into them is stored or sent anywhere. The chat assistant in the corner answers from `src/data/bot_data.json` plus simple keyword matching — it isn't calling a live AI service, so it works best with short, direct questions.

Bookmarks are saved to `localStorage`, so they persist on the device and browser you used to save them, but won't follow you to a different browser or device. Personal notes on the Bookmarks page use `sessionStorage` instead, so they only last for your current browser session and clear once the tab is closed.

"Open now" status is calculated from the visitor's real device date and time against each market's listed days and hours. Proximity sorting and the "nearest to you" callout on the Home page use the browser's Geolocation API when the visitor allows it, compared against each market's sample `lat`/`lng` coordinates in `m_data.json`. On the Contact page, the "your live location" map also relies on Geolocation — if permission is denied, the page simply falls back to showing the office contact details instead.

## Stack

Built with React, React Router and Bootstrap 5, bundled with Vite, with AOS handling scroll animation. All content comes from static JSON data files rather than an API.

## Running it locally

Install Node.js (LTS), then open a terminal in this project folder and run:

```
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173/`).

For a production build, run `npm run build` followed by `npm run preview`, then upload the resulting `dist` folder to any static host. A live URL can be added here for judges once deployed.

## Main pages

- **Home** — search panel, rotating featured markets, seasonal picks, live clock, visitor counter
- **Market Directory** — filter and sort by A–Z, area, next open day, or nearest to you
- **Market detail** — address, weekly hours, embedded map, available produce, share/save
- **Produce Guide** — category filter, seasons, links back to the markets that carry each item
- **Bookmarks** — saved markets and produce, session notes, formatted export, social share
- **Chat assistant** — quick-reply buttons or typed questions, with links straight to relevant pages
- **About, Contact, and the dummy Login/Sign Up screens**