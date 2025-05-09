let params = new URLSearchParams(window.location.search);
const idn = params.get('idn');
const edit = document.getElementById('editor');
function caricamento() {
  fetch('/loadnota', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: idn })  // idn preso da URL
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Errore HTTP! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Dati ricevuti dal server:', data);

    // ✅ Usa i dati nel DOM
    document.getElementById("titolo").innerHTML = data.titolo;
    edit.innerHTML = data.contenuto;
  })
  .catch(error => {
    console.error('Si è verificato un errore:', error);
    document.querySelector('h1').textContent = 'Errore nel caricamento';
  });
}


caricamento();

document.getElementById('saveBtn').addEventListener('click', () => {
    
    let content = edit.innerHTML;
    let title = document.getElementById("titolo").innerHTML;
    if(!title) title = " ";
    if(!content) content=" ";
     fetch('/salvanota', {
        method: 'POST', // Usando il metodo POST
        headers: {
            'Content-Type': 'application/json' // Imposta il tipo di contenuto su JSON
        },
        body: JSON.stringify({ title: title, content:content, id:idn }) // Converte l'email in un oggetto JSON
    })
    .then(response => {
        console.log('Risposta ricevuta dal server:', response); // Log della risposta completa
        if (!response.ok) {
            throw new Error(`Errore HTTP! Status: ${response.status}`);
        }
        return response.json();  // Converte la risposta JSON in un oggetto JavaScript
    })
    .then(data => {
 
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
        document.querySelector('h1').textContent = 'Errore nel caricamento';
    });
    localStorage.setItem('document', content);
    alert('Document saved!');
});

document.getElementById('loadBtn').addEventListener('click', () => {
window.close();
});
document.getElementById('shareBtn').addEventListener('click', () => {
    console.alert("Coming Soon!");
});
