const main = document.querySelector('.main');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
var sizeWidth = ctx.canvas.clientWidth;
var sizeHeight = ctx.canvas.clientHeight;
let mx, my;
let curRadius = 10;

let cX ,cY ,cR, zone;
const major=['C', 'G', 'D', 'A', 'E', 'B', 'F# / Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F']
const minor=['Am', 'Em', 'Bm', 'F#m', 'C#m', 'G#m', 'Ebm/D#', 'Bbm', 'Fm', 'Cm', 'Gm', 'Dm']


 const maj_chords = ['C Dm Em F G Am Bdim', 
                'G Am Bm C D Em F#dim',
                'D Em F#m G A Bm C#dim',
                'A Bm C#m D E F#m G#dim',
                'E F#m G#m A B C#m D#dim',
                'B C#m D#m E F# G#m A#dim',
                'F# G#m A#m B C# D#m Fdim',
                'Db Ebm Fm Gb Ab Bbm Cdim',
                'Ab Bbm Cm Db Eb Fm Gdim',
                'Eb Fm Gm Ab Bb Cm Ddim',
                'Bb Cm Dm Eb F Gm Adim',
                'F Gm Am Bb C Dm Edim'

 ]

const min_chords = ['Am Bdim C Dm Em F G', 
                'Em F#dim G Am Bm C D ',
                'Bm C#dim D Em F#m G A',
                'F#m G#dim A Bm C#m D E',
                'C#m D#dim E F#m G#m A B',
                'G#m A#dim B C#m D#m E F#',
                'D#m Fdim F# G#m A#m B C#',
                'Bbm Cdim Db Ebm Fm Gb Ab',
                'Fm Gdim Ab Bbm Cm Db Eb',
                'Cm Ddim Eb Fm Gm Ab Bb',
                'Adim Bb Cm Dm Eb F Gm',
                'Dm Edim F Gm Am Bb C'


]

function init() {
    // document.querySelector('.spacer').width = document.querySelector('body').style.backgroundSize.width + 'px';
    
    let w =  window.innerWidth >  window.innerHeight ? Math.ceil(window.innerHeight*0.781) : 0
        
    if (w == 0) document.body.style.backgroundSize = 'cover'
    else document.body.style.backgroundSize = 'contain'
    // document.querySelector('.spacer').width = w > 0 ? w + 'px' : 0;
    // if (w = 0)  document.querySelector('.spacer').style.display = "none"
 
    canvas.style.width =    (window.innerWidth - w)  + 'px';
 
    ctx.canvas.width = ctx.canvas.clientWidth;
    ctx.canvas.height = ctx.canvas.clientHeight;
    // console.log('reinited ' +ctx.canvas.clientWidth+ ' '+ ctx.canvas.clientHeight);

    cX = Math.ceil(ctx.canvas.width/2);
    cY = Math.ceil(ctx.canvas.height/2);
    cR = cX > cY ? Math.ceil(cY * 0.95) : Math.ceil(cX * 0.95);
    // cY = cY - 0.09*cY;
} 

function checkZone() {
    for (let i = 0; i < 12; i++) {
        let mR = Math.sqrt( (mx - cX)**2 + (my - cY)**2)        
        let mA = -Math.atan2((mx - cX), (my - cY))  + Math.PI + Math.PI/6
        
        if (mA < 0) mA += Math.PI * 2 
        if (mA > 2*Math.PI) mA -= Math.PI * 2 

        let myZone = Math.round(6 * mA / Math.PI) - 1
        if (myZone < 0) myZone = 11
    
        if (mR <= cR && mR > cR*0.75)
            return myZone
        else if  (mR <= cR*0.75 && mR > cR*0.5)    
            return myZone + 12
        else
            return -1;
    }
}

