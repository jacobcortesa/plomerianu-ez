document.addEventListener("DOMContentLoaded", function () {
  // Datos de los servicios (puedes obtenerlos de un archivo JSON o una API)
  const serviciosData = [
    {
      id: 1,
      nombre: "Reparación de Fugas",
      descripcion:
        "Detección y reparación de fugas de agua en tuberías, baños, etc.",
      precio: 200000, // Precio en COP
    },
    {
      id: 2,
      nombre: "Instalación de Grifos",
      descripcion:
        "Instalación profesional de grifos en cocinas, baños y fregaderos.",
      precio: 140000, // Precio en COP
    },
    {
      id: 3,
      nombre: "Instalación de Radiadores",
      descripcion:
        "Montaje, conexión y puesta en marcha de radiadores de calefacción.",
      precio: 360000, // Precio en COP
    },
    {
      id: 4,
      nombre: "Desatascos Urgentes",
      descripcion:
        "Servicio rápido para desatascar tuberías, desagües, inodoros y fregaderos.",
      precio: 240000, // Precio en COP
    },
    {
      id: 5,
      nombre: "Reparación de Cisternas",
      descripcion:
        "Reparación o sustitución de mecanismos de cisternas de WC que pierden agua.",
      precio: 160000, // Precio en COP
    },
    {
      id: 6,
      nombre: "Instalación de Calentadores",
      descripcion:
        "Montaje e instalación de calentadores de gas o eléctricos, incluyendo conexiones.",
      precio: 480000, // Precio en COP
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

  // Función para mostrar los servicios en la lista
  function mostrarServicios() {
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

  // Función para actualizar el resumen de la cotización
  function actualizarResumen() {
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

  // Función para generar el mensaje de WhatsApp
  function generarMensajeWhatsApp() {
    const nombre = nombreInput.value || "Cliente";
    const fecha = fechaInput.value || new Date().toLocaleDateString();
    const numeroCotizacion = numeroCotizacionInput.value || "N/A";

    let mensaje = `¡Hola Jacob!\n\nSoy ${nombre} y me interesa la siguiente cotización:\n`;
    mensaje += `Fecha: ${fecha}\n`;
    mensaje += `Número de Cotización: ${numeroCotizacion}\n\n`;

    if (serviciosSeleccionadosArray.length === 0) {
      mensaje += "No se han seleccionado servicios.\n";
    } else {
      serviciosSeleccionadosArray.forEach((servicio) => {
        mensaje += `- ${servicio.nombre} - ${servicio.precio} €\n`;
      });
      mensaje += `\nTotal: ${total.toFixed(2)} €\n`;
    }

    mensaje += `\n¡Espero su respuesta!`;

    const url = `https://codigotvjvs.com/text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  }

  // Evento para el botón de WhatsApp
  whatsappCotizacionBtn.addEventListener("click", function (e) {
    e.preventDefault();
    generarMensajeWhatsApp();
  });

  // Mostrar los servicios al cargar la página
  mostrarServicios();
});


//aqui es ml mas nuevo//
// Control del menú hamburguesa
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace (solo en móvil)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if(window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Marcar página activa
    const currentPage = location.pathname.split('/').pop();
    document.querySelectorAll('.nav-links a').forEach(link => {
        if(link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});