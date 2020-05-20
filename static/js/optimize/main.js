async function startOptimization() {
    spinnerOn();
    mission = document.getElementById('missionSelect').value
    if (mission=='SUB flight') {
        a = document.getElementById('altitudeInput').value
        e = 0
    }
    else if (mission=='LEO') {
        a = document.getElementById('altitudeInput').value
        e = document.getElementById('excentricityInput').value
    }
    else {
        a = 0
        e = 0
    }
    payloadMass = document.getElementById('payloadMassInput').value
    missionParams = {
        "mission": mission,
        "a": Number(a),
        "e": Number(e),
        "payloadMass": Number(payloadMass) 
    }

    rocketName = document.getElementById("rocketNameL").textContent

    algorithm = document.getElementById("algoSelect").value
    if (algorithm=="random") {
        testNb = document.getElementById("testNb").value
        gdSteps = document.getElementById("gdSteps").value
        dimension = document.getElementById("dimension").value
        popSize = 0
        iterNb = 0
        gRate = 0
    }
    else if (algorithm=="genetic") {
        popSize = document.getElementById("popSize").value
        iterNb = document.getElementById("iterNb").value
        dimension = document.getElementById("dimension").value
        gRate = document.getElementById("gRate").value
        gdSteps = document.getElementById("gdSteps").value
        testNb = 0
    }
    algoParams = {
        "algorithm": algorithm,
        "popSize": popSize,
        "iterNb": iterNb,
        "dimension": dimension,
        "gRate": gRate,
        "gdSteps": gdSteps,
        "testNb": testNb
    }
    console.log(rocketName)
    console.log(missionParams)
    console.log(algoParams)
    const param = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': rocketName,
            'missionParams': missionParams,
            'algoParams': algoParams
        })
    }
    // Calling the server
    return fetch ('/api/optimize', param)
    .then(response =>{
        if (response.status != 200) {
            console.log("Erreur")
        }
        else {
            console.log(response)
            return response.json()
        } 
    }).then(response =>{
        localStorage.setItem("optimizedValues", JSON.stringify(response));
        spinnerOff();
        window.location.replace("/trajectory.html");
        return response
    })
    .catch(console.error)
}