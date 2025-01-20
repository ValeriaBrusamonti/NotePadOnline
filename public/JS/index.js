



document.getElementById("btnAccedi").addEventListener("click",Accedi);
function Accedi()
{
    Blur();
    Disable();
    document.getElementById("accedi").style.filter = "blur(0px)";
    document.getElementById("accedi").style.visibility = "visible";
    document.getElementById("registrazione").style.filter = "blur(0px)";
    document.getElementById("registrazione").style.visibility = "visible";
}
function Blur()
{
    document.getElementById("bloccouno").style =" filter: blur(6px)";
    document.getElementById("bloccodue").style =" filter: blur(6px)";
    document.getElementById("bloccotre").style =" filter: blur(6px)";
    document.getElementById("header").style =" filter: blur(6px)";
    document.getElementById("footer").style =" filter: blur(6px)";

}

function Disable()
{
    document.getElementById("bloccouno").disabled=true;
    document.getElementById("bloccodue").disabled=true;
    document.getElementById("bloccotre").disabled=true;
    document.getElementById("header").disabled=true;
    document.getElementById("footer").disabled=true;
}


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