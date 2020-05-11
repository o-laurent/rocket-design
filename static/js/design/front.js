/*Need to verify a lot of data*/ 

// Check that the times are good : boosters will leave before the 1 stage
// If not, maybe reduce the size of the boosters
// Function to empty the form
// Check that the name hasn't been given already
var names 
updateNames()
document.getElementById("zoomInput").value = 140

async function updateNames() {
    //Gets the name of all the rockets in the database
    names = await getNames()
    fillRocketSelector('rocketSelector')
}
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
clearCanvas()
draw1Adapt(80, 8, 140, '#CCE6FF')
document.getElementById("stageNumber").value = '1'
document.getElementById("boosterSelect").value = '0'
document.getElementById("stage1Color").value = '#CCE6FF'
document.getElementById("boosterColor").value = '#CCE6FF'
document.getElementById("stage2Color").value = '#CCE6FF'

async function loadNFill() {
    name = document.getElementById('rocketSelector').value
    rocket = await getRocketbyName(name)
    i = Object.keys(rocket["Stage number"])[0]
    stageNumber = rocket["Stage number"][i]
    booster = rocket["B Isp [s]"][i] != null
    document.getElementById("stageNumber").value = stageNumber
    document.getElementById("boosterSelect").value = (Number(booster)).toString()
    document.getElementById("rocketName").value = rocket["Name"][i]
    document.getElementById("rocketYear").value = rocket["Year"][i]
    document.getElementById("rocketCountry").value = rocket["Country"][i]

    if (stageNumber==1 && booster==false) {
        document.getElementById("stage1Height").value = rocket["S1 height [m]"][i]
        document.getElementById("stage1Diameter").value = rocket["S1 diameter [m]"][i]
        document.getElementById("stage1Thrust").value = rocket["S1 thrust [kN]"][i]
        document.getElementById("stage1Isp").value = rocket["S1 Isp [s]"][i]
        document.getElementById("stage1M0").value = rocket["S1 m0 [tons]"][i]
        document.getElementById("stage1Mp").value = rocket["S1 mp [tons]"][i]
        document.getElementById("stage1Color").value = rocket["S1 color"][i]
    }
    else if (stageNumber == 1){
        document.getElementById("stage1Height").value = rocket["S1 height [m]"][i]
        document.getElementById("stage1Diameter").value = rocket["S1 diameter [m]"][i]
        document.getElementById("stage1Thrust").value = rocket["S1 thrust [kN]"][i]
        document.getElementById("stage1Isp").value = rocket["S1 Isp [s]"][i]
        document.getElementById("stage1M0").value = rocket["S1 m0 [tons]"][i]
        document.getElementById("stage1Mp").value = rocket["S1 mp [tons]"][i]
        document.getElementById("stage1Color").value = rocket["S1 color"][i]

        document.getElementById("boosterHeight").value = rocket["B height [m]"][i]
        document.getElementById("boosterDiameter").value = rocket["B diameter [m]"][i]
        document.getElementById("boosterThrust").value = rocket["B thrust [kN]"][i]
        document.getElementById("boosterIsp").value = rocket["B Isp [s]"][i]
        document.getElementById("boosterM0").value = rocket["B m0 [tons]"][i]
        document.getElementById("boosterMp").value = rocket["B mp [tons]"][i]
        document.getElementById("boosterColor").value = rocket["Booster color"][i]
    }
    else if (stageNumber==2 && booster==false) {
        document.getElementById("stage1Height").value = rocket["S1 height [m]"][i]
        document.getElementById("stage1Diameter").value = rocket["S1 diameter [m]"][i]
        document.getElementById("stage1Thrust").value = rocket["S1 thrust [kN]"][i]
        document.getElementById("stage1Isp").value = rocket["S1 Isp [s]"][i]
        document.getElementById("stage1M0").value = rocket["S1 m0 [tons]"][i]
        document.getElementById("stage1Mp").value = rocket["S1 mp [tons]"][i]
        document.getElementById("stage1Color").value = rocket["S1 color"][i]

        document.getElementById("stage2Height").value = rocket["S2 height [m]"][i]
        document.getElementById("stage2Diameter").value = rocket["S2 diameter [m]"][i]
        document.getElementById("stage2Thrust").value = rocket["S2 thrust [kN]"][i]
        document.getElementById("stage2Isp").value = rocket["S2 Isp [s]"][i]
        document.getElementById("stage2M0").value = rocket["S2 m0 [tons]"][i]
        document.getElementById("stage2Mp").value = rocket["S2 mp [tons]"][i]
        document.getElementById("stage2Color").value = rocket["S2 color"][i]
    }
    else {
        document.getElementById("stage1Height").value = rocket["S1 height [m]"][i]
        document.getElementById("stage1Diameter").value = rocket["S1 diameter [m]"][i]
        document.getElementById("stage1Thrust").value = rocket["S1 thrust [kN]"][i]
        document.getElementById("stage1Isp").value = rocket["S1 Isp [s]"][i]
        document.getElementById("stage1M0").value = rocket["S1 m0 [tons]"][i]
        document.getElementById("stage1Mp").value = rocket["S1 mp [tons]"][i]
        document.getElementById("stage1Color").value = rocket["S1 color"][i]

        document.getElementById("stage2Height").value = rocket["S2 height [m]"][i]
        document.getElementById("stage2Diameter").value = rocket["S2 diameter [m]"][i]
        document.getElementById("stage2Thrust").value = rocket["S2 thrust [kN]"][i]
        document.getElementById("stage2Isp").value = rocket["S2 Isp [s]"][i]
        document.getElementById("stage2M0").value = rocket["S2 m0 [tons]"][i]
        document.getElementById("stage2Mp").value = rocket["S2 mp [tons]"][i]
        document.getElementById("stage2Color").value = rocket["S2 color"][i]

        document.getElementById("boosterHeight").value = rocket["B height [m]"][i]
        document.getElementById("boosterDiameter").value = rocket["B diameter [m]"][i]
        document.getElementById("boosterThrust").value = rocket["B thrust [kN]"][i]
        document.getElementById("boosterIsp").value = rocket["B Isp [s]"][i]
        document.getElementById("boosterM0").value = rocket["B m0 [tons]"][i]
        document.getElementById("boosterMp").value = rocket["B mp [tons]"][i]
        document.getElementById("boosterColor").value = rocket["Booster color"][i]
    }
    popup_container = document.getElementById("load-toggle")
    popup_container.style = "display: hidden;"
    if (document.getElementById('stageNumber').value=='2') {
        document.getElementById('secondStageDiv').style.display = 'block';
    }
    else {
        document.getElementById('secondStageDiv').style.display = 'none';
    }
    if (document.getElementById('boosterSelect').value=='1') {
        document.getElementById('boosterDiv').style.display = 'block';
    }
    else {
        document.getElementById('boosterDiv').style.display = 'none';
    }
    drawRocket()
}


