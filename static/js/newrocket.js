/*Need to verify a lot of data*/ 

//Check that the heights, the masses are good
//Check that the times are good : boosters will leave before the 1 stage
//If not, maybe reduce the size of the boosters
//Think how to input thz different masses 
//width/height of engine depending on width

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


/*Choose the right model*/
document.getElementById("stageNumber").addEventListener("click", function (e){
    stageNumber = Number(document.getElementById("stageNumber").value)
    booster =  Number(document.getElementById("boosterSelect").value)
    if (stageNumber==1 && booster==0) {
        clearCanvas()
        draw1Adapt(80, 8)
    }
    else if (stageNumber == 1) {
        clearCanvas()
        draw1BAdapt(80, 8, 50, 4)
    }
    else if (stageNumber==2 && booster==0) {
        clearCanvas()
        draw2()
    }
    else {
        clearCanvas()
        draw2B()
    }
})

document.getElementById("boosterSelect").addEventListener("click", function (e){
    stageNumber = Number(document.getElementById("stageNumber").value)
    booster = Number(document.getElementById("boosterSelect").value)
    if (stageNumber==1 && booster==0) {
        clearCanvas()
        draw1Adapt(80, 8)
    }
    else if (stageNumber == 1){
        clearCanvas()
        draw1BAdapt(80, 8, 50, 4)
    }
    else if (stageNumber==2 && booster==0) {
        clearCanvas()
        draw2()
    }
    else {
        clearCanvas()
        draw2B()
    }
})


//Changing size listeners
document.getElementById("stage1Height").addEventListener("keyup", drawRocket)
document.getElementById("stage1Diameter").addEventListener("keyup", drawRocket)
document.getElementById("boosterHeight").addEventListener("keyup", drawRocket)
document.getElementById("boosterDiameter").addEventListener("keyup", drawRocket)


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
        clearCanvas()
        draw1Adapt(fSheight, fSdiameter)
    }
    else if (stageNumber == 1){
        fSheight = document.getElementById("stage1Height").value
        fSdiameter = document.getElementById("stage1Diameter").value
        bheight = document.getElementById("boosterHeight").value
        bdiameter = document.getElementById("boosterDiameter").value
        if (fSheight=="") {
            fSheight = 50
        }
        else {
            fSheight = Number(fSheight)
        }
        if (fSdiameter=="") {
            fSdiameter = 5
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
        clearCanvas()
        draw1BAdapt(fSheight, fSdiameter, bheight, bdiameter)
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