// Obtener los elementos
const activador = document.getElementById('activador');
const backdrop = document.getElementById('backdrop');
const slidePanel = document.getElementById('slide-over-panel');
const closeButton = document.getElementById('close-slide-over');

// Mostrar el panel y el fondo cuando se haga clic en la imagen
activador.addEventListener('click', function () {
    // Mostrar el panel
    slidePanel.classList.remove('hidden');
    slidePanel.classList.add('show');
    
    // Mostrar el fondo
    backdrop.classList.remove('hidden');
    backdrop.classList.add('show');
});

// Cerrar el panel y el fondo cuando se haga clic en el botón de cierre
closeButton.addEventListener('click', function () {
    // Ocultar el panel
    slidePanel.classList.remove('show');
    slidePanel.classList.add('hidden');
    
    // Ocultar el fondo
    backdrop.classList.remove('show');
    backdrop.classList.add('hidden');
});
