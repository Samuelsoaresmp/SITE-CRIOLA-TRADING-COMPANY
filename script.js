// ===== CRIOLA TRADING COMPANY — JavaScript =====

// ===== PRODUCT DATA =====
const products = [
  {
    id: 1,
    name: "Conjunto Renda Bordô",
    category: "conjuntos",
    categoryLabel: "Conjuntos",
    price: 289.90,
    oldPrice: null,
    description: "Conjunto de sutiã e calcinha em renda bordô com forro em microfibra. Detalhes em cetim e alças ajustáveis para conforto perfeito.",
    image: "images/product_burgundy.jpg",
    badge: "bestseller",
    colors: ["#722F37", "#1a1a2e", "#F5E6CC"]
  },
  {
    id: 2,
    name: "Bralette Floral Rosé",
    category: "conjuntos",
    categoryLabel: "Conjuntos",
    price: 199.90,
    oldPrice: 259.90,
    description: "Bralette com renda floral e calcinha biquíni em tom blush. Sem bojo, ideal para o dia a dia com toque de elegância.",
    image: "images/product_blush.jpg",
    badge: "sale",
    colors: ["#E8B4B8", "#F5E6CC", "#1a1a2e"]
  },
  {
    id: 3,
    name: "Conjunto Noite Clássico",
    category: "conjuntos",
    categoryLabel: "Conjuntos",
    price: 329.90,
    oldPrice: null,
    description: "Sutiã sem aro com calcinha cintura alta em preto acetinado. Acabamento em renda chantilly e detalhes refinados.",
    image: "images/product_black.jpg",
    badge: "new",
    colors: ["#1a1a2e", "#722F37", "#2d4a3e"]
  },
  {
    id: 4,
    name: "Bodysuit Esmeralda",
    category: "bodysuits",
    categoryLabel: "Bodysuits",
    price: 379.90,
    oldPrice: null,
    description: "Body em tule com painéis transparentes e detalhes em renda bordada na cor esmeralda. Fechamento em colchetes.",
    image: "images/product_emerald.jpg",
    badge: "new",
    colors: ["#2d4a3e", "#1a1a2e", "#722F37"]
  },
  {
    id: 5,
    name: "Pijama Seda Champagne",
    category: "sleepwear",
    categoryLabel: "Sleepwear",
    price: 449.90,
    oldPrice: 549.90,
    description: "Conjunto camisola e shorts em seda natural champagne com barrado de renda. Toque ultra suave para noites especiais.",
    image: "images/product_champagne.jpg",
    badge: "sale",
    colors: ["#D4A574", "#E8B4B8", "#F5E6CC"]
  },
  {
    id: 6,
    name: "Conjunto Noite Estrelada",
    category: "conjuntos",
    categoryLabel: "Edição Limitada",
    price: 459.90,
    oldPrice: null,
    description: "Sutiã push-up com string em azul marinho com detalhes dourados e renda bordada. Peça da coleção exclusiva Noite Estrelada.",
    image: "images/product_navy.jpg",
    badge: "bestseller",
    colors: ["#1B2A4A", "#D4AF37", "#1a1a2e"]
  },
  {
    id: 7,
    name: "Top Triângulo Branco",
    category: "basicos",
    categoryLabel: "Básicos",
    price: 149.90,
    oldPrice: null,
    description: "Bralette triângulo com calcinha biquíni em algodão premium branco com bordado inglês. Conforto do dia a dia.",
    image: "images/product_blush.jpg",
    badge: null,
    colors: ["#F5E6CC", "#E8B4B8", "#1a1a2e"]
  },
  {
    id: 8,
    name: "Calcinha Cintura Alta Preta",
    category: "basicos",
    categoryLabel: "Básicos",
    price: 89.90,
    oldPrice: 119.90,
    description: "Calcinha cintura alta em microfibra com painel frontal em renda. Modelagem que valoriza a silhueta.",
    image: "images/product_black.jpg",
    badge: "sale",
    colors: ["#1a1a2e", "#722F37", "#E8B4B8"]
  }
];

