(function () {
    document.querySelectorAll(".gallery-carousel").forEach(function (carousel) {
        var slides = carousel.querySelectorAll(".gallery-slide");
        if (!slides.length) {
            return;
        }

        var current = 0;
        var timeout = 4000;

        slides[current].classList.add("is-active");

        if (slides.length === 1) {
            return;
        }

        window.setInterval(function () {
            slides[current].classList.remove("is-active");
            current = (current + 1) % slides.length;
            slides[current].classList.add("is-active");
        }, timeout);
    });
})();
