let params = new URLSearchParams(window.location.search);
let user = params.get('name');

console.log(user);Categorie();

// async function Categorie() {
//     let email = user;
//     try {
//         const response = await fetch('/categorieascelta', {
//             method: 'POST', // Usando il metodo POST
//             headers: {
//                 'Content-Type': 'application/json' // Imposta il tipo di contenuto su JSON
//             },
//             body: JSON.stringify({ email: email }) // Converte l'email in un oggetto JSON
//         });

//         console.log('Risposta ricevuta dal server:', response);
//         if (!response.ok) {
//             throw new Error(`Errore HTTP! Status: ${response.status}`);
//         }

//         const categorie = await response.json();  // Converte la risposta JSON in un oggetto JavaScript
//         await Note(categorie); // Aspetta che la funzione Note termini prima di continuare

//         document.getElementById("doublecontent").innerHTML += '<div id="aggiungi"> <input id="piu" type="button" value="+"> <input type="button" id="aggiunginota" value="Aggiungi Nota"> </div>';
        
//         // Ora chiama NoteSenzaCategoria dopo aver caricato le categorie
//         await NoteSenzaCategoria();
//     } catch (error) {
//         console.error('Si è verificato un errore:', error);
//         document.querySelector('h1').textContent = 'Errore nel caricamento';
//     }
// }

// async function Note(categorie) {
//     try {
//         const response = await fetch('/note');
//         console.log('Risposta ricevuta dal server:', response);
//         if (!response.ok) {
//             throw new Error(`Errore HTTP! Status: ${response.status}`);
//         }

//         const data = await response.json();  // Converte la risposta JSON in un oggetto JavaScript
//         categorie.forEach(categoria => {
//             document.getElementById("doublecontent").innerHTML += `<div id='${categoria.name}' class='icona'><h1>${categoria.name}</h1></div>`;
//             document.getElementById("lista").innerHTML += `<li id='${categoria.idc}' class='cat'>${categoria.name}</li>`;
            
//             data.forEach(nota => {
//                 if (categoria.idc == nota.idc) {
//                     document.getElementById("doublecontent").innerHTML += `<div id='${nota.titolo}' class='icona'><h1>${nota.titolo}</h1></div>`;
//                     document.getElementById("lista").innerHTML += `<li style='color:red;' id='${nota.titolo}' class='cat'>${nota.titolo}</li>`;
//                 }
//             });
//         });
//     } catch (error) {
//         console.error('Si è verificato un errore:', error);
//         document.querySelector('h1').textContent = 'Errore nel caricamento';
//     }
// }

// async function NoteSenzaCategoria() {
//     let email = user;
//     try {
//         const response = await fetch('/noteascelta', {
//             method: 'POST', // Usando il metodo POST
//             headers: {
//                 'Content-Type': 'application/json' // Imposta il tipo di contenuto su JSON
//             },
//             body: JSON.stringify({ email: email }) // Converte l'email in un oggetto JSON
//         });

//         console.log('Risposta ricevuta dal server:', response);
//         if (!response.ok) {
//             throw new Error(`Errore HTTP! Status: ${response.status}`);
//         }

//         const data = await response.json();  // Converte la risposta JSON in un oggetto JavaScript
//         data.forEach(nota => {
//             document.getElementById("doublecontent").innerHTML += `<div id='${nota.titolo}' class='icona'><h1>${nota.titolo}</h1></div>`;
//             document.getElementById("lista").innerHTML += `<li style='color:red;' id='${nota.titolo}' class='cat'>${nota.titolo}</li>`;
//         });

//     } catch (error) {
//         console.error('Si è verificato un errore:', error);
//         document.querySelector('h1').textContent = 'Errore nel caricamento';
//     }
    
