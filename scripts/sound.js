const playMusicButton = document.getElementById("playMusic");  // Botón para reproducir música
const soundIcon = document.querySelector(".sound");  // Ícono de sonido
const sound = new Audio('./sounds/stranger-things-124008.mp3');  // Archivo de sonido

let isPlaying = false;  // Estado inicial

// Al hacer clic en el botón de música
playMusicButton.addEventListener("click", function () {
    if (isPlaying) {
        sound.pause();  // Pausar el sonido si está en reproducción
        soundIcon.style.backgroundImage = "url('images/apagado.png')";  // Cambiar ícono a apagado
        isPlaying = false;
    } else {
        sound.loop=true;
        sound.play();  // Reproducir el sonido si no está en reproducción
        soundIcon.style.backgroundImage = "url('images/encendido.png')";  // Cambiar ícono a encendido
        isPlaying = true;
    }
});
