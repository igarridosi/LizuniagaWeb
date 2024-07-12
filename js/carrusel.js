document.addEventListener("DOMContentLoaded", function() {
    const carruseles = document.querySelectorAll(".carrusel");

    carruseles.forEach(carrusel => {
        const carruselItems = carrusel.querySelector(".carrusel-items");
        const prevBtn = carrusel.querySelector(".prev");
        const nextBtn = carrusel.querySelector(".next");

        let currentIndex = 0;
        const totalItems = carruselItems.children.length;
        const itemsPerPage = 3; // Número de imágenes por página

        function goToSlide(index) {
            if (index < 0) {
                index = totalItems - itemsPerPage;
            } else if (index >= totalItems - itemsPerPage + 1) {
                index = 0;
            }

            currentIndex = index;
            const offset = -currentIndex * (100 / itemsPerPage);
            carruselItems.style.transform = `translateX(${offset}%)`;
        }

        prevBtn.addEventListener("click", () => {
            goToSlide(currentIndex - itemsPerPage);
        });

        nextBtn.addEventListener("click", () => {
            goToSlide(currentIndex + itemsPerPage);
        });

        // Asegurar que las imágenes estén cargadas antes de activar el carrusel
        const images = carruselItems.querySelectorAll("img");
        let imagesLoaded = 0;

        images.forEach(img => {
            if (img.complete) {
                imagesLoaded++;
            } else {
                img.addEventListener("load", () => {
                    imagesLoaded++;
                    if (imagesLoaded === images.length) {
                        // Aquí puedes activar el carrusel o cualquier otra funcionalidad
                    }
                });
            }
        });
    });
});