document.getElementById("stageNumber").addEventListener("change", function (e){
    //Displays or not the second stage information form
    if (document.getElementById('stageNumber').value=='2') {
        document.getElementById('secondStageDiv').style.display = 'block';
    }
    else {
        document.getElementById('secondStageDiv').style.display = 'none';
    }
})

document.getElementById("boosterSelect").addEventListener("change", function (e){
    //Displays or not the booster information form
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
    //Checks that all informations have been given prior to send to backend
    stageNumber = Number(document.getElementById("stageNumber").value)
    booster = Boolean(Number(document.getElementById("boosterSelect").value))
    boolean = false
    if (stageNumber==1 && booster==false) {
        fSheight = document.getElementById("stage1Height").value
        fSdiameter = document.getElementById("stage1Diameter").value
        fSthrust = document.getElementById("stage1Thrust").value
        fSisp = document.getElementById("stage1Isp").value
        fSm0 = document.getElementById("stage1M0").value
        fSmp = document.getElementById("stage1Mp").value
        boolean=fSheight!='' &&fSdiameter!='' &&fSthrust!='' &&fSisp!='' &&fSm0!='' &&fSmp!=''
    }
    else if (stageNumber == 1){
        fSheight = document.getElementById("stage1Height").value
        fSdiameter = document.getElementById("stage1Diameter").value
        fSthrust = document.getElementById("stage1Thrust").value
        fSisp = document.getElementById("stage1Isp").value
        fSm0 = document.getElementById("stage1M0").value
        fSmp = document.getElementById("stage1Mp").value

        bheight = document.getElementById("boosterHeight").value
        bdiameter = document.getElementById("boosterDiameter").value
        bthrust = document.getElementById("boosterThrust").value
        bisp = document.getElementById("boosterIsp").value
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
        fSisp = document.getElementById("stage1Isp").value
        fSm0 = document.getElementById("stage1M0").value
        fSmp = document.getElementById("stage1Mp").value

        sSheight = document.getElementById("stage2Height").value
        sSdiameter = document.getElementById("stage2Diameter").value
        sSthrust = document.getElementById("stage2Thrust").value
        sSisp = document.getElementById("stage2Isp").value
        sSm0 = document.getElementById("stage2M0").value
        sSmp = document.getElementById("stage2Mp").value

        fboolean=fSheight!='' &&fSdiameter!='' &&fSthrust!='' &&fSisp!='' &&fSm0!='' &&fSmp!=''
        sboolean=sSheight!='' &&sSdiameter!='' &&sSthrust!='' &&sSisp!='' &&sSm0!='' &&sSmp!=''
        boolean = fboolean&&sboolean
    }
    else {
        fSheight = document.getElementById("stage1Height").value
        fSdiameter = document.getElementById("stage1Diameter").value
        fSthrust = document.getElementById("stage1Thrust").value
        fSisp = document.getElementById("stage1Isp").value
        fSm0 = document.getElementById("stage1M0").value
        fSmp = document.getElementById("stage1Mp").value

        sSheight = document.getElementById("stage2Height").value
        sSdiameter = document.getElementById("stage2Diameter").value
        sSthrust = document.getElementById("stage2Thrust").value
        sSisp = document.getElementById("stage2Isp").value
        sSm0 = document.getElementById("stage2M0").value
        sSmp = document.getElementById("stage2Mp").value

        bheight = document.getElementById("boosterHeight").value
        bdiameter = document.getElementById("boosterDiameter").value
        bthrust = document.getElementById("boosterThrust").value
        bisp = document.getElementById("boosterIsp").value
        bm0 = document.getElementById("boosterM0").value
        bmp = document.getElementById("boosterMp").value

        fboolean=fSheight!=''&&fSdiameter!='' &&fSthrust!='' &&fSisp!='' &&fSm0!='' &&fSmp!=''
        sboolean=sSheight!=''&&sSdiameter!='' &&sSthrust!='' &&sSisp!='' &&sSm0!='' &&sSmp!=''
        bboolean=bheight!=''&&bdiameter!='' &&bthrust!='' &&bisp!='' &&bm0!='' &&bmp!=''

        boolean = fboolean&&bboolean&&sboolean
    }
    if (boolean) {
        document.getElementById("addBaseButton").disabled = false
    } 
}

function getRocketInfo() {
    //Gets all the info in an object
    name = document.getElementById("rocketName").value
    year = document.getElementById("rocketYear").value
    country = document.getElementById("rocketCountry").value
    mission = document.getElementById("missionSelect").value
    height = document.getElementById("totalHeight").value
    lift_mass = document.getElementById("liftOffMass").value
    payload_mass = document.getElementById("payloadMass").value
    stageNumber = Number(document.getElementById("stageNumber").value)
    booster = Boolean(Number(document.getElementById("boosterSelect").value))
    if (stageNumber==1 && booster==false) {
        fSheight = document.getElementById("stage1Height").value
        fSdiameter = document.getElementById("stage1Diameter").value
        fSthrust = document.getElementById("stage1Thrust").value
        fSisp = document.getElementById("stage1Isp").value
        fSm0 = document.getElementById("stage1M0").value
        fSmp = document.getElementById("stage1Mp").value
        fColor = document.getElementById("stage1Color").value

        rocket = {
            Name:name,
            Year: year,
            Country: country,
            Mission: mission,
            Stage_number:stageNumber,
            Height: height,
            Lift_off_mass: lift_mass,
            Payload_mass: payload_mass,
            fSheight: fSheight,
            fSdiameter: fSdiameter,
            fSthrust: fSthrust,
            fSisp: fSisp,
            fSm0: fSM0,
            fSmp: fSMp,
            bheight: '',
            bdiameter: '',
            bthrust: '',
            bisp: '',
            bm0: '',
            bmp: '',
            sSheight: '',
            sSdiameter: '',
            sSthrust: '',
            sSisp: '',
            sSm0: '',
            sSmp: '',
            fScolor: fSColor,
            bcolor: '',
            scColor: ''
        }
    }
    else if (stageNumber == 1){ //If 1 Stage and boosters 
        fSheight = document.getElementById("stage1Height").value
        fSdiameter = document.getElementById("stage1Diameter").value
        fSthrust = document.getElementById("stage1Thrust").value
        fSisp = document.getElementById("stage1Isp").value
        fSm0 = document.getElementById("stage1M0").value
        fSmp = document.getElementById("stage1Mp").value
        fColor = document.getElementById("stage1Color").value

        bheight = document.getElementById("boosterHeight").value
        bdiameter = document.getElementById("boosterDiameter").value
        bthrust = document.getElementById("boosterThrust").value
        bisp = document.getElementById("boosterIsp").value
        bm0 = document.getElementById("boosterM0").value
        bmp = document.getElementById("boosterMp").value
        bColor = document.getElementById("boosterColor").value

        rocket = {
            Name:name,
            Year: year,
            Country: country,
            Mission: mission,
            Stage_number:stageNumber,
            Height: height,
            Lift_off_mass: lift_mass,
            Payload_mass: payload_mass,
            fSheight: fSheight,
            fSdiameter: fSdiameter,
            fSthrust: fSthrust,
            fSisp: fSisp,
            fSm0: fSM0,
            fSmp: fSMp,
            bheight: bheight,
            bdiameter: bdiameter,
            bthrust: bthrust,
            bisp: bisp,
            bm0: bm0,
            bmp: bmp,
            sSheight: '',
            sSdiameter: '',
            sSthrust: '',
            sSisp: '',
            sSm0: '',
            sSmp: '',
            fScolor: fSColor,
            bcolor: bColor,
            sScolor: ''
        }
    }
    else if (stageNumber==2 && booster==false) { //If 2 Stages and no boosters
        fSheight = document.getElementById("stage1Height").value
        fSdiameter = document.getElementById("stage1Diameter").value
        fSthrust = document.getElementById("stage1Thrust").value
        fSisp = document.getElementById("stage1Isp").value
        fSm0 = document.getElementById("stage1M0").value
        fSmp = document.getElementById("stage1Mp").value
        fSColor = document.getElementById("stage1Color").value

        sSheight = document.getElementById("stage2Height").value
        sSdiameter = document.getElementById("stage2Diameter").value
        sSthrust = document.getElementById("stage2Thrust").value
        sSisp = document.getElementById("stage2Isp").value
        sSm0 = document.getElementById("stage2M0").value
        sSmp = document.getElementById("stage2Mp").value
        sSColor = document.getElementById("stage2Color").value
        
        rocket = {
            Name:name,
            Year: year,
            Country: country,
            Mission: mission,
            Stage_number:stageNumber,
            Height: height,
            Lift_off_mass: lift_mass,
            Payload_mass: payload_mass,
            fSheight: fSheight,
            fSdiameter: fSdiameter,
            fSthrust: fSthrust,
            fSisp: fSisp,
            fSm0: fSM0,
            fSmp: fSMp,
            bheight: '',
            bdiameter: '',
            bthrust: '',
            bisp: '',
            bm0: '',
            bmp: '',
            sSheight: sSheight,
            sSdiameter: sSdiameter,
            sSthrust: sSthrust,
            sSisp: sSisp,
            sSm0: sSm0,
            sSmp: sSmp,
            fScolor: fSColor,
            bcolor: '',
            sSColor: sSColor
        }
    }
    else { //If 2 Stages and boosters
        fSheight = document.getElementById("stage1Height").value
        fSdiameter = document.getElementById("stage1Diameter").value
        fSthrust = document.getElementById("stage1Thrust").value
        fSisp = document.getElementById("stage1Isp").value
        fSm0 = document.getElementById("stage1M0").value
        fSmp = document.getElementById("stage1Mp").value
        fColor = document.getElementById("stage1Color").value

        sSheight = document.getElementById("stage2Height").value
        sSdiameter = document.getElementById("stage2Diameter").value
        sSthrust = document.getElementById("stage2Thrust").value
        sSisp = document.getElementById("stage2Isp").value
        sSm0 = document.getElementById("stage2M0").value
        sSmp = document.getElementById("stage2Mp").value
        sSColor = document.getElementById("stage2Color").value

        bheight = document.getElementById("boosterHeight").value
        bdiameter = document.getElementById("boosterDiameter").value
        bthrust = document.getElementById("boosterThrust").value
        bisp = document.getElementById("boosterIsp").value
        bm0 = document.getElementById("boosterM0").value
        bmp = document.getElementById("boosterMp").value
        bColor = document.getElementById("boosterColor").value

        rocket = {
            Name:name,
            Year: year,
            Country: country,
            Mission: mission,
            Stage_number:stageNumber,
            Height: height,
            Lift_off_mass: lift_mass,
            Payload_mass: payload_mass,
            fSheight: fSheight,
            fSdiameter: fSdiameter,
            fSthrust: fSthrust,
            fSisp: fSisp,
            fSm0: fSM0,
            fSmp: fSMp,
            bheight: bheight,
            bdiameter: bdiameter,
            bthrust: bthrust,
            bisp: bisp,
            bm0: bm0,
            bmp: bmp,
            sSheight: sSheight,
            sSdiameter: sSdiameter,
            sSthrust: sSthrust,
            sSisp: sSisp,
            sSm0: sSm0,
            sSmp: sSmp,
            fScolor: fSColor,
            bcolor: bcolor,
            sScolor: sScolor
        }
    }
    return rocket
}


function drawRocket() {
    stageNumber = Number(document.getElementById("stageNumber").value)
    booster = Boolean(Number(document.getElementById("boosterSelect").value))
    zoom = document.getElementById("zoomInput").value
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
        clearCanvas(ctx)
        draw1Adapt(ctx, fSheight, fSdiameter, zoom, fScolor)
    }
    else if (stageNumber == 1) {
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
        clearCanvas(ctx)
        draw1BAdapt(ctx, fSheight, fSdiameter, bheight, bdiameter, zoom, fScolor, bcolor)
    }
    else if (stageNumber==2 && booster==false) {
        fSheight = document.getElementById("stage1Height").value
        fSdiameter = document.getElementById("stage1Diameter").value
        sSheight = document.getElementById("stage2Height").value
        sSdiameter = document.getElementById("stage2Diameter").value
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
        fScolor = document.getElementById("stage1Color").value
        sScolor = document.getElementById("stage2Color").value
        clearCanvas(ctx)
        draw2Adapt(ctx,fSheight, fSdiameter, sSheight, sSdiameter, zoom, fScolor, sScolor)
    
    }
    else {
        fSheight = document.getElementById("stage1Height").value
        fSdiameter = document.getElementById("stage1Diameter").value
        sSheight = document.getElementById("stage2Height").value
        sSdiameter = document.getElementById("stage2Diameter").value
        bheight = document.getElementById("boosterHeight").value
        bdiameter = document.getElementById("boosterDiameter").value
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
        fScolor = document.getElementById("stage1Color").value
        sScolor = document.getElementById("stage2Color").value
        bcolor = document.getElementById("boosterColor").value
        clearCanvas(ctx)
        draw2BAdapt(ctx, fSheight, fSdiameter, sSheight, sSdiameter, bheight, bdiameter, zoom, fScolor, sScolor, bcolor)
    
    }
    all_info()
}