function drawMain() {
 
    // output selected sectors
    for (let i = 0; i < 24; i++) {
        if (i == zone) {

            /// outer circle

            /// adjacent sectors for outer circle
            ctx.beginPath();
            ctx.fillStyle= i < 12 ?  '#FFBABA' : '#E0E0FF';
            ctx.moveTo(cX,cY);
            ctx.arc(cX,cY,cR, (i-5)*Math.PI/6+Math.PI/12,(i-2)*Math.PI/6+Math.PI/12);
            ctx.closePath();
            ctx.fill();
            
            // main sector
            ctx.beginPath();
            ctx.fillStyle= i < 12 ? '#FF5555' : '#C0C0FF' ;
            ctx.moveTo(cX,cY);
            ctx.arc(cX,cY,cR, (i-4)*Math.PI/6+Math.PI/12,(i-3)*Math.PI/6+Math.PI/12);
            ctx.closePath();
            ctx.fill();


            /// inner circle

            /// adjacent sectors for outer circle
            ctx.beginPath();
            ctx.fillStyle= i >= 12 ? '#FFBABA' : '#E0E0FF';
            ctx.moveTo(cX,cY);
            ctx.arc(cX,cY,cR*0.75, (i-5)*Math.PI/6+Math.PI/12,(i-2)*Math.PI/6+Math.PI/12);
            ctx.closePath();
            ctx.fill();
            
            /// main sector for inner circle
            ctx.beginPath();
            ctx.fillStyle= i >= 12 ? '#FF5555' : '#C0C0FF' ;
            ctx.moveTo(cX,cY);
            ctx.arc(cX,cY,cR*0.75, (i-4)*Math.PI/6+Math.PI/12,(i-3)*Math.PI/6+Math.PI/12);
            ctx.fill();
            ctx.closePath();
        }
    }
    
    for (let i = 0; i < 12; i++) {
        ctx.fillStyle = '#000000'
        ctx.beginPath();
        ctx.moveTo(cX, cY)
        ctx.lineTo( cX + cR*Math.sin(i*Math.PI/6+Math.PI/12), 
                    cY + cR*Math.cos(i*Math.PI/6+Math.PI/12))
        ctx.stroke();
        ctx.closePath();
    }

    let cW, cH;
    /// output tonalities' names 
    for (let i = 0; i < 12; i++) {
        ctx.font = Math.ceil(cR / 10)+"px Arial";
        cW = ctx.measureText(major[i]).width / 2;
        cH = - Math.ceil(cR / 20);
        ctx.fillText(   major[i],   
                        cX + cR*0.88*Math.sin(-(i-6)*Math.PI/6)  - cW, 
                        cY + cR*0.88*Math.cos(-(i-6)*Math.PI/6)  - cH)
                       
        ctx.font = Math.ceil(cR / 12)+"px Arial";
        cW = ctx.measureText(minor[i]).width / 2;
        cH = - Math.ceil(cR / 24);
        ctx.fillText(   minor[i],   
                        cX + cR*0.625*Math.sin(-(i-6)*Math.PI/6)  - cW, 
                        cY + cR*0.625*Math.cos(-(i-6)*Math.PI/6)  - cH)
 
    }

    /// output frames of the circle

    ctx.fillStyle = '#000000'
    ctx.beginPath();
    ctx.arc(cX, cY, cR, 0, Math.PI*2);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(cX, cY, cR*0.75, 0, Math.PI*2);
    ctx.stroke();
    ctx.closePath();

    // middle parts 
    ctx.beginPath();
    ctx.arc(cX, cY, cR*0.5, 0, Math.PI*2);
    ctx.fillStyle = zone >= 0 ? '#FFBABA'  : "#FFFFFF";
    ctx.fill();
    ctx.closePath();
    
    ctx.fillStyle = '#000000'
    ctx.beginPath();
    ctx.arc(cX, cY, cR*0.5, 0, Math.PI*2);
    ctx.stroke();
    ctx.closePath();
}

function drawCursor() {
    
   
    ctx.beginPath();
    ctx.arc(mx, my, curRadius, 0, Math.PI*2);
    // ctx.arc(mx, my, 10, 0, Math.PI*2);
    ctx.fillStyle = "#9995DDCC";
    ctx.fill();
    ctx.closePath();
}

function drawInfo(){
    let cW, cH;
    let str = '';
   
    if (zone === null || zone === undefined || zone < 0 || zone > 24) {
        ctx.fillStyle = "#9995DD";
        str = 'Select a tonality';
        ctx.font = Math.ceil(cR / 10)+"px Arial";
        cW = ctx.measureText(str).width / 2;
        ctx.fillText(str, cX - cW, cY);
        
        ctx.font = Math.ceil(cR / 12)+"px Arial";
        str = 'using the mouse cursor';
        cW = ctx.measureText(str).width / 2;
        ctx.fillText(str, cX - cW, cY+cR*0.1);
        return;
    }

    ctx.fillStyle = "#000000";

    str = 'Tonic: ';
    str += zone < 12 ? major[zone] : minor[zone-12]; 
    ctx.font = Math.ceil(cR / 12)+"px Arial";
    cW = ctx.measureText(str).width / 2;
    ctx.fillText(str, cX - cW, cY - cR*0.275);
    
    ctx.font = Math.ceil(cR / 16)+"px Arial";

    str = 'SubDominant: ';
    if (zone > 0 && zone != 12)
    str += zone < 12 ? major[zone-1] : minor[zone-13]
    else if (zone == 0) str += major[11]   
    else if (zone == 12) str += minor[11] 
    cW = ctx.measureText(str).width / 2;
    ctx.fillText(str, cX - cW, cY - cR*0.075);

    str = 'Dominant: ';
    if (zone !=11 && zone != 23)
    str += zone < 12 ? major[zone+1] : minor[zone-11]
    else if (zone == 11) str += major[0] 
    else if (zone == 23) str += minor[0]
    cW = ctx.measureText(str).width / 2;
    ctx.fillText(str, cX - cW, cY - cR*0.160);

    ctx.font = Math.ceil(cR / 14)+"px Arial";
    str = 'Chords: ';
    cW = ctx.measureText(str).width / 2;
    ctx.fillText(str, cX - cW, cY + cR*0.055);

    ctx.font = Math.ceil(cR / 16)+"px Arial";
    str = zone < 12 ? maj_chords[zone] : min_chords[zone-12]; 
    cW = ctx.measureText(str).width / 2;
    ctx.fillText(str, cX - cW, cY + cR*0.145);  
    

    img.src = zone < 12 ? 'media/' + zone +'.png' : 'media/'+ (zone-12) +'.png';

    let imgH = cR*0.225;
    let imgW = (imgH/img.height) * img.width;
    img.style.borderRadius = '5 px';
    ctx.drawImage(img, cX - imgW/2, cY + cR*0.190, imgW, imgH)
}

function draw(){
    zone = checkZone();
    ctx.fillStyle = "#FFFFFF";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawMain();
    drawCursor();
    drawInfo();

requestAnimationFrame(draw);

}


init();



canvas.addEventListener("mousemove", function(e) { 
    let cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
    mx = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas 
    my = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make  
});

canvas.addEventListener("mouseout", function(e) { 
    mx = -100;
    my = -100;
    zone = 0;
});

// document.
addEventListener('resize', init)
draw()



let src = 'media/1.png';
let img = document.createElement('img');
img.src = src;