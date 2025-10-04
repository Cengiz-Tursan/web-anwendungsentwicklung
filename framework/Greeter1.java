package au.schnabbeldiwauw.webapp2;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "greeter", value = "/greeter")
public class Greeter extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response) {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html");
        try {
            PrintWriter w = response.getWriter();
            w.println(String.format("""
                    <!DOCTYPE html>
                    <html><head>
                      <title>Greeter</title>
                    </head><body>
                    Sei gegrüßt %s %s!
                      <form method="GET">
                        <input name="vn" placeholder="Vorname">
                        <input name="nn" placeholder="Nachname">
                        <input type="submit">
                      </form>
                    </body></html>
                    """,
                    request.getParameter("vn"),
                    request.getParameter("nn")
                    ));
        } catch (IOException eineexception) {
        }
    }
}
