Categorie();

function Categorie()
{

    fetch('/../../private/categorie')
    .then(response => {
        console.log('Risposta ricevuta dal server:', response); // Log della risposta completa
        if (!response.ok) {
            throw new Error(`Errore HTTP! Status: ${response.status}`);
        }
        return response.json();  // Converte la risposta JSON in un oggetto JavaScript
    })
    .then(data => {
        data.forEach(cat => {
            document.getElementById("doublecontent").innerHTML=document.getElementById("doublecontent").innerHTML+"<div id='"+cat.name+"' class='icona'><h1>"+cat.name+"</h1></div>";
            document.getElementById("lista").innerHTML=document.getElementById("lista").innerHTML+"<li id='"+cat.idc+"' class='cat'>"+cat.name+"</li>";
            // document.getElementById("container").innerHTML=
        })
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
        document.querySelector('h1').textContent = 'Errore nel caricamento';
    });
    document.getElementById("doublecontent").innerHTML=document.getElementById("doublecontent").innerHTML+'<div id="aggiungi"> <input id="piu" type="button" value="+"> <input type="button" id="aggiunginota" value="Aggiungi Nota"> </div>';

}
function Note()
{
    fetch('/../../private/note')
            .then(response => {
                console.log('Risposta ricevuta dal server:', response); // Log della risposta completa
                if (!response.ok) {
                    throw new Error(`Errore HTTP! Status: ${response.status}`);
                }
                return response.json();  // Converte la risposta JSON in un oggetto JavaScript
            })
            .then(data => {
                data.forEach(nota => {
                    console.log(nota.idc);
                    

                })
            })
            .catch(error => {
                console.error('Si è verificato un errore:', error);
                document.querySelector('h1').textContent = 'Errore nel caricamento';
            });

};

function NumCategorie()
{
    
    fetch('/../../private/categorie')
    .then(response => {
        console.log('Risposta ricevuta dal server:', response); // Log della risposta completa
        if (!response.ok) {
            throw new Error(`Errore HTTP! Status: ${response.status}`);
        }
        return response.json();  // Converte la risposta JSON in un oggetto JavaScript
    })
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
        document.querySelector('h1').textContent = 'Errore nel caricamento';
    });
    document.getElementById("doublecontent").innerHTML=document.getElementById("doublecontent").innerHTML+'<div id="aggiungi"> <input id="piu" type="button" value="+"> <input type="button" id="aggiunginota" value="Aggiungi Nota"> </div>';

}
