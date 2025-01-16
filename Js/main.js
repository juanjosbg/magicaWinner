let currentPage = 0;
const concursantes = document.querySelectorAll('[id^="concursante"]');
const totalPages = concursantes.length;
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const paginationLinks = document.querySelectorAll('[id^="page"]');

function showConcursante(index) {
    concursantes.forEach((concursante, i) => {
        concursante.style.display = i === index ? 'block' : 'none';
    });
}

function handlePagination() {
    showConcursante(currentPage);
    
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
});
