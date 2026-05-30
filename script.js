/* =========================================
LOADER PREMIUM
========================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        const loader = document.getElementById("loader");

        if (loader) {

            loader.style.transition = "opacity 1s ease";
            loader.style.opacity = "0";

            setTimeout(() => {
                loader.remove();
            }, 1000);

        }

    }, 2500);

});

/* =========================================
SCROLL PROGRESS
========================================= */

window.addEventListener("scroll", () => {

    const totalHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        (window.scrollY / totalHeight) * 100;

    const bar =
        document.getElementById("scrollProgress");

    if (bar) {
        bar.style.width = progress + "%";
    }

});

/* =========================================
HEADER PREMIUM
========================================= */

window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if (!header) return;

    if (window.scrollY > 80) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});

/* =========================================
CURSOR NEON
========================================= */

const cursor = document.getElementById("cursor");

if (cursor) {

    document.addEventListener("mousemove", (e) => {

        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";

    });

}

/* =========================================
SPOTLIGHT
========================================= */

const spotlight =
    document.getElementById("spotlight");

if (spotlight) {

    document.addEventListener("mousemove", (e) => {

        spotlight.style.background = `
        radial-gradient(
            circle 250px at
            ${e.clientX}px
            ${e.clientY}px,
            rgba(123,63,255,.18),
            transparent 70%
        )`;

    });

}

/* =========================================
SEÇÃO ATIVA
========================================= */

const sections =
    document.querySelectorAll("section");

const navLinks =
    document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top =
            section.offsetTop - 180;

        if (window.scrollY >= top) {

            current =
                section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {
            link.classList.add("active");
        }

    });

});

/* =========================================
MENU MOBILE
========================================= */

const menuToggle =
    document.getElementById("menuToggle");

const nav =
    document.querySelector("nav");

if (menuToggle && nav) {

    menuToggle.addEventListener(
        "click",
        () => {
            nav.classList.toggle("open");
        }
    );

}

/* =========================================
FAVORITOS
========================================= */

let favoritos =
JSON.parse(
localStorage.getItem(
"stage_favoritos"
)
) || [];

function ativarFavoritos() {

    const cards =
        document.querySelectorAll(".produto-card");

    cards.forEach((card, index) => {

        if (
            card.querySelector(".favorite-btn")
        ) return;

        if (!produtos[index]) return;

        const id =
            produtos[index].id;

        const btn =
            document.createElement("button");

        btn.className =
            "favorite-btn";

        btn.innerHTML =
            favoritos.includes(id)
            ? "❤️"
            : "🤍";

        if (
            favoritos.includes(id)
        ) {
            btn.classList.add("active");
        }

        btn.onclick = (e) => {

            e.stopPropagation();

            if (
                favoritos.includes(id)
            ) {

                favoritos =
                favoritos.filter(
                    fav => fav !== id
                );

                btn.innerHTML = "🤍";
                btn.classList.remove("active");

            } else {

                favoritos.push(id);

                btn.innerHTML = "❤️";
                btn.classList.add("active");

            }

            localStorage.setItem(
                "stage_favoritos",
                JSON.stringify(favoritos)
            );

        };

        card.appendChild(btn);

    });

}

/* =========================================
BADGES
========================================= */

function adicionarBadges() {

    const cards =
        document.querySelectorAll(".produto-card");

    cards.forEach((card, index) => {

        if (index !== 0) return;

        if (card.querySelector(".badge"))
            return;

        const badge =
            document.createElement("div");

        badge.className = "badge";
        badge.innerText = "DESTAQUE";

        card.appendChild(badge);

    });

}

/* =========================================
ESTRELAS
========================================= */

function adicionarEstrelas() {

    document
    .querySelectorAll(".produto-card")
    .forEach(card => {

        if (
            card.querySelector(".rating")
        ) return;

        const rating =
            document.createElement("div");

        rating.className = "rating";
        rating.innerHTML = "★★★★★";

        card.appendChild(rating);

    });

}

