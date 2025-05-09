let params = new URLSearchParams(window.location.search);
const user = params.get('name');
const IDNOTA=-1;
console.log(user);Categorie();



// const elementi = document.getElementsByClassName("icona");

// for (let i = 0; i < elementi.length; i++) {
//   elementi[i].addEventListener("click", function() {
//     IDNOTA = elementi.id;
//   });
// }
// // document.getElementById("doublecontent").addEventListener("change",InserisciBottone)
function Eventi()
{
const elementi = document.getElementsByClassName("icona");

for (let i = 0; i < elementi.length; i++) {
  elementi[i].addEventListener("click", function() {
    IDNOTA = elementi.id;
  });
}
}


const targetNode = document.getElementById('doublecontent');

const observer = new MutationObserver(function(mutationsList, observer) {

    for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
    InserisciBottone();
    
    }
    }
});

// Configura il MutationObserver per osservare i cambiamenti nel contenuto dell'elemento
const config = { childList: true, subtree: true };

// Avvia l'osservazione
observer.observe(targetNode, config);


function InserisciBottone()
{
    console.log("Inserimento");
    const btn = document.getElementById("aggiunginota");
    btn.addEventListener("click",CreaNota)
}

function CreaNota()
{   
    UltimoIdNota().then(massimo=>
    {
        const idn = massimo;
    
    
        console.log(idn);
        fetch('/creanota', {
        method: 'POST', // Usando il metodo POST
        headers: {
            'Content-Type': 'application/json' // Imposta il tipo di contenuto su JSON
        },
        body: JSON.stringify({ idn: idn }) // Converte l'email in un oggetto JSON
    })
    .then(response => {
        console.log('Risposta ricevuta dal server:', response); // Log della risposta completa
        if (!response.ok) {
            throw new Error(`Errore HTTP! Status: ${response.status}`);
        }
        return response.json();  // Converte la risposta JSON in un oggetto JavaScript
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
        document.querySelector('h1').textContent = 'Errore nel caricamento';
    });

    const email = user;
console.log(email);
console.log(idn);

fetch('/aggiungiaccesso', {
    method: 'POST', // Usando il metodo POST
    headers: {
        'Content-Type': 'application/json' // Imposta il tipo di contenuto su JSON
    },
    body: JSON.stringify({ idn: idn, email: email }) 
    // Converte idn ed email in un unico oggetto JSON
})
.then(response => {
    console.log('Risposta ricevuta dal server:', response); // Log della risposta completa
    if (!response.ok) {
        throw new Error(`Errore HTTP! Status: ${response.status}`);
    }
    return response.json();  // Converte la risposta JSON in un oggetto JavaScript
})
.catch(error => {
    console.error('Si è verificato un errore:', error);
    document.querySelector('h1').textContent = 'Errore nel caricamento';
});

let url = 'better_nota.html?idn=' + idn;
                window.open(url, '_blank');
});
}

function ApriNota()
{   
    UltimoIdNota().then(massimo=>
    {
        const idn = massimo;
    
    
        console.log(idn);
        fetch('/creanota', {
        method: 'POST', // Usando il metodo POST
        headers: {
            'Content-Type': 'application/json' // Imposta il tipo di contenuto su JSON
        },
        body: JSON.stringify({ idn: idn }) // Converte l'email in un oggetto JSON
    })
    .then(response => {
        console.log('Risposta ricevuta dal server:', response); // Log della risposta completa
        if (!response.ok) {
            throw new Error(`Errore HTTP! Status: ${response.status}`);
        }
        return response.json();  // Converte la risposta JSON in un oggetto JavaScript
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
        document.querySelector('h1').textContent = 'Errore nel caricamento';
    });

    const email = user;
console.log(email);
console.log(idn);

fetch('/aggiungiaccesso', {
    method: 'POST', // Usando il metodo POST
    headers: {
        'Content-Type': 'application/json' // Imposta il tipo di contenuto su JSON
    },
    body: JSON.stringify({ idn: idn, email: email }) 
    // Converte idn ed email in un unico oggetto JSON
})
.then(response => {
    console.log('Risposta ricevuta dal server:', response); // Log della risposta completa
    if (!response.ok) {
        throw new Error(`Errore HTTP! Status: ${response.status}`);
    }
    return response.json();  // Converte la risposta JSON in un oggetto JavaScript
})
.catch(error => {
    console.error('Si è verificato un errore:', error);
    document.querySelector('h1').textContent = 'Errore nel caricamento';
});

let url = 'better_nota.html?idn=' + idn;
                window.open(url, '_blank');
});
}


