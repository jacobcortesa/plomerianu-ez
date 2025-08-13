(function () {
  document.addEventListener("DOMContentLoaded", () => {
    let chat = document.getElementById("chat");
    const wrapper = document.querySelector(".chat-wrapper");

    // Si no existe el contenedor de chat, crearlo
    if (!chat && wrapper) {
      chat = document.createElement("div");
      chat.id = "chat";
      chat.className = "chat-container";
      wrapper.insertBefore(chat, wrapper.firstChild);
    }

    const input = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");

    // Función para añadir mensajes al chat
    function appendMessage(text, sender) {
      if (!chat) return;
      const msg = document.createElement("div");
      msg.classList.add("message", sender);
      msg.innerHTML = text;
      chat.appendChild(msg);
      chat.scrollTop = chat.scrollHeight;
    }

    // Respuesta del bot
    function botReply(userText) {
      let reply = "";
      const lower = (userText || "").toLowerCase();

      if (lower.includes("servicio")) {
        reply =
          "🔧 Ofrecemos:<br>• Instalación de tuberías<br>• Reparación de fugas<br>• Mantenimiento de sistemas<br>• Desatascos<br>• Reformas de baño";
      } else if (lower.includes("precio")) {
        reply =
          "💰 Precios aproximados:<br>• Instalación: $120.000 COP<br>• Reparación: $80.000 COP<br>• Destape: $60.000 COP<br>• Reforma baño: $950.000 COP<br><small>*Valores de referencia. Se confirman en la visita.*</small>";
      } else if (
        lower.includes("ubicación") ||
        lower.includes("dónde están") ||
        lower.includes("donde estan")
      ) {
        reply =
          "📍 Estamos en Cra 27a #34-77, Barrio El Prado, Valledupar, Cesar.<br>" +
          "<a href='https://www.google.com/maps?q=Cra+27a+%2334-77,+Valledupar,+Cesar' target='_blank' rel='noopener'>🗺️ Ver en Google Maps</a>" +
          "<br><br><iframe src='https://www.google.com/maps?q=Cra+27a+%2334-77,+Valledupar,+Cesar&output=embed' width='100%' height='200' style='border:0;' allowfullscreen='' loading='lazy'></iframe>";
      } else if (
        lower.includes("contacto") ||
        lower.includes("whatsapp") ||
        lower.includes("teléfono") ||
        lower.includes("telefono")
      ) {
        reply =
          "📞 Llámanos: 316 000 0000<br>💬 WhatsApp: <a href='https://wa.me/573160000000' target='_blank' rel='noopener'>Click aquí para chatear</a>";
      } else if (lower.trim() === "") {
        reply = "Escribe tu consulta o usa los botones rápidos 👇";
      } else {
        reply =
          "🤖 Puedo ayudarte con <b>Servicios</b>, <b>Precios</b>, <b>Ubicación</b> y <b>Contacto</b>. Usa los botones de arriba 😄";
      }

      appendMessage(reply, "bot");
    }

    // Enviar mensaje
    function sendMessage() {
      if (!input) return;
      const text = input.value.trim();
      if (text) {
        appendMessage(text, "user");
        setTimeout(() => botReply(text), 350);
      }
      input.value = "";
      input.focus();
    }

    // Enviar respuesta rápida
    function sendQuickReply(text) {
      appendMessage(text, "user");
      setTimeout(() => botReply(text), 300);
    }

    // Listeners de botones y teclado
    if (sendBtn) sendBtn.addEventListener("click", sendMessage);
    if (input) {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          sendMessage();
        }
      });
    }

    // Mensaje de bienvenida
    appendMessage(
      "¡Hola! Soy el asistente de <b>Ferreservicios</b> 🙌<br> Pregúntame por <i>Servicios</i>, <i>Precios</i>, <i>Ubicación</i> o <i>Contacto</i>.",
      "bot"
    );

    // Exponer funciones globalmente
    window.sendMessage = sendMessage;
    window.sendQuickReply = sendQuickReply;
  });
})();
