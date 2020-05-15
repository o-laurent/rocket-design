updateNames()
async function updateNames() {
    names = await getNames()
    fillRocketSelector('rocketSelectorL')
}

function updateMissionForm() {
    form = document.getElementById("missionForm")
    mission = document.getElementById("missionSelect").value 
    altitudeInput = document.getElementById("altitudeInput")
    excentricityInput = document.getElementById("excentricityInput")
    if (mission=="GTO orbit") {
        altitudeInput.disabled = true
        excentricityInput.disabled = true
    }
    else if (mission=="SUB flight") {
        altitudeInput.disabled = false
        excentricityInput.disabled = true
    }
    else {
        altitudeInput.disabled = false
        excentricityInput.disabled = false
    }
}

function updateSimulationForm() {
    form = document.getElementById("simulationForm")
}

function checkExcentricity() {
    excentricity = Number(document.getElementById("excentricityInput").value)
    excentricityInput = document.getElementById("excentricityInput")
    if (excentricity < 1 && excentricity > 0) {
        excentricityInput.classList.remove('uk-form-danger')
        excentricityInput.classList.add('uk-form-success')
    }
    else {
        excentricityInput.classList.remove('uk-form-success')
        excentricityInput.classList.add('uk-form-danger')
    }
}
document.getElementById("algoSelect").addEventListener("change", updateSimulationForm)
document.getElementById("missionSelect").addEventListener("change", updateMissionForm)
document.getElementById("excentricityInput").addEventListener("keyup", checkExcentricity)