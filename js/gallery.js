(function () {
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.querySelectorAll(".gallery-carousel").forEach(function (carousel) {
        var slides = carousel.querySelectorAll(".gallery-slide");
        if (slides.length <= 1) {
            return;
        }

        var current = 0;
        var timer = null;

        function show(index) {
            index = (index + slides.length) % slides.length;
            slides[current].classList.remove("is-active");
            dots[current].classList.remove("is-active");
            dots[current].setAttribute("aria-current", "false");
            slides[index].classList.add("is-active");
            dots[index].classList.add("is-active");
            dots[index].setAttribute("aria-current", "true");
            current = index;
        }

        function next() { show(current + 1); }
        function prev() { show(current - 1); }

        function start() {
            if (reduceMotion || timer) { return; }
            timer = window.setInterval(next, 4000);
        }
        function stop() {
            if (timer) { window.clearInterval(timer); timer = null; }
        }
        function restart() { stop(); start(); }

        var dotsWrap = document.createElement("div");
        dotsWrap.className = "gallery-dots";
        dotsWrap.setAttribute("role", "tablist");
        dotsWrap.setAttribute("aria-label", "Choose slide");

        var dots = [];
        for (var i = 0; i < slides.length; i += 1) {
            (function (index) {
                var dot = document.createElement("button");
                dot.type = "button";
                dot.className = "gallery-dot" + (index === 0 ? " is-active" : "");
                dot.setAttribute("aria-label", "Go to slide " + (index + 1));
                dot.addEventListener("click", function () { show(index); restart(); });
                dotsWrap.appendChild(dot);
                dots.push(dot);
            })(i);
        }

        var prevBtn = document.createElement("button");
        prevBtn.type = "button";
        prevBtn.className = "gallery-btn gallery-prev";
        prevBtn.setAttribute("aria-label", "Previous slide");
        prevBtn.innerHTML = "\u2039";
        prevBtn.addEventListener("click", function () { prev(); restart(); });

        var nextBtn = document.createElement("button");
        nextBtn.type = "button";
        nextBtn.className = "gallery-btn gallery-next";
        nextBtn.setAttribute("aria-label", "Next slide");
        nextBtn.innerHTML = "\u203a";
        nextBtn.addEventListener("click", function () { next(); restart(); });

        carousel.appendChild(prevBtn);
        carousel.appendChild(nextBtn);
        carousel.appendChild(dotsWrap);

        carousel.addEventListener("mouseenter", stop);
        carousel.addEventListener("mouseleave", start);
        carousel.addEventListener("focusin", stop);
        carousel.addEventListener("focusout", start);

        for (var s = 0; s < slides.length; s += 1) {
            slides[s].classList.toggle("is-active", s === current);
        }

        start();
    });
})();
