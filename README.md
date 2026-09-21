# jEarth

Junction earth desk: a detailed **waste guidebook**, a **mushroom farm** shop, and the **Junction style guide**.

- Angular 19 frontend (`frontend/`)
- Visual language from [jtoday](https://github.com/ancqit/jtoday) / [junctionFrontweb](https://github.com/ancqit/junctionFrontweb) (forest, gold, paper, DM Sans)
- Catalog and bag bookings via [junctionBack](https://github.com/ancqit/junctionBack) (`POST /session`, `GET /shops`, `GET /shops/{id}/products`, `POST /orders`)
- Public APIs (no keys): REST Countries, World Bank CO₂, Wikipedia, Open-Meteo, iNaturalist, GBIF, OpenStreetMap Overpass, GitHub Search
- Vercel: `vercel.json` at the repo root **and** in `frontend/`. Install/build detect whether the working directory is the git root or `frontend` (Vercel Root Directory). Do not also force `--prefix frontend` when Root Directory is already `frontend`.

## Local

```bash
cd frontend
npm install
npm start
```

Proxy: `/api` → junctionBack.

## Style guide (for humans + agents)

- Site: **Style** in the top nav opens the full 11-section brand book under `/style` (still on jEarth — Earth / Guide / etc. stay one click away). Deep links: `/style#color`, `#type`, `#components`, `#agents`
- Standalone mirror: `/brand-book/index.html` · prose: `/brand-book/JUNCTION-BRAND-BOOK.md` · raw: `/style.md`
- Covers principles, tokens, Get/map controls, branding builds, agent checklist

## Guidebook

`/guide` plus chapters on types (wet, dry, sanitary, hazardous, e-waste, C&D), how to check waste, disposal, household SOP, compost, prevention, rules/colour codes, workplaces. `/sort` is a 15-item checking lab. `/heroes` visits waste-hero countries.

## Mushrooms

`/mushrooms` — bay cameras, yield ranges, book bags as junctionBack orders (`source: junction.today`).
