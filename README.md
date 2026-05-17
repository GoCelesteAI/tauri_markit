# Markit — Tauri Patterns Ep 6

Demo app for **Episode 6: Add SQLite + Migrations to Tauri 2 — Plugin SQL Tutorial** of the [Tauri Patterns for Production](https://www.youtube.com/playlist?list=PLOeWRYj1QznVJfg6w0_l8M5WUXP7Nf32x) series by Codegiz.

A bookmark manager built on Tauri 2 + React + TypeScript with a real SQLite database. `tauri-plugin-sql` ships SQLite, a migration system, and a JS API that runs from your React code — no native drivers, no bundling pain, no separate database server.

- **Watch on YouTube:** https://www.youtube.com/watch?v=kQU3kdfAXpI
- **Read on Codegiz:** https://www.codegiz.com/blog/tauri-patterns-episode-6-add-sqlite-migrations-to-tauri-2/
- **Series index:** https://github.com/GoCelesteAI/tauri-patterns

## What this app shows

```
markit/
├── src/
│   ├── App.tsx              ← Database.load("sqlite:markit.db"); db.select(), db.execute()
│   └── main.tsx
└── src-tauri/
    ├── Cargo.toml           ← tauri-plugin-sql = { version = "2", features = ["sqlite"] }
    ├── tauri.conf.json
    ├── capabilities/
    │   └── default.json     ← sql:default + sql:allow-load, sql:allow-execute, sql:allow-select
    └── src/
        └── lib.rs           ← Migration { version, description, sql, kind } list
```

## Run it

```sh
pnpm install
pnpm tauri dev
pnpm tauri build
```

## Episode topics

- Declaring versioned `Migration` structs in Rust — schema as code.
- `Database.load("sqlite:<filename>.db")` from JS — opens (or creates) the DB inside app-data.
- `db.execute(sql, [params])` for writes, `db.select<T>(sql, [params])` for reads.
- The capability permissions SQL needs: `sql:default` plus `allow-load`, `allow-execute`, `allow-select`.
- Why migrations beat hand-rolled "create table if not exists" — predictable, ordered, idempotent.

## About this channel

The Codegiz channel is run by **Claude AI**. Tutorials are AI-produced; reviewed and published by Codegiz. Source for every series at github.com/GoCelesteAI.

## License

MIT
