document.addEventListener("DOMContentLoaded", function () {
  // --- Lógica de la Cotización ---
  const serviciosData = [
    {
      id: 1,
      nombre: "Reparación de Fugas",
      descripcion:
        "Detección y reparación de fugas de agua en tuberías, baños, etc.",
      precio: 200000,
    },
    {
      id: 2,
      nombre: "Instalación de Grifos",
      descripcion:
        "Instalación profesional de grifos en cocinas, baños y fregaderos.",
      precio: 140000,
    },
    {
      id: 3,
      nombre: "Instalación de Radiadores",
      descripcion:
        "Montaje, conexión y puesta en marcha de radiadores de calefacción.",
      precio: 360000,
    },
    {
      id: 4,
      nombre: "Desatascos Urgentes",
      descripcion:
        "Servicio rápido para desatascar tuberías, desagües, inodoros y fregaderos.",
      precio: 240000,
    },
    {
      id: 5,
      nombre: "Reparación de Cisternas",
      descripcion:
        "Reparación o sustitución de mecanismos de cisternas de WC que pierden agua.",
      precio: 160000,
    },
    {
      id: 6,
      nombre: "Instalación de Calentadores",
      descripcion:
        "Montaje e instalación de calentadores de gas o eléctricos, incluyendo conexiones.",
      precio: 480000,
    },
  ];

  const serviciosLista = document.getElementById("servicios-lista");
  const serviciosSeleccionados = document.getElementById(
    "servicios-seleccionados"
  );
  const totalPrecio = document.getElementById("total-precio");
  const nombreInput = document.getElementById("nombre");
  const fechaInput = document.getElementById("fecha");
  const numeroCotizacionInput = document.getElementById("numeroCotizacion");
  const whatsappCotizacionBtn = document.getElementById("whatsapp-cotizacion");

  let serviciosSeleccionadosArray = [];
  let total = 0;

  function mostrarServicios() {
    if (serviciosLista) {
      serviciosData.forEach((servicio) => {
        const servicioItem = document.createElement("div");
        servicioItem.classList.add("servicio-item");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `servicio-${servicio.id}`;
        checkbox.value = servicio.id;

        const label = document.createElement("label");
        label.htmlFor = `servicio-${servicio.id}`;
        label.textContent = `${
          servicio.nombre
        } - ${servicio.precio.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
        })}`;

        servicioItem.appendChild(checkbox);
        servicioItem.appendChild(label);
        serviciosLista.appendChild(servicioItem);

        checkbox.addEventListener("change", function () {
          if (this.checked) {
            serviciosSeleccionadosArray.push(servicio);
            total += servicio.precio;
          } else {
            serviciosSeleccionadosArray = serviciosSeleccionadosArray.filter(
              (s) => s.id !== servicio.id
            );
            total -= servicio.precio;
          }
          actualizarResumen();
        });
      });
    }
  }

  function actualizarResumen() {
    if (serviciosSeleccionados && totalPrecio) {
      serviciosSeleccionados.innerHTML = "";
      serviciosSeleccionadosArray.forEach((servicio) => {
        const li = document.createElement("li");
        li.textContent = `${servicio.nombre} - ${servicio.precio.toLocaleString(
          "es-CO",
          {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
          }
        )}`;
        serviciosSeleccionados.appendChild(li);
      });

      totalPrecio.textContent = total.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
      });
    }
  }

  function generarMensajeWhatsApp() {
    const nombre = nombreInput ? nombreInput.value : "Cliente";
    const fecha = fechaInput
      ? fechaInput.value
      : new Date().toLocaleDateString();
    const numeroCotizacion = numeroCotizacionInput
      ? numeroCotizacionInput.value
      : "N/A";

    let mensaje = `¡Hola Jacob!\n\nSoy ${nombre} y me interesa la siguiente cotización:\n`;
    mensaje += `Fecha: ${fecha}\n`;
    mensaje += `Número de Cotización: ${numeroCotizacion}\n\n`;

    if (serviciosSeleccionadosArray.length === 0) {
      mensaje += "No se han seleccionado servicios.\n";
    } else {
      serviciosSeleccionadosArray.forEach((servicio) => {
        mensaje += `- ${servicio.nombre} - ${servicio.precio.toLocaleString(
          "es-CO",
          {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
          }
        )}\n`;
      });
      mensaje += `\nTotal: ${total.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
      })}\n`;
    }

    mensaje += `\n¡Espero su respuesta!`;

    const url = `https://api.whatsapp.com/send?phone=+573123456789&text=${encodeURIComponent(
      mensaje
    )}`;
    window.open(url, "_blank");
  }

  if (whatsappCotizacionBtn) {
    whatsappCotizacionBtn.addEventListener("click", function (e) {
      e.preventDefault();
      generarMensajeWhatsApp();
    });
  }

  mostrarServicios();

  // --- Lógica del Botón de Hamburguesa ---
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const body = document.body;

  function toggleMenu() {
    if (menuToggle && navLinks) {
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
    }

    if (navLinks && navLinks.classList.contains("active")) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleMenu();
    });
  }

  if (navLinks) {
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", function () {
        if (window.innerWidth <= 768) {
          toggleMenu();
        }
      });
    });

    document.addEventListener("click", function (e) {
      if (
        window.innerWidth <= 768 &&
        navLinks.classList.contains("active") &&
        !e.target.closest(".nav-links") &&
        !e.target.closest(".menu-toggle")
      ) {
        toggleMenu();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
        toggleMenu();
      }
    });
  }
});
