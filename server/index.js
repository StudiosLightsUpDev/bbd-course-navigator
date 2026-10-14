import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/buildings', (req, res) => {
  res.json(db.prepare('SELECT * FROM buildings').all());
});

app.get('/api/venues', (req, res) => {
  res.json(db.prepare('SELECT * FROM venues').all());
});

app.patch('/api/venues/:id/status', (req, res) => {
  const { status, current_event } = req.body;
  db.prepare('UPDATE venues SET status = COALESCE(?, status), current_event = COALESCE(?, current_event) WHERE id = ?')
    .run(status, current_event, req.params.id);
  res.json({ success: true, id: req.params.id });
});

app.post('/api/tickets', (req, res) => {
  const { category, name, message } = req.body;
  const ticketId = 'BBD-' + Date.now().toString(36).slice(-4).toUpperCase();
  db.prepare('INSERT INTO tickets (id, category, name, message) VALUES (?, ?, ?, ?)').run(ticketId, category, name || 'Student', message);
  res.status(201).json({ id: ticketId, status: 'Open' });
});

app.listen(PORT, () => {
  console.log(`BBD Backend running at http://localhost:${PORT}`);
});