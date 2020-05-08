function canvasSize() {
    canvas.width = document.getElementById('sidebar').getBoundingClientRect().width
    canvas.height = document.getElementById('sidebar').getBoundingClientRect().height
}

function draw1Adapt(fStageHeight, fStageDiameter, zoom, fStageColor) {
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

    baseXfairing = baseXfStage - CanvasfStageHeight

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


function draw1BAdapt(fStageHeight, fStageDiameter, bHeight, bDiameter, zoom, fStageColor, bColor) {
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


function draw2Adapt(fStageHeight,fStageDiameter,sStageHeight,sStageDiameter,zoom,fStageColor,sStageColor) {
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
    
    //Drawing of the fairing
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


function draw2BAdapt(fStageHeight,fStageDiameter,sStageHeight,sStageDiameter,bHeight, bDiameter,zoom,fStageColor,sStageColor,bColor) {
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
    
    //Drawing of the fairing
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


function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = document.getElementById('sidebar').getBoundingClientRect().width
    canvas.height = document.getElementById('sidebar').getBoundingClientRect().height
    midy = canvas.height/2
    midx = canvas.width/2
    ratioV = canvas.height/410
    ratioH = canvas.width/150
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.fillRect(midx-150*ratioV, 0, 300*ratioV, canvas.height)
}