document.addEventListener("DOMContentLoaded", () => {
    
    // 1. LÓGICA DEL CARRUSEL AUTOMÁTICO (HERO)
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".dot");
    const slideIntervalTime = 5000; 

    function showSlide(index) {
        if (index >= slides.length) currentSlideIndex = 0;
        if (index < 0) currentSlideIndex = slides.length - 1;

        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        slides[currentSlideIndex].classList.add("active");
        dots[currentSlideIndex].classList.add("active");
    }

    function nextSlide() {
        currentSlideIndex++;
        showSlide(currentSlideIndex);
    }

    window.currentSlide = (index) => {
        currentSlideIndex = index;
        showSlide(currentSlideIndex);
        resetTimer(); 
    };

    let slideTimer = setInterval(nextSlide, slideIntervalTime);

    function resetTimer() {
        clearInterval(slideTimer);
        slideTimer = setInterval(nextSlide, slideIntervalTime);
    }


    // 2. LÓGICA DEL CARRUSEL DEL PORTAFOLIO (DE A 2)
    const track = document.querySelector(".portfolio-track");
    const items = document.querySelectorAll(".portfolio-item-box");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    
    let portfolioIndex = 0;

    function getItemsPerView() {
        return window.innerWidth <= 900 ? 1 : 2;
    }

    function updatePortfolioSlider() {
        const itemsPerView = getItemsPerView();
        const maxIndex = items.length - itemsPerView;

        if (portfolioIndex > maxIndex) portfolioIndex = maxIndex;
        if (portfolioIndex < 0) portfolioIndex = 0;

        const itemWidth = items[0].getBoundingClientRect().width;
        const gap = 30;
        const amountToMove = portfolioIndex * (itemWidth + gap);

        track.style.transform = `translateX(-${amountToMove}px)`;
    }

    nextBtn.addEventListener("click", () => {
        const itemsPerView = getItemsPerView();
        if (portfolioIndex < items.length - itemsPerView) {
            portfolioIndex++;
            updatePortfolioSlider();
        } else {
            portfolioIndex = 0; 
            updatePortfolioSlider();
        }
    });

    prevBtn.addEventListener("click", () => {
        if (portfolioIndex > 0) {
            portfolioIndex--;
            updatePortfolioSlider();
        } else {
            const itemsPerView = getItemsPerView();
            portfolioIndex = items.length - itemsPerView; 
            updatePortfolioSlider();
        }
    });

    window.addEventListener("resize", updatePortfolioSlider);


    // 3. MARCAR SECCIÓN ACTIVA EN EL MENÚ AL SCROLLEAR
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 160) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });


    // 4. MODAL INTERACTIVO DE PORTAFOLIO (LIGHTBOX)
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeLightbox = document.querySelector(".close-lightbox");

    items.forEach((item) => {
        item.addEventListener("click", () => {
            const imgSrc = item.querySelector("img").src;
            const imgAlt = item.querySelector("img").alt;
            
            lightbox.style.display = "flex";
            lightboxImg.src = imgSrc;
            lightboxImg.alt = imgAlt;
        });
    });

    closeLightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target !== lightboxImg) {
            lightbox.style.display = "none";
        }
    });


    // 5. EVENTO DE ENVÍO DE FORMULARIO
    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value.trim();
        
        if (nombre) {
            alert(`¡Muchas gracias! Tu mensaje ha sido recibido con éxito en Lyn Studio, ${nombre}.`);
            contactForm.reset();
        }
    });
});