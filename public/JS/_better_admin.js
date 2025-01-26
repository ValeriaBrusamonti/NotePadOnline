window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);
});


document.getElementById("ViewNotesWithCategories").addEventListener("click", NotesWithCategories);

function NotesWithCategories(){
    fetch('/note_categorie')
    .then(response => {
        console.log('Risposta ricevuta dal server:', response); // Log della risposta completa
        if (!response.ok) {
            throw new Error(`Errore HTTP! Status: ${response.status}`);
        }
        return response.json();  // Converte la risposta JSON in un oggetto JavaScript
    })
    .then(note => {
        console.log(note);

        // Trova il contenitore dove inserire la tabella
        const container = document.getElementById("tablecontainer1");

        const table = PopolaTabellaNote(note, true);

        // // Crea il tag <table>
        // const table = document.createElement('table');
        // table.id = 'noteswithcategories';
        // table.setAttribute('border', '1'); // Aggiungi il bordo

        // // Crea il <thead> con le intestazioni
        // const thead = document.createElement('thead');
        // const headerRow = document.createElement('tr');

        // // Aggiungi le intestazioni della tabella
        // const titoli = ['Titolo', 'Contenuto', 'Data di Creazione', 'Categoria'];
        // titoli.forEach(titolo => {
        //     const th = document.createElement('th');
        //     th.textContent = titolo;
        //     headerRow.appendChild(th);
        // });

        // // Aggiungi la riga di intestazione (<tr>) al <thead>
        // thead.appendChild(headerRow);

        // // Crea il <tbody> per i dati
        // const tbody = document.createElement('tbody');


        // note.forEach(nota => {
        //     const row = document.createElement("tr");

        //     // Crea una cella per ogni campo
        //     const titoloCell = document.createElement("td");
        //     titoloCell.textContent = nota.titolo;
        //     row.appendChild(titoloCell);

        //     const contenutoCell = document.createElement("td");
        //     contenutoCell.textContent = nota.contenuto;
        //     row.appendChild(contenutoCell);

        //     const dataCreazioneCell = document.createElement("td");
        //     dataCreazioneCell.textContent = nota.data_creazione;
        //     row.appendChild(dataCreazioneCell);

        //     const categoriaCell = document.createElement("td");
        //     categoriaCell.textContent = nota.categoria;
        //     row.appendChild(categoriaCell);

        //     // Aggiungi la riga alla tabella
        //     tbody.appendChild(row);
        // });

        // // Aggiungi <thead> e <tbody> alla tabella
        // table.appendChild(thead);
        // table.appendChild(tbody);

        // Aggiungi la tabella al contenitore
        container.appendChild(table);
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
        document.querySelector('h1').textContent = 'Errore nel caricamento';
    });
}



document.getElementById("ViewNotesWithoutCategories").addEventListener("click", NotesWithoutCategories);