// ===== STATE =====
let cart = [];
let currentFilter = 'todos';
let selectedSize = 'P';
let currentModalProduct = null;

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  initScrollAnimations();
  initHeaderScroll();
});

// ===== RENDER PRODUCTS =====
function renderProducts(productList) {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';

  productList.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${index * 0.1}s`;
    card.style.animation = 'fadeInUp 0.6s var(--ease-out) forwards';
    card.style.opacity = '0';

    let badgeHTML = '';
    if (product.badge === 'new') {
      badgeHTML = '<span class="product-badge badge-new">Novo</span>';
    } else if (product.badge === 'sale') {
      badgeHTML = '<span class="product-badge badge-sale">Oferta</span>';
    } else if (product.badge === 'bestseller') {
      badgeHTML = '<span class="product-badge badge-bestseller">Mais Vendido</span>';
    }

    const oldPriceHTML = product.oldPrice 
      ? `<span class="price-old">R$ ${product.oldPrice.toFixed(2).replace('.', ',')}</span>` 
      : '';

    const colorsHTML = product.colors.map(color => 
      `<span class="color-dot" style="background:${color}" title="${color}"></span>`
    ).join('');

    card.innerHTML = `
      ${badgeHTML}
      <div class="product-image-wrapper">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <div class="product-quick-actions">
          <button class="quick-action-btn" onclick="openQuickView(${product.id})" title="Visualização rápida" aria-label="Visualização rápida">👁️</button>
          <button class="quick-action-btn" onclick="addToCart(${product.id})" title="Adicionar à sacola" aria-label="Adicionar à sacola">🛒</button>
          <button class="quick-action-btn" title="Favoritar" aria-label="Favoritar">♡</button>
        </div>
      </div>
      <div class="product-info">
        <p class="product-category-tag">${product.categoryLabel}</p>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-footer">
          <div class="product-price">
            <span class="price-current">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
            ${oldPriceHTML}
          </div>
          <div class="product-colors">${colorsHTML}</div>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

// ===== FILTER PRODUCTS =====
function filterProducts(category) {
  currentFilter = category;

  // Update active tab
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.classList.remove('active');
    if (tab.textContent.toLowerCase().replace('á', 'a') === category || 
        (category === 'todos' && tab.textContent.toLowerCase() === 'todos')) {
      tab.classList.add('active');
    }
  });

  const filtered = category === 'todos' 
    ? products 
    : products.filter(p => p.category === category);

  renderProducts(filtered);

  // Scroll to products section
  document.getElementById('products').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ===== CART FUNCTIONS =====
function addToCart(productId, size) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const sizeToUse = size || selectedSize;
  const existingItem = cart.find(item => item.id === productId && item.size === sizeToUse);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: sizeToUse,
      qty: 1
    });
  }

  updateCartUI();
  showToast(`${product.name} adicionado à sacola!`);
}

function removeFromCart(productId, size) {
  cart = cart.filter(item => !(item.id === productId && item.size === size));
  updateCartUI();
}

function updateCartItemQty(productId, size, delta) {
  const item = cart.find(i => i.id === productId && i.size === size);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId, size);
    return;
  }

  updateCartUI();
}

