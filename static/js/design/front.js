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
function all_info() {
    stageNumber = Number(document.getElementById("stageNumber").value)
    booster = Boolean(Number(document.getElementById("boosterSelect").value))
    boolean = false
    if (stageNumber==1 && booster==false) {
        fSheight = document.getElementById("stage1Height").value
        fSdiameter = document.getElementById("stage1Diameter").value
        fSthrust = document.getElementById("stage1Thrust").value
        fSisp = document.getElementById("stage1ISP").value
        fSm0 = document.getElementById("stage1M0").value
        fSmp = document.getElementById("stage1Mp").value
        boolean=fSheight!='' &&fSdiameter!='' &&fSthrust!='' &&fSisp!='' &&fSm0!='' &&fSmp!=''
    }
    else if (stageNumber == 1){
        fSheight = document.getElementById("stage1Height").value
        fSdiameter = document.getElementById("stage1Diameter").value
        fSthrust = document.getElementById("stage1Thrust").value
        fSisp = document.getElementById("stage1ISP").value
        fSm0 = document.getElementById("stage1M0").value
        fSmp = document.getElementById("stage1Mp").value

        bheight = document.getElementById("boosterHeight").value
        bdiameter = document.getElementById("boosterDiameter").value
        bthrust = document.getElementById("boosterThrust").value
        bisp = document.getElementById("boosterISP").value
        bm0 = document.getElementById("boosterM0").value
        bmp = document.getElementById("boosterMp").value

        fboolean=fSheight!='' &&fSdiameter!='' &&fSthrust!='' &&fSisp!='' &&fSm0!='' &&fSmp!=''
        bboolean=bheight!='' &&bdiameter!='' &&bthrust!='' &&bisp!='' &&bm0!='' &&bmp!=''
        boolean = fboolean&&bboolean
    }
    else if (stageNumber==2 && booster==false) {
        fSheight = document.getElementById("stage1Height").value
        fSdiameter = document.getElementById("stage1Diameter").value
        fSthrust = document.getElementById("stage1Thrust").value
        fSisp = document.getElementById("stage1ISP").value
        fSm0 = document.getElementById("stage1M0").value
        fSmp = document.getElementById("stage1Mp").value

        sSheight = document.getElementById("stage2Height").value
        sSdiameter = document.getElementById("stage2Diameter").value
        sSthrust = document.getElementById("stage2Thrust").value
        sSisp = document.getElementById("stage2ISP").value
        sSm0 = document.getElementById("stage2M0").value
        sSmp = document.getElementById("stage2Mp").value

        fboolean=fSheight!='' &&fSdiameter!='' &&fSthrust!='' &&fSisp!='' &&fSm0!='' &&fSmp!=''
        sboolean=sSheight!='' &&sdiameter!='' &&sSthrust!='' &&sSisp!='' &&sSm0!='' &&sSmp!=''
        boolean = fboolean&&sboolean
    }
    else {
        fSheight = document.getElementById("stage1Height").value
        fSdiameter = document.getElementById("stage1Diameter").value
        fSthrust = document.getElementById("stage1Thrust").value
        fSisp = document.getElementById("stage1ISP").value
        fSm0 = document.getElementById("stage1M0").value
        fSmp = document.getElementById("stage1Mp").value

        sSheight = document.getElementById("stage2Height").value
        sSdiameter = document.getElementById("stage2Diameter").value
        sSthrust = document.getElementById("stage2Thrust").value
        sSisp = document.getElementById("stage2ISP").value
        sSm0 = document.getElementById("stage2M0").value
        sSmp = document.getElementById("stage2Mp").value

        bheight = document.getElementById("boosterHeight").value
        bdiameter = document.getElementById("boosterDiameter").value
        bthrust = document.getElementById("boosterThrust").value
        bisp = document.getElementById("boosterISP").value
        bm0 = document.getElementById("boosterM0").value
        bmp = document.getElementById("boosterMp").value

        fboolean=fSheight!='' &&fSdiameter!='' &&fSthrust!='' &&fSisp!='' &&fSm0!='' &&fSmp!=''
        sboolean=sSheight!='' &&sdiameter!='' &&sSthrust!='' &&sSisp!='' &&sSm0!='' &&sSmp!=''
        bboolean=bheight!='' &&bdiameter!='' &&bthrust!='' &&bisp!='' &&bm0!='' &&bmp!=''

        boolean = fboolean&&bboolean&&sboolean
    }
    if (boolean) {
        document.getElementById("addBaseButton").disabled = false
    } 
}


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
        fSheight = document.getElementById("stage1Height").value
        fSdiameter = document.getElementById("stage1Diameter").value
        f2Sheight = document.getElementById("stage2Height").value
        f2Sdiameter = document.getElementById("stage2Diameter").value
        if (fSheight=="") {
            fSheight = 40
        }
        else {
            fSheight = Number(fSheight)
        }
        if (fSdiameter=="") {
            fSdiameter = 4
        }
        else {
            fSdiameter = Number(fSdiameter)
        }
        if (f2Sheight=="") {
            f2Sheight = 80
        }
        else {
            f2Sheight = Number(f2Sheight)
        }
        if (f2Sdiameter=="") {
            f2Sdiameter = 8
        }
        else {
            f2Sdiameter = Number(f2Sdiameter)
        }
        fScolor = document.getElementById("stage1Color").value
        fS2color = document.getElementById("stage2Color").value
        clearCanvas()
        draw2Adapt(fSheight, fSdiameter, f2Sheight, f2Sdiameter, 140, fScolor, fS2color)
    
    }
    else {
        clearCanvas()
        draw2B()
    }
    all_info()
}


//Updating Listeners
document.getElementById("stage1Height").addEventListener("keyup", drawRocket)
document.getElementById("stage1Diameter").addEventListener("keyup", drawRocket)
document.getElementById("boosterHeight").addEventListener("keyup", drawRocket)
document.getElementById("boosterDiameter").addEventListener("keyup", drawRocket)
document.getElementById("stageNumber").addEventListener("click", drawRocket)
document.getElementById("boosterSelect").addEventListener("click", drawRocket)

document.getElementById("stage1Thrust").addEventListener("keyup", all_info)
document.getElementById("stage1ISP").addEventListener("keyup", all_info)
document.getElementById("stage1M0").addEventListener("keyup", all_info)
document.getElementById("stage1Mp").addEventListener("keyup", all_info)
document.getElementById("stage2Thrust").addEventListener("keyup", all_info)
document.getElementById("stage2ISP").addEventListener("keyup", all_info)
document.getElementById("stage2M0").addEventListener("keyup", all_info)
document.getElementById("stage2Mp").addEventListener("keyup", all_info)
document.getElementById("boosterThrust").addEventListener("keyup", all_info)
document.getElementById("boosterISP").addEventListener("keyup", all_info)
document.getElementById("boosterM0").addEventListener("keyup", all_info)
document.getElementById("boosterMp").addEventListener("keyup", all_info)

document.getElementById("stage1Color").addEventListener("input", drawRocket)
document.getElementById("boosterColor").addEventListener("input", drawRocket)
document.getElementById("stage2Color").addEventListener("input", drawRocket)