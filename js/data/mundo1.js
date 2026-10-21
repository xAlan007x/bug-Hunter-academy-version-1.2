MISIONES.push(
{
  id: 'm1-01', mundo: 1, titulo: 'El saludo con comillas',
  historia: 'La pantalla de bienvenida de TiendaVirtus debe mostrar "¡Hola, TiendaVirtus!" pero el código falla al ejecutarse.',
  objetivo: 'Mostrar exactamente: ¡Hola, TiendaVirtus!',
  xp: 15,
  pistas: ['Los textos en JavaScript van entre comillas.', 'Faltan las comillas alrededor del mensaje.', 'Escribí: console.log("¡Hola, TiendaVirtus!");'],
  aprender: '<h3>Strings: textos entre comillas</h3><p>En JavaScript, cualquier texto se llama <strong>string</strong> y debe ir entre comillas dobles o simples. Sin comillas, JavaScript intenta leer el texto como un nombre de variable y falla.</p><pre><code>console.log("¡Hola, TiendaVirtus!");</code></pre>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>console.log("¡Hola, TiendaVirtus!");</code></pre><p>Al ejecutar, muestra el saludo en consola.</p>',
  detectar: '<h3>Código con error</h3><pre><code>console.log(¡Hola, TiendaVirtus!);</code></pre><p>¿Qué le falta al texto para que JavaScript lo reconozca como string?</p>',
  reparar: {
    codigoInicial: 'console.log(¡Hola, TiendaVirtus!);',
    validar: function (out, code) {
      if (!/console\.log\(\s*["']¡Hola,\s*TiendaVirtus!["']\s*\)/.test(code)) return { ok: false, exp: 'Faltan comillas: console.log("¡Hola, TiendaVirtus!");' };
      if (!out.includes('¡Hola, TiendaVirtus!')) return { ok: false, exp: 'Debe mostrar ¡Hola, TiendaVirtus!' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>Sin comillas, JavaScript interpreta <code>¡Hola</code> como un nombre inválido y tira un error de sintaxis. Las comillas convierten el texto en un <strong>string</strong>.</p><pre><code>console.log("¡Hola, TiendaVirtus!");</code></pre>'
},
{
  id: 'm1-02', mundo: 1, titulo: 'La estructura de la página',
  historia: 'Estás creando la página principal de la tienda, pero el navegador no muestra nada bien: falta la estructura completa de HTML.',
  objetivo: 'Escribir el HTML mínimo con <!DOCTYPE html>, <html>, <head> y <body>.',
  xp: 15,
  pistas: ['Toda página HTML empieza con <!DOCTYPE html>.', 'La estructura es: DOCTYPE, html, head, body.', 'Cerrá cada etiqueta: <head>...</head> y <body>...</body>.'],
  aprender: '<h3>HTML: la estructura de una página</h3><p>HTML es el lenguaje de marcado que da estructura a la web. Toda página necesita el documento <code>DOCTYPE</code>, y las etiquetas <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code> (información del documento) y <code>&lt;body&gt;</code> (contenido visible).</p>',
  ver: '<h3>Página mínima</h3><pre><code>&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n&lt;head&gt;\n  &lt;title&gt;TiendaVirtus&lt;/title&gt;\n&lt;/head&gt;\n&lt;body&gt;\n  &lt;h1&gt;Bienvenidos&lt;/h1&gt;\n&lt;/body&gt;\n&lt;/html&gt;</code></pre>',
  detectar: '<h3>HTML incompleto</h3><pre><code>&lt;html&gt;\n  &lt;title&gt;TiendaVirtus&lt;/title&gt;\n  &lt;h1&gt;Bienvenidos&lt;/h1&gt;\n&lt;/html&gt;</code></pre><p>¿Qué secciones faltan para que sea una página válida?</p>',
  reparar: {
    codigoInicial: '<html>\n  <title>TiendaVirtus</title>\n  <h1>Bienvenidos</h1>\n</html>',
    validar: function (out, code) {
      var c = code.toLowerCase();
      if (!c.includes('<!doctype html>')) return { ok: false, exp: 'Falta <!DOCTYPE html> al principio' };
      if (!/<html>/.test(c) || !/<\/html>/.test(c)) return { ok: false, exp: 'Falta la etiqueta <html> o su cierre </html>' };
      if (!/<head>/.test(c) || !/<\/head>/.test(c)) return { ok: false, exp: 'Falta la sección <head>' };
      if (!/<body>/.test(c) || !/<\/body>/.test(c)) return { ok: false, exp: 'Falta la sección <body>' };
      return { ok: true };
    }
  },
  comprender: '<h3>Estructura correcta</h3><p>El <code>&lt;head&gt;</code> guarda información del documento (como el título). El <code>&lt;body&gt;</code> contiene todo lo que se ve en pantalla. Sin estas secciones, el navegador no interpreta bien la página.</p><pre><code>&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n&lt;head&gt;&lt;title&gt;TiendaVirtus&lt;/title&gt;&lt;/head&gt;\n&lt;body&gt;&lt;h1&gt;Bienvenidos&lt;/h1&gt;&lt;/body&gt;\n&lt;/html&gt;</code></pre>'
},
{
  id: 'm1-03', mundo: 1, titulo: 'Guardar el stock con let',
  historia: 'El sistema de la tienda necesita recordar cuántas computadoras quedan en stock, pero el programador olvidó declarar la variable y el código falla.',
  objetivo: 'Crear la variable stock con let, asignarle 12 y mostrarla.',
  xp: 16,
  pistas: ['Las variables se declaran con let.', 'La asignación se hace con el signo =', 'Escribí: let stock = 12; console.log(stock);'],
  aprender: '<h3>Variables con let</h3><p>Una <strong>variable</strong> es un contenedor con nombre para guardar datos. Con <code>let</code> creamos una variable que puede cambiar después. El nombre va primero, después el = y el valor.</p><pre><code>let stock = 12;</code></pre>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>let stock = 12;\nconsole.log(stock); // muestra 12</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>stock = 12;\nconsole.log(stock);</code></pre><p>¿Cómo se declara una variable nueva en JavaScript moderno?</p>',
  reparar: {
    codigoInicial: 'stock = 12;\nconsole.log(stock);',
    validar: function (out, code) {
      if (!/(?:^|[^a-zA-Z0-9_$])let\s+stock\s*=\s*12/.test(code)) return { ok: false, exp: 'Declará la variable con let: let stock = 12;' };
      if (!out.includes('12')) return { ok: false, exp: 'Debe mostrar 12 en consola' };
      return { ok: true };
    }
  },
  comprender: '<h3>Solución</h3><p>En JavaScript moderno, toda variable necesita <code>let</code>, <code>const</code> o <code>var</code> antes del nombre. Sin eso, el motor tira un error de referencia.</p><pre><code>let stock = 12;\nconsole.log(stock);</code></pre>'
},
{
  id: 'm1-04', mundo: 1, titulo: 'Suma y resta de números',
  historia: 'La caja registradora debe sumar dos precios y restar un descuento, pero el programador puso la operación entera entre comillas y la caja muestra texto en vez de números.',
  objetivo: 'Sumar 100 + 50 y restar 100, mostrando el resultado 50 sin comillas.',
  xp: 16,
  pistas: ['Los números no llevan comillas.', 'El operador de suma es + y el de resta -', 'Escribí: console.log(100 + 50 - 100);'],
  aprender: '<h3>Operadores aritméticos</h3><p>Los números se escriben <strong>sin comillas</strong>. Con comillas son texto (string) y el + concatena en vez de sumar.</p><pre><code>console.log(100 + 50 - 100); // 50</code></pre>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>console.log(100 + 50 - 100); // 50</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>console.log("100 + 50 - 100");</code></pre><p>¿Qué pasa si la operación entera va entre comillas?</p>',
  reparar: {
    codigoInicial: 'console.log("100 + 50 - 100");',
    validar: function (out, code) {
      if (!/console\.log\(\s*100\s*\+\s*50\s*-\s*100\s*\)/.test(code)) return { ok: false, exp: 'Quitá las comillas: console.log(100 + 50 - 100);' };
      if (!out.includes('50')) return { ok: false, exp: 'Debe mostrar 50' };
      return { ok: true };
    }
  },
  comprender: '<h3>Strings vs números</h3><p>Entre comillas, JavaScript ve "100 + 50 - 100" como un texto más y lo muestra tal cual. Sin comillas, reconoce los números y ejecuta la operación: 100 + 50 - 100 = 50.</p>'
},
{
  id: 'm1-05', mundo: 1, titulo: 'const no se toca',
  historia: 'El código del comercio usa const para el nombre de la tienda, pero después intenta actualizarlo en una promoción y el navegador tira un error.',
  objetivo: 'Cambiar const por let en nombreTienda para poder reasignarlo y mostrar "TiendaVirtus Promo".',
  xp: 17,
  pistas: ['const crea una variable que no se puede reasignar.', 'let permite cambiar el valor después.', 'Cambiá const por let en la primera línea.'],
  aprender: '<h3>const vs let</h3><p><code>const</code> crea una variable <strong>inmutable</strong>: no se le puede asignar otro valor (tira error). <code>let</code> sí permite reasignar. Usá const por defecto y let solo cuando el valor va a cambiar.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>let nombreTienda = "TiendaVirtus";\nnombreTienda = "TiendaVirtus Promo";\nconsole.log(nombreTienda);</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>const nombreTienda = "TiendaVirtus";\nnombreTienda = "TiendaVirtus Promo";\nconsole.log(nombreTienda);</code></pre><p>¿Qué tipo de variable no permite ser reasignada?</p>',
  reparar: {
    codigoInicial: 'const nombreTienda = "TiendaVirtus";\nnombreTienda = "TiendaVirtus Promo";\nconsole.log(nombreTienda);',
    validar: function (out, code) {
      if (/(?:^|[^a-zA-Z0-9_$])const\s+nombreTienda\b/.test(code)) return { ok: false, exp: 'const no permite reasignar; cambialo por let' };
      if (!/(?:^|[^a-zA-Z0-9_$])let\s+nombreTienda\b/.test(code)) return { ok: false, exp: 'Declará la variable con let: let nombreTienda = "TiendaVirtus";' };
      if (!out.includes('TiendaVirtus Promo')) return { ok: false, exp: 'Debe mostrar TiendaVirtus Promo' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p><code>const</code> declara una referencia fija: la segunda línea intenta reasignarla y JavaScript lanza un TypeError. Cambiando a <code>let</code>, la reasignación es válida y el programa muestra "TiendaVirtus Promo".</p>'
},
{
  id: 'm1-06', mundo: 1, titulo: '¿Qué tipo de dato es?',
  historia: 'El sistema de inventario quiere saber de qué tipo es cada dato antes de usarlo, pero el código falla porque el operador está mal escrito.',
  objetivo: 'Usar typeof para mostrar el tipo de la variable precio (number).',
  xp: 17,
  pistas: ['typeof devuelve el tipo de un dato como texto.', 'Se usa así: typeof variable', 'Escribí: console.log(typeof precio);'],
  aprender: '<h3>Tipos de datos</h3><p>JavaScript tiene tipos principales: <strong>string</strong> (texto), <strong>number</strong> (números), <strong>boolean</strong> (true/false), <strong>undefined</strong> y <strong>null</strong>. El operador <code>typeof</code> devuelve el tipo como string.</p><pre><code>let precio = 2500;\nconsole.log(typeof precio); // number</code></pre>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>let precio = 2500;\nconsole.log(typeof precio); // "number"</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>let precio = 2500;\nconsole.log(typeOf precio);</code></pre><p>¿Cómo se escribe correctamente el operador de tipo?</p>',
  reparar: {
    codigoInicial: 'let precio = 2500;\nconsole.log(typeOf precio);',
    validar: function (out, code) {
      if (!/typeof\s+precio/.test(code)) return { ok: false, exp: 'Escribí typeof (con f minúscula): console.log(typeof precio);' };
      if (!out.includes('number')) return { ok: false, exp: 'Debe mostrar number' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p><code>typeOf</code> no existe: el operador se escribe <strong>typeof</strong> (una sola palabra, con f minúscula). Como precio vale 2500, el tipo que devuelve es <code>number</code>.</p>'
},
{
  id: 'm1-07', mundo: 1, titulo: 'Multiplicar y dividir',
  historia: 'La calculadora de la tienda debe calcular 6 canillas a $20 cada una y dividir el total entre 4 socios, pero el programador usó operadores equivocados.',
  objetivo: 'Calcular 6 * 20 y el total / 4, mostrando ambos resultados (120 y 30).',
  xp: 18,
  pistas: ['El operador de multiplicación es * y el de división /', 'Necesitás dos console.log, uno para cada cálculo.', 'Escribí: console.log(6 * 20); console.log(120 / 4);'],
  aprender: '<h3>Multiplicación y división</h3><p><code>*</code> multiplica y <code>/</code> divide. Son operadores aritméticos básicos y se pueden usar en expresiones más largas.</p><pre><code>console.log(6 * 20);  // 120\nconsole.log(120 / 4); // 30</code></pre>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>console.log(6 * 20);  // 120\nconsole.log(120 / 4); // 30</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>console.log(6 + 20);\nconsole.log(120 * 4);</code></pre><p>¿Qué operadores faltan para multiplicar y dividir?</p>',
  reparar: {
    codigoInicial: 'console.log(6 + 20);\nconsole.log(120 * 4);',
    validar: function (out, code) {
      if (!/console\.log\(\s*6\s*\*\s*20\s*\)/.test(code)) return { ok: false, exp: 'Multiplicá: console.log(6 * 20);' };
      if (!/console\.log\(\s*120\s*\/\s*4\s*\)/.test(code)) return { ok: false, exp: 'Dividí: console.log(120 / 4);' };
      if (!out.includes('120') || !out.includes('30')) return { ok: false, exp: 'Debe mostrar 120 y 30' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>El + suma (6 + 20 = 26) y el * multiplica (120 * 4 = 480), no al revés. Con los operadores correctos: 6 * 20 = 120 y 120 / 4 = 30.</p>'
},
{
  id: 'm1-08', mundo: 1, titulo: '=== estricto para comparar',
  historia: 'El sistema de puntos acepta "5" (texto) como si fuera 5 (número) y deja pasar a un cliente que no debería entrar. Hay que hacer la comparación estricta.',
  objetivo: 'Usar === en la condición para que el texto "5" sea rechazado y se muestre "Inválido".',
  xp: 18,
  pistas: ['== compara valores aunque los tipos sean distintos.', '=== compara valor Y tipo.', 'Escribí: if (puntos === 5) { ... }'],
  aprender: '<h3>== vs ===</h3><p><code>==</code> compara convirtiendo tipos (<code>"5" == 5</code> es true). <code>===</code> es <strong>estricto</strong>: exige mismo valor y mismo tipo (<code>"5" === 5</code> es false). Siempre conviene usar ===.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>let puntos = "5";\nif (puntos === 5) {\n  console.log("Válido");\n} else {\n  console.log("Inválido");\n}</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>let puntos = "5";\nif (puntos == 5) {\n  console.log("Válido");\n} else {\n  console.log("Inválido");\n}</code></pre><p>¿Por qué el texto "5" pasa como si fuera el número 5?</p>',
  reparar: {
    codigoInicial: 'let puntos = "5";\nif (puntos == 5) {\n  console.log("Válido");\n} else {\n  console.log("Inválido");\n}',
    validar: function (out, code) {
      if (!/puntos\s*===\s*5/.test(code)) return { ok: false, exp: 'Usá el comparador estricto: if (puntos === 5)' };
      if (!out.includes('Inválido')) return { ok: false, exp: 'Debe mostrar Inválido porque "5" no es el número 5' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p><code>==</code> convierte el string "5" a número antes de comparar, y da true. <code>===</code> compara sin convertir: string y number nunca son iguales, así que cae al else y muestra "Inválido".</p>'
},
{
  id: 'm1-09', mundo: 1, titulo: 'Descuento con if y else',
  historia: 'La caja debe avisar si aplica el descuento mayorista cuando el total supera los $1000, y decir "Sin descuento" cuando no. Hoy no muestra nada cuando la condición es falsa.',
  objetivo: 'Completar el else para que con total = 800 se muestre "Sin descuento".',
  xp: 19,
  pistas: ['La estructura es if (condición) { } else { }', 'Cuando la condición es falsa, se ejecuta el bloque else.', 'Agregá: else { console.log("Sin descuento"); }'],
  aprender: '<h3>if / else</h3><p><code>if</code> ejecuta un bloque si la condición es verdadera. <code>else</code> ejecuta el otro bloque cuando es falsa. Así el programa puede tomar dos caminos.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>let total = 800;\nif (total > 1000) {\n  console.log("Descuento mayorista");\n} else {\n  console.log("Sin descuento");\n}</code></pre>',
  detectar: '<h3>Código incompleto</h3><pre><code>let total = 800;\nif (total > 1000) {\n  console.log("Descuento mayorista");\n}</code></pre><p>¿Qué pasa cuando la condición es falsa y no hay else?</p>',
  reparar: {
    codigoInicial: 'let total = 800;\nif (total > 1000) {\n  console.log("Descuento mayorista");\n}',
    validar: function (out, code) {
      if (!/else\s*\{/.test(code)) return { ok: false, exp: 'Falta el else: else { console.log("Sin descuento"); }' };
      if (!/console\.log\(\s*["']Sin descuento["']\s*\)/.test(code)) return { ok: false, exp: 'En el else mostrá "Sin descuento"' };
      if (!out.includes('Sin descuento')) return { ok: false, exp: 'Debe mostrar Sin descuento' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>Sin <code>else</code>, cuando la condición es falsa no se ejecuta nada. Al agregar el else, el programa tiene respuesta para los dos caminos: 800 no supera 1000, así que muestra "Sin descuento".</p>'
},
{
  id: 'm1-10', mundo: 1, titulo: 'Acceso con && y ||',
  historia: 'La caja fuerte de la tienda se abre si el empleado es mayor de edad Y tiene la clave correcta. Hoy se abrió con cualquiera de las dos cosas y entró un empleado de 12 años.',
  objetivo: 'Corregir la condición con && para que solo se abra con edad >= 18 y clave "1234".',
  xp: 19,
  pistas: ['&& significa "y": ambas condiciones deben ser verdaderas.', '|| significa "o": basta una condición.', 'Escribí: if (edad >= 18 && clave === "1234")'],
  aprender: '<h3>Operadores lógicos</h3><p><code>&&</code> (y lógico) exige que <strong>ambas</strong> condiciones sean true. <code>||</code> (o lógico) basta con que una sea true. <code>!</code> invierte un valor booleano.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>let edad = 12;\nlet clave = "1234";\nif (edad >= 18 && clave === "1234") {\n  console.log("Caja abierta");\n} else {\n  console.log("Acceso denegado");\n}</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>let edad = 12;\nlet clave = "1234";\nif (edad >= 18 || clave === "1234") {\n  console.log("Caja abierta");\n} else {\n  console.log("Acceso denegado");\n}</code></pre><p>Un empleado de 12 años con la clave correcta ¿debería abrir la caja?</p>',
  reparar: {
    codigoInicial: 'let edad = 12;\nlet clave = "1234";\nif (edad >= 18 || clave === "1234") {\n  console.log("Caja abierta");\n} else {\n  console.log("Acceso denegado");\n}',
    validar: function (out, code) {
      if (!/edad\s*>=\s*18\s*&&\s*clave\s*===\s*["']1234["']/.test(code.replace(/\n/g, ' '))) return { ok: false, exp: 'Uní las condiciones con &&: if (edad >= 18 && clave === "1234")' };
      if (!out.includes('Acceso denegado')) return { ok: false, exp: 'Debe mostrar Acceso denegado (edad 12 no alcanza)' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>Con <code>||</code> basta con una condición verdadera, y la clave era correcta, así que se abría igual. Con <code>&&</code> las dos deben cumplirse: edad 12 no llega a 18, así que muestra "Acceso denegado".</p>'
},
{
  id: 'm1-11', mundo: 1, titulo: 'Repetir con el bucle for',
  historia: 'Hay que mostrar los 3 productos destacados del día. El programador escribió el bucle pero la condición está mal y solo aparecen dos productos.',
  objetivo: 'Corregir el bucle for para que muestre "Producto 1", "Producto 2" y "Producto 3".',
  xp: 20,
  pistas: ['La estructura es for (let i = 1; i <= 3; i++).', 'El bucle debe llegar hasta el 3.', 'Cambiá la condición a i <= 3 (o i < 4).'],
  aprender: '<h3>El bucle for</h3><p>El <code>for</code> repite código. Tiene tres partes: inicio (<code>let i = 1</code>), condición (<code>i <= 3</code>) y paso (<code>i++</code>). Repite mientras la condición sea verdadera.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>for (let i = 1; i <= 3; i++) {\n  console.log("Producto " + i);\n}</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>for (let i = 1; i < 3; i++) {\n  console.log("Producto " + i);\n}</code></pre><p>Solo muestra Producto 1 y 2. ¿Cómo hago para que llegue al 3?</p>',
  reparar: {
    codigoInicial: 'for (let i = 1; i < 3; i++) {\n  console.log("Producto " + i);\n}',
    validar: function (out, code) {
      if (!/i\s*<=\s*3/.test(code) && !/i\s*<\s*4/.test(code)) return { ok: false, exp: 'La condición debe alcanzar el 3: i <= 3' };
      if (!out.includes('Producto 3')) return { ok: false, exp: 'Debe mostrar Producto 3' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p><code>i < 3</code> se detiene cuando i vale 3, y como la impresión queda afuera del rango, nunca muestra "Producto 3". Con <code>i <= 3</code> (o <code>i < 4</code>) el bucle incluye el 3.</p>'
},
{
  id: 'm1-12', mundo: 1, titulo: 'Reintentos con while',
  historia: 'El sistema de envíos debe reintentar conectar con el servidor hasta 3 veces. El while está escrito al revés y nunca se ejecuta.',
  objetivo: 'Corregir la condición del while para que intente exactamente 3 veces y muestre "Intento 1", "Intento 2" y "Intento 3".',
  xp: 20,
  pistas: ['El while repite mientras la condición sea verdadera.', 'intentos empieza en 0, así que la condición debe ser intentos < 3.', 'No olvides incrementar intentos dentro del bloque.'],
  aprender: '<h3>El bucle while</h3><p><code>while</code> repite un bloque <strong>mientras</strong> una condición sea true. Es fundamental incrementar el contador dentro del bloque, o el bucle será infinito.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>let intentos = 0;\nwhile (intentos < 3) {\n  intentos++;\n  console.log("Intento " + intentos);\n}</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>let intentos = 0;\nwhile (intentos > 3) {\n  intentos++;\n  console.log("Intento " + intentos);\n}</code></pre><p>intentos empieza en 0. ¿Se cumple 0 > 3? ¿Cuál debería ser la condición?</p>',
  reparar: {
    codigoInicial: 'let intentos = 0;\nwhile (intentos > 3) {\n  intentos++;\n  console.log("Intento " + intentos);\n}',
    validar: function (out, code) {
      if (!/while\s*\(\s*intentos\s*<\s*3\s*\)/.test(code)) return { ok: false, exp: 'La condición debe ser intentos < 3' };
      if (!/intentos\s*(\+\+|\+=\s*1|\s*=\s*intentos\s*\+\s*1)/.test(code)) return { ok: false, exp: 'No olvides incrementar intentos dentro del while' };
      if (!out.includes('Intento 3')) return { ok: false, exp: 'Debe mostrar Intento 3' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p><code>intentos > 3</code> es falsa desde el principio (0 no es mayor que 3), así que el while no entra nunca. Con <code>intentos < 3</code> se repite 3 veces y muestra Intento 1, 2 y 3.</p>'
},
{
  id: 'm1-13', mundo: 1, titulo: 'Funciones que devuelven',
  historia: 'La función calcularEnvio debe devolver el precio más $50 de envío, pero devuelve undefined y la caja falla al cobrar.',
  objetivo: 'Agregar return para que la función devuelva el total y mostrarlo con console.log (250).',
  xp: 21,
  pistas: ['return devuelve un valor desde la función.', 'Sin return, la función devuelve undefined.', 'Escribí: return precio + 50;'],
  aprender: '<h3>Funciones y return</h3><p>Una <strong>función</strong> agrupa código reutilizable. <code>return</code> devuelve un valor al lugar donde se la llamó. Sin return, devuelve <code>undefined</code>.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>function calcularEnvio(precio) {\n  return precio + 50;\n}\nconsole.log(calcularEnvio(200)); // 250</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>function calcularEnvio(precio) {\n  precio + 50;\n}\nconsole.log(calcularEnvio(200));</code></pre><p>La función calcula algo pero no lo devuelve. ¿Qué palabra falta?</p>',
  reparar: {
    codigoInicial: 'function calcularEnvio(precio) {\n  precio + 50;\n}\nconsole.log(calcularEnvio(200));',
    validar: function (out, code) {
      if (!/return\s+precio\s*\+\s*50/.test(code)) return { ok: false, exp: 'Devolvé el resultado: return precio + 50;' };
      if (!out.includes('250')) return { ok: false, exp: 'Debe mostrar 250' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p><code>precio + 50</code> calcula un valor pero lo descarta: sin <code>return</code>, la función devuelve undefined y la caja recibe nada. Con return, calcularEnvio(200) devuelve 250.</p>'
},
{
  id: 'm1-14', mundo: 1, titulo: 'El array de productos',
  historia: 'El catálogo de la tienda necesita guardar tres productos juntos, pero el código usa paréntesis en vez de corchetes y pierde los datos.',
  objetivo: 'Declarar el array productos con ["Mouse", "Teclado", "Monitor"] y mostrar el primero.',
  xp: 21,
  pistas: ['Los arrays se declaran con corchetes [].', 'Los elementos se separan con comas.', 'Escribí: let productos = ["Mouse", "Teclado", "Monitor"]; console.log(productos[0]);'],
  aprender: '<h3>Arrays: listas de valores</h3><p>Un <strong>array</strong> guarda varios valores en una sola variable. Se declara con corchetes y se lee un elemento con su índice entre corchetes.</p><pre><code>let frutas = ["manzana", "banana"];\nconsole.log(frutas[0]); // manzana</code></pre>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>let productos = ["Mouse", "Teclado", "Monitor"];\nconsole.log(productos[0]); // Mouse</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>let productos = ("Mouse", "Teclado", "Monitor");\nconsole.log(productos[0]);</code></pre><p>¿Con qué símbolos se declara un array?</p>',
  reparar: {
    codigoInicial: 'let productos = ("Mouse", "Teclado", "Monitor");\nconsole.log(productos[0]);',
    validar: function (out, code) {
      if (!/let\s+productos\s*=\s*\[/.test(code)) return { ok: false, exp: 'Declará el array con corchetes: ["Mouse", "Teclado", "Monitor"]' };
      if (!/console\.log\(\s*productos\s*\[\s*0\s*\]\s*\)/.test(code)) return { ok: false, exp: 'Mostrá el primero: console.log(productos[0]);' };
      if (!out.includes('Mouse')) return { ok: false, exp: 'Debe mostrar Mouse' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>Los paréntesis <code>(...)</code> no crean un array. Con corchetes <code>[...]</code>, productos[0] devuelve el primer elemento "Mouse".</p>'
},
{
  id: 'm1-15', mundo: 1, titulo: 'Índices y longitud',
  historia: 'El sistema quiere mostrar el último producto del catálogo, pero al usar un índice fuera de rango obtiene undefined porque los arrays empiezan en 0.',
  objetivo: 'Leer el último elemento usando frutas[frutas.length - 1] y mostrar "Durazno".',
  xp: 22,
  pistas: ['Los índices empiezan en 0.', 'length devuelve la cantidad de elementos.', 'El último elemento está en el índice length - 1.'],
  aprender: '<h3>Índices y length</h3><p>Los índices del array empiezan en <strong>0</strong>. <code>array.length</code> da la cantidad de elementos. El último siempre está en <code>array.length - 1</code>.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>let frutas = ["Manzana", "Banana", "Durazno"];\nconsole.log(frutas[frutas.length - 1]); // Durazno</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>let frutas = ["Manzana", "Banana", "Durazno"];\nconsole.log(frutas[frutas.length]);</code></pre><p>Si length es 3, ¿cuál es el índice del último elemento?</p>',
  reparar: {
    codigoInicial: 'let frutas = ["Manzana", "Banana", "Durazno"];\nconsole.log(frutas[frutas.length]);',
    validar: function (out, code) {
      if (!/frutas\s*\[\s*frutas\.length\s*-\s*1\s*\]/.test(code)) return { ok: false, exp: 'El último índice es length - 1: frutas[frutas.length - 1]' };
      if (!out.includes('Durazno')) return { ok: false, exp: 'Debe mostrar Durazno' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>Los índices válidos de un array de 3 elementos son 0, 1 y 2. <code>frutas.length</code> es 3, y el índice 3 no existe (da undefined). Usando <code>length - 1</code> siempre accedés al último.</p>'
},
{
  id: 'm1-16', mundo: 1, titulo: 'push y pop en el carrito',
  historia: 'El carrito de compras debe agregar "Cable HDMI" al final de la lista, pero el programador usó pop (que quita) en vez de push (que agrega).',
  objetivo: 'Usar push para agregar "Cable HDMI" al array carrito y mostrar la cantidad de productos (3).',
  xp: 22,
  pistas: ['push agrega un elemento al final.', 'pop quita el último elemento.', 'Escribí: carrito.push("Cable HDMI"); console.log(carrito.length);'],
  aprender: '<h3>push y pop</h3><p><code>push()</code> agrega un elemento al <strong>final</strong> del array. <code>pop()</code> quita el último. Son los métodos más usados para listas que crecen y decrecen.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>let carrito = ["Teclado", "Mouse"];\ncarrito.push("Cable HDMI");\nconsole.log(carrito.length); // 3</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>let carrito = ["Teclado", "Mouse"];\ncarrito.pop("Cable HDMI");\nconsole.log(carrito.length);</code></pre><p>pop quita el último y el argumento se ignora. ¿Qué método agrega en su lugar?</p>',
  reparar: {
    codigoInicial: 'let carrito = ["Teclado", "Mouse"];\ncarrito.pop("Cable HDMI");\nconsole.log(carrito.length);',
    validar: function (out, code) {
      if (!/carrito\.push\s*\(\s*["']Cable HDMI["']\s*\)/.test(code)) return { ok: false, exp: 'Agregá con push: carrito.push("Cable HDMI");' };
      if (!out.includes('3')) return { ok: false, exp: 'Debe mostrar 3 (los 3 productos del carrito)' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p><code>pop()</code> no agrega: quita el último elemento (y el argumento "Cable HDMI" se ignora). Con <code>push()</code> el array pasa de 2 a 3 elementos y length muestra 3.</p>'
},
{
  id: 'm1-17', mundo: 1, titulo: 'Ficha de producto con objetos',
  historia: 'Cada producto de la tienda tiene nombre y precio. El programador intenta leer el precio como si fuera un array y obtiene undefined.',
  objetivo: 'Leer el precio del objeto con producto.precio y mostrar 2500.',
  xp: 23,
  pistas: ['Los objetos usan llaves {} con pares clave: valor.', 'Se accede con punto: objeto.clave', 'Escribí: console.log(producto.precio);'],
  aprender: '<h3>Objetos clave: valor</h3><p>Un <strong>objeto</strong> agrupa datos con nombre (clave) y valor. Se lee cada valor con la clave usando punto o corchetes con string.</p><pre><code>let producto = { nombre: "Mouse", precio: 2500 };\nconsole.log(producto.precio); // 2500</code></pre>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>let producto = { nombre: "Mouse", precio: 2500 };\nconsole.log(producto.precio); // 2500</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>let producto = { nombre: "Mouse", precio: 2500 };\nconsole.log(producto[0]);</code></pre><p>producto no es un array. ¿Cómo se accede a la clave "precio"?</p>',
  reparar: {
    codigoInicial: 'let producto = { nombre: "Mouse", precio: 2500 };\nconsole.log(producto[0]);',
    validar: function (out, code) {
      if (!/producto\s*(\.precio|\[\s*["']precio["']\s*\])/.test(code)) return { ok: false, exp: 'Accedé con producto.precio o producto["precio"]' };
      if (!out.includes('2500')) return { ok: false, exp: 'Debe mostrar 2500' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>El índice <code>[0]</code> es para arrays. Los objetos se acceden por su <strong>clave</strong>: <code>producto.precio</code> devuelve 2500.</p>'
},
{
  id: 'm1-18', mundo: 1, titulo: 'Unir strings y variables',
  historia: 'La etiqueta del producto debe decir "Mouse cuesta $2500", pero el cartel sale pegado: "Mousecuesta$2500". Los espacios se perdieron.',
  objetivo: 'Concatenar nombre, texto y precio con espacios para mostrar: Mouse cuesta $2500',
  xp: 23,
  pistas: ['El operador + une strings y variables.', 'Los espacios van dentro de las comillas.', 'Escribí: console.log(nombre + " cuesta $" + precio);'],
  aprender: '<h3>Concatenación</h3><p>El <code>+</code> une (concatena) strings. Los espacios deben escribirse <strong>dentro</strong> de las comillas, porque el + no agrega espacios solo.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>let nombre = "Mouse";\nlet precio = 2500;\nconsole.log(nombre + " cuesta $" + precio); // Mouse cuesta $2500</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>let nombre = "Mouse";\nlet precio = 2500;\nconsole.log(nombre + "cuesta$" + precio);</code></pre><p>¿Dónde deberían estar los espacios del mensaje?</p>',
  reparar: {
    codigoInicial: 'let nombre = "Mouse";\nlet precio = 2500;\nconsole.log(nombre + "cuesta$" + precio);',
    validar: function (out, code) {
      if (!/["'] cuesta \$["']/.test(code)) return { ok: false, exp: 'Los espacios van en el texto: " cuesta $"' };
      if (!out.includes('Mouse cuesta $2500')) return { ok: false, exp: 'Debe mostrar: Mouse cuesta $2500' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>El <code>+</code> pega las partes sin agregar espacios. La solución es escribir los espacios <strong>dentro</strong> de las comillas: <code>" cuesta $"</code>.</p>'
},
{
  id: 'm1-19', mundo: 1, titulo: 'Etiquetas de texto en HTML',
  historia: 'El banner de la tienda debe tener un título grande, un párrafo y una palabra resaltada, pero todo se ve plano y sin formato.',
  objetivo: 'Usar h1, p y strong para dar formato al texto del banner.',
  xp: 24,
  pistas: ['h1 es el título principal.', 'p es un párrafo.', 'strong resalta en negrita: <strong>oferta</strong>'],
  aprender: '<h3>Etiquetas de texto</h3><p>HTML tiene etiquetas con significado: <code>&lt;h1&gt;</code> título principal, <code>&lt;p&gt;</code> párrafo y <code>&lt;strong&gt;</code> texto destacado (negrita semántica). Cada una se cierra con su barra.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>&lt;h1&gt;Ofertas de la semana&lt;/h1&gt;\n&lt;p&gt;Aprovechá &lt;strong&gt;hasta 50% OFF&lt;/strong&gt; en accesorios.&lt;/p&gt;</code></pre>',
  detectar: '<h3>Código con formato roto</h3><pre><code>Ofertas de la semana\nAprovechá hasta 50% OFF en accesorios.</code></pre><p>Todo el texto está plano. ¿Qué etiquetas HTML le dan estructura y énfasis?</p>',
  reparar: {
    codigoInicial: 'Ofertas de la semana\nAprovechá hasta 50% OFF en accesorios.',
    validar: function (out, code) {
      if (!/<h1>[\s\S]*<\/h1>/.test(code)) return { ok: false, exp: 'Envolvé el título con <h1>...</h1>' };
      if (!/<p>[\s\S]*<\/p>/.test(code)) return { ok: false, exp: 'Envolvé el párrafo con <p>...</p>' };
      if (!/<strong>[\s\S]*<\/strong>/.test(code)) return { ok: false, exp: 'Resaltá la parte importante con <strong>...</strong>' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>El texto sin etiquetas no tiene significado para el navegador. Con <code>&lt;h1&gt;</code> se marca el título principal, con <code>&lt;p&gt;</code> el párrafo y con <code>&lt;strong&gt;</code> el texto destacado en negrita.</p>'
},
{
  id: 'm1-20', mundo: 1, titulo: 'Listas con ul y li',
  historia: 'La lista de compras del proyecto se ve como un bloque de texto pegado. Hay que convertirla en una lista HTML real con viñetas.',
  objetivo: 'Crear una lista desordenada ul con tres elementos li: Mouse, Teclado y Monitor.',
  xp: 24,
  pistas: ['ul crea una lista desordenada (con viñetas).', 'Cada item va dentro de una etiqueta li.', 'Escribí: <ul><li>Mouse</li><li>Teclado</li><li>Monitor</li></ul>'],
  aprender: '<h3>Listas en HTML</h3><p><code>&lt;ul&gt;</code> crea una lista <strong>desordenada</strong> (viñetas) y <code>&lt;ol&gt;</code> una ordenada (números). Dentro, cada item se envuelve en <code>&lt;li&gt;</code>.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>&lt;ul&gt;\n  &lt;li&gt;Mouse&lt;/li&gt;\n  &lt;li&gt;Teclado&lt;/li&gt;\n  &lt;li&gt;Monitor&lt;/li&gt;\n&lt;/ul&gt;</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>&lt;ul&gt;\n  Mouse\n  Teclado\n  Monitor\n&lt;/ul&gt;</code></pre><p>Los items están sueltos dentro de ul. ¿Qué etiqueta envuelve cada item?</p>',
  reparar: {
    codigoInicial: '<ul>\n  Mouse\n  Teclado\n  Monitor\n</ul>',
    validar: function (out, code) {
      if (!/<ul>[\s\S]*<\/ul>/.test(code) && !/<ol>[\s\S]*<\/ol>/.test(code)) return { ok: false, exp: 'Usá la lista: <ul>...</ul>' };
      var items = code.match(/<li>[\s\S]*?<\/li>/g) || [];
      if (items.length < 3) return { ok: false, exp: 'Cada producto debe estar en su propia etiqueta <li>' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>Dentro de <code>&lt;ul&gt;</code> cada item debe ir en <code>&lt;li&gt;</code>. Sin esas etiquetas, el navegador muestra todo el texto junto sin viñetas.</p>'
},
{
  id: 'm1-21', mundo: 1, titulo: 'Enlaces e imágenes',
  historia: 'La página de contacto necesita un enlace al sitio y el logo de la tienda, pero el enlace no sabe a dónde lleva y la imagen no tiene texto alternativo.',
  objetivo: 'Agregar href al enlace y alt a la imagen del logo.',
  xp: 25,
  pistas: ['El enlace necesita el atributo href con la dirección.', 'La imagen necesita el atributo alt (texto alternativo).', 'Escribí: <a href="https://tienda.com">Sitio</a> y <img src="logo.png" alt="Logo">'],
  aprender: '<h3>Enlaces e imágenes</h3><p><code>&lt;a&gt;</code> crea enlaces y necesita el atributo <code>href</code>. <code>&lt;img&gt;</code> inserta imágenes (no se cierra) y debe llevar <code>alt</code> con una descripción, fundamental para accesibilidad.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>&lt;a href="https://tiendavirtus.com"&gt;Visitanos&lt;/a&gt;\n&lt;img src="logo.png" alt="Logo de TiendaVirtus"&gt;</code></pre>',
  detectar: '<h3>Código incompleto</h3><pre><code>&lt;a&gt;Visitanos&lt;/a&gt;\n&lt;img src="logo.png"&gt;</code></pre><p>¿Qué atributos faltan: uno en el enlace y otro en la imagen?</p>',
  reparar: {
    codigoInicial: '<a>Visitanos</a>\n<img src="logo.png">',
    validar: function (out, code) {
      if (!/<a[^>]*href=/.test(code)) return { ok: false, exp: 'Agregá href al enlace: <a href="https://tiendavirtus.com">Visitanos</a>' };
      if (!/<img[^>]*alt=/.test(code)) return { ok: false, exp: 'Agregá alt a la imagen: <img src="logo.png" alt="Logo de TiendaVirtus">' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>Sin <code>href</code>, el enlace no tiene destino. Sin <code>alt</code>, las personas con lector de pantalla y el navegador no saben qué muestra la imagen. Ambos atributos son obligatorios para una buena página.</p>'
},
{
  id: 'm1-22', mundo: 1, titulo: 'Formulario: inputs y botones',
  historia: 'El formulario de contacto de la tienda no funciona: el campo de texto no tiene tipo y el botón de envío quedó sin cerrar.',
  objetivo: 'Dar type="text" al input y cerrar correctamente el botón Comprar.',
  xp: 25,
  pistas: ['El input necesita el atributo type.', 'Toda etiqueta que se abre debe cerrarse: </button>.', 'Escribí: <input type="text"> y <button type="button">Comprar</button>'],
  aprender: '<h3>Inputs y botones</h3><p><code>&lt;input&gt;</code> crea campos de formulario y usa <code>type</code> para definir el tipo (text, number...). <code>&lt;button&gt;</code> crea botones y debe cerrarse con <code>&lt;/button&gt;</code>.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>&lt;input type="text" placeholder="Tu nombre"&gt;\n&lt;button type="button"&gt;Comprar&lt;/button&gt;</code></pre>',
  detectar: '<h3>Código incompleto</h3><pre><code>&lt;input placeholder="Tu nombre"&gt;\n&lt;button type="button"&gt;Comprar</code></pre><p>Al input le falta el tipo y al botón le falta el cierre. ¿Cuáles son?</p>',
  reparar: {
    codigoInicial: '<input placeholder="Tu nombre">\n<button type="button">Comprar',
    validar: function (out, code) {
      if (!/<input[^>]*type=/.test(code)) return { ok: false, exp: 'Agregá type al input: <input type="text" placeholder="Tu nombre">' };
      if (!/<button[^>]*>\s*Comprar\s*<\/button>/.test(code)) return { ok: false, exp: 'Cerrá el botón: <button type="button">Comprar</button>' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>Sin <code>type</code>, el input no sabe qué clase de dato espera. Y una etiqueta <code>&lt;button&gt;</code> sin <code>&lt;/button&gt;</code> rompe la estructura del resto de la página.</p>'
},
{
  id: 'm1-23', mundo: 1, titulo: 'De texto a número: parseInt',
  historia: 'El formulario devuelve el precio como texto y al sumar 100 + 50 el sistema muestra "10050" en vez de 150. Hay que convertir el dato.',
  objetivo: 'Convertir el texto a número con parseInt (o parseFloat) para que la suma dé 150.',
  xp: 26,
  pistas: ['parseInt convierte un string a número entero.', 'Se usa así: parseInt(texto)', 'Escribí: let total = parseInt(precioTexto) + 50; console.log(total);'],
  aprender: '<h3>parseInt y parseFloat</h3><p>Los datos de formularios llegan como <strong>texto</strong>. <code>parseInt()</code> convierte a número entero y <code>parseFloat()</code> a número con decimales. Sin convertir, el + concatena en vez de sumar.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>let precioTexto = "100";\nlet total = parseInt(precioTexto) + 50;\nconsole.log(total); // 150</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>let precioTexto = "100";\nlet total = precioTexto + 50;\nconsole.log(total);</code></pre><p>¿Por qué muestra "10050" y no 150?</p>',
  reparar: {
    codigoInicial: 'let precioTexto = "100";\nlet total = precioTexto + 50;\nconsole.log(total);',
    validar: function (out, code) {
      if (!/parseInt\s*\(\s*precioTexto\s*\)/.test(code)) return { ok: false, exp: 'Convertí el texto a número: parseInt(precioTexto)' };
      if (!out.includes('150')) return { ok: false, exp: 'Debe mostrar 150' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>Como precioTexto es un string, el + une en vez de sumar: "100" + 50 = "10050". Con <code>parseInt()</code> se convierte a número 100, y 100 + 50 = 150.</p>'
},
{
  id: 'm1-24', mundo: 1, titulo: 'Dado aleatorio con Math',
  historia: 'El mini juego de la tienda necesita un número aleatorio del 1 al 6, como un dado. El código usa un método que no existe y no redondea el resultado.',
  objetivo: 'Corregir Math.rand() por Math.random() y redondear con Math.round para obtener un dado del 1 al 6.',
  xp: 26,
  pistas: ['El método se escribe Math.random() con "om".', 'Math.random da un decimal entre 0 y 1.', 'Multiplicá por 5, redondeá con Math.round y sumá 1.'],
  aprender: '<h3>Math.random y Math.round</h3><p><code>Math.random()</code> devuelve un decimal entre 0 (inclusive) y 1 (exclusive). <code>Math.round()</code> redondea al entero más cercano. Juntos simulan un dado: <code>Math.round(Math.random() * 5) + 1</code>.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>let dado = Math.round(Math.random() * 5) + 1;\nconsole.log("Dado: " + dado);</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>let dado = Math.rand() * 5 + 1;\nconsole.log("Dado: " + dado);</code></pre><p>Math.rand() no existe. ¿Cómo se llama el método real y cómo se redondea el resultado?</p>',
  reparar: {
    codigoInicial: 'let dado = Math.rand() * 5 + 1;\nconsole.log("Dado: " + dado);',
    validar: function (out, code) {
      if (!/Math\.random\s*\(\s*\)/.test(code)) return { ok: false, exp: 'El método es Math.random() (con "om")' };
      if (!/Math\.round\s*\(/.test(code)) return { ok: false, exp: 'Redondeá con Math.round: Math.round(Math.random() * 5) + 1' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p><code>Math.rand()</code> no existe: el método se llama <code>Math.random()</code>. Además, random devuelve un decimal largo, así que hay que redondear con <code>Math.round()</code> para obtener un número entero del 1 al 6.</p>'
},
{
  id: 'm1-25', mundo: 1, titulo: 'switch: un case por clima',
  historia: 'El asistente de la tienda clasifica el clima con un switch, pero con "soleado" muestra todos los mensajes seguidos.',
  objetivo: 'Agregar break en cada case para que solo se ejecute el case que coincide.',
  xp: 27,
  pistas: ['Sin break, el switch "se desborda" al siguiente case.', 'Cada case debe terminar con break;', 'Agregá break después de cada console.log del switch.'],
  aprender: '<h3>El switch</h3><p><code>switch</code> compara un valor con varios <code>case</code>. Si no hay <code>break</code>, sigue ejecutando los cases siguientes (<strong>fall-through</strong>). <code>default</code> se ejecuta si ningún case coincide.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>let clima = "soleado";\nswitch (clima) {\n  case "soleado":\n    console.log("Llevar agua");\n    break;\n  case "nublado":\n    console.log("Llevar paraguas");\n    break;\n  default:\n    console.log("Clima desconocido");\n}</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>let clima = "soleado";\nswitch (clima) {\n  case "soleado":\n    console.log("Llevar agua");\n  case "nublado":\n    console.log("Llevar paraguas");\n  default:\n    console.log("Clima desconocido");\n}</code></pre><p>Imprime los TRES mensajes. ¿Qué palabra corta falta en cada case?</p>',
  reparar: {
    codigoInicial: 'let clima = "soleado";\nswitch (clima) {\n  case "soleado":\n    console.log("Llevar agua");\n  case "nublado":\n    console.log("Llevar paraguas");\n  default:\n    console.log("Clima desconocido");\n}',
    validar: function (out, code) {
      var breaks = code.match(/break\s*;/g) || [];
      if (breaks.length < 2) return { ok: false, exp: 'Falta break; después de cada case (el default no lo necesita)' };
      if (!out.includes('Llevar agua')) return { ok: false, exp: 'Debe mostrar Llevar agua' };
      if (out.includes('Llevar paraguas')) return { ok: false, exp: 'No debe mostrar Llevar paraguas: falta break' };
      if (out.includes('Clima desconocido')) return { ok: false, exp: 'No debe ejecutar el default cuando coincide un case' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>Sin <code>break</code>, cuando coincide el case "soleado" el programa sigue cayendo en los cases siguientes (fall-through) y ejecuta todo. Con <code>break</code> se corta la ejecución del switch en el case que coincidió.</p>'
},
{
  id: 'm1-26', mundo: 1, titulo: 'break y continue',
  historia: 'El contador de visitas debe mostrar los números del 1 al 10 pero detenerse en el 5. Hoy usa continue y sigue de largo hasta el 10.',
  objetivo: 'Reemplazar continue por break para que el bucle se detenga al llegar a 5.',
  xp: 27,
  pistas: ['continue salta a la siguiente vuelta del bucle.', 'break detiene el bucle completamente.', 'Escribí: if (i === 5) break;'],
  aprender: '<h3>break y continue</h3><p><code>continue</code> <strong>salta</strong> al siguiente ciclo sin ejecutar el resto del bloque. <code>break</code> <strong>detiene</strong> el bucle por completo y sale de él.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>for (let i = 1; i <= 10; i++) {\n  if (i === 5) break;\n  console.log(i);\n}</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>for (let i = 1; i <= 10; i++) {\n  if (i === 5) continue;\n  console.log(i);\n}</code></pre><p>continue solo salta el 5 pero el bucle sigue. ¿Cómo se detiene por completo?</p>',
  reparar: {
    codigoInicial: 'for (let i = 1; i <= 10; i++) {\n  if (i === 5) continue;\n  console.log(i);\n}',
    validar: function (out, code) {
      if (!/break\s*;/.test(code)) return { ok: false, exp: 'Detené el bucle con break: if (i === 5) break;' };
      if (!out.includes('4')) return { ok: false, exp: 'Debe mostrar los números hasta el 4' };
      if (out.includes('6')) return { ok: false, exp: 'No debe continuar después del 5: usá break, no continue' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p><code>continue</code> solo omite la impresión del 5, pero el bucle sigue hasta el 10. <code>break</code> corta el for por completo, así que imprime 1, 2, 3 y 4, y al llegar a 5 sale del bucle.</p>'
},
{
  id: 'm1-27', mundo: 1, titulo: 'Alcance de las variables',
  historia: 'El descuento se calcula dentro de un bloque if pero se intenta usar afuera y el sistema tira "descuento is not defined".',
  objetivo: 'Declarar descuento fuera del if para que se pueda usar en el console.log final.',
  xp: 28,
  pistas: ['let crea variables con alcance de bloque {...}.', 'Una variable declarada dentro del if no existe afuera.', 'Mové let descuento = 25; antes del if.'],
  aprender: '<h3>Alcance (scope)</h3><p>Las variables declaradas con <code>let</code> o <code>const</code> tienen <strong>alcance de bloque</strong>: solo existen dentro de las llaves donde se declararon. Para usarlas afuera, decláralas antes del bloque.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>let descuento = 25;\nif (descuento > 0) {\n  console.log("Descuento aplicado");\n}\nconsole.log("Valor: " + descuento);</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>if (true) {\n  let descuento = 25;\n}\nconsole.log("Valor: " + descuento);</code></pre><p>descuento se declaró dentro de las llaves del if. ¿Dónde debería declararse?</p>',
  reparar: {
    codigoInicial: 'if (true) {\n  let descuento = 25;\n}\nconsole.log("Valor: " + descuento);',
    validar: function (out, code) {
      var posLet = code.indexOf('let descuento');
      var posIf = code.indexOf('if');
      if (posLet === -1) return { ok: false, exp: 'Declará descuento con let' };
      if (posIf !== -1 && posLet > posIf) return { ok: false, exp: 'Declará descuento ANTES del if para poder usarlo después' };
      if (!out.includes('Valor: 25')) return { ok: false, exp: 'Debe mostrar Valor: 25' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p><code>let descuento</code> estaba dentro de las llaves del if: al cerrarse el bloque, la variable deja de existir. Declarándola afuera (en el ámbito principal), el console.log final puede usarla sin problemas.</p>'
},
{
  id: 'm1-28', mundo: 1, titulo: 'El operador ternario',
  historia: 'El sistema de stock usa un if completo solo para asignar un texto. Quieren la versión corta con el operador ternario.',
  objetivo: 'Reemplazar el if/else por un operador ternario que asigne "Disponible" o "Agotado".',
  xp: 28,
  pistas: ['El ternario tiene la forma: condición ? valorSiTrue : valorSiFalse.', 'Reemplazá todo el if/else por una sola línea.', 'Escribí: let estado = stock > 0 ? "Disponible" : "Agotado";'],
  aprender: '<h3>Operador ternario</h3><p>El ternario es un if en una línea: <code>condición ? valorSiTrue : valorSiFalse</code>. Es ideal cuando hay que asignar un valor según una condición.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>let stock = 0;\nlet estado = stock > 0 ? "Disponible" : "Agotado";\nconsole.log(estado); // Agotado</code></pre>',
  detectar: '<h3>Código verbose</h3><pre><code>let stock = 0;\nlet estado;\nif (stock > 0) {\n  estado = "Disponible";\n} else {\n  estado = "Agotado";\n}\nconsole.log(estado);</code></pre><p>Funciona, pero ocupa 7 líneas. ¿Cómo se escribe en una sola línea con ? y :?</p>',
  reparar: {
    codigoInicial: 'let stock = 0;\nlet estado;\nif (stock > 0) {\n  estado = "Disponible";\n} else {\n  estado = "Agotado";\n}\nconsole.log(estado);',
    validar: function (out, code) {
      if (!/\?\s*["']Disponible["']\s*:\s*["']Agotado["']/.test(code)) return { ok: false, exp: 'Usá el ternario: stock > 0 ? "Disponible" : "Agotado"' };
      if (!out.includes('Agotado')) return { ok: false, exp: 'Con stock 0 debe mostrar Agotado' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>No fallaba: solo era largo. El ternario <code>stock > 0 ? "Disponible" : "Agotado"</code> hace exactamente lo mismo que el if/else, pero en una sola línea. Con stock = 0, la condición es false y el valor después de : es el que se asigna.</p>'
},
{
  id: 'm1-29', mundo: 1, titulo: 'Métodos de strings',
  historia: 'El sistema de búsqueda debe mostrar la longitud de "TiendaVirtus", el nombre en mayúsculas y si contiene la palabra "Virtus". Hoy todo sale mal.',
  objetivo: 'Corregir lenght → length, toLowerCase → toUpperCase y indexOf → includes para que muestre 12, TIENDAVIRTUS y true.',
  xp: 29,
  pistas: ['length se escribe con dos g.', 'toUpperCase convierte a mayúsculas (no toLowerCase).', 'includes devuelve true/false si el texto contiene la palabra.'],
  aprender: '<h3>Métodos de string</h3><p>Los strings tienen métodos útiles: <code>length</code> (cantidad de caracteres), <code>toUpperCase()</code> (mayúsculas), <code>toLowerCase()</code> (minúsculas) e <code>includes()</code> (devuelve true si contiene un texto).</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>let marca = "TiendaVirtus";\nconsole.log(marca.length);\nconsole.log(marca.toUpperCase());\nconsole.log(marca.includes("Virtus"));</code></pre>',
  detectar: '<h3>Código con errores</h3><pre><code>let marca = "TiendaVirtus";\nconsole.log(marca.lenght);\nconsole.log(marca.toLowerCase());\nconsole.log(marca.indexOf("Virtus"));</code></pre><p>Tres errores: un método mal escrito, el contrario del que se pide y uno que devuelve un índice en vez de true/false.</p>',
  reparar: {
    codigoInicial: 'let marca = "TiendaVirtus";\nconsole.log(marca.lenght);\nconsole.log(marca.toLowerCase());\nconsole.log(marca.indexOf("Virtus"));',
    validar: function (out, code) {
      if (!/marca\.length/.test(code)) return { ok: false, exp: 'La longitud es marca.length (con dos g, no lenght)' };
      if (!/marca\.toUpperCase\s*\(\s*\)/.test(code)) return { ok: false, exp: 'Para mayúsculas: marca.toUpperCase()' };
      if (!/marca\.includes\s*\(\s*["']Virtus["']\s*\)/.test(code)) return { ok: false, exp: 'Para saber si contiene: marca.includes("Virtus")' };
      if (!out.includes('12')) return { ok: false, exp: 'Debe mostrar 12 (la longitud de TiendaVirtus)' };
      if (!out.includes('TIENDAVIRTUS')) return { ok: false, exp: 'Debe mostrar TIENDAVIRTUS' };
      if (!out.includes('true')) return { ok: false, exp: 'Debe mostrar true' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>1) <code>lenght</code> es un error de tipeo: se escribe <code>length</code>. 2) <code>toLowerCase()</code> da minúsculas; para mayúsculas se usa <code>toUpperCase()</code>. 3) <code>indexOf()</code> devuelve un número (la posición 6); <code>includes()</code> devuelve true si encuentra el texto.</p>'
},
{
  id: 'm1-30', mundo: 1, titulo: 'Proyecto: lista de precios',
  historia: 'Último desafío: la tienda calcula el total de la compra. La función subtotal no devuelve nada y el total queda en NaN. Arreglala y mostrá el total.',
  objetivo: 'Hacer que la función subtotal devuelva precio * cantidad con return, para que el total sea 250.',
  xp: 30,
  pistas: ['La función calcula precio * cantidad pero no lo devuelve.', 'Falta return antes de la operación.', 'Escribí: return precio * cantidad;'],
  aprender: '<h3>Proyecto integrador</h3><p>Este ejercicio combina variables, funciones, return y concatenación. La función <code>subtotal</code> debe <strong>devolver</strong> el resultado de multiplicar precio por cantidad; sin return devuelve undefined y la suma da NaN.</p>',
  ver: '<h3>Solución completa</h3><pre><code>function subtotal(precio, cantidad) {\n  return precio * cantidad;\n}\nlet item1 = subtotal(100, 2);\nlet item2 = subtotal(50, 1);\nlet total = item1 + item2;\nconsole.log("Total: " + total); // Total: 250</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>function subtotal(precio, cantidad) {\n  precio * cantidad;\n}\nlet item1 = subtotal(100, 2);\nlet item2 = subtotal(50, 1);\nlet total = item1 + item2;\nconsole.log("Total: " + total);</code></pre><p>El total da NaN. ¿Qué le falta a la función para devolver el resultado?</p>',
  reparar: {
    codigoInicial: 'function subtotal(precio, cantidad) {\n  precio * cantidad;\n}\nlet item1 = subtotal(100, 2);\nlet item2 = subtotal(50, 1);\nlet total = item1 + item2;\nconsole.log("Total: " + total);',
    validar: function (out, code) {
      if (!/return\s+precio\s*\*\s*cantidad/.test(code)) return { ok: false, exp: 'Devolvé el resultado: return precio * cantidad;' };
      if (!out.includes('Total: 250')) return { ok: false, exp: 'Debe mostrar Total: 250' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>Sin <code>return</code>, subtotal devolvía undefined y undefined + undefined da NaN. Con <code>return precio * cantidad</code>, subtotal(100, 2) da 200 y subtotal(50, 1) da 50; el total es 250 y se muestra "Total: 250".</p>'
}
);
