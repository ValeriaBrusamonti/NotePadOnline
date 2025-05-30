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
const connectionString = 'postgresql://personalnotes_owner:JA8y7SZCBFbl@ep-autumn-block-a9w6vfqn-pooler.gwc.azure.neon.tech/personalnotes?sslmode=require';

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


app.post('/aggiungiaccesso', (req, res) => {
  const { idn, email } = req.body;

  if (!idn || !email) {
    return res.status(400).json({ error: 'Id o email mancanti' });
  }

  // Query con parametri per evitare SQL Injection
  const query = `
    INSERT INTO accesso(email, idn) OVERRIDING SYSTEM VALUE VALUES($1, $2)
  `;

  // Esegui la query con i parametri passati
  client.query(query, [email, idn], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Errore nel database' });
    }

    // Rispondi al client una volta completata la query
    console.log("Accesso aggiunto con successo");
    res.status(201).json({ message: 'Accesso aggiunto con successo' });
  });
});

app.post('/creanota', (req, res) => {
  const { idn } = req.body;

  if (!idn) {
    return res.status(400).json({ error: 'Id mancante' });
  }

  // Query con parametri per evitare SQL Injection
  const query = `
    INSERT INTO note(idn, titolo, contenuto, data_creazione, idc)
    OVERRIDING SYSTEM VALUE VALUES($1, 'Nota senza nome', null, null, null)
  `;

  // Esegui la query con i parametri passati
  client.query(query, [idn], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Errore nel database' });
    }

    // Rispondi al client una volta completata la query
    console.log("Nota creata con successo");
    res.status(201).json({ message: 'Nota creata con successo' });
  });
});



// app.post('/creanota', (req, res) => {
//   // Assumiamo che l'email venga passata nel body della richiesta
//   const idn = req.body.idn;

//   if (!idn) {
//     return res.status(400).json({ error: 'Id mancante' });
//   }

//   // Query con parametri per evitare SQL Injection
//   const query = `
//     INSERT INTO note(idn, titolo, contenuto, data_creazione, idc) OVERRIDING SYSTEM VALUE VALUES($1, 'Nota senza nome', null, null, null)
//   `;

//   // Esegui la query
//   client.query(query, [idn], (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: 'Errore nel database' });
//     }
//     return console.log("Nota creata")
//   });
// });

// app.post('/aggiungiaccesso', (req, res) => {

//   const idn = req.body.idn;
//   const email = req.body.email;

//   if (!idn) {
//     return res.status(400).json({ error: 'Id mancante' });
//   }

//   // Query con parametri per evitare SQL Injection
//   const query = `
//     INSERT INTO accesso(email,idn) OVERRIDING SYSTEM VALUE VALUES($1,$2)
//   `;

//   // Esegui la query
//   client.query(query, [email],[idn], (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: 'Errore nel database' });
//     }
//     return console.log("Nota creata")
//   });
// });


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

app.post('/salvanota', (req, res) => {
  // Assumiamo che l'email venga passata nel body della richiesta
  const id= req.body.id;
  const title = req.body.title;
  const content = req.body.content;
  if (!title||!content) {
    return res.status(400).json({ error: 'Email mancante' });
  }

  // Query con parametri per evitare SQL Injection
  const query = `
  UPDATE note
  SET titolo = $1,
      contenuto = $2
  WHERE idn = $3;
`;
client.query(query, [title, content, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Errore nel database' });
    }
    res.json(result.rows);
  });
});

app.post('/info_utente', (req, res) => {
  // Assumiamo che l'email venga passata nel body della richiesta
  const email = req.body.email;

  if (!email) {
    return res.status(400).json({ error: 'Email mancante' });
  }

  // Query con parametri per evitare SQL Injection
  const query = `SELECT * FROM utenti WHERE email = $1`;

  // Esegui la query
  client.query(query, [email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Errore nel database' });
    }
    res.json(result.rows);
  });
});


app.post('/loadnota', (req, res) => {
  const id = req.body.id;

  if (!id) {
    return res.status(400).json({ error: 'ID mancante' });
  }

  const query = `
    SELECT idc, titolo, contenuto
    FROM note
    WHERE idn = $1
  `;

  client.query(query, [id], (err, result) => {
    if (err) {
      console.error('Errore DB:', err);
      return res.status(500).json({ error: 'Errore nel database' });
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Nota non trovata' });
    }

    res.json(result.rows[0]);
  });
});


//note con la relativa categoria PER SEZIONE REPORTISTICA
app.get('/note_categorie', (req, res) => {

  const query = `
    SELECT no.titolo, no.contenuto, no.data_creazione, c.name AS categoria
    FROM note no 
    INNER JOIN categorie c ON c.idc = no.idc `;

  client.query(query, (err, result) => {
    if (err) {
        console.error('Errore durante la query:', err.stack);
        return res.status(500).send('Errore durante la query');
    }
    // Rispondi con i risultati della query come JSON
    res.json(result.rows);
  });
  
});



app.get('/note_heavy_user', (req, res) => {

  const query = `
    SELECT * 
    FROM note no 
    INNER JOIN accesso a ON a.idn = no.idn 
    WHERE a.email = (SELECT a.email
        FROM accesso a
            GROUP BY a.email
                ORDER BY COUNT(*) DESC
                    LIMIT 1) `;

  client.query(query, (err, result) => {
    if (err) {
        console.error('Errore durante la query:', err.stack);
        return res.status(500).send('Errore durante la query');
    }
    // Rispondi con i risultati della query come JSON
    res.json(result.rows);
  });
  
});


// Crea una route per ottenere le note che non hanno categorie
app.get('/note_senza_categorie', (req, res) => {

  const query = `
    SELECT titolo, contenuto, data_creazione
    FROM note 
    WHERE idc IS NULL `;

  client.query(query, (err, result) => {
    if (err) {
        console.error('Errore durante la query:', err.stack);
        return res.status(500).send('Errore durante la query');
    }
    // Rispondi con i risultati della query come JSON
    res.json(result.rows);
  });
  
});



app.get('/note', (req, res) => {

  // Query per ottenere gli utenti dal database
  client.query("SELECT * FROM note ORDER BY idn", (err, result) => {
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
    res.sendFile(path.join(__dirname, '..', 'public', 'BetterHTML', 'better_index.html'));  //public/HTMLpages/index.html
});

app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
    });

