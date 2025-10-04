#!/bin/sh

. /opt/cgilite/cgilite.sh


if [ "$REQUEST_METHOD" = POST ]; then
  echo "$(POST vn) $(POST nn)" >/srv/webapp/webname
  REDIRECT /formular.sh
  exit 0
fi

echo "Content-Type: text/html; charset=utf-8"
echo ""

cat <<ENDE
<!DOCTYPE HTML>
<html><head>
  <title>Formular</title>
</head><body>
  Letzter Name der eingegeben wurde: $(cat /srv/webapp/webname |HTML)!
  <form method="POST" action="">
	<input type="text" placeholder="Vorname" name="vn">
	<input type="text" placeholder="Nachname" name="nn">
    <input type="submit">
  </form>
  <!-- pre>$(env)</pre -->
</body></html>
ENDE