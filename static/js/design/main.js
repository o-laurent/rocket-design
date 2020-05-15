//Function that gets the names of the rockets already built
async function getNames() {
    const param = {
        method : 'GET',
        mode: 'cors',
        headers : {
            'Content-Type': 'application/json'
        }
    }
    // Calling the server
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

//Function to search a rocket by name
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
    // Calling the server
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

//Function to add a rocket into the database
async function addRocket() {
    rocket = getRocketInfo()
    console.log(rocket)
    const param = {
        method : 'POST',
        mode: 'cors',
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({rocket : rocket})
    }
    // Calling the server
    return fetch ('/api/newrocket', param)
    .then(response =>{
        if (response.status!=200) {
            //Something has went wrong
            console.log("Error")
            UIkit.notification({
                message: 'Error : Please contact the developpers',
                status: 'danger',
                pos: 'top',
                timeout: 100000
            })
        }
        else {
            return response.json()
        } 
    }).then(response =>{
        //Everything is fine, clean the form for a new rocket to come
        cleanForm()
        UIkit.notification({
            message: 'Rocket saved !',
            status: 'success',
            pos: 'top',
            timeout: 3000
        })
        return response
    })
    .catch(console.error)
}

//Allows to choose the rocket you want to load
async function fillRocketSelector(rocketS) {
    // Affiche les options d'un select avec toutes les catégories possibles et en value les _id des catégories
        for(name of names.names)
        {
            var option = document.createElement('option')
            option.innerHTML = name
            option.value = name // ou _id pour enregistrer les id
            document.getElementById(rocketS).appendChild(option);
        }
}