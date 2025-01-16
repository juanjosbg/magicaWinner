document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".carousel-slide");
    const images = document.querySelectorAll(".picts");
    let index = 0;

    function moveSlider() {
        index = (index + 1) % images.length;
        slider.style.transform = `translateX(-${index * 100}%)`;
    }

    setInterval(moveSlider, 3000);
});