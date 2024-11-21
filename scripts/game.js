
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



//Menu
//Alternar opciones
function toggleOptions() {
  document.querySelector('.options').classList.toggle('open');
}

// Seleccionar una opción
function selectOpt(optionText) {
  document.querySelector('.selected-option').textContent = optionText;
  document.querySelector('.options').classList.remove('open');
}

const filas = 23;
const columnas = 56;
const tabla = document.getElementById("tb");
const tablaStyle = document.querySelector(".tabla");
const style = window.getComputedStyle(tablaStyle);

// Obtiene el ancho y alto del contenedor de la tabla
const dimCW = parseFloat(style.width) / filas;
const dimCH = parseFloat(style.height) / columnas;

console.log(dimCW);
console.log(dimCH);

// Estado de las celdas (0 para muerta, 1 para viva)
const matriz = Array(filas).fill().map(() => Array(columnas).fill(0));

for (let i = 0; i < filas; i++) {
  const fila = document.createElement("tr");
  for (let j = 0; j < columnas; j++) {
    const celda = document.createElement("td");

    celda.addEventListener("click", function () {
      // Alterna la clase 'selected' y cambia el estado en la matriz
      celda.classList.toggle("selected");
      matriz[i][j] = matriz[i][j] === 0 ? 1 : 0;  // 0 -> 1 (viva), 1 -> 0 (muerta)
      console.log(`Matriz en (${i}, ${j}): ${matriz[i][j]}`); // Imprimir el valor en la matriz
    });

    fila.appendChild(celda);
  }
  tabla.appendChild(fila);
}
// Funcion que limpia el tablero
function limpiarTablero() {
  // Limpiar la matriz
  matriz.forEach((fila, i) => fila.forEach((_, j) => matriz[i][j] = 0));

  // Limpiar visualmente el tablero
  const celdas = document.querySelectorAll("#tb td");
  celdas.forEach(celda => celda.classList.remove("selected"));

  console.log("Tablero limpiado");
}


// Obtener el botón "Limpiar" por su clase
const cleanButton = document.querySelector(".button-options.clean");

// Añadir un evento para limpiar la tabla y reiniciar la matriz
cleanButton.addEventListener("click", function () {
  // Seleccionar todas las celdas de la tabla
  limpiarTablero();
});



// Función que calcula la próxima generación
function siguienteGeneracion() {
  const nuevaMatriz = matriz.map((arr) => arr.slice()); // Copia profunda de la matriz original

  // Iterar sobre cada celda de la matriz
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      // Contar los vecinos vivos
      const vecinosVivos = contarVecinosVivos(i, j);

      if (matriz[i][j] === 1) {
        // Regla 1 y 3: la celda muere por soledad o sobrepoblación
        if (vecinosVivos < 2 || vecinosVivos > 3) {
          nuevaMatriz[i][j] = 0;
        }
        // Regla 2: la celda sigue viva si tiene 2 o 3 vecinos
        else {
          nuevaMatriz[i][j] = 1;
        }
      } else {
        // Regla 4: la celda muerta revive si tiene exactamente 3 vecinos vivos
        if (vecinosVivos === 3) {
          nuevaMatriz[i][j] = 1;
        }
      }
    }
  }

  // Actualizar la matriz original con los nuevos valores
  matriz.forEach((fila, i) => fila.forEach((celda, j) => {
    // Actualizar las celdas visualmente según la nueva matriz
    const celdaHTML = tabla.rows[i].cells[j];
    if (nuevaMatriz[i][j] === 1) {
      celdaHTML.classList.add("selected");
    } else {
      celdaHTML.classList.remove("selected");
    }
  }));

  // Actualizar la matriz original
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      matriz[i][j] = nuevaMatriz[i][j];
    }
  }
}

// Función para contar los vecinos vivos de una celda
function contarVecinosVivos(i, j) {
  const vecinos = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];

  let count = 0;

  // Comprobar los vecinos dentro de los límites de la matriz, con envolvimiento
  for (const [dx, dy] of vecinos) {
    /* El operador modulo nos ayuda a obtener el modulo del tamaño de nuestra celda, de esta forma
       podemos reconocer incluso las celdas que dan la vuelta al fin de la fila o columna (borde de la
       tabla). Permite hacer una forma "toroidal"     */
    const ni = (i + dx + filas) % filas;  // Si 'i + dx' es negativo o mayor que filas, se envuelve
    const nj = (j + dy + columnas) % columnas;  // Similar para las columnas

    count += matriz[ni][nj]; // Si el vecino está vivo, contar
  }

  return count;
}


