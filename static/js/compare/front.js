var names 
updateNames()

async function updateNames() {
    names = await getNames()
    fillRocketSelector('rocketSelectorL')
    fillRocketSelector('rocketSelectorR')
}

async function loadNFill_A(add) {
    name = document.getElementById('rocketSelector').value
    rocket = await getRocketbyName(name)
    i = Object.keys(rocket["Stage number"])[0]
    stageNumber = rocket["Stage number"][i]
    booster = rocket["B Isp [s]"][i] != null
    document.getElementById("stageNumber"+add).value = stageNumber
    document.getElementById("boosterSelect"+add).value = (Number(booster)).toString()
    document.getElementById("rocketName"+add).value = rocket["Name"][i]
    document.getElementById("rocketYear"+add).value = rocket["Year"][i]
    document.getElementById("rocketCountry"+add).value = rocket["Country"][i]

    if (stageNumber==1 && booster==false) {
        document.getElementById("stage1Height"+add).value = rocket["S1 height [m]"][i]
        document.getElementById("stage1Diameter"+add).value = rocket["S1 diameter [m]"][i]
        document.getElementById("stage1Thrust"+add).value = rocket["S1 thrust [kN]"][i]
        document.getElementById("stage1Isp"+add).value = rocket["S1 Isp [s]"][i]
        document.getElementById("stage1M0"+add).value = rocket["S1 m0 [tons]"][i]
        document.getElementById("stage1Mp"+add).value = rocket["S1 mp [tons]"][i]
        document.getElementById("stage1Color"+add).value = rocket["S1 color"][i]
    }
    else if (stageNumber == 1){
        document.getElementById("stage1Height"+add).value = rocket["S1 height [m]"][i]
        document.getElementById("stage1Diameter"+add).value = rocket["S1 diameter [m]"][i]
        document.getElementById("stage1Thrust"+add).value = rocket["S1 thrust [kN]"][i]
        document.getElementById("stage1Isp"+add).value = rocket["S1 Isp [s]"][i]
        document.getElementById("stage1M0"+add).value = rocket["S1 m0 [tons]"][i]
        document.getElementById("stage1Mp"+add).value = rocket["S1 mp [tons]"][i]
        document.getElementById("stage1Color"+add).value = rocket["S1 color"][i]

        document.getElementById("boosterHeight"+add).value = rocket["B height [m]"][i]
        document.getElementById("boosterDiameter"+add).value = rocket["B diameter [m]"][i]
        document.getElementById("boosterThrust"+add).value = rocket["B thrust [kN]"][i]
        document.getElementById("boosterIsp"+add).value = rocket["B Isp [s]"][i]
        document.getElementById("boosterM0"+add).value = rocket["B m0 [tons]"][i]
        document.getElementById("boosterMp"+add).value = rocket["B mp [tons]"][i]
        document.getElementById("boosterColor"+add).value = rocket["Booster color"][i]
    }
    else if (stageNumber==2 && booster==false) {
        document.getElementById("stage1Height"+add).value = rocket["S1 height [m]"][i]
        document.getElementById("stage1Diameter"+add).value = rocket["S1 diameter [m]"][i]
        document.getElementById("stage1Thrust"+add).value = rocket["S1 thrust [kN]"][i]
        document.getElementById("stage1Isp"+add).value = rocket["S1 Isp [s]"][i]
        document.getElementById("stage1M0"+add).value = rocket["S1 m0 [tons]"][i]
        document.getElementById("stage1Mp"+add).value = rocket["S1 mp [tons]"][i]
        document.getElementById("stage1Color"+add).value = rocket["S1 color"][i]

        document.getElementById("stage2Height"+add).value = rocket["S2 height [m]"][i]
        document.getElementById("stage2Diameter"+add).value = rocket["S2 diameter [m]"][i]
        document.getElementById("stage2Thrust"+add).value = rocket["S2 thrust [kN]"][i]
        document.getElementById("stage2Isp"+add).value = rocket["S2 Isp [s]"][i]
        document.getElementById("stage2M0"+add).value = rocket["S2 m0 [tons]"][i]
        document.getElementById("stage2Mp"+add).value = rocket["S2 mp [tons]"][i]
        document.getElementById("stage2Color"+add).value = rocket["S2 color"][i]
    }
    else {
        document.getElementById("stage1Height"+add).value = rocket["S1 height [m]"][i]
        document.getElementById("stage1Diameter"+add).value = rocket["S1 diameter [m]"][i]
        document.getElementById("stage1Thrust"+add).value = rocket["S1 thrust [kN]"][i]
        document.getElementById("stage1Isp"+add).value = rocket["S1 Isp [s]"][i]
        document.getElementById("stage1M0"+add).value = rocket["S1 m0 [tons]"][i]
        document.getElementById("stage1Mp"+add).value = rocket["S1 mp [tons]"][i]
        document.getElementById("stage1Color"+add).value = rocket["S1 color"][i]

        document.getElementById("stage2Height"+add).value = rocket["S2 height [m]"][i]
        document.getElementById("stage2Diameter"+add).value = rocket["S2 diameter [m]"][i]
        document.getElementById("stage2Thrust"+add).value = rocket["S2 thrust [kN]"][i]
        document.getElementById("stage2Isp"+add).value = rocket["S2 Isp [s]"][i]
        document.getElementById("stage2M0"+add).value = rocket["S2 m0 [tons]"][i]
        document.getElementById("stage2Mp"+add).value = rocket["S2 mp [tons]"][i]
        document.getElementById("stage2Color"+add).value = rocket["S2 color"][i]

        document.getElementById("boosterHeight"+add).value = rocket["B height [m]"][i]
        document.getElementById("boosterDiameter"+add).value = rocket["B diameter [m]"][i]
        document.getElementById("boosterThrust"+add).value = rocket["B thrust [kN]"][i]
        document.getElementById("boosterIsp"+add).value = rocket["B Isp [s]"][i]
        document.getElementById("boosterM0"+add).value = rocket["B m0 [tons]"][i]
        document.getElementById("boosterMp"+add).value = rocket["B mp [tons]"][i]
        document.getElementById("boosterColor"+add).value = rocket["Booster color"][i]
    }
    popup_container = document.getElementById("load-toggle"+add)
    popup_container.style = "display: hidden;"
    if (document.getElementById('stageNumber'+add).value=='2') {
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
    }
    drawRocket_A()
}

