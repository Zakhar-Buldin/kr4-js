const dialog = document.querySelector('#course-dialog');
let opener;
let selectedId;
function openProduct(product, button) {
  opener = button; selectedId = product.id;
  document.querySelector('#dialog-title').textContent = product.title;
  document.querySelector('#dialog-description').textContent = product.description;
  document.querySelector('#dialog-price').textContent = formatPrice(product.price);
  document.querySelector('#dialog-add').disabled = !product.isAvailable;
  dialog.showModal(); document.querySelector('#dialog-close').focus();
}
document.querySelector('#dialog-close')?.addEventListener('click', () => dialog.close());
document.querySelector('#dialog-add')?.addEventListener('click', () => { addToCart(selectedId); dialog.close(); });
dialog?.addEventListener('close', () => opener?.focus());
dialog?.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const buttons = dialog.querySelectorAll('button:not(:disabled)');
  const first = buttons[0], last = buttons[buttons.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