function cleanForm() {
    //resets the form when the rocket is sent to the backend
    document.getElementById("rocketName").value = ''
    document.getElementById("rocketYear").value = ''
    document.getElementById("rocketCountry").value = ''
    document.getElementById("missionSelect").value = ''
    document.getElementById("totalHeight").value = ''
    document.getElementById("liftOffMass").value = ''
    document.getElementById("payloadMass").value = ''
    Number(document.getElementById("stageNumber").value) = ''
    Boolean(Number(document.getElementById("boosterSelect").value)) = ''

    document.getElementById("stage1Height").value = ''
    document.getElementById("stage1Diameter").value = ''
    document.getElementById("stage1Thrust").value = ''
    document.getElementById("stage1Isp").value = ''
    document.getElementById("stage1M0").value = ''
    document.getElementById("stage1Mp").value = ''

    document.getElementById("stage2Height").value = ''
    document.getElementById("stage2Diameter").value = ''
    document.getElementById("stage2Thrust").value = ''
    document.getElementById("stage2Isp").value = ''
    document.getElementById("stage2M0").value = ''
    document.getElementById("stage2Mp").value = ''

    document.getElementById("boosterHeight").value = ''
    document.getElementById("boosterDiameter").value = ''
    document.getElementById("boosterThrust").value = ''
    document.getElementById("boosterIsp").value = ''
    document.getElementById("boosterM0").value = ''
    document.getElementById("boosterMp").value = ''
}

