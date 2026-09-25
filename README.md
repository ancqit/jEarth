# jEarth

Junction earth is **two desks**:

1. **Waste search** (`/`) — item → waste type + disposal (Hindi/English), Mongo archive + crawler.
2. **Mushroom farm aggregator** (`/mushrooms`) — Junction **city/locality pickers** (style-guide modal), growers (cycle stage + day), apartments → flat popup → order with searchable grower dropdown + PDF. Admin at `/mushrooms/admin`. Legacy farm page at `/mushrooms/dump`.

## Local

```bash
cd frontend
npm install
npm start
```

Proxy: `/api` → junctionBack (`/earth/farm/search`, `/locations/cities`, `/orders`).
