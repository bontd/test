$(function(){
    const e = document.querySelectorAll(".section");
    e.forEach((e => {
        e.getBoundingClientRect().top <= window.innerHeight / 2 ? e.classList.add("fade-active") : e.classList.remove("fade-active")
    }))
    window.addEventListener("scroll", (() => {
        e.forEach((e => {
            e.getBoundingClientRect().top <= window.innerHeight / 2 ? e.classList.add("fade-active") : e.classList.remove("fade-active")
        }))
    }))
});
