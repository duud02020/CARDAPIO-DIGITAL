
import { MENU_ITEMS, CATEGORIES } from './data/menu.js';

// Importa as fotos para que o Vite as inclua no build.
const dishImages = import.meta.glob('../images/pratos/*.webp', {
  eager: true,
  query: '?url',
  import: 'default'
});

const normalizeSearch = (value) =>
  String(value ?? '')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .trim();

const escapeHtml = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);

const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});

const searchInput = document.querySelector('#search-input');
const searchClear = document.querySelector('#search-clear');
const grid = document.querySelector('#menu-grid');
const summary = document.querySelector('#results-summary');
const dialog = document.querySelector('#dish-dialog');
const dialogContent = document.querySelector('#dish-dialog-content');

const menuHash = (category) =>
  category === 'todos' ? '#cardapio' : '#' + category;

const categoryFromHash = () =>
  CATEGORIES.find(
    (category) => menuHash(category.id) === location.hash
  )?.id ?? 'todos';

const flowerIcon = '<svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.7"><path d="M24 21C10 11 22 0 27 6q5 3 2 15c12-12 24 0 15 6q-4 3-13 0c14 10 5 23-3 14l-4-12c-2 17-18 16-16 6q1-5 11-8C2 31 0 15 10 15q6-1 14 6Z"/><circle cx="24" cy="25" r="3"/></svg>';

const bowlIcon = '<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="currentColor" d="M3 23h42c-1 13-8 19-21 19S4 36 3 23Zm12 20h18v3H15z"/><path d="M3 23q21-11 42 0M14 20c-4-6 5-8 1-14m9 13c-4-6 5-9 1-15m9 16c-4-6 5-8 1-14" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>';

let activeCategory = categoryFromHash();

// Resolve a fotografia pelo caminho gerado pelo Vite.
function getDishImage(item) {
  if (!item.image) return '';

  const imageKey = '../' + item.image;

  return dishImages[imageKey] ?? '';
}

function dishMedia(item, eager = false) {
  const label = escapeHtml(item.name);
  const source = escapeHtml(getDishImage(item));

  return '<div class="dish-media">' +
    '<div class="dish-media-placeholder" aria-hidden="true">' +
      flowerIcon +
      '<span>Foto em breve</span>' +
    '</div>' +
    (source
      ? '<img src="' + source +
        '" alt="Imagem de ' + label + '"' +
        (eager ? '' : ' loading="lazy"') +
        ' decoding="async">'
      : '') +
    '</div>';
}

function fillingsMarkup(item, expanded = false) {
  if (!item.fillings) return '';

  return '<details class="dish-fillings"' +
    (expanded ? ' open' : '') + '>' +
    '<summary>Opções de recheio</summary>' +
    '<ul>' +
    item.fillings.map((filling) =>
      '<li>' +
        escapeHtml(filling.name) +
        ' <span class="filling-code">Cód. ' +
        escapeHtml(filling.code) +
        '</span>' +
      '</li>'
    ).join('') +
    '</ul>' +
    '</details>';
}

function dishMarkup(item) {
  return '<li class="dish-card" data-code="' +
    escapeHtml(item.code) + '">' +

    dishMedia(item) +

    '<div class="dish-body">' +
      '<span class="dish-code-pill">Cód. ' +
        escapeHtml(item.code) +
      '</span>' +

      '<h4 class="dish-name">' +
        escapeHtml(item.name) +
      '</h4>' +

      '<p class="dish-desc">' +
        escapeHtml(item.description) +
      '</p>' +

      fillingsMarkup(item) +

      '<div class="dish-bottom">' +
        '<strong class="dish-price">' +
          currency.format(item.price) +
        '</strong>' +

        '<button class="dish-details-trigger" ' +
          'data-details-code="' + escapeHtml(item.code) + '" ' +
          'type="button" aria-label="Ver detalhes de ' +
          escapeHtml(item.name) + '">' +
          'Ver detalhes <span aria-hidden="true">↗</span>' +
        '</button>' +
      '</div>' +
    '</div>' +
  '</li>';
}

