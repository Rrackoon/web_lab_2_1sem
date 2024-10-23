<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Результаты проверки точек</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<h1>Результаты проверок точек</h1>

<c:if test="${not empty sessionScope.resultBean.results}">
    <table>
        <thead>
        <tr>
            <th>X</th>
            <th>Y</th>
            <th>R</th>
            <th>Результат</th>
            <th>Время</th>
        </tr>
        </thead>
        <tbody>
        <c:forEach var="result" items="${sessionScope.resultBean.results}">
            <tr>
                <td>${result.x}</td>
                <td>${result.y}</td>
                <td>${result.r}</td>
                <td>${result.inside ? 'Попадание' : 'Не попадание'}</td>
                <td>${result.currentTime}</td>
            </tr>
        </c:forEach>
        </tbody>
    </table>
</c:if>

<a href="index.jsp">Вернуться на главную страницу</a>
</body>
</html>
