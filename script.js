document.addEventListener("DOMContentLoaded", function() {
    // ==================== MENÚ HAMBURGUESA MEJORADO ====================
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    
    if (menuToggle && navLinks) {
        const overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);

        function toggleMenu() {
            menuToggle.classList.toggle("active");
            navLinks.classList.toggle("active");
            overlay.classList.toggle("active");
            document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "auto";
        }

        menuToggle.addEventListener("click", function(e) {
            e.stopPropagation();
            toggleMenu();
        });

        overlay.addEventListener("click", toggleMenu);

        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", function() {
                if (window.innerWidth <= 768) toggleMenu();
            });
        });

        window.addEventListener("resize", function() {
            if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
                toggleMenu();
            }
        });
    }

    // ==================== LÓGICA DE COTIZACIÓN (PARA PÁGINA COTIZACION.HTML) ====================
    const serviciosData = [
        {
            id: 1,
            nombre: "Reparación de Fugas",
            descripcion: "Detección y reparación de fugas de agua en tuberías, baños, etc.",
            precio: 200000
        },
        {
            id: 2,
            nombre: "Instalación de Grifos",
            descripcion: "Instalación profesional de grifos en cocinas, baños y fregaderos.",
            precio: 140000
        },
        {
            id: 3,
            nombre: "Instalación de Radiadores",
            descripcion: "Montaje, conexión y puesta en marcha de radiadores de calefacción.",
            precio: 360000
        },
        {
            id: 4,
            nombre: "Desatascos Urgentes",
            descripcion: "Servicio rápido para desatascar tuberías, desagües, inodoros y fregaderos.",
            precio: 240000
        },
        {
            id: 5,
            nombre: "Reparación de Cisternas",
            descripcion: "Reparación o sustitución de mecanismos de cisternas de WC que pierden agua.",
            precio: 160000
        },
        {
            id: 6,
            nombre: "Instalación de Calentadores",
            descripcion: "Montaje e instalación de calentadores de gas o eléctricos, incluyendo conexiones.",
            precio: 480000
        }
    ];

    // Solo ejecuta la lógica de cotización si estamos en la página correspondiente
    const listaServicios = document.getElementById("lista-servicios");
    if (listaServicios) {
        const serviciosSeleccionadosList = document.getElementById("servicios-seleccionados");
        const totalCotizacion = document.getElementById("total-cotizacion");
        const botonWhatsapp = document.getElementById("boton-whatsapp");
        const numeroCotizacionInput = document.getElementById("numero-cotizacion");

        let serviciosSeleccionados = [];
        let total = 0;

        // Generar número de cotización automático
        function generarNumeroCotizacion() {
            const ahora = new Date();
            return `COT-${ahora.getFullYear()}${(ahora.getMonth()+1).toString().padStart(2,'0')}${ahora.getDate().toString().padStart(2,'0')}-${Math.floor(Math.random()*1000).toString().padStart(3,'0')}`;
        }

        // Mostrar servicios disponibles
        function mostrarServicios() {
            serviciosData.forEach(servicio => {
                const item = document.createElement("div");
                item.className = "servicio-item";
                item.innerHTML = `
                    <input type="checkbox" id="servicio-${servicio.id}" class="servicio-checkbox" data-id="${servicio.id}">
                    <label for="servicio-${servicio.id}">
                        <strong>${servicio.nombre}</strong>
                        <p>${servicio.descripcion}</p>
                        <span class="precio">${servicio.precio.toLocaleString('es-CO', {style:'currency', currency:'COP'})}</span>
                    </label>
                `;
                listaServicios.appendChild(item);
            });

            // Eventos para checkboxes
            document.querySelectorAll('.servicio-checkbox').forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    const servicioId = parseInt(this.getAttribute('data-id'));
                    const servicio = serviciosData.find(s => s.id === servicioId);
                    
                    if (this.checked) {
                        serviciosSeleccionados.push(servicio);
                        total += servicio.precio;
                    } else {
                        serviciosSeleccionados = serviciosSeleccionados.filter(s => s.id !== servicioId);
                        total -= servicio.precio;
                    }
                    
                    actualizarResumen();
                });
            });
        }

        // Actualizar resumen
        function actualizarResumen() {
            serviciosSeleccionadosList.innerHTML = '';
            
            if (serviciosSeleccionados.length === 0) {
                serviciosSeleccionadosList.innerHTML = '<li>No hay servicios seleccionados</li>';
            } else {
                serviciosSeleccionados.forEach(servicio => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <span>${servicio.nombre}</span>
                        <span>${servicio.precio.toLocaleString('es-CO', {style:'currency', currency:'COP'})}</span>
                    `;
                    serviciosSeleccionadosList.appendChild(li);
                });
            }
            
            totalCotizacion.textContent = total.toLocaleString('es-CO', {style:'currency', currency:'COP'});
        }

        // Enviar por WhatsApp
        function enviarPorWhatsapp() {
            const nombre = document.getElementById('nombre-cliente').value || 'Cliente';
            const fecha = document.getElementById('fecha-cotizacion').value || new Date().toLocaleDateString();
            const numero = numeroCotizacionInput.value;
            
            let mensaje = `*Cotización de Servicios - Señor Jhon*\n\n`;
            mensaje += `*Cliente:* ${nombre}\n`;
            mensaje += `*Fecha:* ${fecha}\n`;
            mensaje += `*N° Cotización:* ${numero}\n\n`;
            mensaje += `*Servicios solicitados:*\n`;
            
            if (serviciosSeleccionados.length === 0) {
                mensaje += `No se han seleccionado servicios\n`;
            } else {
                serviciosSeleccionados.forEach(servicio => {
                    mensaje += `- ${servicio.nombre}: ${servicio.precio.toLocaleString('es-CO', {style:'currency', currency:'COP'})}\n`;
                });
            }
            
            mensaje += `\n*TOTAL:* ${total.toLocaleString('es-CO', {style:'currency', currency:'COP'})}\n\n`;
            mensaje += `¿Podría confirmar disponibilidad para realizar estos servicios?`;
            
            const url = `https://wa.me/573123456789?text=${encodeURIComponent(mensaje)}`;
            window.open(url, '_blank');
        }

        // Inicialización de la cotización
        numeroCotizacionInput.value = generarNumeroCotizacion();
        document.getElementById('fecha-cotizacion').valueAsDate = new Date();
        mostrarServicios();
        actualizarResumen();
        
        botonWhatsapp.addEventListener('click', function(e) {
            e.preventDefault();
            enviarPorWhatsapp();
        });
    }

    // ==================== OTRAS FUNCIONALIDADES PARA OTRAS PÁGINAS ====================
    // Aquí puedes agregar más lógica específica para otras páginas
    // Por ejemplo:
    // if (document.getElementById('galeria')) { ... }
    // if (document.getElementById('contacto-form')) { ... }
});