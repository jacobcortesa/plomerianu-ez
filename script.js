document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const navbarLinks = document.querySelector('.navbar-links');
    
    // Crear overlay
    const overlay = document.createElement('div');
    overlay.className = 'navbar-overlay';
    document.body.appendChild(overlay);
    
    // Función para alternar el menú
    function toggleMenu() {
        hamburgerBtn.classList.toggle('active');
        navbarLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Bloquear/desbloquear scroll del body
        document.body.style.overflow = navbarLinks.classList.contains('active') ? 'hidden' : 'auto';
    }
    
    // Eventos
    hamburgerBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    
    // Cerrar menú al hacer clic en un enlace (en móviles)
    document.querySelectorAll('.navbar-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });
    
    // Cerrar menú al redimensionar la pantalla
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navbarLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});