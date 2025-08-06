// Referencias
const checkboxes = document.querySelectorAll(
  '.services input[type="checkbox"]'
);
const totalEl = document.getElementById("total");
const btnQuote = document.getElementById("quote");
const btnCall = document.getElementById("call");
const btnWhatsapp = document.getElementById("whatsapp");
const btnReset = document.getElementById("reset");

// Formatear número a COP
function formatCOP(num) {
  return num.toLocaleString("es-CO", { style: "currency", currency: "COP" });
}

// Recalcular total
function updateTotal() {
  let sum = 0;
  checkboxes.forEach((cb) => {
    if (cb.checked) sum += parseInt(cb.dataset.price, 10);
  });
  totalEl.textContent = formatCOP(sum);
}

// Eventos en checkboxes
checkboxes.forEach((cb) => cb.addEventListener("change", updateTotal));

// Solicitar cotización (alert)
btnQuote.addEventListener("click", () => {
  const selected = Array.from(checkboxes)
    .filter((cb) => cb.checked)
    .map((cb) => `- ${cb.value} (${formatCOP(+cb.dataset.price)})`);
  if (!selected.length) {
    alert("Selecciona al menos un servicio.");
    return;
  }
  alert(`Servicios:\n${selected.join("\n")}\n\nTotal: ${totalEl.textContent}`);
});

// Llamar a Señor Jhon
btnCall.addEventListener("click", () => {
  window.location.href = "tel:+573001234567";
});

// Enviar WhatsApp
btnWhatsapp.addEventListener("click", () => {
  const selected = Array.from(checkboxes)
    .filter((cb) => cb.checked)
    .map((cb) => `- ${cb.value} (${formatCOP(+cb.dataset.price)})`)
    .join("\n");
  const text = selected
    ? `Hola Señor Jhon, quisiera cotizar:\n${selected}\nTotal: ${totalEl.textContent}`
    : "Hola Señor Jhon, estoy interesado en una cotización.";
  const url = `https://wa.me/573001234567?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
});

// Limpiar selección
btnReset.addEventListener("click", () => {
  checkboxes.forEach((cb) => (cb.checked = false));
  updateTotal();
});
