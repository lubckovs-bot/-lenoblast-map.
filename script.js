// Укажите адреса страниц для районов вместо пустых строк.
const districtLinks = {
  'boksitogorsky': "https://www.yaklass.ru/p/vospitatelnaya-rabota/len/karta-puteshestvii-7628902/informatciia-o-raionakh-7628901/re-7080b58c-ba22-4f3d-ab97-73550f38a7b7",
  'volosovsky': "https://www.yaklass.ru/p/vospitatelnaya-rabota/len/karta-puteshestvii-7628902/informatciia-o-raionakh-7628901/re-a50a7fbd-d1cb-4687-9350-daa9105acc90",
  'volkhovsky': "https://www.yaklass.ru/p/vospitatelnaya-rabota/len/karta-puteshestvii-7628902/informatciia-o-raionakh-7628901/re-a2a9af46-ff8d-4f99-841e-b88fb4f05abf",
  'vsevolozhsky': "https://www.yaklass.ru/p/vospitatelnaya-rabota/len/karta-puteshestvii-7628902/informatciia-o-raionakh-7628901/re-b6f6f3d4-a094-497c-9d10-7248e1a70aa5",
  'vyborgsky': "https://www.yaklass.ru/p/vospitatelnaya-rabota/len/karta-puteshestvii-7628902/informatciia-o-raionakh-7628901/re-5b8984b8-72fe-48dc-b87b-ac871da4f703",
  'gatchinsky': "https://www.yaklass.ru/p/vospitatelnaya-rabota/len/karta-puteshestvii-7628902/informatciia-o-raionakh-7628901/re-54dfe823-ed11-4d10-b46c-aab80e288aed",
  'kingiseppsky': "https://www.yaklass.ru/p/vospitatelnaya-rabota/len/karta-puteshestvii-7628902/informatciia-o-raionakh-7628901/re-ce95f167-83e5-4e2f-bd3a-2a1bb007b5ee",
  'kirishsky': "https://www.yaklass.ru/p/vospitatelnaya-rabota/len/karta-puteshestvii-7628902/informatciia-o-raionakh-7628901/re-ac619ae0-b7cc-456e-a99c-3fbd5460f14a",
  'kirovsky': "https://www.yaklass.ru/p/vospitatelnaya-rabota/len/karta-puteshestvii-7628902/informatciia-o-raionakh-7628901/re-7e6e234f-d296-475b-b59d-d126b3ca161b",
  'lodeynopolsky': "https://www.yaklass.ru/p/vospitatelnaya-rabota/len/karta-puteshestvii-7628902/informatciia-o-raionakh-7628901/re-c93fc70d-0f03-4502-a434-9fb4399a4447",
  'lomonosovsky': "https://www.yaklass.ru/p/vospitatelnaya-rabota/len/karta-puteshestvii-7628902/informatciia-o-raionakh-7628901/re-a76e98b2-9d75-4447-83ff-82d822be24e4",
  'luzhsky': "https://www.yaklass.ru/p/vospitatelnaya-rabota/len/karta-puteshestvii-7628902/informatciia-o-raionakh-7628901/re-93391007-a234-49aa-8b07-6fd6c66904eb",
  'podporozhsky': "https://www.yaklass.ru/p/vospitatelnaya-rabota/len/karta-puteshestvii-7628902/informatciia-o-raionakh-7628901/re-7506f587-0c9f-4521-acde-ca95275c9611",
  'priozersky': "https://www.yaklass.ru/p/vospitatelnaya-rabota/len/karta-puteshestvii-7628902/informatciia-o-raionakh-7628901/re-05429a16-7366-4a83-8f14-7eb237ac5302",
  'slantsevsky': "https://www.yaklass.ru/p/vospitatelnaya-rabota/len/karta-puteshestvii-7628902/informatciia-o-raionakh-7628901/re-d1cefda1-2e7b-49ba-b5e6-60eb8a88b9a9",
  'tikhvinsky': "https://www.yaklass.ru/p/vospitatelnaya-rabota/len/karta-puteshestvii-7628902/informatciia-o-raionakh-7628901/re-65bfed6f-9acd-468d-a7f0-74c7d3c707f7",
  'tosnensky': "https://www.yaklass.ru/p/vospitatelnaya-rabota/len/karta-puteshestvii-7628902/informatciia-o-raionakh-7628901/re-96351e37-7407-42ad-90cd-02edf7795afa",
  'sosnovoborsky': "https://www.yaklass.ru/p/vospitatelnaya-rabota/len/karta-puteshestvii-7628902/informatciia-o-raionakh-7628901/re-6e868fe3-d054-4313-8c76-4363f02d88aa"
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
