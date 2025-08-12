$(function(){
    const e = document.querySelectorAll(".section");
    window.addEventListener("scroll", () => {
        const isMobile = window.innerWidth <= 968;
        let number = 2;
    
        e.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
    
            if (isMobile) {
                if (elementTop <= window.innerHeight) {
                    el.classList.add("fade-active");
                } else {
                    el.classList.remove("fade-active");
                }
            } else {
                if (elementTop <= window.innerHeight / number) {
                    el.classList.add("fade-active");
                } else {
                    el.classList.remove("fade-active");
                }
            }
        });
    });
    
});

$(window).on("load", function() {
    const e = document.querySelectorAll(".section");
    e.forEach((e => {
        e.getBoundingClientRect().top <= window.innerHeight / 2 ? e.classList.add("fade-active") : e.classList.remove("fade-active")
    }))
});
