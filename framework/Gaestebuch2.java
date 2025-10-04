package au.schnabbeldiwauw.webapp2;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.*;
import java.util.ArrayList;

@WebServlet("/g")
public class Gaestebuch extends HttpServlet {
    ArrayList<String> buch = new ArrayList<>();

    public void init() throws ServletException {
        try {
            FileInputStream file = new FileInputStream("/srv/webapp/tomcat/guestbook.dat");
            ObjectInputStream stream = new ObjectInputStream(file);
            buch = (ArrayList<String>) stream.readObject();
        } catch (Exception e) {
        }
    }

    private String escapeHtml(String input) {
        if (input == null) return "";
        return input.replace("&", "&amp;")
                    .replace("<", "&lt;")
                    .replace(">", "&gt;")
                    .replace("\"", "&quot;")
                    .replace("'", "&#39;");
    }

    public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        PrintWriter w = res.getWriter();
        res.setCharacterEncoding("UTF-8");
        res.setContentType("text/html");

        String content = "";

        for (String s : buch) {
            content += "<p>" + escapeHtml(s) + "</p>";
        }
        w.println(String.format("""
            <!DOCTYPE html>
            <html><head>
              <title>Gästebuch</title>
            </head><body>
              <form method="POST">
                <textarea name="gaestepost" cols="60" rows="7"></textarea>
                <input type="submit">
              </form>%s
            </body></html>
            """,
            content
        ));
    }

    public void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        String text = req.getParameter("gaestepost");
        buch.add(text);
        res.sendRedirect("./g");

        FileOutputStream file = new FileOutputStream("/srv/webapp/tomcat/guestbook.dat");
        ObjectOutputStream stream = new ObjectOutputStream(file);
        stream.writeObject(buch);
        stream.close(); file.close();
    }
}
