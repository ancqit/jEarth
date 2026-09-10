# jEarth

Junction earth desk: a detailed **waste guidebook** and a **mushroom farm** shop.

- Angular 19 frontend (`frontend/`)
- Visual language from [jtoday](https://github.com/ancqit/jtoday) / [junctionFrontweb](https://github.com/ancqit/junctionFrontweb) (forest, gold, paper, DM Sans)
- Catalog and bag bookings via [junctionBack](https://github.com/ancqit/junctionBack) (`POST /session`, `GET /shops`, `GET /shops/{id}/products`, `POST /orders`)
- Vercel: root `vercel.json` rewrites `/api` to `https://junctionback.onrender.com`

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

`/mushrooms` — bay cameras, yield ranges, book bags as junctionBack orders (`source: junction.today`).
