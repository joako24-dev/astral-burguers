/* ==================================================
   ASTRAL BURGERS — SCRIPT
   ================================================== */

/* =========  CONFIG  ========= */
// 👇 EDITÁ ESTOS VALORES (placeholders)
const CONFIG = {
  whatsapp: "5491169332249",        // tu número, formato internacional sin + ni espacios
  instagram: "astral.burgers",       // sin el @
  hours: "Viernes a Domingo · 20:00 a 00:00",
  zones: [
    "San Miguel", "Bella Vista", "Muñiz"
  ],
};

/* =========  DATA  ========= */
const hamburguesas = [
  { id:"h1", nombre:"Cheese Burger",   precio:8000, ingredientes:"2 medallones de carne premium + cheddar fundido + pan brioche",                                                imagen:"img/cheesseburguer.jpeg", tag:"CLÁSICA" },
  { id:"h2", nombre:"Bacon Cheese",    precio:8500, ingredientes:"2 medallones de carne + cheddar fundido + bacon crocante + pan brioche",                                       imagen:"img/baconcheese.jpeg",    tag:"TOP" },
  { id:"h3", nombre:"Cuarto Extreme",  precio:9000, ingredientes:"2 medallones de carne + cheddar + bacon + salsa Cuarto de la casa",                                            imagen:"img/cuartoextreme.jpeg",  tag:"HOT" },
  { id:"h4", nombre:"Cuarto Caramel",  precio:9500, ingredientes:"2 medallones de carne + cheddar + bacon + cebolla caramelizada + salsa Cuarto",                                imagen:"img/cuartocaramel.jpeg",  tag:"CHEF" },
  { id:"h5", nombre:"Caramel Burger",  precio:8500, ingredientes:"2 medallones de carne + cheddar + bacon + cebolla caramelizada",                                               imagen:"img/caramelburguer.jpeg", tag:"" },
];

const combos = [
  { id:"c1",  nombre:"Luna Llena",         precio:8800,  ingredientes:"Cheese Burger + lata de Coca 354cc",                                                       imagen:"img/cheesseburguer.jpeg" },
  { id:"c2",  nombre:"Galaxia",            precio:19800, ingredientes:"2 Cheese Burger + 2 latas de Coca 354cc",                                                  imagen:"img/cheesseburguer.jpeg" },
  { id:"c3",  nombre:"Eclipse",            precio:11800, ingredientes:"Cuarto Caramel + papas + lata de Coca 354cc",                                              imagen:"img/cuartocaramel.jpeg",  tag:"TOP" },
  { id:"c4",  nombre:"Cometa",             precio:23800, ingredientes:"Cuarto Extreme + Caramel Burger + papas + Coca 2.5L",                                      imagen:"img/cuartoextreme.jpeg" },
  { id:"c5",  nombre:"Cometa 2",           precio:18500, ingredientes:"Cuarto Extreme + Bacon Cheese + papas",                                                    imagen:"img/cuartoextreme.jpeg" },
  { id:"c6",  nombre:"Super Nova",         precio:34800, ingredientes:"2 Cuarto Caramel triples + papas grandes",                                                 imagen:"img/cuartocaramel.jpeg", tag:"XL" },
  { id:"c7",  nombre:"Constelación",       precio:28500, ingredientes:"3 Cuarto Extreme + papas",                                                                 imagen:"img/cuartoextreme.jpeg" },
  { id:"c8",  nombre:"Universo",           precio:33000, ingredientes:"2 Cuarto Extreme + Cheese Burger + papas + Coca 2.5L",                                     imagen:"img/cuartoextreme.jpeg", tag:"HOT" },
  { id:"c9",  nombre:"Mercurio",           precio:27500, ingredientes:"Cuarto Extreme + Bacon Cheese + Cheese Burger + papas",                                    imagen:"img/baconcheese.jpeg" },
  { id:"c10", nombre:"Explosión Estelar",  precio:44000, ingredientes:"2 Cuarto Extreme + 2 Melt Burger + papas + Coca 2.5L",                                     imagen:"img/cuartoextreme.jpeg", tag:"PARTY" },
  { id:"c11", nombre:"Impacto Cósmico",    precio:35800, ingredientes:"2 Bacon Cheese + 2 Cheese Burger + papas",                                                 imagen:"img/baconcheese.jpeg" },
];

