// slider__banner .............................
var silde1 = document.getElementById('silder__banner');
var btnBanner1 = document.getElementById('btn__baner1');
var btnBanner2 = document.getElementById('btn__baner2');
var btnBanner3 = document.getElementById('btn__baner3');
btnBanner1.onclick = function () {
    silde1.style.transform = 'translateX(0%)';
    btnBanner1.classList.add("active");
    btnBanner2.classList.remove("active");
    btnBanner3.classList.remove("active");
}
btnBanner2.onclick = function () {
    silde1.style.transform = 'translateX(-100%)';
    btnBanner1.classList.remove("active");
    btnBanner2.classList.add("active");
    btnBanner3.classList.remove("active");
}
btnBanner3.onclick = function () {
    silde1.style.transform = 'translateX(-200%)';
    btnBanner1.classList.remove("active");
    btnBanner2.classList.remove("active");
    btnBanner3.classList.add("active");
}
// end silder__banner ................................
// slider__custumer ...................................
var silde2 = document.getElementById('silder__custumer');
var btnCustumer1 = document.getElementById('btn__custumer1');
var btnCustumer2 = document.getElementById('btn__custumer2');
var btnCustumer3 = document.getElementById('btn__custumer3');
btnCustumer1.onclick = function () {
    silde2.style.transform = 'translateX(0%)';
    btnCustumer1.classList.add("active");
    btnCustumer2.classList.remove("active");
    btnCustumer3.classList.remove("active");
}
btnCustumer2.onclick = function () {
    silde2.style.transform = 'translateX(-100%)';
    btnCustumer1.classList.remove("active");
    btnCustumer2.classList.add("active");
    btnCustumer3.classList.remove("active");
}
btnCustumer3.onclick = function () {
    silde2.style.transform = 'translateX(-200%)';
    btnCustumer1.classList.remove("active");
    btnCustumer2.classList.remove("active");
    btnCustumer3.classList.add("active");
}
// end silder custumer ..............................
// sticky  ..........................................
const navbar = document.querySelector('nav');
window.onscroll = () => {
    this.scrollY > 250 ? navbar.classList.add('sticky') : navbar.classList.remove('sticky');
}
// end sticky ............................................
// menu .................................................
const toggle = document.getElementById('menu__btn');
const sideBar = document.getElementById('side__bar');
toggle.onclick = function () {
    toggle.classList.toggle('active__siderBar');
    sideBar.classList.toggle('active__siderBar');
}
document.onclick = function (e) {
    if (e.target.id !== 'side__bar' && e.target.id !== 'menu__btn') {
        toggle.classList.remove('active__siderBar');
        sideBar.classList.remove('active__siderBar');
    }
}
// end menu
// carousel
$(document).ready(function () {
    $('.banner-home').owlCarousel({
        loop: true,
        margin: 0,
        autoplay: true,
        autoplayTimeout: 10000,
        items: 1,
        lazyLoad: true,
        autoHeight: true,
    })
})