//     document.getElementById("doublecontent").innerHTML += '<div id="aggiungi"> <input id="piu" type="button" value="+"> <input type="button" id="aggiunginota" value="Aggiungi Nota"> </div>';
// }
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
                    if(categoria.idc==nota.idc) {
                    // document.getElementById("doublecontent").innerHTML=document.getElementById("doublecontent").innerHTML+"<div id='"+nota.titolo+"' class='icona'><h1>"+nota.titolo+"</h1></div>";
                    document.getElementById("lista").innerHTML=document.getElementById("lista").innerHTML+"<li style='color:red;' id='"+nota.titolo+"' class='cat'>"+nota.titolo+"</li>";}
                    
                })
                    });
                    document.getElementById("doublecontent").innerHTML=document.getElementById("doublecontent").innerHTML+"<div id='"+"NoteSenzaCategorie"+"' class='icona'><h1>"+"NoteSenzaCategorie"+"</h1></div>";
                    document.getElementById("lista").innerHTML=document.getElementById("lista").innerHTML+"<li id='"+"NoteSenzaCategorie"+"' class='cat'>"+"NoteSenzaCategorie"+"</li>";
                    data.forEach(nota=>{
                        if(nota.idc==null) document.getElementById("lista").innerHTML=document.getElementById("lista").innerHTML+"<li style='color:red;' id='"+nota.titolo+"' class='cat'>"+nota.titolo+"</li>" ;
                    })
                
            })
            .catch(error => {
                console.error('Si è verificato un errore:', error);
                document.querySelector('h1').textContent = 'Errore nel caricamento';
            });

};

// function NoteSenzaCategoria(categorie)
// {
//     fetch('/note')
//             .then(response => {
//                 console.log('Risposta ricevuta dal server:', response); // Log della risposta completa
//                 if (!response.ok) {
//                     throw new Error(`Errore HTTP! Status: ${response.status}`);
//                 }
//                 return response.json();  // Converte la risposta JSON in un oggetto JavaScript
//             })
//             .then(data => {
//                 categorie.forEach(categoria => 
//                     {
//                         document.getElementById("doublecontent").innerHTML=document.getElementById("doublecontent").innerHTML+"<div id='"+categoria.name+"' class='icona'><h1>"+categoria.name+"</h1></div>";
//             document.getElementById("lista").innerHTML=document.getElementById("lista").innerHTML+"<li id='"+categoria.idc+"' class='cat'>"+categoria.name+"</li>";
//                         data.forEach(nota => {
//                     if(categoria.idc==nota.idc) {document.getElementById("doublecontent").innerHTML=document.getElementById("doublecontent").innerHTML+"<div id='"+nota.titolo+"' class='icona'><h1>"+nota.titolo+"</h1></div>";
//                     document.getElementById("lista").innerHTML=document.getElementById("lista").innerHTML+"<li style='color:red;' id='"+nota.titolo+"' class='cat'>"+nota.titolo+"</li>";}
                    
//                 })
//                     });
                
//             })
//             .catch(error => {
//                 console.error('Si è verificato un errore:', error);
//                 document.querySelector('h1').textContent = 'Errore nel caricamento';
//             });

// };

// function NoteSenzaCategoria()
// {
//     console.log("ciao");
//     let email = user;
//     fetch('/note', {
//         method: 'POST', // Usando il metodo POST
//         headers: {
//             'Content-Type': 'application/json' // Imposta il tipo di contenuto su JSON
//         },
//         body: JSON.stringify({ email: email }) // Converte l'email in un oggetto JSON
//     })
//     .then(response => {
//         console.log('Risposta ricevuta dal server:', response); // Log della risposta completa
//         if (!response.ok) {
//             throw new Error(`Errore HTTP! Status: ${response.status}`);
//         }
//         return response.json();  // Converte la risposta JSON in un oggetto JavaScript
//     })
//     .then(data => {

//         data.forEach(nota=>
//             {
//                 {document.getElementById("doublecontent").innerHTML=document.getElementById("doublecontent").innerHTML+"<div id='"+nota.titolo+"' class='icona'><h1>"+nota.titolo+"</h1></div>";
//                     document.getElementById("lista").innerHTML=document.getElementById("lista").innerHTML+"<li style='color:red;' id='"+nota.titolo+"' class='cat'>"+nota.titolo+"</li>";}
//             })
//     })
//     .catch(error => {
//         console.error('Si è verificato un errore:', error);
//         document.querySelector('h1').textContent = 'Errore nel caricamento';
//     });
//     document.getElementById("doublecontent").innerHTML=document.getElementById("doublecontent").innerHTML+'<div id="aggiungi"> <input id="piu" type="button" value="+"> <input type="button" id="aggiunginota" value="Aggiungi Nota"> </div>';

// }

