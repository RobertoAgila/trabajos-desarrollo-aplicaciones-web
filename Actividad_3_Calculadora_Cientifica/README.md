# Actividad 3: Calculadora Científica Web

## Información general

**Asignatura:** Desarrollo de Aplicaciones Web

**Tema:** Desarrollo de una calculadora científica interactiva

**Integrantes del equipo:**
- Roberto Carlos Agila Agila
- Genny Isabel Garcia Ramirez
- Cindy Yimabel Monserrate Ibarra

**Tecnologías utilizadas:** HTML5, CSS3 y JavaScript.

**Plataforma de publicación:** GitHub y GitHub Pages.

## 1. Descripción del proyecto

El presente proyecto consiste en el desarrollo de una calculadora científica web interactiva, diseñada para ejecutar operaciones matemáticas básicas y avanzadas mediante una interfaz moderna, intuitiva y adaptable a diferentes dispositivos.

La aplicación fue desarrollada utilizando HTML5 para la estructura, CSS3 para el diseño visual y JavaScript para la programación de las operaciones matemáticas y la interacción con el usuario.

La calculadora funciona directamente en el navegador, sin necesidad de instalar aplicaciones adicionales ni utilizar servicios externos para realizar los cálculos.

## 2. Objetivo

Desarrollar e implementar una calculadora científica web funcional mediante HTML, CSS y JavaScript, aplicando conocimientos de programación del lado del cliente, diseño de interfaces, manipulación del DOM y control de eventos, para posteriormente publicar el proyecto en GitHub.

## 3. Funciones implementadas

La calculadora científica incorpora las siguientes funcionalidades:

- **Operaciones básicas:** suma, resta, multiplicación y división.
- **Funciones trigonométricas:** seno, coseno, tangente y sus funciones inversas.
- **Funciones hiperbólicas:** seno, coseno y tangente hiperbólica.
- **Potencias y raíces:** cuadrados, cubos, potencias de cualquier exponente y raíces.
- **Logaritmos:** decimal, natural y en base 2.
- **Funciones avanzadas:** factorial, porcentaje, módulo, combinaciones, permutaciones y redondeos.
- **Constantes matemáticas:** π (pi) y e (número de Euler).
- **Memoria:** almacenar, recuperar, sumar y restar valores mediante MC, MR, M+ y M−.
- **Historial:** consultar y reutilizar los resultados de operaciones anteriores.
- **Modo trigonométrico:** alternar entre grados (DEG) y radianes (RAD).
- **Controles:** limpiar operaciones, borrar caracteres, cambiar signos y reutilizar respuestas.
- **Personalización:** cambiar entre tema claro y oscuro.
- **Diseño adaptable:** utilización desde computadoras, tabletas y teléfonos móviles.

## 4. Estructura del proyecto

El proyecto está organizado mediante los siguientes archivos:

| Archivo | Descripción |
|---|---|
| `index.html` | Contiene la estructura principal de la calculadora, la pantalla digital, los botones, el historial y la información del equipo. |
| `estilos.css` | Define los colores, estilos, tamaños, distribución de los elementos y adaptación a diferentes pantallas. |
| `script.js` | Implementa las operaciones matemáticas, funciones científicas, eventos, memoria y demás funcionalidades. |
| `README.md` | Documenta la descripción, objetivos, funcionamiento y características del proyecto. |

## 5. Cómo utilizar la calculadora científica

La calculadora se utiliza mediante la interfaz interactiva que presenta el archivo `index.html`, donde se encuentran la pantalla digital, el teclado numérico, los botones científicos y el panel de historial.

### 5.1. Pantalla de resultados

La pantalla principal permite visualizar las expresiones matemáticas introducidas y sus resultados.

Para realizar un cálculo, el usuario debe seleccionar los números y operadores correspondientes y presionar el botón **=**.

**Ejemplo:**

Operación: `25 + 15`

Resultado: `40`

### 5.2. Operaciones matemáticas básicas

El teclado principal dispone de números del 0 al 9 y operadores matemáticos.

| Botón | Función | Ejemplo |
|---|---|---|
| + | Suma | 15 + 5 = 20 |
| − | Resta | 25 − 10 = 15 |
| × | Multiplicación | 8 × 7 = 56 |
| ÷ | División | 100 ÷ 4 = 25 |
| = | Ejecutar el cálculo | Muestra el resultado |
| AC | Limpiar la operación | Reinicia la pantalla |
| DEL | Borrar caracteres | Elimina el último carácter |
| ± | Cambiar signo | Permite cambiar el signo de un valor |

### 5.3. Funciones científicas

El teclado científico permite ejecutar operaciones matemáticas más avanzadas.

Para utilizar estas funciones, se selecciona la operación correspondiente, se introduce el valor requerido y se presiona el botón **=**.

