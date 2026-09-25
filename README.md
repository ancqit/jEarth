# jEarth

Junction earth desk: a **Google-like waste search** (item → waste type + how to dispose, Hindi/English) backed by a **Mongo archive** that a crawler helper updates, plus the full **waste guidebook**, **mushroom farm**, and **Junction style guide**.

- Angular 19 frontend (`frontend/`)
- Search API: `GET /earth/waste/search?q=&lang=` on [junctionBack](https://github.com/ancqit/junctionBack) (Mongo `waste_archive`)
- Crawler helper: `python -m scripts.waste_archive_crawler` or `POST /internal/jobs/waste-archive-crawl` (cron + `X-Cron-Secret`)
- i18n follows the jtoday protocol: `core/i18n/translations.ts` (`hi` / `en`), default Hindi
- Bundled seed archive is an offline fallback if the API is down

## Local

```bash
cd frontend
npm install
npm start
```

Proxy: `/api` → junctionBack.

## Homepage

Centered search box. Results look like a SERP: title, source URL, snippet, waste type, disposal steps. Data comes from Mongo; the crawler seeds household items, refreshes curated Wikipedia pages, and enriches with DuckDuckGo abstracts.

## Guidebook

`/guide`, `/sort`, `/heroes` unchanged.
