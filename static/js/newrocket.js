/*Need to verify a lot of data*/ 
document.getElementById("stageNumber").addEventListener("change", function (e){
    if (document.getElementById('stageNumber').value=='2') {
        document.getElementById('secondStageDiv').style.display = 'block';
    }
    else {
        document.getElementById('secondStageDiv').style.display = 'none';
    }
})

document.getElementById("boosterSelect").addEventListener("change", function (e){
    if (document.getElementById('boosterSelect').value=='True') {
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

document.getElementById("stageNumber").addEventListener("click", function (e){
    stageNumber = Number(document.getElementById("stageNumber").value)
    booster =  Boolean(Number(document.getElementById("boosterSelect").value))
    if (stageNumber==1 && booster==false) {
        clearCanvas()
        draw1()
    }
    else if (stageNumber == 1){
        clearCanvas()
        draw1B()
    }
    else if (stageNumber==2 && booster==false) {
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
    booster = Boolean(Number(document.getElementById("boosterSelect").value))
    if (stageNumber==1 && booster==false) {
        clearCanvas()
        draw1()
    }
    else if (stageNumber == 1){
        clearCanvas()
        draw1B()
    }
    else if (stageNumber==2 && booster==false) {
        clearCanvas()
        draw2()
    }
    else {
        clearCanvas()
        draw2B()
    }
})