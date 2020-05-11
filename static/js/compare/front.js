var names 
updateNames()

async function updateNames() {
    names = await getNames()
    fillRocketSelector('rocketSelectorL')
    fillRocketSelector('rocketSelectorR')
}

function loadNFill_L() {
    //triggers LoadNFill with 'L' as argument
    loadNFill_A('L')
}

function loadNFill_R() {
    //triggers loadNFill with 'R' as argument
    loadNFill_A('R')
}
async function loadNFill_A(add) {
    //Loading a rocket by name and filling its information
    cleanFields(add)
    name = document.getElementById('rocketSelector'+add).value
    rocket = await getRocketbyName(name)
    i = Object.keys(rocket["Stage number"])[0]
    stageNumber = rocket["Stage number"][i]
    console.log(rocket)
    booster = rocket["B Isp [s]"][i] != null
    document.getElementById("stageNumber"+add).textContent = stageNumber
    document.getElementById("boosters"+add).textContent = booster
    document.getElementById("rocketName"+add).textContent = rocket["Name"][i]
    document.getElementById("rocketYear"+add).textContent = rocket["Year"][i]
    document.getElementById("rocketCountry"+add).textContent = rocket["Country"][i]

    if (stageNumber==1 && booster==false) {
        document.getElementById("stage1Height"+add).textContent = rocket["S1 height [m]"][i]
        document.getElementById("stage1Diameter"+add).textContent = rocket["S1 diameter [m]"][i]
        document.getElementById("stage1Thrust"+add).textContent = rocket["S1 thrust [kN]"][i]
        document.getElementById("stage1Isp"+add).textContent = rocket["S1 Isp [s]"][i]
        document.getElementById("stage1M0"+add).textContent = rocket["S1 m0 [tons]"][i]
        document.getElementById("stage1Mp"+add).textContent = rocket["S1 mp [tons]"][i]
        document.getElementById("stage1Color"+add).textContent = rocket["S1 color"][i]
    }
    else if (stageNumber == 1){
        document.getElementById("stage1Height"+add).textContent = rocket["S1 height [m]"][i]
        document.getElementById("stage1Diameter"+add).textContent = rocket["S1 diameter [m]"][i]
        document.getElementById("stage1Thrust"+add).textContent = rocket["S1 thrust [kN]"][i]
        document.getElementById("stage1Isp"+add).textContent = rocket["S1 Isp [s]"][i]
        document.getElementById("stage1M0"+add).textContent = rocket["S1 m0 [tons]"][i]
        document.getElementById("stage1Mp"+add).textContent = rocket["S1 mp [tons]"][i]
        document.getElementById("stage1Color"+add).textContent = rocket["S1 color"][i]

        document.getElementById("boosterHeight"+add).textContent = rocket["B height [m]"][i]
        document.getElementById("boosterDiameter"+add).textContent = rocket["B diameter [m]"][i]
        document.getElementById("boosterThrust"+add).textContent = rocket["B thrust [kN]"][i]
        document.getElementById("boosterIsp"+add).textContent = rocket["B Isp [s]"][i]
        document.getElementById("boosterM0"+add).textContent = rocket["B m0 [tons]"][i]
        document.getElementById("boosterMp"+add).textContent = rocket["B mp [tons]"][i]
        document.getElementById("boosterColor"+add).textContent = rocket["Booster color"][i]
    }
    else if (stageNumber==2 && booster==false) {
        document.getElementById("stage1Height"+add).textContent = rocket["S1 height [m]"][i]
        document.getElementById("stage1Diameter"+add).textContent = rocket["S1 diameter [m]"][i]
        document.getElementById("stage1Thrust"+add).textContent = rocket["S1 thrust [kN]"][i]
        document.getElementById("stage1Isp"+add).textContent = rocket["S1 Isp [s]"][i]
        document.getElementById("stage1M0"+add).textContent = rocket["S1 m0 [tons]"][i]
        document.getElementById("stage1Mp"+add).textContent = rocket["S1 mp [tons]"][i]
        document.getElementById("stage1Color"+add).textContent = rocket["S1 color"][i]

        document.getElementById("stage2Height"+add).textContent = rocket["S2 height [m]"][i]
        document.getElementById("stage2Diameter"+add).textContent = rocket["S2 diameter [m]"][i]
        document.getElementById("stage2Thrust"+add).textContent = rocket["S2 thrust [kN]"][i]
        document.getElementById("stage2Isp"+add).textContent = rocket["S2 Isp [s]"][i]
        document.getElementById("stage2M0"+add).textContent = rocket["S2 m0 [tons]"][i]
        document.getElementById("stage2Mp"+add).textContent = rocket["S2 mp [tons]"][i]
        document.getElementById("stage2Color"+add).textContent = rocket["S2 color"][i]
    }
    else {
        document.getElementById("stage1Height"+add).textContent = rocket["S1 height [m]"][i]
        document.getElementById("stage1Diameter"+add).textContent = rocket["S1 diameter [m]"][i]
        document.getElementById("stage1Thrust"+add).textContent = rocket["S1 thrust [kN]"][i]
        document.getElementById("stage1Isp"+add).textContent = rocket["S1 Isp [s]"][i]
        document.getElementById("stage1M0"+add).textContent = rocket["S1 m0 [tons]"][i]
        document.getElementById("stage1Mp"+add).textContent = rocket["S1 mp [tons]"][i]
        document.getElementById("stage1Color"+add).textContent = rocket["S1 color"][i]

        document.getElementById("stage2Height"+add).textContent = rocket["S2 height [m]"][i]
        document.getElementById("stage2Diameter"+add).textContent = rocket["S2 diameter [m]"][i]
        document.getElementById("stage2Thrust"+add).textContent = rocket["S2 thrust [kN]"][i]
        document.getElementById("stage2Isp"+add).textContent = rocket["S2 Isp [s]"][i]
        document.getElementById("stage2M0"+add).textContent = rocket["S2 m0 [tons]"][i]
        document.getElementById("stage2Mp"+add).textContent = rocket["S2 mp [tons]"][i]
        document.getElementById("stage2Color"+add).textContent = rocket["S2 color"][i]

        document.getElementById("boosterHeight"+add).textContent = rocket["B height [m]"][i]
        document.getElementById("boosterDiameter"+add).textContent = rocket["B diameter [m]"][i]
        document.getElementById("boosterThrust"+add).textContent = rocket["B thrust [kN]"][i]
        document.getElementById("boosterIsp"+add).textContent = rocket["B Isp [s]"][i]
        document.getElementById("boosterM0"+add).textContent = rocket["B m0 [tons]"][i]
        document.getElementById("boosterMp"+add).textContent = rocket["B mp [tons]"][i]
        document.getElementById("boosterColor"+add).textContent = rocket["Booster color"][i]
    }
    popup_container = document.getElementById("load-toggle"+add)
    popup_container.style = "display: hidden;"
    /*if (document.getElementById('stageNumber'+add).value=='2') {
        document.getElementById('secondStageDiv'+add).style.display = 'block';
    }
    else {
        document.getElementById('secondStageDiv'+add).style.display = 'none';
    }
    if (document.getElementById('boosterSelect'+add).value=='1') {
        document.getElementById('boosterDiv'+add).style.display = 'block';
    }
    else {
        document.getElementById('boosterDiv'+add).style.display = 'none';
    }*/
    drawRocket_A(add)
}