const bebidas = [
  { id:"b1", nombre:"Coca-Cola 2.5L", precio:5500, ingredientes:"Coca-Cola botella 2.5 litros bien fría", imagen:"img/cocagrande.png" },
  { id:"b2", nombre:"Levité Pomelo", precio:2200, ingredientes:"Agua saborizada Levité pomelo 500cc",   imagen:"img/levite.png" },
  { id:"b3", nombre:"Coca-Cola Lata", precio:2200, ingredientes:"Coca-Cola lata 354cc bien fría",          imagen:"img/cocachica.png" },
];

/* =========  STATE  ========= */
const cart = {};

// Lookup map para encontrar productos rápido
const productMap = {};
[...hamburguesas, ...combos, ...bebidas].forEach(p => productMap[p.id] = p);

/* =========  DOM HELPERS  ========= */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);
const formatPrice = (n) => n.toLocaleString("es-AR");

/* =========  CATALOG RENDER  ========= */
function renderCard(item, index, withNumber = false) {
  const tag = item.tag ? `<span class="card-tag">${item.tag}</span>` : "";
  const numBadge = withNumber ? `<span class="card-num">${String(index + 1).padStart(2, "0")}</span>` : "";

  return `
    <article class="card" data-id="${item.id}">
      <div class="card-img-wrap">
        ${numBadge}
        ${tag}
        <img src="${item.imagen}" alt="${item.nombre}" loading="lazy" onerror="this.style.opacity=0">
      </div>
      <div class="card-body">
        <h3 class="card-title">${item.nombre}</h3>
        <p class="card-desc">${item.ingredientes}</p>
        <div class="card-foot">
          <span class="card-price">$${formatPrice(item.precio)}</span>
          <div class="card-actions">
            <button class="btn-icon" data-action="info" data-id="${item.id}" aria-label="Ver detalles">ⓘ</button>
            <button class="btn-add" data-action="add" data-id="${item.id}">+ Sumar</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderCatalog(list, containerId, withNumber = false) {
  const container = $(`#${containerId}`);
  if (!container) return;
  container.innerHTML = list.map((item, i) => renderCard(item, i, withNumber)).join("");
}

renderCatalog(hamburguesas, "grid-hamburguesas", true);
renderCatalog(combos, "grid-combos", false);
renderCatalog(bebidas, "grid-bebidas", false);

/* =========  CARD ACTIONS (event delegation)  ========= */
document.body.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;

  const id = btn.dataset.id;
  const action = btn.dataset.action;
  const product = productMap[id];
  if (!product) return;

  if (action === "add") {
    addToCart(product, btn);
  } else if (action === "info") {
    openIngredients(product);
  }
});

/* =========  CART LOGIC  ========= */
function addToCart(product, sourceBtn) {
  if (cart[product.id]) {
    cart[product.id].qty++;
  } else {
    cart[product.id] = { ...product, qty: 1 };
  }
  updateCartUI();
  bumpCartFab();
  flyToCart(sourceBtn, product.imagen);
  showToast(`✓ ${product.nombre} agregado`);
}

function changeQty(id, delta) {
  if (!cart[id]) return;
  cart[id].qty += delta;
  if (cart[id].qty <= 0) delete cart[id];
  updateCartUI();
}

function clearCart() {
  Object.keys(cart).forEach(k => delete cart[k]);
  updateCartUI();
  showToast("Carrito vaciado");
}

