MISIONES.push(
  // ═══════════════════════════════════════════════════════════
  // MUNDO 6: PROYECTO FINAL - INTEGRADOS (TiendaVirtus)
  // ═══════════════════════════════════════════════════════════
  {
    id: 'm6-01', mundo: 6, titulo: 'Calculadora modular con funciones separadas',
    historia: 'En TiendaVirtus necesitás una calculadora para sumar y restar precios. El código está partido en funciones pero hay errores de estructura.',
    objetivo: 'Crear funciones suma(a,b) y resta(a,b), y mostrar suma(50,30) y resta(50,30).',
    xp: 50,
    pistas: ['Usá function suma(a,b){ return a+b; } y function resta(a,b){ return a-b; }.', 'Llamalas con console.log.', 'Mostrá 80 y 20.'],
    aprender: '<h3>Descomposición en funciones</h3><p>Separar tareas en funciones hace que el código sea reutilizable y fácil de probar. Cada operación devuelve un valor.</p><h3>Buenas prácticas</h3><p>Una función debe hacer una sola cosa y devolver resultado con <code>return</code>.</p>',
    ver: '<h3>Programa correcto</h3><pre><code>function suma(a, b) {\n  return a + b;\n}\n\nfunction resta(a, b) {\n  return a - b;\n}\n\nconsole.log(suma(50, 30));\nconsole.log(resta(50, 30));</code></pre>',
    detectar: '<h3>Código con errores</h3><pre><code>function suma(a,b) {\n  a + b;\n}\nresta(a,b) {\n  return a - b;\n}\nconsole.log(suma(50,30));\nconsole.log(resta(50,30));</code></pre><p>¿Qué le falta a suma? ¿Qué le falta a resta?</p>',
    reparar: {
      codigoInicial: 'function suma(a,b) {\n  a + b;\n}\nresta(a,b) {\n  return a - b;\n}\nconsole.log(suma(50,30));\nconsole.log(resta(50,30));',
      validar: function (out, code) {
        if (!/function\s+suma\s*\(/.test(code)) return { ok: false, exp: 'Falta function en suma(a,b)' };
        if (!/return\s+a\s*\+\s*b/.test(code)) return { ok: false, exp: 'Falta return en suma' };
        if (!/function\s+resta\s*\(/.test(code)) return { ok: false, exp: 'Falta function en resta(a,b)' };
        if (!/return\s+a\s*-\s*b/.test(code)) return { ok: false, exp: 'Falta return en resta' };
        if (!out.includes('80')) return { ok: false, exp: 'Debe mostrar 80' };
        if (!out.includes('20')) return { ok: false, exp: 'Debe mostrar 20' };
        return { ok: true };
      }
    },
    comprender: '<h3>Descomposición modular</h3><p>Usar <code>return</code> garantiza que el valor pase a <code>console.log</code>.</p><pre><code>function suma(a,b){ return a+b; }\nfunction resta(a,b){ return a-b; }\nconsole.log(suma(50,30));\nconsole.log(resta(50,30));</code></pre>'
  },
  {
    id: 'm6-02', mundo: 6, titulo: 'Carrito de compras con array de objetos',
    historia: 'El carrito de la TiendaVirtus almacena productos como objetos. Hay errores al calcular el total.',
    objetivo: 'Crear carrito con array de objetos, calcular total con for e imprimir "Total: $150".',
    xp: 52,
    pistas: ['Cada producto es { nombre: "X", precio: N }', 'Recorré con for y sumá precio.', 'Imprimí exactamente "Total: $150".'],
    aprender: '<h3>Arrays de objetos</h3><p>Los datos complejos se modelan con objetos dentro de arrays. Permite representar productos con sus atributos.</p><h3>Acumulador</h3><p>Usamos una variable total para sumar valores al recorrer el array.</p>',
    ver: '<h3>Programa correcto</h3><pre><code>var carrito = [\n  { nombre: "Mouse", precio: 50 },\n  { nombre: "Teclado", precio: 100 }\n];\nvar total = 0;\nfor (var i = 0; i < carrito.length; i++) {\n  total = total + carrito[i].precio;\n}\nconsole.log("Total: $" + total);</code></pre>',
    detectar: '<h3>Código con errores</h3><pre><code>var carrito = [\n  { nombre: "Mouse", precio: 50 },\n  { nombre: "Teclado", precio: 100 }\n];\nvar total = 0;\nfor (var i = 0; i < carrito; i++) {\n  total = total + carrito.precio;\n}\nconsole.log("Total: " + total);</code></pre><p>¿Falta length? ¿Acceso correcto al precio?</p>',
    reparar: {
      codigoInicial: 'var carrito = [\n  { nombre: "Mouse", precio: 50 },\n  { nombre: "Teclado", precio: 100 }\n];\nvar total = 0;\nfor (var i = 0; i < carrito; i++) {\n  total = total + carrito.precio;\n}\nconsole.log("Total: " + total);',
      validar: function (out, code) {
        if (!/carrito\.length/.test(code)) return { ok: false, exp: 'Usá carrito.length en el for' };
        if (!/carrito\[i\]\.precio/.test(code)) return { ok: false, exp: 'Accedé con carrito[i].precio' };
        if (!out.includes('Total: $150')) return { ok: false, exp: 'Debe mostrar exactamente "Total: $150"' };
        return { ok: true };
      }
    },
    comprender: '<h3>Estructura de datos</h3><p>Array de objetos permite crecer el carrito. El acceso correcto es <code>carrito[i].precio</code> y condición <code>i < carrito.length</code>.</p><pre><code>for(var i=0;i<carrito.length;i++){ total += carrito[i].precio; }\nconsole.log("Total: $"+total);</code></pre>'
  },
  {
    id: 'm6-03', mundo: 6, titulo: 'Inventario con control de stock',
    historia: 'En TiendaVirtus hay que controlar stock. Cuando baja a 0, hay que avisar que no queda stock.',
    objetivo: 'Tener inventario con stock 2, restar 2 unidades e imprimir "Stock agotado" cuando queda 0.',
    xp: 53,
    pistas: ['Usá objeto producto con stock.', 'Restá cantidad vendida.', 'Si stock == 0, imprimí "Stock agotado".'],
    aprender: '<h3>Control de estados</h3><p>El stock es un estado que cambia con cada venta. Hay que validar condiciones para alertar.</p><h3>Decisiones</h3><p>Con if podemos tomar acciones según el estado actual.</p>',
    ver: '<h3>Programa correcto</h3><pre><code>var producto = {\n  nombre: "Mouse",\n  stock: 2\n};\nvar venta = 2;\nproducto.stock = producto.stock - venta;\nif (producto.stock === 0) {\n  console.log("Stock agotado");\n} else {\n  console.log("Quedan: " + producto.stock);\n}</code></pre>',
    detectar: '<h3>Código con errores</h3><pre><code>var producto = {\n  nombre: "Mouse",\n  stock: 2\n};\nproducto.stock = producto.stock - 2;\nif (producto.stock = 0) {\n  console.log("Stock agotado");\n}</code></pre><p>¿Error de asignación vs comparación?</p>',
    reparar: {
      codigoInicial: 'var producto = {\n  nombre: "Mouse",\n  stock: 2\n};\nproducto.stock = producto.stock - 2;\nif (producto.stock = 0) {\n  console.log("Stock agotado");\n}',
      validar: function (out, code) {
        if (!/stock\s*===\s*0/.test(code) && !/stock\s*==\s*0/.test(code)) return { ok: false, exp: 'Usá comparación === o == para evaluar stock' };
        if (/stock\s*=\s*0/.test(code.replace('==', '#').replace('===', '#'))) return { ok: false, exp: 'Usá comparación (== o ===), no asignación =' };
        if (!out.includes('Stock agotado')) return { ok: false, exp: 'Debe mostrar "Stock agotado"' };
        return { ok: true };
      }
    },
    comprender: '<h3>Igualdad</h3><p><code>=</code> asigna, <code>==</code> compara valor, <code>===</code> compara valor y tipo. Evitá asignar dentro de condiciones.</p>'
  },
  {
    id: 'm6-04', mundo: 6, titulo: 'Adivinar número con lógica de pistas',
    historia: 'Juego de desafío para clientes de TiendaVirtus: adivinar número con pistas.',
    objetivo: 'Comparar numeroSecreto=7 con intento=5 e imprimir "Muy bajo". Luego con intento=7 imprimir "¡Acertaste!".',
    xp: 54,
    pistas: ['Usá if, else if, else.', 'Compará > y <.', 'Mostrá exactamente "Muy bajo" y "¡Acertaste!".'],
    aprender: '<h3>Lógica de juego</h3><p>Los juegos usan comparaciones para dar feedback. if/else if permite múltiples caminos.</p>',
    ver: '<h3>Programa correcto</h3><pre><code>var numeroSecreto = 7;\nvar intento = 5;\nif (intento > numeroSecreto) {\n  console.log("Muy alto");\n} else if (intento < numeroSecreto) {\n  console.log("Muy bajo");\n} else {\n  console.log("¡Acertaste!");\n}\nintento = 7;\nif (intento === numeroSecreto) {\n  console.log("¡Acertaste!");\n}</code></pre>',
    detectar: '<h3>Código con errores</h3><pre><code>var numeroSecreto = 7;\nvar intento = 5;\nif (intento > numeroSecreto) {\n  console.log("Muy alto");\n} else (intento < numeroSecreto) {\n  console.log("Muy bajo");\n}\nintento = 7;\nif (intento = numeroSecreto) {\n  console.log("Acertaste");\n}</code></pre><p>¿Sintaxis de else if? ¿Comparación correcta?</p>',
    reparar: {
      codigoInicial: 'var numeroSecreto = 7;\nvar intento = 5;\nif (intento > numeroSecreto) {\n  console.log("Muy alto");\n} else (intento < numeroSecreto) {\n  console.log("Muy bajo");\n}\nintento = 7;\nif (intento = numeroSecreto) {\n  console.log("Acertaste");\n}',
      validar: function (out, code) {
        if (!/else\s+if\s*\(/.test(code)) return { ok: false, exp: 'Usá else if para la segunda condición' };
        if (!/intento\s*===\s*numeroSecreto/.test(code) && !/intento\s*==\s*numeroSecreto/.test(code)) return { ok: false, exp: 'Usá comparación === en el segundo if' };
        if (!out.includes('Muy bajo')) return { ok: false, exp: 'Debe mostrar "Muy bajo"' };
        if (!out.includes('¡Acertaste!')) return { ok: false, exp: 'Debe mostrar "¡Acertaste!"' };
        return { ok: true };
      }
    },
    comprender: '<h3>Estructura condicional</h3><p>Usá <code>else if</code> (no else con paréntesis). Comparación correcta evita errores lógicos.</p>'
  },
  {
    id: 'm6-05', mundo: 6, titulo: 'Semáforo: máquina de estados',
    historia: 'Sistema de seguridad de TiendaVirtus: semáforo con estados y acciones.',
    objetivo: 'Simular estados ROJO, AMARILLO, VERDE e imprimir cada estado en orden.',
    xp: 55,
    pistas: ['Usá array de estados o if encadenado.', 'Recorré estados con for.', 'Imprimí ROJO, AMARILLO, VERDE en líneas separadas.'],
    aprender: '<h3>Máquinas de estados</h3><p>Un sistema puede tener estados definidos. Recorrerlos permite simular su ciclo.</p>',
    ver: '<h3>Programa correcto</h3><pre><code>var estados = ["ROJO", "AMARILLO", "VERDE"];\nfor (var i = 0; i < estados.length; i++) {\n  console.log(estados[i]);\n}</code></pre>',
    detectar: '<h3>Código con errores</h3><pre><code>var estados = ["ROJO", "AMARILLO", "VERDE"];\nfor (var i = 0; i < 2; i++) {\n  console.log(estados[i]);\n}</code></pre><p>¿El límite del bucle es correcto?</p>',
    reparar: {
      codigoInicial: 'var estados = ["ROJO", "AMARILLO", "VERDE"];\nfor (var i = 0; i < 2; i++) {\n  console.log(estados[i]);\n}',
      validar: function (out, code) {
        if (!/estados\.length/.test(code)) return { ok: false, exp: 'Usá estados.length para recorrer todo el array' };
        if (!out.includes('ROJO')) return { ok: false, exp: 'Falta ROJO' };
        if (!out.includes('AMARILLO')) return { ok: false, exp: 'Falta AMARILLO' };
        if (!out.includes('VERDE')) return { ok: false, exp: 'Falta VERDE' };
        return { ok: true };
      }
    },
    comprender: '<h3>Recorrido dinámico</h3><p>Usar <code>.length</code> hace el código flexible ante cambios en cantidad de estados.</p>'
  },
  {
    id: 'm6-06', mundo: 6, titulo: 'Validador de formulario (email y contraseña)',
    historia: 'TiendaVirtus necesita validar registro: email debe tener @, contraseña >= 8 caracteres.',
    objetivo: 'Validar email "user@tienda.com" y pass "12345678", imprimir "Registro válido".',
    xp: 56,
    pistas: ['Usá indexOf("@") >= 0 o includes("@").', 'Longitud con .length.', 'Ambas condiciones con &&.'],
    aprender: '<h3>Validación de datos</h3><p>Validar entradas evita errores. Combinamos condiciones con AND (&&).</p><h3>Strings</h3><p><code>includes</code> o <code>indexOf</code> detectan caracteres; <code>length</code> mide longitud.</p>',
    ver: '<h3>Programa correcto</h3><pre><code>var email = "user@tienda.com";\nvar pass = "12345678";\nif (email.includes("@") && pass.length >= 8) {\n  console.log("Registro válido");\n} else {\n  console.log("Registro inválido");\n}</code></pre>',
    detectar: '<h3>Código con errores</h3><pre><code>var email = "user@tienda.com";\nvar pass = "12345678";\nif (email.includes("@") || pass.length >= 8) {\n  console.log("Registro válido");\n}</code></pre><p>¿Operador lógico correcto: AND u OR?</p>',
    reparar: {
      codigoInicial: 'var email = "user@tienda.com";\nvar pass = "12345678";\nif (email.includes("@") || pass.length >= 8) {\n  console.log("Registro válido");\n}',
      validar: function (out, code) {
        if (!/&&/.test(code)) return { ok: false, exp: 'Ambas condiciones deben cumplirse: usar &&' };
        if (!out.includes('Registro válido')) return { ok: false, exp: 'Debe mostrar "Registro válido"' };
        return { ok: true };
      }
    },
    comprender: '<h3>Lógicos</h3><p><code>&&</code> requiere ambas verdaderas. <code>||</code> alcanza con una. Para registro válido necesitamos email con @ Y contraseña >= 8.</p>'
  },
  {
    id: 'm6-07', mundo: 6, titulo: 'Agenda de contactos: búsqueda por nombre',
    historia: 'La agenda de TiendaVirtus busca clientes por nombre. El resultado debe imprimirse claramente.',
    objetivo: 'Buscar "Ana" en contactos y mostrar "Encontrado: Ana - Tel: 123".',
    xp: 57,
    pistas: ['Array de objetos contactos.', 'Recorré con for buscando nombre === "Ana".', 'Cuando encuentres, imprimí el mensaje y podés romper con break.'],
    aprender: '<h3>Búsqueda lineal</h3><p>Recorremos array comparando propiedad. Cuando encontramos, podemos detener búsqueda con <code>break</code> para optimizar.</p>',
    ver: '<h3>Programa correcto</h3><pre><code>var contactos = [\n  { nombre: "Ana", tel: "123" },\n  { nombre: "Luis", tel: "456" }\n];\nvar encontrado = null;\nfor (var i = 0; i < contactos.length; i++) {\n  if (contactos[i].nombre === "Ana") {\n    encontrado = contactos[i];\n    break;\n  }\n}\nif (encontrado !== null) {\n  console.log("Encontrado: " + encontrado.nombre + " - Tel: " + encontrado.tel);\n}</code></pre>',
    detectar: '<h3>Código con errores</h3><pre><code>var contactos = [\n  { nombre: "Ana", tel: "123" },\n  { nombre: "Luis", tel: "456" }\n];\nfor (var i = 0; i < contactos.length; i++) {\n  if (contactos[i].nombre == "Ana") {\n    console.log("Encontrado: " + contactos.nombre + " - Tel: " + contactos.tel);\n  }\n}</code></pre><p>¿Acceso correcto al objeto encontrado?</p>',
    reparar: {
      codigoInicial: 'var contactos = [\n  { nombre: "Ana", tel: "123" },\n  { nombre: "Luis", tel: "456" }\n];\nfor (var i = 0; i < contactos.length; i++) {\n  if (contactos[i].nombre == "Ana") {\n    console.log("Encontrado: " + contactos.nombre + " - Tel: " + contactos.tel);\n  }\n}',
      validar: function (out, code) {
        if (!/contactos\[i\]\.nombre/.test(code)) return { ok: false, exp: 'Usá contactos[i].nombre para comparar' };
        if (!/\.tel\b/.test(code)) return { ok: false, exp: 'Accedé al teléfono: contactos[i].tel' };
        if (!out.includes('Encontrado: Ana - Tel: 123')) return { ok: false, exp: 'Debe mostrar "Encontrado: Ana - Tel: 123"' };
        return { ok: true };
      }
    },
    comprender: '<h3>Ámbito correcto</h3><p>Dentro del bucle, el contacto actual es <code>contactos[i]</code>. No accedemos a <code>contactos.nombre</code> directamente.</p>'
  },
  {
    id: 'm6-08', mundo: 6, titulo: 'Promedio de notas con aprobado/desaprobado',
    historia: 'Sistema académico de TiendaVirtus: calcular promedio y decidir aprobado/desaprobado (>=6 aprobado).',
    objetivo: 'Notas [7,8], promedio 7.5, imprimir "Promedio: 7.5 - Aprobado".',
    xp: 58,
    pistas: ['Sumar con for, dividir por length.', 'Usá if (promedio >= 6).', 'Imprimí exactamente el formato indicado.'],
    aprender: '<h3>Promedio</h3><p>Suma de elementos / cantidad. Acumulador + contador.</p><h3>Decisión</h3><p>Umbral 6 para aprobado.</p>',
    ver: '<h3>Programa correcto</h3><pre><code>var notas = [7, 8];\nvar suma = 0;\nfor (var i = 0; i < notas.length; i++) {\n  suma = suma + notas[i];\n}\nvar promedio = suma / notas.length;\nif (promedio >= 6) {\n  console.log("Promedio: " + promedio + " - Aprobado");\n} else {\n  console.log("Promedio: " + promedio + " - Desaprobado");\n}</code></pre>',
    detectar: '<h3>Código con errores</h3><pre><code>var notas = [7, 8];\nvar suma = 0;\nfor (var i = 0; i < notas.length; i++) {\n  suma = notas[i];\n}\nvar promedio = suma / 1;\nif (promedio > 6) {\n  console.log("Promedio: " + promedio + " - Aprobado");\n}</code></pre><p>¿Acumulador correcto? ¿División? ¿Condición >=6?</p>',
    reparar: {
      codigoInicial: 'var notas = [7, 8];\nvar suma = 0;\nfor (var i = 0; i < notas.length; i++) {\n  suma = notas[i];\n}\nvar promedio = suma / 1;\nif (promedio > 6) {\n  console.log("Promedio: " + promedio + " - Aprobado");\n}',
      validar: function (out, code) {
        if (!/suma\s*=\s*suma\s*\+\s*notas\[i\]/.test(code) && !/suma\s*\+=\s*notas\[i\]/.test(code)) return { ok: false, exp: 'Sumá al acumulador: suma = suma + notas[i]' };
        if (!/suma\s*\/\s*notas\.length/.test(code)) return { ok: false, exp: 'Dividí por notas.length' };
        if (!/>=\s*6/.test(code)) return { ok: false, exp: 'Usá >= 6 para aprobado' };
        if (!out.includes('Promedio: 7.5 - Aprobado')) return { ok: false, exp: 'Debe mostrar "Promedio: 7.5 - Aprobado"' };
        return { ok: true };
      }
    },
    comprender: '<h3>Cálculo correcto</h3><p>Acumulador suma todos los elementos. Promedio = suma/cantidad. Umbral inclusivo >= 6.</p>'
  },
  {
    id: 'm6-09', mundo: 6, titulo: 'Generador de contraseñas simple',
    historia: 'TiendaVirtus genera contraseñas seguras combinando nombre + número.',
    objetivo: 'Combinar nombre="tienda", numero=123 y mostrar "tienda123".',
    xp: 59,
    pistas: ['Concatenación de strings con +.', 'Crear función generarPass(nombre, num) que devuelva string.', 'Llamar y mostrar resultado.'],
    aprender: '<h3>Concatenación</h3><p>Unimos strings con + para generar códigos personalizados.</p><h3>Funciones con retorno</h3><p>Encapsulamos lógica de generación.</p>',
    ver: '<h3>Programa correcto</h3><pre><code>function generarPass(nombre, num) {\n  return nombre + num;\n}\nvar pass = generarPass("tienda", 123);\nconsole.log(pass);</code></pre>',
    detectar: '<h3>Código con errores</h3><pre><code>function generarPass(nombre, num) {\n  nombre + num;\n}\nconsole.log(generarPass("tienda", 123));</code></pre><p>¿Falta return?</p>',
    reparar: {
      codigoInicial: 'function generarPass(nombre, num) {\n  nombre + num;\n}\nconsole.log(generarPass("tienda", 123));',
      validar: function (out, code) {
        if (!/return\s+nombre\s*\+\s*num/.test(code)) return { ok: false, exp: 'Falta return nombre + num' };
        if (!out.includes('tienda123')) return { ok: false, exp: 'Debe mostrar "tienda123"' };
        return { ok: true };
      }
    },
    comprender: '<h3>Retorno útil</h3><p>La función debe devolver el valor generado para poder usarlo (mostrar, guardar, etc.).</p>'
  },
  {
    id: 'm6-10', mundo: 6, titulo: 'Selección lógica (sin aleatoriedad en validación)',
    historia: 'TiendaVirtus necesita seleccionar un ítem recomendado. Usamos lógica determinista para validar correctamente.',
    objetivo: 'Crear array opciones ["Mouse","Teclado","Monitor"], seleccionar índice 1 e imprimir "Recomendado: Teclado".',
    xp: 60,
    pistas: ['Array fijo.', 'Elegir índice fijo (1).', 'Concatenar para formar mensaje exacto.'],
    aprender: '<h3>Selección determinista</h3><p>Para validaciones confiables, evitamos aleatoriedad. Usamos índice fijo cuando el resultado esperado es único.</p>',
    ver: '<h3>Programa correcto</h3><pre><code>var opciones = ["Mouse", "Teclado", "Monitor"];\nvar indice = 1;\nconsole.log("Recomendado: " + opciones[indice]);</code></pre>',
    detectar: '<h3>Código con errores</h3><pre><code>var opciones = ["Mouse", "Teclado", "Monitor"];\nvar indice = 3;\nconsole.log("Recomendado: " + opciones[indice]);</code></pre><p>¿Índice fuera de rango? ¿Qué índice corresponde a Teclado?</p>',
    reparar: {
      codigoInicial: 'var opciones = ["Mouse", "Teclado", "Monitor"];\nvar indice = 3;\nconsole.log("Recomendado: " + opciones[indice]);',
      validar: function (out, code) {
        if (!/indice\s*=\s*1/.test(code)) return { ok: false, exp: 'Índice debe ser 1 (Teclado)' };
        if (!out.includes('Recomendado: Teclado')) return { ok: false, exp: 'Debe mostrar "Recomendado: Teclado"' };
        return { ok: true };
      }
    },
    comprender: '<h3>Índices</h3><p>Arrays empiezan en 0: 0=Mouse, 1=Teclado, 2=Monitor. Índice 3 es undefined.</p>'
  },
  {
    id: 'm6-11', mundo: 6, titulo: 'Temporizador Pomodoro lógico (ciclos)',
    historia: 'TiendaVirtus implementa Pomodoro: 25 min trabajo / 5 min descanso, contar ciclos.',
    objetivo: 'Simular 2 ciclos completos e imprimir "Ciclos completados: 2".',
    xp: 61,
    pistas: ['Usar variable ciclos=0.', 'For de 2 iteraciones, ciclos++ cada vez.', 'Imprimir mensaje exacto.'],
    aprender: '<h3>Conteo de ciclos</h3><p>Los contadores (ciclos++) registran repeticiones completas de un proceso.</p>',
    ver: '<h3>Programa correcto</h3><pre><code>var ciclos = 0;\nfor (var i = 0; i < 2; i++) {\n  ciclos++;\n}\nconsole.log("Ciclos completados: " + ciclos);</code></pre>',
    detectar: '<h3>Código con errores</h3><pre><code>var ciclos = 0;\nfor (var i = 0; i < 2; i++) {\n  ciclos;\n}\nconsole.log("Ciclos: " + ciclos);</code></pre><p>¿Incrementamos el contador?</p>',
    reparar: {
      codigoInicial: 'var ciclos = 0;\nfor (var i = 0; i < 2; i++) {\n  ciclos;\n}\nconsole.log("Ciclos: " + ciclos);',
      validar: function (out, code) {
        if (!/ciclos\+\+/.test(code) && !/ciclos\s*\+=\s*1/.test(code) && !/ciclos\s*=\s*ciclos\s*\+\s*1/.test(code)) return { ok: false, exp: 'Incrementá ciclos con ciclos++' };
        if (!out.includes('Ciclos completados: 2')) return { ok: false, exp: 'Debe mostrar "Ciclos completados: 2"' };
        return { ok: true };
      }
    },
    comprender: '<h3>Incremento</h3><p>Sin incremento, contador no cambia. <code>ciclos++</code> suma 1 por iteración.</p>'
  },
  {
    id: 'm6-12', mundo: 6, titulo: 'Conversor de unidades con funciones',
    historia: 'TiendaVirtus necesita convertir km→m y kg→g para logística.',
    objetivo: 'Funciones kmAm(km) devuelve m (1km→1000m), kgAg(kg) devuelve g (2kg→2000g). Imprimir ambos.',
    xp: 62,
    pistas: ['Multiplicar por 1000.', 'Funciones con return.', 'Imprimir 1000 y 2000.'],
    aprender: '<h3>Funciones de conversión</h3><p>Encapsular fórmulas en funciones reutilizables. Cada función tiene responsabilidad única.</p>',
    ver: '<h3>Programa correcto</h3><pre><code>function kmAm(km) {\n  return km * 1000;\n}\nfunction kgAg(kg) {\n  return kg * 1000;\n}\nconsole.log(kmAm(1));\nconsole.log(kgAg(2));</code></pre>',
    detectar: '<h3>Código con errores</h3><pre><code>function kmAm(km) {\n  km * 1000;\n}\nfunction kgAg(kg) {\n  return kg + 1000;\n}\nconsole.log(kmAm(1));\nconsole.log(kgAg(2));</code></pre><p>¿Falta return en kmAm? ¿Operación correcta en kgAg?</p>',
    reparar: {
      codigoInicial: 'function kmAm(km) {\n  km * 1000;\n}\nfunction kgAg(kg) {\n  return kg + 1000;\n}\nconsole.log(kmAm(1));\nconsole.log(kgAg(2));',
      validar: function (out, code) {
        if (!/return\s+km\s*\*\s*1000/.test(code)) return { ok: false, exp: 'kmAm debe hacer return km * 1000' };
        if (!/return\s+kg\s*\*\s*1000/.test(code)) return { ok: false, exp: 'kgAg debe hacer return kg * 1000' };
        if (!out.includes('1000')) return { ok: false, exp: 'Debe mostrar 1000' };
        if (!out.includes('2000')) return { ok: false, exp: 'Debe mostrar 2000' };
        return { ok: true };
      }
    },
    comprender: '<h3>Fórmulas correctas</h3><p>1km=1000m, 2kg=2000g. Multiplicación, no suma.</p>'
  },
  {
    id: 'm6-13', mundo: 6, titulo: 'Gastos mensuales: reduce y mayor gasto',
    historia: 'TiendaVirtus controla gastos. Necesitamos total con acumulación y encontrar mayor gasto.',
    objetivo: 'Gastos [100,250,50], total 400. Mayor gasto 250. Imprimir "Total: 400 - Mayor: 250".',
    xp: 63,
    pistas: ['Sumar con for (acumulador).', 'Encontrar máximo: if (gasto > mayor) mayor = gasto.', 'Imprimir formato exacto.'],
    aprender: '<h3>Patrones: total y máximo</h3><p>Dos recorridos lógicos comunes: sumar todo (reduce) y encontrar máximo. Se resuelven en un solo for.</p>',
    ver: '<h3>Programa correcto</h3><pre><code>var gastos = [100, 250, 50];\nvar total = 0;\nvar mayor = 0;\nfor (var i = 0; i < gastos.length; i++) {\n  var g = gastos[i];\n  total = total + g;\n  if (g > mayor) {\n    mayor = g;\n  }\n}\nconsole.log("Total: " + total + " - Mayor: " + mayor);</code></pre>',
    detectar: '<h3>Código con errores</h3><pre><code>var gastos = [100, 250, 50];\nvar total = 0;\nvar mayor = gastos[0];\nfor (var i = 0; i < gastos.length; i++) {\n  total = gastos[i];\n  if (gastos[i] < mayor) {\n    mayor = gastos[i];\n  }\n}\nconsole.log("Total: " + total + " - Mayor: " + mayor);</code></pre><p>¿Acumulador total? ¿Condición para máximo?</p>',
    reparar: {
      codigoInicial: 'var gastos = [100, 250, 50];\nvar total = 0;\nvar mayor = gastos[0];\nfor (var i = 0; i < gastos.length; i++) {\n  total = gastos[i];\n  if (gastos[i] < mayor) {\n    mayor = gastos[i];\n  }\n}\nconsole.log("Total: " + total + " - Mayor: " + mayor);',
      validar: function (out, code) {
        if (!/total\s*=\s*total\s*\+\s*(g|gastos\[i\])/.test(code) && !/total\s*\+=\s*(g|gastos\[i\])/.test(code)) return { ok: false, exp: 'Total debe acumular: total = total + gastos[i]' };
        if (!/(g|gastos\[i\])\s*>\s*mayor/.test(code)) return { ok: false, exp: 'Para mayor, condición debe ser > (mayor que)' };
        if (!out.includes('Total: 400 - Mayor: 250')) return { ok: false, exp: 'Debe mostrar "Total: 400 - Mayor: 250"' };
        return { ok: true };
      }
    },
    comprender: '<h3>Total y máximo</h3><p>Acumulador suma todos. Para máximo comparamos con > mayor. Inicializar mayor con primer elemento es robusto.</p>'
  },
  {
    id: 'm6-14', mundo: 6, titulo: 'Mensaje secreto: cifrado César +1',
    historia: 'TiendaVirtus envía mensajes internos con cifrado simple César (desplazamiento +1 letras minúsculas).',
    objetivo: 'Cifrar "ab" con +1 → "bc". Recorrer string carácter por carácter e imprimir "bc".',
    xp: 64,
    pistas: ['Convertir a array o recorrer con índice.', 'Obtener charCodeAt, sumar 1, String.fromCharCode.', 'Concatenar resultado.'],
    aprender: '<h3>Cifrado básico</h3><p>César desplaza caracteres. Trabajamos con códigos ASCII (charCodeAt) para transformar letras.</p><h3>Iteración sobre string</h3><p>Un string se recorre por índices 0..length-1.</p>',
    ver: '<h3>Programa correcto</h3><pre><code>var texto = "ab";\nvar cifrado = "";\nfor (var i = 0; i < texto.length; i++) {\n  var codigo = texto.charCodeAt(i);\n  cifrado = cifrado + String.fromCharCode(codigo + 1);\n}\nconsole.log(cifrado);</code></pre>',
    detectar: '<h3>Código con errores</h3><pre><code>var texto = "ab";\nvar cifrado = "";\nfor (var i = 0; i < texto.length; i++) {\n  var codigo = texto.charCodeAt(i);\n  cifrado = String.fromCharCode(codigo + 1);\n}\nconsole.log(cifrado);</code></pre><p>¿Concatenamos correctamente?</p>',
    reparar: {
      codigoInicial: 'var texto = "ab";\nvar cifrado = "";\nfor (var i = 0; i < texto.length; i++) {\n  var codigo = texto.charCodeAt(i);\n  cifrado = String.fromCharCode(codigo + 1);\n}\nconsole.log(cifrado);',
      validar: function (out, code) {
        if (!/cifrado\s*=\s*cifrado\s*\+/.test(code)) return { ok: false, exp: 'Concatená: cifrado = cifrado + String.fromCharCode(...)' };
        if (!/charCodeAt/.test(code)) return { ok: false, exp: 'Usá charCodeAt para obtener código' };
        if (!/String\.fromCharCode/.test(code)) return { ok: false, exp: 'Usá String.fromCharCode para convertir' };
        if (!out.includes('bc')) return { ok: false, exp: 'Debe mostrar "bc"' };
        return { ok: true };
      }
    },
    comprender: '<h3>Transformación de caracteres</h3><p>Desplazamiento +1: a(97)->b(98), b(98)->c(99). Concatenamos cada carácter transformado.</p>'
  },
  {
    id: 'm6-15', mundo: 6, titulo: 'Deducir dígito verificador simple',
    historia: 'TiendaVirtus calcula dígito verificador: suma dígitos de número y muestra resultado.',
    objetivo: 'Para número "123", suma dígitos 1+2+3=6. Imprimir "Dígito verificador: 6".',
    xp: 65,
    pistas: ['Convertir string a caracteres.', 'parseInt o Number para cada dígito.', 'Acumular suma.'],
    aprender: '<h3>Procesamiento de dígitos</h3><p>Descomponemos un número en sus dígitos para cálculos de verificación.</p>',
    ver: '<h3>Programa correcto</h3><pre><code>var num = "123";\nvar suma = 0;\nfor (var i = 0; i < num.length; i++) {\n  suma = suma + parseInt(num[i]);\n}\nconsole.log("Dígito verificador: " + suma);</code></pre>',
    detectar: '<h3>Código con errores</h3><pre><code>var num = "123";\nvar suma = 0;\nfor (var i = 0; i < num.length; i++) {\n  suma = suma + num[i];\n}\nconsole.log("Dígito: " + suma);</code></pre><p>¿Sumamos números o strings?</p>',
    reparar: {
      codigoInicial: 'var num = "123";\nvar suma = 0;\nfor (var i = 0; i < num.length; i++) {\n  suma = suma + num[i];\n}\nconsole.log("Dígito: " + suma);',
      validar: function (out, code) {
        if (!/parseInt/.test(code) && !/Number\(/.test(code) && !/\+\s*\(\+num\[i\]\)/.test(code)) return { ok: false, exp: 'Convertí dígito a número con parseInt(num[i])' };
        if (!out.includes('Dígito verificador: 6')) return { ok: false, exp: 'Debe mostrar "Dígito verificador: 6"' };
        return { ok: true };
      }
    },
    comprender: '<h3>Conversión de tipos</h3><p>Sin parseInt, "1"+"2"+"3" concatena como string; con números suma 6.</p>'
  },
  {
    id: 'm6-16', mundo: 6, titulo: 'Robot seguidor de línea: sensores simulados',
    historia: 'TiendaVirtus diseña robot educativo. Sensores izq/der determinan acción.',
    objetivo: 'Sensores: izq=true, der=false → imprimir "Girar a la derecha". izq=false, der=true → "Girar a la izquierda".',
    xp: 66,
    pistas: ['Usar booleanos.', 'if (izq && !der)...', 'Imprimir exactamente los mensajes indicados.'],
    aprender: '<h3>Lógica booleana</h3><p>Combinamos sensores con &&, ! para representar casos del mundo real.</p>',
    ver: '<h3>Programa correcto</h3><pre><code>var izq = true;\nvar der = false;\nif (izq && !der) {\n  console.log("Girar a la derecha");\n}\nizq = false; der = true;\nif (!izq && der) {\n  console.log("Girar a la izquierda");\n}</code></pre>',
    detectar: '<h3>Código con errores</h3><pre><code>var izq = true;\nvar der = false;\nif (izq && der) {\n  console.log("Girar a la derecha");\n}\nizq = false; der = true;\nif (izq || der) {\n  console.log("Girar a la izquierda");\n}</code></pre><p>¿Negaciones y condiciones correctas?</p>',
    reparar: {
      codigoInicial: 'var izq = true;\nvar der = false;\nif (izq && der) {\n  console.log("Girar a la derecha");\n}\nizq = false; der = true;\nif (izq || der) {\n  console.log("Girar a la izquierda");\n}',
      validar: function (out, code) {
        if (!/izq\s*&&\s*!der/.test(code)) return { ok: false, exp: 'Caso 1: izq && !der' };
        if (!/!izq\s*&&\s*der/.test(code)) return { ok: false, exp: 'Caso 2: !izq && der' };
        if (!out.includes('Girar a la derecha')) return { ok: false, exp: 'Falta "Girar a la derecha"' };
        if (!out.includes('Girar a la izquierda')) return { ok: false, exp: 'Falta "Girar a la izquierda"' };
        return { ok: true };
      }
    },
    comprender: '<h3>Negación lógica</h3><p><code>!</code> invierte booleano. Solo izq activo → girar derecha; solo der activo → girar izquierda.</p>'
  },
  {
    id: 'm6-17', mundo: 6, titulo: 'Domótica completa con 3 dispositivos y modo general',
    historia: 'TiendaVirtus automatiza local: luces, ventilador, alarma con modo "noche".',
    objetivo: 'Dispositivos: luces=false, ventilador=true, alarma=true, modo="noche". Si modo noche Y alarma true → imprimir "Alarma activa". Si ventilador true → "Ventilador ON".',
    xp: 67,
    pistas: ['Usar objeto domótica.', 'Condiciones compuestas.', 'Imprimir ambos mensajes en líneas separadas.'],
    aprender: '<h3>Automatización con estados</h3><p>Agrupamos dispositivos en objeto. Reglas automáticas según modo y estado.</p>',
    ver: '<h3>Programa correcto</h3><pre><code>var domo = {\n  luces: false,\n  ventilador: true,\n  alarma: true,\n  modo: "noche"\n};\nif (domo.modo === "noche" && domo.alarma === true) {\n  console.log("Alarma activa");\n}\nif (domo.ventilador === true) {\n  console.log("Ventilador ON");\n}</code></pre>',
    detectar: '<h3>Código con errores</h3><pre><code>var domo = {\n  luces: false,\n  ventilador: true,\n  alarma: true,\n  modo: "noche"\n};\nif (domo.modo == "dia" && domo.alarma) {\n  console.log("Alarma activa");\n}\nif (domo.ventilador) {\n  console.log("Ventilador ON");\n}</code></pre><p>¿Modo correcto? ¿Condición de alarma?</p>',
    reparar: {
      codigoInicial: 'var domo = {\n  luces: false,\n  ventilador: true,\n  alarma: true,\n  modo: "noche"\n};\nif (domo.modo == "dia" && domo.alarma) {\n  console.log("Alarma activa");\n}\nif (domo.ventilador) {\n  console.log("Ventilador ON");\n}',
      validar: function (out, code) {
        if (!/modo\s*===?\s*"noche"/.test(code)) return { ok: false, exp: 'Modo debe ser "noche"' };
        if (!/alarma\s*===\s*true/.test(code) && !/domo\.alarma(?!\s*[=!])/.test(code.replace('===true',''))) return { ok: false, exp: 'Condición debe incluir alarma true y modo noche' };
        if (!out.includes('Alarma activa')) return { ok: false, exp: 'Falta "Alarma activa"' };
        if (!out.includes('Ventilador ON')) return { ok: false, exp: 'Falta "Ventilador ON"' };
        return { ok: true };
      }
    },
    comprender: '<h3>Reglas múltiples</h3><p>Podemos tener varias reglas independientes. Objeto agrupa estado del sistema.</p>'
  },
  {
    id: 'm6-18', mundo: 6, titulo: 'Invernadero: decisiones múltiples con umbrales',
    historia: 'Invernadero TiendaVirtus: temperatura y humedad deciden riego/ventilación.',
    objetivo: 'temp=30, hum=40. Si temp>25 y hum<60 → imprimir "Activar ventilación". Si hum<50 → imprimir "Necesita riego".',
    xp: 68,
    pistas: ['Condiciones compuestas.', 'if independientes o encadenados.', 'Ambos mensajes deben aparecer.'],
    aprender: '<h3>Decisiones agrícolas</h3><p>Múltiples condiciones pueden cumplirse simultáneamente (ventilación y riego). Usamos if separados.</p>',
    ver: '<h3>Programa correcto</h3><pre><code>var temp = 30;\nvar hum = 40;\nif (temp > 25 && hum < 60) {\n  console.log("Activar ventilación");\n}\nif (hum < 50) {\n  console.log("Necesita riego");\n}</code></pre>',
    detectar: '<h3>Código con errores</h3><pre><code>var temp = 30;\nvar hum = 40;\nif (temp > 25 || hum < 60) {\n  console.log("Activar ventilación");\n}\nif (hum > 50) {\n  console.log("Necesita riego");\n}</code></pre><p>¿Operador AND? ¿Condición de humedad para riego?</p>',
    reparar: {
      codigoInicial: 'var temp = 30;\nvar hum = 40;\nif (temp > 25 || hum < 60) {\n  console.log("Activar ventilación");\n}\nif (hum > 50) {\n  console.log("Necesita riego");\n}',
      validar: function (out, code) {
        if (!/&&/.test(code)) return { ok: false, exp: 'Usá && para temp>25 y hum<60' };
        if (!/hum\s*<\s*50/.test(code)) return { ok: false, exp: 'Riego cuando hum < 50' };
        if (!out.includes('Activar ventilación')) return { ok: false, exp: 'Falta "Activar ventilación"' };
        if (!out.includes('Necesita riego')) return { ok: false, exp: 'Falta "Necesita riego"' };
        return { ok: true };
      }
    },
    comprender: '<h3>Umbrales</h3><p>Condiciones compuestas representan reglas de control. hum=40 < 50 activa riego.</p>'
  },
  {
    id: 'm6-19', mundo: 6, titulo: 'Estación meteorológica: promedio, máx, mín',
    historia: 'TiendaVirtus registra lecturas: calcular promedio, máximo y mínimo.',
    objetivo: 'Lecturas [10,20,30]. Promedio 20. Máx 30. Mín 10. Imprimir "Prom:20 Max:30 Min:10".',
    xp: 69,
    pistas: ['Un solo for para calcular todo.', 'Máx: if(valor>max) max=valor. Mín: if(valor<min) min=valor.', 'Inicializar min con primer elemento.'],
    aprender: '<h3>Análisis de datos</h3><p>Procesamos array una sola vez para extraer múltiples estadísticas (eficiencia y simplicidad).</p>',
    ver: '<h3>Programa correcto</h3><pre><code>var lecturas = [10, 20, 30];\nvar suma = 0;\nvar max = lecturas[0];\nvar min = lecturas[0];\nfor (var i = 0; i < lecturas.length; i++) {\n  var v = lecturas[i];\n  suma = suma + v;\n  if (v > max) max = v;\n  if (v < min) min = v;\n}\nvar prom = suma / lecturas.length;\nconsole.log("Prom:" + prom + " Max:" + max + " Min:" + min);</code></pre>',
    detectar: '<h3>Código con errores</h3><pre><code>var lecturas = [10, 20, 30];\nvar suma = 0;\nvar max = 0; var min = 100;\nfor (var i = 0; i < lecturas.length; i++) {\n  suma = suma + lecturas[i];\n  if (lecturas[i] < max) max = lecturas[i];\n  if (lecturas[i] > min) min = lecturas[i];\n}\nconsole.log("Prom:" + suma/lecturas.length + " Max:" + max + " Min:" + min);</code></pre><p>¿Condiciones invertidas para max/min?</p>',
    reparar: {
      codigoInicial: 'var lecturas = [10, 20, 30];\nvar suma = 0;\nvar max = 0; var min = 100;\nfor (var i = 0; i < lecturas.length; i++) {\n  suma = suma + lecturas[i];\n  if (lecturas[i] < max) max = lecturas[i];\n  if (lecturas[i] > min) min = lecturas[i];\n}\nconsole.log("Prom:" + suma/lecturas.length + " Max:" + max + " Min:" + min);',
      validar: function (out, code) {
        if (!/(lecturas\[i\]|v)\s*>\s*max/.test(code)) return { ok: false, exp: 'Máximo: if (v > max) max = v' };
        if (!/(lecturas\[i\]|v)\s*<\s*min/.test(code)) return { ok: false, exp: 'Mínimo: if (v < min) min = v' };
        if (!out.includes('Prom:20 Max:30 Min:10')) return { ok: false, exp: 'Debe mostrar "Prom:20 Max:30 Min:10"' };
        return { ok: true };
      }
    },
    comprender: '<h3>Máx/Mín</h3><p>Condiciones invertidas dan resultado erróneo. También es mejor inicializar con primer elemento para arrays arbitrarios.</p>'
  },
  {
    id: 'm6-20', mundo: 6, titulo: 'Sistema de turnos: cola FIFO',
    historia: 'TiendaVirtus gestiona turnos con cola FIFO (primero en entrar, primero en salir).',
    objetivo: 'Cola ["T1","T2","T3"]. Atender (shift) → quita T1. Imprimir "Atendido: T1 - Restantes: T2,T3".',
    xp: 70,
    pistas: ['Usar shift() para extraer primero (FIFO).', 'El array restante queda con los demás.', 'Unir con join(",") para el formato.'],
    aprender: '<h3>Colas FIFO</h3><p>FIFO = First In, First Out. <code>shift()</code> elimina y devuelve el primer elemento.</p><h3>Arrays</h3><p><code>join(",")</code> convierte elementos a string separado por comas.</p>',
    ver: '<h3>Programa correcto</h3><pre><code>var cola = ["T1", "T2", "T3"];\nvar atendido = cola.shift();\nconsole.log("Atendido: " + atendido + " - Restantes: " + cola.join(","));</code></pre>',
    detectar: '<h3>Código con errores</h3><pre><code>var cola = ["T1", "T2", "T3"];\nvar atendido = cola.pop();\nconsole.log("Atendido: " + atendido + " - Restantes: " + cola.join(","));</code></pre><p>¿pop() o shift() para FIFO?</p>',
    reparar: {
      codigoInicial: 'var cola = ["T1", "T2", "T3"];\nvar atendido = cola.pop();\nconsole.log("Atendido: " + atendido + " - Restantes: " + cola.join(","));',
      validar: function (out, code) {
        if (!/\.shift\s*\(/.test(code)) return { ok: false, exp: 'Usá shift() para atender el primero (FIFO)' };
        if (!out.includes('Atendido: T1 - Restantes: T2,T3')) return { ok: false, exp: 'Debe mostrar "Atendido: T1 - Restantes: T2,T3"' };
        return { ok: true };
      }
    },
    comprender: '<h3>FIFO vs LIFO</h3><p><code>shift()</code> saca inicio (FIFO). <code>pop()</code> saca final (LIFO/pila). Turnos usan FIFO.</p>'
  },
  {
    id: 'm6-21', mundo: 6, titulo: 'Quiz interactivo de 5 preguntas con puntaje',
    historia: 'TiendaVirtus crea quiz educativo. Contar respuestas correctas.',
    objetivo: 'Respuestas [true,true,false,true,true] (4 correctas). Contar true e imprimir "Puntaje: 4/5".',
    xp: 71,
    pistas: ['Recorrer array con for.', 'Contador si respuesta es true.', 'Formato exacto "Puntaje: 4/5".'],
    aprender: '<h3>Conteo de aciertos</h3><p>Recorremos respuestas y sumamos 1 por cada acierto (true). Estadísticas de evaluación.</p>',
    ver: '<h3>Programa correcto</h3><pre><code>var respuestas = [true, true, false, true, true];\nvar correctas = 0;\nfor (var i = 0; i < respuestas.length; i++) {\n  if (respuestas[i] === true) {\n    correctas++;\n  }\n}\nconsole.log("Puntaje: " + correctas + "/5");</code></pre>',
    detectar: '<h3>Código con errores</h3><pre><code>var respuestas = [true, true, false, true, true];\nvar correctas = 0;\nfor (var i = 0; i < respuestas.length; i++) {\n  if (respuestas[i] = true) {\n    correctas++;\n  }\n}\nconsole.log("Puntaje: " + correctas + "/5");</code></pre><p>¿Comparación vs asignación?</p>',
    reparar: {
      codigoInicial: 'var respuestas = [true, true, false, true, true];\nvar correctas = 0;\nfor (var i = 0; i < respuestas.length; i++) {\n  if (respuestas[i] = true) {\n    correctas++;\n  }\n}\nconsole.log("Puntaje: " + correctas + "/5");',
      validar: function (out, code) {
        if (!/===\s*true/.test(code) && !/==\s*true/.test(code) && !respuestasTrueCheck(code)) return { ok: false, exp: 'Usá comparación === true o condición directa' };
        if (!out.includes('Puntaje: 4/5')) return { ok: false, exp: 'Debe mostrar "Puntaje: 4/5"' };
        return { ok: true };
      }
    },
    comprender: '<h3>Validación booleana</h3><p><code>if (respuestas[i])</code> es suficiente. Evitar asignación = dentro de if.</p>'
  },
  {
    id: 'm6-22', mundo: 6, titulo: 'Inventario TiendaVirtus: búsqueda y reposición',
    historia: 'Gestionar inventario: buscar producto, si stock < 5 avisar reposición.',
    objetivo: 'Productos [{nombre:"Mouse",stock:3}]. Si stock<5 → imprimir "Reponer Mouse: stock 3".',
    xp: 72,
    pistas: ['Buscar en array.', 'Condición stock < 5.', 'Mensaje exacto con nombre y stock.'],
    aprender: '<h3>Alertas de reposición</h3><p>Reglas de negocio: stock bajo dispara alerta para reponer. Integración búsqueda + regla.</p>',
    ver: '<h3>Programa correcto</h3><pre><code>var productos = [\n  { nombre: "Mouse", stock: 3 },\n  { nombre: "Teclado", stock: 10 }\n];\nfor (var i = 0; i < productos.length; i++) {\n  var p = productos[i];\n  if (p.stock < 5) {\n    console.log("Reponer " + p.nombre + ": stock " + p.stock);\n  }\n}</code></pre>',
    detectar: '<h3>Código con errores</h3><pre><code>var productos = [\n  { nombre: "Mouse", stock: 3 }\n];\nfor (var i = 0; i < productos.length; i++) {\n  if (productos.stock < 5) {\n    console.log("Reponer " + productos.nombre + ": stock " + productos.stock);\n  }\n}</code></pre><p>¿Acceso a elemento actual [i]?</p>',
    reparar: {
      codigoInicial: 'var productos = [\n  { nombre: "Mouse", stock: 3 }\n];\nfor (var i = 0; i < productos.length; i++) {\n  if (productos.stock < 5) {\n    console.log("Reponer " + productos.nombre + ": stock " + productos.stock);\n  }\n}',
      validar: function (out, code) {
        if (!/productos\[i\]\.stock/.test(code) && !/\bp\.stock/.test(code)) return { ok: false, exp: 'Usá productos[i].stock' };
        if (!/productos\[i\]\.nombre/.test(code) && !/\bp\.nombre/.test(code)) return { ok: false, exp: 'Usá productos[i].nombre' };
        if (!out.includes('Reponer Mouse: stock 3')) return { ok: false, exp: 'Debe mostrar "Reponer Mouse: stock 3"' };
        return { ok: true };
      }
    },
    comprender: '<h3>Elemento actual</h3><p>Siempre acceder al índice [i] dentro del bucle para evitar errores.</p>'
  },
  {
    id: 'm6-23', mundo: 6, titulo: 'Dashboard de ventas: tabla resumen',
    historia: 'TiendaVirtus muestra resumen de ventas con for para generar líneas.',
    objetivo: 'Ventas [100,200,150]. Imprimir tres líneas: "Venta 1: 100", "Venta 2: 200", "Venta 3: 150".',
    xp: 73,
    pistas: ['For desde 0 o 1.', 'Usar i+1 para número de venta.', 'Imprimir exactamente cada línea.'],
    aprender: '<h3>Generación de reportes</h3><p>Con bucles generamos salidas formateadas para dashboards o reportes de ventas.</p>',
    ver: '<h3>Programa correcto</h3><pre><code>var ventas = [100, 200, 150];\nfor (var i = 0; i < ventas.length; i++) {\n  console.log("Venta " + (i + 1) + ": " + ventas[i]);\n}</code></pre>',
    detectar: '<h3>Código con errores</h3><pre><code>var ventas = [100, 200, 150];\nfor (var i = 0; i < ventas.length; i++) {\n  console.log("Venta " + i + ": " + ventas[i]);\n}</code></pre><p>¿Numeración desde 1?</p>',
    reparar: {
      codigoInicial: 'var ventas = [100, 200, 150];\nfor (var i = 0; i < ventas.length; i++) {\n  console.log("Venta " + i + ": " + ventas[i]);\n}',
      validar: function (out, code) {
        if (!/\(i\s*\+\s*1\)/.test(code)) return { ok: false, exp: 'Usá (i + 1) para numerar desde 1' };
        if (!out.includes('Venta 1: 100')) return { ok: false, exp: 'Falta "Venta 1: 100"' };
        if (!out.includes('Venta 2: 200')) return { ok: false, exp: 'Falta "Venta 2: 200"' };
        if (!out.includes('Venta 3: 150')) return { ok: false, exp: 'Falta "Venta 3: 150"' };
        return { ok: true };
      }
    },
    comprender: '<h3>Numeración legible</h3><p>Índices arrays 0-based; reportes muestran 1-based para usuario.</p>'
  },
  {
    id: 'm6-24', mundo: 6, titulo: 'Codificador de mensajes binarios (texto→0/1 simple)',
    historia: 'TiendaVirtus experimenta con codificación: convertir texto a representación binaria simple por carácter (suma charCode).',
    objetivo: 'Codificar "A" (65) → mostrar "01000001" (representación 8 bits de 65).',
    xp: 74,
    pistas: ['Usar charCodeAt(0).', 'toString(2) para binario.', 'Pad con ceros a 8 dígitos: padStart(8,"0").'],
    aprender: '<h3>Representación binaria</h3><p>Convertimos código ASCII a binario. <code>toString(2)</code> devuelve base 2; <code>padStart</code> completa a 8 bits.</p>',
    ver: '<h3>Programa correcto</h3><pre><code>var texto = "A";\nvar codigo = texto.charCodeAt(0);\nvar bin = codigo.toString(2).padStart(8, "0");\nconsole.log(bin);</code></pre>',
    detectar: '<h3>Código con errores</h3><pre><code>var texto = "A";\nvar codigo = texto.charCodeAt(0);\nvar bin = codigo.toString(2);\nconsole.log(bin);</code></pre><p>¿Formato de 8 bits?</p>',
    reparar: {
      codigoInicial: 'var texto = "A";\nvar codigo = texto.charCodeAt(0);\nvar bin = codigo.toString(2);\nconsole.log(bin);',
      validar: function (out, code) {
        if (!/padStart\s*\(8\s*,\s*"0"\)/.test(code)) return { ok: false, exp: 'Usá padStart(8, "0") para 8 bits' };
        if (!out.includes('01000001')) return { ok: false, exp: 'Debe mostrar "01000001"' };
        return { ok: true };
      }
    },
    comprender: '<h3>Formato fijo</h3><p>65 decimal = 1000001 binario (7 bits); con padStart(8,"0") queda 01000001.</p>'
  },
  {
    id: 'm6-25', mundo: 6, titulo: 'Tres en raya lógico: detectar ganador',
    historia: 'TiendaVirtus crea juego lógico 3x3. Detectar línea ganadora (X).',
    objetivo: 'Tablero 3x3: [[\'X\',\'X\',\'X\'],[\' \',\' \',\' \'],[\' \',\' \',\' \']] → imprimir "Ganador: X".',
    xp: 75,
    pistas: ['Representar tablero con arrays 2D.', 'Verificar primera fila: todos X.', 'Si gana, imprimir "Ganador: X".'],
    aprender: '<h3>Estructuras 2D</h3><p>Arrays anidados representan grillas (tableros). Verificamos combinaciones ganadoras.</p>',
    ver: '<h3>Programa correcto</h3><pre><code>var tablero = [\n  ["X", "X", "X"],\n  [" ", " ", " "],\n  [" ", " ", " "]\n];\nvar ganador = null;\nif (tablero[0][0] === "X" && tablero[0][1] === "X" && tablero[0][2] === "X") {\n  ganador = "X";\n}\nif (ganador) {\n  console.log("Ganador: " + ganador);\n}</code></pre>',
    detectar: '<h3>Código con errores</h3><pre><code>var tablero = [\n  ["X", "X", "X"],\n  [" ", " ", " "],\n  [" ", " ", " "]\n];\nif (tablero[0][0] == "X" && tablero[0][1] == "X" && tablero[0][2] == "O") {\n  console.log("Ganador: X");\n}</code></pre><p>¿Condición de fila correcta?</p>',
    reparar: {
      codigoInicial: 'var tablero = [\n  ["X", "X", "X"],\n  [" ", " ", " "],\n  [" ", " ", " "]\n];\nif (tablero[0][0] == "X" && tablero[0][1] == "X" && tablero[0][2] == "O") {\n  console.log("Ganador: X");\n}',
      validar: function (out, code) {
        if (!/tablero\[0\]\[2\]\s*===?\s*"X"/.test(code)) return { ok: false, exp: 'Tercera casilla debe ser "X"' };
        if (!out.includes('Ganador: X')) return { ok: false, exp: 'Debe mostrar "Ganador: X"' };
        return { ok: true };
      }
    },
    comprender: '<h3>Lógica de victoria</h3><p>Verificamos línea completa con mismo símbolo. Arrays 2D: fila,col.</p>'
  },
  {
    id: 'm6-26', mundo: 6, titulo: 'Cascada de luces: patrón complejo con for anidado',
    historia: 'TiendaVirtus diseña efecto de luces: generar patrón de 2 filas x 2 columnas: "*","*","*","*".',
    objetivo: 'Con for anidado imprimir 4 líneas: "*", "*", "*", "*" (una por línea).',
    xp: 76,
    pistas: ['For filas, for columnas (2x2).', 'Imprimir "*" por cada celda.', 'Total 4 asteriscos, uno por línea.'],
    aprender: '<h3>Bucles anidados</h3><p>For dentro de for recorre matrices. Útil para patrones, grillas, efectos visuales.</p>',
    ver: '<h3>Programa correcto</h3><pre><code>for (var i = 0; i < 2; i++) {\n  for (var j = 0; j < 2; j++) {\n    console.log("*");\n  }\n}</code></pre>',
    detectar: '<h3>Código con errores</h3><pre><code>for (var i = 0; i < 2; i++) {\n  for (var j = 0; j < 2; j++);\n  console.log("*");\n}</code></pre><p>¿Punto y coma mal ubicado? ¿Ámbito correcto?</p>',
    reparar: {
      codigoInicial: 'for (var i = 0; i < 2; i++) {\n  for (var j = 0; j < 2; j++);\n  console.log("*");\n}',
      validar: function (out, code) {
        if (/\)\s*;/.test(code.split('console')[0])) return { ok: false, exp: 'Quitá el ; después del for interno' };
        var count = (out.match(/\*/g) || []).length;
        if (count !== 4) return { ok: false, exp: 'Debe imprimir 4 asteriscos (*)' };
        return { ok: true };
      }
    },
    comprender: '<h3>Sintaxis crítica</h3><p>Punto y coma después de ) cierra cuerpo vacío del for interno; <code>console.log</code> queda fuera del bucle interno.</p>'
  },
  {
    id: 'm6-27', mundo: 6, titulo: 'Motor con condiciones de seguridad (2 sensores + enable)',
    historia: 'Sistema de seguridad para motor en TiendaVirtus. Requiere enable true y sensores ok.',
    objetivo: 'enable=true, sensor1=true, sensor2=false → no debe arrancar. enable=true, sensor1=true, sensor2=true → imprimir "Motor ON".',
    xp: 77,
    pistas: ['Condición: enable && sensor1 && sensor2.', 'Probar ambos casos (solo segundo imprime).', 'Imprimir exactamente "Motor ON".'],
    aprender: '<h3>Seguridad por múltiples condiciones</h3><p>Sistemas críticos requieren todas las condiciones de seguridad cumplidas (AND). Fail-safe.</p>',
    ver: '<h3>Programa correcto</h3><pre><code>var enable = true;\nvar sensor1 = true;\nvar sensor2 = false;\nif (enable && sensor1 && sensor2) {\n  console.log("Motor ON");\n}\nenable = true; sensor1 = true; sensor2 = true;\nif (enable && sensor1 && sensor2) {\n  console.log("Motor ON");\n}</code></pre>',
    detectar: '<h3>Código con errores</h3><pre><code>var enable = true, sensor1 = true, sensor2 = false;\nif (enable || sensor1 || sensor2) {\n  console.log("Motor ON");\n}\nenable=true;sensor1=true;sensor2=true;\nif (enable && sensor1 && sensor2) {\n  console.log("Motor ON");\n}</code></pre><p>¿Operador para seguridad (todos deben cumplirse)?</p>',
    reparar: {
      codigoInicial: 'var enable = true, sensor1 = true, sensor2 = false;\nif (enable || sensor1 || sensor2) {\n  console.log("Motor ON");\n}\nenable=true;sensor1=true;sensor2=true;\nif (enable && sensor1 && sensor2) {\n  console.log("Motor ON");\n}',
      validar: function (out, code) {
        if (/enable\s*\|\|/.test(code)) return { ok: false, exp: 'Todavía hay un || — la seguridad necesita && en AMBAS condiciones' };
        var conds = code.match(/enable\s*&&\s*sensor1\s*&&\s*sensor2/g);
        if (!conds || conds.length < 2) return { ok: false, exp: 'Las DOS condiciones deben usar && (enable && sensor1 && sensor2)' };
        if (!out.includes('Motor ON')) return { ok: false, exp: 'Debe mostrar "Motor ON"' };
        return { ok: true };
      }
    },
    comprender: '<h3>Seguridad crítica</h3><p>Con OR basta un true (inseguro). Con AND todos deben ser true - seguridad correcta.</p>'
  },
  {
    id: 'm6-28', mundo: 6, titulo: 'Fusión de 3 sensores con promedio y umbral',
    historia: 'TiendaVirtus fusiona sensores: calcula promedio y decide acción según umbral.',
    objetivo: 'Sensores [10,20,30], promedio 20. Si promedio>=15 → imprimir "Activo".',
    xp: 78,
    pistas: ['Sumar y dividir por length.', 'Comparar promedio >=15.', 'Formato exacto.'],
    aprender: '<h3>Fusión de sensores</h3><p>Promediar reduce ruido. Umbral decide activación del sistema.</p>',
    ver: '<h3>Programa correcto</h3><pre><code>var sensores = [10, 20, 30];\nvar suma = 0;\nfor (var i = 0; i < sensores.length; i++) {\n  suma = suma + sensores[i];\n}\nvar prom = suma / sensores.length;\nif (prom >= 15) {\n  console.log("Activo");\n}</code></pre>',
    detectar: '<h3>Código con errores</h3><pre><code>var sensores = [10, 20, 30];\nvar prom = (sensores[0]+sensores[1])/2;\nif (prom > 15) {\n  console.log("Activo");\n}</code></pre><p>¿Promedio de 3 elementos? ¿Umbral >=15?</p>',
    reparar: {
      codigoInicial: 'var sensores = [10, 20, 30];\nvar prom = (sensores[0]+sensores[1])/2;\nif (prom > 15) {\n  console.log("Activo");\n}',
      validar: function (out, code) {
        if (!/sensores\.length/.test(code)) return { ok: false, exp: 'Dividí por sensores.length (3 elementos)' };
        if (!/>=\s*15/.test(code)) return { ok: false, exp: 'Usá >= 15' };
        if (!out.includes('Activo')) return { ok: false, exp: 'Debe mostrar "Activo"' };
        return { ok: true };
      }
    },
    comprender: '<h3>Promedio general</h3><p>Incluir todos los sensores. Condición inclusiva >=15.</p>'
  },
  {
    id: 'm6-29', mundo: 6, titulo: 'Auditor: validar datos con reglas',
    historia: 'Auditor de TiendaVirtus recibe reglas y valida datos de usuarios.',
    objetivo: 'Usuario {edad:20, rol:"admin"}. Reglas: edad>=18 y rol=="admin" → imprimir "Acceso autorizado".',
    xp: 79,
    pistas: ['Objeto usuario y validación compuesta.', 'Ambas condiciones true.', 'Mensaje exacto.'],
    aprender: '<h3>Validación con reglas de negocio</h3><p>Auditoría aplica reglas estrictas. Combinamos múltiples validaciones para autorización.</p>',
    ver: '<h3>Programa correcto</h3><pre><code>var usuario = {\n  edad: 20,\n  rol: "admin"\n};\nif (usuario.edad >= 18 && usuario.rol === "admin") {\n  console.log("Acceso autorizado");\n} else {\n  console.log("Acceso denegado");\n}</code></pre>',
    detectar: '<h3>Código con errores</h3><pre><code>var usuario = {\n  edad: 20,\n  rol: "admin"\n};\nif (usuario.edad > 18 || usuario.rol == "admin") {\n  console.log("Acceso autorizado");\n}</code></pre><p>¿Condiciones correctas (>=18 y AND)?</p>',
    reparar: {
      codigoInicial: 'var usuario = {\n  edad: 20,\n  rol: "admin"\n};\nif (usuario.edad > 18 || usuario.rol == "admin") {\n  console.log("Acceso autorizado");\n}',
      validar: function (out, code) {
        if (!/>=\s*18/.test(code)) return { ok: false, exp: 'Usá >= 18' };
        if (!/&&/.test(code)) return { ok: false, exp: 'Ambas reglas deben cumplirse: &&' };
        if (!out.includes('Acceso autorizado')) return { ok: false, exp: 'Debe mostrar "Acceso autorizado"' };
        return { ok: true };
      }
    },
    comprender: '<h3>Reglas estrictas</h3><p>Autorización requiere todas las condiciones. >=18 incluye edad exacta 18.</p>'
  },
  {
    id: 'm6-30', mundo: 6, titulo: 'Proyecto integrador final: TiendaVirtus completo',
    historia: 'PROYECTO FINAL de TiendaVirtus. Integramos inventario + carrito + factura impresa. El desafío más completo del juego.',
    objetivo: 'Sistema completo: inventario con stock, carrito con 2 productos, calcular total, descontar stock y mostrar factura: "FACTURA TiendaVirtus", "Mouse x1 $50", "Teclado x1 $100", "Total: $150", "Stock actualizado".',
    xp: 80,
    pistas: ['Crear inventario (array objetos), carrito, calcular total con for.', 'Descontar stock: por cada producto en carrito, restar 1 al stock correspondiente.', 'Imprimir factura con líneas exactas indicadas.'],
    aprender: '<h3>Integración de sistemas</h3><p>Un proyecto real integra múltiples módulos: inventario (estado), carrito (compra), facturación (salida). Esto requiere modelado de datos, lógica de negocio y presentación.</p><h3>Descomposición</h3><p>Resolvé por partes: datos → cálculos → actualizaciones de estado → salida impresa. Ese es el enfoque de ingeniería.</p>',
    ver: '<h3>Programa correcto</h3><pre><code>var inventario = [\n  { nombre: "Mouse", stock: 10, precio: 50 },\n  { nombre: "Teclado", stock: 5, precio: 100 }\n];\nvar carrito = [\n  { nombre: "Mouse", cant: 1 },\n  { nombre: "Teclado", cant: 1 }\n];\nvar total = 0;\n// Calcular total\nfor (var i = 0; i < carrito.length; i++) {\n  var item = carrito[i];\n  for (var j = 0; j < inventario.length; j++) {\n    if (inventario[j].nombre === item.nombre) {\n      total = total + inventario[j].precio * item.cant;\n    }\n  }\n}\n// Descontar stock\nfor (var i = 0; i < carrito.length; i++) {\n  var item = carrito[i];\n  for (var j = 0; j < inventario.length; j++) {\n    if (inventario[j].nombre === item.nombre) {\n      inventario[j].stock = inventario[j].stock - item.cant;\n    }\n  }\n}\n// Imprimir factura\nconsole.log("FACTURA TiendaVirtus");\nconsole.log("Mouse x1 $50");\nconsole.log("Teclado x1 $100");\nconsole.log("Total: $150");\nconsole.log("Stock actualizado");</code></pre>',
    detectar: '<h3>Código con errores</h3><pre><code>var inventario = [\n  { nombre: "Mouse", stock: 10, precio: 50 },\n  { nombre: "Teclado", stock: 5, precio: 100 }\n];\nvar carrito = [\n  { nombre: "Mouse", cant: 1 },\n  { nombre: "Teclado", cant: 1 }\n];\nvar total = 0;\nfor (var i = 0; i < carrito.length; i++) {\n  total = total + inventario[i].precio * carrito[i].cant;\n}\nfor (var i = 0; i < carrito.length; i++) {\n  inventario[i].stock = inventario[i].stock - carrito[i].cant;\n}\nconsole.log("FACTURA TiendaVirtus");\nconsole.log("Mouse x1 $50");\nconsole.log("Teclado x1 $100");\nconsole.log("Total: $150");</code></pre><p>¿Coinciden índices entre carrito e inventario? ¿Falta actualizar stock correctamente? ¿Falta línea final?</p>',
    reparar: {
      codigoInicial: 'var inventario = [\n  { nombre: "Mouse", stock: 10, precio: 50 },\n  { nombre: "Teclado", stock: 5, precio: 100 }\n];\nvar carrito = [\n  { nombre: "Mouse", cant: 1 },\n  { nombre: "Teclado", cant: 1 }\n];\nvar total = 0;\nfor (var i = 0; i < carrito.length; i++) {\n  total = total + inventario[i].precio * carrito[i].cant;\n}\nfor (var i = 0; i < carrito.length; i++) {\n  inventario[i].stock = inventario[i].stock - carrito[i].cant;\n}\nconsole.log("FACTURA TiendaVirtus");\nconsole.log("Mouse x1 $50");\nconsole.log("Teclado x1 $100");\nconsole.log("Total: $150");',
      validar: function (out, code) {
        if (!/for\s*\(var\s+j\s*=/.test(code)) return { ok: false, exp: 'Necesitás buscar producto por nombre (bucle anidado o búsqueda)' };
        if (!/inventario\[j\]\.nombre\s*===\s*item\.nombre/.test(code) && !/inventario\[j\]\.nombre\s*==\s*item\.nombre/.test(code)) return { ok: false, exp: 'Buscá coincidencia por nombre entre carrito e inventario' };
        if (!out.includes('FACTURA TiendaVirtus')) return { ok: false, exp: 'Falta encabezado de factura' };
        if (!out.includes('Mouse x1 $50')) return { ok: false, exp: 'Falta línea Mouse x1 $50' };
        if (!out.includes('Teclado x1 $100')) return { ok: false, exp: 'Falta línea Teclado x1 $100' };
        if (!out.includes('Total: $150')) return { ok: false, exp: 'Falta Total: $150' };
        if (!out.includes('Stock actualizado')) return { ok: false, exp: 'Falta "Stock actualizado"' };
        return { ok: true };
      }
    },
    comprender: '<h3>Proyecto integrador</h3><p>Integramos: modelo de datos (objetos), búsqueda (for anidado por nombre), cálculos (total), mutación de estado (stock), y salida formateada (factura). Es un mini-sistema completo de TiendaVirtus.</p><pre><code>// Búsqueda por nombre garantiza integridad entre estructuras\ntotal += inventario[j].precio * item.cant;\ninventario[j].stock -= item.cant;</code></pre>'
  }
);