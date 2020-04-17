/*Dessin d'une fusée avec 2 étages et boosters*/
var canvas = document.getElementById("myCanvas");
var dimension = [document.documentElement.clientWidth, document.documentElement.clientHeight]
canvas.width = dimension[0];
canvas.height = dimension[1];
ratioV = dimension[1]/410
ratioH = dimension[0]/150
var ctx = canvas.getContext("2d");

/*Dessin de la coiffe*/
ctx.fillStyle = '#cce6ff'
midy = canvas.clientHeight/2
midx = canvas.clientWidth/2
console.log(midx, midy)
ctx.beginPath();
ctx.moveTo(midx-20*ratioV, 50*ratioV);
ctx.quadraticCurveTo(midx, -50*ratioV, midx+20*ratioV, 50*ratioV);
ctx.fill();

//Dessin du second Etage
ctx.fillRect(midx-20*ratioV, 50*ratioV, 40*ratioV, 100*ratioV-1);
ctx.beginPath()
ctx.moveTo(midx-20*ratioV, 50*ratioV)
ctx.lineTo(midx+20*ratioV, 50*ratioV)
ctx.closePath()
ctx.stroke()

ctx.beginPath()
ctx.moveTo(midx-20*ratioV, 149*ratioV)
ctx.lineTo(midx+20*ratioV, 149*ratioV)
ctx.closePath()
ctx.stroke()

//Dessin du premier Etage;
ctx.beginPath()
ctx.moveTo(midx-30*ratioV, 180*ratioV)
ctx.lineTo(midx-20*ratioV, 149*ratioV)
ctx.lineTo(midx+20*ratioV, 149*ratioV)
ctx.lineTo(midx+30*ratioV, 180*ratioV)
ctx.lineTo(midx-30*ratioV, 180*ratioV)
ctx.closePath()
ctx.fill()
ctx.fillRect(midx-30*ratioV, 180*ratioV, 60*ratioV, 20*ratioV)

ctx.fillRect(midx-30*ratioV, 200*ratioV, 60*ratioV, 150*ratioV);

//Dessin du booster gauche;
ctx.fillRect(midx-(31+20)*ratioV, 220*ratioV, 20*ratioV, 130*ratioV);

ctx.beginPath()
ctx.moveTo(midx-31*ratioV,180*ratioV)
ctx.lineTo(midx-31*ratioV,220*ratioV)
ctx.lineTo(midx-51*ratioV,220*ratioV)
ctx.bezierCurveTo(midx-50*ratioV+1, 200*ratioV, midx-35*ratioV, 180*ratioV, midx-30*ratioV, 180*ratioV)
ctx.closePath();
ctx.fill()

ctx.beginPath()
ctx.moveTo(midx-30*ratioV,180*ratioV)
ctx.lineTo(midx-30*ratioV,350*ratioV)
ctx.closePath()
ctx.stroke()

//Dessin du booster droit
ctx.fillRect(midx+31*ratioV, 220*ratioV, 20*ratioV, 130*ratioV);

ctx.beginPath()
ctx.moveTo(midx+30*ratioV+1,180*ratioV)
ctx.lineTo(midx+30*ratioV+1,220*ratioV)
ctx.lineTo(midx+50*ratioV+1,220*ratioV)
ctx.bezierCurveTo(midx+50*ratioV+1, 200*ratioV, midx+35*ratioV, 180*ratioV, midx+30*ratioV, 180*ratioV)
ctx.closePath();
ctx.fill()

ctx.beginPath()
ctx.moveTo(midx+30*ratioV,180*ratioV)
ctx.lineTo(midx+30*ratioV,350*ratioV)
ctx.closePath()
ctx.stroke()

//Dessin du moteur central 
ctx.fillStyle = '#000000'
ctx.beginPath();
ctx.moveTo(midx, 350*ratioV);
ctx.lineTo(midx-15*ratioV, 385*ratioV);
ctx.lineTo(midx+15*ratioV, 385*ratioV);
ctx.closePath()
ctx.fill();

//Dessin du moteur gauche
ctx.beginPath();
ctx.moveTo(midx-41*ratioV, 350*ratioV);
ctx.lineTo(midx-50*ratioV, 375*ratioV);
ctx.lineTo(midx-32*ratioV, 375*ratioV);
ctx.closePath()
ctx.fill();

//Dessin du moteur droit
ctx.beginPath();
ctx.moveTo(midx+41*ratioV, 350*ratioV);
ctx.lineTo(midx+50*ratioV, 375*ratioV);
ctx.lineTo(midx+32*ratioV, 375*ratioV);
ctx.closePath()
ctx.fill();