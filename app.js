const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: 'https://wrammm.github.io',
  })
);

// GET all jokes
app.get('/jokes', async (req, res) => {
  const result = await db.query('SELECT * FROM jokes ORDER BY id DESC');
  res.json(result.rows);
});

// POST a new joke
app.post('/jokes', async (req, res) => {
  const { text } = req.body;
  const result = await db.query('INSERT INTO jokes (text) VALUES ($1) RETURNING *', [text]);
  res.json(result.rows[0]);
});

// DELETE a joke by id
app.delete('/jokes/:id', async (req, res) => {
  await db.query('DELETE FROM jokes WHERE id = $1', [req.params.id]);
  res.json({ message: 'Deleted' });
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
