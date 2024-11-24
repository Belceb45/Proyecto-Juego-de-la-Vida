## Proyecto-Modulo-2
Proyecto final del modulo 2 implementado con Javascript. 
Este proyecto es él "Juego de la vida".


Boceto de la página (canva design):  https://prueba4512.my.canva.site/el-juego-de-la-vida

Pagina (Netlfy): https://el-juego-de-la-vida.netlify.app

Pagina (Vercel): https://proyecto-juego-de-la-vida.vercel.app


![](https://github.com/Belceb45/Proyecto-Juego-de-la-Vida/blob/7bb5f3911e0dbaed6a57c5ee2bed7ca9e6435da0/images/preview.png)

# Explicación del Juego de la Vida: 

El Juego de la Vida es un autómata celular desarrollado por el matemático John Horton Conway en 1969. Lo nombró en honor a su esposa, Heidi, que había muerto a principios de ese año. El juego consiste en una cuadrícula en la que cada puede o no haber cuadrados pintados (las “células”).

Cada celda contiene un solo número que representa su valor de vida o de muerte (si el valor es cero). En cada turno, cada celda se compara con tres células vecinas. Si la suma de esos números excede algún valor umbral, la celda muere; de lo contrario, sigue vivo.
Conway descubrió que ciertos patrones emergen con el tiempo.

Reglas: 
El universo del Juego de la Vida es una cuadrícula ortogonal infinita y bidimensional de células cuadradas, cada una de las cuales se encuentra en uno de los dos estados posibles, vivas o muertas (o pobladas y despobladas, respectivamente). Cada celda interactúa con sus ocho, que son las celdas que son horizontal, vertical o diagonalmente adyacentes.

Las reglas, se pueden condensar en lo siguiente:
1. Cualquier célula viva con dos o tres vecinos vivos sobrevive.
2. Cualquier célula muerta con tres vecinos vivos se convierte en una célula viva.
3. Todas las demás células vivas mueren en la próxima generación. Del mismo modo, todas las demás células muertas permanecen muertas.

El patrón inicial constituye la semilla del sistema. La primera generación se crea aplicando las reglas anteriores simultáneamente a cada célula de la semilla, viva o muerta; los nacimientos y las muertes ocurren simultáneamente, y el momento discreto en el que esto sucede a veces se llama garrapata.

Una nueva generación comienza cuando todas las celdas se han actualizado una vez. Esto significa que la próxima generación comienza desde cero, sin memoria de lo que sucedió en generaciones anteriores.


![](https://github.com/Belceb45/Proyecto-Juego-de-la-Vida/blob/d12f7cb2279daa18c01654c82fc47d2e2f67f125/images/preview2.png)
