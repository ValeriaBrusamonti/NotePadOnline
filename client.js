function ValidaAccesso() {
    
    var email = document.getElementById('email').value; 
    var password = document.getElementById('password').value; 

    fetch('/confronta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Se i dati sono uguali, apri una nuova pagina
          window.location.href = '/home.html'; // Qui inserisci il percorso della tua pagina di successo
        } else {
          alert('I dati inseriti non corrispondono!');
        }
      })
      .catch(err => {
        console.error('Errore durante la richiesta:', err);
      });
}