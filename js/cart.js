// В хранилище записываем только идентификаторы и количество, цены берём из data.js.
const storageKey = "akkord-kr4";
let state = { cart: [], favorites: [], promo: false };
try {
  const saved = JSON.parse(localStorage.getItem(storageKey));
  if (saved && typeof saved === "object") {
    const valid = (id) => products.some((p) => p.id === id);
    state.favorites = Array.isArray(saved.favorites)
      ? [...new Set(saved.favorites.filter(valid))]
      : [];
    state.promo = saved.promo === true;
    if (Array.isArray(saved.cart)) {
      saved.cart.forEach((row) => {
        if (
          row &&
          valid(row.id) &&
          products.find((p) => p.id === row.id).isAvailable &&
          Number.isInteger(row.quantity) &&
          row.quantity > 0 &&
          row.quantity <= 20 &&
          !state.cart.some((r) => r.id === row.id)
        )
          state.cart.push({ id: row.id, quantity: row.quantity });
      });
    }
  }
} catch {
  /* Повреждённое или недоступное хранилище: начинаем с пустого состояния. */
}

function saveState() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    notify(
      "Хранилище недоступно. Выбор сохранится только до закрытия страницы.",
    );
  }
  updateCartCount();
}

function updateCartCount() {
  document.querySelectorAll("[data-cart-count]").forEach((node) => {
    node.textContent = state.cart.reduce((sum, row) => sum + row.quantity, 0);
  });
}

function totals() {
  const subtotal = state.cart.reduce(
    (sum, row) =>
      sum + products.find((p) => p.id === row.id).price * row.quantity,
    0,
  );
  const discount = state.promo ? Math.round(subtotal * 0.1) : 0;
  return { subtotal, discount, total: subtotal - discount };
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  if (!product?.isAvailable) return;
  const row = state.cart.find((r) => r.id === id);
  if (row && row.quantity >= 20) {
    notify("Максимум 20 единиц одной позиции.");
    return;
  }
  if (row) row.quantity++;
  else state.cart.push({ id, quantity: 1 });
  notify("Добавлено: " + product.title);
  saveState();
}

function renderCart() {
  const container = document.querySelector("#cart-items");
  if (!container) return;
  container.replaceChildren();
  if (!state.cart.length)
    container.append(
      element("p", "Корзина пуста. Выберите занятия в каталоге.", "aside-info"),
    );
  state.cart.forEach((row) => {
    const product = products.find((p) => p.id === row.id);
    const block = element("article", "", "cart-row");
    block.append(
      element("h2", product.title),
      element("p", formatPrice(product.price) + " за единицу"),
    );
    const label = element("label", "Количество ");
    const input = element("input");
    input.type = "number";
    input.min = "1";
    input.max = "20";
    input.value = row.quantity;
    input.setAttribute("aria-label", "Количество: " + product.title);
    input.addEventListener("change", () => {
      const value = Number(input.value);
      if (!Number.isInteger(value) || value < 1 || value > 20) {
        input.value = row.quantity;
        notify("Введите целое число от 1 до 20.");
        return;
      }
      row.quantity = value;
      saveState();
      renderCart();
    });
    label.append(input);
    const remove = element("button", "Удалить", "button button--secondary");
    remove.setAttribute("aria-label", "Удалить: " + product.title);
    remove.addEventListener("click", () => {
      state.cart = state.cart.filter((r) => r.id !== row.id);
      saveState();
      renderCart();
    });
    block.append(
      label,
      element("p", formatPrice(product.price * row.quantity)),
      remove,
    );
    container.append(block);
  });
  const sum = totals();
  document.querySelector("#cart-total").textContent =
    `Стоимость: ${formatPrice(sum.subtotal)}. Скидка: ${formatPrice(sum.discount)}. Итого: ${formatPrice(sum.total)}.`;
  document.querySelector("#checkout").hidden = !state.cart.length;
}
const promoForm = document.querySelector("#promo-form");
if (promoForm) {
  document.querySelector("#promo").value = state.promo ? "АККОРД10" : "";
  promoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const code = document.querySelector("#promo").value.trim().toUpperCase();
    state.promo = code === "АККОРД10";
    saveState();
    renderCart();
    document.querySelector("#promo-message").textContent = state.promo
      ? "Скидка 10% применена."
      : code
        ? "Промокод не найден. Скидка снята."
        : "Промокод очищен.";
  });
}