/* =========================================
BUSCA PRODUTOS
========================================= */

const busca =
document.getElementById(
"buscaProduto"
);

if (busca) {

    busca.addEventListener(
        "input",
        function () {

            const termo =
            this.value.toLowerCase();

            const filtrados =
            produtos.filter(produto =>
                produto.nome
                .toLowerCase()
                .includes(termo)
                ||
                produto.marca
                .toLowerCase()
                .includes(termo)
            );

            renderizarProdutos(
                filtrados
            );

            setTimeout(() => {

                ativarFavoritos();
                adicionarBadges();
                adicionarEstrelas();

            }, 50);

        }
    );

}

/* =========================================
CONTADORES
========================================= */

function animarNumero(
    elemento,
    final,
    sufixo = ""
) {

    let atual = 0;

    const incremento =
        final / 60;

    const timer =
        setInterval(() => {

            atual += incremento;

            if (atual >= final) {

                atual = final;
                clearInterval(timer);

            }

            elemento.innerHTML =
                Math.floor(atual)
                + sufixo;

        }, 25);

}

const contadorObserver =
new IntersectionObserver(
(entries) => {

    entries.forEach(entry => {

        if (
            !entry.isIntersecting
        ) return;

        const h2 =
            entry.target.querySelector("h2");

        if (!h2) return;

        if (
            h2.dataset.animado
        ) return;

        h2.dataset.animado = true;

        const texto =
            h2.innerText;

        if (texto.includes("300")) {
            animarNumero(h2,300,"+");
        }

        if (texto.includes("24")) {
            animarNumero(h2,24,"h");
        }

        if (texto.includes("100")) {
            animarNumero(h2,100,"%");
        }

    });

});

document
.querySelectorAll(".stat-box")
.forEach(box => {

    contadorObserver.observe(box);

});

/* =========================================
LIGHTBOX
========================================= */

function ativarGaleria() {

    const lightbox =
    document.getElementById(
    "lightbox"
    );

    const lightboxImg =
    document.getElementById(
    "lightboxImg"
    );

    if (!lightbox || !lightboxImg)
        return;

    document
    .querySelectorAll(".gallery-item")
    .forEach(img => {

        img.addEventListener(
        "click",
        () => {

            lightbox.style.display =
            "flex";

            lightboxImg.src =
            img.src;

        });

    });

}

const closeLightbox =
document.getElementById(
"closeLightbox"
);

if (closeLightbox) {

    closeLightbox.onclick = () => {

        document.getElementById(
        "lightbox"
        ).style.display = "none";

    };

}

/* =========================================
SLIDER DEPOIMENTOS
========================================= */

function iniciarSlider() {

    const slider =
    document.querySelector(
    ".depoimentos-slider"
    );

    if (!slider) return;

    let pos = 0;

    setInterval(() => {

        pos += 380;

        if (
        pos >= slider.scrollWidth
        ) {
            pos = 0;
        }

        slider.scrollTo({
            left: pos,
            behavior: "smooth"
        });

    }, 3500);

}

/* =========================================
PARALLAX PREMIUM
========================================= */

document.addEventListener(
"mousemove",
(e) => {

    const carro =
    document.querySelector(
    ".hero-car img"
    );

    if (!carro) return;

    const x =
    (
        e.clientX /
        window.innerWidth - 0.5
    ) * 30;

    const y =
    (
        e.clientY /
        window.innerHeight - 0.5
    ) * 20;

    carro.style.transform =
    `translate(${x}px,${y}px)
    rotateY(${x/5}deg)`;

});

/* =========================================
INICIALIZAÇÃO
========================================= */

window.addEventListener("load", () => {

    ativarFavoritos();
    adicionarBadges();
    adicionarEstrelas();
    ativarGaleria();
    iniciarSlider();

    document
    .querySelectorAll("img")
    .forEach(img => {
        img.loading = "lazy";
    });

});