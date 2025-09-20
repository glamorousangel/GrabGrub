window.addEventListener('scroll', function() {
    const nav = document.querySelector('.nav');
    const stalls = document.getElementById('stalls');
    const scrollY = window.scrollY;

    if(scrollY > stalls.offsetTop - 80) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});
