$(function(){
    const e = document.querySelectorAll(".section");
    window.addEventListener("scroll", () => {
        sectionScroll(e);
    });
});

$(window).on("load", function() {
    const e = document.querySelectorAll(".section");
    setTimeout(() => {
        sectionScroll(e);
    }, 1000);
});

function sectionScroll(e) {
    const isMobile = window.innerWidth <= 968;
    
    e.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;

        if (isMobile) {
            if (elementTop <= window.innerHeight) {
                el.classList.add("fade-active");
            } else {
                el.classList.remove("fade-active");
            }
        } else {
            if (elementTop <= window.innerHeight / 2) {
                el.classList.add("fade-active");
            } else {
                el.classList.remove("fade-active");
            }
        }
    });
}
