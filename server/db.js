import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database(path.join(__dirname, 'campus.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS buildings (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT,
    description TEXT,
    x REAL,
    z REAL,
    scene_id TEXT
  );

  CREATE TABLE IF NOT EXISTS scenes (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    building_id TEXT,
    initial_yaw REAL DEFAULT 0,
    initial_pitch REAL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS hotspots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_scene_id TEXT NOT NULL,
    target_scene_id TEXT NOT NULL,
    yaw REAL NOT NULL,
    pitch REAL NOT NULL,
    label TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS venues (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    status INTEGER DEFAULT 0,
    current_event TEXT,
    start_time TEXT,
    end_time TEXT,
    scene_id TEXT
  );

  CREATE TABLE IF NOT EXISTS tickets (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    name TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'Open',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

export default db;