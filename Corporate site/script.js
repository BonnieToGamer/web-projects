function reveal() {
    const reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}

window.addEventListener('scroll', () => {
    let nav = document.querySelector('nav');
    nav.classList.toggle("sticky", window.scrollY > 1);
    reveal();
});