// Укажите адреса страниц для районов вместо пустых строк.
const districtLinks = {
  'boksitogorsky': "",
  'volosovsky': "",
  'volkhovsky': "",
  'vsevolozhsky': "",
  'vyborgsky': "https://hub.yaklass.ru/teacher_mission",
  'gatchinsky': "https://dzen.ru/?yredirect=true",
  'kingiseppsky': "",
  'kirishsky': "",
  'kirovsky': "",
  'lodeynopolsky': "",
  'lomonosovsky': "",
  'luzhsky': "",
  'podporozhsky': "",
  'priozersky': "",
  'slantsevsky': "",
  'tikhvinsky': "",
  'tosnensky': "",
  'sosnovoborsky': ""
};

(async function initMap(){
  const container = document.getElementById('map');
  try {
    const response = await fetch('./map.svg');
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const markup = await response.text();
    const documentSvg = new DOMParser().parseFromString(markup, 'image/svg+xml');
    if (documentSvg.querySelector('parsererror')) throw new Error('SVG не удалось разобрать');
    const svg = documentSvg.documentElement;
    if (svg.localName !== 'svg') throw new Error('Ответ не является SVG');
    svg.removeAttribute('width'); svg.removeAttribute('height');
    svg.setAttribute('aria-label', 'Карта Ленинградской области');
    svg.setAttribute('role', 'img');
    let found = 0;
    for (const [id, url] of Object.entries(districtLinks)) {
      const district = svg.querySelector('g[id="' + id + '"]');
      if (!district) { console.warn('Район не найден:', id); continue; }
      found++;
      district.dataset.district = id;
      district.setAttribute('tabindex', '0');
      district.setAttribute('role', 'link');
      district.setAttribute('aria-label', id);
      district.addEventListener('click', () => navigate(url));
      district.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault(); navigate(url);
        }
      });
    }
    container.replaceChildren(svg);
    if (found !== Object.keys(districtLinks).length) console.warn('Найдено районов:', found);
  } catch(error) {
    console.error(error);
    container.innerHTML = '<p class="status">Не удалось загрузить карту. Проверьте публикацию файлов на сервере.</p>';
  }
})();
function navigate(url) {
  if (!url) return;

  window.open(url, '_blank', 'noopener');
}
