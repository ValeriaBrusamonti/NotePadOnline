const express = require('express');
const cors = require('cors');
//const path = require('path');  // Importa il modulo path per gestire i percorsi dei file
const { Client } = require('pg');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));
app.use(cors()); 
app.use(bodyParser.json());
const port = 3000;
const ip = '127.0.0.1';


// Configurazione del client PostgreSQL (CockroachDB)
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
// Connessione al database
client.connect()
    .then(() => console.log('Connesso al database PostgreSQL'))
    .catch((err) => console.error('Errore di connessione:', err));

// Crea una route per ottenere le categorie
app.get('/categorie', (req, res) => {
  // Query per ottenere gli utenti dal database
  client.query("SELECT * FROM categoria", (err, result) => {
    if (err) {
        console.error('Errore durante la query:', err.stack);
        return res.status(500).send('Errore durante la query');
    }
    // Rispondi con i risultati della query come JSON
    res.json(result.rows);
  });
  
});

// Crea una route per ottenere le note
app.get('/note', (req, res) => {
  // Query per ottenere gli utenti dal database
  client.query("SELECT * FROM nota", (err, result) => {
    if (err) {
        console.error('Errore durante la query:', err.stack);
        return res.status(500).send('Errore durante la query');
    }
    // Rispondi con i risultati della query come JSON
    res.json(result.rows);
  });
  
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");  // Servi una pagina HTML (index.html)
});

app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
    });
    