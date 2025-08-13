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
  const lower = userText.toLowerCase();

  if (lower.includes("servicio")) {
    reply =
      "🔧 Ofrecemos:<br>- Instalación de tuberías<br>- Reparación de fugas<br>- Mantenimiento de sistemas<br>- Desatascos<br>- Reformas de baño";
  } else if (lower.includes("precio")) {
    reply =
      "💰 Lista de precios aproximados:<br>- Instalación: $120,000 COP<br>- Reparación: $80,000 COP<br>- Destape: $60,000 COP<br>- Reforma baño: $950,000 COP<br><small>*Precios sujetos a cotización exacta.*</small>";
  } else if (lower.includes("ubicación")) {
    reply = "📍 Estamos en Valledupar, Cesar.";
    appendMessage(reply, "bot");
    appendMessage(
      `<iframe src="https://www.google.com/maps/embed?pb=!1m18..." width="100%" height="150" style="border:0;" loading="lazy"></iframe>`,
      "bot"
    );
    return;
  } else if (lower.includes("contacto")) {
    reply =
      "📞 Llámanos al: 316 000 0000<br>💬 WhatsApp: <a href='https://wa.me/573160000000' target='_blank'>Click aquí</a>";
  } else {
    reply = "🤔 No entendí. Usa los botones rápidos arriba para más opciones.";
  }

  appendMessage(reply, "bot");
}
