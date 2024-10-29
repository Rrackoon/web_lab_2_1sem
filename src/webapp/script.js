document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('results').innerHTML = '';
    drawPoint(0, 0, 0);
});

function validateInput(x, y, r) {
    if (isNaN(x) || x < -3 || x > 3 || x === "") {
        return false;
    }
    if (isNaN(y) || y < -2 || y > 2 || y === "") {
        return false;
    }
    if (isNaN(r) || r < 1 || r > 5 || r === "") {
        return false;
    }
    return true;
}
function show(s){
    x = s.form.x.value;
    y= s.form.y.value;
    r=s.form.r.value;
    drawPoint(x,y,r);
}
var example = document.getElementById("example"),
    ctx = example.getContext('2d');

ctx.translate(example.width / 2, example.height / 2);

document.getElementById('example').addEventListener('click', function (event) {
    let r = parseFloat(document.getElementById('r').value);
    const errorMessage = document.getElementById("error-message");

    if (!r || r <= 0) {
        errorMessage.textContent = 'Установите значение радиуса больше 0';
        return;
    }
    errorMessage.textContent = '';

    const rect = example.getBoundingClientRect();
    const canvasX = event.clientX - rect.left;
    const canvasY = event.clientY - rect.top;
    /*alert(canvasX + ' ' + canvasY+ ' ' + rect.left + ' ' + rect.top + ' ' + rect.width + ' ' + rect.height);
    */
    const centerX = example.width / 2;
    const centerY = example.height / 2;
    const shift = 0;
    const afi = 0;
    const scaledX = (((canvasX - centerX) / (rect.width / (3 * r))) + shift).toFixed(2);
    const scaledY = (((centerY - canvasY) / (rect.height / (3 * r) )) - afi).toFixed(2);
    /* alert(canvasX + ' ' + centerX +' '+centerY+' '+canvasY + '  h'+ rect.height + '  w' + rect.width) ;*/

    document.getElementById('x').value = scaledX;
    document.getElementById('y').value = scaledY;

    clearCanvas();

    drawPoint(scaledX, scaledY, r);
    sendDataToServer(scaledX, scaledY, r);
});

function clearCanvas() {
    ctx.clearRect(-example.width / 2, -example.height / 2, example.width, example.height);
    shapes();
    base();
}

function drawPoint(x, y, r) {
    const c = 400 / 3;
    let pointX = x * (c / r);
    let pointY = -(y * (c / r));

    ctx.beginPath();
    ctx.arc(pointX, pointY, 4, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
}

function base() {
    ctx.beginPath();

    ctx.moveTo(-200, 0);
    ctx.lineTo(200, 0);
    ctx.lineTo(195, -5);
    ctx.moveTo(200, 0);
    ctx.lineTo(195, 5);

    ctx.moveTo(0, 200);
    ctx.lineTo(0, -200);
    ctx.lineTo(5, -195);
    ctx.moveTo(0, -200);
    ctx.lineTo(-5, -195);

    ctx.moveTo(200 / 3, -5);
    ctx.lineTo(200 / 3, 5);
    ctx.moveTo(400 / 3, -5);
    ctx.lineTo(400 / 3, 5);

    ctx.moveTo(-200 / 3, -5);
    ctx.lineTo(-200 / 3, 5);
    ctx.moveTo(-400 / 3, -5);
    ctx.lineTo(-400 / 3, 5);

    ctx.moveTo(5, -200 / 3);
    ctx.lineTo(-5, -200 / 3);
    ctx.moveTo(5, -400 / 3);
    ctx.lineTo(-5, -400 / 3);

    ctx.moveTo(5, 200 / 3);
    ctx.lineTo(-5, 200 / 3);
    ctx.moveTo(5, 400 / 3);
    ctx.lineTo(-5, 400 / 3);

    ctx.stroke();

    ctx.font = '12px';
    ctx.fillStyle = 'black';

    ctx.fillText('X', 185, -15);
    ctx.fillText('Y', 15, -185);

    ctx.fillText('R', 10, -400 / 3 + 3);
    ctx.fillText('R/2', 10, -200 / 3 + 3);
    ctx.fillText('- R/2', 10, 200 / 3 + 3);
    ctx.fillText('- R', 10, 400 / 3 + 3);

    ctx.fillText('- R', -400 / 3 - 10, -10);
    ctx.fillText('- R/2', -200 / 3 - 12, -10);
    ctx.fillText('R/2', 200 / 3 - 5, -10);
    ctx.fillText('R', 400 / 3 - 5, -10);
}

function shapes() {
    ctx.beginPath();
    ctx.moveTo(0, 400 / 3);
    ctx.lineTo(400 / 3, 0);
    ctx.lineTo(0, 0);

    ctx.closePath();
    ctx.fillStyle = 'blue';
    ctx.fill();

    ctx.fillStyle = 'blue';
    ctx.fillRect(0, -400/3, 200/3, 400 / 3);

    ctx.beginPath();
    ctx.arc(0, 0, 400 / 3, Math.PI/2,  Math.PI);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fillStyle = 'blue';
    ctx.fill();
}

shapes();
base();
