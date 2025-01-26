



// document.getElementById("btnAccedi").addEventListener("click",Accedi);

document.getElementById('confirmButton').addEventListener('click', Accesso)

function Accesso()
{
    let ok = false;
    let email = document.getElementById("emailAddress").value;
    let password = document.getElementById("password").value;
    
    // Verifica che l'email non sia vuota
    if (!email || !password) {
        alert("Per favore completa tutti i campi");
        return;
    }
    
    console.log(email, password);
    

    fetch('/utenti')
    .then(response => {
        if (!response.ok) {
            throw new Error('La risposta del server non è ok');
        }
        return response.json();
    })
    .then(data => {
        data.forEach(utente => {
            if(email == utente.email && password == utente.password)
            {
                ok=true;
                let url = 'better_home.html?name=' + utente.email;
                window.open(url, '_blank');
                return;
            }
            
        });if(!ok) console.log("nome o password sbagliati");
        // let passwordDalDB = data.password;
        // if(password == passwordDalDB){
        //     //document.getElementById("accesResult").innerHTML = "Accesso riuscito";
        //     // window.open('home.html', '_self');
        //     console.log("YPPIEE");
        // }
    })
    .catch(error => {
        console.error('Errore durante la richiesta:', error);
        //alert('Errore nell\'invio dei dati');
    });
}



document.getElementById("amministratorButton").addEventListener("click", AdminAccesso);

function AdminAccesso(){

    let password = document.getElementById("password").value;
    if(!password){
        alert("Inserisci la password amministratore");
        return;
    }
    else if(password == "admin"){
        window.open("better_admin.html", "_self");
    }
    else{
        alert("Password Errata!!");

    }
}

