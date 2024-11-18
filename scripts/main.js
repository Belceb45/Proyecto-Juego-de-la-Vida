document.addEventListener('DOMContentLoaded', function () {
    function cambiarPagina(paginaId) {
    // Oculta todas las secciones
    document.querySelectorAll('.section').forEach(section => {
      section.classList.remove('active');
    });
    // Muestra solo la sección seleccionada
    document.getElementById(paginaId).classList.add('active');
  }

  const titulo = document.querySelector('.title-neon');
  titulo.style.marginTop = '5rem';

  const tituloh2 = document.querySelector('.title-neon h2');
  tituloh2.style.color = '#c71585';
  tituloh2.style.textShadow = '0 0 5px #c71585, 0 0 10px #c71585, 0 0 30px #c71585, 0 0 50px #c71585, 0 0 70px #c71585';
  tituloh2.style.fontSize = '3rem';

  const container = document.querySelector('.container');
  container.style.marginBottom = '2rem';

  
  
});

//Menu
//Alternar opciones
function toggleOptions() {
  document.querySelector('.options').classList.toggle('open');
}

// Seleccionar una opción
function selectOption(optionText) {
  document.querySelector('.selected-option').textContent = optionText;
  document.querySelector('.options').classList.remove('open');
}

