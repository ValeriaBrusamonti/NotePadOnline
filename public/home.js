numero=Categorie();
console.log(numero);
function Categorie()
{
    let numero=0;
    fetch('/categorie')
    .then(response => {
        console.log('Risposta ricevuta dal server:', response); // Log della risposta completa
        if (!response.ok) {
            throw new Error(`Errore HTTP! Status: ${response.status}`);
        }
        return response.json();  // Converte la risposta JSON in un oggetto JavaScript
    })
    .then(data => {
        data.forEach(cat => {

            document.getElementById("lista").innerHTML=document.getElementById("lista").innerHTML+"<li id='"+cat.idc+"' class='cat'>"+cat.name+"</li>";
            numero++;
        })
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
        document.querySelector('h1').textContent = 'Errore nel caricamento';
    });
    return numero;
}
function Note()
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
                data.forEach(nota => {
                    if(nota.idc==cat.idc)
                        {
                            console.log(nota);
                            document.getElementById("lista").innerHTML=document.getElementById("lista").innerHTML+"<li class='nota'>"+nota.titolo+"</li>";
                        } 

                })
            })
            .catch(error => {
                console.error('Si è verificato un errore:', error);
                document.querySelector('h1').textContent = 'Errore nel caricamento';
            });

};
