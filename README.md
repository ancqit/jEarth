# jEarth

Junction earth desk: a detailed **waste guidebook** and a **mushroom farm** shop.

- Angular 19 frontend (`frontend/`)
- Visual language from [jtoday](https://github.com/ancqit/jtoday) / [junctionFrontweb](https://github.com/ancqit/junctionFrontweb) (forest, gold, paper, DM Sans)
- Harvest bookings via [junctionBack](https://github.com/ancqit/junctionBack) (`POST /session`, `GET /shops`, `GET /shops/{id}/products`, `POST /orders`)
- Public APIs (no keys): REST Countries, World Bank CO₂, Wikipedia, Open-Meteo, iNaturalist, GBIF, OpenStreetMap Overpass, GitHub Search
- Vercel: `vercel.json` at the repo root **and** in `frontend/`. Install/build detect whether the working directory is the git root or `frontend` (Vercel Root Directory). Do not also force `--prefix frontend` when Root Directory is already `frontend`.

## Local

```bash
cd frontend
npm install
npm start
```

Proxy: `/api` → junctionBack.

## Guidebook

`/guide` plus chapters on types (wet, dry, sanitary, hazardous, e-waste, C&D), how to check waste, disposal, household SOP, compost, prevention, rules/colour codes, workplaces. `/sort` is a 15-item checking lab. `/heroes` visits waste-hero countries.

## Mushrooms

`/mushrooms` — bay cameras, growing cycle (oyster / milky / button), pack weights, book fresh mushrooms as junctionBack orders (`source: junction.today`). Guide chapter: `/guide/mushroom-growing-cycle`.
