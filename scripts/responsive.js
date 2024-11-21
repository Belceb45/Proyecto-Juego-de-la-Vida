// Función para detectar si es un dispositivo móvil
function esDispositivoMovil() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /android|ipad|iphone|ipod|blackberry|windows phone|opera mini|webos/i.test(userAgent);
}

// Ejecutar el código solo si es un dispositivo móvil
if (esDispositivoMovil()) {
    // Detectar orientación actual y ejecutar la función correspondiente
    if (window.matchMedia("(orientation: portrait)").matches) {
        vertical();
    } else {
        horizontal();
    }

    // Registrar evento para detectar cambio de orientación
    window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
        const portrait = e.matches;

        if (portrait) {
            console.log("Portrait");
            vertical();
        } else {
            console.log("Landscape");
            horizontal();
        }
    });
}

// Función para manejar orientación vertical
function vertical() {
    // Cambiar elementos visuales para orientación vertical
    document.getElementById('playMusic').style.display = 'none';
    document.querySelector('.container').style.display = 'none';
    document.querySelector('.container-explain').style.display = 'none';
    document.body.style.display = 'grid';
    document.body.style.minHeight = '100vh';
    document.body.style.gridTemplateRows = 'auto 1fr auto';
    document.body.style.placeItems = 'center';
    document.querySelector('.title-neon').style.display = 'flex';
    document.querySelector('.title-neon').style.flexDirection = 'column';
    const title = document.querySelector('.title-neon h2');
    title.textContent = 'Para jugar debes rotar el celular';
    title.style.marginBottom = '0';

    // Verificar si la imagen ya está en el DOM antes de agregarla
    if (!document.querySelector('.rotate-image')) {
        const nuevaImagen = document.createElement('img');
        nuevaImagen.src = './images/rotate.png';
        nuevaImagen.style.marginTop = '50px';
        nuevaImagen.alt = 'Descripción de la imagen'; // Alt para accesibilidad
        nuevaImagen.style.width = '300px'; // Opcional: aplicar estilos
        nuevaImagen.style.height = '300px'; // Opcional: aplicar estilos
        nuevaImagen.classList.add('rotate-image'); // Añadir clase para evitar duplicados
        title.insertAdjacentElement('afterend', nuevaImagen);
    }
}

// Función para manejar orientación horizontal
function horizontal() {
    console.log("Restaurando para orientación horizontal...");

    // Forzar reflujo (ejecutar una acción que fuerce la actualización de los estilos)
    document.body.offsetHeight; // Esto fuerza el reflujo

    document.querySelector('.borde').style.height = '7px';

    const title = document.querySelector('.title-neon');
    title.style.marginTop = '7px';

    const titleNeon = document.querySelector('.title-neon h2');
    titleNeon.style.fontSize = '30px';

    const cont = document.querySelector('.container');
    cont.style.marginTop = '10px';
    cont.style.marginBottom = '5px';

    const tabla = document.querySelector('.tabla');
    tabla.style.width = '60%';
    tabla.style.height = '300px';

    const menu = document.getElementsByClassName('menu')[0];
    menu.style.height = '310px';
    menu.getElementsByTagName('h1')[0].style.fontSize = '15px';
    menu.getElementsByClassName('options')[0].style.fontSize = '14px';
    menu.getElementsByClassName('selected-option')[0].style.fontSize = '15px';
    menu.getElementsByClassName('ejecutar-h1')[0].style.fontSize = '15px';
    menu.getElementsByClassName('ejecutar-h1')[0].style.marginTop = '15px';
    menu.getElementsByClassName('ejecutar-h1')[0].style.marginBottom = '5px';

    const opcionesCont = document.querySelector('.options-container');
    if (!opcionesCont) {
        console.error('No se encontró el contenedor .options-container');
    } else {
        opcionesCont.style.marginLeft = '0';
        opcionesCont.style.top = '0';
        opcionesCont.style.display = 'flex';
        opcionesCont.style.flexDirection = 'row';
        opcionesCont.style.gap = '40px';

        const buttons = document.querySelectorAll('.button-options');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.width = '100px';
            buttons[i].style.marginTop = '0';
            buttons[i].style.height = '40px';
            buttons[i].style.fontSize = '10px';
            if (i == 2) {
                buttons[i].style.display = 'none';
            }
        }

        // Crear el nuevo botón
        const nuevoBoton = document.createElement('button');
        nuevoBoton.style.width = '140px';
        nuevoBoton.style.marginTop = '15px';
        nuevoBoton.style.marginLeft = '50px';
        nuevoBoton.style.height = '40px';
        nuevoBoton.style.fontSize = '10px';
        nuevoBoton.style.borderRadius = '50px';
        nuevoBoton.style.backgroundColor = 'none'; // O 'transparent' si no deseas fondo
        nuevoBoton.style.borderColor = '#d74edc';
        nuevoBoton.style.boxShadow = '0 0 5px #9d40d7, 0 0 25px #d74edc';
        nuevoBoton.style.cursor = 'pointer';
        nuevoBoton.style.color = '#d74edc';
        nuevoBoton.style.textShadow = '0 0 5px #d74edc';

        // Crear el enlace dentro del nuevo botón
        const enlace = document.createElement('a');
        enlace.href = "https://github.com/Belceb45/Proyecto-Juego-de-la-Vida.git";
        enlace.classList.add('repo');
        enlace.textContent = "REPOSITORIO"; // Texto del enlace

        // Crear el ícono de GitHub y agregarlo al enlace
        const iconoGitHub = document.createElement('i');
        iconoGitHub.classList.add('fa-brands', 'fa-github'); // Agregar clases de Font Awesome

        // Agregar el enlace con el ícono dentro del botón
        enlace.appendChild(iconoGitHub); // Añadir el ícono al enlace
        nuevoBoton.appendChild(enlace); // Añadir el enlace al nuevo botón

        // Insertar el nuevo botón después del contenedor de opciones
        opcionesCont.insertAdjacentElement('afterend', nuevoBoton);
    }

    const explain = document.querySelector('.container-explain');
    explain.style.marginLeft = '40px';
    document.querySelector('.middle').style.marginLeft = '30px';
}
