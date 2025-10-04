package au.schnabbeldiwauw.webapp2;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "greeter", value = "/")
public class Greeter extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response) {
        String vn, nn, greeting = "";
        vn = request.getParameter("vn");
        nn = request.getParameter("nn");

        vn = (vn != null) ? vn.trim() : "";
        nn = (nn != null) ? nn.trim() : "";

        if (!vn.isEmpty() && !nn.isEmpty()) {
            greeting = "Gesundheit " + vn + " " + nn + "!";
        }

        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html");
        try {
            PrintWriter w = response.getWriter();
            w.println(String.format("""
                    <!DOCTYPE html>
                    <html><head>
                      <title>Greeter</title>
                    </head><body>
                      %s
                      <form method="GET">
                        <input name="vn" placeholder="Vorname" required>
                        <input name="nn" placeholder="Nachname" required>
                        <input type="submit">
                      </form>
                    </body></html>
                    """,
                    greeting
                    ));
        } catch (IOException eineexception) {
        }
    }
}
