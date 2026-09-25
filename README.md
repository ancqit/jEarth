# jEarth

Junction earth is **two desks** (separation of concerns):

1. **Waste search** (`/`) — Google-like archive search: item → waste type + how to dispose (Hindi/English). Guide, check lab, heroes, nearby belong here.
2. **Mushroom farm** (`/mushrooms`) — watch bays, book grow bags via junctionBack. Separate product surface.

Shared chrome only: style book (`/style`), language toggle, junction.today link.

- Angular 19 frontend (`frontend/`)
- Waste search API: `GET /earth/waste/search` on [junctionBack](https://github.com/ancqit/junctionBack) (Mongo `waste_archive` + crawler helper)
- i18n follows jtoday: `core/i18n/translations.ts` (`hi` / `en`), default Hindi

## Local

```bash
cd frontend
npm install
npm start
```

Proxy: `/api` → junctionBack.

## Desks

| Desk | Routes | Job |
|------|--------|-----|
| Waste | `/`, `/guide`, `/sort`, `/heroes`, `/nearby` | Search + educate on waste |
| Grow | `/mushrooms` | Farm cameras + bag booking |
| Style | `/style` | Brand book (shared, not a desk product) |
