MISIONES.push(
{
  id: 'm2-01', mundo: 2, titulo: 'Comillas olvidadas',
  historia: 'El sistema de mensajes debe mostrar "Error en sensor". Pero al ejecutarlo, salta un error.',
  objetivo: 'Mostrar exactamente: Error en sensor',
  xp: 25,
  pistas: ['Los textos van entre comillas en JavaScript.', 'Faltan las comillas alrededor del mensaje.', 'Escribí: console.log("Error en sensor");'],
  aprender: '<h3>Errores de sintaxis</h3><p>Un <strong>error de sintaxis</strong> ocurre cuando el código no respeta las reglas del lenguaje. JavaScript necesita que los textos estén entre comillas para reconocerlos como <strong>cadenas de texto</strong>.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>console.log("Error en sensor");</code></pre><p>Así el mensaje se muestra sin errores.</p>',
  detectar: '<h3>Código con error</h3><pre><code>console.log(Error en sensor);</code></pre><p>¿Qué le falta al texto para que JavaScript lo interprete correctamente?</p>',
  reparar: {
    codigoInicial: 'console.log(Error en sensor);',
    validar: function (out, code) {
      var limpio = code.replace(/\s+/g, '');
      if (!/console\.log\((["'])Errorensensor\1\)/.test(limpio)) return { ok: false, exp: 'Usá comillas: console.log("Error en sensor");' };
      if (!out.includes('Error en sensor')) return { ok: false, exp: 'Debe mostrar "Error en sensor"' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>Sin comillas, JavaScript trata <code>Error en sensor</code> como nombres de variables o palabras reservadas inválidas. Al poner comillas, se convierte en un <strong>string</strong>.</p><pre><code>console.log("Error en sensor");</code></pre>'
},
{
  id: 'm2-02', mundo: 2, titulo: 'Paréntesis sin cerrar',
  historia: 'El voltímetro virtual debe mostrar "Voltaje OK", pero el editor marca un error de sintaxis.',
  objetivo: 'Corregir el paréntesis de console.log para que el programa funcione.',
  xp: 25,
  pistas: ['Cada paréntesis que abrís, debés cerrarlo.', 'Revisá la cantidad de paréntesis en console.log.', 'Escribí: console.log("Voltaje OK");'],
  aprender: '<h3>Errores de sintaxis: paréntesis</h3><p>Los <strong>paréntesis</strong> indican qué argumentos recibe una función. Si falta cerrar uno, JavaScript no puede analizar la instrucción y tira un error de sintaxis.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>console.log("Voltaje OK");</code></pre><p>Los paréntesis se abren y se cierran correctamente.</p>',
  detectar: '<h3>Código con error</h3><pre><code>console.log("Voltaje OK";</code></pre><p>¿Qué símbolo falta para cerrar la llamada a console.log?</p>',
  reparar: {
    codigoInicial: 'console.log("Voltaje OK";',
    validar: function (out, code) {
      var limpio = code.replace(/\s+/g, '');
      if (!/console\.log\("VoltajeOK"\);?/.test(limpio) && !/console\.log\('VoltajeOK'\);?/.test(limpio)) return { ok: false, exp: 'Cerrá el paréntesis: console.log("Voltaje OK");' };
      if (limpio.indexOf('(') === -1 || limpio.indexOf(')') === -1 || (limpio.indexOf('(') > limpio.indexOf(')'))) return { ok: false, exp: 'Cada ( debe tener su correspondiente )' };
      if (!out.includes('Voltaje OK')) return { ok: false, exp: 'Debe mostrar "Voltaje OK"' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>Falta el paréntesis de cierre <code>)</code> después de la cadena. Además, la instrucción termina con <code>;</code>. Corregido: <code>console.log("Voltaje OK");</code></p>'
},
{
  id: 'm2-03', mundo: 2, titulo: 'Asignación vs comparación',
  historia: 'El circuito debe encenderse solo si la tensión es igual a 5. Pero se enciende siempre.',
  objetivo: 'Usar el operador de comparación === para que la condición sea correcta.',
  xp: 25,
  pistas: ['Un solo = asigna un valor.', 'Para comparar usamos === (estricto).', 'Escribí: if (tension === 5) { console.log("Encender"); }'],
  aprender: '<h3>Errores de lógica: = vs ===</h3><p>El operador <code>=</code> asigna valores. El operador <code>===</code> compara si dos valores son iguales. Usar <code>=</code> dentro de un <code>if</code> cambia la variable y suele dar un resultado inesperado (verdadero en muchos casos).</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>let tension = 5;\nif (tension === 5) {\n  console.log("Encender");\n}</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>let tension = 5;\nif (tension = 5) {\n  console.log("Encender");\n}</code></pre><p>¿Qué operador debería usarse para comparar?</p>',
  reparar: {
    codigoInicial: 'let tension = 5;\nif (tension = 5) {\n  console.log("Encender");\n}',
    validar: function (out, code) {
      if (!/===/.test(code)) return { ok: false, exp: 'Usá === para comparar valores.' };
      if (!/if\s*\(\s*tension\s*===\s*5\s*\)/.test(code)) return { ok: false, exp: 'La condición debe ser (tension === 5)' };
      if (!out.includes('Encender')) return { ok: false, exp: 'Debe mostrar "Encender"' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>Con <code>tension = 5</code> se le asigna 5 a <code>tension</code>. En JavaScript, una asignación devuelve el valor asignado, por eso la condición se evalúa como verdadera y siempre entra al <code>if</code>.</p>'
},
{
  id: 'm2-04', mundo: 2, titulo: 'Variable sin declarar',
  historia: 'Querés mostrar el valor del sensor, pero aparece "sensor is not defined".',
  objetivo: 'Declarar la variable sensor con let antes de usarla.',
  xp: 25,
  pistas: ['Toda variable debe declararse antes de usarla.', 'Podés usar let, const o var.', 'Escribí: let sensor = 300; console.log(sensor);'],
  aprender: '<h3>Errores de referencia</h3><p>Un <strong>ReferenceError</strong> ocurre cuando usás un identificador que no fue declarado. Siempre declará tus variables con <code>let</code>, <code>const</code> o <code>var</code> antes de asignarles o leer su valor.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>let sensor = 300;\nconsole.log(sensor);</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>sensor = 300;\nconsole.log(sensor);</code></pre><p>¿Qué palabra clave falta para declarar la variable?</p>',
  reparar: {
    codigoInicial: 'sensor = 300;\nconsole.log(sensor);',
    validar: function (out, code) {
      if (!/(?:^|[^a-zA-Z0-9_])(let|const|var)\s+sensor\b/.test(code)) return { ok: false, exp: 'Declará la variable con let, const o var: let sensor = 300;' };
      if (!out.includes('300')) return { ok: false, exp: 'Debe mostrar 300' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>Al no declarar <code>sensor</code>, JavaScript no lo reconoce. Declararlo con <code>let sensor = 300;</code> crea el espacio en memoria y permite usarlo.</p>'
},
{
  id: 'm2-05', mundo: 2, titulo: 'Números entre comillas',
  historia: 'La suma de dos valores de sensores da "5030" en lugar de 80.',
  objetivo: 'Sumar 50 + 30 como números para obtener 80.',
  xp: 25,
  pistas: ['Los números van sin comillas.', 'Con comillas, + concatena (une) texto.', 'Escribí: console.log(50 + 30);'],
  aprender: '<h3>Strings vs números</h3><p>Cuando un valor está entre comillas, es una <strong>cadena</strong> (string). Cuando no, es un <strong>número</strong>. El operador <code>+</code> suma números, pero concatena strings.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>console.log(50 + 30); // 80</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>console.log("50" + "30");</code></pre><p>¿Por qué muestra "5030" en vez de 80?</p>',
  reparar: {
    codigoInicial: 'console.log("50" + "30");',
    validar: function (out, code) {
      var limpio = code.replace(/\s+/g, ' ');
      if (!/console\.log\(\s*50\s*\+\s*30\s*\)/.test(limpio)) return { ok: false, exp: 'Quitá las comillas: console.log(50 + 30);' };
      if (!out.includes('80')) return { ok: false, exp: 'Debe mostrar 80' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p><code>"50" + "30"</code> concatena dos strings y da <code>"5030"</code>. <code>50 + 30</code> suma dos números y da <code>80</code>.</p>'
},
{
  id: 'm2-06', mundo: 2, titulo: 'Bucle infinito',
  historia: 'El programa queda colgado porque el contador nunca avanza. Necesitás arreglarlo.',
  objetivo: 'Corregir el bucle para que muestre "LED" exactamente 5 veces sin quedar infinito.',
  xp: 30,
  pistas: ['El bucle for necesita actualizar la variable contador.', 'Falta i++ para que i aumente.', 'Podés cambiar i-- por i++ para que avance correctamente.'],
  aprender: '<h3>Errores de lógica: bucles infinitos</h3><p>Un <strong>bucle infinito</strong> ocurre cuando la condición nunca se vuelve falsa. En un <code>for</code>, siempre debés asegurar que la variable de control cambia en cada iteración.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>for (let i = 0; i < 5; i++) {\n  console.log("LED");\n}</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>for (let i = 0; i < 5; i--) {\n  console.log("LED");\n}</code></pre><p>¿Qué pasa si i disminuye en lugar de aumentar?</p>',
  reparar: {
    codigoInicial: 'for (let i = 0; i < 5; i--) {\n  console.log("LED");\n}',
    validar: function (out, code) {
      if (!/(i\+\+|\bi\s*\+=\s*1\b)/.test(code)) return { ok: false, exp: 'Usá i++ para incrementar el contador.' };
      if (/\bi\s*--/.test(code) && !/(i\+\+|\bi\s*\+=\s*1\b)/.test(code.replace(/\bi\s*--/g, ''))) return { ok: false, exp: 'Reemplazá i-- por i++.' };
      var lineas = out.split(/\r?\n/);
      var count = 0;
      for (var j = 0; j < lineas.length; j++) {
        if (lineas[j].indexOf('LED') !== -1) count++;
      }
      if (count !== 5) return { ok: false, exp: 'Debe mostrar "LED" exactamente 5 veces.' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>Con <code>i--</code>, <code>i</code> siempre disminuye, nunca llega a 5. Con <code>i++</code>, <code>i</code> va de 0 a 4 (5 iteraciones) y el bucle termina correctamente.</p>'
},
{
  id: 'm2-07', mundo: 2, titulo: 'Índice fuera del array',
  historia: 'El programa intenta leer el 6to elemento de un array que solo tiene 3 elementos. Da un valor vacío o undefined.',
  objetivo: 'Corregir el índice usando la longitud del array para acceder al último elemento válido.',
  xp: 30,
  pistas: ['Los arrays empiezan en índice 0.', 'Un array con 3 elementos tiene índices 0,1,2.', 'Usá .length y restá 1: leds[leds.length - 1]'],
  aprender: '<h3>Errores de lógica: índices fuera de rango</h3><p>Acceder a un índice mayor o igual a <code>.length</code> devuelve <code>undefined</code>. Siempre verificá o calculá el índice con <code>array.length - 1</code> para obtener el último elemento.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>let leds = ["rojo", "verde", "azul"];\nconsole.log(leds[leds.length - 1]); // "azul"</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>let leds = ["rojo", "verde", "azul"];\nconsole.log(leds[5]);</code></pre><p>¿Cómo podés acceder al último elemento sin adivinar el número?</p>',
  reparar: {
    codigoInicial: 'let leds = ["rojo", "verde", "azul"];\nconsole.log(leds[5]);',
    validar: function (out, code) {
      if (!/leds\.length\s*-\s*1/.test(code)) return { ok: false, exp: 'Usá leds.length - 1 para obtener el último elemento.' };
      if (!out.includes('azul')) return { ok: false, exp: 'Debe mostrar "azul"' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>El array tiene longitud 3, índices válidos 0-2. <code>leds[5]</code> no existe, devuelve <code>undefined</code>. Usando <code>leds[leds.length - 1]</code> obtenemos siempre el último elemento sin importar el tamaño.</p>'
},
{
  id: 'm2-08', mundo: 2, titulo: 'Función sin return',
  historia: 'La función que calcula el doble del voltaje devuelve undefined. Falta algo fundamental.',
  objetivo: 'Agregar return para que la función devuelva el resultado correctamente.',
  xp: 30,
  pistas: ['Las funciones calculan y devuelven valores con return.', 'Sin return, el valor devuelto es undefined.', 'Escribí: return v * 2;'],
  aprender: '<h3>Errores de lógica: funciones sin retorno</h3><p>Cuando una función debe entregar un resultado, necesitás usar <code>return</code>. Si no lo usás, la función termina sin devolver nada y devuelve <code>undefined</code>.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>function doble(v) {\n  return v * 2;\n}\nconsole.log(doble(12)); // 24</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>function doble(v) {\n  v * 2;\n}\nconsole.log(doble(12));</code></pre><p>¿Por qué muestra undefined?</p>',
  reparar: {
    codigoInicial: 'function doble(v) {\n  v * 2;\n}\nconsole.log(doble(12));',
    validar: function (out, code) {
      if (!/\breturn\b/.test(code)) return { ok: false, exp: 'Falta return para devolver el valor.' };
      if (!/return\s*v\s*\*\s*2/.test(code)) return { ok: false, exp: 'La línea debe ser: return v * 2;' };
      if (!out.includes('24')) return { ok: false, exp: 'Debe mostrar 24' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p><code>v * 2;</code> calcula el valor pero no lo devuelve. Con <code>return v * 2;</code>, la función envía ese resultado al punto donde fue llamada.</p>'
},
{
  id: 'm2-09', mundo: 2, titulo: 'Llave faltante en objeto',
  historia: 'Hay un objeto con los datos del componente, pero falta una llave } y el código no compila.',
  objetivo: 'Cerrar correctamente el objeto con la llave que falta.',
  xp: 30,
  pistas: ['Los objetos van entre llaves { }.', 'Cada llave de apertura necesita su llave de cierre.', 'Cerrá el objeto después de "resistencia": 220.'],
  aprender: '<h3>Errores de sintaxis: llaves</h3><p>En JavaScript, los <strong>objetos literales</strong> se definen con <code>{</code> y <code>}</code>. Si falta una llave de cierre, el intérprete no puede entender dónde termina el objeto y genera un error de sintaxis.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>let componente = {\n  nombre: "resistencia",\n  valor: "220 ohm"\n};\nconsole.log(componente.nombre);</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>let componente = {\n  nombre: "resistencia",\n  valor: "220 ohm"\nconsole.log(componente.nombre);</code></pre><p>¿Qué llave falta para cerrar el objeto?</p>',
  reparar: {
    codigoInicial: 'let componente = {\n  nombre: "resistencia",\n  valor: "220 ohm"\nconsole.log(componente.nombre);',
    validar: function (out, code) {
      var limpio = code.replace(/\s+/g, '');
      if (limpio.indexOf('};') === -1 && limpio.indexOf('}') === -1) return { ok: false, exp: 'Falta cerrar el objeto con }' };
      if (limpio.indexOf('valor:"220ohm"};console.log') === -1 && limpio.indexOf("valor:'220ohm'};console.log") === -1 && limpio.indexOf('valor:"220ohm"}console.log') === -1) {
        if (limpio.indexOf('valor:"220ohm";console.log') !== -1) return { ok: false, exp: 'Cerrá el objeto con } antes de console.log' };
      }
      if (!/componente\.nombre/.test(code)) return { ok: false, exp: 'Debe acceder a componente.nombre' };
      if (!out.includes('resistencia')) return { ok: false, exp: 'Debe mostrar "resistencia"' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>Falta la llave <code>}</code> que cierra el objeto <code>componente</code>. También, después del objeto debería haber un <code>;</code> antes de <code>console.log</code> o según convención. El objeto debe quedar correctamente cerrado.</p>'
},
{
  id: 'm2-10', mundo: 2, titulo: 'Etiqueta HTML mal cerrada',
  historia: 'La página HTML muestra mal el título. Revisá las etiquetas.',
  objetivo: 'Corregir el cierre de la etiqueta h2 para que sea válido.',
  xp: 30,
  pistas: ['Las etiquetas HTML distinguen entre mayúsculas y minúsculas en algunos casos, pero lo ideal es minúsculas.', 'El cierre debe coincidir: </h2>', 'Cambiá </H2> por </h2> o mantené el mismo estilo.'],
  aprender: '<h3>Errores en HTML: cierre de etiquetas</h3><p>En HTML5, las etiquetas no son estrictamente sensibles a mayúsculas/minúsculas, pero por convención y para evitar confusiones, debés cerrar con el mismo nombre. También es importante que cada etiqueta se cierre correctamente.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>&lt;h2&gt;Circuitos&lt;/h2&gt;</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>&lt;h2&gt;Circuitos&lt;/H2&gt;</code></pre><p>¿Está bien cerrada la etiqueta?</p>',
  reparar: {
    codigoInicial: '&lt;h2&gt;Circuitos&lt;/H2&gt;',
    validar: function (out, code) {
      var c = code.toLowerCase();
      if (!c.indexOf('<h2>circuitos</h2>') !== -1 && !(c.indexOf('<h2>') !== -1 && c.indexOf('</h2>') !== -1 && c.indexOf('<h2>') < c.indexOf('</h2>'))) return { ok: false, exp: 'Cerrá con </h2> correctamente.' };
      if (c.indexOf('<h2>circuitos</h2>') === -1) {
        if (!(c.indexOf('<h2>') !== -1 && c.indexOf('</h2>') !== -1)) return { ok: false, exp: 'Debe tener <h2> y </h2>' };
      }
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>La apertura es <code>&lt;h2&gt;</code> y el cierre <code>&lt;/H2&gt;</code> usa mayúsculas. Aunque HTML5 lo acepta en muchos casos, lo correcto y más claro es usar minúsculas consistentemente: <code>&lt;h2&gt;Circuitos&lt;/h2&gt;</code>.</p>'
},
{
  id: 'm2-11', mundo: 2, titulo: 'Etiqueta <p> sin cerrar',
  historia: 'El párrafo descriptivo queda mal renderizado porque le falta el cierre.',
  objetivo: 'Cerrar correctamente la etiqueta <p>.',
  xp: 30,
  pistas: ['Toda etiqueta con contenido necesita cierre.', '<p>... debe terminar con </p>', 'Escribí: <p>Voltaje estable</p>'],
  aprender: '<h3>Errores en HTML: etiquetas sin cerrar</h3><p>Si no cerrás una etiqueta, el navegador sigue aplicando sus efectos hasta encontrar otro cierre, lo que puede romper el diseño. Siempre cerrá <code>&lt;p&gt;</code> con <code>&lt;/p&gt;</code>.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>&lt;p&gt;Voltaje estable&lt;/p&gt;</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>&lt;p&gt;Voltaje estable</code></pre><p>¿Qué etiqueta falta para cerrar el párrafo?</p>',
  reparar: {
    codigoInicial: '&lt;p&gt;Voltaje estable',
    validar: function (out, code) {
      var c = code.toLowerCase();
      if (!c.includes('</p>')) return { ok: false, exp: 'Falta cerrar el párrafo con </p>' };
      if (c.indexOf('<p>') === -1) return { ok: false, exp: 'Debe tener <p> y </p>' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>Falta <code>&lt;/p&gt;</code>. El código correcto es <code>&lt;p&gt;Voltaje estable&lt;/p&gt;</code>. Esto asegura que el navegador sepa dónde termina el párrafo.</p>'
},
{
  id: 'm2-12', mundo: 2, titulo: 'Atributos sin comillas en img',
  historia: 'La imagen del esquema no carga. Hay un error en los atributos de <img>.',
  objetivo: 'Corregir los atributos src y alt poniendo sus valores entre comillas.',
  xp: 30,
  pistas: ['Los valores de atributos van entre comillas.', 'Tanto src como alt necesitan comillas.', 'Escribí: <img src="esquema.png" alt="Esquema del circuito">'],
  aprender: '<h3>Errores en HTML: atributos</h3><p>En HTML, aunque a veces se aceptan sin comillas, lo correcto (y seguro) es poner los valores entre comillas. Además, el atributo <code>alt</code> es obligatorio para accesibilidad.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>&lt;img src="esquema.png" alt="Esquema del circuito"&gt;</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>&lt;img src=esquema.png alt=Esquema&gt;</code></pre><p>¿Qué le falta a los atributos src y alt?</p>',
  reparar: {
    codigoInicial: '&lt;img src=esquema.png alt=Esquema&gt;',
    validar: function (out, code) {
      var c = code.toLowerCase();
      if (!/(src="[^"]+"|src='[^']+')/.test(c)) return { ok: false, exp: 'El atributo src debe tener comillas.' };
      if (!/(alt="[^"]+"|alt='[^']+')/.test(c)) return { ok: false, exp: 'El atributo alt debe tener comillas.' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p><code>src=esquema.png</code> y <code>alt=Esquema</code> no tienen comillas. Corregido: <code>src="esquema.png"</code> y <code>alt="Esquema"</code>. Esto evita errores cuando hay espacios o caracteres especiales.</p>'
},
{
  id: 'm2-13', mundo: 2, titulo: 'If sin llaves',
  historia: 'Solo la primera línea se ejecuta cuando debería ejecutarse todo el bloque.',
  objetivo: 'Agregar llaves para que ambas instrucciones se ejecuten si la condición es verdadera.',
  xp: 30,
  pistas: ['Si hay varias instrucciones, necesitás llaves { }.', 'Sin llaves, solo la primera línea pertenece al if.', 'Encerrá ambas console.log entre { }'],
  aprender: '<h3>Errores de lógica: if sin llaves</h3><p>Cuando no usás <code>{ }</code>, solo la primera instrucción después del <code>if</code> forma parte de la condición. Las siguientes siempre se ejecutan, lo cual suele ser un error difícil de detectar.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>let luz = 100;\nif (luz &lt; 200) {\n  console.log("Bajo");\n  console.log("Encender LED");\n}</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>let luz = 100;\nif (luz &lt; 200)\n  console.log("Bajo");\n  console.log("Encender LED");</code></pre><p>¿Por qué "Encender LED" se muestra aunque la condición cambie?</p>',
  reparar: {
    codigoInicial: 'let luz = 100;\nif (luz < 200)\n  console.log("Bajo");\n  console.log("Encender LED");',
    validar: function (out, code) {
      if (!/\{[\s\S]*console\.log\("Bajo"\)[\s\S]*console\.log\("Encender LED"\)[\s\S]*\}/.test(code)) return { ok: false, exp: 'Agregá llaves { } para agrupar ambas instrucciones.' };
      if (!out.includes('Bajo')) return { ok: false, exp: 'Debe mostrar "Bajo"' };
      if (!out.includes('Encender LED')) return { ok: false, exp: 'Debe mostrar "Encender LED"' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>Sin llaves, <code>console.log("Encender LED")</code> está fuera del <code>if</code>. Con llaves, ambas líneas se ejecutan solo cuando <code>luz &lt; 200</code>.</p>'
},
{
  id: 'm2-14', mundo: 2, titulo: 'Else huérfano',
  historia: 'El editor marca "Unexpected else". Hay un else que no corresponde a ningún if.',
  objetivo: 'Corregir la estructura para tener if y else correctamente emparejados.',
  xp: 30,
  pistas: ['Un else debe seguir inmediatamente a un bloque if.', 'Revisá que no haya un punto y coma o código entre if y else.', 'Corregí la estructura: if (...) { ... } else { ... }'],
  aprender: '<h3>Errores de sintaxis: else sin if</h3><p>El <code>else</code> es parte de la estructura <code>if...else</code>. Si aparece sin un <code>if</code> previo, JavaScript no sabe a qué condición responde y genera un error de sintaxis.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>let temp = 15;\nif (temp &gt; 20) {\n  console.log("Calor");\n} else {\n  console.log("Frío");\n}</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>let temp = 15;\nif (temp &gt; 20) {\n  console.log("Calor");\n}\nconsole.log("Algo");\nelse {\n  console.log("Frío");\n}</code></pre><p>¿Por qué hay un "Unexpected else"?</p>',
  reparar: {
    codigoInicial: 'let temp = 15;\nif (temp > 20) {\n  console.log("Calor");\n}\nconsole.log("Algo");\nelse {\n  console.log("Frío");\n}',
    validar: function (out, code) {
      if (/console\.log\("Algo"\)[\s\S]*else/.test(code)) return { ok: false, exp: 'El else debe seguir inmediatamente al bloque if, sin código entre medio.' };
      if (!/if\s*\(temp\s*>\s*20\)[\s\S]*\}[\s\S]*else[\s\S]*\{[\s\S]*console\.log\("Frío"\)/.test(code)) return { ok: false, exp: 'Estructura correcta: if { ... } else { console.log("Frío"); }' };
      if (!out.includes('Frío')) return { ok: false, exp: 'Debe mostrar "Frío"' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>Entre el <code>if</code> y el <code>else</code> hay <code>console.log("Algo");</code>. El <code>else</code> debe estar inmediatamente después de <code>}</code> del <code>if</code>. Quitando esa línea, se emparejan correctamente.</p>'
},
{
  id: 'm2-15', mundo: 2, titulo: 'Operador lógico equivocado',
  historia: 'El sistema debe alertar si el nivel es muy bajo O muy alto. Pero solo alerta cuando ambas cosas ocurren.',
  objetivo: 'Cambiar && por || para que se cumpla la lógica correcta.',
  xp: 30,
  pistas: ['&& significa "Y" (ambas condiciones).', '|| significa "O" (al menos una).', 'Usá || para detectar nivel bajo o alto.'],
  aprender: '<h3>Errores de lógica: operadores AND/OR</h3><p><code>&&</code> requiere que ambas condiciones sean verdaderas. <code>||</code> requiere que al menos una sea verdadera. Elegir el operador correcto es fundamental para que la lógica funcione como se espera.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>let nivel = 5;\nif (nivel &lt; 10 || nivel &gt; 90) {\n  console.log("Alerta");\n}</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>let nivel = 5;\nif (nivel &lt; 10 && nivel &gt; 90) {\n  console.log("Alerta");\n}</code></pre><p>¿Por qué no muestra "Alerta" si nivel es 5?</p>',
  reparar: {
    codigoInicial: 'let nivel = 5;\nif (nivel < 10 && nivel > 90) {\n  console.log("Alerta");\n}',
    validar: function (out, code) {
      if (!/\|\|/.test(code)) return { ok: false, exp: 'Usá || (OR) en lugar de && (AND).' };
      if (!/nivel\s*<\s*10\s*\|\|\s*nivel\s*>\s*90/.test(code)) return { ok: false, exp: 'La condición debe ser: nivel < 10 || nivel > 90' };
      if (!out.includes('Alerta')) return { ok: false, exp: 'Debe mostrar "Alerta"' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p><code>nivel &lt; 10 && nivel &gt; 90</code> nunca es verdadero (un número no puede ser menor a 10 y mayor a 90 al mismo tiempo). Con <code>||</code>, alerta si está por debajo de 10 O por encima de 90.</p>'
},
{
  id: 'm2-16', mundo: 2, titulo: 'parseInt olvidado',
  historia: 'Los valores leídos como texto se concatenan en lugar de sumarse. Necesitás convertirlos a números.',
  objetivo: 'Usar parseInt para convertir los strings a números y obtener 150.',
  xp: 30,
  pistas: ['Los datos de entrada suelen venir como texto.', 'Usá parseInt() para convertir a entero.', 'Escribí: console.log(parseInt(a) + parseInt(b));'],
  aprender: '<h3>Errores de tipo: concatenación vs suma</h3><p>Cuando obtenés valores de formularios o sensores, suelen ser <strong>strings</strong>. Si sumás strings, concatenás. Para sumar numéricamente, convertilos con <code>parseInt()</code>, <code>parseFloat()</code> o <code>Number()</code>.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>let a = "100";\nlet b = "50";\nconsole.log(parseInt(a) + parseInt(b)); // 150</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>let a = "100";\nlet b = "50";\nconsole.log(a + b);</code></pre><p>¿Por qué da "10050" en lugar de 150?</p>',
  reparar: {
    codigoInicial: 'let a = "100";\nlet b = "50";\nconsole.log(a + b);',
    validar: function (out, code) {
      if (!/parseInt\s*\(\s*a\s*\)\s*\+\s*parseInt\s*\(\s*b\s*\)/.test(code)) return { ok: false, exp: 'Convertí a números con parseInt: parseInt(a) + parseInt(b)' };
      if (!out.includes('150')) return { ok: false, exp: 'Debe mostrar 150' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p><code>a</code> y <code>b</code> son strings. <code>a + b</code> concatena. <code>parseInt(a)</code> convierte "100" a número 100, lo mismo con b, y ahora sí se suman.</p>'
},
{
  id: 'm2-17', mundo: 2, titulo: 'División por cero',
  historia: 'Al dividir por cero, JavaScript devuelve Infinity. Necesitás evitar eso con una validación.',
  objetivo: 'Agregar una validación para que, si el divisor es cero, muestre "Error: división por cero". Si no, muestre el resultado.',
  xp: 30,
  pistas: ['Nunca dividás por cero en cálculos reales.', 'Verificá si divisor === 0 antes de dividir.', 'Usá if para mostrar el error correspondiente.'],
  aprender: '<h3>Errores de lógica: división por cero</h3><p>Matemáticamente no se puede dividir por cero. En JavaScript, <code>x / 0</code> devuelve <code>Infinity</code> en lugar de tirar error. Esto puede generar resultados incorrectos. Siempre validá antes de dividir.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>let num = 10;\nlet den = 0;\nif (den === 0) {\n  console.log("Error: división por cero");\n} else {\n  console.log(num / den);\n}</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>let num = 10;\nlet den = 0;\nconsole.log(num / den);</code></pre><p>¿Cómo evitás mostrar Infinity?</p>',
  reparar: {
    codigoInicial: 'let num = 10;\nlet den = 0;\nconsole.log(num / den);',
    validar: function (out, code) {
      if (!/den\s*===\s*0/.test(code)) return { ok: false, exp: 'Verificá si den === 0 antes de dividir.' };
      if (!/Error:\s*división\s*por\s*cero/.test(out)) return { ok: false, exp: 'Si den es cero, debe mostrar "Error: división por cero"' };
      if (/Infinity/.test(out)) return { ok: false, exp: 'No debe mostrar Infinity. Agregá una validación.' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>Sin validación, <code>10 / 0</code> devuelve <code>Infinity</code>. Al chequear <code>if (den === 0)</code>, evitamos la división y mostramos un mensaje claro de error.</p>'
},
{
  id: 'm2-18', mundo: 2, titulo: 'Condición invertida',
  historia: 'El LED debe encenderse cuando la luz ambiente es MENOR a 300. Pero ahora se enciende cuando es mayor.',
  objetivo: 'Corregir la condición para que sea luz < 300.',
  xp: 30,
  pistas: ['El símbolo para menor es < , no >.', 'Leé bien: "menor a 300".', 'Cambiá > por < en la condición.'],
  aprender: '<h3>Errores de lógica: condiciones invertidas</h3><p>A veces invertimos los operadores lógicos (&lt; vs &gt;, &lt;= vs &gt;=) por descuido. Esto hace que el programa se comporte exactamente al revés de lo que se pide.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>let luz = 150;\nif (luz &lt; 300) {\n  console.log("Encender LED");\n} else {\n  console.log("Apagar LED");\n}</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>let luz = 150;\nif (luz &gt; 300) {\n  console.log("Encender LED");\n} else {\n  console.log("Apagar LED");\n}</code></pre><p>Si hay poca luz (150), ¿debería encenderse el LED?</p>',
  reparar: {
    codigoInicial: 'let luz = 150;\nif (luz > 300) {\n  console.log("Encender LED");\n} else {\n  console.log("Apagar LED");\n}',
    validar: function (out, code) {
      if (!/luz\s*<\s*300/.test(code)) return { ok: false, exp: 'Cambiá la condición a luz < 300.' };
      if (!out.includes('Encender LED')) return { ok: false, exp: 'Con luz < 300 debe mostrar "Encender LED"' };
      if (out.includes('Apagar LED') && !out.includes('Encender LED')) return { ok: false, exp: 'La lógica está invertida.' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>Con <code>luz &gt; 300</code> solo se enciende cuando hay mucha luz. Pero el objetivo pide encenderlo cuando la luz es <strong>menor</strong> a 300 (poca luz). Por eso hay que usar <code>&lt;</code>.</p>'
},
{
  id: 'm2-19', mundo: 2, titulo: 'Reasignar una const',
  historia: 'Intentás cambiar el valor de una constante y JavaScript tira un TypeError.',
  objetivo: 'Cambiar const por let para poder reasignar el valor de velocidad.',
  xp: 30,
  pistas: ['const significa constante: no se puede reasignar.', 'Si vas a cambiar el valor, usá let.', 'Cambiá const velocidad por let velocidad.'],
  aprender: '<h3>Errores de tipo: const vs let</h3><p><code>const</code> declara una variable cuyo valor no puede reasignarse. <code>let</code> permite reasignarla. Si necesitás modificar el valor más adelante, usá <code>let</code>.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>let velocidad = 0;\nvelocidad = 100;\nconsole.log(velocidad); // 100</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>const velocidad = 0;\nvelocidad = 100;\nconsole.log(velocidad);</code></pre><p>¿Por qué no se puede asignar un nuevo valor a velocidad?</p>',
  reparar: {
    codigoInicial: 'const velocidad = 0;\nvelocidad = 100;\nconsole.log(velocidad);',
    validar: function (out, code) {
      if (/\bconst\b/.test(code)) return { ok: false, exp: 'Cambiá const por let para poder reasignar el valor.' };
      if (!/\blet\s+velocidad/.test(code)) return { ok: false, exp: 'Debe declararse con let: let velocidad = 0;' };
      if (!out.includes('100')) return { ok: false, exp: 'Debe mostrar 100' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p><code>const</code> impide reasignar <code>velocidad = 100</code>. Al cambiar a <code>let</code>, permitimos modificar su valor. Esto es un <strong>TypeError</strong> en tiempo de ejecución.</p>'
},
{
  id: 'm2-20', mundo: 2, titulo: 'Llamada a función con nombre mal escrito',
  historia: 'La función se llama saludar, pero la llamás como saludos y da "saludos is not defined".',
  objetivo: 'Corregir el nombre de la función en la llamada para que coincida exactamente.',
  xp: 30,
  pistas: ['Los nombres de funciones son sensibles a mayúsculas/minúsculas.', 'La declaración es function saludar()...', 'Llamala con saludar(), no saludos().'],
  aprender: '<h3>Errores de referencia: nombres incorrectos</h3><p>JavaScript distingue mayúsculas de minúsculas. Además, el nombre usado para llamar debe coincidir exactamente con el nombre de la función declarada. Un nombre mal escrito genera <code>ReferenceError</code>.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>function saludar() {\n  console.log("Hola");\n}\nsaludar();</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>function saludar() {\n  console.log("Hola");\n}\nsaludos();</code></pre><p>¿Qué nombre está mal escrito?</p>',
  reparar: {
    codigoInicial: 'function saludar() {\n  console.log("Hola");\n}\nsaludos();',
    validar: function (out, code) {
      if (/saludos\s*\(/.test(code)) return { ok: false, exp: 'Corregí el nombre en la llamada: saludar()' };
      if (!/\bsaludar\s*\(/.test(code)) return { ok: false, exp: 'Debe llamar a saludar()' };
      if (!out.includes('Hola')) return { ok: false, exp: 'Debe mostrar "Hola"' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>Declaraste <code>saludar</code> pero llamaste <code>saludos</code> (con \'s\' extra). JavaScript busca una función llamada <code>saludos</code> que no existe, por eso tira error.</p>'
},
{
  id: 'm2-21', mundo: 2, titulo: 'Faltan argumentos al llamar una función',
  historia: 'La función necesita un nombre para saludar, pero la llamás sin argumentos y muestra "Hola undefined".',
  objetivo: 'Pasar el argumento "TiendaVirtus" a la función saludar.',
  xp: 35,
  pistas: ['Los parámetros reciben valores al llamar la función.', 'Falta pasar el argumento entre paréntesis.', 'Llamá con saludar("TiendaVirtus");'],
  aprender: '<h3>Errores de lógica: argumentos faltantes</h3><p>Si una función espera un parámetro y no se lo pasás, ese parámetro vale <code>undefined</code>. Esto puede generar salidas incorrectas como "Hola undefined". Siempre pasá los argumentos necesarios.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>function saludar(nombre) {\n  console.log("Hola " + nombre);\n}\nsaludar("TiendaVirtus");</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>function saludar(nombre) {\n  console.log("Hola " + nombre);\n}\nsaludar();</code></pre><p>¿Por qué muestra "Hola undefined"?</p>',
  reparar: {
    codigoInicial: 'function saludar(nombre) {\n  console.log("Hola " + nombre);\n}\nsaludar();',
    validar: function (out, code) {
      if (!/saludar\s*\(\s*"[^"]*"\s*\)/.test(code) && !/saludar\s*\(\s*'[^']*'\s*\)/.test(code)) return { ok: false, exp: 'Pasá un argumento a saludar, ej: saludar("TiendaVirtus")' };
      if (!out.includes('Hola') || !out.includes('TiendaVirtus')) return { ok: false, exp: 'Debe mostrar "Hola TiendaVirtus"' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>Sin argumentos, <code>nombre</code> vale <code>undefined</code>. Al pasar <code>"TiendaVirtus"</code>, <code>nombre</code> toma ese valor y se muestra correctamente.</p>'
},
{
  id: 'm2-22', mundo: 2, titulo: 'Comentario sin cerrar',
  historia: 'Un comentario /* sin */ está "tragando" todo el código que sigue. Aparece un error de sintaxis.',
  objetivo: 'Cerrar correctamente el comentario de bloque con */.',
  xp: 35,
  pistas: ['Los comentarios de bloque empiezan con /* y terminan con */.', 'Si falta */, todo lo siguiente se considera comentario.', 'Agregá */ antes de console.log("Listo");'],
  aprender: '<h3>Errores de sintaxis: comentarios sin cerrar</h3><p>Un comentario <code>/* ... */</code> sin su cierre hace que el intérprete trate todo el código posterior como parte del comentario. Esto suele generar errores inesperados.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>/* Configuración del sensor */\nconsole.log("Listo");</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>/* Configuración del sensor\nconsole.log("Listo");</code></pre><p>¿Por qué no se ejecuta console.log?</p>',
  reparar: {
    codigoInicial: '/* Configuración del sensor\nconsole.log("Listo");',
    validar: function (out, code) {
      if (!/\*\/.*console\.log/.test(code) && code.indexOf('*/') === -1) return { ok: false, exp: 'Cerrá el comentario con */ antes de console.log' };
      if (code.indexOf('*/') === -1) return { ok: false, exp: 'Falta el cierre */' };
      if (!out.includes('Listo')) return { ok: false, exp: 'Debe mostrar "Listo"' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>Falta <code>*/</code> para cerrar el comentario. Al agregarlo (ej. <code>/* Configuración */</code>), <code>console.log("Listo")</code> deja de ser parte del comentario y se ejecuta normalmente.</p>'
},
{
  id: 'm2-23', mundo: 2, titulo: 'Variable declarada dos veces',
  historia: 'Declaraste valor con let dos veces en el mismo ámbito. JavaScript marca "Identifier \'valor\' has already been declared".',
  objetivo: 'Eliminar una de las declaraciones let y mantener un solo valor.',
  xp: 35,
  pistas: ['No podés declarar la misma variable con let dos veces en el mismo bloque.', 'Podés reasignar sin volver a poner let.', 'Declarala una sola vez: let valor = 5; valor = 10;'],
  aprender: '<h3>Errores de sintaxis: redeclaración con let</h3><p>En el mismo ámbito, no podés redeclarar una variable con <code>let</code> o <code>const</code>. Si querés cambiar su valor, usá la asignación sin <code>let</code>.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>let valor = 5;\nvalor = 10;\nconsole.log(valor);</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>let valor = 5;\nlet valor = 10;\nconsole.log(valor);</code></pre><p>¿Por qué no se puede declarar valor dos veces?</p>',
  reparar: {
    codigoInicial: 'let valor = 5;\nlet valor = 10;\nconsole.log(valor);',
    validar: function (out, code) {
      var matches = code.match(/\blet\s+valor\b/g);
      if (!matches || matches.length > 1) return { ok: false, exp: 'Declará valor solo una vez con let.' };
      if (!/\bvalor\s*=/.test(code)) return { ok: false, exp: 'Debés reasignar valor = 10 sin volver a declarar.' };
      if (!out.includes('10')) return { ok: false, exp: 'Debe mostrar 10' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p><code>let</code> no permite redeclarar la misma variable en el mismo ámbito. La solución es declarar una sola vez con <code>let valor = 5;</code> y luego reasignar <code>valor = 10;</code>.</p>'
},
{
  id: 'm2-24', mundo: 2, titulo: 'Orden de operaciones',
  historia: 'Esperaban que 2 + 3 * 4 diera 20, pero da 14. Hay que forzar el orden con paréntesis.',
  objetivo: 'Agregar paréntesis para que primero se sume 2+3 y luego se multiplique por 4, obteniendo 20.',
  xp: 35,
  pistas: ['La multiplicación tiene prioridad sobre la suma.', 'Usá paréntesis para cambiar el orden.', 'Escribí: console.log((2 + 3) * 4);'],
  aprender: '<h3>Errores de lógica: precedencia de operadores</h3><p>En JavaScript (y matemáticas), <code>*</code> y <code>/</code> se evalúan antes que <code>+</code> y <code>-</code>. Para forzar otro orden, usá <code>( )</code>.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>console.log((2 + 3) * 4); // 20</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>console.log(2 + 3 * 4);</code></pre><p>¿Por qué da 14 en lugar de 20?</p>',
  reparar: {
    codigoInicial: 'console.log(2 + 3 * 4);',
    validar: function (out, code) {
      var limpio = code.replace(/\s+/g, '');
      if (!/\(\s*2\s*\+\s*3\s*\)\s*\*\s*4/.test(code)) return { ok: false, exp: 'Agregá paréntesis: (2 + 3) * 4' };
      if (!out.includes('20')) return { ok: false, exp: 'Debe mostrar 20' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>Sin paréntesis, se resuelve <code>3 * 4 = 12</code>, luego <code>2 + 12 = 14</code>. Con <code>(2 + 3) * 4</code>, primero suma 5, luego multiplica por 4 = 20.</p>'
},
{
  id: 'm2-25', mundo: 2, titulo: 'Comparación con mayúsculas/minúsculas',
  historia: 'La validación falla porque "hola" !== "Hola". Hay diferencia entre mayúsculas y minúsculas.',
  objetivo: 'Normalizar ambas cadenas a minúsculas antes de comparar para obtener true.',
  xp: 35,
  pistas: ['JavaScript distingue mayúsculas de minúsculas.', 'Usá .toLowerCase() en ambas cadenas.', 'Compará: texto1.toLowerCase() === texto2.toLowerCase()'],
  aprender: '<h3>Errores de lógica: case-sensitive</h3><p>Las cadenas son <strong>sensibles a mayúsculas/minúsculas</strong>. "Hola" y "hola" son diferentes. Para comparar sin importar mayúsculas, convertí ambas a minúsculas (o mayúsculas) con <code>.toLowerCase()</code>.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>let a = "hola";\nlet b = "Hola";\nconsole.log(a.toLowerCase() === b.toLowerCase()); // true</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>let a = "hola";\nlet b = "Hola";\nconsole.log(a === b);</code></pre><p>¿Por qué muestra false en lugar de true?</p>',
  reparar: {
    codigoInicial: 'let a = "hola";\nlet b = "Hola";\nconsole.log(a === b);',
    validar: function (out, code) {
      if (!/toLowerCase\s*\(/.test(code)) return { ok: false, exp: 'Usá toLowerCase() para normalizar ambas cadenas.' };
      if (!/a\.toLowerCase\(\)\s*===\s*b\.toLowerCase\(\)/.test(code)) return { ok: false, exp: 'Compará a.toLowerCase() === b.toLowerCase()' };
      if (!out.includes('true')) return { ok: false, exp: 'Debe mostrar true' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p><code>"hola"</code> empieza con \'h\' minúscula, <code>"Hola"</code> con \'H\' mayúscula. Son diferentes para ===. Con <code>toLowerCase()</code> ambas se convierten a "hola", por lo que la comparación da true.</p>'
},
{
  id: 'm2-26', mundo: 2, titulo: 'Return anticipado',
  historia: 'La función calcula el total pero retorna antes de sumar el IVA. El resultado está incompleto.',
  objetivo: 'Mover el return para que devuelva totalConIva después de calcularlo.',
  xp: 35,
  pistas: ['Un return termina la ejecución de la función inmediatamente.', 'No podés ejecutar código después de return.', 'Calculá totalConIva primero, después hacé return.'],
  aprender: '<h3>Errores de lógica: return temprano</h3><p>Cuando escribís <code>return</code> antes de completar todos los cálculos, la función termina y devuelve un valor incorrecto. Siempre hacé todos los cálculos necesarios antes de retornar.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>function calcular(total) {\n  let iva = total * 0.21;\n  let totalConIva = total + iva;\n  return totalConIva;\n}\nconsole.log(calcular(100)); // 121</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>function calcular(total) {\n  let iva = total * 0.21;\n  return total;\n  let totalConIva = total + iva;\n  return totalConIva;\n}\nconsole.log(calcular(100));</code></pre><p>¿Por qué devuelve 100 en lugar de 121?</p>',
  reparar: {
    codigoInicial: 'function calcular(total) {\n  let iva = total * 0.21;\n  return total;\n  let totalConIva = total + iva;\n  return totalConIva;\n}\nconsole.log(calcular(100));',
    validar: function (out, code) {
      if (/\breturn\s+total\s*;/.test(code) && code.indexOf('return totalConIva') !== -1) {
        var idxReturnTotal = code.indexOf('return total');
        var idxTotalConIva = code.indexOf('totalConIva');
        if (idxReturnTotal < idxTotalConIva) return { ok: false, exp: 'El return debe estar después de calcular totalConIva.' };
      }
      if (!/totalConIva\s*=\s*total\s*\+\s*iva/.test(code)) return { ok: false, exp: 'Debés calcular totalConIva = total + iva antes de retornar.' };
      if (!/return\s+totalConIva/.test(code)) return { ok: false, exp: 'Retorná totalConIva, no total.' };
      if (!out.includes('121')) return { ok: false, exp: 'Debe mostrar 121' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>El primer <code>return total;</code> termina la función inmediatamente, así que nunca se calcula ni retorna <code>totalConIva</code>. Hay que eliminar ese return anticipado y retornar <code>totalConIva</code> al final.</p>'
},
{
  id: 'm2-27', mundo: 2, titulo: 'const y push vs reasignación',
  historia: 'Intentás reasignar todo el array declarado con const y falla. Pero usar push() sí está permitido.',
  objetivo: 'Usar push() para agregar "LED" al array sin reasignarlo.',
  xp: 35,
  pistas: ['const impide reasignar la variable completa.', 'Pero podés modificar el contenido (métodos como push).', 'Usá componentes.push("LED"); en lugar de reasignar.'],
  aprender: '<h3>Errores de tipo: const y mutabilidad</h3><p>Con <code>const</code>, no podés reasignar la variable (<code>array = [...]</code>). Pero sí podés modificar su contenido con métodos como <code>.push()</code>, <code>.pop()</code>, <code>.splice()</code>, ya que la referencia al objeto no cambia.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>const componentes = ["resistencia"];\ncomponentes.push("LED");\nconsole.log(componentes[1]); // "LED"</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>const componentes = ["resistencia"];\ncomponentes = ["resistencia", "LED"];\nconsole.log(componentes[1]);</code></pre><p>¿Por qué falla al reasignar un array const?</p>',
  reparar: {
    codigoInicial: 'const componentes = ["resistencia"];\ncomponentes = ["resistencia", "LED"];\nconsole.log(componentes[1]);',
    validar: function (out, code) {
      var reasigna = code.split('\n').some(function (l) {
        return /componentes\s*=\s*\[/.test(l) && !/\b(const|let|var)\b/.test(l);
      });
      if (reasigna) return { ok: false, exp: 'No reasignes el array. Usá push() para agregar elementos.' };
      if (!/\.push\s*\(\s*["']LED["']\s*\)/.test(code)) return { ok: false, exp: 'Agregá con: componentes.push("LED");' };
      if (!out.includes('LED')) return { ok: false, exp: 'Debe mostrar "LED"' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p><code>componentes = [...]</code> intenta reasignar la variable. Con <code>const</code> eso no está permitido. <code>componentes.push("LED")</code> modifica el array existente, pero no cambia la referencia de la variable, así que es válido.</p>'
},
{
  id: 'm2-28', mundo: 2, titulo: 'Comillas y paréntesis (doble error)',
  historia: 'Hay DOS errores juntos: faltan comillas y falta cerrar un paréntesis. Arreglalos de una vez.',
  objetivo: 'Corregir ambos errores para mostrar "Sensor activo".',
  xp: 35,
  pistas: ['Los textos necesitan comillas.', 'Falta cerrar el paréntesis de console.log.', 'Escribí: console.log("Sensor activo");'],
  aprender: '<h3>Errores de sintaxis combinados</h3><p>A veces aparecen varios errores juntos. Es importante leer el mensaje de error, pero también revisar estructura: comillas, paréntesis, llaves. Corregilos paso a paso hasta que el código sea válido.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>console.log("Sensor activo");</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>console.log(Sensor activo;</code></pre><p>¿Qué dos cosas faltan para que funcione?</p>',
  reparar: {
    codigoInicial: 'console.log(Sensor activo;',
    validar: function (out, code) {
      var limpio = code.replace(/\s+/g, '');
      if (!/console\.log\("Sensoractivo"\);?/.test(limpio) && !/console\.log\('Sensoractivo'\);?/.test(limpio)) return { ok: false, exp: 'Usá comillas y cerrá paréntesis: console.log("Sensor activo");' };
      if (!out.includes('Sensor activo')) return { ok: false, exp: 'Debe mostrar "Sensor activo"' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>Faltan las comillas alrededor de <code>Sensor activo</code> (para que sea string) y falta cerrar el paréntesis <code>)</code> de <code>console.log</code>. El código correcto es <code>console.log("Sensor activo");</code>.</p>'
},
{
  id: 'm2-29', mundo: 2, titulo: 'Falta let + condición invertida (doble error)',
  historia: 'Dos errores en un solo bloque: la variable no está declarada y la condición está invertida. El LED debe encenderse si temp &lt; 25.',
  objetivo: 'Declarar temp con let y corregir la condición a temp < 25 para mostrar "Encender".',
  xp: 40,
  pistas: ['Declará temp con let antes de usarla.', 'La condición pide "menor a 25".', 'Usá: let temp = 20; if (temp < 25) { console.log("Encender"); }'],
  aprender: '<h3>Errores combinados: referencia + lógica</h3><p>En ejercicios reales pueden aparecer varios errores a la vez. Primero identificá errores de sintaxis/referencia (variable sin declarar), después errores de lógica (condición invertida). Corregilos ambos para obtener el comportamiento esperado.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>let temp = 20;\nif (temp &lt; 25) {\n  console.log("Encender");\n}</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>temp = 20;\nif (temp &gt; 25) {\n  console.log("Encender");\n}</code></pre><p>Si la temperatura es 20, ¿debería encenderse? ¿Qué más falta?</p>',
  reparar: {
    codigoInicial: 'temp = 20;\nif (temp > 25) {\n  console.log("Encender");\n}',
    validar: function (out, code) {
      if (!/(?:^|[^a-zA-Z0-9_])(let|const|var)\s+temp\b/.test(code)) return { ok: false, exp: 'Declará temp con let: let temp = 20;' };
      if (!/temp\s*<\s*25/.test(code)) return { ok: false, exp: 'Corregí la condición a temp < 25' };
      if (!out.includes('Encender')) return { ok: false, exp: 'Debe mostrar "Encender"' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p><code>temp</code> no está declarado (falta <code>let</code>). Además, <code>temp &gt; 25</code> está invertido: con 20 nunca entra. Hay que declarar con <code>let temp = 20;</code> y usar <code>if (temp &lt; 25)</code>.</p>'
},
{
  id: 'm2-30', mundo: 2, titulo: 'Triple bug final',
  historia: 'El reto final: tres errores juntos. La función debe sumar 5+3 y retornar el resultado, mostrando "8". ¿Podés arreglarlos todos?',
  objetivo: 'Corregir comillas, return y condición para que muestre correctamente el resultado.',
  xp: 40,
  pistas: ['Los números van sin comillas para sumar.', 'Falta return para devolver el valor.', 'La condición está invertida: debe ser num === 5.'],
  aprender: '<h3>Desafío: múltiples errores</h3><p>En código real, varios errores pueden aparecer juntos. Siempre analizá: sintaxis (comillas, paréntesis), referencias (variables), lógica (condiciones, return). Corregilos sistemáticamente hasta que todo funcione.</p>',
  ver: '<h3>Ejemplo correcto</h3><pre><code>function sumar(num) {\n  if (num === 5) {\n    return num + 3;\n  }\n  return num;\n}\nconsole.log(sumar(5)); // 8</code></pre>',
  detectar: '<h3>Código con error</h3><pre><code>function sumar(num) {\n  if (num = 5) {\n    num + "3";\n  }\n  return num;\n}\nconsole.log(sumar(5));</code></pre><p>Hay tres errores: uno en la condición, uno en la suma y algo más que impide devolver el resultado correcto.</p>',
  reparar: {
    codigoInicial: 'function sumar(num) {\n  if (num = 5) {\n    num + "3";\n  }\n  return num;\n}\nconsole.log(sumar(5));',
    validar: function (out, code) {
      if (!/===/.test(code)) return { ok: false, exp: 'Usá === en la condición: if (num === 5)' };
      if (!/num\s*\+\s*3/.test(code.replace(/"[^"]*"/g, '').replace(/'[^']*'/g, '')) && !/return\s*num\s*\+\s*3/.test(code)) return { ok: false, exp: 'Sumá números sin comillas: return num + 3;' };
      if (!/return\s*num\s*\+\s*3/.test(code)) return { ok: false, exp: 'Retorná el resultado: return num + 3;' };
      if (/num\s*\+\s*"3"/.test(code) || /num\s*\+\s*'3'/.test(code)) return { ok: false, exp: 'Quitá las comillas del 3 para sumar como número.' };
      if (!out.includes('8')) return { ok: false, exp: 'Debe mostrar 8' };
      return { ok: true };
    }
  },
  comprender: '<h3>¿Por qué fallaba?</h3><p>1) <code>num = 5</code> asigna en lugar de comparar; debés usar <code>===</code>. 2) <code>num + "3"</code> concatena (da "53" como string) en lugar de sumar números; usá <code>num + 3</code>. 3) Ese cálculo no se devuelve; necesitás <code>return num + 3;</code> dentro del <code>if</code> para que la función retorne 8.</p>'
}
);