
/* =========================================
LOADER
========================================= */

window.addEventListener("load", () => {
    setTimeout(() => {
        const loader = document.getElementById("loader");
        if (loader) loader.style.display = "none";
    }, 2500);
});

/* =========================================
HEADER SCROLL
========================================= */

window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 80) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

    // scroll progress bar
    const scrollProgress = document.getElementById("scrollProgress");
    if (scrollProgress) {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = progress + "%";
    }
});

/* =========================================
CURSOR PREMIUM
========================================= */

const cursor = document.getElementById("cursor");

if (cursor) {
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });
}

/* =========================================
SPOTLIGHT EFFECT
========================================= */

document.addEventListener("mousemove", (e) => {
    const spotlight = document.getElementById("spotlight");
    if (!spotlight) return;

    spotlight.style.setProperty("--x", e.clientX + "px");
    spotlight.style.setProperty("--y", e.clientY + "px");
});

/* =========================================
CARRINHO
========================================= */

let carrinho = [];

function abrirCarrinho() {
    document.getElementById("modalCarrinho").style.display = "flex";
    renderCarrinho();
}

function fecharCarrinho() {
    document.getElementById("modalCarrinho").style.display = "none";
}

function adicionarCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    atualizarBadge();
    renderCarrinho();
}

function atualizarBadge() {
    const badge = document.getElementById("carrinho-badge");
    if (badge) badge.innerText = carrinho.length;
}

function renderCarrinho() {
    const container = document.getElementById("itens-carrinho");
    const totalEl = document.getElementById("total-carrinho");

    if (!container || !totalEl) return;

    container.innerHTML = "";

    let total = 0;

    carrinho.forEach((item, index) => {
        total += item.preco;

        const div = document.createElement("div");
        div.style.display = "flex";
        div.style.justifyContent = "space-between";
        div.style.marginBottom = "10px";

        div.innerHTML = `
            <span>${item.nome}</span>
            <span>R$ ${item.preco.toFixed(2)}</span>
        `;

        container.appendChild(div);
    });

    totalEl.innerText = total.toFixed(2);
}

function limparCarrinho() {
    carrinho = [];
    atualizarBadge();
    renderCarrinho();
}

/* =========================================
FINALIZAR PEDIDO WHATSAPP
========================================= */

function finalizarPedido() {
    if (carrinho.length === 0) return;

    let msg = "Olá! Gostaria de comprar:%0A";

    carrinho.forEach(item => {
        msg += `- ${item.nome} (R$ ${item.preco.toFixed(2)})%0A`;
    });

    const url = `https://wa.me/5544997087954?text=${msg}`;
    window.open(url, "_blank");
}

/* =========================================
PRODUTOS (DEMO)
========================================= */

const produtos = [
    { nome: "Óleo Premium 5W30", preco: 89.90, categoria: "oleo" },
    { nome: "Filtro de Ar Esportivo", preco: 120.00, categoria: "acessorio" },
    { nome: "Pneu Performance", preco: 450.00, categoria: "pneu" },
    { nome: "Bateria Bosch", preco: 380.00, categoria: "bateria" }
];

function renderProdutos(lista = produtos) {
    const grid = document.getElementById("produtos-grid");
    if (!grid) return;

    grid.innerHTML = "";

    lista.forEach(p => {
        const card = document.createElement("div");
        card.className = "produto-card";

        card.innerHTML = `
            <h3>${p.nome}</h3>
            <p>R$ ${p.preco.toFixed(2)}</p>
            <button onclick="adicionarCarrinho('${p.nome}', ${p.preco})">
                Adicionar
            </button>
        `;

        grid.appendChild(card);
    });
}

renderProdutos();

/* =========================================
FILTRO DE PRODUTOS
========================================= */

function filtrarProdutos(categoria, btn) {
    const botoes = document.querySelectorAll(".categoria-btn");
    botoes.forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

    if (categoria === "todos") {
        renderProdutos(produtos);
    } else {
        const filtrados = produtos.filter(p => p.categoria === categoria);
        renderProdutos(filtrados);
    }
}

/* =========================================
BUSCA DE PRODUTOS
========================================= */

const busca = document.getElementById("buscaProduto");

if (busca) {
    busca.addEventListener("input", (e) => {
        const valor = e.target.value.toLowerCase();

        const filtrados = produtos.filter(p =>
            p.nome.toLowerCase().includes(valor)
        );

        renderProdutos(filtrados);
    });
}

/* =========================================
MODAL ORÇAMENTO
========================================= */

function abrirOrcamento() {
    document.getElementById("modalOrcamento").style.display = "flex";
}

function fecharOrcamento() {
    document.getElementById("modalOrcamento").style.display = "none";
}

function enviarOrcamento() {
    const marca = document.getElementById("marca").value;
    const servico = document.getElementById("servico").value;

    const msg = `Orçamento:%0AMarca: ${marca}%0AServiço: ${servico}`;

    window.open(`https://wa.me/5544997087954?text=${msg}`, "_blank");
}

/* =========================================
LIGHTBOX GALERIA
========================================= */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

document.querySelectorAll(".gallery-item").forEach(img => {
    img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
    });
});

document.getElementById("closeLightbox").addEventListener("click", () => {
    lightbox.style.display = "none";
});

/* =========================================
WHATSAPP POPUP AUTO
========================================= */

setTimeout(() => {
    const popup = document.getElementById("whatsPopup");
    if (popup) popup.style.display = "block";
}, 4000);

/* =========================================
MENU MOBILE (BÁSICO)
========================================= */

const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector("nav");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        if (nav.style.display === "flex") {
            nav.style.display = "none";
        } else {
            nav.style.display = "flex";
            nav.style.flexDirection = "column";
            nav.style.position = "absolute";
            nav.style.top = "80px";
            nav.style.right = "20px";
            nav.style.background = "rgba(0,0,0,.9)";
            nav.style.padding = "20px";
            nav.style.borderRadius = "12px";
        }
    });
}