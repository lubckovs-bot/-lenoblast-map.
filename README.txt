1. Создайте публичный репозиторий GitHub lenoblast-map.
2. Загрузите index.html, map.svg, style.css, script.js в корень репозитория.
3. Settings → Pages → Deploy from a branch → main → /(root) → Save.
4. После публикации откройте https://ВАШ-ЛОГИН.github.io/lenoblast-map/
5. Для переходов отредактируйте districtLinks в script.js (пустые строки замените URL).
6. В Tilda T123 вставьте:
<iframe src="https://ВАШ-ЛОГИН.github.io/lenoblast-map/" title="Карта Ленинградской области" style="width:100%;height:650px;border:0;display:block" loading="lazy"></iframe>

Важно: проверяйте по https://, не открывайте index.html двойным щелчком с диска — fetch() может блокироваться для file://.