function updateCartUI() {
  const list = $("#cartList");
  const empty = $("#cartEmpty");
  const foot = $("#cartFoot");
  const totalEl = $("#cartTotal");
  const countEl = $("#cartCount");

  let total = 0;
  let count = 0;

  const items = Object.values(cart);

  if (items.length === 0) {
    list.innerHTML = "";
    empty.style.display = "block";
    foot.hidden = true;
  } else {
    empty.style.display = "none";
    foot.hidden = false;
    list.innerHTML = items.map(item => `
      <li class="cart-item" data-id="${item.id}">
        <img src="${item.imagen}" alt="" class="cart-item-img" onerror="this.style.opacity=0">
        <div class="cart-item-info">
          <span class="cart-item-name">${item.nombre}</span>
          <span class="cart-item-price">$${formatPrice(item.precio * item.qty)}</span>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" data-qty="-1" data-id="${item.id}" aria-label="Restar">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" data-qty="+1" data-id="${item.id}" aria-label="Sumar">+</button>
        </div>
      </li>
    `).join("");

    items.forEach(item => {
      total += item.precio * item.qty;
      count += item.qty;
    });
  }

  totalEl.textContent = formatPrice(total);
  countEl.textContent = count;
}

// qty buttons inside cart modal
$("#cartList").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-qty]");
  if (!btn) return;
  changeQty(btn.dataset.id, parseInt(btn.dataset.qty, 10));
});

$("#btnVaciar").addEventListener("click", clearCart);
$("#btnEnviar").addEventListener("click", sendOrder);

/* =========  CART FAB ANIMATIONS  ========= */
function bumpCartFab() {
  const fab = $("#cartFab");
  fab.classList.remove("bump");
  void fab.offsetWidth; // reflow
  fab.classList.add("bump");
}

function flyToCart(sourceBtn, imageSrc) {
  if (!sourceBtn) return;
  const card = sourceBtn.closest(".card");
  const img = card?.querySelector(".card-img-wrap img");
  if (!img) return;

  const fab = $("#cartFab");
  const startRect = img.getBoundingClientRect();
  const endRect = fab.getBoundingClientRect();

  const flyEl = document.createElement("img");
  flyEl.src = imageSrc;
  flyEl.className = "fly-to-cart";
  flyEl.style.left = startRect.left + (startRect.width / 2) - 40 + "px";
  flyEl.style.top = startRect.top + (startRect.height / 2) - 40 + "px";
  document.body.appendChild(flyEl);

  requestAnimationFrame(() => {
    flyEl.style.left = endRect.left + (endRect.width / 2) - 12 + "px";
    flyEl.style.top = endRect.top + (endRect.height / 2) - 12 + "px";
    flyEl.style.width = "24px";
    flyEl.style.height = "24px";
    flyEl.style.opacity = "0";
    flyEl.style.transform = "rotate(360deg)";
  });

  setTimeout(() => flyEl.remove(), 850);
}

/* =========  MODALS  ========= */
function openModal(id) {
  const modal = $(`#${id}`);
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeModal(id) {
  const modal = $(`#${id}`);
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// Close handlers
document.addEventListener("click", (e) => {
  const closer = e.target.closest("[data-close]");
  if (closer) {
    closeModal(closer.dataset.close);
  }
});

// ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    $$(".modal[aria-hidden='false']").forEach(m => closeModal(m.id));
    $("#drawer").classList.remove("open");
    $("#navToggle").classList.remove("open");
  }
});

// Cart FAB opens cart modal
$("#cartFab").addEventListener("click", () => openModal("cartModal"));

// Ingredients modal
let currentIngrProduct = null;
function openIngredients(product) {
  currentIngrProduct = product;
  $("#ingrTitle").textContent = product.nombre;
  $("#ingrDesc").textContent = product.ingredientes;
  $("#ingrPrice").textContent = formatPrice(product.precio);
  const img = $("#ingrImage");
  img.src = product.imagen;
  img.alt = product.nombre;
  img.style.opacity = 1;
  img.onerror = () => { img.style.opacity = 0; };
  openModal("ingrModal");
}

$("#ingrAddBtn").addEventListener("click", () => {
  if (!currentIngrProduct) return;
  addToCart(currentIngrProduct, $("#ingrAddBtn"));
  closeModal("ingrModal");
});