const checkbox = document.getElementById("myCheckbox"); // Referencia al checkbox
// Evento para iniciar o detener el juego
checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
        const speed = parseInt(slider.value); // Lee la velocidad inicial del slider
        gameInterval = setInterval(siguienteGeneracion, speed); // Inicia el juego
        console.log(`Juego iniciado con velocidad: ${speed} ms`);
    } else {
        clearInterval(gameInterval); // Detén el juego
        console.log("Juego detenido");
    }
});

const slider = document.getElementById("slider"); // Referencia al slider
let gameInterval; // Variable global para el intervalo del juego

// Escucha los cambios en el slider
slider.addEventListener("input", function () {
    const speed = parseInt(slider.value); // Obtiene el valor del slider como entero
    console.log(`Velocidad ajustada a: ${speed} ms`);

    if (gameInterval && checkbox.checked) {
        clearInterval(gameInterval); // Detén el intervalo actual
        gameInterval = setInterval(siguienteGeneracion, speed); // Inicia con la nueva velocidad
    }
});


//Iniciar el juego uno a uno
const oneForOne = document.querySelector(".button-options.one");
oneForOne.addEventListener("click", function () {
  siguienteGeneracion();
});



//Patrones prediseñados
function selectOption(pattern) {
  limpiarTablero(); // Limpia el tablero antes de aplicar un patrón

  const patrones = {
    'Glider': [
      // Coordenadas del Glider
      [10, 26], [11, 27], [11, 28], [10, 28], [12, 27]
    ],
    'Pulsar': [
      // Coordenadas de Pulsar
      [6, 23], [7, 23], [8, 23], [8, 24], [8, 28], [8, 29], [7, 29], [6, 29], [10, 24], [10, 25], [11, 25], [10, 27], [10, 28], [11, 27], [11, 23], [12, 23]
      , [12, 24], [12, 28], [12, 29], [11, 29], [11, 21], [10, 21], [10, 20], [10, 19], [11, 31], [10, 31], [10, 32], [10, 33], [14, 23], [14, 24], [15, 23],
      [16, 24], [16, 25], [15, 25], [15, 27], [16, 27], [16, 28], [14, 28], [14, 29], [15, 29], [16, 21], [15, 21], [16, 20], [16, 19], [15, 31], [16, 31], [16, 32],
      [16, 33], [18, 24], [18, 23], [19, 23], [20, 23], [18, 28], [18, 29], [19, 29], [20, 29]
    ],
    'Spaceship': [
      // Coordenadas de Spaceship
      [9, 28], [9, 29], [10, 27], [10, 28], [10, 29], [10, 30], [11, 27], [11, 28], [11, 30], [11, 31], [12, 30], [12, 29]
    ],
    'Circle of Fire': [
      // Coordenadas de Circle of Fire
      [11, 24],[11, 25],[11, 26],[11, 27],[11, 28],[10, 29],[11, 30],[12, 29],[9, 29], [8, 29], [7, 29], [13, 29],
      [14, 29],[15, 29],[11, 31],[11, 32],[11, 33],[11, 34],[9, 31], [8, 31], [9, 32], [7, 32], [6, 30], [6, 28], [9, 27], [8, 27], [9, 33], [9, 26], [9, 25], [7, 26], [13, 27],
      [14, 27],[13, 26],[13, 25],[15, 26],[16, 28],[16, 30],[14, 31],[13, 31],[13, 32],[13, 33],[15, 32]
    
    ],
    'Quadpole': [
      // Coordenadas de Quadpole
      [8, 23],[9, 23],[8, 24],[9, 25],[11, 25],[11, 27],[13, 27],[14, 28],[14, 29],[13, 29]

    ],
  };

  const coords = patrones[pattern] || [];
  coords.forEach(([i, j]) => {
    matriz[i][j] = 1; // Cambiar el estado de la matriz
    const celda = document.querySelector(`#tb tr:nth-child(${i + 1}) td:nth-child(${j + 1})`);
    if (celda) celda.classList.add("selected"); // Cambiar el estado visual
  });

  console.log(`Patrón ${pattern} configurado.`);

  // Cerrar el menú
  const optionsContainer = document.querySelector(".options");
  optionsContainer.classList.remove("open");
}


