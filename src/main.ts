import { MENU_ITEMS, RAMEN_DETAILS, CATEGORIES, MenuItem } from './data/menu';

const normalizeSearch = (value: string): string =>
  value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim();

// Currency Formatter pt-BR
const formatCurrency = (val: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(val);
};

class OishiApp {
  private activeCategory: string = 'todos';
  private searchQuery: string = '';
  private lastFocusedElement: HTMLElement | null = null;

  constructor() {
    this.init();
  }

  private init(): void {
    this.renderRamenSection();
    this.renderCategoryTabs();
    this.renderMenuItems();
    this.bindEvents();
    this.initHeaderScroll();
  }

  private initHeaderScroll(): void {
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  private bindEvents(): void {
    // Search input
    const searchInput = document.getElementById('search-input') as HTMLInputElement | null;
    const searchClear = document.getElementById('search-clear') as HTMLButtonElement | null;

    searchInput?.addEventListener('input', (e) => {
      this.searchQuery = (e.target as HTMLInputElement).value.trim();
      if (searchClear) {
        searchClear.classList.toggle('visible', this.searchQuery.length > 0);
      }
      this.renderMenuItems();
    });

    searchClear?.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        this.searchQuery = '';
        searchClear.classList.remove('visible');
        searchInput.focus();
        this.renderMenuItems();
      }
    });

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav-panel');

    mobileBtn?.addEventListener('click', () => {
      const isOpen = mobileNav?.classList.toggle('open');
      mobileBtn.classList.toggle('active', isOpen);
      mobileBtn.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile nav on click links
    document.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav?.classList.remove('open');
        mobileBtn?.classList.remove('active');
        mobileBtn?.setAttribute('aria-expanded', 'false');
      });
    });

    const syncCategory = () => {
      const category = window.location.hash === '#porcoes' ? 'porcoes' : 'todos';
      this.activeCategory = category;
      this.renderCategoryTabs();
      this.renderMenuItems();
    };
    document.querySelectorAll('a[href="#porcoes"], a[href="#cardapio"]').forEach((link) => {
      link.addEventListener('click', () => {
        if (link.getAttribute('href') === window.location.hash) syncCategory();
      });
    });
    window.addEventListener('hashchange', () => {
      if (['#porcoes', '#cardapio'].includes(window.location.hash)) syncCategory();
    });
    if (window.location.hash === '#porcoes') syncCategory();

    // Modal close events
    const modalOverlay = document.getElementById('item-modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    modalCloseBtn?.addEventListener('click', () => this.closeModal());

    modalOverlay?.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        this.closeModal();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay?.classList.contains('active')) {
        this.closeModal();
      } else if (e.key === 'Tab' && modalOverlay?.classList.contains('active')) {
        e.preventDefault();
        modalCloseBtn?.focus();
      }
    });
  }

  private renderCategoryTabs(): void {
    const tabsContainer = document.getElementById('filter-tabs');
    if (!tabsContainer) return;

    tabsContainer.innerHTML = CATEGORIES.map((cat) => {
      const count = cat.id === 'todos' 
        ? MENU_ITEMS.length 
        : MENU_ITEMS.filter((i) => i.category === cat.id).length;

      const isActive = cat.id === this.activeCategory;

      return `
        <button 
          class="filter-tab-btn ${isActive ? 'active' : ''}" 
          data-category="${cat.id}"
          type="button"
          aria-pressed="${isActive}"
        >
          <span>${cat.label}</span>
          <span class="filter-badge-count">${count}</span>
        </button>
      `;
    }).join('');

    tabsContainer.querySelectorAll('.filter-tab-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const target = (e.currentTarget as HTMLElement).dataset.category;
        if (target) {
          this.activeCategory = target;
          this.renderCategoryTabs();
          tabsContainer.querySelector<HTMLElement>('.filter-tab-btn.active')?.focus();
          this.renderMenuItems();
        }
      });
    });
  }

  private renderRamenSection(): void {
    const ramenContainer = document.getElementById('ramen-grid');
    if (!ramenContainer) return;

    ramenContainer.innerHTML = RAMEN_DETAILS.map((ramen) => {
      return `
        <article class="ramen-card" tabindex="0" data-code="${ramen.code}" role="button" aria-label="Ver detalhes de ${ramen.name}">
          <div class="ramen-card-top">
            <span class="ramen-code">Cód. ${ramen.code}</span>
            <span class="ramen-flavor-tag flavor-${ramen.flavorType}">${ramen.flavorTag}</span>
          </div>
          <h3 class="ramen-name">${ramen.name}</h3>
          <p class="ramen-desc">${ramen.description}</p>
          <div class="ramen-card-bottom">
            <span class="ramen-price">${formatCurrency(ramen.price)}</span>
            <span class="ramen-action-label">Ver Detalhes &rarr;</span>
          </div>
        </article>
      `;
    }).join('');

    ramenContainer.querySelectorAll('.ramen-card').forEach((card) => {
      const code = (card as HTMLElement).dataset.code;
      const handler = () => {
        if (code) this.openModalByCode(code, card as HTMLElement);
      };

      card.addEventListener('click', handler);
      card.addEventListener('keydown', (e: any) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handler();
        }
      });
    });
  }

  private getFilteredItems(): MenuItem[] {
    const query = normalizeSearch(this.searchQuery);
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = this.activeCategory === 'todos' || item.category === this.activeCategory;
      if (!matchesCategory) return false;

      const terms = [item.name, item.code, item.categoryLabel, item.description,
        ...(item.fillings ?? []).flatMap((filling) => [filling.name, filling.code])];
      return terms.some((term) => normalizeSearch(term).includes(query));
    });
  }

  private renderMenuItems(): void {
    const grid = document.getElementById('menu-grid');
    const summary = document.getElementById('results-summary');
    if (!grid) return;

    const items = this.getFilteredItems();

    if (summary) {
      const categoryObj = CATEGORIES.find((c) => c.id === this.activeCategory);
      summary.innerHTML = `
        <span>Exibindo <strong>${items.length}</strong> itens em <em>${categoryObj?.label}</em></span>
        ${this.searchQuery ? '<span>Busca por: "<strong data-search-term></strong>"</span>' : ''}
      `;
      const searchTerm = summary.querySelector('[data-search-term]');
      if (searchTerm) searchTerm.textContent = this.searchQuery;
    }

    if (items.length === 0) {
      grid.innerHTML = `
        <div class="menu-empty-state">
          <div class="empty-icon">🥢</div>
          <h3 class="empty-title">Nenhum prato encontrado</h3>
          <p class="empty-text">Tente buscar pelo código ou por outro nome.</p>
          <button class="btn-secondary" id="reset-search-btn" type="button">Limpar Filtros e Busca</button>
        </div>
      `;

      document.getElementById('reset-search-btn')?.addEventListener('click', () => {
        const searchInput = document.getElementById('search-input') as HTMLInputElement | null;
        if (searchInput) searchInput.value = '';
        document.getElementById('search-clear')?.classList.remove('visible');
        this.searchQuery = '';
        this.activeCategory = 'todos';
        this.renderCategoryTabs();
        this.renderMenuItems();
        searchInput?.focus();
      });
      return;
    }

    grid.innerHTML = items.map((item) => {
      return `
        <article class="dish-card" tabindex="0" data-code="${item.code}" role="button" aria-label="Ver detalhes de ${item.name}">
          <div>
            ${item.image
              ? `<img class="dish-visual" src="${item.image}" alt="" loading="lazy">`
              : '<div class="dish-visual dish-placeholder" aria-hidden="true"></div>'}
            <div class="dish-card-header">
              <span class="dish-code-pill">Cód. ${item.code}</span>
            </div>
            <h3 class="dish-name">${item.name}</h3>
            <p class="dish-desc">${item.description}</p>
            ${item.portionNote ? `<div class="dish-portion-note">${item.portionNote}</div>` : ''}
          </div>

          <div class="dish-footer">
            <span class="dish-price">${formatCurrency(item.price)}</span>
            <span class="dish-view-more">Ver Detalhes &rarr;</span>
          </div>
        </article>
      `;
    }).join('');

    grid.querySelectorAll('.dish-card').forEach((card) => {
      const code = (card as HTMLElement).dataset.code;
      const handler = () => {
        if (code) this.openModalByCode(code, card as HTMLElement);
      };

      card.addEventListener('click', handler);
      card.addEventListener('keydown', (e: any) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handler();
        }
      });
    });
  }

  private openModalByCode(code: string, triggerElement?: HTMLElement): void {
    const item = MENU_ITEMS.find((i) => i.code === code);
    if (!item) return;

    this.lastFocusedElement = triggerElement || (document.activeElement as HTMLElement);

    const modalOverlay = document.getElementById('item-modal-overlay');
    const modalBody = document.getElementById('modal-dynamic-content');
    if (!modalOverlay || !modalBody) return;

    modalBody.innerHTML = `
      <span class="modal-category-badge">${item.categoryLabel}</span>
      <h2 class="modal-title" id="modal-dish-title">${item.name}</h2>
      <div class="modal-code-spec">Código #${item.code} ${item.japaneseName ? `· ${item.japaneseName}` : ''}</div>
      ${item.image ? `<img class="dish-visual" src="${item.image}" alt="${item.name}">` : ''}
      
      <div class="modal-price-box">
        <span class="modal-price-label">Valor unitário</span>
        <span class="modal-price-val">${formatCurrency(item.price)}</span>
      </div>

      <h4 class="modal-desc-heading">Ingredientes & Preparo</h4>
      <p class="modal-desc-text">${item.description}</p>

      ${item.portionNote ? `
        <div class="modal-details-extra">
          <strong>Apresentação:</strong> ${item.portionNote}
        </div>
      ` : ''}

      ${item.fillings && item.fillings.length > 0 ? `
        <div class="modal-details-extra">
          <div class="modal-fillings-title">Opções de Recheio Disponíveis:</div>
          <ul class="modal-fillings-list">
            ${item.fillings.map(f => `
              <li class="modal-filling-item">
                <span>${f.name}</span>
                <span class="modal-filling-code">Cód. ${f.code}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      ` : ''}

      <div class="modal-disclaimer">
        Consulte nossa equipe no restaurante para informações sobre alergênicos e pedidos especiais.
      </div>
    `;

    modalOverlay.inert = false;
    modalOverlay.classList.add('active');
    document.querySelectorAll<HTMLElement>('body > header, body > main, body > footer')
      .forEach((element) => { element.inert = true; });
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    const closeBtn = document.getElementById('modal-close-btn');
    closeBtn?.focus();
  }

  private closeModal(): void {
    const modalOverlay = document.getElementById('item-modal-overlay');
    if (!modalOverlay) return;

    modalOverlay.classList.remove('active');
    modalOverlay.inert = true;
    document.querySelectorAll<HTMLElement>('body > header, body > main, body > footer')
      .forEach((element) => { element.inert = false; });
    document.body.style.overflow = '';

    if (this.lastFocusedElement) {
      this.lastFocusedElement.focus();
    }
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  new OishiApp();
});
