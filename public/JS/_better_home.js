let params = new URLSearchParams(window.location.search);
let user = params.get('name');


console.log(user);Categorie();

function CreaNota()
{
    console.log("vai");
    const idn = UltimoIdNota();
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
    .then(data => {
            Note(data);
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
        document.querySelector('h1').textContent = 'Errore nel caricamento';
    });
}

function UltimoIdNota()
{
    let num=0;
    fetch('/note')
            .then(response => {
                console.log('Risposta ricevuta dal server:', response); // Log della risposta completa
                if (!response.ok) {
                    throw new Error(`Errore HTTP! Status: ${response.status}`);
                }
                return response.json();  // Converte la risposta JSON in un oggetto JavaScript
            })
            .then(data => {
                data.forEach(nota => {
                    if(num<nota.idn) num = nota.idn;
                    console.log(num);
                });
                const idn = num+1;
            })
            .catch(error => {
                console.error('Si è verificato un errore:', error);
                document.querySelector('h1').textContent = 'Errore nel caricamento';
            });
    return idn;
}

function AggiungiEvento()
{
    const icone = document.querySelectorAll('.icona');
    icone.forEach(icona => {
        icona.addEventListener('dblclick', ApriCartella);
    });
    const note = document.querySelectorAll('.nota');
    note.forEach(nota => {
        nota.addEventListener('dblclick', ApriNota);
    });
    const cats = document.querySelectorAll('.cat');
    cats.forEach(cat => {
        cat.addEventListener('dblclick', ApriCategoria);
    });
}
function ApriCategoria(cat)
{
    console.log("categoria");
}
function ApriNota(nota)
{
    console.log("nota");
}
function ApriCartella(cartella)
{
    console.log(cartella.target.id);
        const doubleContent = document.getElementById("doublecontent");
    while (doubleContent.firstChild) {
        doubleContent.removeChild(doubleContent.firstChild);
    }
    document.getElementById("doublecontent").innerHTML='<input type="text" placeholder="Cerca" id="cerca"> <div id="aggiungi"> <input type="button" id="aggiunginota" value="Aggiungi Nota"> </div>';
    
document.getElementById("aggiunginota").addEventListener("click",CreaNota);

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
                    if(cartella.target.id==nota.idc) {
                    // document.getElementById("doublecontent").innerHTML=document.getElementById("doublecontent").innerHTML+"<div id='"+nota.titolo+"' class='icona'><h1>"+nota.titolo+"</h1></div>";
                    document.getElementById("doublecontent").innerHTML=document.getElementById("doublecontent").innerHTML+"<li id='"+nota.idn+"' class='icona_nota'><h1>"+nota.titolo+"</h1></li>";}
                    
                })
                    AggiungiEvento();
                })

            .catch(error => {
                console.error('Si è verificato un errore:', error);
                document.querySelector('h1').textContent = 'Errore nel caricamento';
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

};

