/* =========================================
LOADER PREMIUM
========================================= */

window.addEventListener('load', () => {

setTimeout(() => {

const loader =
document.getElementById('loader');

if(loader){

loader.style.opacity = '0';

setTimeout(() => {

loader.remove();

},1000);

}

},3000);

});

/* =========================================
SCROLL PROGRESS
========================================= */

window.addEventListener('scroll', () => {

const totalHeight =
document.documentElement.scrollHeight -
window.innerHeight;

const progress =
(window.scrollY / totalHeight) * 100;

const progressBar =
document.getElementById('scrollProgress');

if(progressBar){

progressBar.style.width =
progress + '%';

}

});

/* =========================================
HEADER INTELIGENTE
========================================= */

window.addEventListener('scroll', () => {

const header =
document.querySelector('header');

if(!header) return;

if(window.scrollY > 80){

header.classList.add('scrolled');

}else{

header.classList.remove('scrolled');

}

});

/* =========================================
MENU MOBILE
========================================= */

const menuToggle =
document.getElementById('menuToggle');

const navMenu =
document.querySelector('nav');

if(menuToggle && navMenu){

menuToggle.addEventListener(
'click',
() => {

navMenu.classList.toggle('open');

}
);

}

/* =========================================
CURSOR NEON
========================================= */

const cursor =
document.getElementById('cursor');

document.addEventListener(
'mousemove',
(e)=>{

if(cursor){

cursor.style.left =
e.clientX + 'px';

cursor.style.top =
e.clientY + 'px';

}

}
);

/* =========================================
SPOTLIGHT
========================================= */

const spotlight =
document.getElementById('spotlight');

document.addEventListener(
'mousemove',
(e)=>{

if(spotlight){

spotlight.style.background =
`
radial-gradient(
circle 250px at
${e.clientX}px
${e.clientY}px,
rgba(123,63,255,.18),
transparent 70%
)
`;

}

}
);

/* =========================================
SEÇÃO ATIVA
========================================= */

const sections =
document.querySelectorAll('section');

const navLinks =
document.querySelectorAll('nav a');

window.addEventListener(
'scroll',
()=>{

let current = '';

sections.forEach(section => {

const sectionTop =
section.offsetTop - 180;

if(window.scrollY >= sectionTop){

current =
section.getAttribute('id');

}

});

navLinks.forEach(link => {

link.classList.remove('active');

if(
link.getAttribute('href')
=== '#' + current
){

link.classList.add('active');

}

});

}
);

/* =========================================
SCROLL SUAVE
========================================= */

document.querySelectorAll(
'nav a'
).forEach(link => {

link.addEventListener(
'click',
function(e){

const href =
this.getAttribute('href');

if(href.startsWith('#')){

e.preventDefault();

const target =
document.querySelector(href);

if(target){

target.scrollIntoView({

behavior:'smooth'

});

}

}

}
);

});

/* =========================================
ANIMAÇÃO MENU MOBILE
========================================= */

document.querySelectorAll(
'nav a'
).forEach(link=>{

link.addEventListener(
'click',
()=>{

if(navMenu){

navMenu.classList.remove('open');

}

}
);

});
/* =========================================
BUSCA EM TEMPO REAL
========================================= */

const buscaInput =
document.getElementById('buscaProduto');

if(buscaInput){

buscaInput.addEventListener(
'input',
function(){

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

ativarFavoritos();

ativarHover3D();

}
);

}

/* =========================================
FAVORITOS
========================================= */

let favoritos =
JSON.parse(
localStorage.getItem(
'stage_favoritos'
)
) || [];

/* =========================================
RENDER FAVORITOS
========================================= */

