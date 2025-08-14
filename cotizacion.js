document.addEventListener("DOMContentLoaded", () => {
  // ==================== MENÚ HAMBURGUESA ====================
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", function () {
        if (window.innerWidth <= 768) {
          menuToggle.classList.remove("active");
          navLinks.classList.remove("active");
        }
      });

      const currentPage = location.pathname.split("/").pop();
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
      }
    });
  }

  // ==================== COTIZACIÓN ====================
  const servicios = [
    { nombre: "Reparación de Fugas", precio: 200000, emoji: "💧" },
    { nombre: "Instalación de Grifos", precio: 140000, emoji: "🚰" },
    { nombre: "Instalación de Radiadores", precio: 360000, emoji: "🔥" },
    { nombre: "Desatascos Urgentes", precio: 240000, emoji: "🛠️" },
    { nombre: "Reparación de Cisternas", precio: 160000, emoji: "🚽" },
    { nombre: "Instalación de Calentadores", precio: 480000, emoji: "♨️" },
  ];

  const contenedorServicios = document.getElementById("servicios-lista");
  const serviciosSeleccionados = document.getElementById(
    "servicios-seleccionados"
  );
  const totalPrecio = document.getElementById("total-precio");
  const whatsappBtn = document.getElementById("whatsapp-cotizacion");

  // Campos de datos del cliente
  const nombreInput = document.getElementById("nombre");
  const fechaInput = document.getElementById("fecha");
  const numeroCotizacionInput = document.getElementById("numeroCotizacion");

  // Renderizar lista de servicios
  servicios.forEach((servicio, index) => {
    const div = document.createElement("div");
    div.classList.add("servicio-item");
    div.innerHTML = `
      <input type="checkbox" id="servicio${index}" value="${
      servicio.precio
    }" data-nombre="${servicio.nombre}" data-emoji="${servicio.emoji}">
      <label for="servicio${index}">${servicio.emoji} ${servicio.nombre} -
        <span class="price">${servicio.precio.toLocaleString(
          "es-CO"
        )} COP</span>
      </label>
    `;
    contenedorServicios.appendChild(div);
  });

  // Escuchar cambios
  contenedorServicios.addEventListener("change", actualizarResumen);

  function actualizarResumen() {
    const checkboxes = contenedorServicios.querySelectorAll(
      "input[type='checkbox']"
    );
    serviciosSeleccionados.innerHTML = "";
    let total = 0;
    let seleccionados = [];

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const nombre = checkbox.dataset.nombre;
        const emoji = checkbox.dataset.emoji;
        const precio = parseInt(checkbox.value);
        total += precio;
        seleccionados.push({ nombre, precio, emoji });

        const li = document.createElement("li");
        li.innerHTML = `${emoji} ${nombre} -
          <span class="price">${precio.toLocaleString("es-CO")} COP</span>`;
        serviciosSeleccionados.appendChild(li);
      }
    });

    totalPrecio.textContent = `${total.toLocaleString("es-CO")} COP`;

    // Validar que haya nombre y fecha antes de armar el mensaje
    whatsappBtn.onclick = (e) => {
      e.preventDefault();

      const nombreCliente = nombreInput.value.trim();
      const fechaCotizacion = fechaInput.value;
      const numeroCotizacion = numeroCotizacionInput.value;

      if (!nombreCliente || !fechaCotizacion) {
        alert("Por favor ingresa tu nombre y la fecha antes de continuar.");
        return;
      }

      if (seleccionados.length === 0) {
        alert("Debes seleccionar al menos un servicio.");
        return;
      }

      // Crear mensaje para WhatsApp
      let mensaje = `📋 *Cotización de Servicios*\n`;
      mensaje += `👤 Nombre: ${nombreCliente}\n`;
      mensaje += `📅 Fecha: ${fechaCotizacion}\n`;
      mensaje += `📝 Nº Cotización: ${numeroCotizacion}\n\n`;

      mensaje += `🔧 *Servicios Solicitados:*\n`;
      seleccionados.forEach((s) => {
        mensaje += `- ${s.emoji} ${s.nombre}: ${s.precio.toLocaleString(
          "es-CO"
        )} COP\n`;
      });

      mensaje += `\n💵 *Total:* ${total.toLocaleString("es-CO")} COP\n`;
      mensaje += `\nGracias por elegirnos. ✅`;

      // Redirigir a WhatsApp
      window.open(
        `https://wa.me/573167351176?text=${encodeURIComponent(mensaje)}`,
        "_blank"
      );
    };
  }
});
