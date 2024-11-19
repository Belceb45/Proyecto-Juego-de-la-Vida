
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
function selectOption(optionText) {
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
//


// Obtener el botón "Limpiar" por su clase
const cleanButton = document.querySelector(".button-options.clean");

// Añadir un evento para limpiar la tabla y reiniciar la matriz
cleanButton.addEventListener("click", function () {
    // Seleccionar todas las celdas de la tabla
    const celdas = document.querySelectorAll("#tb td");
    
    // Limpiar visualmente las celdas (remover la clase "selected")
    celdas.forEach(celda => {
        celda.classList.remove("selected");
    });

    // Reiniciar la matriz del juego a 0
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            matriz[i][j] = 0;
        }
    }

    console.log("Tabla y matriz reiniciadas.");
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
    [0, -1],          [0, 1],
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

// Iniciar el ciclo del juego con un intervalo
let gameInterval; // Variable global para almacenar el intervalo del juego
const checkbox = document.getElementById("myCheckbox"); // Seleccionar el checkbox

// Evento change para controlar el inicio y detención del juego
checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
        // Iniciar el juego
        gameInterval = setInterval(siguienteGeneracion, 100); // Ejecutar cada 500 ms
        console.log("Juego iniciado");
    } else {
        // Detener el juego
        clearInterval(gameInterval);
        console.log("Juego detenido");
    }
});

//Iniciar el juego uno a uno
const oneForOne=document.querySelector(".button-options.one");
oneForOne.addEventListener("click", function(){
  siguienteGeneracion();
});



function toggleOptions() {
  document.querySelector('.options').classList.toggle('open');
}

// Seleccionar una opción
function selectOption(optionText) {
  document.querySelector('.selected-option').textContent = optionText;
  document.querySelector('.options').classList.remove('open');
}


