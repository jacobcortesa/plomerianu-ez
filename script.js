document.addEventListener("DOMContentLoaded", function() {
  // ============= MENÚ HAMBURGUESA MEJORADO =============
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  
  if (menuToggle && navLinks) {
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    // Función mejorada para toggle del menú
    function toggleMenu() {
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
      overlay.classList.toggle("active");
      
      if (navLinks.classList.contains("active")) {
        document.body.classList.add("menu-open");
        // Deshabilitar scroll cuando el menú está abierto
        document.body.style.overflow = "hidden";
      } else {
        document.body.classList.remove("menu-open");
        // Restaurar scroll cuando el menú está cerrado
        document.body.style.overflow = "auto";
      }
    }

    // Evento de click mejorado
    menuToggle.addEventListener("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
      
      // Efecto de retroalimentación táctil
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 100);
    });

    // Cerrar menú al hacer click en el overlay
    overlay.addEventListener("click", function() {
      toggleMenu();
    });

    // Cerrar menú al seleccionar un enlace (mobile)
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", function(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          toggleMenu();
          
          // Navegar después de la animación
          setTimeout(() => {
            window.location.href = this.href;
          }, 400);
        }
      });
    });

    // Cerrar menú al redimensionar la pantalla
    let resizeTimer;
    window.addEventListener("resize", function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
          toggleMenu();
        }
      }, 250);
    });

    // Cerrar menú al hacer scroll (opcional)
    window.addEventListener("scroll", function() {
      if (navLinks.classList.contains("active")) {
        toggleMenu();
      }
    });
  }

  // ============= ANIMACIONES PARA SERVICIOS =============
  const serviceItems = document.querySelectorAll('.service-item');
  
  function checkServiceItems() {
    serviceItems.forEach((item, index) => {
      const itemTop = item.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (itemTop < windowHeight * 0.85) {
        item.style.transitionDelay = `${index * 0.1}s`;
        item.classList.add('visible');
      }
    });
  }
  
  // Ejecutar al cargar y al hacer scroll
  window.addEventListener('load', checkServiceItems);
  window.addEventListener('scroll', checkServiceItems);
  
  // Mejorar el rendimiento del scroll
  let ticking = false