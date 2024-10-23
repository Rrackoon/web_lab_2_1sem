package ru.itmo;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import jakarta.servlet.annotation.WebServlet;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@WebServlet("/check")
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        double x = Double.parseDouble(request.getParameter("x"));
        double y = Double.parseDouble(request.getParameter("y"));
        double r = Double.parseDouble(request.getParameter("r"));

        boolean isInside = checkArea(x, y, r);
        String currentTime = getCurrentTime();

        // Получаем сессию и объект ResultBean
        HttpSession session = request.getSession();
        ResultBean resultBean = (ResultBean) session.getAttribute("resultBean");
        if (resultBean == null) {
            resultBean = new ResultBean();
            session.setAttribute("resultBean", resultBean);
        }

        // Добавляем результат в ResultBean
        AreaResult result = new AreaResult(x, y, r, isInside, currentTime);
        resultBean.addResult(result);

        // Перенаправляем на страницу результатов
        request.getRequestDispatcher("result.jsp").forward(request, response);
    }

    private boolean checkArea(double x, double y, double r) {
        if (x >= 0 && y >= 0 && x <= r && y <= r / 2) {
            return true;
        }
        if (x >= 0 && y <= 0 && (x * x + y * y <= r * r)) {
            return true;
        }
        if (x <= 0 && y >= 0 && y <= (-r / 2) - x) {
            return true;
        }
        return false;
    }


    private String getCurrentTime() {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss"));
    }
}
