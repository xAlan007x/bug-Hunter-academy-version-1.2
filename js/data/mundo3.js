MISIONES.push(
  // ═══════════════════════════════════════════════════════════
  // MUNDO 3: ELECTRÓNICA — COMPONENTES Y CIRCUITOS
  // ═══════════════════════════════════════════════════════════
  {
    id: 'm3-01', mundo: 3, titulo: '¿Circuito cerrado o abierto?',
    historia: 'El técnico no sabe si el circuito permite o no pasar la corriente. Debe identificarlo correctamente.',
    objetivo: 'Aprender la diferencia entre circuito cerrado (pasa corriente) y abierto (no pasa).',
    xp: 30,
    pistas: ['Un circuito cerrado tiene un camino completo.', 'En el abierto falta una parte del camino.', 'Escribí: console.log("circuito cerrado");'],
    aprender: '<h3>Circuito cerrado vs abierto</h3><p>Un <strong>circuito cerrado</strong> tiene un camino completo para la corriente. Un <strong>circuito abierto</strong> tiene un corte (por ejemplo, un switch abierto) y no circula corriente.</p>',
    ver: '<h3>Ejemplo</h3><pre><code>console.log("circuito cerrado");</code></pre><p>Muestra que la corriente puede circular.</p>',
    detectar: '<h3>Error</h3><pre><code>console.log(circuito cerrado);</code></pre><p>¿Por qué el texto necesita comillas?</p>',
    reparar: {
      codigoInicial: 'console.log(circuito cerrado);',
      validar: function (out, code) {
        if (!/console\.log\s*\(\s*["'][^"']*cerrado[^"']*["']\s*\)/.test(code)) return { ok: false, exp: 'El texto va entre comillas: console.log("circuito cerrado");' };
        return { ok: true };
      }
    },
    comprender: '<h3>Solución</h3><p>Sin comillas, <code>circuito</code> y <code>cerrado</code> se toman como nombres de variables inexistentes. Las comillas convierten el texto en un string.</p>'
  },
  {
    id: 'm3-02', mundo: 3, titulo: 'Ley de Ohm: calcular la corriente',
    historia: 'La tienda necesita saber cuánta corriente pasa por una resistencia de 220 ohm con 5 voltios.',
    objetivo: 'Calcular la corriente I = V / R con V = 5 y R = 220 y mostrarla.',
    xp: 30,
    pistas: ['La ley de Ohm: I = V / R', 'V es voltaje, R es resistencia, I es corriente.', 'Escribí: let I = (V / R).toFixed(4);'],
    aprender: '<h3>Ley de Ohm</h3><p>I = V / R. La corriente es el voltaje dividido la resistencia. Con V = 5 y R = 220, I = 5 / 220 ≈ 0.0227 amperios.</p>',
    ver: '<h3>Ejemplo</h3><pre><code>let V = 5;\nlet R = 220;\nlet I = (V / R).toFixed(4);\nconsole.log("I = " + I + " A");</code></pre>',
    detectar: '<h3>Error</h3><pre><code>let V = 5;\nlet R = 220;\nlet I = (V * R).toFixed(4);\nconsole.log("I = " + I + " A");</code></pre><p>¿Se multiplica o se divide?</p>',
    reparar: {
      codigoInicial: 'let V = 5;\nlet R = 220;\nlet I = (V * R).toFixed(4);\nconsole.log("I = " + I + " A");',
      validar: function (out, code) {
        if (!/I\s*=\s*\(?\s*V\s*\/\s*R\s*\)?/.test(code) && !/5\s*\/\s*220/.test(code)) return { ok: false, exp: 'Usá división: I = V / R' };
        if (!out.includes('0.0227')) return { ok: false, exp: 'Debe mostrar I = 0.0227 A' };
        return { ok: true };
      }
    },
    comprender: '<h3>Solución</h3><p>La corriente se calcula dividiendo: <code>I = V / R</code>. Multiplicar daría un valor incorrecto.</p>'
  },
  {
    id: 'm3-03', mundo: 3, titulo: 'Ley de Ohm: encontrar la resistencia',
    historia: 'Se necesita saber qué valor de resistencia limita la corriente a 0.02 A con 5 voltios.',
    objetivo: 'Calcular la resistencia R = V / I con V = 5 e I = 0.02 y mostrarla.',
    xp: 31,
    pistas: ['Despejando la ley de Ohm: R = V / I', 'V es 5, I es 0.02.', 'Escribí: let R = V / I;'],
    aprender: '<h3>Despeje de la ley de Ohm</h3><p>R = V / I. Con V = 5 e I = 0.02, R = 5 / 0.02 = 250 ohmios.</p>',
    ver: '<h3>Ejemplo</h3><pre><code>let V = 5;\nlet I = 0.02;\nlet R = V / I;\nconsole.log("R = " + R + " ohmios");</code></pre>',
    detectar: '<h3>Error</h3><pre><code>let V = 5;\nlet I = 0.02;\nlet R = V * I;\nconsole.log("R = " + R + " ohmios");</code></pre><p>¿Operación correcta para despejar R?</p>',
    reparar: {
      codigoInicial: 'let V = 5;\nlet I = 0.02;\nlet R = V * I;\nconsole.log("R = " + R + " ohmios");',
      validar: function (out, code) {
        if (!/R\s*=\s*V\s*\/\s*I/.test(code) && !/5\s*\/\s*0\.02/.test(code)) return { ok: false, exp: 'Usá división: R = V / I' };
        if (!out.includes('250')) return { ok: false, exp: 'Debe mostrar R = 250 ohmios' };
        return { ok: true };
      }
    },
    comprender: '<h3>Solución</h3><p>Despejando R: <code>R = V / I</code>. El resultado es 250 ohmios.</p>'
  },
  {
    id: 'm3-04', mundo: 3, titulo: 'Ley de Ohm: calcular el voltaje',
    historia: 'El voltaje en una resistencia de 220 ohm por la que pasan 0.02 A debe calcularse.',
    objetivo: 'Calcular el voltaje V = I * R con I = 0.02 y R = 220 y mostrarlo.',
    xp: 31,
    pistas: ['Despejando: V = I * R', 'I = 0.02, R = 220.', 'Escribí: let V = I * R;'],
    aprender: '<h3>Cálculo de voltaje</h3><p>V = I * R. Con I = 0.02 y R = 220, V = 0.02 * 220 = 4.4 voltios.</p>',
    ver: '<h3>Ejemplo</h3><pre><code>let I = 0.02;\nlet R = 220;\nlet V = I * R;\nconsole.log("V = " + V + " V");</code></pre>',
    detectar: '<h3>Error</h3><pre><code>let I = 0.02;\nlet R = 220;\nlet V = I / R;\nconsole.log("V = " + I / R + " V");</code></pre><p>¿Operación correcta para obtener el voltaje?</p>',
    reparar: {
      codigoInicial: 'let I = 0.02;\nlet R = 220;\nlet V = I / R;\nconsole.log("V = " + V + " V");',
      validar: function (out, code) {
        if (!/V\s*=\s*I\s*\*\s*R/.test(code) && !/0\.02\s*\*\s*220/.test(code)) return { ok: false, exp: 'Usá multiplicación: V = I * R' };
        if (!out.includes('4.4')) return { ok: false, exp: 'Debe mostrar V = 4.4 V' };
        return { ok: true };
      }
    },
    comprender: '<h3>Solución</h3><p>El voltaje es <code>V = I * R</code>. Con esos valores da 4.4 V.</p>'
  },
  {
    id: 'm3-05', mundo: 3, titulo: 'Colores de las resistencias',
    historia: 'Una resistencia con bandas marrón, negra y rojo indica 22 ohm, pero el código la calcula mal.',
    objetivo: 'Calcular el valor de la resistencia con b1 = 2, b2 = 2 y mult = 1.',
    xp: 32,
    pistas: ['Valor = (b1 * 10 + b2) * 10^mult', 'Con mult = 1 es por 10.', 'Escribí: let valor = (b1 * 10 + b2) * Math.pow(10, 1);'],
    aprender: '<h3>Colores de resistencias</h3><p>Las dos primeras bandas son dígitos y la tercera es el multiplicador. mult = 1 significa multiplicar por 10. Así se obtienen los ohmios.</p>',
    ver: '<h3>Ejemplo</h3><pre><code>let b1 = 2;\nlet b2 = 2;\nlet mult = 1;\nlet valor = (b1 * 10 + b2) * Math.pow(10, mult);\nconsole.log(valor + " ohmios");</code></pre>',
    detectar: '<h3>Error</h3><pre><code>let b1 = 2;\nlet b2 = 2;\nlet mult = 2;\nlet valor = (b1 * 10 + b2) * Math.pow(10, mult);\nconsole.log(valor + " ohmios");</code></pre><p>¿Qué valor debe tener mult para obtener 220?</p>',
    reparar: {
      codigoInicial: 'let b1 = 2;\nlet b2 = 2;\nlet mult = 2;\nlet valor = (b1 * 10 + b2) * Math.pow(10, mult);\nconsole.log(valor + " ohmios");',
      validar: function (out, code) {
        if (!/mult\s*=\s*1\b/.test(code) && !/Math\.pow\s*\(\s*10\s*,\s*1\s*\)/.test(code) && !/\*\s*10\s*;/.test(code)) return { ok: false, exp: 'mult debe ser 1 para multiplicar por 10' };
        if (!out.includes('220 ohmios')) return { ok: false, exp: 'Debe mostrar 220 ohmios' };
        return { ok: true };
      }
    },
    comprender: '<h3>Solución</h3><p>Para obtener 220, el multiplicador debe ser 1 (por 10). (2 * 10 + 2) * 10 = 220 ohmios.</p>'
  },
  {
    id: 'm3-06', mundo: 3, titulo: 'Polaridad del LED',
    historia: 'El LED no enciende porque lo conectaron al revés. Hay que identificar sus patas.',
    objetivo: 'Asignar pataLarga = "anodo" y pataCorta = "catodo".',
    xp: 32,
    pistas: ['La pata larga es el ánodo (+).', 'La pata corta es el cátodo (−).', 'Escribí: let pataLarga = "anodo";'],
    aprender: '<h3>Polaridad del LED</h3><p>El LED tiene polaridad. La <strong>pata larga</strong> es el <strong>ánodo</strong> (+). La <strong>pata corta</strong> es el <strong>cátodo</strong> (−). Conectado al revés no enciende.</p>',
    ver: '<h3>Ejemplo</h3><pre><code>let pataLarga = "anodo";\nlet pataCorta = "catodo";\nconsole.log("Larga: " + pataLarga + ", corta: " + pataCorta);</code></pre>',
    detectar: '<h3>Error</h3><pre><code>let pataLarga = "catodo";\nlet pataCorta = "anodo";\nconsole.log("Larga: " + pataLarga + ", corta: " + pataCorta);</code></pre><p>¿Están intercambiadas?</p>',
    reparar: {
      codigoInicial: 'let pataLarga = "catodo";\nlet pataCorta = "anodo";\nconsole.log("Larga: " + pataLarga + ", corta: " + pataCorta);',
      validar: function (out, code) {
        if (!/pataLarga\s*=\s*["'][aá]nod/i.test(code)) return { ok: false, exp: 'La pata larga es el ánodo: pataLarga = "anodo";' };
        if (!/pataCorta\s*=\s*["']c[aá]tod/i.test(code)) return { ok: false, exp: 'La pata corta es el cátodo: pataCorta = "catodo";' };
        return { ok: true };
      }
    },
    comprender: '<h3>Solución</h3><p>La pata larga es el <strong>ánodo</strong> y la corta el <strong>cátodo</strong>. Respetar la polaridad es esencial para que el LED encienda.</p>'
  },
  {
    id: 'm3-07', mundo: 3, titulo: 'Resistencia para el LED',
    historia: 'El LED se quema porque no tiene la resistencia correcta para limitar la corriente.',
    objetivo: 'Calcular la corriente con R = (5 − 2) / 220 * 1000.',
    xp: 33,
    pistas: ['La corriente es (Vcc − Vled) / R.', 'Vcc = 5, Vled = 2, R = 220.', 'Escribí: let corriente = ((5 - 2) / 220) * 1000;'],
    aprender: '<h3>Resistencia del LED</h3><p>Para limitar la corriente: (Vcc − Vled) / R. Con 5 V y un LED de 2 V, (5 − 2) / 220 * 1000 ≈ 13.6 mA.</p>',
    ver: '<h3>Ejemplo</h3><pre><code>let corriente = ((5 - 2) / 220) * 1000;\nconsole.log(corriente.toFixed(1) + " mA");</code></pre>',
    detectar: '<h3>Error</h3><pre><code>let corriente = ((5 + 2) / 220) * 1000;\nconsole.log(corriente.toFixed(1) + " mA");</code></pre><p>¿Se suma o se resta el voltaje del LED?</p>',
    reparar: {
      codigoInicial: 'let corriente = ((5 + 2) / 220) * 1000;\nconsole.log(corriente.toFixed(1) + " mA");',
      validar: function (out, code) {
        if (!/\(\s*(?:Vcc\s*-\s*Vled|5\s*-\s*2)\s*\)\s*\/\s*(?:R|220)/.test(code) && !/\b3\s*\/\s*220/.test(code)) return { ok: false, exp: 'Restá el voltaje del LED: (5 - 2) / 220' };
        if (!out.includes('13.6')) return { ok: false, exp: 'Debe mostrar 13.6 mA' };
        return { ok: true };
      }
    },
    comprender: '<h3>Solución</h3><p>Se <strong>resta</strong> el voltaje del LED: <code>(5 - 2) / 220</code>. Sumar daría 31.8 mA, demasiada corriente.</p>'
  },
  {
    id: 'm3-08', mundo: 3, titulo: 'Resistencias en serie',
    historia: 'Dos resistencias en serie dan un total que el técnico calcula mal.',
    objetivo: 'Sumar R1 = 220 y R2 = 330 en serie para obtener el total.',
    xp: 33,
    pistas: ['En serie se suman: Rs = R1 + R2', 'R1 = 220, R2 = 330.', 'Escribí: let Rs = R1 + R2;'],
    aprender: '<h3>Resistencias en serie</h3><p>En serie se <strong>suman</strong>: Rs = R1 + R2. Así la corriente es la misma en ambas.</p>',
    ver: '<h3>Ejemplo</h3><pre><code>let R1 = 220;\nlet R2 = 330;\nlet Rs = R1 + R2;\nconsole.log("Rs = " + Rs + " ohmios");</code></pre>',
    detectar: '<h3>Error</h3><pre><code>let R1 = 220;\nlet R2 = 330;\nlet Rs = R1 * R2;\nconsole.log("Rs = " + Rs + " ohmios");</code></pre><p>¿Se multiplican o se suman en serie?</p>',
    reparar: {
      codigoInicial: 'let R1 = 220;\nlet R2 = 330;\nlet Rs = R1 * R2;\nconsole.log("Rs = " + Rs + " ohmios");',
      validar: function (out, code) {
        if (!/Rs\s*=\s*R1\s*\+\s*R2/.test(code) && !/220\s*\+\s*330/.test(code)) return { ok: false, exp: 'En serie se suman: Rs = R1 + R2' };
        if (!out.includes('550')) return { ok: false, exp: 'Debe mostrar Rs = 550 ohmios' };
        return { ok: true };
      }
    },
    comprender: '<h3>Solución</h3><p>En serie se <strong>suman</strong>: <code>Rs = R1 + R2</code> = 550 ohmios. Multiplicar daría un valor incorrecto.</p>'
  },
  {
    id: 'm3-09', mundo: 3, titulo: 'Resistencias en paralelo',
    historia: 'Dos resistencias en paralelo dan un total menor que cualquiera de ellas, pero el cálculo está mal.',
    objetivo: 'Calcular Rp = (R1 * R2) / (R1 + R2) con R1 = 100 y R2 = 100.',
    xp: 34,
    pistas: ['En paralelo: Rp = (R1 * R2) / (R1 + R2)', 'R1 = 100, R2 = 100.', 'Escribí: let Rp = (R1 * R2) / (R1 + R2);'],
    aprender: '<h3>Resistencias en paralelo</h3><p>En paralelo: Rp = (R1 * R2) / (R1 + R2). Da un valor menor que la resistencia menor. Con 100 y 100 da 50 ohmios.</p>',
    ver: '<h3>Ejemplo</h3><pre><code>let R1 = 100;\nlet R2 = 100;\nlet Rp = (R1 * R2) / (R1 + R2);\nconsole.log("Rp = " + Rp + " ohmios");</code></pre>',
    detectar: '<h3>Error</h3><pre><code>let R1 = 100;\nlet R2 = 100;\nlet Rp = R1 + R2;\nconsole.log("Rp = " + Rp + " ohmios");</code></pre><p>¿Es esa la fórmula de paralelo?</p>',
    reparar: {
      codigoInicial: 'let R1 = 100;\nlet R2 = 100;\nlet Rp = R1 + R2;\nconsole.log("Rp = " + Rp + " ohmios");',
      validar: function (out, code) {
        if (!/Rp\s*=\s*\(\s*R1\s*\*\s*R2\s*\)\s*\/\s*\(\s*R1\s*\+\s*R2\s*\)/.test(code)) return { ok: false, exp: 'Fórmula de paralelo: (R1 * R2) / (R1 + R2)' };
        if (!out.includes('50')) return { ok: false, exp: 'Debe mostrar Rp = 50 ohmios' };
        return { ok: true };
      }
    },
    comprender: '<h3>Solución</h3><p>La fórmula correcta es <code>(R1 * R2) / (R1 + R2)</code>. En paralelo el total es menor que la resistencia menor.</p>'
  },
  {
    id: 'm3-10', mundo: 3, titulo: 'El potenciómetro divisor',
    historia: 'Un potenciómetro divide el voltaje, pero el código calcula mal el voltaje de salida.',
    objetivo: 'Calcular Vout = vin * rBajo / rTotal con vin = 5, rTotal = 10000 y rBajo = 2500.',
    xp: 34,
    pistas: ['Vout = vin * rBajo / rTotal', 'rBajo es la resistencia hacia GND.', 'Escribí: let Vout = vin * rBajo / rTotal;'],
    aprender: '<h3>Potenciómetro divisor</h3><p>Un potenciómetro es un divisor de voltaje. Vout = vin * rBajo / rTotal. Con rBajo = 2500 de 10000, Vout = 1.25 V.</p>',
    ver: '<h3>Ejemplo</h3><pre><code>let vin = 5;\nlet rTotal = 10000;\nlet rBajo = 2500;\nlet Vout = vin * rBajo / rTotal;\nconsole.log("Vout = " + Vout + " V");</code></pre>',
    detectar: '<h3>Error</h3><pre><code>let vin = 5;\nlet rTotal = 10000;\nlet rBajo = 2500;\nlet Vout = vin * rTotal / rBajo;\nconsole.log("Vout = " + Vout + " V");</code></pre><p>¿Está invertida la fórmula?</p>',
    reparar: {
      codigoInicial: 'let vin = 5;\nlet rTotal = 10000;\nlet rBajo = 2500;\nlet Vout = vin * rTotal / rBajo;\nconsole.log("Vout = " + Vout + " V");',
      validar: function (out, code) {
        if (!/Vout\s*=\s*vin\s*\*\s*rBajo\s*\/\s*rTotal/.test(code)) return { ok: false, exp: 'Fórmula: Vout = vin * rBajo / rTotal' };
        if (!out.includes('1.25')) return { ok: false, exp: 'Debe mostrar Vout = 1.25 V' };
        return { ok: true };
      }
    },
    comprender: '<h3>Solución</h3><p>La fórmula correcta es <code>Vout = vin * rBajo / rTotal</code>. Invertir rBajo y rTotal daría 20 V, imposible.</p>'
  },
  {
    id: 'm3-11', mundo: 3, titulo: 'Capacitor y constante de tiempo',
    historia: 'Un capacitor se carga a través de una resistencia. El código calcula mal la constante de tiempo.',
    objetivo: 'Calcular tau = R * C con R = 1000 y C = 0.0001.',
    xp: 35,
    pistas: ['La constante de tiempo es tau = R * C', 'R en ohmios, C en faradios.', 'Escribí: let tau = R * C;'],
    aprender: '<h3>Capacitor y constante de tiempo</h3><p>La constante de tiempo es tau = R * C. Con R = 1000 y C = 0.0001 F, tau = 0.1 segundos. El capacitor se carga aproximadamente en 5 tau.</p>',
    ver: '<h3>Ejemplo</h3><pre><code>let R = 1000;\nlet C = 0.0001;\nlet tau = R * C;\nconsole.log("tau = " + tau + " s");</code></pre>',
    detectar: '<h3>Error</h3><pre><code>let R = 1000;\nlet C = 0.0001;\nlet tau = R / C;\nconsole.log("tau = " + tau + " s");</code></pre><p>¿Se multiplica o se divide?</p>',
    reparar: {
      codigoInicial: 'let R = 1000;\nlet C = 0.0001;\nlet tau = R / C;\nconsole.log("tau = " + tau + " s");',
      validar: function (out, code) {
        if (!/tau\s*=\s*R\s*\*\s*C/.test(code)) return { ok: false, exp: 'La constante es tau = R * C' };
        if (!out.includes('0.1')) return { ok: false, exp: 'Debe mostrar tau = 0.1 s' };
        return { ok: true };
      }
    },
    comprender: '<h3>Solución</h3><p>La constante de tiempo se <strong>multiplica</strong>: <code>tau = R * C</code> = 0.1 s. Dividir daría un valor gigante e incorrecto.</p>'
  },
  {
    id: 'm3-12', mundo: 3, titulo: 'Diodo: un solo sentido',
    historia: 'Un diodo solo deja pasar la corriente en un sentido. El código tiene la condición invertida.',
    objetivo: 'Corregir el if para que deje pasar la corriente cuando el voltaje es mayor a 0.',
    xp: 35,
    pistas: ['El diodo conduce en un solo sentido.', 'La condición debe ser voltaje > 0.', 'Escribí: if (voltaje > 0) {'],
    aprender: '<h3>Diodo</h3><p>Un diodo deja pasar la corriente en un solo sentido (del ánodo al cátodo). Conduce cuando el voltaje en su sentido es positivo.</p>',
    ver: '<h3>Ejemplo</h3><pre><code>let voltaje = 5;\nif (voltaje > 0) {\n  console.log("Conduce");\n} else {\n  console.log("No conduce");\n}</code></pre>',
    detectar: '<h3>Error</h3><pre><code>let voltaje = 5;\nif (voltaje < 0) {\n  console.log("Conduce");\n}</code></pre><p>¿El diodo conduce con voltaje positivo o negativo?</p>',
    reparar: {
      codigoInicial: 'let voltaje = 5;\nif (voltaje < 0) {\n  console.log("Conduce");\n} else {\n  console.log("No conduce");\n}',
      validar: function (out, code) {
        if (!/voltaje\s*(?:>=?|==)\s*0(?:\.\d+)?/.test(code)) return { ok: false, exp: 'La condición debe ser voltaje > 0' };
        return { ok: true };
      }
    },
    comprender: '<h3>Solución</h3><p>El diodo conduce cuando el voltaje es <strong>positivo</strong>: <code>voltaje &gt; 0</code>.</p>'
  },
  {
    id: 'm3-13', mundo: 3, titulo: 'Transistor: interruptor con base',
    historia: 'Un transistor funciona como interruptor controlado por la corriente de base. El código lo deja apagado.',
    objetivo: 'Encender el transistor escribiendo HIGH en el pin BASE.',
    xp: 36,
    pistas: ['La base controla el transistor.', 'digitalWrite(BASE, HIGH) lo enciende.', 'Escribí: digitalWrite(BASE, HIGH);'],
    aprender: '<h3>Transistor</h3><p>Un transistor NPN funciona como interruptor. La corriente en la <strong>base</strong> controla el paso entre colector y emisor. HIGH en la base lo enciende.</p>',
    ver: '<h3>Ejemplo</h3><pre><code>const BASE = 9;\ndigitalWrite(BASE, HIGH);\nconsole.log("Transistor encendido");</code></pre>',
    detectar: '<h3>Error</h3><pre><code>digitalWrite(BASE, LOW);\nconsole.log("Transistor encendido");</code></pre><p>¿HIGH o LOW enciende el transistor?</p>',
    reparar: {
      codigoInicial: 'digitalWrite(BASE, LOW);\nconsole.log("Transistor encendido");',
      validar: function (out, code) {
        if (!/digitalWrite\s*\(\s*BASE\s*,\s*HIGH\s*\)/.test(code)) return { ok: false, exp: 'Encendé la base: digitalWrite(BASE, HIGH);' };
        return { ok: true };
      }
    },
    comprender: '<h3>Solución</h3><p>La base controla el transistor. <code>digitalWrite(BASE, HIGH)</code> aplica corriente a la base y lo enciende.</p>'
  },
  {
    id: 'm3-14', mundo: 3, titulo: 'LDR: resistencia con luz',
    historia: 'Una LDR cambia de resistencia con la luz. El código multiplica en vez de dividir.',
    objetivo: 'Calcular cuántas veces cambia la resistencia: Roscuro / Rluz.',
    xp: 36,
    pistas: ['Rosculo = 100000, Rluz = 1000.', 'Veces = Roscuro / Rluz.', 'Escribí: let veces = Roscuro / Rluz;'],
    aprender: '<h3>LDR</h3><p>Una LDR (fotoresistencia) baja su resistencia con más luz. Aquí pasa de 100000 (oscuridad) a 1000 (luz): 100 veces menos.</p>',
    ver: '<h3>Ejemplo</h3><pre><code>let Roscuro = 100000;\nlet Rluz = 1000;\nlet veces = Roscuro / Rluz;\nconsole.log(veces + " veces menos");</code></pre>',
    detectar: '<h3>Error</h3><pre><code>let Roscuro = 100000;\nlet Rluz = 1000;\nlet veces = Roscuro * Rluz;\nconsole.log(veces + " veces menos");</code></pre><p>¿Para comparar resistencias se divide o se multiplica?</p>',
    reparar: {
      codigoInicial: 'let Roscuro = 100000;\nlet Rluz = 1000;\nlet veces = Roscuro * Rluz;\nconsole.log(veces + " veces menos");',
      validar: function (out, code) {
        if (!/veces\s*=\s*Roscuro\s*\/\s*Rluz/.test(code)) return { ok: false, exp: 'Dividí: veces = Roscuro / Rluz' };
        if (!out.includes('100')) return { ok: false, exp: 'Debe mostrar 100 veces' };
        return { ok: true };
      }
    },
    comprender: '<h3>Solución</h3><p>Para saber cuántas veces cambió, se <strong>divide</strong>: <code>Roscuro / Rluz</code> = 100. Multiplicar no tiene sentido físico aquí.</p>'
  },
  {
    id: 'm3-15', mundo: 3, titulo: 'Termistor NTC',
    historia: 'Un termistor NTC baja su resistencia al calentarse. El código usa la resistencia equivocada.',
    objetivo: 'Calcular la corriente con la resistencia caliente: I = V / Rcalida * 1000.',
    xp: 37,
    pistas: ['NTC: menor resistencia cuando está caliente.', 'Rcalida = 500, Rfria = 10000.', 'Escribí: let I = V / Rcalida * 1000;'],
    aprender: '<h3>Termistor NTC</h3><p>Un NTC (Negative Temperature Coefficient) baja su resistencia al calentarse. Para el caso caliente se usa Rcalida = 500 ohmios.</p>',
    ver: '<h3>Ejemplo</h3><pre><code>let V = 5;\nlet Rcalida = 500;\nlet I = V / Rcalida * 1000;\nconsole.log(I.toFixed(2) + " mA");</code></pre>',
    detectar: '<h3>Error</h3><pre><code>let V = 5;\nlet Rfria = 10000;\nlet I = V / Rfria * 1000;\nconsole.log(I.toFixed(2) + " mA");</code></pre><p>Para el caso caliente, ¿qué resistencia se usa?</p>',
    reparar: {
      codigoInicial: 'let V = 5;\nlet Rfria = 10000;\nlet I = V / Rfria * 1000;\nconsole.log(I.toFixed(2) + " mA");',
      validar: function (out, code) {
        if (!/V\s*\/\s*Rcalida\s*\*\s*1000/.test(code)) return { ok: false, exp: 'Usá la resistencia caliente: I = V / Rcalida * 1000' };
        if (!out.includes('10.00')) return { ok: false, exp: 'Debe mostrar 10.00 mA' };
        return { ok: true };
      }
    },
    comprender: '<h3>Solución</h3><p>Con el NTC caliente, la resistencia es menor (Rcalida = 500). <code>I = V / Rcalida * 1000</code> = 10.00 mA. Usar Rfria daría 0.50 mA.</p>'
  },
  {
    id: 'm3-16', mundo: 3, titulo: 'Relé y aislamiento',
    historia: 'Un relé permite controlar un circuito de alta potencia con uno de baja. El código escribe el voltaje en el pin.',
    objetivo: 'Encender el relé con digitalWrite(RELE, HIGH).',
    xp: 37,
    pistas: ['El relé se controla como un pin digital.', 'HIGH lo activa, no el voltaje.', 'Escribí: digitalWrite(RELE, HIGH);'],
    aprender: '<h3>Relé</h3><p>Un relé es un interruptor controlado por un electroimán. Aísla el circuito de control (baja potencia) del circuito cargado (alta potencia). Se activa con HIGH en su pin.</p>',
    ver: '<h3>Ejemplo</h3><pre><code>const RELE = 7;\ndigitalWrite(RELE, HIGH);\nconsole.log("Relé activado");</code></pre>',
    detectar: '<h3>Error</h3><pre><code>digitalWrite(RELE, 220);\nconsole.log("Relé activado");</code></pre><p>¿Qué valor debe recibir el pin digital?</p>',
    reparar: {
      codigoInicial: 'digitalWrite(RELE, 220);\nconsole.log("Relé activado");',
      validar: function (out, code) {
        if (!/digitalWrite\s*\(\s*RELE\s*,\s*HIGH\s*\)/.test(code)) return { ok: false, exp: 'Activalo con HIGH: digitalWrite(RELE, HIGH);' };
        return { ok: true };
      }
    },
    comprender: '<h3>Solución</h3><p><code>digitalWrite</code> espera HIGH o LOW, no un voltaje. <code>digitalWrite(RELE, HIGH)</code> activa la bobina del relé.</p>'
  },
  {
    id: 'm3-17', mundo: 3, titulo: 'PWM y ciclo de trabajo',
    historia: 'La luz del LED debe regularse con PWM. El ciclo de trabajo está invertido.',
    objetivo: 'Calcular el ciclo de trabajo con encendido = 128 y total = 255.',
    xp: 38,
    pistas: ['Ciclo de trabajo = (encendido / total) * 100', 'encendido = 128, total = 255.', 'Escribí: let ciclo = (encendido / total) * 100;'],
    aprender: '<h3>PWM</h3><p>PWM simula un voltaje variable encendiendo y apagando rápido. El ciclo de trabajo es el porcentaje de tiempo encendido. Con 128 de 255 ≈ 50.2%.</p>',
    ver: '<h3>Ejemplo</h3><pre><code>let encendido = 128;\nlet total = 255;\nlet ciclo = (encendido / total) * 100;\nconsole.log(ciclo.toFixed(1) + "%");</code></pre>',
    detectar: '<h3>Error</h3><pre><code>let encendido = 128;\nlet total = 255;\nlet ciclo = (total / encendido) * 100;\nconsole.log(ciclo.toFixed(1) + "%");</code></pre><p>¿Está invertida la división?</p>',
    reparar: {
      codigoInicial: 'let encendido = 128;\nlet total = 255;\nlet ciclo = (total / encendido) * 100;\nconsole.log(ciclo.toFixed(1) + "%");',
      validar: function (out, code) {
        if (!/\(\s*encendido\s*\/\s*total\s*\)\s*\*\s*100/.test(code)) return { ok: false, exp: 'Fórmula: (encendido / total) * 100' };
        if (!out.includes('50.2')) return { ok: false, exp: 'Debe mostrar 50.2%' };
        return { ok: true };
      }
    },
    comprender: '<h3>Solución</h3><p>El ciclo de trabajo es <code>(encendido / total) * 100</code> ≈ 50.2%. Invertirlo daría 199.2%, imposible.</p>'
  },
  {
    id: 'm3-18', mundo: 3, titulo: 'Analógico y digital',
    historia: 'Un sensor analógico (0-1023) debe compararse con un umbral para decidir si está encendido o apagado.',
    objetivo: 'Asignar digital = 1 si valor (700) supera el umbral (512), si no 0.',
    xp: 38,
    pistas: ['valor = 700, umbral = 512.', 'Si valor > umbral, digital = 1.', 'Escribí: let digital = valor > umbral ? 1 : 0;'],
    aprender: '<h3>Analógico a digital</h3><p>Los pines analógicos leen 0-1023. Para decidir si está "encendido", se compara con un umbral. Con valor = 700 y umbral = 512, digital = 1.</p>',
    ver: '<h3>Ejemplo</h3><pre><code>let valor = 700;\nlet umbral = 512;\nlet digital = valor > umbral ? 1 : 0;\nconsole.log("digital = " + digital);</code></pre>',
    detectar: '<h3>Error</h3><pre><code>let valor = 700;\nlet umbral = 512;\nlet digital = valor > 1024 ? 1 : 0;\nconsole.log("digital = " + digital);</code></pre><p>¿Con qué valor se compara?</p>',
    reparar: {
      codigoInicial: 'let valor = 700;\nlet umbral = 512;\nlet digital = valor > 1024 ? 1 : 0;\nconsole.log("digital = " + digital);',
      validar: function (out, code) {
        if (!/valor\s*>\s*umbral/.test(code)) return { ok: false, exp: 'Compará con el umbral: valor > umbral' };
        if (!out.includes('digital = 1')) return { ok: false, exp: 'Debe mostrar digital = 1' };
        return { ok: true };
      }
    },
    comprender: '<h3>Solución</h3><p>Hay que comparar con el umbral, no con el máximo del ADC. <code>valor &gt; umbral</code> da 1 cuando el sensor supera el límite.</p>'
  },
  {
    id: 'm3-19', mundo: 3, titulo: '5V y 3.3V: niveles lógicos',
    historia: 'Muchos sensores trabajan a 3.3V y otros a 5V. Hay que saber la relación entre ambos.',
    objetivo: 'Calcular qué porcentaje del rango de 5V ocupa 3.3V.',
    xp: 39,
    pistas: ['3.3 de 5 voltios es el porcentaje.', '3.3 / 5 * 100', 'Escribí: let porcentaje = Math.round(3.3 / 5 * 100);'],
    aprender: '<h3>Niveles lógicos</h3><p>5V y 3.3V son niveles lógicos comunes. 3.3V es el 66% de 5V. Muchos módulos de 3.3V no toleran 5V.</p>',
    ver: '<h3>Ejemplo</h3><pre><code>let porcentaje = Math.round(3.3 / 5 * 100);\nconsole.log(porcentaje + "%");</code></pre>',
    detectar: '<h3>Error</h3><pre><code>let porcentaje = Math.round(5 / 3.3 * 100);\nconsole.log(porcentaje + "%");</code></pre><p>¿Qué valor va arriba en la división?</p>',
    reparar: {
      codigoInicial: 'let porcentaje = Math.round(5 / 3.3 * 100);\nconsole.log(porcentaje + "%");',
      validar: function (out, code) {
        if (!/3\.3\s*\/\s*5/.test(code)) return { ok: false, exp: 'La división es 3.3 / 5' };
        if (!/Math\.round/.test(code) && !/toFixed\s*\(\s*0\s*\)/.test(code)) return { ok: false, exp: 'Redondeá con Math.round' };
        if (!out.includes('66')) return { ok: false, exp: 'Debe mostrar 66%' };
        return { ok: true };
      }
    },
    comprender: '<h3>Solución</h3><p>3.3 de 5: <code>Math.round(3.3 / 5 * 100)</code> = 66%. Usar 5/3.3 daría 152%, que no es un porcentaje válido.</p>'
  },
  {
    id: 'm3-20', mundo: 3, titulo: 'GND común',
    historia: 'Dos módulos conectados a tierras distintas no se entienden. Deben compartir GND.',
    objetivo: 'Asignar gndSensor y gndLed a "GND" (la misma tierra).',
    xp: 39,
    pistas: ['Los módulos deben compartir la misma tierra.', 'Ambas variables deben valer "GND".', 'Escribí: let gndSensor = "GND";'],
    aprender: '<h3>GND común</h3><p>Los módulos deben compartir la misma tierra (GND) para comunicarse. Si tienen tierras distintas, las señales no se referencian correctamente.</p>',
    ver: '<h3>Ejemplo</h3><pre><code>let gndSensor = "GND";\nlet gndLed = "GND";\nconsole.log(gndSensor + " y " + gndLed + " son la misma tierra");</code></pre>',
    detectar: '<h3>Error</h3><pre><code>let gndSensor = "GND-sensor";\nlet gndLed = "GND-led";\nconsole.log(gndSensor + " y " + gndLed);</code></pre><p>¿Son la misma tierra o dos distintas?</p>',
    reparar: {
      codigoInicial: 'let gndSensor = "GND-sensor";\nlet gndLed = "GND-led";\nconsole.log(gndSensor + " y " + gndLed + " son la misma tierra");',
      validar: function (out, code) {
        if (!/gndSensor\s*=\s*["']GND["']/.test(code)) return { ok: false, exp: 'gndSensor debe ser "GND"' };
        if (!/gndLed\s*=\s*["']GND["']/.test(code)) return { ok: false, exp: 'gndLed debe ser "GND"' };
        return { ok: true };
      }
    },
    comprender: '<h3>Solución</h3><p>Ambas tierras deben ser la misma: <code>"GND"</code>. Así los módulos comparten referencia y se comunican bien.</p>'
  },
  {
    id: 'm3-21', mundo: 3, titulo: 'Cortocircuito: peligro',
    historia: 'Un cortocircuito puede dañar la fuente y prender fuego. Hay que dimensionar la corriente peligrosa.',
    objetivo: 'Calcular la corriente con R = 0.01 ohm (cortocircuito).',
    xp: 40,
    pistas: ['Un cortocircuito tiene resistencia casi cero.', 'R = 0.01 ohm, V = 5 V.', 'Escribí: let I = V / R;'],
    aprender: '<h3>Cortocircuito</h3><p>Un cortocircuito tiene resistencia casi cero, lo que deja pasar una corriente enorme (I = V / R). Con R = 0.01, I = 500 A. Peligroso.</p>',
    ver: '<h3>Ejemplo</h3><pre><code>let V = 5;\nlet R = 0.01;\nlet I = V / R;\nconsole.log(I + " A (peligro)");</code></pre>',
    detectar: '<h3>Error</h3><pre><code>let V = 5;\nlet R = 100;\nlet I = V / R;\nconsole.log(I + " A (peligro)");</code></pre><p>Una resistencia normal no es un cortocircuito.</p>',
    reparar: {
      codigoInicial: 'let V = 5;\nlet R = 100;\nlet I = V / R;\nconsole.log(I + " A (peligro)");',
      validar: function (out, code) {
        if (!/0\.01/.test(code)) return { ok: false, exp: 'El cortocircuito tiene R = 0.01' };
        if (!out.includes('500')) return { ok: false, exp: 'Debe mostrar 500 A' };
        return { ok: true };
      }
    },
    comprender: '<h3>Solución</h3><p>Un cortocircuito es R ≈ 0. <code>I = V / R</code> = 500 A. Por eso se usan fusibles y protectores.</p>'
  },
  {
    id: 'm3-22', mundo: 3, titulo: 'Potencia en miliwatios',
    historia: 'La potencia disipada en un componente se calcula mal. Hay que obtenerla en miliwatios.',
    objetivo: 'Calcular P = V * I * 1000 con V = 5 e I = 0.02.',
    xp: 41,
    pistas: ['P = V * I, y pasar a mW con * 1000.', 'V = 5, I = 0.02.', 'Escribí: let P = V * I * 1000;'],
    aprender: '<h3>Potencia</h3><p>P = V * I. Multiplicando por 1000 se expresa en miliwatios. Con V = 5 e I = 0.02, P = 100 mW.</p>',
    ver: '<h3>Ejemplo</h3><pre><code>let V = 5;\nlet I = 0.02;\nlet P = V * I * 1000;\nconsole.log("P = " + P + " mW");</code></pre>',
    detectar: '<h3>Error</h3><pre><code>let V = 5;\nlet I = 0.02;\nlet P = V * I;\nconsole.log("P = " + P + " mW");</code></pre><p>Falta convertir a miliwatios.</p>',
    reparar: {
      codigoInicial: 'let V = 5;\nlet I = 0.02;\nlet P = V * I;\nconsole.log("P = " + P + " mW");',
      validar: function (out, code) {
        if (!/P\s*=\s*V\s*\*\s*I\s*\*\s*1000/.test(code)) return { ok: false, exp: 'Pasá a miliwatios: P = V * I * 1000' };
        if (!out.includes('P = 100 mW')) return { ok: false, exp: 'Debe mostrar P = 100 mW' };
        return { ok: true };
      }
    },
    comprender: '<h3>Solución</h3><p>Para miliwatios: <code>P = V * I * 1000</code> = 100 mW. Sin el *1000 sería 0.1 W, no mW.</p>'
  },
  {
    id: 'm3-23', mundo: 3, titulo: 'Divisor de voltaje',
    historia: 'Un divisor de voltaje con dos resistencias debe bajar el voltaje a la mitad. El código no lo logra.',
    objetivo: 'Calcular Vout = Vin * R2 / (R1 + R2) con R1 = R2 = 1000 y Vin = 5.',
    xp: 42,
    pistas: ['Divisor: Vout = Vin * R2 / (R1 + R2)', 'R1 = R2 = 1000 ohm.', 'Escribí: let Vout = Vin * R2 / (R1 + R2);'],
    aprender: '<h3>Divisor de voltaje</h3><p>Vout = Vin * R2 / (R1 + R2). Con dos resistencias iguales da la mitad del voltaje: 2.5 V.</p>',
    ver: '<h3>Ejemplo</h3><pre><code>let Vin = 5;\nlet R1 = 1000;\nlet R2 = 1000;\nlet Vout = Vin * R2 / (R1 + R2);\nconsole.log("Vout = " + Vout + " V");</code></pre>',
    detectar: '<h3>Error</h3><pre><code>let Vin = 5;\nlet R1 = 1000;\nlet R2 = 1000;\nlet Vout = Vin * R2 / R1;\nconsole.log("Vout = " + Vout + " V");</code></pre><p>Falta la suma de ambas resistencias.</p>',
    reparar: {
      codigoInicial: 'let Vin = 5;\nlet R1 = 1000;\nlet R2 = 1000;\nlet Vout = Vin * R2 / R1;\nconsole.log("Vout = " + Vout + " V");',
      validar: function (out, code) {
        if (!/R2\s*\/\s*\(\s*R1\s*\+\s*R2\s*\)/.test(code) && !/1000\s*\/\s*\(\s*1000\s*\+\s*1000\s*\)/.test(code)) return { ok: false, exp: 'Fórmula: Vout = Vin * R2 / (R1 + R2)' };
        if (!out.includes('2.5')) return { ok: false, exp: 'Debe mostrar Vout = 2.5 V' };
        return { ok: true };
      }
    },
    comprender: '<h3>Solución</h3><p>El divisor usa la suma en el denominador: <code>Vin * R2 / (R1 + R2)</code> = 2.5 V. Dividir solo por R1 daría 5 V, sin bajar.</p>'
  },
  {
    id: 'm3-24', mundo: 3, titulo: 'Baterías en serie',
    historia: 'Tres pilas de 1.5V en serie deben dar más voltaje, pero el código calcula menos.',
    objetivo: 'Sumar el voltaje de celdas en serie: total = celda * cantidad.',
    xp: 43,
    pistas: ['En serie se suman los voltajes.', 'celda = 1.5, cantidad = 3.', 'Escribí: let total = celda * cantidad;'],
    aprender: '<h3>Baterías en serie</h3><p>En serie se <strong>suman</strong> los voltajes. Tres celdas de 1.5 V dan 4.5 V. Multiplicar celda por cantidad es sumar repetidamente.</p>',
    ver: '<h3>Ejemplo</h3><pre><code>let celda = 1.5;\nlet cantidad = 3;\nlet total = celda * cantidad;\nconsole.log(total + " V");</code></pre>',
    detectar: '<h3>Error</h3><pre><code>let celda = 1.5;\nlet cantidad = 3;\nlet total = celda / cantidad;\nconsole.log(total + " V");</code></pre><p>¿Se suman o se dividen en serie?</p>',
    reparar: {
      codigoInicial: 'let celda = 1.5;\nlet cantidad = 3;\nlet total = celda / cantidad;\nconsole.log(total + " V");',
      validar: function (out, code) {
        if (!/total\s*=\s*celda\s*\*\s*cantidad/.test(code)) return { ok: false, exp: 'En serie se suman: total = celda * cantidad' };
        if (!out.includes('4.5')) return { ok: false, exp: 'Debe mostrar 4.5 V' };
        return { ok: true };
      }
    },
    comprender: '<h3>Solución</h3><p>En serie se suman: <code>celda * cantidad</code> = 4.5 V. Dividir daría 0.5 V, incorrecto.</p>'
  },
  {
    id: 'm3-25', mundo: 3, titulo: 'Fusible y protección',
    historia: 'Un fusible se elige según la corriente que debe dejar pasar antes de fundirse.',
    objetivo: 'Calcular la corriente del fusible: I = P / V.',
    xp: 44,
    pistas: ['I = P / V', 'P = 24 W, V = 12 V.', 'Escribí: let I = P / V;'],
    aprender: '<h3>Fusible</h3><p>Un fusible se funde si supera su corriente nominal. I = P / V. Con P = 24 W y V = 12 V, I = 2 A.</p>',
    ver: '<h3>Ejemplo</h3><pre><code>let P = 24;\nlet V = 12;\nlet I = P / V;\nconsole.log("I = " + I + " A");</code></pre>',
    detectar: '<h3>Error</h3><pre><code>let P = 24;\nlet V = 12;\nlet I = V * P;\nconsole.log("I = " + I + " A");</code></pre><p>¿Cómo se despeja la corriente?</p>',
    reparar: {
      codigoInicial: 'let P = 24;\nlet V = 12;\nlet I = V * P;\nconsole.log("I = " + I + " A");',
      validar: function (out, code) {
        if (!/P\s*\/\s*V/.test(code) && !/24\s*\/\s*12/.test(code)) return { ok: false, exp: 'La corriente es I = P / V' };
        if (!out.includes('I = 2 A')) return { ok: false, exp: 'Debe mostrar I = 2 A' };
        return { ok: true };
      }
    },
    comprender: '<h3>Solución</h3><p>Para despejar la corriente: <code>I = P / V</code> = 2 A. Así se elige el fusible adecuado.</p>'
  },
  {
    id: 'm3-26', mundo: 3, titulo: 'Pantalla LCD 16x2',
    historia: 'La pantalla LCD 16x2 tiene 32 caracteres en total. El código suma en vez de multiplicar.',
    objetivo: 'Calcular total = columnas * filas y libres = total − usados.',
    xp: 45,
    pistas: ['16x2 = 32 caracteres.', 'total = columnas * filas', 'Escribí: let total = columnas * filas;'],
    aprender: '<h3>LCD 16x2</h3><p>Una LCD 16x2 tiene 16 columnas y 2 filas = 32 caracteres. "TiendaVirtus" ocupa 12, quedan 20 libres.</p>',
    ver: '<h3>Ejemplo</h3><pre><code>let columnas = 16;\nlet filas = 2;\nlet total = columnas * filas;\nlet usados = "TiendaVirtus".length;\nlet libres = total - usados;\nconsole.log("Total: " + total + " caracteres");\nconsole.log("Libres: " + libres);</code></pre>',
    detectar: '<h3>Error</h3><pre><code>let columnas = 16;\nlet filas = 2;\nlet total = columnas + filas;\nlet usados = "TiendaVirtus".length;\nlet libres = total - usados;\nconsole.log("Total: " + total + " caracteres");\nconsole.log("Libres: " + libres);</code></pre><p>¿Se suman o se multiplican las dimensiones?</p>',
    reparar: {
      codigoInicial: 'let columnas = 16;\nlet filas = 2;\nlet total = columnas + filas;\nlet usados = "TiendaVirtus".length;\nlet libres = total - usados;\nconsole.log("Total: " + total + " caracteres");\nconsole.log("Libres: " + libres);',
      validar: function (out, code) {
        if (!/total\s*=\s*columnas\s*\*\s*filas/.test(code)) return { ok: false, exp: 'Multiplicá las dimensiones: total = columnas * filas' };
        if (!out.includes('Total: 32 caracteres')) return { ok: false, exp: 'Debe mostrar Total: 32 caracteres' };
        if (!out.includes('Libres: 20')) return { ok: false, exp: 'Debe mostrar Libres: 20' };
        return { ok: true };
      }
    },
    comprender: '<h3>Solución</h3><p>Las dimensiones se <strong>multiplican</strong>: <code>columnas * filas</code> = 32. Con 12 usados, quedan 20 libres.</p>'
  },
  {
    id: 'm3-27', mundo: 3, titulo: 'Servo: mapear 0-180',
    historia: 'Un sensor de 0-1023 debe mapearse al rango de un servo de 0 a 180 grados.',
    objetivo: 'Mapear valor (512) a grados con Math.round(valor * 180 / 1023).',
    xp: 46,
    pistas: ['grados = valor * 180 / 1023', 'Redondeá con Math.round.', 'Escribí: let grados = Math.round(valor * 180 / 1023);'],
    aprender: '<h3>Mapeo de servo</h3><p>Para convertir 0-1023 a 0-180: grados = Math.round(valor * 180 / 1023). Con valor = 512 da 90°, la posición central.</p>',
    ver: '<h3>Ejemplo</h3><pre><code>let valor = 512;\nlet grados = Math.round(valor * 180 / 1023);\nconsole.log("Grados: " + grados);</code></pre>',
    detectar: '<h3>Error</h3><pre><code>let valor = 512;\nlet grados = Math.round(valor * 1023 / 180);\nconsole.log("Grados: " + grados);</code></pre><p>¿Está invertida la relación?</p>',
    reparar: {
      codigoInicial: 'let valor = 512;\nlet grados = Math.round(valor * 1023 / 180);\nconsole.log("Grados: " + grados);',
      validar: function (out, code) {
        if (!/Math\.round/.test(code)) return { ok: false, exp: 'Redondeá con Math.round' };
        if (!/valor\s*\*\s*180\s*\/\s*1023/.test(code) && !/512\s*\*\s*180\s*\/\s*1023/.test(code)) return { ok: false, exp: 'Fórmula: valor * 180 / 1023' };
        if (!out.includes('Grados: 90')) return { ok: false, exp: 'Debe mostrar Grados: 90' };
        return { ok: true };
      }
    },
    comprender: '<h3>Solución</h3><p>El rango destino va arriba: <code>valor * 180 / 1023</code> = 90°. Invertir daría 2910°, fuera del servo.</p>'
  },
  {
    id: 'm3-28', mundo: 3, titulo: 'Sensor ultrasónico',
    historia: 'El sensor ultrasónico mide distancia con el tiempo de eco. El código olvidó dividir por 2.',
    objetivo: 'Calcular d = (v * t) / 2 con v = 343 y t = 0.002.',
    xp: 47,
    pistas: ['La distancia es (velocidad * tiempo) / 2', 'El eco viaja de ida y vuelta.', 'Escribí: let d = (v * t) / 2;'],
    aprender: '<h3>Sensor ultrasónico</h3><p>El eco viaja de ida y vuelta, por eso se divide por 2: d = (v * t) / 2. Con v = 343 m/s y t = 0.002 s, d = 0.343 m.</p>',
    ver: '<h3>Ejemplo</h3><pre><code>let v = 343;\nlet t = 0.002;\nlet d = (v * t) / 2;\nconsole.log(d.toFixed(3) + " m");</code></pre>',
    detectar: '<h3>Error</h3><pre><code>let v = 343;\nlet t = 0.002;\nlet d = v * t;\nconsole.log(d.toFixed(3) + " m");</code></pre><p>El eco es de ida y vuelta.</p>',
    reparar: {
      codigoInicial: 'let v = 343;\nlet t = 0.002;\nlet d = v * t;\nconsole.log(d.toFixed(3) + " m");',
      validar: function (out, code) {
        if (!/(v\s*\*\s*t|343\s*\*\s*0\.002)/.test(code)) return { ok: false, exp: 'Calculá v * t' };
        if (!/\/\s*2\b/.test(code)) return { ok: false, exp: 'Dividí por 2: el eco es de ida y vuelta' };
        if (!out.includes('0.343')) return { ok: false, exp: 'Debe mostrar 0.343 m' };
        return { ok: true };
      }
    },
    comprender: '<h3>Solución</h3><p>El sonido recorre ida y vuelta, así que se <strong>divide por 2</strong>: <code>(v * t) / 2</code> = 0.343 m. Sin dividir sería el doble.</p>'
  },
  {
    id: 'm3-29', mundo: 3, titulo: 'Duración en mAh',
    historia: 'La duración de una batería depende de su capacidad y del consumo. El código multiplica.',
    objetivo: 'Calcular horas = capacidad / consumo con capacidad = 2000 y consumo = 200.',
    xp: 48,
    pistas: ['horas = capacidad / consumo', 'capacidad = 2000 mAh, consumo = 200 mA.', 'Escribí: let horas = capacidad / consumo;'],
    aprender: '<h3>Duración de batería</h3><p>La duración en horas es capacidad (mAh) / consumo (mA). Con 2000 mAh y 200 mA, dura 10 horas.</p>',
    ver: '<h3>Ejemplo</h3><pre><code>let capacidad = 2000;\nlet consumo = 200;\nlet horas = capacidad / consumo;\nconsole.log("Dura " + horas + " horas");</code></pre>',
    detectar: '<h3>Error</h3><pre><code>let capacidad = 2000;\nlet consumo = 200;\nlet horas = capacidad * consumo;\nconsole.log("Dura " + horas + " horas");</code></pre><p>¿Se multiplica o se divide para obtener horas?</p>',
    reparar: {
      codigoInicial: 'let capacidad = 2000;\nlet consumo = 200;\nlet horas = capacidad * consumo;\nconsole.log("Dura " + horas + " horas");',
      validar: function (out, code) {
        if (!/capacidad\s*\/\s*consumo/.test(code) && !/2000\s*\/\s*200/.test(code)) return { ok: false, exp: 'Dividí: horas = capacidad / consumo' };
        if (!out.includes('Dura 10 horas')) return { ok: false, exp: 'Debe mostrar Dura 10 horas' };
        return { ok: true };
      }
    },
    comprender: '<h3>Solución</h3><p>La duración se <strong>divide</strong>: <code>capacidad / consumo</code> = 10 horas. Multiplicar daría 400000, sin sentido.</p>'
  },
  {
    id: 'm3-30', mundo: 3, titulo: 'Diagnóstico integral',
    historia: 'Un circuito con dos resistencias en paralelo falla. Hay que encontrar todos los errores a la vez.',
    objetivo: 'Corregir Rp, la corriente I y la potencia P del circuito.',
    xp: 50,
    pistas: ['Rp = (R1 * R2) / (R1 + R2)', 'I = V / Rp, luego P = V * I * 1000.', 'Corregí los tres cálculos.'],
    aprender: '<h3>Diagnóstico completo</h3><p>Un sistema real combina varios cálculos. Aquí: paralelo → corriente → potencia. Cada error afecta al siguiente.</p>',
    ver: '<h3>Circuito correcto</h3><pre><code>let V = 5;\nlet R1 = 100;\nlet R2 = 100;\nlet Rp = (R1 * R2) / (R1 + R2);\nlet I = V / Rp;\nlet P = V * I * 1000;\nconsole.log("Rp = " + Rp + " ohm");\nconsole.log("I = " + I + " A");\nconsole.log("P = " + P + " mW");</code></pre><p>Debe mostrar Rp = 50 ohm, I = 0.1 A, P = 500 mW.</p>',
    detectar: '<h3>Código con errores</h3>',
    reparar: {
      codigoInicial: 'let V = 5;\nlet R1 = 100;\nlet R2 = 100;\nlet Rp = R1 + R2;\nlet I = V / Rp;\nlet P = V * I;\nconsole.log("Rp = " + Rp + " ohm");\nconsole.log("I = " + I + " A");\nconsole.log("P = " + P + " mW");',
      validar: function (out, code) {
        if (!/\(\s*R1\s*\*\s*R2\s*\)\s*\/\s*\(\s*R1\s*\+\s*R2\s*\)/.test(code)) return { ok: false, exp: 'Rp incorrecto: usá (R1 * R2) / (R1 + R2)' };
        if (!/I\s*=\s*V\s*\/\s*Rp/.test(code)) return { ok: false, exp: 'La corriente es I = V / Rp' };
        if (!/P\s*=\s*V\s*\*\s*I\s*\*\s*1000/.test(code)) return { ok: false, exp: 'Para miliwatios: P = V * I * 1000' };
        if (!out.includes('Rp = 50 ohm')) return { ok: false, exp: 'Debe mostrar Rp = 50 ohm' };
        if (!out.includes('I = 0.1 A')) return { ok: false, exp: 'Debe mostrar I = 0.1 A' };
        if (!out.includes('P = 500 mW')) return { ok: false, exp: 'Debe mostrar P = 500 mW' };
        return { ok: true };
      }
    },
    comprender: '<h3>Diagnóstico completo</h3><p>Tres errores en cadena: Rp sumaba en vez de usar la fórmula de paralelo (daría 200). I depende de Rp, por eso era 0.025. P faltaba el *1000 para mW. Corregido: Rp = 50, I = 0.1, P = 500 mW.</p>'
  }
);
