function createCard(product) {
  const card = element("article", "", "product-card");
  const image = element("img");
  image.src = product.image;
  image.alt = product.title;
  image.loading = "lazy";
  image.className = "product-card__image";
  image.width = 720;
  image.height = 540;
  image.srcset = `images/${product.category}-360.webp 360w, images/${product.category}-720.webp 720w`;
  image.sizes = "(min-width: 1100px) 310px, (min-width: 640px) 42vw, 85vw";
  const link = element("a", product.title);
  link.href = "product.html?id=" + product.id;
  const title = element("h2", "", "product-card__title");
  title.append(link);
  card.append(
    image,
    title,
    element("p", product.description),
    element("p", formatPrice(product.price), "product-card__price"),
    element(
      "p",
      product.isAvailable ? "Запись открыта" : "Мест пока нет",
      "badge",
    ),
  );
  const actions = element("div", "", "card-actions");
  const add = element("button", "В корзину", "button button--primary");
  add.disabled = !product.isAvailable;
  add.dataset.id = product.id;
  add.addEventListener("click", () => addToCart(Number(add.dataset.id)));
  const favorite = element(
    "button",
    state.favorites.includes(product.id) ? "В избранном" : "В избранное",
    "button button--secondary",
  );
  favorite.setAttribute(
    "aria-pressed",
    String(state.favorites.includes(product.id)),
  );
  favorite.addEventListener("click", () => {
    state.favorites = state.favorites.includes(product.id)
      ? state.favorites.filter((id) => id !== product.id)
      : [...state.favorites, product.id];
    saveState();
    favorite.textContent = state.favorites.includes(product.id)
      ? "В избранном"
      : "В избранное";
    favorite.setAttribute(
      "aria-pressed",
      String(state.favorites.includes(product.id)),
    );
    if (document.querySelector("#favorites-only")?.checked) renderCatalog();
  });
  const preview = element(
    "button",
    "Быстрый просмотр",
    "button button--secondary",
  );
  preview.addEventListener("click", () => openProduct(product, preview));
  actions.append(add, favorite, preview);
  card.append(actions);
  return card;
}
const controls = document.querySelector("#catalog-controls");
function renderCatalog() {
  if (!controls) return;
  const query = document
    .querySelector("#search")
    .value.trim()
    .toLocaleLowerCase("ru");
  const category = document.querySelector("#category").value;
  let result = products.filter(
    (p) =>
      p.title.toLocaleLowerCase("ru").includes(query) &&
      (category === "all" || p.category === category) &&
      (!document.querySelector("#available").checked || p.isAvailable) &&
      (!document.querySelector("#favorites-only").checked ||
        state.favorites.includes(p.id)),
  );
  const sort = document.querySelector("#sort").value;
  result = [...result]; // sort меняет массив: исходные данные сохраняем.
  if (sort === "asc") result.sort((a, b) => a.price - b.price);
  if (sort === "desc") result.sort((a, b) => b.price - a.price);
  if (sort === "title")
    result.sort((a, b) => a.title.localeCompare(b.title, "ru"));
  document.querySelector("#catalog").replaceChildren(...result.map(createCard));
  document.querySelector("#empty").hidden = result.length > 0;
  const average = result.length
    ? result.reduce((sum, p) => sum + p.price, 0) / result.length
    : 0;
  document.querySelector("#catalog-summary").textContent =
    `Найдено: ${result.length}. Средняя цена: ${formatPrice(average)}.`;
}
if (controls) {
  controls.addEventListener("submit", (event) => event.preventDefault());
  controls.addEventListener("input", renderCatalog);
  controls.addEventListener("change", renderCatalog);
  controls.addEventListener("reset", () => setTimeout(renderCatalog, 0));
  document.querySelector("#reset-empty").addEventListener("click", () => {
    controls.reset();
    document.querySelector("#search").focus();
  });
}
const featured = document.querySelector("#featured");
if (featured)
  featured.append(...products.filter((p) => p.lessons === 1).map(createCard));
const view = document.querySelector("#product-view");
if (view) {
  const id = Number(new URLSearchParams(location.search).get("id") || 1);
  const product = products.find((p) => p.id === id);
  if (product) view.append(createCard(product));
  else {
    const link = element("a", "Вернуться к каталогу");
    link.href = "catalog.html";
    view.append(element("p", "Занятие не найдено."), link);
  }
}