/* =========  WHATSAPP ORDER  ========= */
function sendOrder() {
  const items = Object.values(cart);
  if (items.length === 0) {
    showToast("Tu carrito está vacío 🍔");
    return;
  }

  let total = 0;
  let lines = ["🍔 *Pedido — ASTRAL BURGERS* 🍔", ""];

  items.forEach(item => {
    const subtotal = item.precio * item.qty;
    total += subtotal;
    lines.push(`• ${item.nombre} x${item.qty} — $${formatPrice(subtotal)}`);
  });

  lines.push("");
  lines.push(`*TOTAL: $${formatPrice(total)}*`);
  lines.push("");
  lines.push("¿Está disponible para delivery? 🛵");

  const message = encodeURIComponent(lines.join("\n"));
  const url = `https://wa.me/${CONFIG.whatsapp}?text=${message}`;
  window.open(url, "_blank");
}

/* =========  TOAST  ========= */
let toastTimer;
function showToast(msg) {
  const toast = $("#toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* =========  NAVBAR + MOBILE DRAWER  ========= */
const navbar = $("#navbar");
const navToggle = $("#navToggle");
const drawer = $("#drawer");

window.addEventListener("scroll", () => {
  if (window.scrollY > 30) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
}, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = drawer.classList.toggle("open");
  navToggle.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", isOpen);
  drawer.setAttribute("aria-hidden", !isOpen);
});

// Close drawer on link click
drawer.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    drawer.classList.remove("open");
    navToggle.classList.remove("open");
  });
});

/* =========  SCROLL REVEAL  ========= */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

// Stagger by index for nicer cascade
$$(".card").forEach((card, i) => {
  card.style.transitionDelay = `${(i % 6) * 60}ms`;
  revealObserver.observe(card);
});

/* =========  CONFIG INJECTION (zones, IG, contact, etc.)  ========= */
function injectConfig() {
  // Zones
  const zonesEl = $("#zones");
  zonesEl.innerHTML = CONFIG.zones.map(z => `<li>📍 ${z}</li>`).join("");
  const footerZonesEl = $("#footerZones");
  if (footerZonesEl) footerZonesEl.innerHTML = CONFIG.zones.map(z => `<li>📍 ${z}</li>`).join("");

  // Instagram
  const igUrl = `https://instagram.com/${CONFIG.instagram}`;
  $("#igHandle").textContent = `@${CONFIG.instagram}`;
  $("#igCta").href = igUrl;
  $("#contactInstagram").href = igUrl;
  $("#contactIg").textContent = `@${CONFIG.instagram}`;
  $("#footerInstagram").href = igUrl;
  $("#footerIgHandle").textContent = `@${CONFIG.instagram}`;
  $("#footerSocialIg").href = igUrl;

  // Contact
  const waUrl = `https://wa.me/${CONFIG.whatsapp}`;
  $("#contactWhatsapp").href = waUrl;
  $("#deliveryWhatsappLink").href = waUrl;
  $("#drawerWhatsapp").href = waUrl;
  $("#footerWhatsapp").href = waUrl;
  $("#footerDeliveryWsp").href = `${waUrl}?text=${encodeURIComponent("Hola! Quiero hacer un pedido 🍔")}`;
  $("#footerSocialWsp").href = waUrl;

  // Phone formatted display
  const phone = CONFIG.whatsapp;
  const formatted = `+${phone.slice(0,2)} ${phone.slice(2,4)} ${phone.slice(4,6)} ${phone.slice(6,10)}-${phone.slice(10)}`;
  $("#contactPhone").textContent = formatted;

  // Hours
  $("#contactHours").textContent = CONFIG.hours;
  $("#footerHours").textContent = CONFIG.hours;

  // Year
  $("#year").textContent = new Date().getFullYear();

  // Instagram fake grid (decorative — links to IG profile)
  const emojis = ["🍔", "🔥", "🍟", "🥤", "⭐", "🌶️"];
  const igGrid = $("#igGrid");
  igGrid.innerHTML = emojis.map(e => `
    <a href="${igUrl}" target="_blank" rel="noopener" class="ig-cell" aria-label="Ver perfil de Instagram">
      <span class="ig-cell-emoji">${e}</span>
    </a>
  `).join("");
}
injectConfig();

/* =========  INITIAL CART UI  ========= */
updateCartUI();
