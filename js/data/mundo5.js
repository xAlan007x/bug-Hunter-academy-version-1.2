MISIONES.push(
  // ═══════════════════════════════════════════════════════════
  // MUNDO 5: AUTOMATIZACIÓN (lógica de sensores y procesos)
  // ═══════════════════════════════════════════════════════════
  {
    id: 'm5-01', mundo: 5, titulo: 'Secuencia automática de luces',
    historia: 'El decorador de la tienda quiere que las luces del escaparte prendan y apaguen solas en ciclos, como un letrero automático.',
    objetivo: 'Hacer que la luz alterne: encendida en el ciclo 1, apagada en el 2 y encendida en el 3.',
    xp: 40,
    pistas: ['Una luz encendida/apagada se representa con un booleano: true = encendida, false = apagada.', 'Para alternar hay que invertir el valor en cada vuelta: luz = !luz', 'Poné luz = !luz; antes del console.log dentro del bucle.'],
    aprender: '<h3>Secuencias automáticas</h3><p>Muchas automatizaciones solo alternan un estado en cada paso: una luz de alerta, un motor que cicla, un ventilador que breath. La clave es un <strong>flag booleano</strong> y la negación <code>!</code> que invierte true/false.</p><pre><code>let luz = false;\nluz = !luz; // ahora es true\nluz = !luz; // ahora es false otra vez</code></pre>',
    ver: '<h3>Secuencia correcta</h3><pre><code>let luz = false;\nfor (let i = 1; i <= 3; i++) {\n  luz = !luz;\n  console.log("Ciclo " + i + ": " + (luz ? "encendida" : "apagada"));\n}</code></pre><p>Alterna: encendida, apagada, encendida.</p>',
    detectar: '<h3>Código con error</h3><pre><code>let luz = false;\nfor (let i = 1; i <= 3; i++) {\n  console.log("Ciclo " + i + ": " + (luz ? "encendida" : "apagada"));\n}</code></pre><p>Siempre dice "apagada". ¿Dónde debería invertirse el valor de luz?</p>',
    reparar: {
      codigoInicial: 'let luz = false;\nfor (let i = 1; i <= 3; i++) {\n  console.log("Ciclo " + i + ": " + (luz ? "encendida" : "apagada"));\n}',
      validar: function (out, code) {
        if (!/luz\s*=\s*!luz/.test(code)) return { ok: false, exp: 'Falta alternar la luz: luz = !luz;' };
        if (!out.includes('Ciclo 1: encendida')) return { ok: false, exp: 'El ciclo 1 debe mostrar encendida' };
        if (!out.includes('Ciclo 2: apagada')) return { ok: false, exp: 'El ciclo 2 debe mostrar apagada' };
        return { ok: true };
      }
    },
    comprender: '<h3>¿Por qué fallaba?</h3><p>La variable <code>luz</code> nunca cambiaba: seguía en false siempre. Con <code>luz = !luz</code> se invierte en cada vuelta y el estado alterna automáticamente.</p>'
  },
  {
    id: 'm5-02', mundo: 5, titulo: 'Temporizador regresivo',
    historia: 'La máquina de la panadería necesita una cuenta regresiva de 5 segundos antes de abrir el horno.',
    objetivo: 'Imprimir "Faltan 5 segundos" hasta "Faltan 1 segundos" y después "¡Despegue!".',
    xp: 40,
    pistas: ['Un for puede empezar en 5 y bajar: for (let s = 5; s > 0; s--)', 's-- resta 1 en cada vuelta.', 'El temporizador debe terminar con console.log("¡Despegue!");'],
    aprender: '<h3>Cuenta regresiva</h3><p>Un <code>for</code> no siempre cuenta hacia arriba. Podés iniciar en un valor alto y decrementar hasta llegar a cero.</p><pre><code>for (let s = 3; s > 0; s--) {\n  console.log(s);\n}</code></pre><p>Esto imprime 3, 2, 1 y se detiene.</p>',
    ver: '<h3>Temporizador correcto</h3><pre><code>for (let s = 5; s > 0; s--) {\n  console.log("Faltan " + s + " segundos");\n}\nconsole.log("¡Despegue!");</code></pre>',
    detectar: '<h3>Código con error</h3><pre><code>for (let s = 1; s <= 5; s++) {\n  console.log("Faltan " + s + " segundos");\n}\nconsole.log("¡Despegue!");</code></pre><p>Cuenta hacia arriba: "Faltan 1", "Faltan 2"... ¿Cómo se hace una cuenta regresiva?</p>',
    reparar: {
      codigoInicial: 'for (let s = 1; s <= 5; s++) {\n  console.log("Faltan " + s + " segundos");\n}\nconsole.log("¡Despegue!");',
      validar: function (out, code) {
        if (!/s--/.test(code) && !/s\s*-=\s*1/.test(code)) return { ok: false, exp: 'El contador debe restar: for (let s = 5; s > 0; s--)' };
        if (!out.includes('Faltan 5 segundos')) return { ok: false, exp: 'Debe empezar con Faltan 5 segundos' };
        if (!out.includes('¡Despegue!')) return { ok: false, exp: 'Al terminar debe mostrar ¡Despegue!' };
        return { ok: true };
      }
    },
    comprender: '<h3>Cuenta regresiva</h3><p>Hay tres cambios clave: arrancar en <code>s = 5</code>, comparar con <code>s > 0</code> y decrementar con <code>s--</code>. Así el bucle recorre 5, 4, 3, 2, 1 y para.</p>'
  },
  {
    id: 'm5-03', mundo: 5, titulo: 'Contador de piezas',
    historia: 'El brazo robótico de la fábrica detecta piezas una por una. Cuando juntó 10, debe pararse y avisar el total.',
    objetivo: 'Contar 10 piezas detectadas y mostrar "Piezas procesadas: 10".',
    xp: 41,
    pistas: ['Necesitás una variable que empiece en 0 y crezca en cada vuelta.', 'Sumá una pieza con piezas++ dentro del bucle.', 'Al final: console.log("Piezas procesadas: " + piezas);'],
    aprender: '<h3>Contadores</h3><p>Un contador acumula ocurrencias. Se declara fuera del bucle (para que no se reinicie) y se incrementa dentro.</p><pre><code>let contador = 0;\nfor (let i = 0; i < 3; i++) {\n  contador++;\n}\n// contador vale 3</code></pre>',
    ver: '<h3>Contador correcto</h3><pre><code>let piezas = 0;\nfor (let i = 0; i < 10; i++) {\n  console.log("Pieza " + (i + 1) + " detectada");\n  piezas++;\n}\nconsole.log("Piezas procesadas: " + piezas);</code></pre>',
    detectar: '<h3>Código con error</h3><pre><code>let piezas = 0;\nfor (let i = 0; i < 10; i++) {\n  console.log("Pieza " + (i + 1) + " detectada");\n}\nconsole.log("Piezas procesadas: " + piezas);</code></pre><p>Detecta 10 piezas pero el total dice 0. ¿Qué falta?</p>',
    reparar: {
      codigoInicial: 'let piezas = 0;\nfor (let i = 0; i < 10; i++) {\n  console.log("Pieza " + (i + 1) + " detectada");\n}\nconsole.log("Piezas procesadas: " + piezas);',
      validar: function (out, code) {
        if (!/piezas\+\+/.test(code) && !/piezas\s*\+=\s*1/.test(code) && !/piezas\s*=\s*piezas\s*\+\s*1/.test(code)) return { ok: false, exp: 'Sumá una pieza en cada vuelta: piezas++' };
        if (!out.includes('Piezas procesadas: 10')) return { ok: false, exp: 'Debe terminar con Piezas procesadas: 10' };
        return { ok: true };
      }
    },
    comprender: '<h3>El contador nunca subía</h3><p>La variable <code>piezas</code> se declaraba en 0 pero nadie la modificaba. Con <code>piezas++</code> acumula cada detección y el total final es correcto.</p>'
  },
  {
    id: 'm5-04', mundo: 5, titulo: 'Umbral de luz simple',
    historia: 'El sensor de luz del invernadero mide valores de 0 a 1023. Si la lectura pasa de 700, hay que encender el LED de sol artificial.',
    objetivo: 'Encender el LED (mostrar "LED: ON") solo si luz es mayor a 700. Con luz = 850 debe dar ON.',
    xp: 41,
    pistas: ['Compará la lectura con el umbral: if (luz > 700)', 'Si la condición es verdadera mostrá "LED: ON", si no "LED: OFF".', 'El valor const luz = 850 ya está en el código.'],
    aprender: '<h3>Umbrales</h3><p>Un umbral es el valor límite que separa dos comportamientos. Los sensores devuelven números y el programa decide con una comparación.</p><pre><code>const luz = 850;\nif (luz > 700) {\n  console.log("LED: ON");\n} else {\n  console.log("LED: OFF");\n}</code></pre>',
    ver: '<h3>Umbral correcto</h3><pre><code>const luz = 850;\nif (luz > 700) {\n  console.log("LED: ON");\n} else {\n  console.log("LED: OFF");\n}</code></pre>',
    detectar: '<h3>Código con error</h3><pre><code>const luz = 850;\nif (luz < 700) {\n  console.log("LED: ON");\n} else {\n  console.log("LED: OFF");\n}</code></pre><p>Con 850 el LED debería estar ON pero dice OFF. Revisá el operador.</p>',
    reparar: {
      codigoInicial: 'const luz = 850;\nif (luz < 700) {\n  console.log("LED: ON");\n} else {\n  console.log("LED: OFF");\n}',
      validar: function (out, code) {
        if (!/luz\s*>\s*700/.test(code)) return { ok: false, exp: 'El umbral es luz > 700 (mayor, no menor)' };
        if (!out.includes('LED: ON')) return { ok: false, exp: 'Con luz=850 el LED debe estar ON' };
        return { ok: true };
      }
    },
    comprender: '<h3>Operador incorrecto</h3><p>850 no es menor a 700, así que el if era falso. Con <code>luz > 700</code> la condición se cumple y el LED se enciende.</p>'
  },
  {
    id: 'm5-05', mundo: 5, titulo: 'Histéresis de luz',
    historia: 'Un solo umbral hace que el LED de la alarma parpadee sin parar cuando la luz oscila cerca del valor límite. El electricista pide histéresis: prender a 700 y apagar recién a 300.',
    objetivo: 'Usar dos umbrales: encender el LED si luz > 700 y apagarlo solo si luz < 300, manteniendo el estado en el medio.',
    xp: 42,
    pistas: ['Necesitás un flag led que recuerda si está ON u OFF.', 'Usá if (luz > 700) para encender y else if (luz < 300) para apagar.', 'En el medio (entre 300 y 700) no toques el flag: mantiene el estado anterior.'],
    aprender: '<h3>Histéresis</h3><p>Es separar el umbral de encendido del de apagado para evitar ciclados. La luz 400 no enciende el LED desde cero, pero si ya estaba ON lo mantiene.</p><pre><code>if (luz > 700) led = true;\nelse if (luz < 300) led = false;\n// entre 300 y 700: led no cambia</code></pre>',
    ver: '<h3>Histéresis correcta</h3><pre><code>const lecturas = [200, 500, 800, 600, 400, 250];\nlet led = false;\nfor (let i = 0; i < lecturas.length; i++) {\n  const luz = lecturas[i];\n  if (luz > 700) led = true;\n  else if (luz < 300) led = false;\n  console.log("Luz " + luz + ": LED " + (led ? "ON" : "OFF"));\n}</code></pre><p>La luz 400 mantiene el LED ON porque está en la zona muerta.</p>',
    detectar: '<h3>Código con error</h3><pre><code>const lecturas = [200, 500, 800, 600, 400, 250];\nlet led = false;\nfor (let i = 0; i < lecturas.length; i++) {\n  const luz = lecturas[i];\n  if (luz > 500) led = true;\n  else led = false;\n  console.log("Luz " + luz + ": LED " + (led ? "ON" : "OFF"));\n}</code></pre><p>El LED se apaga con 400 aunque estuviera encendido. ¿Dónde está la zona muerta?</p>',
    reparar: {
      codigoInicial: 'const lecturas = [200, 500, 800, 600, 400, 250];\nlet led = false;\nfor (let i = 0; i < lecturas.length; i++) {\n  const luz = lecturas[i];\n  if (luz > 500) led = true;\n  else led = false;\n  console.log("Luz " + luz + ": LED " + (led ? "ON" : "OFF"));\n}',
      validar: function (out, code) {
        if (!/luz\s*>\s*700/.test(code)) return { ok: false, exp: 'El umbral de encendido es 700: if (luz > 700)' };
        if (!/luz\s*<\s*300/.test(code)) return { ok: false, exp: 'El umbral de apagado es 300: else if (luz < 300)' };
        if (!out.includes('Luz 400: LED ON')) return { ok: false, exp: 'Con histéresis, la luz 400 debe mantener el LED ON' };
        if (!out.includes('Luz 250: LED OFF')) return { ok: false, exp: 'Con luz 250 (menor a 300) el LED debe apagarse' };
        return { ok: true };
      }
    },
    comprender: '<h3>La zona muerta</h3><p>La histéresis crea una franja entre 300 y 700 donde el estado no cambia. Así una lectura inestable en el medio no hace parpadear el LED: solo se apaga al bajar de 300 o se enciende al pasar de 700.</p>'
  },
  {
    id: 'm5-06', mundo: 5, titulo: 'Semáforo de peatones',
    historia: 'El semáforo del cruce de la escuela debe mostrar primero la luz ROJO (pensá) y después VERDE (caminá), en ese orden exacto.',
    objetivo: 'Recorrer el array de luces mostrando ROJO primero y VERDE después, y al final "Ciclo completo".',
    xp: 42,
    pistas: ['El orden del array define el orden del semáforo.', 'El array debe empezar con "ROJO" y seguir con "VERDE".', 'Recorré el array con un for y mostrá cada luz con console.log.'],
    aprender: '<h3>Secuencias con arrays</h3><p>Un array guarda una lista ordenada. El programa la recorre posición por posición, así que el orden de los elementos es el orden de ejecución.</p><pre><code>const luces = ["ROJO", "VERDE"];\nfor (let i = 0; i < luces.length; i++) {\n  console.log("Semáforo: " + luces[i]);\n}</code></pre>',
    ver: '<h3>Semáforo correcto</h3><pre><code>const luces = ["ROJO", "VERDE"];\nfor (let i = 0; i < luces.length; i++) {\n  console.log("Semáforo: " + luces[i]);\n}\nconsole.log("Ciclo completo");</code></pre>',
    detectar: '<h3>Código con error</h3><pre><code>const luces = ["VERDE", "ROJO"];\nfor (let i = 0; i < luces.length; i++) {\n  console.log("Semáforo: " + luces[i]);\n}\nconsole.log("Ciclo completo");</code></pre><p>Los peatones cruzarían con luz roja. ¿En qué orden debe ir el array?</p>',
    reparar: {
      codigoInicial: 'const luces = ["VERDE", "ROJO"];\nfor (let i = 0; i < luces.length; i++) {\n  console.log("Semáforo: " + luces[i]);\n}\nconsole.log("Ciclo completo");',
      validar: function (out, code) {
        if (!/luces\s*=\s*\[\s*["']ROJO["']\s*,\s*["']VERDE["']\s*\]/.test(code)) return { ok: false, exp: 'El orden correcto es: const luces = ["ROJO", "VERDE"];' };
        if (out.indexOf('Semáforo: ROJO') === -1 || out.indexOf('Semáforo: ROJO') > out.indexOf('Semáforo: VERDE')) return { ok: false, exp: 'Debe mostrar ROJO antes que VERDE' };
        if (!out.includes('Ciclo completo')) return { ok: false, exp: 'Falta el mensaje final: Ciclo completo' };
        return { ok: true };
      }
    },
    comprender: '<h3>El orden importa</h3><p>El bucle respeta el orden del array. Al invertirlo, el semáforo arrancaba en VERDE. Una secuencia de seguridad siempre se define con el orden correcto de los datos.</p>'
  },
  {
    id: 'm5-07', mundo: 5, titulo: 'Máquina de estados de ruido',
    historia: 'El sensor de ruido de la planta tiene tres estados: APAGADO (hasta 600), ALERTA (hasta 900) y ALARMA (más de 900). Hay que implementar la máquina de estados completa.',
    objetivo: 'Clasificar cada lectura: APAGADO si ruido <= 600, ALERTA si ruido <= 900 y ALARMA si ruido > 900.',
    xp: 43,
    pistas: ['Usá if / else if / else para cubrir los tres estados.', 'Primero preguntá si ruido > 900 (ALARMA), después si ruido > 600 (ALERTA).', 'El else final cubre el estado APAGADO.'],
    aprender: '<h3>Máquina de estados</h3><p>Un sistema está en un estado cada vez y cambia según las condiciones. Con condiciones mutuamente exclusivas se usan <code>if / else if / else</code> encadenados.</p><pre><code>if (valor > 900) estado = "ALARMA";\nelse if (valor > 600) estado = "ALERTA";\nelse estado = "APAGADO";</code></pre>',
    ver: '<h3>Máquina correcta</h3><pre><code>const lecturas = [200, 750, 950];\nlet estado = "APAGADO";\nfor (let i = 0; i < lecturas.length; i++) {\n  const ruido = lecturas[i];\n  if (ruido > 900) estado = "ALARMA";\n  else if (ruido > 600) estado = "ALERTA";\n  else estado = "APAGADO";\n  console.log("Ruido " + ruido + " → " + estado);\n}</code></pre>',
    detectar: '<h3>Código con error</h3><pre><code>const lecturas = [200, 750, 950];\nlet estado = "APAGADO";\nfor (let i = 0; i < lecturas.length; i++) {\n  const ruido = lecturas[i];\n  if (ruido > 900) estado = "ALARMA";\n  else estado = "APAGADO";\n  console.log("Ruido " + ruido + " → " + estado);\n}</code></pre><p>La lectura 750 debería ser ALERTA pero dice APAGADO. ¿Qué estado falta?</p>',
    reparar: {
      codigoInicial: 'const lecturas = [200, 750, 950];\nlet estado = "APAGADO";\nfor (let i = 0; i < lecturas.length; i++) {\n  const ruido = lecturas[i];\n  if (ruido > 900) estado = "ALARMA";\n  else estado = "APAGADO";\n  console.log("Ruido " + ruido + " → " + estado);\n}',
      validar: function (out, code) {
        if (!/ruido\s*>\s*600/.test(code)) return { ok: false, exp: 'Falta el estado intermedio: else if (ruido > 600)' };
        if (!/ALERTA/.test(code)) return { ok: false, exp: 'El estado intermedio se llama ALERTA' };
        if (!out.includes('Ruido 750 → ALERTA')) return { ok: false, exp: '750 debe clasificarse como ALERTA' };
        if (!out.includes('Ruido 950 → ALARMA')) return { ok: false, exp: '950 debe clasificarse como ALARMA' };
        return { ok: true };
      }
    },
    comprender: '<h3>Tres estados, dos cortes</h3><p>Para tres estados hacen falta dos cortes: > 900 y > 600. El <code>else if</code> solo se evalúa si el anterior falló, así que 950 cae en ALARMA y 750 en ALERTA.</p>'
  },
  {
    id: 'm5-08', mundo: 5, titulo: 'Banda transportadora',
    historia: 'La banda de la fábrica recibe 5 cajas. Hay que registrar cada una y mostrar el total al final del turno.',
    objetivo: 'Registrar las 5 piezas de la banda y mostrar "Total de piezas: 5".',
    xp: 43,
    pistas: ['Acumulá el total en una variable declarada antes del bucle.', 'Dentro del bucle sumá: total = total + 1', 'Al final: console.log("Total de piezas: " + total);'],
    aprender: '<h3>Acumuladores</h3><p>Un acumulador suma valores a lo largo del proceso. La variable se crea fuera del bucle con valor 0 para que el total sobreviva a cada vuelta.</p><pre><code>let total = 0;\nfor (let i = 0; i < 5; i++) {\n  total = total + 1;\n}</code></pre>',
    ver: '<h3>Banda correcta</h3><pre><code>let total = 0;\nfor (let i = 1; i <= 5; i++) {\n  total = total + 1;\n  console.log("Pieza " + i + " sobre la banda");\n}\nconsole.log("Total de piezas: " + total);</code></pre>',
    detectar: '<h3>Código con error</h3><pre><code>let total = 0;\nfor (let i = 1; i <= 5; i++) {\n  console.log("Pieza " + i + " sobre la banda");\n}\nconsole.log("Total de piezas: " + total);</code></pre><p>Pasa el mensaje pero el total queda en 0. ¿Qué línea falta?</p>',
    reparar: {
      codigoInicial: 'let total = 0;\nfor (let i = 1; i <= 5; i++) {\n  console.log("Pieza " + i + " sobre la banda");\n}\nconsole.log("Total de piezas: " + total);',
      validar: function (out, code) {
        if (!/total\s*=\s*total\s*\+\s*1/.test(code) && !/total\+\+/.test(code) && !/total\s*\+=\s*1/.test(code)) return { ok: false, exp: 'Acumulá cada pieza: total = total + 1;' };
        if (!out.includes('Total de piezas: 5')) return { ok: false, exp: 'Debe mostrar Total de piezas: 5' };
        return { ok: true };
      }
    },
    comprender: '<h3>El acumulador no sumaba</h3><p>El bucle mostraba los mensajes pero nunca modificaba <code>total</code>. Con <code>total = total + 1</code> cada caja suma uno y el cierre del turno da 5.</p>'
  },
  {
    id: 'm5-09', mundo: 5, titulo: 'Alarma por intentos fallidos',
    historia: 'La caja fuerte de la tienda cuenta intentos fallidos de apertura. A la tercera vez seguida debe saltar la alarma.',
    objetivo: 'Contar los intentos fallidos y activar la alarma cuando sean 3 o más.',
    xp: 44,
    pistas: ['Contá los false del array intentos en una variable fallidos.', 'La condición de alarma debe aceptar 3: usá >= 3.', 'Mostrá cada intento fallido y al final la alarma.'],
    aprender: '<h3>Contadores con condición final</h3><p>El patrón es: acumular eventos y al final evaluar un umbral. Ojo con <code>&gt;</code> vs <code>&gt;=</code>: si el límite es exactamente 3, necesitás mayor o igual.</p><pre><code>if (fallidos >= 3) {\n  console.log("ALARMA activada");\n}</code></pre>',
    ver: '<h3>Alarma correcta</h3><pre><code>const intentos = [false, false, false];\nlet fallidos = 0;\nfor (let i = 0; i < intentos.length; i++) {\n  if (!intentos[i]) {\n    fallidos++;\n    console.log("Intento " + (i + 1) + " fallido");\n  }\n}\nif (fallidos >= 3) {\n  console.log("ALARMA activada");\n}</code></pre>',
    detectar: '<h3>Código con error</h3><pre><code>const intentos = [false, false, false];\nlet fallidos = 0;\nfor (let i = 0; i < intentos.length; i++) {\n  if (!intentos[i]) {\n    fallidos++;\n    console.log("Intento " + (i + 1) + " fallido");\n  }\n}\nif (fallidos > 3) {\n  console.log("ALARMA activada");\n}</code></pre><p>Cuenta 3 fallidos pero la alarma no salta. ¿3 > 3 es verdadero?</p>',
    reparar: {
      codigoInicial: 'const intentos = [false, false, false];\nlet fallidos = 0;\nfor (let i = 0; i < intentos.length; i++) {\n  if (!intentos[i]) {\n    fallidos++;\n    console.log("Intento " + (i + 1) + " fallido");\n  }\n}\nif (fallidos > 3) {\n  console.log("ALARMA activada");\n}',
      validar: function (out, code) {
        if (!/fallidos\s*>=\s*3/.test(code)) return { ok: false, exp: 'Usá mayor o igual: if (fallidos >= 3)' };
        if (!out.includes('ALARMA activada')) return { ok: false, exp: 'Con 3 fallidos debe activarse la ALARMA' };
        return { ok: true };
      }
    },
    comprender: '<h3>Mayor vs mayor o igual</h3><p>3 no es mayor a 3, por eso el if nunca se cumplía. Con <code>&gt;=</code> el valor exacto del umbral también activa la alarma.</p>'
  },
  {
    id: 'm5-10', mundo: 5, titulo: 'Acceso con PIN',
    historia: 'La puerta del depósito tiene PIN 1234, pero alguien ingresó 9999 y el sistema igual decía "Acceso concedido". Hay un bug peligroso en la comparación.',
    objetivo: 'Comparar el PIN ingresado (9999) con el correcto (1234) para que muestre "Acceso denegado".',
    xp: 44,
    pistas: ['Un solo = asigna un valor, no compara.', 'Para comparar valores usá === (comparación exacta).', 'Cambiá el = del if por === y revisá qué imprime.'],
    aprender: '<h3>= vs ===</h3><p><code>=</code> asigna y la condición evalúa el valor asignado (siempre "1234" es verdadero). <code>===</code> compara sin convertir tipos y devuelve true solo si son iguales.</p><pre><code>if (pinIngresado === pinCorrecto) {\n  console.log("Acceso concedido");\n}</code></pre>',
    ver: '<h3>Comparación correcta</h3><pre><code>const pinCorrecto = "1234";\nconst pinIngresado = "9999";\nif (pinIngresado === pinCorrecto) {\n  console.log("Acceso concedido");\n} else {\n  console.log("Acceso denegado");\n}</code></pre><p>Como 9999 no es 1234, el acceso se deniega correctamente.</p>',
    detectar: '<h3>Código con error</h3><pre><code>const pinCorrecto = "1234";\nconst pinIngresado = "9999";\nif (pinIngresado = pinCorrecto) {\n  console.log("Acceso concedido");\n} else {\n  console.log("Acceso denegado");\n}</code></pre><p>Da "concedido" aunque el PIN sea 9999. ¿Qué operador debería usarse?</p>',
    reparar: {
      codigoInicial: 'const pinCorrecto = "1234";\nconst pinIngresado = "9999";\nif (pinIngresado = pinCorrecto) {\n  console.log("Acceso concedido");\n} else {\n  console.log("Acceso denegado");\n}',
      validar: function (out, code) {
        if (!/pinIngresado\s*===\s*pinCorrecto/.test(code)) return { ok: false, exp: 'Compará con === : if (pinIngresado === pinCorrecto)' };
        if (!out.includes('Acceso denegado')) return { ok: false, exp: 'Con PIN 9999 debe mostrar Acceso denegado' };
        return { ok: true };
      }
    },
    comprender: '<h3>La asignación disfrazada de comparación</h3><p><code>pinIngresado = pinCorrecto</code> sobrescribe el PIN con "1234" y devuelve ese texto, que es verdadero. Por eso siempre concedía el acceso. Con <code>===</code> se comparan los valores y el PIN incorrecto se rechaza.</p>'
  },
  {
    id: 'm5-11', mundo: 5, titulo: 'Dos sensores con AND',
    historia: 'La alarma antirrobo solo debe saltar si la puerta está abierta Y hay presencia dentro. Con la puerta abierta pero sin presencia, no hay intruso.',
    objetivo: 'Activar "Intruso detectado" solo cuando puerta y presencia sean true a la vez. Con puerta=true y presencia=false debe mostrar "Seguro".',
    xp: 45,
    pistas: ['El operador AND lógico es &&', 'if (puerta && presencia) solo pasa si las dos son true.', 'Con presencia=false, la condición completa es falsa.'],
    aprender: '<h3>Operador AND (&&)</h3><p><code>&&</code> exige que <strong>ambas</strong> condiciones sean verdaderas. Es como encender una luz solo si hay dos interruptores encendidos.</p><pre><code>true && true   // true\ntrue && false  // false\nfalse && false // false</code></pre>',
    ver: '<h3>Condición AND correcta</h3><pre><code>const puerta = true;\nconst presencia = false;\nif (puerta && presencia) {\n  console.log("Intruso detectado");\n} else {\n  console.log("Seguro");\n}</code></pre>',
    detectar: '<h3>Código con error</h3><pre><code>const puerta = true;\nconst presencia = false;\nif (puerta || presencia) {\n  console.log("Intruso detectado");\n} else {\n  console.log("Seguro");\n}</code></pre><p>Salta la alarma sin presencia. ¿Qué operador exige que las dos condiciones se cumplan?</p>',
    reparar: {
      codigoInicial: 'const puerta = true;\nconst presencia = false;\nif (puerta || presencia) {\n  console.log("Intruso detectado");\n} else {\n  console.log("Seguro");\n}',
      validar: function (out, code) {
        if (!/puerta\s*&&\s*presencia/.test(code)) return { ok: false, exp: 'Exigí ambas condiciones: if (puerta && presencia)' };
        if (!out.includes('Seguro')) return { ok: false, exp: 'Sin presencia debe mostrar Seguro' };
        return { ok: true };
      }
    },
    comprender: '<h3>AND vs OR</h3><p><code>||</code> basta con una condición, por eso saltaba la alarma. <code>&&</code> solo se activa con puerta Y presencia juntas, que es lo que pide la lógica antirrobo.</p>'
  },
  {
    id: 'm5-12', mundo: 5, titulo: 'Sensor de humo con OR',
    historia: 'En la cocina industrial, hay que evacuar si detecta humo O gas, aunque sea uno solo. Cada segundo cuenta.',
    objetivo: 'Evacuar ("Evacuación") si humo o gas es true. Con humo=false y gas=true debe mostrar "Evacuación".',
    xp: 45,
    pistas: ['El operador OR lógico es ||', 'if (humo || gas) pasa si al menos una es true.', 'Con gas=true, || ya es verdadero.'],
    aprender: '<h3>Operador OR (||)</h3><p><code>||</code> devuelve true si <strong>al menos una</strong> condición se cumple. Es el operador de emergencias: basta un peligro para reaccionar.</p><pre><code>true || false  // true\nfalse || false // false</code></pre>',
    ver: '<h3>Condición OR correcta</h3><pre><code>const humo = false;\nconst gas = true;\nif (humo || gas) {\n  console.log("Evacuación");\n} else {\n  console.log("Todo normal");\n}</code></pre>',
    detectar: '<h3>Código con error</h3><pre><code>const humo = false;\nconst gas = true;\nif (humo && gas) {\n  console.log("Evacuación");\n} else {\n  console.log("Todo normal");\n}</code></pre><p>Dice "Todo normal" con gas detectado. ¿Qué operador alcanza con una sola condición?</p>',
    reparar: {
      codigoInicial: 'const humo = false;\nconst gas = true;\nif (humo && gas) {\n  console.log("Evacuación");\n} else {\n  console.log("Todo normal");\n}',
      validar: function (out, code) {
        if (!/humo\s*\|\|\s*gas/.test(code)) return { ok: false, exp: 'Usá OR: if (humo || gas)' };
        if (!out.includes('Evacuación')) return { ok: false, exp: 'Con gas=true debe mostrar Evacuación' };
        return { ok: true };
      }
    },
    comprender: '<h3>Seguridad con OR</h3><p>Con <code>&&</code> pedíamos humo Y gas juntos, y como humo era false no pasaba nada. En emergencias se usa <code>||</code>: un solo sensor activo ya dispara la evacuación.</p>'
  },
  {
    id: 'm5-13', mundo: 5, titulo: 'Promedio de temperatura',
    historia: 'La heladera del laboratorio toma 4 lecturas por hora y necesita el promedio para decidir si el frío es estable.',
    objetivo: 'Sumar las 4 lecturas [20, 22, 24, 26] y dividir por la cantidad. Debe mostrar "Promedio: 23°C".',
    xp: 46,
    pistas: ['Acumulá la suma en un let suma = 0 antes del bucle.', 'Dividí por la cantidad de lecturas, no por un número fijo.', 'Promedio = suma / lecturas.length'],
    aprender: '<h3>Promedios</h3><p>El promedio es suma total dividida cantidad. Usar <code>lecturas.length</code> hace el programa genérico: si mañana hay 6 sensores, sigue funcionando.</p><pre><code>let suma = 0;\nfor (let i = 0; i < lecturas.length; i++) {\n  suma = suma + lecturas[i];\n}\nlet promedio = suma / lecturas.length;</code></pre>',
    ver: '<h3>Promedio correcto</h3><pre><code>const lecturas = [20, 22, 24, 26];\nlet suma = 0;\nfor (let i = 0; i < lecturas.length; i++) {\n  suma = suma + lecturas[i];\n}\nlet promedio = suma / lecturas.length;\nconsole.log("Promedio: " + promedio + "°C");</code></pre>',
    detectar: '<h3>Código con error</h3><pre><code>const lecturas = [20, 22, 24, 26];\nlet suma = 0;\nfor (let i = 0; i < lecturas.length; i++) {\n  suma = suma + lecturas[i];\n}\nlet promedio = suma / 2;\nconsole.log("Promedio: " + promedio + "°C");</code></pre><p>Da 46°C en vez de 23. ¿Por cuántos valores hay que dividir?</p>',
    reparar: {
      codigoInicial: 'const lecturas = [20, 22, 24, 26];\nlet suma = 0;\nfor (let i = 0; i < lecturas.length; i++) {\n  suma = suma + lecturas[i];\n}\nlet promedio = suma / 2;\nconsole.log("Promedio: " + promedio + "°C");',
      validar: function (out, code) {
        if (!/suma\s*\/\s*lecturas\.length/.test(code)) return { ok: false, exp: 'Dividí por la cantidad real: suma / lecturas.length' };
        if (!out.includes('Promedio: 23°C')) return { ok: false, exp: 'El promedio correcto es 23°C' };
        return { ok: true };
      }
    },
    comprender: '<h3>Dividir mal</h3><p>La suma (92) estaba bien, pero se dividía por 2 en vez de por 4. Usar <code>lecturas.length</code> toma la cantidad real del array y el cálculo queda siempre correcto.</p>'
  },
  {
    id: 'm5-14', mundo: 5, titulo: 'Filtro de lecturas extremas',
    historia: 'El termómetro del horno tira una lectura loca de 95 entre valores normales de 20 y pico. Hay que descartarla del promedio.',
    objetivo: 'Descartar valores de 50 o más, mostrar "Lectura 95 descartada" y el promedio válido: 22.',
    xp: 46,
    pistas: ['Antes de sumar, preguntá si el valor es razonable: if (valor < 50)', 'Si no pasa el filtro, mostrá el mensaje de descarte y no lo sumes.', 'Necesitás dos variables: suma y cuenta de lecturas válidas.'],
    aprender: '<h3>Filtrado simple</h3><p>Los sensores fallan. Un filtro descarta valores fuera de un rango creíble antes de procesarlos. La clave es contar solo las lecturas válidas para el promedio.</p><pre><code>if (valor < 50) {\n  suma = suma + valor;\n  cuenta++;\n} else {\n  console.log("Lectura " + valor + " descartada");\n}</code></pre>',
    ver: '<h3>Filtro correcto</h3><pre><code>const lecturas = [21, 22, 95, 23];\nlet suma = 0;\nlet cuenta = 0;\nfor (let i = 0; i < lecturas.length; i++) {\n  const valor = lecturas[i];\n  if (valor < 50) {\n    suma = suma + valor;\n    cuenta++;\n  } else {\n    console.log("Lectura " + valor + " descartada");\n  }\n}\nconsole.log("Promedio válido: " + (suma / cuenta));</code></pre>',
    detectar: '<h3>Código con error</h3><pre><code>const lecturas = [21, 22, 95, 23];\nlet suma = 0;\nlet cuenta = 0;\nfor (let i = 0; i < lecturas.length; i++) {\n  suma = suma + lecturas[i];\n  cuenta++;\n}\nconsole.log("Promedio válido: " + (suma / cuenta));</code></pre><p>Da 40.25 porque mete la lectura de 95. ¿Dónde va el filtro?</p>',
    reparar: {
      codigoInicial: 'const lecturas = [21, 22, 95, 23];\nlet suma = 0;\nlet cuenta = 0;\nfor (let i = 0; i < lecturas.length; i++) {\n  suma = suma + lecturas[i];\n  cuenta++;\n}\nconsole.log("Promedio válido: " + (suma / cuenta));',
      validar: function (out, code) {
        if (!/if\s*\([^)]*<\s*50\s*\)/.test(code)) return { ok: false, exp: 'Agregá el filtro: if (valor < 50) solo suma lecturas válidas' };
        if (!out.includes('Lectura 95 descartada')) return { ok: false, exp: 'Debe avisar: Lectura 95 descartada' };
        if (!out.includes('Promedio válido: 22')) return { ok: false, exp: 'El promedio sin la lectura loca es 22' };
        return { ok: true };
      }
    },
    comprender: '<h3>Basura entra, basura sale</h3><p>Sin filtro, la lectura de 95 contamina todo el promedio. Con el <code>if</code> solo entran valores creíbles al acumulador y el promedio queda en 22.</p>'
  },
  {
    id: 'm5-15', mundo: 5, titulo: 'Reintentos con break',
    historia: 'El robot de soldadura falla al soldar pero tiene permiso para reintentar. Si tiene éxito en el intento 2, debe dejar de intentar ahí mismo.',
    objetivo: 'Detener el bucle en cuanto haya éxito: no debe imprimir "Intento 3" después del éxito.',
    xp: 47,
    pistas: ['break corta el bucle inmediatamente.', 'Poné break; después de imprimir el mensaje de éxito.', 'Sin break, el bucle sigue hasta el final aunque ya ganó.'],
    aprender: '<h3>Salida anticipada con break</h3><p><code>break</code> sale del bucle al instante. Es fundamental en reintentos: una vez logrado el objetivo, seguir intentando es desperdiciar recursos.</p><pre><code>for (let i = 1; i <= 3; i++) {\n  if (i === 2) {\n    console.log("¡Éxito!");\n    break;\n  }\n}</code></pre>',
    ver: '<h3>Reintentos correctos</h3><pre><code>const exitoEn = 2;\nfor (let intento = 1; intento <= 3; intento++) {\n  console.log("Intento " + intento);\n  if (intento === exitoEn) {\n    console.log("¡Éxito en intento " + intento + "!");\n    break;\n  }\n}</code></pre>',
    detectar: '<h3>Código con error</h3><pre><code>const exitoEn = 2;\nfor (let intento = 1; intento <= 3; intento++) {\n  console.log("Intento " + intento);\n  if (intento === exitoEn) {\n    console.log("¡Éxito en intento " + intento + "!");\n  }\n}</code></pre><p>Ya ganó en el intento 2 pero sigue intentando. ¿Cómo se corta un bucle?</p>',
    reparar: {
      codigoInicial: 'const exitoEn = 2;\nfor (let intento = 1; intento <= 3; intento++) {\n  console.log("Intento " + intento);\n  if (intento === exitoEn) {\n    console.log("¡Éxito en intento " + intento + "!");\n  }\n}',
      validar: function (out, code) {
        if (!/break\s*;/.test(code)) return { ok: false, exp: 'Cortá el bucle con break; después del éxito' };
        if (out.includes('Intento 3')) return { ok: false, exp: 'No debe intentar la vez 3 si ya tuvo éxito' };
        if (!out.includes('¡Éxito en intento 2!')) return { ok: false, exp: 'Debe anunciar el éxito en el intento 2' };
        return { ok: true };
      }
    },
    comprender: '<h3>El poder de break</h3><p>Sin <code>break</code> el for agota sus 3 vueltas. Con break, al detectar el éxito el robot se detiene y ahorra el intento innecesario.</p>'
  },
  {
    id: 'm5-16', mundo: 5, titulo: 'Modo automático o manual',
    historia: 'La persiana del showroom puede operar en modo automático o manual. El técnico la pone en automático y después la cambia a manual para calibrarla.',
    objetivo: 'Mostrar primero "Modo: automático" y después "Modo: manual" cambiando el flag automatico.',
    xp: 47,
    pistas: ['El flag es una variable booleana: automatico = true significa automático.', 'Para cambiar de modo: automatico = false', 'Volvé a evaluar el if después de cambiar el flag.'],
    aprender: '<h3>Flags de modo</h3><p>Un flag booleano decide el comportamiento del sistema. Cambiar el flag cambia el modo sin tocar el resto del programa.</p><pre><code>let automatico = true;\nif (automatico) { /* modo auto */ }\nautomatico = false;\nif (automatico) { /* ya no entra */ }</code></pre>',
    ver: '<h3>Cambio de modo correcto</h3><pre><code>let automatico = true;\nif (automatico) {\n  console.log("Modo: automático");\n} else {\n  console.log("Modo: manual");\n}\nautomatico = false;\nif (automatico) {\n  console.log("Modo: automático");\n} else {\n  console.log("Modo: manual");\n}</code></pre>',
    detectar: '<h3>Código con error</h3><pre><code>let automatico = true;\nif (automatico) {\n  console.log("Modo: automático");\n} else {\n  console.log("Modo: manual");\n}\nautomatico = true;\nif (automatico) {\n  console.log("Modo: automático");\n} else {\n  console.log("Modo: manual");\n}</code></pre><p>Siempre dice automático. ¿Qué valor debería tener el flag para el modo manual?</p>',
    reparar: {
      codigoInicial: 'let automatico = true;\nif (automatico) {\n  console.log("Modo: automático");\n} else {\n  console.log("Modo: manual");\n}\nautomatico = true;\nif (automatico) {\n  console.log("Modo: automático");\n} else {\n  console.log("Modo: manual");\n}',
      validar: function (out, code) {
        if (!/automatico\s*=\s*false/.test(code)) return { ok: false, exp: 'Para modo manual: automatico = false;' };
        if (!out.includes('Modo: manual')) return { ok: false, exp: 'El segundo chequeo debe mostrar Modo: manual' };
        return { ok: true };
      }
    },
    comprender: '<h3>El flag no cambiaba</h3><p>Se asignaba true dos veces, así que el segundo if entraba igual. Con <code>automatico = false</code> el flag cambia de estado y el sistema alterna de modo.</p>'
  },
  {
    id: 'm5-17', mundo: 5, titulo: 'Programa horario de luces',
    historia: 'Las luces del galpón se encienden desde las 18 hasta las 23 inclusive. A las 18 en punto ya deben estar ON.',
    objetivo: 'Encender las luces si hora está entre 18 y 23 inclusive. Con hora = 18 debe mostrar "Luces: ON".',
    xp: 48,
    pistas: ['Un rango se chequea con dos condiciones unidas por &&.', 'El horario incluye las 18 y las 23: usá >= y <=.', 'if (hora >= 18 && hora <= 23)'],
    aprender: '<h3>Rangos inclusivos</h3><p>Para "entre 18 y 23" se necesitan dos límites. Si el límite cuenta, usá <code>&gt;=</code> y <code>&lt;=</code>; si no, <code>&gt;</code> y <code>&lt;</code>.</p><pre><code>if (hora >= 18 && hora <= 23) {\n  console.log("Luces: ON");\n}</code></pre>',
    ver: '<h3>Rango correcto</h3><pre><code>const hora = 18;\nif (hora >= 18 && hora <= 23) {\n  console.log("Luces: ON");\n} else {\n  console.log("Luces: OFF");\n}</code></pre>',
    detectar: '<h3>Código con error</h3><pre><code>const hora = 18;\nif (hora > 18 && hora < 23) {\n  console.log("Luces: ON");\n} else {\n  console.log("Luces: OFF");\n}</code></pre><p>A las 18 en punto dice OFF. ¿El rango incluye sus bordes?</p>',
    reparar: {
      codigoInicial: 'const hora = 18;\nif (hora > 18 && hora < 23) {\n  console.log("Luces: ON");\n} else {\n  console.log("Luces: OFF");\n}',
      validar: function (out, code) {
        if (!/hora\s*>=\s*18/.test(code)) return { ok: false, exp: 'Las 18 inclusive cuentan: hora >= 18' };
        if (!/hora\s*<=\s*23/.test(code)) return { ok: false, exp: 'Las 23 inclusive cuentan: hora <= 23' };
        if (!out.includes('Luces: ON')) return { ok: false, exp: 'A las 18 las luces deben estar ON' };
        return { ok: true };
      }
    },
    comprender: '<h3>Bordes del rango</h3><p>Con <code>&gt;</code> la hora 18 quedaba afuera. Usar <code>&gt;=</code> y <code>&lt;=</code> incluye los valores límite, como pide el programa horario.</p>'
  },
  {
    id: 'm5-18', mundo: 5, titulo: 'Alerta de tanque',
    historia: 'El tanque de agua de la azotea avisa al operario cuando está casi lleno. Si el nivel supera 80 hay que lanzar la alerta.',
    objetivo: 'Mostrar "ALERTA: tanque casi lleno" si nivel > 80. Con nivel = 85 debe saltar la alerta.',
    xp: 48,
    pistas: ['Compará nivel con el umbral 80.', 'La alerta va en el if, no en el else.', 'if (nivel > 80) muestra la ALERTA.'],
    aprender: '<h3>Alertas por umbral</h3><p>Los sistemas industriales vigilan variables críticas (nivel, presión, temperatura) y disparan una acción cuando el valor pasa el umbral de peligro.</p><pre><code>const nivel = 85;\nif (nivel > 80) {\n  console.log("ALERTA: tanque casi lleno");\n}</code></pre>',
    ver: '<h3>Alerta correcta</h3><pre><code>const nivel = 85;\nif (nivel > 80) {\n  console.log("ALERTA: tanque casi lleno");\n} else {\n  console.log("Nivel normal");\n}</code></pre>',
    detectar: '<h3>Código con error</h3><pre><code>const nivel = 85;\nif (nivel < 80) {\n  console.log("ALERTA: tanque casi lleno");\n} else {\n  console.log("Nivel normal");\n}</code></pre><p>Con 85 dice "Nivel normal". ¿El umbral se chequea para arriba o para abajo?</p>',
    reparar: {
      codigoInicial: 'const nivel = 85;\nif (nivel < 80) {\n  console.log("ALERTA: tanque casi lleno");\n} else {\n  console.log("Nivel normal");\n}',
      validar: function (out, code) {
        if (!/nivel\s*>\s*80/.test(code)) return { ok: false, exp: 'La alerta es cuando el nivel pasa 80: if (nivel > 80)' };
        if (!out.includes('ALERTA: tanque casi lleno')) return { ok: false, exp: 'Con nivel=85 debe mostrar la ALERTA' };
        return { ok: true };
      }
    },
    comprender: '<h3>Condición invertida</h3><p>El if miraba los niveles bajos. La alerta de llenado necesita <code>nivel &gt; 80</code>: recién ahí el tanque está en zona de peligro.</p>'
  },
  {
    id: 'm5-19', mundo: 5, titulo: 'Ventilador con dos velocidades',
    historia: 'El rack del servidor tiene un ventilador con dos velocidades: máxima si la temperatura llega a 40, media desde 25, y apagado por debajo.',
    objetivo: 'Clasificar la velocidad del ventilador con temp = 30. Debe mostrar "Ventilador: media".',
    xp: 49,
    pistas: ['Necesitás if, else if y else: tres tramos de temperatura.', 'Primero preguntá temp >= 40, después else if (temp >= 25).', 'El else final es el ventilador apagado.'],
    aprender: '<h3>Tramos con else if</h3><p>Cuando una variable define varios rangos de acción, se encadenan condiciones. El orden importa: evaluá de mayor a menor umbral para que cada valor caiga en su tramo correcto.</p><pre><code>if (temp >= 40) v = "máxima";\nelse if (temp >= 25) v = "media";\nelse v = "apagado";</code></pre>',
    ver: '<h3>Ventilador correcto</h3><pre><code>const temp = 30;\nif (temp >= 40) {\n  console.log("Ventilador: máxima");\n} else if (temp >= 25) {\n  console.log("Ventilador: media");\n} else {\n  console.log("Ventilador: apagado");\n}</code></pre>',
    detectar: '<h3>Código con error</h3><pre><code>const temp = 30;\nif (temp >= 40) {\n  console.log("Ventilador: máxima");\n} else {\n  console.log("Ventilador: apagado");\n}</code></pre><p>Con 30°C apaga el ventilador. ¿Dónde quedó el tramo "media"?</p>',
    reparar: {
      codigoInicial: 'const temp = 30;\nif (temp >= 40) {\n  console.log("Ventilador: máxima");\n} else {\n  console.log("Ventilador: apagado");\n}',
      validar: function (out, code) {
        if (!/else\s+if\s*\(\s*temp\s*>=\s*25\s*\)/.test(code)) return { ok: false, exp: 'Falta el tramo medio: else if (temp >= 25)' };
        if (!out.includes('Ventilador: media')) return { ok: false, exp: 'Con 30°C debe mostrar Ventilador: media' };
        return { ok: true };
      }
    },
    comprender: '<h3>El tramo medio</h3><p>Solo había dos tramos. Con <code>else if (temp &gt;= 25)</code> se cubre la franja 25-39, y los tres casos quedan atendidos.</p>'
  },
  {
    id: 'm5-20', mundo: 5, titulo: 'Riego por humedad',
    historia: 'El invernadero automático riega las plantas cuando la humedad del suelo baja de 40%. Si el suelo está seco, hay que regar.',
    objetivo: 'Regar si humedad < 40. Con humedad = 32 debe mostrar "Humedad 32%: regando".',
    xp: 49,
    pistas: ['El suelo seco es humedad baja: compará con <', 'if (humedad < 40) activa el riego.', 'Mostrá también la lectura de humedad en el mensaje.'],
    aprender: '<h3>Riego automático</h3><p>Es un umbral clásico de agricultura de precisión: el rector se activa solo cuando el recurso (agua/humedad) cae por debajo del mínimo necesario.</p><pre><code>const humedad = 32;\nif (humedad < 40) {\n  console.log("Humedad " + humedad + "%: regando");\n}</code></pre>',
    ver: '<h3>Riego correcto</h3><pre><code>const humedad = 32;\nif (humedad < 40) {\n  console.log("Humedad " + humedad + "%: regando");\n} else {\n  console.log("Humedad " + humedad + "%: sin riego");\n}</code></pre>',
    detectar: '<h3>Código con error</h3><pre><code>const humedad = 32;\nif (humedad > 40) {\n  console.log("Humedad " + humedad + "%: regando");\n} else {\n  console.log("Humedad " + humedad + "%: sin riego");\n}</code></pre><p>Con el suelo seco (32%) no riega. ¿Riega con mucha o con poca humedad?</p>',
    reparar: {
      codigoInicial: 'const humedad = 32;\nif (humedad > 40) {\n  console.log("Humedad " + humedad + "%: regando");\n} else {\n  console.log("Humedad " + humedad + "%: sin riego");\n}',
      validar: function (out, code) {
        if (!/humedad\s*<\s*40/.test(code)) return { ok: false, exp: 'El riego va con humedad baja: if (humedad < 40)' };
        if (!out.includes('Humedad 32%: regando')) return { ok: false, exp: 'Con humedad 32 debe regar' };
        return { ok: true };
      }
    },
    comprender: '<h3>La comparación al revés</h3><p>Riega con poca humedad, no con mucha. <code>humedad &lt; 40</code> detecta la sequedad y activa el sistema a tiempo.</p>'
  },
  {
    id: 'm5-21', mundo: 5, titulo: 'Lote de productos',
    historia: 'El depósito procesa un lote de productos: Mouse, Teclado y Monitor. Hay que pasar cada uno y cerrar con un resumen del lote.',
    objetivo: 'Procesar los 3 productos del array y mostrar "Resumen: 3 productos listos".',
    xp: 50,
    pistas: ['Recorré el array completo con i < productos.length.', 'Si el bucle se corta antes, algún producto queda sin procesar.', 'Contá los procesados con un acumulador.'],
    aprender: '<h3>Lotes con arrays</h3><p>Procesar un lote es recorrer un array entero aplicando la misma operación a cada elemento. Usar <code>.length</code> hace el proceso a prueba de cambios de lote.</p><pre><code>const productos = ["A", "B"];\nfor (let i = 0; i < productos.length; i++) {\n  console.log("Procesando: " + productos[i]);\n}</code></pre>',
    ver: '<h3>Lote correcto</h3><pre><code>const productos = ["Mouse", "Teclado", "Monitor"];\nlet procesados = 0;\nfor (let i = 0; i < productos.length; i++) {\n  console.log("Procesando: " + productos[i]);\n  procesados++;\n}\nconsole.log("Resumen: " + procesados + " productos listos");</code></pre>',
    detectar: '<h3>Código con error</h3><pre><code>const productos = ["Mouse", "Teclado", "Monitor"];\nlet procesados = 0;\nfor (let i = 0; i < 2; i++) {\n  console.log("Procesando: " + productos[i]);\n  procesados++;\n}\nconsole.log("Resumen: " + procesados + " productos listos");</code></pre><p>El Monitor nunca se procesa. ¿Cómo se recorre todo el array sin importar su tamaño?</p>',
    reparar: {
      codigoInicial: 'const productos = ["Mouse", "Teclado", "Monitor"];\nlet procesados = 0;\nfor (let i = 0; i < 2; i++) {\n  console.log("Procesando: " + productos[i]);\n  procesados++;\n}\nconsole.log("Resumen: " + procesados + " productos listos");',
      validar: function (out, code) {
        if (!/i\s*<\s*productos\.length/.test(code)) return { ok: false, exp: 'Recorré todo el array: i < productos.length' };
        if (!out.includes('Procesando: Monitor')) return { ok: false, exp: 'Falta procesar el Monitor' };
        if (!out.includes('Resumen: 3 productos listos')) return { ok: false, exp: 'El resumen debe decir 3 productos listos' };
        return { ok: true };
      }
    },
    comprender: '<h3>Números mágicos</h3><p>El 2 hardcodeado dejaba un producto afuera. Con <code>productos.length</code> el bucle se adapta al tamaño real del lote y nada queda sin procesar.</p>'
  },
  {
    id: 'm5-22', mundo: 5, titulo: 'Validación de datos',
    historia: 'El formulario de la tienda recibe edades. Si alguien escribe un dato inválido, el sistema debe avisar en vez de procesarlo como si nada.',
    objetivo: 'Validar la edad: procesarEdad(25) debe decir "Edad válida: 25" y procesarEdad(-3) debe decir "Dato inválido".',
    xp: 51,
    pistas: ['Una edad válida es un number mayor o igual a 0.', 'Si el dato no pasa la validación, mostrá "Dato inválido" y salí con return.', 'Colocá el if de validación al principio de la función.'],
    aprender: '<h3>Validación y defensa</h3><p>Nunca confíes en los datos de entrada. Una función robusta valida primero, y si el dato es malo lo rechaza con un mensaje claro antes de procesar.</p><pre><code>function procesarEdad(edad) {\n  if (typeof edad !== "number" || edad < 0) {\n    console.log("Dato inválido");\n    return;\n  }\n  console.log("Edad válida: " + edad);\n}</code></pre>',
    ver: '<h3>Validación correcta</h3><pre><code>function procesarEdad(edad) {\n  if (typeof edad !== "number" || edad < 0) {\n    console.log("Dato inválido");\n    return;\n  }\n  console.log("Edad válida: " + edad);\n}\nprocesarEdad(25);\nprocesarEdad(-3);</code></pre>',
    detectar: '<h3>Código con error</h3><pre><code>function procesarEdad(edad) {\n  console.log("Edad válida: " + edad);\n}\nprocesarEdad(25);\nprocesarEdad(-3);</code></pre><p>Dice "Edad válida: -3". ¿Cómo se descarta un dato inválido antes de procesarlo?</p>',
    reparar: {
      codigoInicial: 'function procesarEdad(edad) {\n  console.log("Edad válida: " + edad);\n}\nprocesarEdad(25);\nprocesarEdad(-3);',
      validar: function (out, code) {
        if (!/typeof\s+edad/.test(code) && !/edad\s*<\s*0/.test(code)) return { ok: false, exp: 'Agregá una validación: if (typeof edad !== "number" || edad < 0)' };
        if (!out.includes('Dato inválido')) return { ok: false, exp: 'La edad -3 debe mostrar Dato inválido' };
        if (!out.includes('Edad válida: 25')) return { ok: false, exp: 'La edad 25 debe procesarse normal' };
        return { ok: true };
      }
    },
    comprender: '<h3>Primero validar</h3><p>La función original procesaba cualquier cosa. Con el <code>if</code> guardián al principio, los datos malos se rechazan con <code>return</code> y no llegan al resto del código.</p>'
  },
  {
    id: 'm5-23', mundo: 5, titulo: 'Log de eventos',
    historia: 'El panel de la tienda necesita registrar los eventos del día en una lista y luego imprimir el historial completo al cerrar.',
    objetivo: 'Registrar los 3 eventos en el array y mostrar cada uno numerado, terminando con "Total eventos: 3".',
    xp: 52,
    pistas: ['Un array vacío se crea con [].', 'Para agregar eventos usá registro.push("evento").', 'Falta registrar el evento del medio: "12:00 reinicio".'],
    aprender: '<h3>Logs con arrays</h3><p>Un log es un array que crece con <code>push()</code>. Cada evento queda guardado en orden y al final se recorre para imprimir el historial.</p><pre><code>const registro = [];\nregistro.push("08:00 encendido");\nconsole.log("Total eventos: " + registro.length);</code></pre>',
    ver: '<h3>Log correcto</h3><pre><code>const registro = [];\nregistro.push("08:00 encendido");\nregistro.push("12:00 reinicio");\nregistro.push("18:00 apagado");\nfor (let i = 0; i < registro.length; i++) {\n  console.log("Evento " + (i + 1) + ": " + registro[i]);\n}\nconsole.log("Total eventos: " + registro.length);</code></pre>',
    detectar: '<h3>Código con error</h3><pre><code>const registro = [];\nregistro.push("08:00 encendido");\nregistro.push("18:00 apagado");\nfor (let i = 0; i < registro.length; i++) {\n  console.log("Evento " + (i + 1) + ": " + registro[i]);\n}\nconsole.log("Total eventos: " + registro.length);</code></pre><p>El historial tiene 2 eventos pero deberían ser 3. ¿Cuál falta registrar?</p>',
    reparar: {
      codigoInicial: 'const registro = [];\nregistro.push("08:00 encendido");\nregistro.push("18:00 apagado");\nfor (let i = 0; i < registro.length; i++) {\n  console.log("Evento " + (i + 1) + ": " + registro[i]);\n}\nconsole.log("Total eventos: " + registro.length);',
      validar: function (out, code) {
        if (!/registro\.push\(\s*["']12:00 reinicio["']\s*\)/.test(code)) return { ok: false, exp: 'Falta el evento del medio: registro.push("12:00 reinicio");' };
        if (!out.includes('Evento 2: 12:00 reinicio')) return { ok: false, exp: 'El evento 2 debe ser 12:00 reinicio' };
        if (!out.includes('Total eventos: 3')) return { ok: false, exp: 'El total debe ser 3' };
        return { ok: true };
      }
    },
    comprender: '<h3>El evento que nunca se guardó</h3><p>El bucle imprimía todo lo que había en el array, pero el reinicio del mediodía nunca se registró. Un log solo muestra lo que realmente se guardó con <code>push</code>.</p>'
  },
  {
    id: 'm5-24', mundo: 5, titulo: 'Eventos por prioridad',
    historia: 'La planta tiene tres eventos y solo puede atender uno por vez. Hay que elegir el de mayor prioridad: la Falla de luz (prioridad 3) es la más urgente.',
    objetivo: 'Recorrer los eventos y elegir el de mayor prioridad. Debe mostrar "Atender: Falla de luz (prioridad 3)".',
    xp: 53,
    pistas: ['Empezá asumiendo que el mejor es el primer evento del array.', 'Compará cada evento con el mejor actual: si tiene más prioridad, lo reemplaza.', 'Prioridad más alta = más urgente.'],
    aprender: '<h3>Buscar el máximo</h3><p>El patrón de "mejor hasta ahora" recorre la lista guardando un candidato y actualizándolo cuando aparece uno superior. Es la base de los algoritmos de scheduling.</p><pre><code>let mejor = eventos[0];\nfor (let i = 1; i < eventos.length; i++) {\n  if (eventos[i].prioridad > mejor.prioridad) {\n    mejor = eventos[i];\n  }\n}</code></pre>',
    ver: '<h3>Selección correcta</h3><pre><code>const eventos = [\n  { nombre: "Mantenimiento", prioridad: 1 },\n  { nombre: "Falla de luz", prioridad: 3 },\n  { nombre: "Limpieza", prioridad: 2 }\n];\nlet mejor = eventos[0];\nfor (let i = 1; i < eventos.length; i++) {\n  if (eventos[i].prioridad > mejor.prioridad) {\n    mejor = eventos[i];\n  }\n}\nconsole.log("Atender: " + mejor.nombre + " (prioridad " + mejor.prioridad + ")");</code></pre>',
    detectar: '<h3>Código con error</h3><pre><code>const eventos = [\n  { nombre: "Mantenimiento", prioridad: 1 },\n  { nombre: "Falla de luz", prioridad: 3 },\n  { nombre: "Limpieza", prioridad: 2 }\n];\nlet mejor = eventos[0];\nfor (let i = 1; i < eventos.length; i++) {\n  if (eventos[i].prioridad < mejor.prioridad) {\n    mejor = eventos[i];\n  }\n}\nconsole.log("Atender: " + mejor.nombre + " (prioridad " + mejor.prioridad + ")");</code></pre><p>Elige el de menor prioridad. ¿Qué operador busca el máximo?</p>',
    reparar: {
      codigoInicial: 'const eventos = [\n  { nombre: "Mantenimiento", prioridad: 1 },\n  { nombre: "Falla de luz", prioridad: 3 },\n  { nombre: "Limpieza", prioridad: 2 }\n];\nlet mejor = eventos[0];\nfor (let i = 1; i < eventos.length; i++) {\n  if (eventos[i].prioridad < mejor.prioridad) {\n    mejor = eventos[i];\n  }\n}\nconsole.log("Atender: " + mejor.nombre + " (prioridad " + mejor.prioridad + ")");',
      validar: function (out, code) {
        if (!/prioridad\s*>\s*mejor\.prioridad/.test(code)) return { ok: false, exp: 'Buscá el máximo: if (eventos[i].prioridad > mejor.prioridad)' };
        if (!out.includes('Atender: Falla de luz (prioridad 3)')) return { ok: false, exp: 'Debe elegir la Falla de luz (prioridad 3)' };
        return { ok: true };
      }
    },
    comprender: '<h3>Máximo vs mínimo</h3><p>El <code>&lt;</code> convertía el algoritmo en buscador del mínimo: terminaba en Mantenimiento. Con <code>&gt;</code> el candidato solo se reemplaza si hay algo más urgente.</p>'
  },
  {
    id: 'm5-25', mundo: 5, titulo: 'Secuencia con pasos',
    historia: 'La máquina de inyección del taller tiene cuatro pasos: precalentando, inyectando, enfriando y listo. Hay que recorrerlos todos en orden.',
    objetivo: 'Recorrer los 4 pasos del array y terminar con "Proceso terminado".',
    xp: 54,
    pistas: ['El array tiene 4 pasos, pero el bucle solo llega hasta el paso 3.', 'Usá i < pasos.length para recorrer el array completo.', 'Muestra el número de paso con (i + 1) + "/" + pasos.length.'],
    aprender: '<h3>Secuencias de proceso</h3><p>Los procesos industriales son listas de pasos ordenados. Recorrer el array completo garantiza que ningún paso quede sin ejecutar.</p><pre><code>const pasos = ["A", "B", "C"];\nfor (let i = 0; i < pasos.length; i++) {\n  console.log("Paso " + (i + 1) + "/" + pasos.length + ": " + pasos[i]);\n}</code></pre>',
    ver: '<h3>Secuencia correcta</h3><pre><code>const pasos = ["precalentando", "inyectando", "enfriando", "listo"];\nfor (let i = 0; i < pasos.length; i++) {\n  console.log("Paso " + (i + 1) + "/" + pasos.length + ": " + pasos[i]);\n}\nconsole.log("Proceso terminado");</code></pre>',
    detectar: '<h3>Código con error</h3><pre><code>const pasos = ["precalentando", "inyectando", "enfriando", "listo"];\nfor (let i = 0; i < 3; i++) {\n  console.log("Paso " + (i + 1) + "/" + pasos.length + ": " + pasos[i]);\n}\nconsole.log("Proceso terminado");</code></pre><p>El paso 4 nunca corre y la pieza queda sin terminar. ¿Cómo se recorren los 4 pasos?</p>',
    reparar: {
      codigoInicial: 'const pasos = ["precalentando", "inyectando", "enfriando", "listo"];\nfor (let i = 0; i < 3; i++) {\n  console.log("Paso " + (i + 1) + "/" + pasos.length + ": " + pasos[i]);\n}\nconsole.log("Proceso terminado");',
      validar: function (out, code) {
        if (!/i\s*<\s*pasos\.length/.test(code)) return { ok: false, exp: 'Recorré todos los pasos: i < pasos.length' };
        if (!out.includes('Paso 4/4: listo')) return { ok: false, exp: 'Debe ejecutar el Paso 4/4: listo' };
        if (!out.includes('Proceso terminado')) return { ok: false, exp: 'Falta el mensaje final: Proceso terminado' };
        return { ok: true };
      }
    },
    comprender: '<h3>Un paso menos</h3><p>El número 3 hardcodeado cortaba la secuencia. Con <code>pasos.length</code> el bucle ejecuta exactamente los 4 pasos del proceso y la pieza sale terminada.</p>'
  },
  {
    id: 'm5-26', mundo: 5, titulo: 'Cola de tareas FIFO',
    historia: 'La mesa de servicio atiende pedidos en orden de llegada (el primero que llegó, el primero que se atiende). Así funciona una cola FIFO.',
    objetivo: 'Atender las 3 tareas en orden de llegada (A, B, C) y terminar con "Cola vacía".',
    xp: 55,
    pistas: ['FIFO = First In, First Out: el primero en entrar es el primero en salir.', 'shift() saca el primer elemento del array; pop() saca el último.', 'Cambiá pop() por shift().'],
    aprender: '<h3>Colas FIFO</h3><p>Una cola atiende por orden de llegada. <code>shift()</code> extrae el primer elemento (FIFO); <code>pop()</code> extrae el último (LIFO, pila).</p><pre><code>const cola = ["A", "B"];\nconsole.log(cola.shift()); // "A" primero</code></pre>',
    ver: '<h3>Cola correcta</h3><pre><code>const cola = ["Tarea A", "Tarea B", "Tarea C"];\nwhile (cola.length > 0) {\n  const atendida = cola.shift();\n  console.log("Atendiendo: " + atendida);\n}\nconsole.log("Cola vacía");</code></pre>',
    detectar: '<h3>Código con error</h3><pre><code>const cola = ["Tarea A", "Tarea B", "Tarea C"];\nwhile (cola.length > 0) {\n  const atendida = cola.pop();\n  console.log("Atendiendo: " + atendida);\n}\nconsole.log("Cola vacía");</code></pre><p>Atiende la C primero. ¿Qué método extrae el elemento que está adelante?</p>',
    reparar: {
      codigoInicial: 'const cola = ["Tarea A", "Tarea B", "Tarea C"];\nwhile (cola.length > 0) {\n  const atendida = cola.pop();\n  console.log("Atendiendo: " + atendida);\n}\nconsole.log("Cola vacía");',
      validar: function (out, code) {
        if (!/cola\.shift\(\)/.test(code)) return { ok: false, exp: 'Para FIFO usá cola.shift(); no pop()' };
        if (out.indexOf('Atendiendo: Tarea A') === -1 || out.indexOf('Atendiendo: Tarea A') > out.indexOf('Atendiendo: Tarea C')) return { ok: false, exp: 'Debe atender la Tarea A primero' };
        if (!out.includes('Cola vacía')) return { ok: false, exp: 'Falta el mensaje final: Cola vacía' };
        return { ok: true };
      }
    },
    comprender: '<h3>FIFO vs LIFO</h3><p><code>pop()</code> atendía de atrás hacia adelante, como una pila. <code>shift()</code> respeta el orden de llegada: la Tarea A entra primero y sale primera.</p>'
  },
  {
    id: 'm5-27', mundo: 5, titulo: 'Niveles de batería',
    historia: 'El dron de la tienda reporta su batería en tres niveles: alta (70 o más), media (30 o más) y baja (menos de 30). Con 45% corresponde "media".',
    objetivo: 'Clasificar la batería con bateria = 45. Debe mostrar "Batería: media".',
    xp: 56,
    pistas: ['Son tres tramos: if (bateria >= 70), else if (bateria >= 30) y else.', '45 no llega a 70 pero sí pasa 30.', 'El tramo medio es el que falta en el código.'],
    aprender: '<h3>Niveles por tramos</h3><p>Los indicadores de carga usan tramos decresientes: primero se evalúa el nivel más alto, luego el siguiente. Cada valor cae exactamente en un tramo.</p><pre><code>if (b >= 70) nivel = "alta";\nelse if (b >= 30) nivel = "media";\nelse nivel = "baja";</code></pre>',
    ver: '<h3>Clasificación correcta</h3><pre><code>const bateria = 45;\nif (bateria >= 70) {\n  console.log("Batería: alta");\n} else if (bateria >= 30) {\n  console.log("Batería: media");\n} else {\n  console.log("Batería: baja");\n}</code></pre>',
    detectar: '<h3>Código con error</h3><pre><code>const bateria = 45;\nif (bateria >= 70) {\n  console.log("Batería: alta");\n} else {\n  console.log("Batería: baja");\n}</code></pre><p>Con 45% dice "baja". ¿Qué tramo intermedio desapareció?</p>',
    reparar: {
      codigoInicial: 'const bateria = 45;\nif (bateria >= 70) {\n  console.log("Batería: alta");\n} else {\n  console.log("Batería: baja");\n}',
      validar: function (out, code) {
        if (!/bateria\s*>=\s*30/.test(code)) return { ok: false, exp: 'Falta el tramo medio: else if (bateria >= 30)' };
        if (!out.includes('Batería: media')) return { ok: false, exp: 'Con 45% debe mostrar Batería: media' };
        return { ok: true };
      }
    },
    comprender: '<h3>Tres tramos, dos cortes</h3><p>Igual que la máquina de estados: para tres niveles hacen falta dos cortes (70 y 30). El <code>else if</code> cubre la franja media que el código original no contemplaba.</p>'
  },
  {
    id: 'm5-28', mundo: 5, titulo: 'Turnos alternados',
    historia: 'Dos robots de la línea compiten por la CPU: Tarea A y Tarea B se alternan turno a turno. En el turno 1 y 3 trabaja A; en el 2, trabaja B.',
    objetivo: 'Alternar las dos tareas con el operador % (módulo). El turno 2 debe mostrar "Turno 2: Tarea B".',
    xp: 57,
    pistas: ['El operador % devuelve el resto de la división.', 'i % 2 da 0 en los turnos pares de índice y 1 en los impares.', 'Usá tareas[i % 2] para elegir la tarea activa.'],
    aprender: '<h3>Módulo para alternar</h3><p><code>i % 2</code> alterna entre 0 y 1: perfecto para repartir turnos entre dos elementos de un array.</p><pre><code>const tareas = ["A", "B"];\nfor (let i = 0; i < 4; i++) {\n  console.log(tareas[i % 2]);\n}\n// A, B, A, B</code></pre>',
    ver: '<h3>Turnos correctos</h3><pre><code>const tareas = ["Tarea A", "Tarea B"];\nlet turnos = 3;\nfor (let i = 0; i < turnos; i++) {\n  const activa = tareas[i % 2];\n  console.log("Turno " + (i + 1) + ": " + activa);\n}</code></pre>',
    detectar: '<h3>Código con error</h3><pre><code>const tareas = ["Tarea A", "Tarea B"];\nlet turnos = 3;\nfor (let i = 0; i < turnos; i++) {\n  const activa = tareas[0];\n  console.log("Turno " + (i + 1) + ": " + activa);\n}</code></pre><p>Trabaja siempre la Tarea A. ¿Cómo se alternan dos tareas?</p>',
    reparar: {
      codigoInicial: 'const tareas = ["Tarea A", "Tarea B"];\nlet turnos = 3;\nfor (let i = 0; i < turnos; i++) {\n  const activa = tareas[0];\n  console.log("Turno " + (i + 1) + ": " + activa);\n}',
      validar: function (out, code) {
        if (!/tareas\s*\[\s*i\s*%\s*2\s*\]/.test(code)) return { ok: false, exp: 'Alterná con módulo: tareas[i % 2]' };
        if (!out.includes('Turno 2: Tarea B')) return { ok: false, exp: 'El turno 2 debe activar la Tarea B' };
        return { ok: true };
      }
    },
    comprender: '<h3>El módulo reparte</h3><p>La constante <code>tareas[0]</code> nunca cambiaba. Con <code>i % 2</code> el índice salta entre 0 y 1 y los dos robots se alternan correctamente.</p>'
  },
  {
    id: 'm5-29', mundo: 5, titulo: 'Dashboard de ventas',
    historia: 'La dueña de la tienda quiere un resumen del día: cuál fue la venta mínima, la máxima y el promedio de las 5 ventas registradas.',
    objetivo: 'Calcular mínimo (8), máximo (30) y promedio (18) de las ventas [12, 25, 8, 30, 15].',
    xp: 58,
    pistas: ['Inicializá min y max con la primera venta, no con 0.', 'Para el mínimo compará con <: si la venta es menor que el min actual, actualizá.', 'Sumá todo en un acumulador para el promedio.'],
    aprender: '<h3>Mínimo, máximo y promedio</h3><p>El patrón de dashboard recorre los datos una sola vez: actualiza mínimo con <code>&lt;</code>, máximo con <code>&gt;</code> y acumula la suma para el promedio.</p><pre><code>let min = ventas[0];\nlet max = ventas[0];\nfor (let i = 0; i < ventas.length; i++) {\n  if (ventas[i] < min) min = ventas[i];\n  if (ventas[i] > max) max = ventas[i];\n}</code></pre>',
    ver: '<h3>Dashboard correcto</h3><pre><code>const ventas = [12, 25, 8, 30, 15];\nlet min = ventas[0];\nlet max = ventas[0];\nlet suma = 0;\nfor (let i = 0; i < ventas.length; i++) {\n  suma = suma + ventas[i];\n  if (ventas[i] < min) min = ventas[i];\n  if (ventas[i] > max) max = ventas[i];\n}\nconsole.log("Mínimo: " + min);\nconsole.log("Máximo: " + max);\nconsole.log("Promedio: " + (suma / ventas.length));</code></pre>',
    detectar: '<h3>Código con error</h3><pre><code>const ventas = [12, 25, 8, 30, 15];\nlet min = ventas[0];\nlet max = ventas[0];\nlet suma = 0;\nfor (let i = 0; i < ventas.length; i++) {\n  suma = suma + ventas[i];\n  if (ventas[i] > min) min = ventas[i];\n  if (ventas[i] > max) max = ventas[i];\n}\nconsole.log("Mínimo: " + min);\nconsole.log("Máximo: " + max);\nconsole.log("Promedio: " + (suma / ventas.length));</code></pre><p>El mínimo da 30, igual que el máximo. ¿Con qué operador se busca el mínimo?</p>',
    reparar: {
      codigoInicial: 'const ventas = [12, 25, 8, 30, 15];\nlet min = ventas[0];\nlet max = ventas[0];\nlet suma = 0;\nfor (let i = 0; i < ventas.length; i++) {\n  suma = suma + ventas[i];\n  if (ventas[i] > min) min = ventas[i];\n  if (ventas[i] > max) max = ventas[i];\n}\nconsole.log("Mínimo: " + min);\nconsole.log("Máximo: " + max);\nconsole.log("Promedio: " + (suma / ventas.length));',
      validar: function (out, code) {
        if (!/ventas\[i\]\s*<\s*min/.test(code)) return { ok: false, exp: 'El mínimo se busca con <: if (ventas[i] < min)' };
        if (!out.includes('Mínimo: 8')) return { ok: false, exp: 'La venta mínima es 8' };
        if (!out.includes('Máximo: 30')) return { ok: false, exp: 'La venta máxima es 30' };
        if (!out.includes('Promedio: 18')) return { ok: false, exp: 'El promedio es 18' };
        return { ok: true };
      }
    },
    comprender: '<h3>El mínimo buscaba el máximo</h3><p>Con <code>&gt;</code> la variable min solo subía hasta el valor más alto. Cambiar a <code>&lt;</code> hace que min baje hasta la venta más chica: 8.</p>'
  },
  {
    id: 'm5-30', mundo: 5, titulo: 'Casa inteligente completa',
    historia: 'El panel central de la casa inteligente coordina tres sistemas a la vez: la luz interior, la alarma de presencia y el ventilador. Hay que dejarlos todos con la lógica correcta.',
    objetivo: 'Luz: OFF con luzExterior=300 y hora=14. Alarma: desactivada con presencia=true. Ventilador: ON con temp=28.',
    xp: 60,
    pistas: ['La luz se enciende solo si hay poca luz exterior Y es de noche (>= 18): usá &&.', 'Con presencia=true alguien está en casa: la alarma debe estar desactivada.', 'Con 28°C el ventilador se enciende: temp >= 25.'],
    aprender: '<h3>Sistemas coordinados</h3><p>Una casa inteligente combina todas las ideas anteriores: umbrales, condiciones compuestas con && y ||, y flags de estado. Cada subsistema se decide con su propia lógica, pero todos leen los mismos sensores.</p><pre><code>if (luzExterior < 200 && hora >= 18) {\n  // encender luz interior\n}\nif (temp >= 25) {\n  // prender ventilador\n}</code></pre>',
    ver: '<h3>Sistema completo correcto</h3><pre><code>const hora = 14;\nconst luzExterior = 300;\nconst presencia = true;\nconst temp = 28;\n\nif (luzExterior < 200 && hora >= 18) {\n  console.log("Luz interior: ON");\n} else {\n  console.log("Luz interior: OFF");\n}\n\nif (presencia) {\n  console.log("Alarma: desactivada");\n} else {\n  console.log("Alarma: activada");\n}\n\nif (temp >= 25) {\n  console.log("Ventilador: ON");\n} else {\n  console.log("Ventilador: OFF");\n}</code></pre>',
    detectar: '<h3>Código con error</h3><pre><code>const hora = 14;\nconst luzExterior = 300;\nconst presencia = true;\nconst temp = 28;\n\nif (luzExterior > 200 || hora >= 18) {\n  console.log("Luz interior: ON");\n} else {\n  console.log("Luz interior: OFF");\n}\n\nif (presencia) {\n  console.log("Alarma: activada");\n} else {\n  console.log("Alarma: desactivada");\n}\n\nif (temp >= 25) {\n  console.log("Ventilador: ON");\n} else {\n  console.log("Ventilador: OFF");\n}</code></pre><p>De día con sol, enciende la luz; y con alguien en casa activa la alarma. Revisá la condición de la luz y la lógica de la alarma.</p>',
    reparar: {
      codigoInicial: 'const hora = 14;\nconst luzExterior = 300;\nconst presencia = true;\nconst temp = 28;\n\nif (luzExterior > 200 || hora >= 18) {\n  console.log("Luz interior: ON");\n} else {\n  console.log("Luz interior: OFF");\n}\n\nif (presencia) {\n  console.log("Alarma: activada");\n} else {\n  console.log("Alarma: desactivada");\n}\n\nif (temp >= 25) {\n  console.log("Ventilador: ON");\n} else {\n  console.log("Ventilador: OFF");\n}',
      validar: function (out, code) {
        if (!/luzExterior\s*<\s*200\s*&&\s*hora\s*>=\s*18/.test(code) && !/hora\s*>=\s*18\s*&&\s*luzExterior\s*<\s*200/.test(code)) return { ok: false, exp: 'La luz se enciende solo si hay poca luz exterior Y es de noche: luzExterior < 200 && hora >= 18' };
        if (!out.includes('Luz interior: OFF')) return { ok: false, exp: 'Con luzExterior=300 (de día) la luz interior debe estar OFF' };
        if (!out.includes('Alarma: desactivada')) return { ok: false, exp: 'Con presencia=true la alarma debe estar desactivada' };
        if (!out.includes('Ventilador: ON')) return { ok: false, exp: 'Con temp=28 el ventilador debe estar ON' };
        return { ok: true };
      }
    },
    comprender: '<h3>Tres bugs, tres lecciones</h3><p>La luz usaba <code>||</code> y el operador equivocado: cualquier condición ya la encendía. Con <code>luzExterior &lt; 200 && hora &gt;= 18</code> solo se enciende de noche con poca luz. La alarma estaba invertida: si hay presencia, alguien es esperado y se desactiva. El ventilador ya estaba bien con su umbral de 25°C.</p>'
  }
);
