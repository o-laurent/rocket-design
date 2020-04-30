/*Need to verify a lot of data*/ 

// Check that the times are good : boosters will leave before the 1 stage
// If not, maybe reduce the size of the boosters
// Function to empty the form
// Check that the name hasn't been given already

document.getElementById("stageNumber").addEventListener("change", function (e){
    if (document.getElementById('stageNumber').value=='2') {
        document.getElementById('secondStageDiv').style.display = 'block';
    }
    else {
        document.getElementById('secondStageDiv').style.display = 'none';
    }
})

document.getElementById("boosterSelect").addEventListener("change", function (e){
    if (document.getElementById('boosterSelect').value=='1') {
        document.getElementById('boosterDiv').style.display = 'block';
    }
    else {
        document.getElementById('boosterDiv').style.display = 'none';
    }
})

document.getElementById("rocketName").addEventListener("keyup", function (e){
    document.getElementById("dName").innerHTML = document.getElementById("rocketName").value
})

document.getElementById("rocketYear").addEventListener("keyup", function (e){
    document.getElementById("dYear").innerHTML = document.getElementById("rocketYear").value
})


//Utility functions
function drawRocket() {
    stageNumber = Number(document.getElementById("stageNumber").value)
    booster = Boolean(Number(document.getElementById("boosterSelect").value))
    if (stageNumber==1 && booster==false) {
        fSheight = document.getElementById("stage1Height").value
        fSdiameter = document.getElementById("stage1Diameter").value
        if (fSheight=="") {
            fSheight = 80
        }
        else {
            fSheight = Number(fSheight)
        }
        if (fSdiameter=="") {
            fSdiameter = 8
        }
        else {
            fSdiameter = Number(fSdiameter)
        }
        fScolor = document.getElementById("stage1Color").value
        clearCanvas()
        draw1Adapt(fSheight, fSdiameter, 140, fScolor)
    }
    else if (stageNumber == 1){
        fSheight = document.getElementById("stage1Height").value
        fSdiameter = document.getElementById("stage1Diameter").value
        bheight = document.getElementById("boosterHeight").value
        bdiameter = document.getElementById("boosterDiameter").value
        if (fSheight=="") {
            fSheight = 80
        }
        else {
            fSheight = Number(fSheight)
        }
        if (fSdiameter=="") {
            fSdiameter = 8
        }
        else {
            fSdiameter = Number(fSdiameter)
        }
        if (bheight=="") {
            bheight = 40
        }
        else {
            bheight = Number(bheight)
        }
        if (bdiameter=="") {
            bdiameter = 3
        }
        else {
            bdiameter = Number(bdiameter)
        }
        fScolor = document.getElementById("stage1Color").value
        bcolor = document.getElementById("boosterColor").value
        clearCanvas()
        draw1BAdapt(fSheight, fSdiameter, bheight, bdiameter, 140, fScolor, bcolor)
    }
    else if (stageNumber==2 && booster==false) {
        clearCanvas()
        draw2()
    }
    else {
        clearCanvas()
        draw2B()
    }
}

//Updating Listeners
document.getElementById("stage1Height").addEventListener("keyup", drawRocket)
document.getElementById("stage1Diameter").addEventListener("keyup", drawRocket)
document.getElementById("boosterHeight").addEventListener("keyup", drawRocket)
document.getElementById("boosterDiameter").addEventListener("keyup", drawRocket)
document.getElementById("stageNumber").addEventListener("click", drawRocket())
document.getElementById("boosterSelect").addEventListener("click", drawRocket())
document.getElementById("stage1Color").addEventListener("input", drawRocket)
document.getElementById("boosterColor").addEventListener("input", drawRocket)
document.getElementById("stage2Color").addEventListener("input", drawRocket)