document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('results').innerHTML = '';
    drawPoint(0, 0, 0);  // Инициализация с точкой (0, 0, 0)
});

function validateInput(x, y, r) {
    // Ваша логика валидации остаётся неизменной
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

var example = document.getElementById("example"),
    ctx = example.getContext('2d');

// Перемещаем начало координат в центр холста
ctx.translate(example.width / 2, example.height / 2);

// Слушаем клик по холсту
document.getElementById('example').addEventListener('click', function (event) {
    let r = parseFloat(document.getElementById('r').value);
    const errorMessage = document.getElementById("error-message");

    if (!r || r <= 0) {
        errorMessage.textContent = 'Установите значение радиуса больше 0';
        return;
    }

    // Очищаем предыдущие ошибки
    errorMessage.textContent = '';

    // Получаем координаты клика
    const rect = example.getBoundingClientRect();
    const canvasX = event.clientX - rect.left;
    const canvasY = event.clientY - rect.top;

    // Рассчитываем центр холста
    const centerX = example.width / 2;
    const centerY = example.height / 2;

    // Масштабируем координаты относительно радиуса
    // Прибавляем по 0.65 к X и Y для сдвига координат в центр
    const shift = 0.65;
    const afi = 0.65;
    const scaledX = (((canvasX - centerX) / (rect.width / (2 * r))) + shift).toFixed(2);
    const scaledY = (((centerY - canvasY) / (rect.height / (2 * r))) - afi).toFixed(2);

    document.getElementById('x').value = scaledX;
    document.getElementById('y').value = scaledY;

    // Очищаем канвас перед рисованием новой точки
    clearCanvas();

    // Рисуем точку на графике
    drawPoint(scaledX, scaledY, r);
    sendDataToServer(scaledX, scaledY, r);
});

// Функция для очистки канваса
function clearCanvas() {
    ctx.clearRect(-example.width / 2, -example.height / 2, example.width, example.height);
    shapes(); // Перерисовываем область после очистки
    base();   // Перерисовываем оси после очистки
}

// Функция для рисования точки на графике
function drawPoint(x, y, r) {
    // Преобразование координат X и Y в пиксели относительно радиуса
    let pointX = x * (130 / r);  // Преобразование X
    let pointY = -(y * (130 / r)); // Преобразование Y (инверсия)

    ctx.beginPath();
    ctx.arc(pointX, pointY, 4, 0, 2 * Math.PI);  // Рисуем точку
    ctx.fillStyle = 'red';  // Устанавливаем цвет точки
    ctx.fill();
}

// Функция для рисования осей и разметки
function base() {
    ctx.beginPath();

    ctx.moveTo(-200, 0);  // X-ось
    ctx.lineTo(200, 0);
    ctx.lineTo(195, -5);
    ctx.moveTo(200, 0);
    ctx.lineTo(195, 5);

    ctx.moveTo(0, 200);  // Y-ось
    ctx.lineTo(0, -200);
    ctx.lineTo(5, -195);
    ctx.moveTo(0, -200);
    ctx.lineTo(-5, -195);

    // Рисуем деления осей X и Y
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

    // Подписи осей
    ctx.font = '12px';
    ctx.fillStyle = 'black';

    ctx.fillText('X', 195, -15);
    ctx.fillText('Y', 15, -195);

    ctx.fillText('R', 10, -400 / 3 + 3);
    ctx.fillText('R/2', 10, -200 / 3 + 3);
    ctx.fillText('- R/2', 10, 200 / 3 + 3);
    ctx.fillText('- R', 10, 400 / 3 + 3);

    ctx.fillText('- R', -400 / 3 - 10, -10);
    ctx.fillText('- R/2', -200 / 3 - 12, -10);
    ctx.fillText('R/2', 200 / 3 - 5, -10);
    ctx.fillText('R', 400 / 3 - 5, -10);
}

// Функция для рисования области
function shapes() {
    ctx.beginPath();
    ctx.moveTo(0, 400 / 3);  // Треугольник
    ctx.lineTo(400 / 3, 0);
    ctx.lineTo(0, 0);

    ctx.closePath();
    ctx.fillStyle = 'blue';
    ctx.fill();

    ctx.fillStyle = 'blue';
    ctx.fillRect(0, -400/3, 200/3, 400 / 3);  // Прямоугольник

    ctx.beginPath();
    ctx.arc(0, 0, 400 / 3, Math.PI/2,  Math.PI);  // Сектор
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fillStyle = 'blue';
    ctx.fill();
}

// Рисуем график
shapes();
base();