function NotesWithoutCategories(){
    fetch('/note_senza_categorie')
    .then(response => {
        console.log('Risposta ricevuta dal server:', response); // Log della risposta completa
        if (!response.ok) {
            throw new Error(`Errore HTTP! Status: ${response.status}`);
        }
        return response.json();  // Converte la risposta JSON in un oggetto JavaScript
    })
    .then(note => {
        console.log(note);

        // Trova il contenitore dove inserire la tabella
        const container = document.getElementById("tablecontainer2");

        const table = PopolaTabellaNote(note, false);
        // // Crea il tag <table>
        // const table = document.createElement('table');
        // table.id = 'noteswithcategories';
        // table.setAttribute('border', '1'); // Aggiungi il bordo

        // // Crea il <thead> con le intestazioni
        // const thead = document.createElement('thead');
        // const headerRow = document.createElement('tr');

        // // Aggiungi le intestazioni della tabella
        // const titoli = ['Titolo', 'Contenuto', 'Data di Creazione'];
        // titoli.forEach(titolo => {
        //     const th = document.createElement('th');
        //     th.textContent = titolo;
        //     headerRow.appendChild(th);
        // });

        // // Aggiungi la riga di intestazione (<tr>) al <thead>
        // thead.appendChild(headerRow);

        // // Crea il <tbody> per i dati
        // const tbody = document.createElement('tbody');


        // note.forEach(nota => {
        //     const row = document.createElement("tr");

        //     // Crea una cella per ogni campo
        //     const titoloCell = document.createElement("td");
        //     titoloCell.textContent = nota.titolo;
        //     row.appendChild(titoloCell);

        //     const contenutoCell = document.createElement("td");
        //     contenutoCell.textContent = nota.contenuto;
        //     row.appendChild(contenutoCell);

        //     const dataCreazioneCell = document.createElement("td");
        //     dataCreazioneCell.textContent = nota.data_creazione;
        //     row.appendChild(dataCreazioneCell);

        //     // Aggiungi la riga alla tabella
        //     tbody.appendChild(row);
        // });

        // // Aggiungi <thead> e <tbody> alla tabella
        // table.appendChild(thead);
        // table.appendChild(tbody);

        // Aggiungi la tabella al contenitore
        container.appendChild(table);
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
        document.querySelector('h1').textContent = 'Errore nel caricamento';
    });
}



document.getElementById("ViewNotesOfUser").addEventListener("click", getNotes);

function getNotes() {

    let email = document.getElementById("emailAddress").value;
    // Verifica che l'email non sia vuota 
    if (!email) {
      console.error('Email mancante');
      return;
    }
  
    fetch('/noteascelta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Errore nella richiesta');
        }
        return response.json();
      })
      .then((note) => {
        console.log('Note ricevute:', note);
        
        // Trova il contenitore dove inserire la tabella
        const container = document.getElementById("tablecontainer3");

        const table = PopolaTabellaNote(note, false);
        // // Crea il tag <table>
        // const table = document.createElement('table');
        // table.id = 'noteswithcategories';
        // table.setAttribute('border', '1'); // Aggiungi il bordo

        // // Crea il <thead> con le intestazioni
        // const thead = document.createElement('thead');
        // const headerRow = document.createElement('tr');

        // // Aggiungi le intestazioni della tabella
        // const titoli = ['Titolo', 'Contenuto', 'Data di Creazione'];
        // titoli.forEach(titolo => {
        //     const th = document.createElement('th');
        //     th.textContent = titolo;
        //     headerRow.appendChild(th);
        // });

        // // Aggiungi la riga di intestazione (<tr>) al <thead>
        // thead.appendChild(headerRow);

        // // Crea il <tbody> per i dati
        // const tbody = document.createElement('tbody');


        // note.forEach(nota => {
        //     const row = document.createElement("tr");

        //     // Crea una cella per ogni campo
        //     const titoloCell = document.createElement("td");
        //     titoloCell.textContent = nota.titolo;
        //     row.appendChild(titoloCell);

        //     const contenutoCell = document.createElement("td");
        //     contenutoCell.textContent = nota.contenuto;
        //     row.appendChild(contenutoCell);

        //     const dataCreazioneCell = document.createElement("td");
        //     dataCreazioneCell.textContent = nota.data_creazione;
        //     row.appendChild(dataCreazioneCell);

        //     // Aggiungi la riga alla tabella
        //     tbody.appendChild(row);
        // });

        // // Aggiungi <thead> e <tbody> alla tabella
        // table.appendChild(thead);
        // table.appendChild(tbody);

        // Aggiungi la tabella al contenitore
        container.appendChild(table);
      })
      .catch((error) => {
        console.error('Errore nella chiamata API:', error);
      });
  }


  


document.getElementById("ViewNotesOfHeavyUser").addEventListener("click", getNotesHU);

