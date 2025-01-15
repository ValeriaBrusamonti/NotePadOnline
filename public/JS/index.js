document.getElementById('confermaCredenziali').addEventListener('click', Accesso)

function Accesso(){
    let email = document.getElementById("emailU").value;
    let password = document.getElementById("passwordU").value;

    // Verifica che l'email non sia vuota
    if (!email || !password) {
        alert("Per favore completa tutti i campi");
        return;
    }
    
    console.log(email, password);
    const requestBody = {
        email : email,
    }

    fetch('/../../private/accessoutente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),  // Converte l'oggetto in JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('La risposta del server non è ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        let passwordDalDB = data.password;
        if(password == passwordDalDB){
            //document.getElementById("accesResult").innerHTML = "Accesso riuscito";
            window.open('home.html', '_self');
        }
    })
    .catch(error => {
        console.error('Errore durante la richiesta:', error);
        alert('Errore nell\'invio dei dati');
    });
}