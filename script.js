document.addEventListener("DOMContentLoaded", function () {
  // =============================================
  // 1. LÓGICA DE COTIZACIÓN (SOLO EN PÁGINA "COTIZACIÓN")
  // =============================================
  const serviciosData = [
    {
      id: 1,
      nombre: "Reparación de Fugas",
      descripcion: "Detección y reparación de fugas de agua en tuberías, baños, etc.",
      precio: 200000,
    },
    {
      id: 2,
      nombre: "Instalación de Grifos",
      descripcion: "Instalación profesional de grifos en cocinas, baños y fregaderos.",
      precio: 140000,
    },
    {
      id: 3,
      nombre: "Instalación de Radiadores",
      descripcion: "Montaje, conexión y puesta en marcha de radiadores de calefacción.",
      precio: 360000,
    },
    {
      id: 4,
      nombre: "Desatascos Urgentes",
      descripcion: "Servicio rápido para desatascar tuberías, desagües, inodoros y fregaderos.",
      precio: 240000,
    },
    {
      id: 5,
      nombre: "Reparación de Cisternas",
      descripcion: "Reparación o sustitución de mecanismos de cisternas de WC que pierden agua.",
      precio: 160000,
    },
    {
      id: 6,
      nombre: "Instalación de Calentadores",
      descripcion: "Montaje e instalación de calentadores de gas o eléctricos, incluyendo conexiones.",
      precio: 480000,
    }
  ];

  // Elementos de la cotización (solo si estamos en la página correcta)
  const serviciosLista = document.getElementById("servicios-lista");
  if (serviciosLista) {
    let serviciosSeleccionadosArray = [];
    let total = 0;

    // Mostrar servicios disponibles
    serviciosData.forEach((servicio) => {
      const servicioItem = document.createElement("div");
      servicioItem.classList.add("servicio-item");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `servicio-${servicio.id}`;
      checkbox.value = servicio.id;

      const label = document.createElement("label");
      label.htmlFor = `servicio-${servicio.id}`;
      label.innerHTML = `
        <strong>${servicio.nombre}</strong><br>
        <small>${servicio.descripcion}</small><br>
        <span class="precio">${servicio.precio.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
        })}</span>
      `;

      servicioItem.appendChild(checkbox);
      servicioItem.appendChild(label);
      serviciosLista.appendChild(servicioItem);

      // Evento para seleccionar/deseleccionar servicios
      checkbox.addEventListener("change", function () {
        if (this.checked) {
          serviciosSeleccionadosArray.push(servicio);
          total += servicio.precio;
        } else {
          serviciosSeleccionadosArray = serviciosSeleccionadosArray.filter((s) => s.id !== servicio.id);
          total -= servicio.precio;
        }
        actualizarResumen();
      });
    });

    // Actualizar resumen de la cotización
    function actualizarResumen() {
      const serviciosSeleccionados = document.getElementById("servicios-seleccionados");
      const totalPrecio = document.getElementById("total-precio");

      if (serviciosSeleccionados && totalPrecio) {
        serviciosSeleccionados.innerHTML = "";
        serviciosSeleccionadosArray.forEach((servicio) => {
          const li = document.createElement("li");
          li.innerHTML = `
            <span>${servicio.nombre}</span>
            <span>${servicio.precio.toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0,
            })}</span>
          `;
          serviciosSeleccionados.appendChild(li);
        });

        totalPrecio.textContent = total.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
        });
      }
    }

    // Botón de WhatsApp para enviar cotización
    const whatsappCotizacionBtn = document.getElementById("whatsapp-cotizacion");
    if (whatsappCotizacionBtn) {
      whatsappCotizacionBtn.addEventListener("click", function (e) {
        e.preventDefault();
        const nombre = document.getElementById("nombre")?.value || "Cliente";
        const fecha = document.getElementById("fecha")?.value || new Date().toLocaleDateString();
        const numeroCotizacion = document.getElementById("numeroCotizacion")?.value || "N/A";

        let mensaje = `¡Hola! Soy ${nombre} y necesito una cotización:\n\n` +
                     `📅 Fecha: ${fecha}\n` +
                     `📋 N°: ${numeroCotizacion}\n\n` +
                     `🔧 Servicios solicitados:\n${serviciosSeleccionadosArray.map(s => 
                       `- ${s.nombre} (${s.precio.toLocaleString("es-CO", {style: "currency", currency: "COP"})`
                     ).join("\n")}\n\n` +
                     `💰 Total: ${total.toLocaleString("es-CO", {style: "currency", currency: "COP"})}\n\n` +
                     `📍 Ubicación: [Indique su dirección]`;

        window.open(`https://wa.me/573123456789?text=${encodeURIComponent(mensaje)}`, "_blank");
      });
    }
  }

  // =============================================
  // 2. LÓGICA DEL MENÚ HAMBURGUESA (PARA TODAS LAS PÁGINAS)
  // =============================================
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      // Alternar clases "active" para animación
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
      
      // Bloquear scroll del body cuando el menú está abierto
      document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "auto";
    });

    // Cerrar menú al hacer clic en enlaces (solo en móvil)
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          menuToggle.classList.remove("active");
          navLinks.classList.remove("active");
          document.body.style.overflow = "auto";
        }
      });
    });

    // Cerrar menú al hacer clic fuera (solo en móvil)
    document.addEventListener("click", (e) => {
      if (window.innerWidth <= 768 && 
          !e.target.closest(".nav-links") && 
          !e.target.closest(".menu-toggle") &&
          navLinks.classList.contains("active")) {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  }
});