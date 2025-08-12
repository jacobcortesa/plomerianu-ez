const chat = document.getElementById("chat");

function appendMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.innerHTML = text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (text) {
    appendMessage(text, "user");
    setTimeout(() => botReply(text), 500);
  }
  input.value = "";
}

function sendQuickReply(text) {
  appendMessage(text, "user");
  setTimeout(() => botReply(text), 500);
}

function botReply(userText) {
  let reply = "";
  userText = userText.toLowerCase();

  if (userText.includes("servicio")) {
    reply =
      "🔧 Ofrecemos:\n- Instalación de tuberías\n- Reparación de fugas\n- Mantenimiento de sistemas\n- Desatascos\n- Reformas de baño";
  } else if (userText.includes("precio")) {
    reply =
      "💰 Lista de precios aproximados:\n- Instalación de tubería: $120,000 COP\n- Reparación de fuga: $80,000 COP\n- Destape de cañería: $60,000 COP\n- Reforma completa de baño: $950,000 COP\n\n*Precios sujetos a cotización exacta.*";
  } else if (userText.includes("ubicación")) {
    reply = "📍 Estamos en Valledupar, Cesar. Aquí puedes vernos en el mapa:";
    appendMessage(reply, "bot");
    chat.innerHTML += `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!..."></iframe>`;
    return;
  } else if (userText.includes("contacto")) {
    reply =
      "📞 Puedes llamarnos al: 316 000 0000\n💬 O escríbenos por WhatsApp: https://wa.me/573160000000";
  } else {
    reply =
      "🤔 No entendí muy bien. Puedes seleccionar una opción rápida arriba.";
  }

  appendMessage(reply, "bot");
}
