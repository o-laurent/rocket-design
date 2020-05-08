async function getNames() {
    const param = {
        method : 'GET',
        mode: 'cors',
        headers : {
            'Content-Type': 'application/json'
        }
    }
    // On appelle le serveur
    return fetch ('/api/rockets/names',param)
    .then(response =>{
        if (response.status != 200) {
            console.log("Erreur")
        }
        else {
            return response.json()
        } 
    }).then(response =>{
        return response
    })
    .catch(console.error)
}

async function getRocketbyName(name) {
    const param = {
        method : 'POST',
        mode: 'cors',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            name: name
        })
    }
    // On appelle le serveur
    return fetch ('/api/rockets/byname', param)
    .then(response =>{
        if (response.status != 200) {
            console.log("Erreur")
        }
        else {
            return response.json()
        } 
    }).then(response =>{
        return response
    })
    .catch(console.error)
}

async function addRocket() {
    rocket = getRocketInfo()
    const param = {
        method : 'POST',
        mode: 'cors',
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({rocket : rocket})
    }
    // On appelle le serveur
    return fetch ('/api/newrocket', param)
    .then(response =>{
        if (response.status!=200) {
            console.log("Erreur")
        }
        else {
            return response.json()
        } 
    }).then(response =>{
        return response
    })
    .catch(console.error)
}

async function fillRocketSelector(rocketS) {
    // Affiche les options d'un select avec toutes les catégories possibles et en value les _id des catégories
        for(name of names.names)
        {
            var option = document.createElement('option')
            option.innerHTML = name
            option.value = name // ou _id pour enregisrter les id
            document.getElementById(rocketS).appendChild(option);
        }
}
//Fonction de chargement d'une fusée en particulier 
//Fonction d'envoi de fusée