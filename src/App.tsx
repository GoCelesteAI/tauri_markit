import { useEffect, useState } from "react";
import Database from "@tauri-apps/plugin-sql";
import "./App.css";

interface Bookmark {
  id: number;
  url: string;
  title: string;
  visited_at: number | null;
}

export default function App() {
  const [db, setDb] = useState<Database | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  const refresh = (d: Database) =>
    d.select<Bookmark[]>("SELECT * FROM bookmarks ORDER BY id DESC")
     .then(setBookmarks);

  useEffect(() => {
    Database.load("sqlite:markit.db").then((d) => {
      setDb(d);
      refresh(d);
    });
  }, []);

  const add = async () => {
    if (!db || !url || !title) return;
    await db.execute(
      "INSERT INTO bookmarks (url, title, created_at) VALUES ($1, $2, $3)",
      [url, title, Date.now()]
    );
    setUrl("");
    setTitle("");
    refresh(db);
  };

  const visit = async (id: number) => {
    if (!db) return;
    await db.execute(
      "UPDATE bookmarks SET visited_at = $1 WHERE id = $2",
      [Date.now(), id]
    );
    refresh(db);
  };

  return (
    <main className="container">
      <h1>Markit</h1>
      <div className="row">
        <input placeholder="https://..." value={url}
               onChange={(e) => setUrl(e.target.value)} />
        <input placeholder="title" value={title}
               onChange={(e) => setTitle(e.target.value)} />
        <button onClick={add}>Add</button>
      </div>
      <ul className="list">
        {bookmarks.map((b) => (
          <li key={b.id} onClick={() => visit(b.id)}>
            <span className="title">{b.title}</span>
            <span className="url">{b.url}</span>
            <span className="visited">{b.visited_at ? "✓ visited" : ""}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
