 // Ottieni i parametri dell'URL
 const params = new URLSearchParams(window.location.search);

 // Recupera i dati e visualizzali sulla pagina
 const email = params.get("email");

 document.addEventListener("DOMContentLoaded", LoadUserInfo)

function LoadUserInfo(){

    // Trova il contenitore dove inserire la tabella
    //const container = document.getElementById("userinfo");

    if (!email) {
        console.error('Email mancante');
        return;
    }
  
    fetch('/info_utente', {
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
    .then(user => {
        console.log('Informazioni utente ricevute:', user);
        AssignUserInfo(user);
        //const table = CreaTabellaUtenti(user);

        // Aggiungi la tabella al contenitore
        //container.appendChild(table);
    })
    .catch((error) => {
        console.error('Errore nella chiamata API:', error);
    });

    //CREA BOTTONI VISUALIZZA NOTE CHE NON APPARTENGONO A NESSUNA CATEGORIA
    // const buttonNwoutCats = document.createElement('a');
    // buttonNwoutCats.classList.add('btn', 'btn-primary');
    // buttonNwoutCats.id = 'ViewNotesWithoutCategories';
    // buttonNwoutCats.textContent = 'View Notes that does not have any Category';
    // container.appendChild(buttonNwoutCats);
 }


function AssignUserInfo(user){
    user.forEach(u => {
        document.getElementById("name").value = u.name;
        document.getElementById("surname").value = u.surname;
        document.getElementById("email").value = u.email;
        document.getElementById("password").value = u.password;
        document.getElementById("data_nascita").value = u.birth_date;
        document.getElementById("city").value = u.city;
        if(u.state == null) document.getElementById("state").value = "undefined";
        else document.getElementById("state").value = u.state;

    })
    
}
// function CreaTabellaUtenti(users){

//     // Crea il tag <table>
//     const table = document.createElement('table');
//     //table.classList.add('table'); 
//     table.classList.add('table-sm');
//     table.classList.add('caption-top');
//     table.classList.add('table-primary');
//     table.classList.add('table-bordered');
    
   

//     // Crea il <thead> con le intestazioni
//     const thead = document.createElement('thead');
//     const headerRow = document.createElement('tr');

    
//     // Aggiungi le intestazioni della tabella
//     const titoli = ['Email', 'Password', 'Nome', 'Cognome', 'Data di Nascita', 'Città', 'Stato'];
//     titoli.forEach(titolo => {
//         const th = document.createElement('th');
//         th.textContent = titolo;
//         headerRow.appendChild(th);
//     });
    
    

//     // Aggiungi la riga di intestazione (<tr>) al <thead>
//     thead.appendChild(headerRow);

//     // Crea il <tbody> per i dati
//     const tbody = document.createElement('tbody');


//     users.forEach(user => {
//         const row = document.createElement("tr");

//         // Crea una cella per ogni campo
//         const emailCell = document.createElement("td");
//         emailCell.textContent = user.email;
//         row.appendChild(emailCell);

//         const passwordCell = document.createElement("td");
//         passwordCell.textContent = user.password;
//         row.appendChild(passwordCell);

//         const nameCell = document.createElement("td");
//         nameCell.textContent = user.name;
//         row.appendChild(nameCell);

//         const surnameCell = document.createElement("td");
//         surnameCell.textContent = user.surname;
//         row.appendChild(surnameCell);

//         const dataNCell = document.createElement("td");
//         const birthDate = new Date(user.birth_date);
//         dataNCell.textContent = birthDate.toISOString().split('T')[0];
//         row.appendChild(dataNCell);

//         const cityCell = document.createElement("td");
//         cityCell.textContent = user.city;
//         row.appendChild(cityCell);

//         const stateCell = document.createElement("td");
//         stateCell.textContent = user.state;
//         row.appendChild(stateCell);

//         const actionCell = document.createElement("td");

//         // Aggiungi la riga alla tabella
//         tbody.appendChild(row);
//     });

//     // Aggiungi <thead> e <tbody> alla tabella
//     table.appendChild(thead);
//     table.appendChild(tbody);

//     return table;
// }


document.getElementById("ViewNotes").addEventListener("click", GetNotes);

function GetNotes() {

    // Trova il contenitore dove inserire la tabella
    const container = document.getElementById("userinfo");

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
    
            const table = PopolaTabellaNote(note, true);
    
            // Aggiungi la tabella al contenitore
            container.appendChild(table);
          })
          .catch((error) => {
            console.error('Errore nella chiamata API:', error);
          });
      }


      function PopolaTabellaNote(note, haveCategories){

        checkAndRemoveElement("NotesTable");
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
    
    function checkAndRemoveElement(selector) {
        const element = document.getElementById(selector); // Trova l'elemento con il selettore fornito
        if (element) {
          element.remove(); // Rimuovi l'elemento se esiste
        }
    }   
    