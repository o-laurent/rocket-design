//Functions to draw the rocket according to the data entered on the html page
function canvasSize(canvas) {
    canvas.width = document.getElementById('sidebar').getBoundingClientRect().width
    canvas.height = document.getElementById('sidebar').getBoundingClientRect().height
}
//Draw the rocket with one stage without boosters
function draw1Adapt(canvas, fStageHeight, fStageDiameter, zoom, fStageColor, M0=0, Mp=0, showMass=false) {
    var ctx = canvas.getContext("2d"); 
    midy = canvas.height/2
    midx = canvas.width/2
    ratioV = canvas.height/410
    ratioH = canvas.width/150
    basisX = canvas.height - 50

    ctx.beginPath();
    ctx.moveTo(midx-150*ratioV, 0);
    ctx.lineTo(midx-150*ratioV, canvas.height);
    ctx.lineTo(midx+150*ratioV, canvas.height);
    ctx.lineTo(midx+150*ratioV, 0);
    ctx.lineTo(midx-150*ratioV, 0);
    ctx.stroke();

    //Computing the heights
    CanvasfStageHeight = fStageHeight*((canvas.height-50)/zoom-0.07)
    CanvasfStageWidth = fStageDiameter*((canvas.height-50)/zoom-0.07)

    //Drawing of the central engine
    ctx.fillStyle = '#000000'
    ctx.beginPath();
    ctx.moveTo(midx, (basisX - 0.9*CanvasfStageWidth));
    ctx.lineTo(midx - 0.35*CanvasfStageWidth, basisX);
    ctx.lineTo(midx + 0.35*CanvasfStageWidth, basisX);
    ctx.closePath()
    ctx.fill();

    //Drawing of the first stage
    ctx.fillStyle = fStageColor
    baseXfStage = basisX - 0.7*CanvasfStageWidth
    ctx.fillRect(midx-CanvasfStageWidth/2, baseXfStage - 0.8*CanvasfStageHeight, CanvasfStageWidth, 0.8*CanvasfStageHeight)
    ctx.beginPath()
    ctx.moveTo(midx-CanvasfStageWidth/3, baseXfStage - CanvasfStageHeight)
    ctx.lineTo(midx-CanvasfStageWidth/2, baseXfStage - 0.8*CanvasfStageHeight+1)
    ctx.lineTo(midx+CanvasfStageWidth/2, baseXfStage - 0.8*CanvasfStageHeight+1)
    ctx.lineTo(midx+CanvasfStageWidth/3, baseXfStage - CanvasfStageHeight)
    ctx.lineTo(midx-CanvasfStageWidth/3, baseXfStage - CanvasfStageHeight)
    ctx.closePath()
    ctx.fill()
    
    if (showMass) { //Draw the propellant mass
        CanvaspMassfStageWidth = CanvasfStageWidth*Mp/M0
        ctx.fillStyle = '#6D5FB3'
        ctx.fillRect(midx-CanvaspMassfStageWidth/2, baseXfStage - 0.8*CanvasfStageHeight, CanvaspMassfStageWidth, 0.8*CanvasfStageHeight)
        ctx.beginPath()
        ctx.moveTo(midx-CanvaspMassfStageWidth/3, baseXfStage - CanvasfStageHeight)
        ctx.lineTo(midx-CanvaspMassfStageWidth/2, baseXfStage - 0.8*CanvasfStageHeight+1)
        ctx.lineTo(midx+CanvaspMassfStageWidth/2, baseXfStage - 0.8*CanvasfStageHeight+1)
        ctx.lineTo(midx+CanvaspMassfStageWidth/3, baseXfStage - CanvasfStageHeight)
        ctx.lineTo(midx-CanvaspMassfStageWidth/3, baseXfStage - CanvasfStageHeight)
        ctx.closePath()
        ctx.fill()
    }

    baseXfairing = baseXfStage - CanvasfStageHeight
    ctx.fillStyle = fStageColor
    //Drawing of the fairing
    ctx.beginPath();
    ctx.moveTo(midx-CanvasfStageWidth/3, baseXfairing);
    ctx.quadraticCurveTo(midx, baseXfairing-150, midx+CanvasfStageWidth/3, baseXfairing);
    ctx.fill();
        //separator
    ctx.beginPath()
    ctx.moveTo(midx-CanvasfStageWidth/3, baseXfairing)
    ctx.lineTo(midx+CanvasfStageWidth/3, baseXfairing)
    ctx.closePath()
    ctx.stroke()
}

