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


function updateSimulationForm() {
    formType = document.getElementById("algoSelect").value
    if (formType=="random") {
        document.getElementById("moving_form").innerHTML = `<div class="vertical" style="height: 100%;">
            <div>
                <label class="uk-form-label" for="testNb">Number of tests:</label>
                <input class="uk-input uk-form-width-medium" id="testNb" type="number" placeholder="Number of tests" value="10000" step="0.01" name='testNb' autocomplete="off">
            </div> 
            <div>
                <label class="uk-form-label" for="payloadMassInput">Gradient steps:</label>
                <input class="uk-input uk-form-width-medium" id="gdSteps" type="number" placeholder="Gradient-descent steps" value="1000" step="0.01" name='gdSteps' autocomplete="off">
            </div> 
            <div>
                <label class="uk-form-label" for="dimension">Dimension:</label>
                <input class="uk-input uk-form-width-medium" id="dimension" type="number" placeholder="Dimension" value="3" step="0.01" name='dimension' autocomplete="off">
            </div> 
        </div>`
    }
    else if (formType=="genetic") {
        document.getElementById("moving_form").innerHTML = `<div class="vertical" style="height: 100%;">
        <div>
            <label class="uk-form-label" for="popSize">Population Size:</label>
            <input class="uk-input uk-form-width-medium" id="popSize" type="number" placeholder="Population Size" value="100" step="1" name='popSize' autocomplete="off">
        </div> 
        <div>
            <label class="uk-form-label" for="iterNb">Number of iterations:</label>
            <input class="uk-input uk-form-width-medium" id="iterNb" type="number" placeholder="Gradient-descent steps" value="20" step="1" name='iterNb' autocomplete="off">
        </div> 
        <div>
            <label class="uk-form-label" for="dimension">Dimension:</label>
            <input class="uk-input uk-form-width-medium" id="dimension" type="number" placeholder="Dimension" value="3" step="1" name='dimension' autocomplete="off">
        </div> 
    </div>

    <div class="vertical" style="height: 100%;">
        <div>
            <label class="uk-form-label" for="gRate">Selection rate: (1 kept every ... people)</label>
            <input class="uk-input uk-form-width-medium" id="gRate" type="number" placeholder="Number of tests" value="2" step="1" name='gRate' autocomplete="off">
        </div> 
        <div>
            <label class="uk-form-label" for="payloadMassInput">Gradient steps:</label>
            <input class="uk-input uk-form-width-medium" id="gdSteps" type="number" placeholder="Gradient-descent steps" value="1000" step="0.01" name='gdSteps' autocomplete="off">
        </div> 
    </div>`
    }
}


document.getElementById("algoSelect").addEventListener("change", updateSimulationForm)
document.getElementById("missionSelect").addEventListener("change", updateMissionForm)
document.getElementById("excentricityInput").addEventListener("keyup", checkExcentricity)