function ativarFavoritos(){

document
.querySelectorAll(
'.produto-card'
)
.forEach((card,index)=>{

if(
card.querySelector(
'.favorite-btn'
)
) return;

const produto =
document.querySelectorAll(
'.produto-card'
)[index];

if(!produto) return;

const id =
produtos[index]
? produtos[index].id
: null;

if(!id) return;

const fav =
document.createElement(
'button'
);

fav.className =
'favorite-btn';

fav.innerHTML =
favoritos.includes(id)
? '❤️'
: '🤍';

if(
favoritos.includes(id)
){

fav.classList.add(
'active'
);

}

fav.addEventListener(
'click',
(e)=>{

e.stopPropagation();

if(
favoritos.includes(id)
){

favoritos =
favoritos.filter(
f => f !== id
);

fav.innerHTML =
'🤍';

fav.classList.remove(
'active'
);

}else{

favoritos.push(id);

fav.innerHTML =
'❤️';

fav.classList.add(
'active'
);

}

localStorage.setItem(
'stage_favoritos',
JSON.stringify(
favoritos
)
);

}
);

card.appendChild(fav);

});

}

/* =========================================
BADGE PROMOÇÃO
========================================= */

function adicionarBadges(){

document
.querySelectorAll(
'.produto-card'
)
.forEach((card,index)=>{

if(index === 0){

if(
!card.querySelector(
'.badge'
)
){

const badge =
document.createElement(
'div'
);

badge.className =
'badge';

badge.innerText =
'DESTAQUE';

card.appendChild(
badge
);

}

}

});

}

/* =========================================
AVALIAÇÃO ESTRELAS
========================================= */

function adicionarEstrelas(){

document
.querySelectorAll(
'.produto-card'
)
.forEach(card => {

if(
card.querySelector(
'.rating'
)
) return;

const rating =
document.createElement(
'div'
);

rating.className =
'rating';

rating.innerHTML =
'★★★★★';

card.appendChild(
rating
);

});

}

/* =========================================
HOVER PREMIUM
========================================= */

function ativarHover3D(){

document
.querySelectorAll(
'.produto-card, .servico-card'
)
.forEach(card => {

card.addEventListener(
'mousemove',
e => {

const rect =
card.getBoundingClientRect();

const x =
e.clientX - rect.left;

const y =
e.clientY - rect.top;

card.style.setProperty(
'--x',
x + 'px'
);

card.style.setProperty(
'--y',
y + 'px'
);

const rotateY =
((x / rect.width)
- 0.5)
* 16;

const rotateX =
((y / rect.height)
- 0.5)
* -16;

card.style.transform =
`
perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-8px)
`;

}
);

card.addEventListener(
'mouseleave',
()=>{

card.style.transform =
'';

}
);

});

}

/* =========================================
ANIMAÇÃO CARRINHO
========================================= */

const adicionarOriginal =
adicionarCarrinho;

adicionarCarrinho =
function(id){

adicionarOriginal(id);

const badge =
document.getElementById(
'carrinho-badge'
);

if(badge){

badge.animate([

{
transform:'scale(1)'
},

{
transform:'scale(1.4)'
},

{
transform:'scale(1)'
}

],{

duration:400

});

}

};

/* =========================================
INICIALIZAÇÃO
========================================= */

setTimeout(()=>{

ativarFavoritos();

adicionarBadges();

adicionarEstrelas();

ativarHover3D();

},500);
/* =========================================
LIGHTBOX GALERIA
========================================= */

const lightbox =
document.getElementById(
'lightbox'
);

const lightboxImg =
document.getElementById(
'lightboxImg'
);

const closeLightbox =
document.getElementById(
'closeLightbox'
);

function ativarGaleria(){

document
.querySelectorAll(
'.gallery-item'
)
.forEach(img => {

img.addEventListener(
'click',
()=>{

if(
lightbox &&
lightboxImg
){

lightbox.style.display =
'flex';

lightboxImg.src =
img.src;

}

}
);

});

}

if(closeLightbox){

closeLightbox.addEventListener(
'click',
()=>{

lightbox.style.display =
'none';

}
);

}

if(lightbox){

lightbox.addEventListener(
'click',
e=>{

if(e.target === lightbox){

lightbox.style.display =
'none';

}

}
);

}

/* =========================================
SLIDER DEPOIMENTOS
========================================= */

function iniciarSlider(){

const slider =
document.querySelector(
'.depoimentos-slider'
);

if(!slider) return;

let scrollPos = 0;

setInterval(()=>{

scrollPos += 380;

if(
scrollPos >=
slider.scrollWidth
){

scrollPos = 0;

}

slider.scrollTo({

left:scrollPos,

behavior:'smooth'

});

},3500);

}

