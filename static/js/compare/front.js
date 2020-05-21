var names 

document.getElementById("zoomInput").value = 140


//Triggering the LoadNFille_A function for the left-hand side with the correct canvas
function loadNFill_L() {
    //triggers LoadNFill with 'L' as argument
    canvas = document.getElementById("canvasL")
    loadNFill_A('L', canvas)
}


//Triggering the LoadNFille_A function for the right-hand side with the correct canvas
function loadNFill_R() {
    //triggers loadNFill with 'R' as argument
    canvas = document.getElementById("canvasR")
    loadNFill_A('R', canvas)
}


//Loading a rocket by name and filling its information
async function loadNFill_A(add, canvas) {
    //Resets the fields
    cleanFields(add)

    //Fetching general specifications
    name = document.getElementById('rocketSelector'+add).value
    rocket = await getRocketbyName(name)
    i = Object.keys(rocket["Stage number"])[0] //Non null index
    stageNumber = rocket["Stage number"][i]
    booster = rocket["B Isp [s]"][i] != null
    document.getElementById("stageNumber"+add).textContent = stageNumber
    document.getElementById("boosters"+add).textContent = booster
    document.getElementById("rocketName"+add).textContent = rocket["Name"][i]
    document.getElementById("rocketYear"+add).textContent = rocket["Year"][i]
    document.getElementById("rocketCountry"+add).textContent = rocket["Country"][i]
    mission = rocket["Mission"][i]
    if (mission=="GTO orbit") {
        mission = "GTO"
    } 
    else {
        mission = "LEO" 
    }
    document.getElementById("mission"+add).textContent = mission
    document.getElementById("totalHeight"+add).textContent = rocket["Height [m]"][i]
    document.getElementById("liftOffMass"+add).textContent = rocket["Lift-off mass [tons]"][i]
    document.getElementById("payloadMass"+add).textContent = rocket["Payload mass [kg]"][i]

    //Updating the payload mass if it is on the optimizing page
    updatePMass()
    
    //Fetching first stage specifications and filling the associated spans
    document.getElementById("stage1Height"+add).textContent = rocket["S1 height [m]"][i]
    document.getElementById("stage1Diameter"+add).textContent = rocket["S1 diameter [m]"][i]
    document.getElementById("stage1Thrust"+add).textContent = rocket["S1 thrust [kN]"][i]
    document.getElementById("stage1Isp"+add).textContent = rocket["S1 Isp [s]"][i]
    document.getElementById("stage1M0"+add).textContent = rocket["S1 m0 [tons]"][i]
    document.getElementById("stage1Mp"+add).textContent = rocket["S1 mp [tons]"][i]
    document.getElementById("stage1Color"+add).textContent = rocket["S1 color"][i]

    if (stageNumber==1 && booster == true) {
        //Fetching booster specifications
        document.getElementById("boosterHeight"+add).textContent = rocket["B height [m]"][i]
        document.getElementById("boosterDiameter"+add).textContent = rocket["B diameter [m]"][i]
        document.getElementById("boosterThrust"+add).textContent = rocket["B thrust [kN]"][i]
        document.getElementById("boosterIsp"+add).textContent = rocket["B Isp [s]"][i]
        document.getElementById("boosterM0"+add).textContent = rocket["B m0 [tons]"][i]
        document.getElementById("boosterMp"+add).textContent = rocket["B mp [tons]"][i]
        document.getElementById("boosterColor"+add).textContent = rocket["Booster color"][i]
    }
    else if (stageNumber==2 && booster==false) {
        //Fetching second stage specifications
        document.getElementById("stage2Height"+add).textContent = rocket["S2 height [m]"][i]
        document.getElementById("stage2Diameter"+add).textContent = rocket["S2 diameter [m]"][i]
        document.getElementById("stage2Thrust"+add).textContent = rocket["S2 thrust [kN]"][i]
        document.getElementById("stage2Isp"+add).textContent = rocket["S2 Isp [s]"][i]
        document.getElementById("stage2M0"+add).textContent = rocket["S2 m0 [tons]"][i]
        document.getElementById("stage2Mp"+add).textContent = rocket["S2 mp [tons]"][i]
        document.getElementById("stage2Color"+add).textContent = rocket["S2 color"][i]
    }
    else {
        //Fetching boosters and second satge specifications
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
    drawRocket_A(add, canvas)
}


//This function chooses the right draw function to call and gives the right parameters
function drawRocket_A(add, canvas) {
    stageNumber = Number(document.getElementById("stageNumber"+add).textContent)
    booster = document.getElementById("boosters"+add).textContent=="true"
    zoom = document.getElementById("zoomInput").value
    showMass = document.getElementById('fuelCheckbox').checked
    if (stageNumber==1 && booster==false) { //It is a rocket with one stage
        fSheight = document.getElementById("stage1Height"+add).textContent
        fSdiameter = document.getElementById("stage1Diameter"+add).textContent
        fSM0 = document.getElementById("stage1M0"+add).textContent
        fSMp = document.getElementById("stage1Mp"+add).textContent
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
        if (fSM0=="") {
            fSM0 = 1000
        }
        else {
            fSM0 = Number(fSM0)
        }
        if (fSMp=="") {
            fSMp = 0
        }
        else {
            fSMp = Number(fSMp)
        }
        fScolor = document.getElementById("stage1Color"+add).textContent
        clearCanvas(canvas)
        draw1Adapt(canvas, fSheight, fSdiameter, zoom, fScolor, fSM0, fSMp, showMass)
    }
    else if (stageNumber == 1) { //It is a rocket with one stage and boosters
        fSheight = document.getElementById("stage1Height"+add).textContent
        fSdiameter = document.getElementById("stage1Diameter"+add).textContent
        bheight = document.getElementById("boosterHeight"+add).textContent
        bdiameter = document.getElementById("boosterDiameter"+add).textContent
        fSM0 = document.getElementById("stage1M0"+add).textContent
        fSMp = document.getElementById("stage1Mp"+add).textContent
        bM0  = document.getElementById("boosterM0"+add).textContent
        bMp  = document.getElementById("boosterMp"+add).textContent
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
        if (fSM0=="") {
            fSM0 = 1000
        }
        else {
            fSM0 = Number(fSM0)
        }
        if (fSMp=="") {
            fSMp = 0
        }
        else {
            fSMp = Number(fSMp)
        }
        if (bM0=="") {
            bM0 = 1000
        }
        else {
            bM0 = Number(bM0)
        }
        if (bMp=="") {
            bMp = 0
        }
        else {
            bMp = Number(bMp)
        }
        fScolor = document.getElementById("stage1Color"+add).textContent
        bcolor = document.getElementById("boosterColor"+add).textContent
        clearCanvas(canvas)
        draw1BAdapt(canvas, fSheight, fSdiameter, bheight, bdiameter, zoom, fScolor, bcolor, fSM0, fSMp, bM0, bMp, showMass)
    }
    else if (stageNumber==2 && booster==false) { //It is a rocket with two stages
        console.log('in')
        fSheight = document.getElementById("stage1Height"+add).textContent
        fSdiameter = document.getElementById("stage1Diameter"+add).textContent
        sSheight = document.getElementById("stage2Height"+add).textContent
        sSdiameter = document.getElementById("stage2Diameter"+add).textContent
        fSM0 = document.getElementById("stage1M0"+add).textContent
        fSMp = document.getElementById("stage1Mp"+add).textContent
        sSM0 = document.getElementById("stage2M0"+add).textContent
        sSMp = document.getElementById("stage2Mp"+add).textContent
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
        if (fSM0=="") {
            fSM0 = 1000
        }
        else {
            fSM0 = Number(fSM0)
        }
        if (fSMp=="") {
            fSMp = 0
        }
        else {
            fSMp = Number(fSMp)
        }
        if (sSM0=="") {
            sSM0 = 1000
        }
        else {
            sSM0 = Number(sSM0)
        }
        if (sSMp=="") {
            sSMp = 0
        }
        else {
            sSMp = Number(sSMp)
        }
        fScolor = document.getElementById("stage1Color"+add).textContent
        sScolor = document.getElementById("stage2Color"+add).textContent
        clearCanvas(canvas)
        draw2Adapt(canvas,fSheight, fSdiameter, sSheight, sSdiameter, zoom, fScolor, sScolor, fSM0, fSMp, sSM0, sSMp, showMass)
    
    }
    else { //It is a rocket with two stages and boosters
        fSheight = document.getElementById("stage1Height"+add).textContent
        fSdiameter = document.getElementById("stage1Diameter"+add).textContent
        sSheight = document.getElementById("stage2Height"+add).textContent
        sSdiameter = document.getElementById("stage2Diameter"+add).textContent
        bheight = document.getElementById("boosterHeight"+add).textContent
        bdiameter = document.getElementById("boosterDiameter"+add).textContent
        fSM0 = document.getElementById("stage1M0"+add).textContent
        fSMp = document.getElementById("stage1Mp"+add).textContent
        bM0  = document.getElementById("boosterM0"+add).textContent
        bMp  = document.getElementById("boosterMp"+add).textContent
        sSM0 = document.getElementById("stage2M0"+add).textContent
        sSMp = document.getElementById("stage2Mp"+add).textContent
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
        if (fSM0=="") {
            fSM0 = 1000
        }
        else {
            fSM0 = Number(fSM0)
        }
        if (fSMp=="") {
            fSMp = 0
        }
        else {
            fSMp = Number(fSMp)
        }
        if (bM0=="") {
            bM0 = 1000
        }
        else {
            bM0 = Number(bM0)
        }
        if (bMp=="") {
            bMp = 0
        }
        else {
            bMp = Number(bMp)
        }
        if (sSM0=="") {
            sSM0 = 1000
        }
        else {
            sSM0 = Number(sSM0)
        }
        if (sSMp=="") {
            sSMp = 0
        }
        else {
            sSMp = Number(sSMp)
        }
        fScolor = document.getElementById("stage1Color"+add).textContent
        sScolor = document.getElementById("stage2Color"+add).textContent
        bcolor = document.getElementById("boosterColor"+add).textContent
        clearCanvas(canvas)
        draw2BAdapt(canvas, fSheight, fSdiameter, sSheight, sSdiameter, bheight, bdiameter, zoom, fScolor, sScolor, bcolor, fSM0, fSMp, sSM0, sSMp, bM0, bMp, showMass)
    
    }
}

function cleanFields(add) {
    //Resets the comparing fields befor changing the rocket changed
    //General
    document.getElementById("rocketName"+add).textContent = ''
    document.getElementById("rocketYear"+add).textContent = ''
    document.getElementById("rocketCountry"+add).textContent = ''
    document.getElementById("mission"+add).textContent = ''
    document.getElementById("totalHeight"+add).textContent = ''
    document.getElementById("liftOffMass"+add).textContent = ''
    document.getElementById("payloadMass"+add).textContent = ''
    document.getElementById("stageNumber"+add).textContent = ''
    document.getElementById("boosters"+add).textContent = ''

    //First Stage
    document.getElementById("stage1Height"+add).textContent = ''
    document.getElementById("stage1Diameter"+add).textContent = ''
    document.getElementById("stage1Thrust"+add).textContent = ''
    document.getElementById("stage1Isp"+add).textContent = ''
    document.getElementById("stage1M0"+add).textContent = ''
    document.getElementById("stage1Mp"+add).textContent = ''

    //Boosters
    document.getElementById("stage2Height"+add).textContent = ''
    document.getElementById("stage2Diameter"+add).textContent = ''
    document.getElementById("stage2Thrust"+add).textContent = ''
    document.getElementById("stage2Isp"+add).textContent = ''
    document.getElementById("stage2M0"+add).textContent = ''
    document.getElementById("stage2Mp"+add).textContent = ''

    //Second Stage
    document.getElementById("boosterHeight"+add).textContent = ''
    document.getElementById("boosterDiameter"+add).textContent = ''
    document.getElementById("boosterThrust"+add).textContent = ''
    document.getElementById("boosterIsp"+add).textContent = ''
    document.getElementById("boosterM0"+add).textContent = ''
    document.getElementById("boosterMp"+add).textContent = ''
}


document.getElementById("zoomInput").addEventListener("input", loadNFill_L)
document.getElementById("fuelCheckbox").addEventListener("change", loadNFill_L)