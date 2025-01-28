const express = require('express');
const cors = require('cors');
const path = require('path');  // Importa il modulo path per gestire i percorsi dei file
const { Client } = require('pg');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));
app.use(cors()); 
app.use(bodyParser.json());
const port = 3000;
const ip = '127.0.0.1';


// La tua stringa di connessione Neon DB
const connectionString = 'postgresql://personalnotes_owner:JA8y7SZCBFbl@ep-autumn-block-a9w6vfqn.gwc.azure.neon.tech/personalnotes?sslmode=require';

// Creazione del client
const client = new Client({
  connectionString: connectionString,
});

client.connect()
  .then(() => console.log('Connesso con successo al database Neon!'))
  .catch(err => console.error('Errore durante la connessione:', err.stack));

// async function connectToDB() {
//   try {
//     // Connessione al database
//     await client.connect();
//     console.log('Connesso con successo al database Neon!');
    
//     // Esegui le query qui, ad esempio:
//     const res = await client.query('SELECT NOW()');
//     console.log(res.rows[0]);
//   } catch (err) {
//     console.error('Errore durante la connessione:', err.stack);
//   } finally {
//     // Chiudi la connessione
//     await client.end();
//   }
// }

// connectToDB();
// Connessione al database

// Crea una route per ottenere le categorie
app.get('/categorie', (req, res) => {
  // Query per ottenere gli utenti dal database
  client.query("SELECT * FROM categorie", (err, result) => {
    if (err) {
        console.error('Errore durante la query:', err.stack);
        return res.status(500).send('Errore durante la query');
    }
    // Rispondi con i risultati della query come JSON
    res.json(result.rows);
  });
  
});



// Crea una route per ottenere le categorie
// app.post('/categorieascelta', (req, res) => {
//   // Query per ottenere gli utenti dal database
//   const query = "SELECT * FROM categorie c INNER JOIN note no ON c.idc = no.idc INNER JOIN accesso a ON a.idn = no.idn WHERE a.email = '$1'";
//   client.query(query, [email], (err, result) => {
//     res.json(result.rows);
//     });
// });


app.post('/categorieascelta', (req, res) => {
  // Assumiamo che l'email venga passata nel body della richiesta
  const email = req.body.email;

  if (!email) {
    return res.status(400).json({ error: 'Email mancante' });
  }

  // Query con parametri per evitare SQL Injection
  const query = `
    SELECT * 
    FROM appartenenza a
    INNER JOIN categorie c ON c.idc = a.idc
    WHERE a.email = $1
    ORDER BY c.idc
  `;

  // Esegui la query
  client.query(query, [email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Errore nel database' });
    }
    res.json(result.rows);
  });
});

app.post('/noteascelta', (req, res) => {
  // Assumiamo che l'email venga passata nel body della richiesta
  const email = req.body.email;

  if (!email) {
    return res.status(400).json({ error: 'Email mancante' });
  }

  // Query con parametri per evitare SQL Injection
  const query = `
    SELECT * 
    FROM note no 
    INNER JOIN accesso a ON a.idn = no.idn 
    WHERE a.email = $1 AND idc IS NULL
  `;

  // Esegui la query
  client.query(query, [email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Errore nel database' });
    }
    res.json(result.rows);
  });
});

// Crea una route per ottenere le note
app.get('/note', (req, res) => {
  // Query per ottenere gli utenti dal database
  client.query("SELECT * FROM note ORDER BY titolo", (err, result) => {
    if (err) {
        console.error('Errore durante la query:', err.stack);
        return res.status(500).send('Errore durante la query');
    }
    // Rispondi con i risultati della query come JSON
    res.json(result.rows);
  });
  
});

// Crea una route per ottenere le note
app.get('/utenti', (req, res) => {
  // Query per ottenere gli utenti dal database
  client.query("SELECT * FROM utenti", (err, result) => {
    if (err) {
        console.error('Errore durante la query:', err.stack);
        return res.status(500).send('Errore durante la query');
    }
    // Rispondi con i risultati della query come JSON
    res.json(result.rows);
  });
  
});



app.post('/accessoutente', (req, res) => {
  let {email} = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email mancante' });
  }
  // Esegui una query sul database

  const query = "SELECT password FROM utenti WHERE email = $1";
  client.query(query, [email], (err, result) => {
      if (err) {
          console.error('Errore durante l\'esecuzione della query:', err);
          return res.status(500).json({ message: 'Errore interno del server' });
      }
      if (result.rows.length > 0) {
        return res.json({ success: true, password: result.rows[0].password });
      } else {
        return res.json({ success: false });
      }
  });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'BetterHTML', 'better_nota.html'));  //public\HTMLpages\index.html
});

app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
    });