async function UltimoIdNota() {
    try {
        // Effettua la richiesta fetch e aspetta la risposta
        const response = await fetch('/note');
        console.log('Risposta ricevuta dal server:', response); // Log della risposta completa
        
        // Verifica se la risposta è ok (status 200-299)
        if (!response.ok) {
            throw new Error(`Errore HTTP! Status: ${response.status}`);
        }

        // Converte la risposta JSON in un oggetto JavaScript
        const data = await response.json();
        
        // Calcola il massimo id più uno
        const massimo = TrovaMassimo(data) + 1;
        console.log(massimo);
        
        return massimo;  // Restituisce il valore massimo

    } catch (error) {
        // Gestisce eventuali errori
        console.error('Si è verificato un errore:', error);
        document.querySelector('h1').textContent = 'Errore nel caricamento';
        
        return null;  // Restituisce null in caso di errore
    }
}
function TrovaMassimo(array)
{
    let num = 0;
    for(let i=0; i<array.length;i++)
    {
        if(num<array[i].idn) num = array[i].idn;
    }
    return num;
}

function AggiungiEvento()
{
    const icone = document.querySelectorAll('.icona');
    icone.forEach(icona => {
    icona.addEventListener('dblclick', () => ApriCartella(icona.id)); // ✅
});
    
    // const cats = document.querySelectorAll('.cat');
    // cats.forEach(cat => {
    //     cat.addEventListener('dblclick', ApriCategoria);
    // });
}

function ApriNotaID(idn)
{
    let url = 'better_nota.html?idn=' + idn;
                window.open(url, '_blank');
}


function ApriCartella(idCartella)
{
    console.log(idCartella);
        const doubleContent = document.getElementById("doublecontent");
    while (doubleContent.firstChild) {
        doubleContent.removeChild(doubleContent.firstChild);
    }
    document.getElementById("doublecontent").innerHTML='<input type="text" placeholder="Cerca" id="cerca"> <div id="aggiungi"> <input type="button" id="aggiunginota" value="Aggiungi Nota"> </div>';

    fetch('/note')
            .then(response => {
                console.log('Risposta ricevuta dal server:', response); // Log della risposta completa
                if (!response.ok) {
                    throw new Error(`Errore HTTP! Status: ${response.status}`);
                }
                return response.json();  // Converte la risposta JSON in un oggetto JavaScript
            })

            .then(data => {
                        // document.getElementById("doublecontent").innerHTML=document.getElementById("doublecontent").innerHTML+"<div id='"+categoria.idc+"' class='icona'><h1>"+categoria.name+"</h1></div>";
                        // document.getElementById("lista").innerHTML=document.getElementById("lista").innerHTML+"<li id='"+categoria.idc+"' class='cat'>"+categoria.name+"</li>";
                        data.forEach(nota => {
                    if(idCartella==nota.idc) {
                    // document.getElementById("doublecontent").innerHTML=document.getElementById("doublecontent").innerHTML+"<div id='"+nota.titolo+"' class='icona'><h1>"+nota.titolo+"</h1></div>";
                    document.getElementById("doublecontent").innerHTML=document.getElementById("doublecontent").innerHTML+"<li id='"+nota.idn+"' class='icona_nota'><h1>"+nota.titolo+"</h1></li>";}
                    
                })
                    AggiungiEvento();
              AggiungiNote();
                    
                })

            .catch(error => {
                console.error('Si è verificato un errore:', error);
                document.querySelector('h1').textContent = 'Errore nel caricamento';
            });
              AggiungiEvento();
              AggiungiNote();
}

