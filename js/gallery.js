(function () {
    document.querySelectorAll(".gallery-carousel").forEach(function (carousel) {
        var slides = carousel.querySelectorAll(".gallery-slide");
        if (slides.length <= 1) {
            return;
        }

        var current = 0;

        for (var i = 0; i < slides.length; i += 1) {
            slides[i].classList.toggle("is-active", i === current);
        }

        window.setInterval(function () {
            slides[current].classList.remove("is-active");
            current = (current + 1) % slides.length;
            slides[current].classList.add("is-active");
        }, 4000);
    });
})();