//Updating Listeners
document.getElementById("zoomInput").addEventListener("keyup", drawRocket)

document.getElementById("stage1Height").addEventListener("keyup", drawRocket)
document.getElementById("stage1Diameter").addEventListener("keyup", drawRocket)
document.getElementById("boosterHeight").addEventListener("keyup", drawRocket)
document.getElementById("boosterDiameter").addEventListener("keyup", drawRocket)
document.getElementById("stageNumber").addEventListener("click", drawRocket)
document.getElementById("boosterSelect").addEventListener("click", drawRocket)
document.getElementById("stage2Height").addEventListener("keyup", drawRocket)
document.getElementById("stage2Diameter").addEventListener("keyup", drawRocket)

document.getElementById("stage1Thrust").addEventListener("keyup", all_info)
document.getElementById("stage1Isp").addEventListener("keyup", all_info)
document.getElementById("stage1M0").addEventListener("keyup", all_info)
document.getElementById("stage1Mp").addEventListener("keyup", all_info)
document.getElementById("stage2Thrust").addEventListener("keyup", all_info)
document.getElementById("stage2Isp").addEventListener("keyup", all_info)
document.getElementById("stage2M0").addEventListener("keyup", all_info)
document.getElementById("stage2Mp").addEventListener("keyup", all_info)
document.getElementById("boosterThrust").addEventListener("keyup", all_info)
document.getElementById("boosterIsp").addEventListener("keyup", all_info)
document.getElementById("boosterM0").addEventListener("keyup", all_info)
document.getElementById("boosterMp").addEventListener("keyup", all_info)

document.getElementById("stage1Color").addEventListener("input", drawRocket)
document.getElementById("boosterColor").addEventListener("input", drawRocket)
document.getElementById("stage2Color").addEventListener("input", drawRocket)