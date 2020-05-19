async function startOptimization() {
    const param = {
        method : 'POST',
        mode: 'cors',
        headers : {
            'Content-Type': 'application/json'
        }
    }
    // Calling the server
    return fetch ('/api/optimize', param)
    .then(response =>{
        if (response.status != 200) {
            console.log("Erreur")
        }
        else {
            return response.json()
        } 
    }).then(response =>{
        console.log(response)
        return response
    })
    .catch(console.error)
}