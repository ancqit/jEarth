# jEarth

Junction earth desk: a **waste search** homepage (item → waste type + how to dispose, Hindi/English), plus the full **waste guidebook**, **mushroom farm**, and **Junction style guide**.

- Angular 19 frontend (`frontend/`)
- Visual language from [jtoday](https://github.com/ancqit/jtoday) / [junctionFrontweb](https://github.com/ancqit/junctionFrontweb) (forest, gold, paper, DM Sans)
- i18n follows the jtoday protocol: `core/i18n/translations.ts` (`hi` / `en`), `I18nService`, `| t` pipe; default language Hindi
- Catalog and bag bookings via [junctionBack](https://github.com/ancqit/junctionBack)
- Vercel: `vercel.json` at the repo root **and** in `frontend/`

## Local

```bash
cd frontend
npm install
npm start
```

Proxy: `/api` → junctionBack.

## Homepage

`/` is a waste archive search: type an item (peel, bottle, battery…) and get stream + disposal steps. Archive lives in `frontend/src/app/data/waste-archive.ts`.

## Guidebook

`/guide` chapters on types, how to check, disposal, household SOP, compost, prevention, rules/colour codes, workplaces. `/sort` is the check lab. `/heroes` visits waste-hero countries.

## Mushrooms

`/mushrooms` — bay cameras, yield ranges, book bags as junctionBack orders.