/* =========================================
CONTADORES ANIMADOS
========================================= */

function animarContador(

elemento,
final,
sufixo=''

){

let atual = 0;

const incremento =
final / 60;

const timer =
setInterval(()=>{

atual += incremento;

if(atual >= final){

atual = final;

clearInterval(timer);

}

elemento.innerHTML =
Math.floor(atual)
+
sufixo;

},25);

}

const contadorObserver =
new IntersectionObserver(
entries=>{

entries.forEach(entry=>{

if(
entry.isIntersecting
){

const h2 =
entry.target.querySelector(
'h2'
);

if(!h2) return;

if(
h2.dataset.animado
)
return;

h2.dataset.animado =
'true';

const texto =
h2.innerText;

if(
texto.includes('300')
){

animarContador(
h2,
300,
'+'
);

}

if(
texto.includes('24')
){

animarContador(
h2,
24,
'h'
);

}

if(
texto.includes('100')
){

animarContador(
h2,
100,
'%'
);

}

}

});

});

document
.querySelectorAll(
'.stat-box'
)
.forEach(box=>{

contadorObserver.observe(
box
);

});

/* =========================================
WHATS POPUP
========================================= */

setTimeout(()=>{

const popup =
document.getElementById(
'whatsPopup'
);

if(popup){

popup.style.opacity =
'1';

popup.style.transform =
'translateY(0)';

}

},5000);

/* =========================================
SCROLL REVEAL PREMIUM
========================================= */

const revealObserver =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(
entry.isIntersecting
){

entry.target.animate([

{
opacity:0,
transform:
'translateY(60px) scale(.95)'
},

{
opacity:1,
transform:
'translateY(0) scale(1)'
}

],{

duration:1000,
fill:'forwards'

});

}

});

},

{
threshold:.15
}

);

document
.querySelectorAll(

'section,' +
'.produto-card,' +
'.servico-card,' +
'.contato-card,' +
'.depoimento-card,' +
'.marca'

)

.forEach(el=>{

revealObserver.observe(
el
);

});

/* =========================================
FLOATING ELEMENTS
========================================= */

for(

let i=0;
i<12;
i++

){

const glow =
document.createElement(
'div'
);

glow.className =
'floating-glow';

glow.style.left =
Math.random()*100 + '%';

glow.style.top =
Math.random()*100 + '%';

glow.style.width =
50 + Math.random()*150 + 'px';

glow.style.height =
glow.style.width;

glow.style.position =
'fixed';

glow.style.borderRadius =
'50%';

glow.style.pointerEvents =
'none';

glow.style.zIndex =
'-2';

glow.style.filter =
'blur(60px)';

glow.style.background =
'rgba(123,63,255,.08)';

glow.style.animation =
`floatGlow ${
8 + Math.random()*10
}s infinite alternate`;

document.body.appendChild(
glow
);

}

/* =========================================
KEYFRAMES DINÂMICO
========================================= */

const style =
document.createElement(
'style'
);

style.innerHTML =

`
@keyframes floatGlow{

0%{

transform:
translateY(0)
translateX(0);

}

100%{

transform:
translateY(-80px)
translateX(40px);

}

}
`;

document.head.appendChild(
style
);

/* =========================================
PARALLAX AVANÇADO
========================================= */

document.addEventListener(
'mousemove',
e=>{

const hero =
document.querySelector(
'.hero-car img'
);

if(!hero) return;

const x =
(
e.clientX /
window.innerWidth
- .5
) * 35;

const y =
(
e.clientY /
window.innerHeight
- .5
) * 35;

hero.style.transform =
`
translate(
${x}px,
${y}px
)
rotateY(
${x/5}deg
)
`;

}
);

/* =========================================
LAZY LOADING IMAGENS
========================================= */

document
.querySelectorAll('img')
.forEach(img=>{

img.loading =
'lazy';

});

/* =========================================
INICIALIZAÇÃO FINAL
========================================= */

window.addEventListener(
'load',
()=>{

ativarGaleria();

iniciarSlider();

}
);