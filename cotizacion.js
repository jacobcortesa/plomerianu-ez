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

  // Renderizar servicios
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

    // WhatsApp message
    let mensaje = `Hola, quiero cotizar los siguientes servicios:\n`;
    seleccionados.forEach((s) => {
      mensaje += `- ${s.emoji} ${s.nombre}: ${s.precio.toLocaleString(
        "es-CO"
      )} COP\n`;
    });
    mensaje += `\nTotal: ${total.toLocaleString("es-CO")} COP`;

    whatsappBtn.href = `https://wa.me/573123456789?text=${encodeURIComponent(
      mensaje
    )}`;
  }
});
