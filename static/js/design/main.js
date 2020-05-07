var names 
updateNames()

async function updateNames() {
    names = await getNames()
}

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


//Fonction de chargement d'une fusée en particulier 
//Fonction d'envoi de fusée