function drawRocket_A() {
    stageNumber = Number(document.getElementById("stageNumber"+add).value)
    booster = Boolean(Number(document.getElementById("boosterSelect"+add).value))
    zoom = document.getElementById("zoomInput"+add).value
    if (stageNumber==1 && booster==false) {
        fSheight = document.getElementById("stage1Height"+add).value
        fSdiameter = document.getElementById("stage1Diameter"+add).value
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
        fScolor = document.getElementById("stage1Color"+add).value
        clearCanvas()
        draw1Adapt(fSheight, fSdiameter, zoom, fScolor)
    }
    else if (stageNumber == 1) {
        fSheight = document.getElementById("stage1Height"+add).value
        fSdiameter = document.getElementById("stage1Diameter"+add).value
        bheight = document.getElementById("boosterHeight"+add).value
        bdiameter = document.getElementById("boosterDiameter"+add).value
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
        fScolor = document.getElementById("stage1Color"+add).value
        bcolor = document.getElementById("boosterColor"+add).value
        clearCanvas()
        draw1BAdapt(fSheight, fSdiameter, bheight, bdiameter, zoom, fScolor, bcolor)
    }
    else if (stageNumber==2 && booster==false) {
        fSheight = document.getElementById("stage1Height"+add).value
        fSdiameter = document.getElementById("stage1Diameter"+add).value
        sSheight = document.getElementById("stage2Height"+add).value
        sSdiameter = document.getElementById("stage2Diameter"+add).value
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
        fScolor = document.getElementById("stage1Color"+add).value
        sScolor = document.getElementById("stage2Color"+add).value
        clearCanvas()
        draw2Adapt(fSheight, fSdiameter, sSheight, sSdiameter, zoom, fScolor, sScolor)
    
    }
    else {
        fSheight = document.getElementById("stage1Height"+add).value
        fSdiameter = document.getElementById("stage1Diameter"+add).value
        sSheight = document.getElementById("stage2Height"+add).value
        sSdiameter = document.getElementById("stage2Diameter"+add).value
        bheight = document.getElementById("boosterHeight"+add).value
        bdiameter = document.getElementById("boosterDiameter"+add).value
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
        fScolor = document.getElementById("stage1Color"+add).value
        sScolor = document.getElementById("stage2Color"+add).value
        bcolor = document.getElementById("boosterColor"+add).value
        clearCanvas()
        draw2BAdapt(fSheight, fSdiameter, sSheight, sSdiameter, bheight, bdiameter, zoom, fScolor, sScolor, bcolor)
    
    }
}