//Draw the rocket with one stage and boosters
function draw1BAdapt(canvas, fStageHeight, fStageDiameter, bHeight, bDiameter, zoom, fStageColor, bColor, fSM0=0, fSMp=0, bM0=0, bMp=0, showMass=false) {
    var ctx = canvas.getContext("2d"); 
    midy = canvas.height/2
    midx = canvas.width/2
    ratioV = canvas.height/410
    ratioH = canvas.width/150
    basisX = canvas.height - 50

    ctx.beginPath();
    ctx.moveTo(midx-150*ratioV, 0);
    ctx.lineTo(midx-150*ratioV, canvas.height);
    ctx.lineTo(midx+150*ratioV, canvas.height);
    ctx.lineTo(midx+150*ratioV, 0);
    ctx.lineTo(midx-150*ratioV, 0);
    ctx.stroke();

    //Computing the heights
    CanvasfStageHeight = fStageHeight*((canvas.height-50)/zoom-0.07)
    CanvasfStageWidth = fStageDiameter*((canvas.height-50)/zoom-0.07)
    CanvasBHeight = bHeight*((canvas.height-50)/zoom-0.07)
    CanvasBWidth = bDiameter*((canvas.height-50)/zoom-0.07)

    //Drawing of the central engine
    ctx.fillStyle = '#000000'
    ctx.beginPath();
    ctx.moveTo(midx, (basisX - 0.9*CanvasfStageWidth));
    ctx.lineTo(midx - 0.35*CanvasfStageWidth, basisX);
    ctx.lineTo(midx + 0.35*CanvasfStageWidth, basisX);
    ctx.closePath()
    ctx.fill();

    //Drawing of the first stage
    ctx.fillStyle = fStageColor
    baseXfStage = basisX - 0.7*CanvasfStageWidth
    ctx.fillRect(midx-CanvasfStageWidth/2, baseXfStage - 0.8*CanvasfStageHeight, CanvasfStageWidth, 0.8*CanvasfStageHeight)
    ctx.beginPath()
    ctx.moveTo(midx-CanvasfStageWidth/3, baseXfStage - CanvasfStageHeight)
    ctx.lineTo(midx-CanvasfStageWidth/2, baseXfStage - 0.8*CanvasfStageHeight+1)
    ctx.lineTo(midx+CanvasfStageWidth/2, baseXfStage - 0.8*CanvasfStageHeight+1)
    ctx.lineTo(midx+CanvasfStageWidth/3, baseXfStage - CanvasfStageHeight)
    ctx.lineTo(midx-CanvasfStageWidth/3, baseXfStage - CanvasfStageHeight)
    ctx.closePath()
    ctx.fill()

    if (showMass) { //Draws the propellant mass
        console.log('in')
        CanvaspMassfStageWidth = CanvasfStageWidth*fSMp/fSM0 //(Linear approximation)
        ctx.fillStyle = '#6D5FB3' //violet
        ctx.fillRect(midx-CanvaspMassfStageWidth/2, baseXfStage - 0.8*CanvasfStageHeight, CanvaspMassfStageWidth, 0.8*CanvasfStageHeight)
        ctx.beginPath()
        ctx.moveTo(midx-CanvaspMassfStageWidth/3, baseXfStage - CanvasfStageHeight)
        ctx.lineTo(midx-CanvaspMassfStageWidth/2, baseXfStage - 0.8*CanvasfStageHeight+1)
        ctx.lineTo(midx+CanvaspMassfStageWidth/2, baseXfStage - 0.8*CanvasfStageHeight+1)
        ctx.lineTo(midx+CanvaspMassfStageWidth/3, baseXfStage - CanvasfStageHeight)
        ctx.lineTo(midx-CanvaspMassfStageWidth/3, baseXfStage - CanvasfStageHeight)
        ctx.closePath()
        ctx.fill()
    }

    baseXfairing = baseXfStage - CanvasfStageHeight

    //Drawing of the left booster
    lBmidx = midx-CanvasfStageWidth/2 - CanvasBWidth/2
    ctx.fillStyle = '#000000'
    ctx.beginPath();
    ctx.moveTo(lBmidx, (basisX - 0.9*CanvasBWidth));
    ctx.lineTo(lBmidx - 0.35*CanvasBWidth, basisX);
    ctx.lineTo(lBmidx + 0.35*CanvasBWidth, basisX);
    ctx.closePath()
    ctx.fill();

    baseXBooster = basisX - 0.7*CanvasBWidth

    ctx.fillStyle = bColor
    ctx.fillRect(lBmidx-CanvasBWidth/2-1, baseXBooster-0.8*CanvasBHeight, CanvasBWidth, 0.8*CanvasBHeight);
    ctx.beginPath()
    ctx.moveTo(lBmidx+CanvasBWidth/2-1, baseXBooster-CanvasBHeight)
    ctx.lineTo(lBmidx+CanvasBWidth/2-1, baseXBooster-0.8*CanvasBHeight)
    ctx.lineTo(lBmidx-CanvasBWidth/2-1, baseXBooster-0.8*CanvasBHeight)
    ctx.bezierCurveTo(lBmidx-CanvasBWidth/2-1, baseXBooster-0.85*CanvasBHeight, lBmidx-CanvasBWidth/2-1, baseXBooster-CanvasBHeight*0.95, lBmidx+CanvasBWidth/2-1, baseXBooster-CanvasBHeight)
    ctx.closePath();
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(lBmidx+CanvasBWidth/2, baseXfStage)
    ctx.lineTo(lBmidx+CanvasBWidth/2, baseXBooster-CanvasBHeight)
    ctx.closePath()
    ctx.stroke()
    
    if (showMass) { //Draws the propellant mass of the left booster
        console.log('in booster')
        CanvaspMassBWidth = CanvasBWidth*bMp/bM0 //(Linear approximation)
        console.log(CanvaspMassBWidth)
        ctx.fillStyle = '#7B7887' //grey
        ctx.fillRect(lBmidx-CanvaspMassBWidth/2-1, baseXBooster-0.8*CanvasBHeight, CanvaspMassBWidth, 0.8*CanvasBHeight);
    }

    //Drawing of the right booster
    lBmidx = midx + CanvasfStageWidth/2 + CanvasBWidth/2
    ctx.fillStyle = '#000000'
    ctx.beginPath();
    ctx.moveTo(lBmidx, (basisX - 0.9*CanvasBWidth));
    ctx.lineTo(lBmidx - 0.35*CanvasBWidth, basisX);
    ctx.lineTo(lBmidx + 0.35*CanvasBWidth, basisX);
    ctx.closePath()
    ctx.fill();

    ctx.fillStyle = bColor
    ctx.fillRect(lBmidx-CanvasBWidth/2+1, baseXBooster-0.8*CanvasBHeight, CanvasBWidth, 0.8*CanvasBHeight);
    ctx.beginPath()
    ctx.moveTo(lBmidx-CanvasBWidth/2+1, baseXBooster-CanvasBHeight)
    ctx.lineTo(lBmidx-CanvasBWidth/2+1, baseXBooster-0.8*CanvasBHeight)
    ctx.lineTo(lBmidx+CanvasBWidth/2+1, baseXBooster-0.8*CanvasBHeight)
    ctx.bezierCurveTo(lBmidx+CanvasBWidth/2+1, baseXBooster-0.85*CanvasBHeight, lBmidx+CanvasBWidth/2+1, baseXBooster-CanvasBHeight*0.95, lBmidx-CanvasBWidth/2+1, baseXBooster-CanvasBHeight)
    ctx.closePath();
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(lBmidx-CanvasBWidth/2, baseXfStage)
    ctx.lineTo(lBmidx-CanvasBWidth/2, baseXBooster-CanvasBHeight)
    ctx.closePath()
    ctx.stroke()

    if (showMass) { //Draws the propellant mass of the right booster
        console.log('in booster')
        CanvaspMassBWidth = CanvasBWidth*bMp/bM0 //(Linear approximation)
        console.log(CanvaspMassBWidth)
        ctx.fillStyle = '#7B7887' //grey
        ctx.fillRect(lBmidx-CanvaspMassBWidth/2+1, baseXBooster-0.8*CanvasBHeight, CanvaspMassBWidth, 0.8*CanvasBHeight);
    }

    //Drawing of the fairing
    ctx.fillStyle = fStageColor
    ctx.beginPath();
    ctx.moveTo(midx-CanvasfStageWidth/3, baseXfairing);
    ctx.quadraticCurveTo(midx, +baseXfairing-150, midx+CanvasfStageWidth/3, baseXfairing);
    ctx.fill();
        //separator
    ctx.beginPath()
    ctx.moveTo(midx-CanvasfStageWidth/3, baseXfairing)
    ctx.lineTo(midx+CanvasfStageWidth/3, baseXfairing)
    ctx.closePath()
    ctx.stroke()
}

