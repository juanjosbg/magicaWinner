let currentPage = 0;
const concursantes = document.querySelectorAll('.concursante');
const totalPages = concursantes.length;
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const paginationLinks = document.querySelectorAll('[id^="page"]');

const startSpan = document.getElementById('start');
const endSpan = document.getElementById('end');
const totalSpan = document.getElementById('total');

function showConcursante(index) {
    concursantes.forEach((concursante, i) => {
        concursante.classList.toggle('hidden', i !== index);
    });

    // Actualizar el hash en la URL
    if (concursantes[index]) {
        window.location.hash = concursantes[index].id;
    }

    // Iniciar carrusel para el concursante actual
    iniciarCarrusel(concursantes[index].querySelector('.carousel-slide'));
}

function updatePaginationText() {
    startSpan.textContent = currentPage + 1;
    endSpan.textContent = totalPages;
    totalSpan.textContent = totalPages;
}

function handlePagination() {
    showConcursante(currentPage);
    updatePaginationText();

    paginationLinks.forEach((link, index) => {
        link.classList.toggle('bg-indigo-600', index === currentPage);
        link.classList.toggle('text-white', index === currentPage);
    });

    updateButtons();
}

function updateButtons() {
    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === totalPages - 1;
}

function iniciarCarrusel(slider) {
    let index = 0;
    const images = slider.children;
    const totalImages = images.length;

    function moveSlider() {
        index = (index + 1) % totalImages;
        slider.style.transform = `translateX(-${index * 100}%)`;
    }

    clearInterval(slider.dataset.interval); // Detener carrusel anterior
    slider.dataset.interval = setInterval(moveSlider, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
    handlePagination();

    paginationLinks.forEach((link, index) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            currentPage = index;
            handlePagination();
        });
    });

    prevButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (currentPage > 0) {
            currentPage--;
            handlePagination();
        }
    });

    nextButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (currentPage < totalPages - 1) {
            currentPage++;
            handlePagination();
        }
    });

    // Detectar hash en la URL al cargar
    const currentHash = window.location.hash.substring(1);
    if (currentHash) {
        const targetConcursante = document.getElementById(currentHash);
        if (targetConcursante) {
            const index = Array.from(concursantes).indexOf(targetConcursante);
            currentPage = index >= 0 ? index : 0;
            handlePagination();
        }
    }
});
