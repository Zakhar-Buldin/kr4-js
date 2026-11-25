const requestForm = document.querySelector("#request-form");
if (requestForm) {
  const status = document.querySelector("#form-status");
  const fields = ["name", "email", "phone", "agreement"];
  function validate(id) {
    const input = document.getElementById(id);
    const value = input.value.trim();
    let error = "";
    if (id === "name" && value.length < 2)
      error = "Введите имя: минимум 2 символа.";
    if (id === "email" && (!value || !input.validity.valid))
      error = "Введите корректный e-mail.";
    if (
      id === "phone" &&
      (!/^[+\d\s()\-]+$/.test(value) ||
        value.replace(/\D/g, "").length < 10 ||
        value.replace(/\D/g, "").length > 15)
    )
      error = "Введите телефон: от 10 до 15 цифр.";
    if (id === "agreement" && !input.checked) error = "Подтвердите согласие.";
    document.getElementById(id + "-error").textContent = error;
    input.setAttribute("aria-invalid", String(Boolean(error)));
    return !error;
  }
  fields.forEach((id) =>
    document.getElementById(id).addEventListener("input", () => {
      validate(id);
      status.textContent = "";
    }),
  );
  requestForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const invalid = fields.filter((id) => !validate(id));
    if (invalid.length) {
      status.textContent = "Исправьте отмеченные поля.";
      document.getElementById(invalid[0]).focus();
      return;
    }
    if (document.querySelector("#order-summary") && !state.cart.length) {
      status.textContent = "Сначала добавьте занятия в корзину.";
      return;
    }
    const button = document.querySelector("#submit-request");
    button.disabled = true;
    status.textContent = "Подготавливаем заявку…";
    // Имитация запроса. Персональные данные не сохраняются и не отправляются.
    setTimeout(() => {
      status.textContent =
        "Заявка подготовлена! Это демонстрация: отправки на сервер не было.";
      requestForm.reset();
      fields.forEach((id) =>
        document.getElementById(id).removeAttribute("aria-invalid"),
      );
      button.disabled = false;
      status.focus();
    }, 600);
  });
}