function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  document.getElementById('cartCount').textContent = totalItems;
  document.getElementById('cartItemsCount').textContent = totalItems;
  document.getElementById('cartTotal').textContent = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;

  const cartItemsEl = document.getElementById('cartItems');
  const cartEmpty = document.getElementById('cartEmpty');
  const cartFooter = document.getElementById('cartFooter');

  if (cart.length === 0) {
    cartEmpty.style.display = 'block';
    cartFooter.style.display = 'none';
    // Remove rendered cart items
    cartItemsEl.querySelectorAll('.cart-item').forEach(el => el.remove());
    return;
  }

  cartEmpty.style.display = 'none';
  cartFooter.style.display = 'block';

  // Re-render cart items
  cartItemsEl.querySelectorAll('.cart-item').forEach(el => el.remove());

  cart.forEach(item => {
    const cartItemEl = document.createElement('div');
    cartItemEl.className = 'cart-item';
    cartItemEl.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p class="item-variant">Tamanho: ${item.size}</p>
        <p class="item-price">R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}</p>
        <div class="cart-item-qty">
          <button onclick="updateCartItemQty(${item.id}, '${item.size}', -1)" aria-label="Diminuir quantidade">−</button>
          <span>${item.qty}</span>
          <button onclick="updateCartItemQty(${item.id}, '${item.size}', 1)" aria-label="Aumentar quantidade">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id}, '${item.size}')" aria-label="Remover item">✕</button>
    `;
    cartItemsEl.appendChild(cartItemEl);
  });
}

function toggleCart() {
  const overlay = document.getElementById('cartOverlay');
  const drawer = document.getElementById('cartDrawer');
  overlay.classList.toggle('active');
  drawer.classList.toggle('active');
  document.body.style.overflow = drawer.classList.contains('active') ? 'hidden' : '';
}

function checkout() {
  showToast('Redirecionando para o checkout...');
  setTimeout(() => {
    alert('Obrigada pela sua compra! 💕\n\nEste é um protótipo demonstrativo da Criola Trading Company.');
    cart = [];
    updateCartUI();
    toggleCart();
  }, 1000);
}

// ===== QUICK VIEW MODAL =====
function openQuickView(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  currentModalProduct = product;

  document.getElementById('modalImage').src = product.image;
  document.getElementById('modalImage').alt = product.name;
  document.getElementById('modalCategory').textContent = product.categoryLabel;
  document.getElementById('modalName').textContent = product.name;
  document.getElementById('modalDescription').textContent = product.description;
  document.getElementById('modalPrice').textContent = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
  
  const oldPriceEl = document.getElementById('modalOldPrice');
  if (product.oldPrice) {
    oldPriceEl.textContent = `R$ ${product.oldPrice.toFixed(2).replace('.', ',')}`;
    oldPriceEl.style.display = 'inline';
  } else {
    oldPriceEl.style.display = 'none';
  }

  // Reset size selection
  selectedSize = 'P';
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent === 'P') btn.classList.add('active');
  });

  const modal = document.getElementById('quickViewModal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  const modal = document.getElementById('quickViewModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
  currentModalProduct = null;
}

function selectSize(btn, size) {
  selectedSize = size;
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function addToCartFromModal() {
  if (currentModalProduct) {
    addToCart(currentModalProduct.id, selectedSize);
    closeQuickView();
  }
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
  const modal = document.getElementById('quickViewModal');
  if (e.target === modal) {
    closeQuickView();
  }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeQuickView();
    const drawer = document.getElementById('cartDrawer');
    if (drawer.classList.contains('active')) {
      toggleCart();
    }
  }
});

// ===== TOAST NOTIFICATION =====
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  toastMessage.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ===== NEWSLETTER =====
function handleNewsletter(event) {
  event.preventDefault();
  const email = document.getElementById('newsletterEmail').value;
  showToast(`Obrigada! ${email} cadastrado com sucesso 💕`);
  document.getElementById('newsletterEmail').value = '';
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// ===== HEADER SCROLL EFFECT =====
function initHeaderScroll() {
  const header = document.getElementById('mainHeader');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });
}

// ===== MOBILE MENU =====
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  
  if (navLinks.style.display === 'flex' && window.innerWidth <= 768) {
    navLinks.style.position = 'fixed';
    navLinks.style.top = '70px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'rgba(13, 10, 11, 0.95)';
    navLinks.style.backdropFilter = 'blur(20px)';
    navLinks.style.flexDirection = 'column';
    navLinks.style.padding = '2rem';
    navLinks.style.gap = '1.5rem';
    navLinks.style.zIndex = '999';
    navLinks.style.borderBottom = '1px solid rgba(212, 165, 116, 0.15)';
    navLinks.style.animation = 'slideDown 0.3s ease forwards';
  }
}

// Close mobile menu on nav link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      const navLinks = document.getElementById('navLinks');
      navLinks.style.display = 'none';
    }
  });
});

// Handle window resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    const navLinks = document.getElementById('navLinks');
    navLinks.style.cssText = '';
  }
});