| Función | Ejemplo | Resultado |
|---|---|---|
| Raíz cuadrada | sqrt(81) | 9 |
| Potencia | 2^8 | 256 |
| Factorial | 5! | 120 |
| Logaritmo decimal | log(1000) | 3 |
| Seno en grados | sin(30) | 0.5 |
| Raíz de índice personalizado | root(3,27) | 3 |
| Combinaciones | comb(5,2) | 10 |
| Permutaciones | perm(5,2) | 20 |
| Valor absoluto | abs(-15) | 15 |
| Notación científica | 1E3 | 1000 |

### 5.4. Uso de grados y radianes

La calculadora incorpora el botón **DEG ↔ RAD**, que permite cambiar el modo de cálculo trigonométrico.

- **DEG:** permite realizar cálculos utilizando grados.
- **RAD:** permite realizar cálculos utilizando radianes.

Por ejemplo, en modo DEG, la operación `sin(30)` produce como resultado `0.5`.

### 5.5. Funciones de memoria

Los botones de memoria permiten almacenar temporalmente valores numéricos para utilizarlos posteriormente.

- **MC:** elimina el valor almacenado en memoria.
- **MR:** recupera el valor guardado.
- **M+:** suma un valor a la memoria.
- **M−:** resta un valor de la memoria.

### 5.6. Historial de operaciones

La calculadora dispone de un panel lateral denominado **Historial**, donde se registran las operaciones realizadas.

El usuario puede consultar los cálculos anteriores y seleccionar un resultado para volver a utilizarlo.

También cuenta con la opción **Limpiar historial**, que permite eliminar las operaciones registradas.

### 5.7. Cambio de tema visual

La aplicación incorpora el botón **Cambiar tema**, que permite modificar la presentación de la interfaz entre modo claro y modo oscuro.

Esta función facilita la visualización de los elementos de acuerdo con las preferencias del usuario.

### 5.8. Uso del teclado de la computadora

Además de los botones de la interfaz, la calculadora permite introducir operaciones utilizando el teclado físico.

| Tecla | Función |
|---|---|
| 0–9 | Introducir números |
| +, -, *, / | Operaciones matemáticas |
| Enter | Calcular resultado |
| Backspace | Borrar el último carácter |
| Escape | Limpiar la operación |

## 6. Pruebas de funcionamiento

Para verificar el funcionamiento de la calculadora se proponen las siguientes operaciones:

| Operación | Resultado esperado |
|---|---|
| 5 + 3 × 2 | 11 |
| (5 + 3) × 2 | 16 |
| sqrt(81) | 9 |
| sin(30) en DEG | 0.5 |
| log(1000) | 3 |
| 2^8 | 256 |
| 5! | 120 |
| root(3,27) | 3 |
| 1E3 | 1000 |
| comb(5,2) | 10 |
| perm(5,2) | 20 |
| 1/0 | Mensaje de error |

La calculadora incorpora mecanismos de validación para identificar expresiones incorrectas y operaciones matemáticas no permitidas, como la división entre cero.

**Nota:** El símbolo `%` divide el valor anterior entre 100. Por ejemplo, `25%` corresponde a `0.25`.

## 7. Publicación en GitHub

El proyecto se almacena en un repositorio de GitHub destinado a organizar los trabajos desarrollados durante la asignatura Desarrollo de Aplicaciones Web.

**Repositorio:**

https://github.com/RobertoAgila/trabajos-desarrollo-aplicaciones-web

**Carpeta del proyecto:**

`Actividad_3_Calculadora_Cientifica`

**Archivo principal:**

`index.html`

**Enlace de la aplicación mediante GitHub Pages:**

https://robertoagila.github.io/trabajos-desarrollo-aplicaciones-web/Actividad_3_Calculadora_Cientifica/index.html

La aplicación utiliza GitHub Pages para permitir el acceso a la calculadora mediante un navegador web, siempre que la publicación se encuentre activa.

## 8. Evidencias de la actividad

Como evidencia del desarrollo del proyecto se contempla:

- Repositorio de GitHub con los archivos del proyecto.
- Archivo HTML con la estructura de la calculadora.
- Archivo CSS con el diseño visual.
- Archivo JavaScript con las funcionalidades matemáticas.
- Demostración del funcionamiento de la calculadora.
- Video explicativo donde los integrantes trabajan sobre el código, explican sus componentes y demuestran las operaciones realizadas.

## 9. Conclusión

El desarrollo de la calculadora científica web permitió aplicar conocimientos fundamentales de HTML, CSS y JavaScript mediante la construcción de una aplicación interactiva que integra diseño visual, procesamiento de operaciones matemáticas y manipulación de eventos.

La implementación de funciones científicas, controles de memoria, historial de operaciones y adaptación a diferentes dispositivos contribuye a mejorar la experiencia del usuario y demuestra la aplicación práctica de los conceptos estudiados.

Finalmente, el uso de GitHub permite organizar el código fuente, registrar las modificaciones realizadas y facilitar el acceso al proyecto, fortaleciendo las competencias de desarrollo de aplicaciones web del lado del cliente.
