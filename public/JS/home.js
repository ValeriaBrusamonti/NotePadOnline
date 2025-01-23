Categorie();
Note();
function Categorie()
{

    fetch('/categorie')
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
    document.getElementById("doublecontent").innerHTML=document.getElementById("doublecontent").innerHTML+'<div id="aggiungi"> <input id="piu" type="button" value="+"> <input type="button" id="aggiunginota" value="Aggiungi Nota"> </div>';

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
                        document.getElementById("doublecontent").innerHTML=document.getElementById("doublecontent").innerHTML+"<div id='"+categoria.name+"' class='icona'><h1>"+categoria.name+"</h1></div>";
            document.getElementById("lista").innerHTML=document.getElementById("lista").innerHTML+"<li id='"+categoria.idc+"' class='cat'>"+categoria.name+"</li>";
                        data.forEach(nota => {
                    
                    if(categoria.idc==nota.idc) {document.getElementById("doublecontent").innerHTML=document.getElementById("doublecontent").innerHTML+"<div id='"+nota.titolo+"' class='icona'><h1>"+nota.titolo+"</h1></div>";
                    document.getElementById("lista").innerHTML=document.getElementById("lista").innerHTML+"<li style='color:red;' id='"+nota.titolo+"' class='cat'>"+nota.titolo+"</li>";}
                    

                })
                    });
                
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
