var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


draw1Adapt(120,10)

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

    CanvasfStageHeight = fStageHeight*(canvas.height-50-fStageHeight*0.07)/140
    CanvasfStageWidth = fStageDiameter*(canvas.height-50-fStageHeight*0.07)/140

    //Dessin du moteur central 
    ctx.fillStyle = '#000000'
    ctx.beginPath();
    ctx.moveTo(midx, (basisX - 0.07*CanvasfStageHeight));
    ctx.lineTo(midx - 0.35*CanvasfStageWidth, basisX);
    ctx.lineTo(midx + 0.35*CanvasfStageWidth, basisX);
    ctx.closePath()
    ctx.fill();

    //Dessin du premier Etage;
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

    //Dessin de la coiffe
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
    /*Dessin d'une fusée avec 1 étages sans boosters*/
    canvas.width = document.getElementById('sidebar').getBoundingClientRect().width
    canvas.height = document.getElementById('sidebar').getBoundingClientRect().height
    midy = canvas.height/2
    midx = canvas.width/2
    ratioV = canvas.height/410
    ratioH = canvas.width/150

    //Dessin du contour
    ctx.beginPath();
    ctx.moveTo(midx-150*ratioV, 0);
    ctx.lineTo(midx-150*ratioV, canvas.height);
    ctx.lineTo(midx+150*ratioV, canvas.height);
    ctx.lineTo(midx+150*ratioV, 0);
    ctx.lineTo(midx-150*ratioV, 0);
    ctx.stroke();


    //Dessin de la coiffe
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

    //Dessin du premier Etage;
    ctx.beginPath()
    ctx.moveTo(midx-20*ratioV, 180*ratioV+10)
    ctx.lineTo(midx-15*ratioV, 150*ratioV+10)
    ctx.lineTo(midx+15*ratioV, 150*ratioV+10)
    ctx.lineTo(midx+20*ratioV, 180*ratioV+10)
    ctx.lineTo(midx-20*ratioV, 180*ratioV+10)
    ctx.closePath()
    ctx.fill()
    ctx.fillRect(midx-20*ratioV, 180*ratioV+10-1, 40*ratioV, 170*ratioV+1);

    //Dessin du moteur central 
    ctx.fillStyle = '#000000'
    ctx.beginPath();
    ctx.moveTo(midx, 350*ratioV+10);
    ctx.lineTo(midx-10*ratioV, 385*ratioV+10);
    ctx.lineTo(midx+10*ratioV, 385*ratioV+10);
    ctx.closePath()
    ctx.fill();
}

function draw1B() {
    /*Dessin d'une fusée avec 2 étages et boosters*/
    canvas.width = document.getElementById('sidebar').getBoundingClientRect().width
    canvas.height = document.getElementById('sidebar').getBoundingClientRect().height
    midy = canvas.height/2
    midx = canvas.width/2
    ratioV = canvas.height/410
    ratioH = canvas.width/150

    //Dessin du contour
    ctx.beginPath();
    ctx.moveTo(midx-150*ratioV, 0);
    ctx.lineTo(midx-150*ratioV, canvas.height);
    ctx.lineTo(midx+150*ratioV, canvas.height);
    ctx.lineTo(midx+150*ratioV, 0);
    ctx.lineTo(midx-150*ratioV, 0);
    ctx.stroke();


    /*Dessin de la coiffe*/
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

    //Dessin du premier Etage;
    ctx.beginPath()
    ctx.moveTo(midx-20*ratioV, 180*ratioV+10)
    ctx.lineTo(midx-15*ratioV, 150*ratioV+10)
    ctx.lineTo(midx+15*ratioV, 150*ratioV+10)
    ctx.lineTo(midx+20*ratioV, 180*ratioV+10)
    ctx.lineTo(midx-20*ratioV, 180*ratioV+10)
    ctx.closePath()
    ctx.fill()
    ctx.fillRect(midx-20*ratioV, 180*ratioV+10-1, 40*ratioV, 170*ratioV+1);

    //Dessin du booster gauche;
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

    //Dessin du booster droit
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

    //Dessin du moteur central 
    ctx.fillStyle = '#000000'
    ctx.beginPath();
    ctx.moveTo(midx, 350*ratioV+10);
    ctx.lineTo(midx-15*ratioV, 385*ratioV+10);
    ctx.lineTo(midx+15*ratioV, 385*ratioV+10);
    ctx.closePath()
    ctx.fill();

    //Dessin du moteur gauche
    ctx.beginPath();
    ctx.moveTo(midx-30*ratioV-1, 350*ratioV+10);
    ctx.lineTo(midx-40*ratioV, 375*ratioV+10);
    ctx.lineTo(midx-20*ratioV-2, 375*ratioV+10);
    ctx.closePath()
    ctx.fill();

    //Dessin du moteur droit
    ctx.beginPath();
    ctx.moveTo(midx+30*ratioV+1, 350*ratioV+10);
    ctx.lineTo(midx+40*ratioV, 375*ratioV+10);
    ctx.lineTo(midx+20*ratioV+2, 375*ratioV+10);
    ctx.closePath()
    ctx.fill();
}


