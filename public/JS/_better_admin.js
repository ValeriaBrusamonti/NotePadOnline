document.getElementById("ViewUsersOperations").addEventListener("click", UsersOperations);
document.getElementById("ViewReportisticOptions").addEventListener("click", ReportisticOptions);
const container = document.getElementById("contenuto");

function ReportisticOptions(){
    
  document.getElementById("OPTIONS").style.display = 'block';

  checkAndRemoveElement("UsersTable")

    
}

document.getElementById("NotesOfHeavyUser").addEventListener("click", ViewNotesHU);
document.getElementById("NotesWithCategories").addEventListener("click", NotesWithCategories);
document.getElementById("NotesWithoutCategories").addEventListener("click", NotesWithoutCategories);

function UsersOperations(){

    //Pulisce lo spazio prima di aggiungere la tabella rimuovendo tutti i figli del container
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const titoloparagrafo = document.createElement('h3');
    titoloparagrafo.classList.add('text-dark','fw-semibold','pb-4')
    titoloparagrafo.textContent = "Elenco Utenti"
    container.appendChild(titoloparagrafo)
    GetUtenti();

}

function GetUtenti() {

    fetch('/utenti')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Errore nella richiesta');
        }
        return response.json();
      })
      .then(users => {
        console.log('Note ricevute:', users);
        const table = CreaTabellaUtenti(users);

        // Aggiungi la tabella al contenitore
        container.appendChild(table);
      })
      .catch((error) => {
        console.error('Errore nella chiamata API:', error);
      });
  }


// window.addEventListener('DOMContentLoaded', event => {

//     // Navbar shrink function
//     var navbarShrink = function () {
//         const navbarCollapsible = document.body.querySelector('#mainNav');
//         if (window.scrollY === 0) {
//             navbarCollapsible.classList.remove('navbar-shrink')
//         } else {
//             navbarCollapsible.classList.add('navbar-shrink')
//         }

//     };

//     // Shrink the navbar 
//     navbarShrink();

//     // Shrink the navbar when page is scrolled
//     document.addEventListener('scroll', navbarShrink);
// });


// document.getElementById("ViewNotesWithCategories").addEventListener("click", NotesWithCategories);

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
        //const container = document.getElementById("tablecontainer1");

        const table = PopolaTabellaNote(note, true);

        // Aggiungi la tabella al contenitore
        container.appendChild(table);
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
        document.querySelector('h1').textContent = 'Errore nel caricamento';
    });
}



// document.getElementById("ViewNotesWithoutCategories").addEventListener("click", NotesWithoutCategories);

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
        //const container = document.getElementById("tablecontainer2");

        const table = PopolaTabellaNote(note, false);

        // Aggiungi la tabella al contenitore
        container.appendChild(table);
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
        document.querySelector('h1').textContent = 'Errore nel caricamento';
    });
}



// document.getElementById("ViewNotesOfUser").addEventListener("click", getNotes);

// function getNotes() {

//     let email = document.getElementById("emailAddress").value;
//     // Verifica che l'email non sia vuota 
//     if (!email) {
//       console.error('Email mancante');
//       return;
//     }
  
//     fetch('/noteascelta', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email: email }),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Errore nella richiesta');
//         }
//         return response.json();
//       })
//       .then((note) => {
//         console.log('Note ricevute:', note);
        
//         // Trova il contenitore dove inserire la tabella
//         const container = document.getElementById("tablecontainer3");

//         const table = PopolaTabellaNote(note, false);

//         // Aggiungi la tabella al contenitore
//         container.appendChild(table);
//       })
//       .catch((error) => {
//         console.error('Errore nella chiamata API:', error);
//       });
//   }


  


// document.getElementById("ViewNotesOfHeavyUser").addEventListener("click", ViewNotesHU);

function ViewNotesHU() {

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
        //const container = document.getElementById("tablecontainer4");

        const table = PopolaTabellaNote(note, true);


        // Aggiungi la tabella al contenitore
        container.appendChild(table);
      })
      .catch((error) => {
        console.error('Errore nella chiamata API:', error);
      });
  }


function PopolaTabellaNote(note, haveCategories){

  //Cancella Tabella se già esistente
  checkAndRemoveElement("NotesTable")


    // Crea il tag <table>
    const table = document.createElement('table');
    table.id = "NotesTable";
    table.classList.add('table-sm','caption-top', 'table-primary', 'table-bordered');
    

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
        const Data = new Date(nota.data_creazione);
        dataCreazioneCell.textContent = Data.toISOString().split('T')[0];
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


function CreaTabellaUtenti(users){

    // Crea il tag <table>
    const table = document.createElement('table');
    table.id = "UsersTable";
    table.classList.add('table-sm','caption-top','table-primary','table-bordered');    

    // Crea il <thead> con le intestazioni
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    
    // Aggiungi le intestazioni della tabella
    const titoli = ['Email', 'Password', 'Nome', 'Cognome', 'Data di Nascita', 'Città', 'Stato', 'Azioni'];
    titoli.forEach(titolo => {
        const th = document.createElement('th');
        th.textContent = titolo;
        headerRow.appendChild(th);
    });
    
    

    // Aggiungi la riga di intestazione (<tr>) al <thead>
    thead.appendChild(headerRow);

    // Crea il <tbody> per i dati
    const tbody = document.createElement('tbody');


    users.forEach(user => {
        const row = document.createElement("tr");

        // Crea una cella per ogni campo
        const emailCell = document.createElement("td");
        emailCell.textContent = user.email;
        row.appendChild(emailCell);

        const passwordCell = document.createElement("td");
        passwordCell.textContent = user.password;
        row.appendChild(passwordCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = user.name;
        row.appendChild(nameCell);

        const surnameCell = document.createElement("td");
        surnameCell.textContent = user.surname;
        row.appendChild(surnameCell);

        const dataNCell = document.createElement("td");
        const birthDate = new Date(user.birth_date);
        dataNCell.textContent = birthDate.toISOString().split('T')[0];
        row.appendChild(dataNCell);

        const cityCell = document.createElement("td");
        cityCell.textContent = user.city;
        row.appendChild(cityCell);

        const stateCell = document.createElement("td");
        stateCell.textContent = user.state;
        row.appendChild(stateCell);

        const actionCell = document.createElement("td");

        // Crea i due link
        const link1 = document.createElement("a");
        link1.href = `/../BetterHTML/better_userinfo.html?email=${encodeURIComponent(user.email)}`;
        link1.target = "_self";
        link1.textContent = "Modifica";

        const link2 = document.createElement("a");
        link2.href = `/../BetterHTML/better_userinfo.html?email=${encodeURIComponent(user.email)}`;
        link2.target = "_self";
        link2.textContent = "Elimina";

        // Aggiungi i link alla cella delle azioni
        actionCell.appendChild(link1);
        //actionCell.appendChild(document.createTextNode(" | ")); // Separatore tra i link
        actionCell.appendChild(document.createTextNode(" ")); // Separatore tra i link
        actionCell.appendChild(link2);

        // Aggiungi la cella delle azioni alla riga
        row.appendChild(actionCell);

        // Aggiungi la riga alla tabella
        tbody.appendChild(row);
    });

    // Aggiungi <thead> e <tbody> alla tabella
    table.appendChild(thead);
    table.appendChild(tbody);

    return table;
}



function checkAndRemoveElement(selector) {
  const element = document.getElementById(selector); // Trova l'elemento con il selettore fornito
  if (element) {
    element.remove(); // Rimuovi l'elemento se esiste
  }
}