function AggiungiNote()
{
    const note = document.querySelectorAll('.icona_nota');
    note.forEach(nota => {
        nota.addEventListener('dblclick', ApriNotaID(nota.id));
    });
}

function Categorie()
{
    let email = user;
    fetch('/categorieascelta', {
        method: 'POST', // Usando il metodo POST
        headers: {
            'Content-Type': 'application/json' // Imposta il tipo di contenuto su JSON
        },
        body: JSON.stringify({ email: email }) // Converte l'email in un oggetto JSON
    })
    .then(response => {
        console.log('Risposta ricevuta dal server:', response); // Log della risposta completa
        if (!response.ok) {
            throw new Error(`Errore HTTP! Status: ${response.status}`);
        }
        return response.json();  // Converte la risposta JSON in un oggetto JavaScript
    })
    .then(data => {

            // document.getElementById("doublecontent").innerHTML=document.getElementById("doublecontent").innerHTML+"<div id='"+cat.name+"' class='icona'><h1>"+cat.name+"</h1></div>";
            // document.getElementById("lista").innerHTML=document.getElementById("lista").innerHTML+"<li id='"+cat.idc+"' class='cat'>"+cat.name+"</li>";
            // document.getElementById("container").innerHTML=
            Note(data);
            
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
        document.querySelector('h1').textContent = 'Errore nel caricamento';
    });
    document.getElementById("doublecontent").innerHTML=document.getElementById("doublecontent").innerHTML+'<div id="aggiungi"> <input type="button" id="aggiunginota" value="Aggiungi Nota"> </div>';
    
    document.getElementById("aggiunginota").addEventListener("click",CreaNota);
  AggiungiEvento();
}
function Note(categorie)
{
    fetch('/note')
            .then(response => {
                console.log('Risposta ricevuta dal server:', response); // Log della risposta completa
                if (!response.ok) {
                    throw new Error(`Errore HTTP! Status: ${response.status}`);
                }
                return response.json();  // Converte la risposta JSON in un oggetto JavaScript
            })
            .then(data => {
                categorie.forEach(categoria => 
                    {

                        document.getElementById("doublecontent").innerHTML=document.getElementById("doublecontent").innerHTML+"<div id='"+categoria.idc+"' class='icona'><h1>"+categoria.name+"</h1></div>";
                        document.getElementById("lista").innerHTML=document.getElementById("lista").innerHTML+"<li id='"+categoria.idc+"' class='cat'>"+categoria.name+"</li>";
                        data.forEach(nota => {
                    if(categoria.idc==nota.idc) {
                    // document.getElementById("doublecontent").innerHTML=document.getElementById("doublecontent").innerHTML+"<div id='"+nota.titolo+"' class='icona'><h1>"+nota.titolo+"</h1></div>";
                    document.getElementById("lista").innerHTML=document.getElementById("lista").innerHTML+"<li   id='"+nota.idn+"' class='nota'>"+nota.titolo+"</li>";}
                    
                })
                    });
                    document.getElementById("doublecontent").innerHTML=document.getElementById("doublecontent").innerHTML+"<div id='"+"AltreNote"+"' class='icona'><h1>"+"Altre Note"+"</h1></div>";
                    document.getElementById("lista").innerHTML=document.getElementById("lista").innerHTML+"<li id='"+"AltreNote"+"' class='cat'>"+"Altre Note"+"</li>";
                    data.forEach(nota=>{
                        if(nota.idc==null) document.getElementById("lista").innerHTML=document.getElementById("lista").innerHTML+"<li id='"+nota.titolo+"' class='nota'>"+nota.titolo+"</li>" ;
                    })
                AggiungiEvento();
            })
            .catch(error => {
                console.error('Si è verificato un errore:', error);
                document.querySelector('h1').textContent = 'Errore nel caricamento';
            });
  AggiungiEvento();
};