//Draw the rocket with two stages without boosters
function draw2Adapt(canvas, fStageHeight, fStageDiameter, sStageHeight, sStageDiameter, zoom, fStageColor, sStageColor, fSM0=0, fSMp=0, sSM0=0, sSMp=0, showMass=false) {
    var ctx = canvas.getContext("2d"); 
    midy = canvas.height/2
    midx = canvas.width/2
    ratioV = canvas.height/410
    ratioH = canvas.width/150
    basisX = canvas.height - 50

    ctx.beginPath();
    ctx.moveTo(midx-150*ratioV, 0);
    ctx.lineTo(midx-150*ratioV, canvas.height);
    ctx.lineTo(midx+150*ratioV, canvas.height);
    ctx.lineTo(midx+150*ratioV, 0);
    ctx.lineTo(midx-150*ratioV, 0);
    ctx.stroke();

    //Computing the heights
    CanvasfStageHeight = fStageHeight*((canvas.height-50)/zoom-0.07)
    CanvasfStageWidth = fStageDiameter*((canvas.height-50)/zoom-0.07)
    CanvassStageHeight = sStageHeight*((canvas.height-50)/zoom-0.07)
    CanvassStageWidth = sStageDiameter*((canvas.height-50)/zoom-0.07)

    //Drawing of the central engine
    ctx.fillStyle = '#000000'
    ctx.beginPath();
    ctx.moveTo(midx, (basisX - 0.9*CanvasfStageWidth));
    ctx.lineTo(midx - 0.35*CanvasfStageWidth, basisX);
    ctx.lineTo(midx + 0.35*CanvasfStageWidth, basisX);
    ctx.closePath()
    ctx.fill();

    //Drawing of the first stage
    ctx.fillStyle = fStageColor
    baseXfStage = basisX - 0.7*CanvasfStageWidth
    ctx.fillRect(midx-CanvasfStageWidth/2, baseXfStage - 0.8*CanvasfStageHeight, CanvasfStageWidth, 0.8*CanvasfStageHeight)
    ctx.beginPath()
    ctx.moveTo(midx-CanvassStageWidth/2, baseXfStage - CanvasfStageHeight)
    ctx.lineTo(midx-CanvasfStageWidth/2, baseXfStage - 0.8*CanvasfStageHeight+1)
    ctx.lineTo(midx+CanvasfStageWidth/2, baseXfStage - 0.8*CanvasfStageHeight+1)
    ctx.lineTo(midx+CanvassStageWidth/2, baseXfStage - CanvasfStageHeight)
    ctx.lineTo(midx-CanvassStageWidth/2, baseXfStage - CanvasfStageHeight)
    ctx.closePath()
    ctx.fill()

    if (showMass) { //Draws the propellant mass
        CanvaspMassfStageWidth = CanvasfStageWidth*fSMp/fSM0 //(Linear approximation)
        ctx.fillStyle = '#6D5FB3' //violet
        ctx.fillRect(midx-CanvaspMassfStageWidth/2, baseXfStage - 0.8*CanvasfStageHeight, CanvaspMassfStageWidth, 0.8*CanvasfStageHeight)
        ctx.beginPath()
        ctx.moveTo(midx-CanvaspMassfStageWidth/3, baseXfStage - CanvasfStageHeight)
        ctx.lineTo(midx-CanvaspMassfStageWidth/2, baseXfStage - 0.8*CanvasfStageHeight+1)
        ctx.lineTo(midx+CanvaspMassfStageWidth/2, baseXfStage - 0.8*CanvasfStageHeight+1)
        ctx.lineTo(midx+CanvaspMassfStageWidth/3, baseXfStage - CanvasfStageHeight)
        ctx.lineTo(midx-CanvaspMassfStageWidth/3, baseXfStage - CanvasfStageHeight)
        ctx.closePath()
        ctx.fill()
    }

    baseXsStage = baseXfStage - CanvasfStageHeight
    
    //Drawing of the second stage
    ctx.fillStyle = sStageColor
    ctx.fillRect(midx-CanvassStageWidth/2, baseXsStage-0.8*CanvassStageHeight, CanvassStageWidth, 0.8*CanvassStageHeight);
    ctx.beginPath()
    ctx.moveTo(midx-CanvassStageWidth/2, baseXsStage)
    ctx.lineTo(midx-CanvassStageWidth/2+CanvassStageWidth, baseXsStage)
    ctx.closePath()
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(midx-CanvassStageWidth/2, baseXsStage-0.8*CanvassStageHeight)
    ctx.lineTo(midx-CanvassStageWidth/2+CanvassStageWidth, baseXsStage-0.8*CanvassStageHeight)
    ctx.closePath()
    ctx.stroke()

    if (showMass) { //Draws the propellant mass of the second stage
        CanvaspMasssStageWidth = CanvassStageWidth*sSMp/sSM0 //(Linear approximation)
        ctx.fillStyle = '#6D5FB3' //violet
        ctx.fillRect(midx-CanvaspMasssStageWidth/2, baseXsStage-0.8*CanvassStageHeight, CanvaspMasssStageWidth, 0.8*CanvassStageHeight);
    }

    //Drawing of the fairing
    ctx.fillStyle = sStageColor
    baseXfairing= baseXsStage-0.8*CanvassStageHeight
    ctx.beginPath();
    ctx.moveTo(midx-CanvassStageWidth/2, baseXfairing);
    ctx.quadraticCurveTo(midx, baseXfairing-150, midx+CanvassStageWidth/2, baseXfairing);
    ctx.fill();
        //separator
    ctx.beginPath()
    ctx.moveTo(midx-CanvassStageWidth/2, baseXfairing)
    ctx.lineTo(midx-CanvassStageWidth/2+CanvassStageWidth, baseXfairing)
    ctx.closePath()
    ctx.stroke()
}

