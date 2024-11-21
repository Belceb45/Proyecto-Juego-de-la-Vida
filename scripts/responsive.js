// Función para manejar orientación vertical
function vertical() {
    const elements = {
        playMusic: document.getElementById('playMusic'),
        container: document.querySelector('.container'),
        containerExplain: document.querySelector('.container-explain'),
        body: document.body,
        titleNeon: document.querySelector('.title-neon'),
        title: document.querySelector('.title-neon h2'),
        footer: document.querySelector('footer')
    };

    // Guardar los estilos originales si aún no se han guardado
    if (!window.originalStyles) {
        window.originalStyles = {
            body: elements.body.getAttribute('style') || '',
            titleNeon: elements.titleNeon.getAttribute('style') || '',
            title: elements.title.getAttribute('style') || ''
        };
    }

    // Ocultar elementos no necesarios en vertical
    elements.playMusic.style.display = 'none';
    elements.container.style.display = 'none';
    elements.containerExplain.style.display = 'none';


    // Configurar el body para la vista vertical
    elements.body.style.cssText = window.originalStyles.body;
    elements.body.style.display = 'grid';
    elements.body.style.minHeight = '100vh';
    elements.body.style.gridTemplateRows = 'auto 1fr auto';
    elements.body.style.placeItems = 'center';

    // Configurar el título
    elements.titleNeon.style.cssText = window.originalStyles.titleNeon;
    elements.titleNeon.style.display = 'flex';
    elements.titleNeon.style.flexDirection = 'column';
    elements.title.style.cssText = window.originalStyles.title;
    elements.title.textContent = 'Para jugar debes rotar el celular';
    elements.title.style.marginBottom = '0';

    // Verificar si la imagen ya está en el DOM antes de agregarla
    let rotateImage = document.querySelector('.rotate-image');
    if (!rotateImage) {
        rotateImage = document.createElement('img');
        rotateImage.src = './images/rotate.png';
        rotateImage.alt = 'Rotar el dispositivo';
        rotateImage.classList.add('rotate-image');
        elements.title.insertAdjacentElement('afterend', rotateImage);
    }
    // Asegurarse de que la imagen sea visible
    rotateImage.style.display = 'block';
    rotateImage.style.marginTop = '50px';
    rotateImage.style.width = '300px';
    rotateImage.style.height = '300px';

    // Ocultar elementos específicos de la orientación horizontal
    const horizontalElements = document.querySelectorAll('.horizontal-only');
    horizontalElements.forEach(el => el.style.display = 'none');
}

// Función para manejar orientación horizontal
function horizontal() {
    const elements = {
        playMusic: document.getElementById('playMusic'),
        container: document.querySelector('.container'),
        containerExplain: document.querySelector('.container-explain'),
        body: document.body,
        titleNeon: document.querySelector('.title-neon'),
        title: document.querySelector('.title-neon h2'),
        borde: document.querySelector('.borde'),
        tabla: document.querySelector('.tabla'),
        menu: document.querySelector('.menu'),
        optionsContainer: document.querySelector('.options-container'),
        footer: document.querySelector('footer')
    };

    // Restaurar estilos originales
    if (window.originalStyles) {
        elements.body.style.cssText = window.originalStyles.body;
        elements.titleNeon.style.cssText = window.originalStyles.titleNeon;
        elements.title.style.cssText = window.originalStyles.title;
    }

    // Mostrar elementos que se ocultaron en vertical
    elements.playMusic.style.display = '';
    elements.container.style.display = '';
    elements.containerExplain.style.display = '';
    elements.footer.style.display = '';

    // Ocultar la imagen de rotación
    const rotateImage = document.querySelector('.rotate-image');
    if (rotateImage) {
        rotateImage.style.display = 'none';
    }

    // Configurar estilos para orientación horizontal
    elements.borde.style.height = '7px';
    elements.titleNeon.style.marginTop = '7px';
    elements.title.style.fontSize = '30px';
    elements.container.style.marginTop = '10px';
    elements.container.style.marginBottom = '5px';
    elements.tabla.style.width = '60%';
    elements.tabla.style.height = '300px';

    // Configurar el menú
    if (elements.menu) {
        elements.menu.style.height = '310px';
        const menuElements = {
            title: elements.menu.querySelector('h1'),
            options: elements.menu.querySelector('.options'),
            selectedOption: elements.menu.querySelector('.selected-option'),
            ejecutarH1: elements.menu.querySelector('.ejecutar-h1')
        };

        menuElements.title.style.fontSize = '15px';
        menuElements.options.style.fontSize = '14px';
        menuElements.selectedOption.style.fontSize = '15px';
        menuElements.ejecutarH1.style.fontSize = '15px';
        menuElements.ejecutarH1.style.marginTop = '15px';
        menuElements.ejecutarH1.style.marginBottom = '5px';
    }

    // Configurar el contenedor de opciones
    if (elements.optionsContainer) {
        elements.optionsContainer.style.marginLeft = '0';
        elements.optionsContainer.style.top = '0';
        elements.optionsContainer.style.display = 'flex';
        elements.optionsContainer.style.flexDirection = 'row';
        elements.optionsContainer.style.gap = '40px';

        const buttons = elements.optionsContainer.querySelectorAll('.button-options');
        buttons.forEach((button, i) => {
            button.style.width = '100px';
            button.style.marginTop = '0';
            button.style.height = '40px';
            button.style.fontSize = '10px';
            if (i === 2) {
                button.style.display = 'none';
            }
        });

        // Crear el botón de repositorio si no existe
        if (!document.querySelector('.repo-button')) {
            const nuevoBoton = createRepoButton();
            elements.optionsContainer.insertAdjacentElement('afterend', nuevoBoton);
        }
    }

    elements.containerExplain.style.marginLeft = '40px';
    elements.containerExplain.style.marginBottom = '0';
    document.querySelector('.middle').style.marginLeft = '30px';
}