function draw2() {
    /*Dessin d'une fusée avec 2 étages et boosters*/
    canvas.width = document.getElementById('sidebar').getBoundingClientRect().width
    canvas.height = document.getElementById('sidebar').getBoundingClientRect().height
    midy = canvas.height/2
    midx = canvas.width/2
    console.log(midx, midy)
    ratioV = canvas.height/410
    ratioH = canvas.width/150

    //Dessin du contour
    ctx.beginPath();
    ctx.moveTo(midx-150*ratioV, 0);
    ctx.lineTo(midx-150*ratioV, canvas.height);
    ctx.lineTo(midx+150*ratioV, canvas.height);
    ctx.lineTo(midx+150*ratioV, 0);
    ctx.lineTo(midx-150*ratioV, 0);
    ctx.stroke();


    /*Dessin de la coiffe*/
    ctx.fillStyle = '#cce6ff'
    ctx.beginPath();
    ctx.moveTo(midx-20*ratioV, 50*ratioV+10);
    ctx.quadraticCurveTo(midx, -50*ratioV+10, midx+20*ratioV, 50*ratioV+10);
    ctx.fill();

    //Dessin du second Etage
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

    //Dessin du premier Etage;
    ctx.beginPath()
    ctx.moveTo(midx-30*ratioV, 180*ratioV+10)
    ctx.lineTo(midx-20*ratioV, 150*ratioV+10)
    ctx.lineTo(midx+20*ratioV, 150*ratioV+10)
    ctx.lineTo(midx+30*ratioV, 180*ratioV+10)
    ctx.lineTo(midx-30*ratioV, 180*ratioV+10)
    ctx.closePath()
    ctx.fill()
    ctx.fillRect(midx-30*ratioV, 180*ratioV+10-1, 60*ratioV, 170*ratioV+1);

    //Dessin du moteur central 
    ctx.fillStyle = '#000000'
    ctx.beginPath();
    ctx.moveTo(midx, 350*ratioV+10);
    ctx.lineTo(midx-15*ratioV, 385*ratioV+10);
    ctx.lineTo(midx+15*ratioV, 385*ratioV+10);
    ctx.closePath()
    ctx.fill();
}

function draw2B() {
    /*Dessin d'une fusée avec 2 étages et boosters*/
    canvas.width = document.getElementById('sidebar').getBoundingClientRect().width
    canvas.height = document.getElementById('sidebar').getBoundingClientRect().height
    midy = canvas.height/2
    midx = canvas.width/2
    console.log(midx, midy)
    ratioV = canvas.height/410
    ratioH = canvas.width/150

    //Dessin du contour
    ctx.beginPath();
    ctx.moveTo(midx-150*ratioV, 0);
    ctx.lineTo(midx-150*ratioV, canvas.height);
    ctx.lineTo(midx+150*ratioV, canvas.height);
    ctx.lineTo(midx+150*ratioV, 0);
    ctx.lineTo(midx-150*ratioV, 0);
    ctx.stroke();


    /*Dessin de la coiffe*/
    ctx.fillStyle = '#cce6ff'
    ctx.beginPath();
    ctx.moveTo(midx-20*ratioV, 50*ratioV+10);
    ctx.quadraticCurveTo(midx, -50*ratioV+10, midx+20*ratioV, 50*ratioV+10);
    ctx.fill();

    //Dessin du second Etage
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

    //Dessin du premier Etage;
    ctx.beginPath()
    ctx.moveTo(midx-30*ratioV, 180*ratioV+10)
    ctx.lineTo(midx-20*ratioV, 150*ratioV+10)
    ctx.lineTo(midx+20*ratioV, 150*ratioV+10)
    ctx.lineTo(midx+30*ratioV, 180*ratioV+10)
    ctx.lineTo(midx-30*ratioV, 180*ratioV+10)
    ctx.closePath()
    ctx.fill()
    ctx.fillRect(midx-30*ratioV, 180*ratioV+10-1, 60*ratioV, 170*ratioV+1);

    //Dessin du booster gauche;
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

    //Dessin du booster droit
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

    //Dessin du moteur central 
    ctx.fillStyle = '#000000'
    ctx.beginPath();
    ctx.moveTo(midx, 350*ratioV+10);
    ctx.lineTo(midx-15*ratioV, 385*ratioV+10);
    ctx.lineTo(midx+15*ratioV, 385*ratioV+10);
    ctx.closePath()
    ctx.fill();

    //Dessin du moteur gauche
    ctx.beginPath();
    ctx.moveTo(midx-40*ratioV-1, 350*ratioV+10);
    ctx.lineTo(midx-50*ratioV, 375*ratioV+10);
    ctx.lineTo(midx-30*ratioV-2, 375*ratioV+10);
    ctx.closePath()
    ctx.fill();

    //Dessin du moteur droit
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