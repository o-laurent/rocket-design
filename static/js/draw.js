var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


draw1Adapt(80, 8)
document.getElementById("stageNumber").value = '1'
document.getElementById("boosterSelect").value = '0'

function draw1Adapt(fStageHeight, fStageDiameter) {
    canvas.width = document.getElementById('sidebar').getBoundingClientRect().width
    canvas.height = document.getElementById('sidebar').getBoundingClientRect().height
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

    CanvasfStageHeight = fStageHeight*((canvas.height-50)/140-0.07)
    CanvasfStageWidth = fStageDiameter*((canvas.height-50)/140-0.07)

    //Drawing of the central engine
    ctx.fillStyle = '#000000'
    ctx.beginPath();
    ctx.moveTo(midx, (basisX - 0.07*CanvasfStageHeight));
    ctx.lineTo(midx - 0.35*CanvasfStageWidth, basisX);
    ctx.lineTo(midx + 0.35*CanvasfStageWidth, basisX);
    ctx.closePath()
    ctx.fill();

    //Drawing of the first stage
    ctx.fillStyle = '#CCE6FF'
    baseXfStage = basisX - 0.07*CanvasfStageHeight
    ctx.fillRect(midx-CanvasfStageWidth/2, baseXfStage - 0.8*CanvasfStageHeight, CanvasfStageWidth, 0.8*CanvasfStageHeight)
    ctx.beginPath()
    ctx.moveTo(midx-CanvasfStageWidth/3, baseXfStage - CanvasfStageHeight)
    ctx.lineTo(midx-CanvasfStageWidth/2, baseXfStage - 0.8*CanvasfStageHeight)
    ctx.lineTo(midx+CanvasfStageWidth/2, baseXfStage - 0.8*CanvasfStageHeight)
    ctx.lineTo(midx+CanvasfStageWidth/3, baseXfStage - CanvasfStageHeight)
    ctx.lineTo(midx-CanvasfStageWidth/3, baseXfStage - CanvasfStageHeight)
    ctx.closePath()
    ctx.fill()

    baseXfairing = baseXfStage - CanvasfStageHeight

    //Drawing of the fairing
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

function draw1BAdapt(fStageHeight, fStageDiameter, bHeight, bDiameter) {
    canvas.width = document.getElementById('sidebar').getBoundingClientRect().width
    canvas.height = document.getElementById('sidebar').getBoundingClientRect().height
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

    CanvasfStageHeight = fStageHeight*((canvas.height-50)/140-0.07)
    CanvasfStageWidth = fStageDiameter*((canvas.height-50)/140-0.07)
    CanvasBHeight = bHeight*((canvas.height-50)/140-0.07)
    CanvasBWidth = bDiameter*((canvas.height-50)/140-0.07)

    //Drawing of the central engine
    ctx.fillStyle = '#000000'
    ctx.beginPath();
    ctx.moveTo(midx, (basisX - 0.07*CanvasfStageHeight));
    ctx.lineTo(midx - 0.35*CanvasfStageWidth, basisX);
    ctx.lineTo(midx + 0.35*CanvasfStageWidth, basisX);
    ctx.closePath()
    ctx.fill();

    //Drawing of the first stage
    ctx.fillStyle = '#CCE6FF'
    baseXfStage = basisX - 0.07*CanvasfStageHeight
    ctx.fillRect(midx-CanvasfStageWidth/2, baseXfStage - 0.8*CanvasfStageHeight, CanvasfStageWidth, 0.8*CanvasfStageHeight)
    ctx.beginPath()
    ctx.moveTo(midx-CanvasfStageWidth/3, baseXfStage - CanvasfStageHeight)
    ctx.lineTo(midx-CanvasfStageWidth/2, baseXfStage - 0.8*CanvasfStageHeight)
    ctx.lineTo(midx+CanvasfStageWidth/2, baseXfStage - 0.8*CanvasfStageHeight)
    ctx.lineTo(midx+CanvasfStageWidth/3, baseXfStage - CanvasfStageHeight)
    ctx.lineTo(midx-CanvasfStageWidth/3, baseXfStage - CanvasfStageHeight)
    ctx.closePath()
    ctx.fill()

    baseXfairing = baseXfStage - CanvasfStageHeight

    //Drawing of the left booster
    lBmidx = midx-CanvasfStageWidth/2 - CanvasBWidth/2
    ctx.fillStyle = '#000000'
    ctx.beginPath();
    ctx.moveTo(lBmidx, (basisX - 0.07*CanvasBHeight));
    ctx.lineTo(lBmidx - 0.35*CanvasBWidth, basisX);
    ctx.lineTo(lBmidx + 0.35*CanvasBWidth, basisX);
    ctx.closePath()
    ctx.fill();

    baseXBooster = basisX - 0.07*CanvasBHeight

    ctx.fillStyle = '#CCE6FF'
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
    ctx.moveTo(lBmidx, (basisX - 0.07*CanvasBHeight));
    ctx.lineTo(lBmidx - 0.35*CanvasBWidth, basisX);
    ctx.lineTo(lBmidx + 0.35*CanvasBWidth, basisX);
    ctx.closePath()
    ctx.fill();

    baseXBooster = basisX - 0.07*CanvasBHeight

    ctx.fillStyle = '#CCE6FF'
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
    ctx.fillStyle = '#CCE6FF'
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

function draw1() {
    //Drawing of the rocket with one stage without boosters
    canvas.width = document.getElementById('sidebar').getBoundingClientRect().width
    canvas.height = document.getElementById('sidebar').getBoundingClientRect().height
    midy = canvas.height/2
    midx = canvas.width/2
    ratioV = canvas.height/410
    ratioH = canvas.width/150

    //Drawing of the bordures
    ctx.beginPath();
    ctx.moveTo(midx-150*ratioV, 0);
    ctx.lineTo(midx-150*ratioV, canvas.height);
    ctx.lineTo(midx+150*ratioV, canvas.height);
    ctx.lineTo(midx+150*ratioV, 0);
    ctx.lineTo(midx-150*ratioV, 0);
    ctx.stroke();


    //Drawing of the fairing
    ctx.fillStyle = '#cce6ff'
    ctx.beginPath();
    ctx.moveTo(midx-15*ratioV, 150*ratioV+10);
    ctx.quadraticCurveTo(midx, +50*ratioV+10, midx+15*ratioV, 150*ratioV+10);
    ctx.fill();
        //separator
    ctx.beginPath()
    ctx.moveTo(midx-15*ratioV, 150*ratioV-1+10)
    ctx.lineTo(midx+15*ratioV, 150*ratioV-1+10)
    ctx.closePath()
    ctx.stroke()

    //Drawing of the first stage
    ctx.beginPath()
    ctx.moveTo(midx-20*ratioV, 180*ratioV+10)
    ctx.lineTo(midx-15*ratioV, 150*ratioV+10)
    ctx.lineTo(midx+15*ratioV, 150*ratioV+10)
    ctx.lineTo(midx+20*ratioV, 180*ratioV+10)
    ctx.lineTo(midx-20*ratioV, 180*ratioV+10)
    ctx.closePath()
    ctx.fill()
    ctx.fillRect(midx-20*ratioV, 180*ratioV+10-1, 40*ratioV, 170*ratioV+1);

    //Drawing of the central engine 
    ctx.fillStyle = '#000000'
    ctx.beginPath();
    ctx.moveTo(midx, 350*ratioV+10);
    ctx.lineTo(midx-10*ratioV, 385*ratioV+10);
    ctx.lineTo(midx+10*ratioV, 385*ratioV+10);
    ctx.closePath()
    ctx.fill();
}

function draw1B() {
    //Drawing of the rocket with one stage and boosters
    canvas.width = document.getElementById('sidebar').getBoundingClientRect().width
    canvas.height = document.getElementById('sidebar').getBoundingClientRect().height
    midy = canvas.height/2
    midx = canvas.width/2
    ratioV = canvas.height/410
    ratioH = canvas.width/150

    //Drawing of the bordures
    ctx.beginPath();
    ctx.moveTo(midx-150*ratioV, 0);
    ctx.lineTo(midx-150*ratioV, canvas.height);
    ctx.lineTo(midx+150*ratioV, canvas.height);
    ctx.lineTo(midx+150*ratioV, 0);
    ctx.lineTo(midx-150*ratioV, 0);
    ctx.stroke();


    //Drawing of the fairing
    ctx.fillStyle = '#cce6ff'
    ctx.beginPath();
    ctx.moveTo(midx-15*ratioV, 150*ratioV+10);
    ctx.quadraticCurveTo(midx, +50*ratioV+10, midx+15*ratioV, 150*ratioV+10);
    ctx.fill();

    ctx.beginPath()
    ctx.moveTo(midx-15*ratioV, 150*ratioV-1+10)
    ctx.lineTo(midx+15*ratioV, 150*ratioV-1+10)
    ctx.closePath()
    ctx.stroke()

    //Drawing of the first stage
    ctx.beginPath()
    ctx.moveTo(midx-20*ratioV, 180*ratioV+10)
    ctx.lineTo(midx-15*ratioV, 150*ratioV+10)
    ctx.lineTo(midx+15*ratioV, 150*ratioV+10)
    ctx.lineTo(midx+20*ratioV, 180*ratioV+10)
    ctx.lineTo(midx-20*ratioV, 180*ratioV+10)
    ctx.closePath()
    ctx.fill()
    ctx.fillRect(midx-20*ratioV, 180*ratioV+10-1, 40*ratioV, 170*ratioV+1);

    //Drawing of the left booster
    ctx.fillRect(midx-(20+20)*ratioV, 220*ratioV+10, 20*ratioV, 130*ratioV);

    ctx.beginPath()
    ctx.moveTo(midx-20*ratioV-1,180*ratioV+10)
    ctx.lineTo(midx-20*ratioV-1,220*ratioV+10)
    ctx.lineTo(midx-40*ratioV-1,220*ratioV+10)
    ctx.bezierCurveTo(midx-20*ratioV+1, 200*ratioV+10, midx-20*ratioV, 180*ratioV+10, midx-20*ratioV, 180*ratioV+10)
    ctx.closePath();
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(midx-20*ratioV, 180*ratioV+10)
    ctx.lineTo(midx-20*ratioV, 350*ratioV+10)
    ctx.closePath()
    ctx.stroke()

    //Drawing of the right booster 
    ctx.fillRect(midx+(20)*ratioV, 220*ratioV+10, 20*ratioV, 130*ratioV);

    ctx.beginPath()
    ctx.moveTo(midx+20*ratioV-1,180*ratioV+10)
    ctx.lineTo(midx+20*ratioV-1,220*ratioV+10)
    ctx.lineTo(midx+40*ratioV-1,220*ratioV+10)
    ctx.bezierCurveTo(midx+20*ratioV+1, 200*ratioV+10, midx+20*ratioV, 180*ratioV+10, midx+20*ratioV, 180*ratioV+10)
    ctx.closePath();
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(midx+20*ratioV, 180*ratioV+10)
    ctx.lineTo(midx+20*ratioV, 350*ratioV+10)
    ctx.closePath()
    ctx.stroke()

    //Drawing of the central engine 
    ctx.fillStyle = '#000000'
    ctx.beginPath();
    ctx.moveTo(midx, 350*ratioV+10);
    ctx.lineTo(midx-15*ratioV, 385*ratioV+10);
    ctx.lineTo(midx+15*ratioV, 385*ratioV+10);
    ctx.closePath()
    ctx.fill();

    //Drawing of the left engine
    ctx.beginPath();
    ctx.moveTo(midx-30*ratioV-1, 350*ratioV+10);
    ctx.lineTo(midx-40*ratioV, 375*ratioV+10);
    ctx.lineTo(midx-20*ratioV-2, 375*ratioV+10);
    ctx.closePath()
    ctx.fill();

    //Drawing of the right engine
    ctx.beginPath();
    ctx.moveTo(midx+30*ratioV+1, 350*ratioV+10);
    ctx.lineTo(midx+40*ratioV, 375*ratioV+10);
    ctx.lineTo(midx+20*ratioV+2, 375*ratioV+10);
    ctx.closePath()
    ctx.fill();
}


function draw2() {
    //Drawing of the rocket with two stages and without boosters 
    canvas.width = document.getElementById('sidebar').getBoundingClientRect().width
    canvas.height = document.getElementById('sidebar').getBoundingClientRect().height
    midy = canvas.height/2
    midx = canvas.width/2
    console.log(midx, midy)
    ratioV = canvas.height/410
    ratioH = canvas.width/150

    //Drawing of the bordures
    ctx.beginPath();
    ctx.moveTo(midx-150*ratioV, 0);
    ctx.lineTo(midx-150*ratioV, canvas.height);
    ctx.lineTo(midx+150*ratioV, canvas.height);
    ctx.lineTo(midx+150*ratioV, 0);
    ctx.lineTo(midx-150*ratioV, 0);
    ctx.stroke();


    //Drawing of the fairing
    ctx.fillStyle = '#cce6ff'
    ctx.beginPath();
    ctx.moveTo(midx-20*ratioV, 50*ratioV+10);
    ctx.quadraticCurveTo(midx, -50*ratioV+10, midx+20*ratioV, 50*ratioV+10);
    ctx.fill();

    //Drawing of the second stage
    ctx.fillRect(midx-20*ratioV, 50*ratioV+10, 40*ratioV, 100*ratioV-1+10);
    ctx.beginPath()
    ctx.moveTo(midx-20*ratioV, 50*ratioV+10)
    ctx.lineTo(midx+20*ratioV, 50*ratioV+10)
    ctx.closePath()
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(midx-20*ratioV, 150*ratioV-1+10)
    ctx.lineTo(midx+20*ratioV, 150*ratioV-1+10)
    ctx.closePath()
    ctx.stroke()

    //Drawing of the first stage
    ctx.beginPath()
    ctx.moveTo(midx-30*ratioV, 180*ratioV+10)
    ctx.lineTo(midx-20*ratioV, 150*ratioV+10)
    ctx.lineTo(midx+20*ratioV, 150*ratioV+10)
    ctx.lineTo(midx+30*ratioV, 180*ratioV+10)
    ctx.lineTo(midx-30*ratioV, 180*ratioV+10)
    ctx.closePath()
    ctx.fill()
    ctx.fillRect(midx-30*ratioV, 180*ratioV+10-1, 60*ratioV, 170*ratioV+1);

    //Drawing of the central engine
    ctx.fillStyle = '#000000'
    ctx.beginPath();
    ctx.moveTo(midx, 350*ratioV+10);
    ctx.lineTo(midx-15*ratioV, 385*ratioV+10);
    ctx.lineTo(midx+15*ratioV, 385*ratioV+10);
    ctx.closePath()
    ctx.fill();
}

function draw2B() {
    //Drawing of the rocket with two stages and boosters 
    canvas.width = document.getElementById('sidebar').getBoundingClientRect().width
    canvas.height = document.getElementById('sidebar').getBoundingClientRect().height
    midy = canvas.height/2
    midx = canvas.width/2
    console.log(midx, midy)
    ratioV = canvas.height/410
    ratioH = canvas.width/150

    //Drawing of the bordures
    ctx.beginPath();
    ctx.moveTo(midx-150*ratioV, 0);
    ctx.lineTo(midx-150*ratioV, canvas.height);
    ctx.lineTo(midx+150*ratioV, canvas.height);
    ctx.lineTo(midx+150*ratioV, 0);
    ctx.lineTo(midx-150*ratioV, 0);
    ctx.stroke();


    //Drawing of the fairing
    ctx.fillStyle = '#cce6ff'
    ctx.beginPath();
    ctx.moveTo(midx-20*ratioV, 50*ratioV+10);
    ctx.quadraticCurveTo(midx, -50*ratioV+10, midx+20*ratioV, 50*ratioV+10);
    ctx.fill();

    //Drawing of the second stage 
    ctx.fillRect(midx-20*ratioV, 50*ratioV+10, 40*ratioV, 100*ratioV-1+10);
    ctx.beginPath()
    ctx.moveTo(midx-20*ratioV, 50*ratioV+10)
    ctx.lineTo(midx+20*ratioV, 50*ratioV+10)
    ctx.closePath()
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(midx-20*ratioV, 150*ratioV-1+10)
    ctx.lineTo(midx+20*ratioV, 150*ratioV-1+10)
    ctx.closePath()
    ctx.stroke()

    //Drawing of the first stage
    ctx.beginPath()
    ctx.moveTo(midx-30*ratioV, 180*ratioV+10)
    ctx.lineTo(midx-20*ratioV, 150*ratioV+10)
    ctx.lineTo(midx+20*ratioV, 150*ratioV+10)
    ctx.lineTo(midx+30*ratioV, 180*ratioV+10)
    ctx.lineTo(midx-30*ratioV, 180*ratioV+10)
    ctx.closePath()
    ctx.fill()
    ctx.fillRect(midx-30*ratioV, 180*ratioV+10-1, 60*ratioV, 170*ratioV+1);

    //Drawing of the left booster
    ctx.fillRect(midx-(30+20)*ratioV-1, 220*ratioV+10, 20*ratioV, 130*ratioV);

    ctx.beginPath()
    ctx.moveTo(midx-30*ratioV-1,180*ratioV+10)
    ctx.lineTo(midx-30*ratioV-1,220*ratioV+10)
    ctx.lineTo(midx-50*ratioV-1,220*ratioV+10)
    ctx.bezierCurveTo(midx-50*ratioV+1, 200*ratioV+10, midx-35*ratioV, 180*ratioV+10, midx-30*ratioV, 180*ratioV+10)
    ctx.closePath();
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(midx-30*ratioV, 180*ratioV+10)
    ctx.lineTo(midx-30*ratioV, 350*ratioV+10)
    ctx.closePath()
    ctx.stroke()

    //Drawing of the right booster 
    ctx.fillRect(midx+30*ratioV+1, 220*ratioV+10, 20*ratioV, 130*ratioV);

    ctx.beginPath()
    ctx.moveTo(midx+30*ratioV+1, 180*ratioV+10)
    ctx.lineTo(midx+30*ratioV+1, 220*ratioV+10)
    ctx.lineTo(midx+50*ratioV+1, 220*ratioV+10)
    ctx.bezierCurveTo(midx+50*ratioV+1, 200*ratioV+10, midx+35*ratioV, 180*ratioV+10, midx+30*ratioV, 180*ratioV+10)
    ctx.closePath();
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(midx+30*ratioV, 180*ratioV+10)
    ctx.lineTo(midx+30*ratioV, 350*ratioV+10)
    ctx.closePath()
    ctx.stroke()

    //Drawing of the central engine
    ctx.fillStyle = '#000000'
    ctx.beginPath();
    ctx.moveTo(midx, 350*ratioV+10);
    ctx.lineTo(midx-15*ratioV, 385*ratioV+10);
    ctx.lineTo(midx+15*ratioV, 385*ratioV+10);
    ctx.closePath()
    ctx.fill();

    //Drawing of the left engine
    ctx.beginPath();
    ctx.moveTo(midx-40*ratioV-1, 350*ratioV+10);
    ctx.lineTo(midx-50*ratioV, 375*ratioV+10);
    ctx.lineTo(midx-30*ratioV-2, 375*ratioV+10);
    ctx.closePath()
    ctx.fill();

    //Drawing of the right engine
    ctx.beginPath();
    ctx.moveTo(midx+40*ratioV+1, 350*ratioV+10);
    ctx.lineTo(midx+50*ratioV, 375*ratioV+10);
    ctx.lineTo(midx+30*ratioV+2, 375*ratioV+10);
    ctx.closePath()
    ctx.fill();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}