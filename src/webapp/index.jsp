<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Проверка точки на координатной плоскости</title>
    <link rel="stylesheet" href="./style.css">

</head>
<body>
<header class = "student-info">
    <h1>Проверка точки на координатной плоскости</h1>
    <h2>Эмилия Владимировна</h2>
    <p>Группа: P3224</p>
    <p>Вариант: 394031</p>
</header>



<div id="cgraf">
    <canvas height='400' width='400' id='example'></canvas>
</div>
<div id="error-message" style="color: red;"></div>

<form id="pointForm" action="controller" method="POST">
    <label for="r">Введите R (1 до 5):</label>
    <input type="number" id="r" name="r" required min="1" max="5" step="1">

    <label for="x">Введите X (-3 до 3):</label>
    <input type="number" id="x" name="x" required min="-3" max="3" step="1">

    <label for="y">Выберите Y(-2 до 2):</label>
    <input type="number" id="y" name="y" required min="-2" max="2" step="0.5">

    <button type="submit">Проверить</button>
    <%-- <input type="button" value="Cheсk" onClick="show(this)">--%>



    <%--<input type="radio" name="y" value="-2"> -2 <br>
        <input type="radio" name="y" value="-1.5"> -1.5 <br>
        <input type="radio" name="y" value="-1"> -1 <br>
        <input type="radio" name="y" value="-0.5"> -0.5 <br>
        <input type="radio" name="y" value="0"> 0 <br>
        <input type="radio" name="y" value="0.5"> 0.5 <br>
        <input type="radio" name="y" value="1"> 1 <br>
        <input type="radio" name="y" value="1.5"> 1.5 <br>
        <input type="radio" name="y" value="2"> 2 <br>--%>
</form>
<%--<a href="controller" class="btn">Показать результаты</a>--%>
<%--<form action="controller" method="POST">
    <button type="submit" class="btn">Показать результаты</button>
</form>--%>


<div id="loading-indicator" style="display: none;">Загрузка...</div>

<div id="results"></div>

<script src="./script.js"></script>
</body>
</html>