function renderMenuItems() {
  const query = normalizeSearch(searchInput.value);

  const items = MENU_ITEMS.filter((item) => {
    if (
      activeCategory !== 'todos' &&
      item.category !== activeCategory
    ) {
      return false;
    }

    const terms = [
      item.name,
      item.code,
      item.description,
      ...(item.fillings ?? []).flatMap((filling) => [
        filling.name,
        filling.code
      ])
    ];

    return terms.some((term) =>
      normalizeSearch(term).includes(query)
    );
  });

  searchClear.hidden = !searchInput.value;

  summary.textContent = items.length === 1
    ? '1 prato encontrado'
    : items.length + ' pratos encontrados';

  if (!items.length) {
    grid.innerHTML =
      '<p class="menu-empty-state">' +
      'Nenhum prato encontrado. Tente outro nome ou código.' +
      '</p>';

    return;
  }

  const sections = CATEGORIES.filter(
    (category) => category.id !== 'todos'
  );

  grid.innerHTML = sections.map((section) => {
    const dishes = items.filter(
      (item) => item.category === section.id
    );

    if (!dishes.length) return '';

    const icon = section.id === 'lamen'
      ? bowlIcon
      : flowerIcon;

    return '<section class="menu-category menu-category--' +
      section.id + '" aria-labelledby="heading-' +
      section.id + '">' +

      '<h3 id="heading-' + section.id + '">' +
        icon +
        '<span>' + escapeHtml(section.label) + '</span>' +
        '<small>' + dishes.length + '</small>' +
      '</h3>' +

      '<ul class="menu-grid">' +
        dishes.map(dishMarkup).join('') +
      '</ul>' +

    '</section>';
  }).join('');
}

function selectCategory(category) {
  activeCategory = category;

  document.querySelectorAll('.category-nav a').forEach((link) => {
    if (link.dataset.category === category) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  renderMenuItems();
}

function showDetails(code) {
  const item = MENU_ITEMS.find(
    (dish) => dish.code === code
  );

  if (!item || !dialog || !dialogContent) return;

  const category = CATEGORIES.find(
    (entry) => entry.id === item.category
  )?.label || '';

  dialogContent.innerHTML =
    dishMedia(item, true) +

    '<div class="dish-dialog-body">' +
      '<span class="dish-code-pill">Cód. ' +
        escapeHtml(item.code) +
        ' · ' + escapeHtml(category) +
      '</span>' +

      '<h2 id="dish-dialog-title">' +
        escapeHtml(item.name) +
      '</h2>' +

      '<p>' +
        escapeHtml(item.description) +
      '</p>' +

      fillingsMarkup(item, true) +

      '<strong class="dish-price">' +
        currency.format(item.price) +
      '</strong>' +
    '</div>';

  dialog.showModal();
}

// Navegação entre categorias.
document.querySelectorAll('.category-nav a').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();

    if (link.hash !== location.hash) {
      history.pushState(null, '', link.hash);
    }

    selectCategory(categoryFromHash());
  });
});

// Abre os detalhes do prato.
grid.addEventListener('click', (event) => {
  const trigger = event.target.closest(
    '[data-details-code]'
  );

  if (trigger) {
    showDetails(trigger.dataset.detailsCode);
  }
});

// Mantém o placeholder caso uma foto falhe.
function handleImageError(event) {
  if (
    event.target instanceof HTMLImageElement &&
    event.target.closest('.dish-media')
  ) {
    event.target.hidden = true;

    event.target.closest('.dish-media')
      .classList.add('is-missing');
  }
}

grid.addEventListener('error', handleImageError, true);

dialog?.addEventListener('error', handleImageError, true);

// Fecha o modal.
document.querySelector('#dish-dialog-close')
  ?.addEventListener('click', () => dialog.close());

dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

// Sincronização da URL e filtros.
window.addEventListener('hashchange', () =>
  selectCategory(categoryFromHash())
);

window.addEventListener('popstate', () =>
  selectCategory(categoryFromHash())
);

searchInput.form?.addEventListener('submit', (event) =>
  event.preventDefault()
);

searchInput.addEventListener('input', renderMenuItems);

searchClear.addEventListener('click', () => {
  searchInput.value = '';
  renderMenuItems();
  searchInput.focus();
});

// Inicialização.
selectCategory(activeCategory);
