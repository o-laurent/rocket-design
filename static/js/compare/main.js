var rockets 
updateRockets()

async function updateRockets() {
    rockets = await getRockets()
}


async function getRockets() {
    const param = {
        method : 'GET',
        mode: 'cors',
        headers : {
            'Content-Type': 'application/json'
        }
    }
    // On appelle le serveur
    return fetch ('/api/rockets/all',param)
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