//Draw the rocket with two stages and boosters
function draw2BAdapt(canvas, fStageHeight, fStageDiameter, sStageHeight, sStageDiameter, bHeight, bDiameter, zoom, fStageColor, sStageColor, bColor, fSM0=0, fSMp=0, sSM0=0, sSMp=0, bM0=0, bMp=0, showMass=false) {
    var ctx = canvas.getContext("2d"); 
    midy = canvas.height/2
    midx = canvas.width/2
    ratioV = canvas.height/410
    ratioH = canvas.width/150
    basisX = canvas.height - 50

    ctx.beginPath();
    ctx.moveTo(midx-150*ratioV, 0);
    ctx.lineTo(midx-150*ratioV, canvas.height);
    ctx.lineTo(midx+150*ratioV, canvas.height);
    ctx.lineTo(midx+150*ratioV, 0);
    ctx.lineTo(midx-150*ratioV, 0);
    ctx.stroke();

    //Computing the heights
    CanvasfStageHeight = fStageHeight*((canvas.height-50)/zoom-0.07)
    CanvasfStageWidth = fStageDiameter*((canvas.height-50)/zoom-0.07)
    CanvassStageHeight = sStageHeight*((canvas.height-50)/zoom-0.07)
    CanvassStageWidth = sStageDiameter*((canvas.height-50)/zoom-0.07)
    CanvasBHeight = bHeight*((canvas.height-50)/zoom-0.07)
    CanvasBWidth = bDiameter*((canvas.height-50)/zoom-0.07)

    //Drawing of the central engine
    ctx.fillStyle = '#000000'
    ctx.beginPath();
    ctx.moveTo(midx, (basisX - 0.9*CanvasfStageWidth));
    ctx.lineTo(midx - 0.35*CanvasfStageWidth, basisX);
    ctx.lineTo(midx + 0.35*CanvasfStageWidth, basisX);
    ctx.closePath()
    ctx.fill();

    //Drawing of the first stage
    ctx.fillStyle = fStageColor
    baseXfStage = basisX - 0.7*CanvasfStageWidth
    ctx.fillRect(midx-CanvasfStageWidth/2, baseXfStage - 0.8*CanvasfStageHeight, CanvasfStageWidth, 0.8*CanvasfStageHeight)
    ctx.beginPath()
    ctx.moveTo(midx-CanvassStageWidth/2, baseXfStage - CanvasfStageHeight)
    ctx.lineTo(midx-CanvasfStageWidth/2, baseXfStage - 0.8*CanvasfStageHeight+1)
    ctx.lineTo(midx+CanvasfStageWidth/2, baseXfStage - 0.8*CanvasfStageHeight+1)
    ctx.lineTo(midx+CanvassStageWidth/2, baseXfStage - CanvasfStageHeight)
    ctx.lineTo(midx-CanvassStageWidth/2, baseXfStage - CanvasfStageHeight)
    ctx.closePath()
    ctx.fill()
    
    if (showMass) { //Draws the propellant mass
        CanvaspMassfStageWidth = CanvasfStageWidth*fSMp/fSM0 //(Linear approximation)
        ctx.fillStyle = '#6D5FB3' //violet
        ctx.fillRect(midx-CanvaspMassfStageWidth/2, baseXfStage - 0.8*CanvasfStageHeight, CanvaspMassfStageWidth, 0.8*CanvasfStageHeight)
        ctx.beginPath()
        ctx.moveTo(midx-CanvaspMassfStageWidth/3, baseXfStage - CanvasfStageHeight)
        ctx.lineTo(midx-CanvaspMassfStageWidth/2, baseXfStage - 0.8*CanvasfStageHeight+1)
        ctx.lineTo(midx+CanvaspMassfStageWidth/2, baseXfStage - 0.8*CanvasfStageHeight+1)
        ctx.lineTo(midx+CanvaspMassfStageWidth/3, baseXfStage - CanvasfStageHeight)
        ctx.lineTo(midx-CanvaspMassfStageWidth/3, baseXfStage - CanvasfStageHeight)
        ctx.closePath()
        ctx.fill()
    }
     //Drawing of the left booster
    lBmidx = midx-CanvasfStageWidth/2 - CanvasBWidth/2
    ctx.fillStyle = '#000000'
    ctx.beginPath();
    ctx.moveTo(lBmidx, (basisX - 0.9*CanvasBWidth));
    ctx.lineTo(lBmidx - 0.35*CanvasBWidth, basisX);
    ctx.lineTo(lBmidx + 0.35*CanvasBWidth, basisX);
    ctx.closePath()
    ctx.fill();
 
    baseXBooster = basisX - 0.7*CanvasBWidth
 
    ctx.fillStyle = bColor
    ctx.fillRect(lBmidx-CanvasBWidth/2-1, baseXBooster-0.8*CanvasBHeight, CanvasBWidth, 0.8*CanvasBHeight);
    ctx.beginPath()
    ctx.moveTo(lBmidx+CanvasBWidth/2-1, baseXBooster-CanvasBHeight)
    ctx.lineTo(lBmidx+CanvasBWidth/2-1, baseXBooster-0.8*CanvasBHeight)
    ctx.lineTo(lBmidx-CanvasBWidth/2-1, baseXBooster-0.8*CanvasBHeight)
    ctx.bezierCurveTo(lBmidx-CanvasBWidth/2-1, baseXBooster-0.85*CanvasBHeight, lBmidx-CanvasBWidth/2-1, baseXBooster-CanvasBHeight*0.95, lBmidx+CanvasBWidth/2-1, baseXBooster-CanvasBHeight)
    ctx.closePath();
    ctx.fill()
 
    ctx.beginPath()
    ctx.moveTo(lBmidx+CanvasBWidth/2, baseXfStage)
    ctx.lineTo(lBmidx+CanvasBWidth/2, baseXBooster-CanvasBHeight)
    ctx.closePath()
    ctx.stroke()

    if (showMass) { //Draws the propellant mass of the left booster
        CanvaspMassBWidth = CanvasBWidth*bMp/bM0 //(Linear approximation)
        ctx.fillStyle = '#7B7887' //grey
        ctx.fillRect(lBmidx-CanvaspMassBWidth/2-1, baseXBooster-0.8*CanvasBHeight, CanvaspMassBWidth, 0.8*CanvasBHeight);
    }

    //Drawing of the right booster
    lBmidx = midx + CanvasfStageWidth/2 + CanvasBWidth/2
    ctx.fillStyle = '#000000'
    ctx.beginPath();
    ctx.moveTo(lBmidx, (basisX - 0.9*CanvasBWidth));
    ctx.lineTo(lBmidx - 0.35*CanvasBWidth, basisX);
    ctx.lineTo(lBmidx + 0.35*CanvasBWidth, basisX);
    ctx.closePath()
    ctx.fill();

    ctx.fillStyle = bColor
    ctx.fillRect(lBmidx-CanvasBWidth/2+1, baseXBooster-0.8*CanvasBHeight, CanvasBWidth, 0.8*CanvasBHeight);
    ctx.beginPath()
    ctx.moveTo(lBmidx-CanvasBWidth/2+1, baseXBooster-CanvasBHeight)
    ctx.lineTo(lBmidx-CanvasBWidth/2+1, baseXBooster-0.8*CanvasBHeight)
    ctx.lineTo(lBmidx+CanvasBWidth/2+1, baseXBooster-0.8*CanvasBHeight)
    ctx.bezierCurveTo(lBmidx+CanvasBWidth/2+1, baseXBooster-0.85*CanvasBHeight, lBmidx+CanvasBWidth/2+1, baseXBooster-CanvasBHeight*0.95, lBmidx-CanvasBWidth/2+1, baseXBooster-CanvasBHeight)
    ctx.closePath();
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(lBmidx-CanvasBWidth/2, baseXfStage)
    ctx.lineTo(lBmidx-CanvasBWidth/2, baseXBooster-CanvasBHeight)
    ctx.closePath()
    ctx.stroke()

    if (showMass) { //Draws the propellant mass of the right booster
        CanvaspMassBWidth = CanvasBWidth*bMp/bM0 //(Linear approximation)
        ctx.fillStyle = '#7B7887' //grey
        ctx.fillRect(lBmidx-CanvaspMassBWidth/2+1, baseXBooster-0.8*CanvasBHeight, CanvaspMassBWidth, 0.8*CanvasBHeight);
    }

    baseXsStage = baseXfStage - CanvasfStageHeight
    
    //Drawing of the second stage
    ctx.fillStyle = sStageColor
    ctx.fillRect(midx-CanvassStageWidth/2, baseXsStage-0.8*CanvassStageHeight, CanvassStageWidth, 0.8*CanvassStageHeight);
    ctx.beginPath()
    ctx.moveTo(midx-CanvassStageWidth/2, baseXsStage)
    ctx.lineTo(midx-CanvassStageWidth/2+CanvassStageWidth, baseXsStage)
    ctx.closePath()
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(midx-CanvassStageWidth/2, baseXsStage-0.8*CanvassStageHeight)
    ctx.lineTo(midx-CanvassStageWidth/2+CanvassStageWidth, baseXsStage-0.8*CanvassStageHeight)
    ctx.closePath()
    ctx.stroke()

    if (showMass) { //Draws the propellant mass of the second stage
        CanvaspMasssStageWidth = CanvassStageWidth*sSMp/sSM0 //(Linear approximation)
        console.log(CanvaspMasssStageWidth)
        ctx.fillStyle = '#6D5FB3' //violet
        ctx.fillRect(midx-CanvaspMasssStageWidth/2, baseXsStage-0.8*CanvassStageHeight, CanvaspMasssStageWidth, 0.8*CanvassStageHeight);
    }

    //Drawing of the fairing
    ctx.fillStyle = sStageColor
    baseXfairing= baseXsStage-0.8*CanvassStageHeight
    ctx.beginPath();
    ctx.moveTo(midx-CanvassStageWidth/2, baseXfairing);
    ctx.quadraticCurveTo(midx, baseXfairing-150, midx+CanvassStageWidth/2, baseXfairing);
    ctx.fill();
        //separator
    ctx.beginPath()
    ctx.moveTo(midx-CanvassStageWidth/2, baseXfairing)
    ctx.lineTo( midx-CanvassStageWidth/2+CanvassStageWidth, baseXfairing)
    ctx.closePath()
    ctx.stroke()
}


function clearCanvas(canvas) {
    var ctx = canvas.getContext("2d"); 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = document.getElementById('sidebar').getBoundingClientRect().width
    canvas.height = document.getElementById('sidebar').getBoundingClientRect().height
    midy = canvas.height/2
    midx = canvas.width/2
    ratioV = canvas.height/410
    ratioH = canvas.width/150
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)"; //Making the canvas opaque
    ctx.fillRect(midx-150*ratioV, 0, 300*ratioV, canvas.height)
}