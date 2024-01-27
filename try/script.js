window.addEventListener('scroll', function() {
    var helloText = document.getElementById('hello-text');
    var distanceFromTop = helloText.getBoundingClientRect().top;
    var windowHeight = window.innerHeight;

    if (distanceFromTop < windowHeight / 2) {
        helloText.style.opacity = 0; // Fade out the text
    } else {
        helloText.style.opacity = 1; // Fade in the text
    }
});
