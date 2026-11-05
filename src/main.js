import { MENU_ITEMS, CATEGORIES } from './data/menu.js';

const normalizeSearch = (value) =>
  value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim();

const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});

const searchInput = document.querySelector('#search-input');
const searchClear = document.querySelector('#search-clear');
const grid = document.querySelector('#menu-grid');
const summary = document.querySelector('#results-summary');

const menuHash = (category) => category === 'todos' ? '#cardapio' : '#' + category;
const categoryFromHash = () =>
  CATEGORIES.find((category) => menuHash(category.id) === window.location.hash)?.id ?? 'todos';

let activeCategory = categoryFromHash();

const bowlIcon = '<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="currentColor" d="M3 23h42c-1 13-8 19-21 19S4 36 3 23Zm12 20h18v3H15z"/><path d="M3 23q21-11 42 0M14 20c-4-6 5-8 1-14m9 13c-4-6 5-9 1-15m9 16c-4-6 5-8 1-14" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>';
const flowerIcon = '<svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.7"><path d="M24 21C10 11 22 0 27 6q5 3 2 15c12-12 24 0 15 6q-4 3-13 0c14 10 5 23-3 14l-4-12c-2 17-18 16-16 6q1-5 11-8C2 31 0 15 10 15q6-1 14 6Z"/><circle cx="24" cy="25" r="3"/></svg>';

function renderMenuItems() {
  const query = normalizeSearch(searchInput.value);
  const items = MENU_ITEMS.filter((item) => {
    if (activeCategory !== 'todos' && item.category !== activeCategory) return false;
    const terms = [item.name, item.code, item.description,
      ...(item.fillings ?? []).flatMap((filling) => [filling.name, filling.code])];
    return terms.some((term) => normalizeSearch(term).includes(query));
  });

  searchClear.hidden = !searchInput.value;
  summary.textContent = items.length === 1 ? '1 prato encontrado' : `${items.length} pratos encontrados`;

  if (items.length === 0) {
    grid.innerHTML = '<p class="menu-empty-state">Nenhum prato encontrado. Tente outro nome ou código.</p>';
    return;
  }

  const sections = [
    { id: 'lamen', label: 'Lámen', dishes: items.filter((item) => item.category === 'lamen'), icon: bowlIcon },
    { id: 'especialidades', label: activeCategory === 'pratos-quentes' ? 'Pratos Quentes' : 'Porções e Especialidades',
      dishes: items.filter((item) => item.category !== 'lamen'), icon: flowerIcon }
  ];

  grid.innerHTML = sections.map(({ id, label, dishes: categoryItems, icon }) => {
    if (categoryItems.length === 0) return '';

    return `<section class="menu-category menu-category--${id}" aria-labelledby="heading-${id}">
      <h3 id="heading-${id}">${icon}<span>${label}</span></h3>
      <ul class="menu-grid">
        ${categoryItems.map((item) => `
          <li class="dish-card" data-code="${item.code}">
            <span class="dish-code-pill">${item.code}</span>
            <h4 class="dish-name">${item.name}</h4>
            <p class="dish-desc">${item.description}</p>
            <strong class="dish-price">${currency.format(item.price)}</strong>
            ${item.fillings ? `
              <details class="dish-fillings" ${query ? 'open' : ''}>
                <summary>Opções de recheio</summary>
                <ul>
                  ${item.fillings.map((filling) =>
                    `<li>${filling.name} <span class="dish-code-pill">Cód. ${filling.code}</span></li>`
                  ).join('')}
                </ul>
              </details>` : ''}
          </li>`).join('')}
      </ul>
    </section>`;
  }).join('');
}

function selectCategory(category) {
  activeCategory = category;
  document.querySelectorAll('.category-nav a').forEach((link) => {
    if (link.dataset.category === category) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
  renderMenuItems();
}

document.querySelectorAll('.category-nav a').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (link.hash !== window.location.hash) history.pushState(null, '', link.hash);
    selectCategory(categoryFromHash());
  });
});

window.addEventListener('hashchange', () => selectCategory(categoryFromHash()));
searchInput.form?.addEventListener('submit', (event) => event.preventDefault());
searchInput.addEventListener('input', renderMenuItems);
searchClear.addEventListener('click', () => {
  searchInput.value = '';
  renderMenuItems();
  searchInput.focus();
});

selectCategory(activeCategory);
