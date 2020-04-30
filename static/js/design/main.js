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
    return fetch ('/api/rocket/names',param)
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