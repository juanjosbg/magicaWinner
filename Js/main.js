let currentPage = 0;
const concursantes = document.querySelectorAll('[id^="concursante"]');
const totalPages = concursantes.length;
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const paginationLinks = document.querySelectorAll('[id^="page"]');

// Elementos para mostrar el rango de resultados
const startSpan = document.getElementById('start');
const endSpan = document.getElementById('end');
const totalSpan = document.getElementById('total');

function showConcursante(index) {
    concursantes.forEach((concursante, i) => {
        concursante.style.display = i === index ? 'block' : 'none';
    });

    // Actualizar el hash en la URL
    if (concursantes[index]) {
        window.location.hash = concursantes[index].id;
    }
}

function updatePaginationText() {
    const itemsPerPage = 1;
    const start = currentPage * itemsPerPage + 1;
    const end = Math.min((currentPage + 1) * itemsPerPage, totalPages);
    
    // Actualizar el texto de "Showing"
    startSpan.textContent = start;
    endSpan.textContent = end;
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

    prevButton.classList.toggle('opacity-50', currentPage === 0);
    nextButton.classList.toggle('opacity-50', currentPage === totalPages - 1);
}

document.addEventListener('DOMContentLoaded', () => {
    handlePagination();

    paginationLinks.forEach((link, index) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            document.getElementById('loading').classList.remove('hidden');
            setTimeout(() => {
                currentPage = index;
                handlePagination();
                document.getElementById('loading').classList.add('hidden');
            }, 500);
        });
    });

    prevButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (currentPage > 0) {
            document.getElementById('loading').classList.remove('hidden');
            setTimeout(() => {
                currentPage--;
                handlePagination();
                document.getElementById('loading').classList.add('hidden');
            }, 500);
        }
    });

    nextButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (currentPage < totalPages - 1) {
            document.getElementById('loading').classList.remove('hidden');
            setTimeout(() => {
                currentPage++;
                handlePagination();
                document.getElementById('loading').classList.add('hidden');
            }, 500);
        }
    });

    // Manejo del hash de la URL al cargar la página
    const currentHash = window.location.hash.substring(1);
    if (currentHash) {
        const targetConcursante = document.getElementById(currentHash);
        if (targetConcursante) {
            const index = Array.from(concursantes).indexOf(targetConcursante);
            currentPage = index >= 0 ? index : 0; // Si el índice es válido, lo actualizamos
            handlePagination();
        }
    }
});