function getNotesHU() {

    fetch('/note_heavy_user')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Errore nella richiesta');
        }
        return response.json();
      })
      .then((note) => {
        console.log('Note ricevute:', note);
        
        // Trova il contenitore dove inserire la tabella
        const container = document.getElementById("tablecontainer4");

        const table = PopolaTabellaNote(note, false);

        // // Crea il tag <table>
        // const table = document.createElement('table');
        // table.id = 'noteswithcategories';
        // table.setAttribute('border', '1'); // Aggiungi il bordo

        // // Crea il <thead> con le intestazioni
        // const thead = document.createElement('thead');
        // const headerRow = document.createElement('tr');

        // // Aggiungi le intestazioni della tabella
        // const titoli = ['Titolo', 'Contenuto', 'Data di Creazione'];
        // titoli.forEach(titolo => {
        //     const th = document.createElement('th');
        //     th.textContent = titolo;
        //     headerRow.appendChild(th);
        // });

        // // Aggiungi la riga di intestazione (<tr>) al <thead>
        // thead.appendChild(headerRow);

        // // Crea il <tbody> per i dati
        // const tbody = document.createElement('tbody');


        // note.forEach(nota => {
        //     const row = document.createElement("tr");

        //     // Crea una cella per ogni campo
        //     const titoloCell = document.createElement("td");
        //     titoloCell.textContent = nota.titolo;
        //     row.appendChild(titoloCell);

        //     const contenutoCell = document.createElement("td");
        //     contenutoCell.textContent = nota.contenuto;
        //     row.appendChild(contenutoCell);

        //     const dataCreazioneCell = document.createElement("td");
        //     dataCreazioneCell.textContent = nota.data_creazione;
        //     row.appendChild(dataCreazioneCell);

        //     // Aggiungi la riga alla tabella
        //     tbody.appendChild(row);
        // });

        // // Aggiungi <thead> e <tbody> alla tabella
        // table.appendChild(thead);
        // table.appendChild(tbody);

        // Aggiungi la tabella al contenitore
        container.appendChild(table);
      })
      .catch((error) => {
        console.error('Errore nella chiamata API:', error);
      });
  }


function PopolaTabellaNote(note, haveCategories){

    // Crea il tag <table>
    const table = document.createElement('table');
    //table.classList.add('table'); 
    table.classList.add('table-sm');
    table.classList.add('caption-top');
    table.classList.add('table-primary');
    table.classList.add('table-bordered');
    
   

    // Crea il <thead> con le intestazioni
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    if(haveCategories){
        // Aggiungi le intestazioni della tabella
        const titoli = ['Titolo', 'Contenuto', 'Data di Creazione', 'Categoria'];
        titoli.forEach(titolo => {
            const th = document.createElement('th');
            th.textContent = titolo;
            headerRow.appendChild(th);
        });
    }
    else{
        // Aggiungi le intestazioni della tabella
        const titoli = ['Titolo', 'Contenuto', 'Data di Creazione'];
        titoli.forEach(titolo => {
            const th = document.createElement('th');
            th.textContent = titolo;
            headerRow.appendChild(th);
        });
    }
    

    // Aggiungi la riga di intestazione (<tr>) al <thead>
    thead.appendChild(headerRow);

    // Crea il <tbody> per i dati
    const tbody = document.createElement('tbody');


    note.forEach(nota => {
        const row = document.createElement("tr");

        // Crea una cella per ogni campo
        const titoloCell = document.createElement("td");
        titoloCell.textContent = nota.titolo;
        row.appendChild(titoloCell);

        const contenutoCell = document.createElement("td");
        contenutoCell.textContent = nota.contenuto;
        row.appendChild(contenutoCell);

        const dataCreazioneCell = document.createElement("td");
        dataCreazioneCell.textContent = nota.data_creazione;
        row.appendChild(dataCreazioneCell);

        if(haveCategories){
            const categoriaCell = document.createElement("td");
            categoriaCell.textContent = nota.categoria;
            row.appendChild(categoriaCell);
        }

        // Aggiungi la riga alla tabella
        tbody.appendChild(row);
    });

    // Aggiungi <thead> e <tbody> alla tabella
    table.appendChild(thead);
    table.appendChild(tbody);

    return table;
}