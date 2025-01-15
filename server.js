const express = require('express');
const { Client } = require('pg'); // Importa la libreria per PostgreSQL
const path = require('path'); // Per gestire i percorsi dei file
const app = express();
app.use(express.json());
const port = 3000;

app.use(express.static(__dirname));

const client = new Client({
  user: 'annalisabosi', 
  host: 'personalnotes-3655.jxf.gcp-europe-west1.cockroachlabs.cloud', 
  database: 'defaultdb', 
  password: 'E5HTFnbAe-yrqvMPj9ZC1w', 
  port: 26257,
  ssl: { 
    rejectUnauthorized: false // Impostare come true per un certificato SSL
  }
});

client.connect().then(() => console.log('Connesso al database!'));

// Serve la pagina HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint per confrontare i dati
app.post('/confronta', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await client.query('SELECT * FROM utente WHERE email = $1 AND password = $2', [email, password]);

    if (result.rows.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    console.error('Errore durante la query:', err);
    res.status(500).json({ success: false });
  }
});

// Avvia il server
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});