function drawRocket_A(add) {
    var canvas = document.getElementById("canvas"+add);
    stageNumber = Number(document.getElementById("stageNumber"+add).textContent)
    booster = document.getElementById("boosters"+add).textContent == "true"
    //zoom = document.getElementById("zoomInput"+add).textContent
    zoom = 100
    if (stageNumber==1 && booster==false) {
        fSheight = document.getElementById("stage1Height"+add).textContent
        fSdiameter = document.getElementById("stage1Diameter"+add).textContent
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
        fScolor = document.getElementById("stage1Color"+add).textContent
        clearCanvas(canvas)
        draw1Adapt(canvas, fSheight, fSdiameter, zoom, fScolor)
    }
    else if (stageNumber == 1) {
        fSheight = document.getElementById("stage1Height"+add).textContent
        fSdiameter = document.getElementById("stage1Diameter"+add).textContent
        bheight = document.getElementById("boosterHeight"+add).textContent
        bdiameter = document.getElementById("boosterDiameter"+add).textContent
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
        fScolor = document.getElementById("stage1Color"+add).textContent
        bcolor = document.getElementById("boosterColor"+add).textContent
        clearCanvas(canvas)
        draw1BAdapt(canvas, fSheight, fSdiameter, bheight, bdiameter, zoom, fScolor, bcolor)
    }
    else if (stageNumber==2 && booster==false) {
        fSheight = document.getElementById("stage1Height"+add).textContent
        fSdiameter = document.getElementById("stage1Diameter"+add).textContent
        sSheight = document.getElementById("stage2Height"+add).textContent
        sSdiameter = document.getElementById("stage2Diameter"+add).textContent
        if (fSheight=="") {
            fSheight = 60
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
        if (sSheight=="") {
            sSheight = 40
        }
        else {
            sSheight = Number(sSheight)
        }
        if (sSdiameter=="") {
            sSdiameter = 6
        }
        else {
            sSdiameter = Number(sSdiameter)
        }
        fScolor = document.getElementById("stage1Color"+add).textContent
        sScolor = document.getElementById("stage2Color"+add).textContent
        clearCanvas(canvas)
        console.log(sSheight)
        console.log(fSdiameter)
        console.log(sSheight)
        console.log(sSdiameter)
        draw2Adapt(canvas, Number(fSheight), Number(fSdiameter), Number(sSheight), Number(sSdiameter), Number(zoom), fScolor, sScolor)
    
    }
    else {
        fSheight = document.getElementById("stage1Height"+add).textContent
        fSdiameter = document.getElementById("stage1Diameter"+add).textContent
        sSheight = document.getElementById("stage2Height"+add).textContent
        sSdiameter = document.getElementById("stage2Diameter"+add).textContent
        bheight = document.getElementById("boosterHeight"+add).textContent
        bdiameter = document.getElementById("boosterDiameter"+add).textContent
        if (fSheight=="") {
            fSheight = 60
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
        if (sSheight=="") {
            sSheight = 40
        }
        else {
            sSheight = Number(sSheight)
        }
        if (sSdiameter=="") {
            sSdiameter = 6
        }
        else {
            sSdiameter = Number(sSdiameter)
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
        fScolor = document.getElementById("stage1Color"+add).textContent
        sScolor = document.getElementById("stage2Color"+add).textContent
        bcolor = document.getElementById("boosterColor"+add).textContent
        clearCanvas(canvas)
        draw2BAdapt(canvas, fSheight, fSdiameter, sSheight, sSdiameter, bheight, bdiameter, zoom, fScolor, sScolor, bcolor)
    
    }
}

function cleanFields(add) {
    //resets the comparing fields when the rocket is changed
    document.getElementById("rocketName"+add).textContent = ''
    document.getElementById("rocketYear"+add).textContent = ''
    document.getElementById("rocketCountry"+add).textContent = ''
    document.getElementById("mission"+add).textContent = ''
    document.getElementById("totalHeight"+add).textContent = ''
    document.getElementById("liftOffMass"+add).textContent = ''
    document.getElementById("payloadMass"+add).textContent = ''
    document.getElementById("stageNumber"+add).textContent = ''
    document.getElementById("boosters"+add).textContent = ''

    document.getElementById("stage1Height"+add).textContent = ''
    document.getElementById("stage1Diameter"+add).textContent = ''
    document.getElementById("stage1Thrust"+add).textContent = ''
    document.getElementById("stage1Isp"+add).textContent = ''
    document.getElementById("stage1M0"+add).textContent = ''
    document.getElementById("stage1Mp"+add).textContent = ''

    document.getElementById("stage2Height"+add).textContent = ''
    document.getElementById("stage2Diameter"+add).textContent = ''
    document.getElementById("stage2Thrust"+add).textContent = ''
    document.getElementById("stage2Isp"+add).textContent = ''
    document.getElementById("stage2M0"+add).textContent = ''
    document.getElementById("stage2Mp"+add).textContent = ''

    document.getElementById("boosterHeight"+add).textContent = ''
    document.getElementById("boosterDiameter"+add).textContent = ''
    document.getElementById("boosterThrust"+add).textContent = ''
    document.getElementById("boosterIsp"+add).textContent = ''
    document.getElementById("boosterM0"+add).textContent = ''
    document.getElementById("boosterMp"+add).textContent = ''
}