// Función para crear el botón de repositorio
function createRepoButton() {
    const nuevoBoton = document.createElement('button');
    nuevoBoton.classList.add('repo-button');
    Object.assign(nuevoBoton.style, {
        width: '140px',
        marginTop: '15px',
        marginLeft: '50px',
        height: '40px',
        fontSize: '10px',
        borderRadius: '50px',
        backgroundColor: 'transparent',
        borderColor: '#d74edc',
        boxShadow: '0 0 5px #9d40d7, 0 0 25px #d74edc',
        cursor: 'pointer',
        color: '#d74edc',
        textShadow: '0 0 5px #d74edc'
    });

    const enlace = document.createElement('a');
    enlace.href = "https://github.com/Belceb45/Proyecto-Juego-de-la-Vida.git";
    enlace.classList.add('repo');
    enlace.textContent = "REPOSITORIO ";

    const iconoGitHub = document.createElement('i');
    iconoGitHub.classList.add('fa-brands', 'fa-github');

    enlace.appendChild(iconoGitHub);
    nuevoBoton.appendChild(enlace);
    return nuevoBoton;
}

// Función para detectar si es un dispositivo móvil
function esDispositivoMovil() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /android|ipad|iphone|ipod|blackberry|windows phone|opera mini|webos/i.test(userAgent);
}

// Función para manejar la orientación en dispositivos móviles
function manejarOrientacionMovil() {
    if (window.matchMedia("(orientation: portrait)").matches) {
        console.log("Portrait");
        vertical();
    } else {
        console.log("Landscape");
        horizontal();
    }
}

// Función para restaurar el diseño original (para PC)
function restaurarDisenoOriginal() {
    const elements = {
        playMusic: document.getElementById('playMusic'),
        container: document.querySelector('.container'),
        containerExplain: document.querySelector('.container-explain'),
        body: document.body,
        titleNeon: document.querySelector('.title-neon'),
        title: document.querySelector('.title-neon h2'),
        footer: document.querySelector('footer')
    };

    // Restaurar estilos originales
    if (window.originalStyles) {
        elements.body.style.cssText = window.originalStyles.body;
        elements.titleNeon.style.cssText = window.originalStyles.titleNeon;
        elements.title.style.cssText = window.originalStyles.title;
    }

    // Mostrar todos los elementos
    elements.playMusic.style.display = '';
    elements.container.style.display = '';
    elements.containerExplain.style.display = '';
    elements.footer.style.display = '';

    // Ocultar la imagen de rotación si existe
    const rotateImage = document.querySelector('.rotate-image');
    if (rotateImage) {
        rotateImage.remove();
    }

    // Restaurar el título original
    elements.title.textContent = 'Juego de la Vida';

    // Mostrar elementos específicos de la orientación horizontal
    const horizontalElements = document.querySelectorAll('.horizontal-only');
    horizontalElements.forEach(el => el.style.display = '');
}

// Función principal para manejar la disposición
function manejarDisposicion() {
    if (esDispositivoMovil()) {
        manejarOrientacionMovil();
        window.addEventListener('orientationchange', () => {
            setTimeout(manejarOrientacionMovil, 100);
        });
    } else {
        restaurarDisenoOriginal();
        window.removeEventListener('orientationchange', manejarOrientacionMovil);
    }
}

// Ejecutar la función principal al cargar la página y al cambiar el tamaño de la ventana
window.addEventListener('load', manejarDisposicion);
window.addEventListener('resize', manejarDisposicion);