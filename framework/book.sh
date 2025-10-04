#!/bin/sh

. /opt/cgilite/cgilite.sh

if [ "$REQUEST_METHOD" = POST ]; then
  echo "<h3>$(date)</h3><pre>$(POST eintrag |HTML)</pre>" \
  >>/srv/webapp/guestbook
  REDIRECT /book.sh
  exit 0
fi

echo "Content-Type: text/html; charset=utf-8"
echo ""

cat <<HTMLENDE
<!DOCTYPE HTML>
<html><head>
  <title>Gästebuch</title>
</head><body>
  <h1>Gästebuch</h1>
  <form method="POST">
    <textarea name=eintrag rows=6 cols=100 maxlength=1024
	></textarea>
    <br><input type=submit>
  </form>
  <h2>Bisherige Posts</h2>
  $(cat /srv/webapp/guestbook)
</body></html>
HTMLENDE