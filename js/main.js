// Мобильное меню. Без JS навигация остаётся раскрытой.
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.getElementById("main-nav");
const desktopMenu = window.matchMedia("(min-width: 768px)");
function setMenu(open) {
  navigation.classList.toggle("site-nav--open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.textContent = open ? "Закрыть меню" : "Меню";
}
if (menuButton && navigation) {
  menuButton.hidden = false;
  navigation.classList.add("site-nav--enhanced");
  menuButton.addEventListener("click", () =>
    setMenu(menuButton.getAttribute("aria-expanded") !== "true"),
  );
  navigation.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !desktopMenu.matches) {
      setMenu(false);
      menuButton.focus();
    }
  });
  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a") && !desktopMenu.matches) setMenu(false);
  });
  desktopMenu.addEventListener("change", () => {
    if (!desktopMenu.matches && navigation.contains(document.activeElement))
      menuButton.focus();
    setMenu(false);
  });
}

updateCartCount();
renderCatalog();
renderCart();
const orderSummary = document.querySelector("#order-summary");
if (orderSummary) {
  if (!state.cart.length)
    orderSummary.textContent = "Корзина пуста. Добавьте занятия в каталоге.";
  else {
    state.cart.forEach((row) =>
      orderSummary.append(
        element(
          "p",
          products.find((p) => p.id === row.id).title + " × " + row.quantity,
        ),
      ),
    );
    orderSummary.append(
      element("strong", "К оплате: " + formatPrice(totals().total)),
    );
  }
}
