MISIONES.push(
  // ═══════════════════════════════════════════════════════════
  // MUNDO 4: TALLER DE REPARACIÓN ARDUINO (TiendaVirtus)
  // ═══════════════════════════════════════════════════════════
  {
    id: 'm4-01', mundo: 4, titulo: 'Estructura de todo sketch',
    historia: 'En el taller llegó un sketch de Arduino que no compila: hay código suelto por todos lados y nadie sabe qué va primero. Hay que ordenarlo.',
    objetivo: 'Organizar el código dentro de void setup() (arranque) y void loop() (repetición).',
    xp: 35,
    pistas: ['Todo sketch de Arduino tiene DOS partes obligatorias.', 'setup() se ejecuta una sola vez al encender; loop() se repite para siempre.', 'Envolvé el pinMode en void setup() { } y el parpadeo en void loop() { }.'],
    aprender: '<h3>La estructura de un sketch</h3><p>Todo programa de Arduino necesita <code>void setup()</code> y <code>void loop()</code>. <code>setup()</code> corre UNA sola vez al encender la placa: ahí se configuran los pines. <code>loop()</code> se repite sin parar mientras haya energía.</p><pre><code>void setup() {\n  // una sola vez\n}\nvoid loop() {\n  // para siempre\n}</code></pre>',
    ver: '<h3>Sketch correcto</h3><pre><code>void setup() {\n  pinMode(13, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(500);\n  digitalWrite(13, LOW);\n  delay(500);\n}</code></pre><p>El arranque configura el pin y el loop lo hace parpadear.</p>',
    detectar: '<h3>Código sin estructura</h3><pre><code>pinMode(13, OUTPUT);\ndigitalWrite(13, HIGH);\ndelay(500);\ndigitalWrite(13, LOW);\ndelay(500);</code></pre><p>¿Dónde está el arranque y dónde la repetición?</p>',
    reparar: {
      codigoInicial: 'pinMode(13, OUTPUT);\ndigitalWrite(13, HIGH);\ndelay(500);\ndigitalWrite(13, LOW);\ndelay(500);',
      validar: function (out, code) {
        var errores = [];
        if (!/void\s+setup\s*\(/.test(code)) errores.push('void setup()');
        if (!/void\s+loop\s*\(/.test(code)) errores.push('void loop()');
        if (!/pinMode\s*\(\s*13\s*,\s*OUTPUT\s*\)/.test(code)) errores.push('pinMode(13, OUTPUT)');
        if (!/digitalWrite\s*\(\s*13\s*,\s*HIGH\s*\)/.test(code)) errores.push('digitalWrite(13, HIGH)');
        if (errores.length > 0) return { ok: false, exp: 'Faltan corregir: ' + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>¿Por qué no compilaba?</h3><p>El compilador de Arduino exige esas dos funciones. Sin <code>setup()</code> no hay lugar para configurar los pines y sin <code>loop()</code> el programa terminaría apenas de arrancar.</p><pre><code>void setup() {\n  pinMode(13, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(13, HIGH);\n}</code></pre>'
  },
  {
    id: 'm4-02', mundo: 4, titulo: 'LED sin modo de salida',
    historia: 'Reparaste el cable del LED del banco de trabajo, pero al subir el sketch sigue muerto: el técnico anterior olvidó configurar el pin.',
    objetivo: 'Declarar el pin 6 como salida con pinMode(6, OUTPUT) dentro de setup().',
    xp: 36,
    pistas: ['Los pines digitales arrancan configurados como ENTRADA.', 'La función es pinMode(pin, modo) y se llama dentro de setup().', 'Escribí: pinMode(6, OUTPUT);'],
    aprender: '<h3>pinMode(pin, modo)</h3><p><code>pinMode(6, OUTPUT)</code> le dice al pin 6 que va a ENTREGAR energía (0V o 5V). Con <code>INPUT</code> en cambio, el pin solo LEE. Se configura siempre dentro de <code>setup()</code>.</p><pre><code>void setup() {\n  pinMode(6, OUTPUT);\n}</code></pre>',
    ver: '<h3>Correcto</h3><pre><code>void setup() {\n  pinMode(6, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(6, HIGH);\n}</code></pre><p>El pin queda como salida y por eso puede encender el LED.</p>',
    detectar: '<h3>Código incompleto</h3><pre><code>void setup() {\n  // Falta decirle al pin qué hace\n}\nvoid loop() {\n  digitalWrite(6, HIGH);\n}</code></pre><p>¿Cómo se le indica al Arduino que el pin 6 va a dar energía?</p>',
    reparar: {
      codigoInicial: 'void setup() {\n  // Falta decirle al pin qué hace\n}\nvoid loop() {\n  digitalWrite(6, HIGH);\n}',
      validar: function (out, code) {
        var errores = [];
        if (!/void\s+setup\s*\(/.test(code)) errores.push('void setup()');
        if (!/void\s+setup\s*\(\s*\)\s*\{[^}]*pinMode\s*\(\s*6\s*,\s*OUTPUT\s*\)/.test(code)) errores.push('pinMode(6, OUTPUT) dentro de setup()');
        if (!/digitalWrite\s*\(\s*6\s*,\s*HIGH\s*\)/.test(code)) errores.push('digitalWrite(6, HIGH)');
        if (errores.length > 0) return { ok: false, exp: 'Faltan corregir: ' + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Entradas y salidas</h3><p>Un pin en <code>INPUT</code> solo escucha; en <code>OUTPUT</code> puede alimentar un componente. Si no llamás a <code>pinMode(6, OUTPUT)</code>, el <code>digitalWrite()</code> no tiene efecto y el LED queda apagado.</p>'
  },
  {
    id: 'm4-03', mundo: 4, titulo: 'El anuncio que no se apaga',
    historia: 'El aviso luminoso del mostrador quedó pegado en encendido. El técnico agregó solo la línea de HIGH y se olvidó de apagarlo.',
    objetivo: 'Apagar el LED del pin 4 con digitalWrite(4, LOW) después de encenderlo.',
    xp: 36,
    pistas: ['digitalWrite(pin, HIGH) enciende y digitalWrite(pin, LOW) apaga.', 'Ahora solo existe la línea que enciende.', 'Agregá digitalWrite(4, LOW); con un delay entre medio.'],
    aprender: '<h3>HIGH y LOW</h3><p><code>digitalWrite(pin, HIGH)</code> manda 5V y <code>digitalWrite(pin, LOW)</code> manda 0V. El pin no recuerda nada: hasta que no le mandes LOW, sigue en HIGH.</p><pre><code>digitalWrite(4, HIGH);\ndelay(500);\ndigitalWrite(4, LOW);</code></pre>',
    ver: '<h3>Correcto</h3><pre><code>pinMode(4, OUTPUT);\ndigitalWrite(4, HIGH);\ndelay(500);\ndigitalWrite(4, LOW);\ndelay(500);</code></pre><p>Enciende, espera medio segundo y apaga.</p>',
    detectar: '<h3>Código con error</h3><pre><code>pinMode(4, OUTPUT);\ndigitalWrite(4, HIGH);\ndelay(500);\n// El anuncio queda prendido para siempre</code></pre><p>¿Qué línea le falta para apagarlo?</p>',
    reparar: {
      codigoInicial: 'pinMode(4, OUTPUT);\ndigitalWrite(4, HIGH);\ndelay(500);\n// El anuncio queda prendido para siempre',
      validar: function (out, code) {
        var errores = [];
        if (!/digitalWrite\s*\(\s*4\s*,\s*HIGH\s*\)/.test(code)) errores.push('digitalWrite(4, HIGH)');
        if (!/digitalWrite\s*\(\s*4\s*,\s*LOW\s*\)/.test(code)) errores.push('digitalWrite(4, LOW)');
        if (!/delay\s*\(\s*\d+\s*\)/.test(code)) errores.push('delay() para ver el cambio');
        if (errores.length > 0) return { ok: false, exp: 'Faltan corregir: ' + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Apagar también es programar</h3><p>El pin conserva su último valor. Si solo mandás HIGH, el LED queda fijo. Para que parpadee hay que alternar <code>HIGH</code> y <code>LOW</code> con pausas <code>delay()</code> en el medio.</p>'
  },
  {
    id: 'm4-04', mundo: 4, titulo: 'Parpadeo del LED 13',
    historia: 'La lámpara de prueba del taller está conectada al LED que trae la propia placa, pero el sketch manda todas las señales al pin 8.',
    objetivo: 'Usar el pin 13 (LED integrado) tanto en pinMode como en digitalWrite.',
    xp: 37,
    pistas: ['El LED soldado en la placa está en el pin 13.', 'pinMode y digitalWrite deben usar el MISMO pin.', 'pinMode(13, OUTPUT); digitalWrite(13, HIGH); digitalWrite(13, LOW);'],
    aprender: '<h3>El pin 13</h3><p>Casi todas las placas Arduino traen un <strong>LED integrado</strong> conectado al pin 13 (muchas veces marcado con la letra "L"). Es ideal para probar el código sin conectar nada afuera.</p>',
    ver: '<h3>Correcto</h3><pre><code>void setup() {\n  pinMode(13, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(300);\n  digitalWrite(13, LOW);\n  delay(300);\n}</code></pre>',
    detectar: '<h3>Código con pin equivocado</h3><pre><code>void setup() {\n  pinMode(8, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(8, HIGH);\n  delay(300);\n  digitalWrite(8, LOW);\n  delay(300);\n}</code></pre><p>El LED de la placa no está en el pin 8... ¿en cuál está?</p>',
    reparar: {
      codigoInicial: 'void setup() {\n  pinMode(8, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(8, HIGH);\n  delay(300);\n  digitalWrite(8, LOW);\n  delay(300);\n}',
      validar: function (out, code) {
        var errores = [];
        if (!/pinMode\s*\(\s*13\s*,\s*OUTPUT\s*\)/.test(code)) errores.push('pinMode(13, OUTPUT)');
        if (!/digitalWrite\s*\(\s*13\s*,\s*HIGH\s*\)/.test(code)) errores.push('digitalWrite(13, HIGH)');
        if (!/digitalWrite\s*\(\s*13\s*,\s*LOW\s*\)/.test(code)) errores.push('digitalWrite(13, LOW)');
        if (/pinMode\s*\(\s*8\s*,/.test(code) || /digitalWrite\s*\(\s*8\s*,/.test(code)) errores.push('sigue usando el pin 8');
        if (errores.length > 0) return { ok: false, exp: 'Faltan corregir: ' + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>El código debe coincidir con el circuito</h3><p>Cada componente ocupa un pin físico. Si el LED integrado está en el 13, el programa tiene que hablar del 13 en TODAS las líneas: pinMode, digitalWrite y hasta en las constantes.</p>'
  },
  {
    id: 'm4-05', mundo: 4, titulo: 'Botón configurado al revés',
    historia: 'El botón de servicio no responde: el técnico dejó su pin como SALIDA y ahora el Arduino empuja voltaje en lugar de escuchar.',
    objetivo: 'Configurar el pin 2 como INPUT y leerlo con digitalRead(2).',
    xp: 38,
    pistas: ['Un botón se LEE, no se alimenta.', 'Las entradas se configuran con pinMode(pin, INPUT).', 'pinMode(2, INPUT); if (digitalRead(2) == HIGH) { ... }'],
    aprender: '<h3>Modo INPUT</h3><p><code>pinMode(2, INPUT)</code> deja el pin 2 listo para escuchar. Después, <code>digitalRead(2)</code> devuelve <code>HIGH</code> (5V) o <code>LOW</code> (0V) según lo que haya en el pin.</p><pre><code>void setup() {\n  pinMode(2, INPUT);\n}\nvoid loop() {\n  if (digitalRead(2) == HIGH) {\n    // botón apretado\n  }\n}</code></pre>',
    ver: '<h3>Correcto</h3><pre><code>void setup() {\n  pinMode(2, INPUT);\n}\nvoid loop() {\n  if (digitalRead(2) == HIGH) {\n    digitalWrite(13, HIGH);\n  }\n}</code></pre>',
    detectar: '<h3>Modo equivocado</h3><pre><code>void setup() {\n  pinMode(2, OUTPUT);\n}\nvoid loop() {\n  if (digitalRead(2) == HIGH) {\n    digitalWrite(13, HIGH);\n  }\n}</code></pre><p>¿Se puede LEER el estado de un pin que está configurado como salida?</p>',
    reparar: {
      codigoInicial: 'void setup() {\n  pinMode(2, OUTPUT);\n}\nvoid loop() {\n  if (digitalRead(2) == HIGH) {\n    digitalWrite(13, HIGH);\n  }\n}',
      validar: function (out, code) {
        var errores = [];
        if (!/pinMode\s*\(\s*2\s*,\s*INPUT\s*\)/.test(code)) errores.push('pinMode(2, INPUT)');
        if (/pinMode\s*\(\s*2\s*,\s*OUTPUT\s*\)/.test(code)) errores.push('el pin 2 sigue como OUTPUT');
        if (!/digitalRead\s*\(\s*2\s*\)/.test(code)) errores.push('digitalRead(2)');
        if (errores.length > 0) return { ok: false, exp: 'Faltan corregir: ' + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>INPUT vs OUTPUT</h3><p>Los pines son de doble uso: <code>OUTPUT</code> para manejar componentes (LED, buzzer) e <code>INPUT</code> para escucharlos (botón, sensor). Configurar mal el modo es uno de los errores más comunes en el taller.</p>'
  },
  {
    id: 'm4-06', mundo: 4, titulo: 'Pin flotando: pull-down',
    historia: 'El LED del indicador titila solo, sin que nadie toque el botón: el pin queda flotando y capta ruido eléctrico del ambiente.',
    objetivo: 'Estabilizar el pin 2 con pinMode(2, INPUT) y un digitalWrite(2, LOW) previo (pull-down).',
    xp: 38,
    pistas: ['Un pin sin resistencia queda "flotando": lee valores aleatorios.', 'digitalWrite(2, LOW) justo después del pinMode fija el estado en reposo.', 'pinMode(2, INPUT); digitalWrite(2, LOW);'],
    aprender: '<h3>Resistencia pull-down</h3><p>La resistencia <strong>pull-down</strong> mantiene el pin en <code>LOW</code> mientras el botón no se toca. En el código se activa con <code>digitalWrite(2, LOW)</code> apenas se declara el pin como <code>INPUT</code>. (Existe también INPUT_PULLUP, que hace lo contrario: mantiene HIGH).</p><pre><code>void setup() {\n  pinMode(2, INPUT);\n  digitalWrite(2, LOW);\n}</code></pre>',
    ver: '<h3>Correcto</h3><pre><code>void setup() {\n  pinMode(2, INPUT);\n  digitalWrite(2, LOW);\n}\nvoid loop() {\n  if (digitalRead(2) == HIGH) {\n    digitalWrite(13, HIGH);\n  } else {\n    digitalWrite(13, LOW);\n  }\n}</code></pre>',
    detectar: '<h3>Pin flotando</h3><pre><code>void setup() {\n  pinMode(2, INPUT);\n}\nvoid loop() {\n  if (digitalRead(2) == HIGH) {\n    digitalWrite(13, HIGH);\n  } else {\n    digitalWrite(13, LOW);\n  }\n}</code></pre><p>¿Cómo se evita que el pin quede flotando cuando el botón no se toca?</p>',
    reparar: {
      codigoInicial: 'void setup() {\n  pinMode(2, INPUT);\n}\nvoid loop() {\n  if (digitalRead(2) == HIGH) {\n    digitalWrite(13, HIGH);\n  } else {\n    digitalWrite(13, LOW);\n  }\n}',
      validar: function (out, code) {
        var errores = [];
        if (!/pinMode\s*\(\s*2\s*,\s*INPUT\s*\)/.test(code)) errores.push('pinMode(2, INPUT)');
        if (!/digitalWrite\s*\(\s*2\s*,\s*LOW\s*\)/.test(code)) errores.push('digitalWrite(2, LOW) del pull-down');
        if (!/if\s*\(\s*digitalRead/.test(code)) errores.push('leer el botón dentro de un if');
        if (errores.length > 0) return { ok: false, exp: 'Faltan corregir: ' + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>¿Por qué titilaba?</h3><p>Un pin de alta impedancia sin resistencia capta interferencias: unas veces lee HIGH y otras LOW. El pull-down lo ancla a LOW en reposo, y solo cambia a HIGH cuando el botón cierra el circuito.</p>'
  },
  {
    id: 'm4-07', mundo: 4, titulo: 'Rango real del conversor',
    historia: 'El técnico programó el sensor como si diera de 0 a 100 y por eso descarta casi todas las lecturas. Hay que corregir el rango.',
    objetivo: 'Corregir la condición para el rango real de analogRead: de 0 a 1023.',
    xp: 39,
    pistas: ['El conversor analógico de Arduino es de 10 bits.', '2 elevado a 10 da 1024 valores: de 0 a 1023.', 'Cambiá el 100 por 1023 en la condición.'],
    aprender: '<h3>El ADC de 10 bits</h3><p><code>analogRead()</code> convierte de 0 a 5V en números de <strong>0 a 1023</strong>. 0 = 0V, 512 ≈ 2,5V y 1023 = 5V. Aprovechá todo ese rango: los valores de 101 a 1023 existen y son importantes.</p><pre><code>int valor = analogRead(A0); // 0 a 1023\nif (valor <= 1023) { /* ok */ }</code></pre>',
    ver: '<h3>Correcto</h3><pre><code>int valor = analogRead(A0);\nif (valor >= 0 && valor <= 1023) {\n  Serial.println(valor);\n}</code></pre><p>Toda lectura del conversor entra en ese rango.</p>',
    detectar: '<h3>Rango incorrecto</h3><pre><code>int valor = analogRead(A0);\nif (valor >= 0 && valor <= 100) {\n  Serial.println(valor);\n}</code></pre><p>¿Cuál es el valor MÁXIMO que puede devolver analogRead?</p>',
    reparar: {
      codigoInicial: 'int valor = analogRead(A0);\nif (valor >= 0 && valor <= 100) {\n  Serial.println(valor);\n}',
      validar: function (out, code) {
        var errores = [];
        if (!/analogRead\s*\(\s*A0\s*\)/.test(code)) errores.push('analogRead(A0)');
        if (!/valor\s*>=\s*0/.test(code)) errores.push('el mínimo es 0');
        if (!/valor\s*<=\s*1023/.test(code)) errores.push('el máximo es 1023');
        if (errores.length > 0) return { ok: false, exp: 'Faltan corregir: ' + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Resolución de 10 bits</h3><p>10 bits significan 2¹⁰ = 1024 escalones: de 0 a 1023. Si limitás a 100, estás tirando a la basura el 90% de la información del sensor.</p>'
  },
  {
    id: 'm4-08', mundo: 4, titulo: 'Potenciómetro mal leído',
    historia: 'La perilla de brillo del equipo está conectada a A0, pero el sketch la lee como si fuera un pin digital y siempre devuelve 0 o 1.',
    objetivo: 'Leer el potenciómetro con analogRead(A0) y mostrarlo por el monitor serie.',
    xp: 40,
    pistas: ['Los pines analógicos de la placa se llaman A0 a A5.', 'digitalRead solo devuelve 0 o 1; para voltajes usá analogRead().', 'int pot = analogRead(A0); Serial.println(pot);'],
    aprender: '<h3>Potenciómetro en A0</h3><p>El potenciómetro es un divisor de voltaje: entrega de 0 a 5V según la posición de la perilla. Su salida se conecta a un pin <strong>analógico (A0)</strong> y se lee con <code>analogRead(A0)</code>: recibirás de 0 a 1023.</p>',
    ver: '<h3>Correcto</h3><pre><code>void setup() {\n  Serial.begin(9600);\n}\nvoid loop() {\n  int pot = analogRead(A0);\n  Serial.println(pot);\n  delay(200);\n}</code></pre>',
    detectar: '<h3>Lectura equivocada</h3><pre><code>void setup() {\n  Serial.begin(9600);\n}\nvoid loop() {\n  int pot = digitalRead(5);\n  Serial.println(pot);\n  delay(200);\n}</code></pre><p>¿Qué función y qué pin hacen falta para leer un voltaje variable?</p>',
    reparar: {
      codigoInicial: 'void setup() {\n  Serial.begin(9600);\n}\nvoid loop() {\n  int pot = digitalRead(5);\n  Serial.println(pot);\n  delay(200);\n}',
      validar: function (out, code) {
        var errores = [];
        if (!/analogRead\s*\(\s*A0\s*\)/.test(code)) errores.push('analogRead(A0)');
        if (/digitalRead\s*\(\s*5\s*\)/.test(code)) errores.push('sigue leyendo el pin digital 5');
        if (!/Serial\.println\s*\(\s*pot\s*\)/.test(code)) errores.push('Serial.println(pot)');
        if (errores.length > 0) return { ok: false, exp: 'Faltan corregir: ' + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Pines analógicos y digitales</h3><p>Los pines digitales solo distinguen HIGH/LOW. Los analógicos (A0-A5) tienen un conversor que mide cualquier voltaje entre 0 y 5V. Un potenciómetro necesita conversión, por eso va a A0 con <code>analogRead()</code>.</p>'
  },
  {
    id: 'm4-09', mundo: 4, titulo: 'Umbral del sensor de luz',
    historia: 'La luz de aviso debe prenderse cuando el taller recibe mucha luz, pero el cuerpo del if está vacío y no hace nada.',
    objetivo: 'Encender el LED del pin 7 con digitalWrite(7, HIGH) cuando la lectura supere 600.',
    xp: 41,
    pistas: ['Guardá la lectura en una variable: int luz = analogRead(A0);', 'La condición ya está escrita: if (luz > 600).', 'Dentro del if va: digitalWrite(7, HIGH);'],
    aprender: '<h3>Umbrales</h3><p>Un <strong>umbral</strong> separa "poco" de "mucho". Acá el umbral es 600: con <code>if (luz > 600)</code> el Arduino solo actúa cuando la lectura lo supera. Es la base de cualquier sensor comparador.</p>',
    ver: '<h3>Correcto</h3><pre><code>int luz = analogRead(A0);\nif (luz > 600) {\n  digitalWrite(7, HIGH);\n}</code></pre><p>Con luz fuerte (mayor a 600) el LED se enciende.</p>',
    detectar: '<h3>Condición vacía</h3><pre><code>int luz = analogRead(A0);\nif (luz > 600) {\n  // ¿y ahora qué hago con el LED?\n}</code></pre><p>¿Qué línea falta dentro del if para prender el LED del pin 7?</p>',
    reparar: {
      codigoInicial: 'int luz = analogRead(A0);\nif (luz > 600) {\n  // ¿y ahora qué hago con el LED?\n}',
      validar: function (out, code) {
        var errores = [];
        if (!/analogRead\s*\(\s*A0\s*\)/.test(code)) errores.push('analogRead(A0)');
        if (!/if\s*\(\s*luz\s*>\s*600\s*\)/.test(code)) errores.push('la condición if (luz > 600)');
        if (!/digitalWrite\s*\(\s*7\s*,\s*HIGH\s*\)/.test(code)) errores.push('digitalWrite(7, HIGH)');
        if (errores.length > 0) return { ok: false, exp: 'Faltan corregir: ' + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Entrada, condición y salida</h3><p>El patrón completo es: leer el sensor, comparar con el umbral y activar la salida. Acá faltaba el último paso: el <code>digitalWrite(7, HIGH)</code> dentro del <code>if</code>.</p>'
  },
  {
    id: 'm4-10', mundo: 4, titulo: 'Falta la rama else',
    historia: 'El LED se enciende con mucha luz, pero cuando vuelve a oscurecer sigue prendido: nadie programó qué hacer en el caso contrario.',
    objetivo: 'Agregar un else que apague el LED con digitalWrite(7, LOW).',
    xp: 41,
    pistas: ['if atiende el caso verdadero y else atiende el falso.', 'Sin else, si la condición no se cumple no se hace NADA y el pin conserva el estado.', 'else { digitalWrite(7, LOW); }'],
    aprender: '<h3>if / else</h3><p><code>if</code> corre cuando la condición se cumple y <code>else</code> cuando no. Con las dos ramas, todo sensor deja el sistema en un estado definido y nada queda colgado en el último valor.</p><pre><code>if (luz > 600) {\n  digitalWrite(7, HIGH);\n} else {\n  digitalWrite(7, LOW);\n}</code></pre>',
    ver: '<h3>Correcto</h3><pre><code>int luz = analogRead(A0);\nif (luz > 600) {\n  digitalWrite(7, HIGH);\n} else {\n  digitalWrite(7, LOW);\n}</code></pre>',
    detectar: '<h3>Sin rama contraria</h3><pre><code>int luz = analogRead(A0);\nif (luz > 600) {\n  digitalWrite(7, HIGH);\n}\n// Con poca luz el LED queda encendido</code></pre><p>¿Qué estructura se encarga del caso contrario?</p>',
    reparar: {
      codigoInicial: 'int luz = analogRead(A0);\nif (luz > 600) {\n  digitalWrite(7, HIGH);\n}\n// Con poca luz el LED queda encendido',
      validar: function (out, code) {
        var errores = [];
        if (!/if\s*\(\s*luz\s*>\s*600\s*\)/.test(code)) errores.push('la condición if (luz > 600)');
        if (!/else\s*\{/.test(code)) errores.push('la rama else');
        if (!/digitalWrite\s*\(\s*7\s*,\s*LOW\s*\)/.test(code)) errores.push('digitalWrite(7, LOW) dentro del else');
        if (errores.length > 0) return { ok: false, exp: 'Faltan corregir: ' + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Estado completo</h3><p>Si no hay <code>else</code>, cuando la luz baja el programa no ejecuta ninguna línea y el pin 7 sigue en HIGH. Con el <code>else</code> se apaga correctamente y el sistema queda equilibrado.</p>'
  },
  {
    id: 'm4-11', mundo: 4, titulo: 'Destello invisible',
    historia: 'El LED del panel parpadea tan rápido que parece encendido fijo: el loop del técnico no espera nunca.',
    objetivo: 'Usar delay(500) para que el LED dure medio segundo encendido y medio apagado.',
    xp: 42,
    pistas: ['delay() recibe los MILISEGUNDOS como parámetro.', 'delay(500) espera medio segundo.', 'Poné un delay(500) después de cada digitalWrite.'],
    aprender: '<h3>delay(ms)</h3><p><code>delay(500)</code> FREEZA el programa durante 500 milisegundos (1000 ms = 1 s). Sin esperas, el loop gira miles de veces por segundo y el ojo humano no llega a percibir el cambio: el LED parece siempre encendido.</p>',
    ver: '<h3>Correcto</h3><pre><code>void loop() {\n  digitalWrite(13, HIGH);\n  delay(500);\n  digitalWrite(13, LOW);\n  delay(500);\n}</code></pre><p>Ciclo: medio segundo prendido, medio segundo apagado.</p>',
    detectar: '<h3>Sin esperas</h3><pre><code>void loop() {\n  digitalWrite(13, HIGH);\n  digitalWrite(13, LOW);\n}</code></pre><p>Si el loop no espera ni un milisegundo, ¿llegamos a ver el destello?</p>',
    reparar: {
      codigoInicial: 'void loop() {\n  digitalWrite(13, HIGH);\n  digitalWrite(13, LOW);\n}',
      validar: function (out, code) {
        var errores = [];
        var esperas = (code.match(/delay\s*\(/g) || []).length;
        if (esperas < 2) errores.push('dos delay(500)');
        if (!/digitalWrite\s*\(\s*13\s*,\s*HIGH\s*\)/.test(code)) errores.push('digitalWrite(13, HIGH)');
        if (!/digitalWrite\s*\(\s*13\s*,\s*LOW\s*\)/.test(code)) errores.push('digitalWrite(13, LOW)');
        if (errores.length > 0) return { ok: false, exp: 'Faltan corregir: ' + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>El tiempo también se programa</h3><p>Un microcontrolador es muchísimo más rápido que el ojo. Cada acción visible necesita una pausa: <code>delay()</code> sostiene el estado el tiempo suficiente para que lo veamos.</p>'
  },
  {
    id: 'm4-12', mundo: 4, titulo: 'Parpadeo repetido con for',
    historia: 'Al activar la alarma hay que hacer destellar el LED 5 veces. El técnico copió y pegó el mismo bloque 5 veces y ya es un desastre para mantener.',
    objetivo: 'Repetir el parpadeo 5 veces con un bucle for.',
    xp: 43,
    pistas: ['for (int i = 0; i < 5; i++) { ... } repite el bloque 5 veces.', 'Todo el parpadeo (HIGH, delay, LOW, delay) va DENTRO del for.', 'El contador i arranca en 0 y avanza con i++.'],
    aprender: '<h3>Bucle for</h3><p><code>for (int i = 0; i &lt; 5; i++)</code> se lee así: arrancá en 0, seguí mientras i sea menor que 5, y sumá 1 cada vuelta. Es la forma corta de repetir algo N veces sin duplicar código.</p><pre><code>for (int i = 0; i &lt; 5; i++) {\n  // esto se repite 5 veces\n}</code></pre>',
    ver: '<h3>Correcto</h3><pre><code>for (int i = 0; i < 5; i++) {\n  digitalWrite(13, HIGH);\n  delay(200);\n  digitalWrite(13, LOW);\n  delay(200);\n}</code></pre><p>Un solo bloque produce 5 destellos.</p>',
    detectar: '<h3>Código duplicado a mano</h3><pre><code>digitalWrite(13, HIGH);\ndelay(200);\ndigitalWrite(13, LOW);\ndelay(200);\n// Hay que repetirlo 5 veces sin copiar y pegar</code></pre><p>¿Qué estructura repite un bloque varias veces?</p>',
    reparar: {
      codigoInicial: 'digitalWrite(13, HIGH);\ndelay(200);\ndigitalWrite(13, LOW);\ndelay(200);\n// Hay que repetirlo 5 veces sin copiar y pegar',
      validar: function (out, code) {
        var errores = [];
        if (!/for\s*\(/.test(code)) errores.push('el bucle for');
        if (!/i\s*<\s*5/.test(code)) errores.push('la condición i < 5');
        if (!/i\+\+/.test(code) && !/\bi\s*\+=\s*1/.test(code)) errores.push('el incremento i++');
        if (!/digitalWrite\s*\(\s*13\s*,\s*HIGH\s*\)/.test(code)) errores.push('el parpadeo dentro del bucle');
        if (errores.length > 0) return { ok: false, exp: 'Faltan corregir: ' + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>No repitas código</h3><p>Si cambiás la cantidad de destellos, con bloques copiados tenés que editar 5 lugares. Con un <code>for</code> solo cambiás el número de la condición: de 5 a 10 y listo.</p>'
  },
  {
    id: 'm4-13', mundo: 4, titulo: 'Espera con while',
    historia: 'La máquina de reparación debe quedarse quieta hasta que se apriete el botón de servicio (pin 2), pero el programa sigue de largo y arranca sola.',
    objetivo: 'Usar while para esperar a que el botón del pin 2 cambie de estado antes de continuar.',
    xp: 43,
    pistas: ['while repite MIENTRAS la condición sea verdadera.', 'while (digitalRead(2) == LOW) { delay(10); } espera a que se presione.', 'No olvides un delay() dentro para no trabar la placa.'],
    aprender: '<h3>Bucle while</h3><p><code>while (condición)</code> repite el bloque mientras la condición siga cumpliéndose. Sirve para esperar a que pase algo. Ojo: si la condición nunca cambia, el programa queda trabado para siempre; por eso se suele meter un <code>delay()</code> adentro.</p><pre><code>while (digitalRead(2) == LOW) {\n  delay(10);\n}</code></pre>',
    ver: '<h3>Correcto</h3><pre><code>while (digitalRead(2) == LOW) {\n  delay(10);\n}\ndigitalWrite(13, HIGH); // recién ahí seguimos</code></pre><p>El programa espera hasta que el botón cambie.</p>',
    detectar: '<h3>Sin espera</h3><pre><code>// Faltaba esperar al botón\ndigitalRead(2);\ndigitalWrite(13, HIGH); // arranca sin esperar</code></pre><p>digitalRead solo lee una vez... ¿cómo se hace para ESPERAR hasta que el botón cambie?</p>',
    reparar: {
      codigoInicial: '// Faltaba esperar al botón\ndigitalRead(2);\ndigitalWrite(13, HIGH); // arranca sin esperar',
      validar: function (out, code) {
        var errores = [];
        if (!/while\s*\(/.test(code)) errores.push('el bucle while');
        if (!/while\s*\(\s*digitalRead\s*\(\s*2\s*\)/.test(code)) errores.push('la condición digitalRead(2)');
        if (!/delay\s*\(/.test(code)) errores.push('delay() dentro del while');
        if (errores.length > 0) return { ok: false, exp: 'Faltan corregir: ' + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>while: esperar sin trabarse</h3><p>El <code>while</code> mantiene el programa dentro del bucle hasta que la condición se vuelva falsa. El <code>delay(10)</code> libera un poco la CPU y evita una lluvia de lecturas continuas.</p>'
  },
  {
    id: 'm4-14', mundo: 4, titulo: 'Escalar el valor con map',
    historia: 'El brillo del LED debe seguir la perilla, pero se mandó la lectura cruda de 0-1023 a analogWrite, que solo entiende de 0 a 255.',
    objetivo: 'Convertir la lectura a 0-255 con map(valor, 0, 1023, 0, 255).',
    xp: 44,
    pistas: ['analogWrite solo acepta valores de 0 a 255.', 'map(valor, 0, 1023, 0, 255) reescala de un rango a otro.', 'int brillo = map(valor, 0, 1023, 0, 255); analogWrite(9, brillo);'],
    aprender: '<h3>map()</h3><p><code>map(valor, desdeMin, desdeMax, haciaMin, haciaMax)</code> pasa un número de un rango a otro. Acá convierte los 0-1023 del conversor analógico en los 0-255 que necesita el PWM.</p><pre><code>int brillo = map(valor, 0, 1023, 0, 255);</code></pre>',
    ver: '<h3>Correcto</h3><pre><code>int valor = analogRead(A0);\nint brillo = map(valor, 0, 1023, 0, 255);\nanalogWrite(9, brillo);</code></pre><p>La perilla ahora controla el brillo completo.</p>',
    detectar: '<h3>Valor sin escalar</h3><pre><code>int valor = analogRead(A0);\nanalogWrite(9, valor);</code></pre><p>analogWrite solo acepta hasta 255. ¿Cómo llevamos de 0-1023 a 0-255?</p>',
    reparar: {
      codigoInicial: 'int valor = analogRead(A0);\nanalogWrite(9, valor);',
      validar: function (out, code) {
        var errores = [];
        if (!/map\s*\(\s*valor\s*,\s*0\s*,\s*1023\s*,\s*0\s*,\s*255\s*\)/.test(code)) errores.push('map(valor, 0, 1023, 0, 255)');
        if (/analogWrite\s*\(\s*9\s*,\s*valor\s*\)/.test(code)) errores.push('sigue pasando el valor crudo a analogWrite');
        if (!/analogWrite\s*\(\s*9\s*,/.test(code)) errores.push('analogWrite(9, ...)');
        if (errores.length > 0) return { ok: false, exp: 'Faltan corregir: ' + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Convertir rangos</h3><p>Cada componente tiene su escala: el conversor trabaja en 0-1023 y el PWM en 0-255. <code>map()</code> hace la traducción automática: 0 da 0, 1023 da 255 y todo lo demás queda proporcional.</p>'
  },
  {
    id: 'm4-15', mundo: 4, titulo: 'Brillo con PWM en pin 9',
    historia: 'La luz de lectura debe quedar al 50% de brillo, pero el técnico usó digitalWrite y solo puede estar al 100% o apagada.',
    objetivo: 'Usar analogWrite(9, 128) para dejar el LED a media luz.',
    xp: 45,
    pistas: ['digitalWrite solo da 0V o 5V: apagado o máximo.', 'analogWrite(pin, valor) controla el ciclo de trabajo (PWM).', 'analogWrite(9, 128); deja aproximadamente el 50%.'],
    aprender: '<h3>PWM y ciclo de trabajo</h3><p><code>analogWrite(pin, valor)</code> enciende y apaga el pin tan rápido que parece un voltaje intermedio: eso es el <strong>ciclo de trabajo</strong>. 0 = apagado, 255 = máximo, 128 ≈ 50%. En la UNO, los pines marcados con "~" (9, 10 y 11) lo soportan.</p>',
    ver: '<h3>Correcto</h3><pre><code>void setup() {\n  pinMode(9, OUTPUT);\n}\nvoid loop() {\n  analogWrite(9, 128);\n}</code></pre><p>El LED queda a media luz.</p>',
    detectar: '<h3>Digital donde hacía falta analógico</h3><pre><code>void setup() {\n  pinMode(9, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(9, HIGH);\n}</code></pre><p>digitalWrite no puede dejar el LED a media luz. ¿Qué función maneja el brillo?</p>',
    reparar: {
      codigoInicial: 'void setup() {\n  pinMode(9, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(9, HIGH);\n}',
      validar: function (out, code) {
        var errores = [];
        if (!/analogWrite\s*\(\s*9\s*,\s*128\s*\)/.test(code)) errores.push('analogWrite(9, 128)');
        if (/digitalWrite\s*\(\s*9\s*,\s*HIGH\s*\)/.test(code)) errores.push('sigue usando digitalWrite(9, HIGH)');
        if (!/pinMode\s*\(\s*9\s*,\s*OUTPUT\s*\)/.test(code)) errores.push('pinMode(9, OUTPUT)');
        if (errores.length > 0) return { ok: false, exp: 'Faltan corregir: ' + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Valores intermedios</h3><p>El pin digital solo tiene dos estados. El PWM simula valores intermedios pulsando muy rápido: con 128 el LED está encendido la mitad del tiempo y parece tener la mitad del brillo.</p>'
  },
  {
    id: 'm4-16', mundo: 4, titulo: 'Tono real del buzzer',
    historia: 'El buzzer debe emitir la nota La (440 Hz) al abrir la tienda, pero con digitalWrite solo hace un chasquido seco.',
    objetivo: 'Generar el sonido con tone(8, 440).',
    xp: 45,
    pistas: ['digitalWrite solo genera un pinchazo, no una frecuencia.', 'tone(pin, frecuencia) crea una onda cuadrada.', 'tone(8, 440, 300); suena 300 ms a 440 Hz.'],
    aprender: '<h3>tone()</h3><p><code>tone(pin, frecuencia)</code> genera una onda cuadrada en el pin: 440 Hz es la nota La del piano. Se puede pasar un tercer parámetro con la duración en milisegundos. El pin puede ser cualquier digital, no necesita ser PWM.</p><pre><code>tone(8, 440, 300); // La durante 300 ms</code></pre>',
    ver: '<h3>Correcto</h3><pre><code>void setup() {\n  pinMode(8, OUTPUT);\n}\nvoid loop() {\n  tone(8, 440, 300);\n  delay(500);\n}</code></pre>',
    detectar: '<h3>Pinchazo en vez de tono</h3><pre><code>void setup() {\n  pinMode(8, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(8, HIGH);\n  delay(10);\n  digitalWrite(8, LOW);\n}</code></pre><p>¿Qué función produce una frecuencia (un tono) en vez de un pinchazo?</p>',
    reparar: {
      codigoInicial: 'void setup() {\n  pinMode(8, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(8, HIGH);\n  delay(10);\n  digitalWrite(8, LOW);\n}',
      validar: function (out, code) {
        var errores = [];
        if (!/tone\s*\(\s*8\s*,\s*440/.test(code)) errores.push('tone(8, 440)');
        if (/digitalWrite\s*\(\s*8\s*,\s*HIGH\s*\)/.test(code)) errores.push('sigue usando digitalWrite en el buzzer');
        if (!/pinMode\s*\(\s*8\s*,\s*OUTPUT\s*\)/.test(code)) errores.push('pinMode(8, OUTPUT)');
        if (errores.length > 0) return { ok: false, exp: 'Faltan corregir: ' + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Frecuencia = sonido</h3><p>Un buzzer activo solo hace bip con HIGH/LOW. Con <code>tone()</code> la placa genera la oscilación exacta: 440 Hz, 880 Hz (octava arriba), etc. Es la diferencia entre un ruido y una nota musical.</p>'
  },
  {
    id: 'm4-17', mundo: 4, titulo: 'Buzzer que no se calla',
    historia: 'Después del arranque de la tienda el buzzer quedó sonando sin parar: el técnico llamó a tone() pero nunca lo cortó.',
    objetivo: 'Detener el sonido con noTone(8) después de la pausa.',
    xp: 46,
    pistas: ['tone() sigue sonando hasta que lo cortes.', 'noTone(pin) detiene el tono.', 'Agregá noTone(8); después del delay.'],
    aprender: '<h3>noTone()</h3><p><code>tone()</code> inicia un sonido que continúa hasta que llamás a <code>noTone(pin)</code>. Si no hay tono activo, también podés cortar con <code>digitalWrite(pin, LOW)</code>. Toda acción que empieza necesita su apagado.</p><pre><code>tone(8, 880);\ndelay(300);\nnoTone(8);</code></pre>',
    ver: '<h3>Correcto</h3><pre><code>tone(8, 880);\ndelay(300);\nnoTone(8);\ndelay(300);</code></pre><p>Suena 300 ms, después silencio 300 ms.</p>',
    detectar: '<h3>Tono sin cortar</h3><pre><code>tone(8, 880);\ndelay(300);\n// El sonido nunca se corta</code></pre><p>¿Qué función detiene el tono que empezó tone()?</p>',
    reparar: {
      codigoInicial: 'tone(8, 880);\ndelay(300);\n// El sonido nunca se corta',
      validar: function (out, code) {
        var errores = [];
        if (!/tone\s*\(\s*8\s*,\s*880/.test(code)) errores.push('tone(8, 880)');
        if (!/noTone\s*\(\s*8\s*\)/.test(code) && !/digitalWrite\s*\(\s*8\s*,\s*LOW\s*\)/.test(code)) errores.push('noTone(8) para cortar el sonido');
        if (!/delay\s*\(/.test(code)) errores.push('delay() para escuchar el tono');
        if (errores.length > 0) return { ok: false, exp: 'Faltan corregir: ' + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Encender y apagar sonido</h3><p>El tono es un estado que persiste. <code>noTone(8)</code> lo detiene al instante. Un buen programa equilibra cada prendé con su apagá, ya sea un LED, un relevé o un buzzer.</p>'
  },
  {
    id: 'm4-18', mundo: 4, titulo: 'Semáforo de dos luces',
    historia: 'El mini semáforo del taller debe mostrar ROJO (pin 12) si el botón está apretado y VERDE (pin 11) si no. Hoy solo prende el rojo y nunca cambia.',
    objetivo: 'Completar el if/else para que las dos luces se alternen según el botón (pin 2).',
    xp: 47,
    pistas: ['Hay dos salidas: 12 (rojo) y 11 (verde).', 'En CADA rama hay que dejar las dos luces en su estado.', 'if (digitalRead(2) == HIGH) { digitalWrite(12, HIGH); digitalWrite(11, LOW); } else { digitalWrite(12, LOW); digitalWrite(11, HIGH); }'],
    aprender: '<h3>Dos salidas, un estado por rama</h3><p>Con dos actuadores, cada rama del <code>if</code> debe dejar un estado COMPLETO: si prendo uno, apago el otro. Así nunca se encienden las dos luces juntas y el sistema queda siempre definido.</p>',
    ver: '<h3>Correcto</h3><pre><code>pinMode(12, OUTPUT);\npinMode(11, OUTPUT);\npinMode(2, INPUT);\nif (digitalRead(2) == HIGH) {\n  digitalWrite(12, HIGH);\n  digitalWrite(11, LOW);\n} else {\n  digitalWrite(12, LOW);\n  digitalWrite(11, HIGH);\n}</code></pre>',
    detectar: '<h3>Solo el rojo</h3><pre><code>pinMode(12, OUTPUT);\npinMode(11, OUTPUT);\npinMode(2, INPUT);\nif (digitalRead(2) == HIGH) {\n  digitalWrite(12, HIGH);\n}\n// El verde nunca se enciende</code></pre><p>En el if solo se prende el rojo... ¿qué pasa con el verde y con el caso contrario?</p>',
    reparar: {
      codigoInicial: 'pinMode(12, OUTPUT);\npinMode(11, OUTPUT);\npinMode(2, INPUT);\nif (digitalRead(2) == HIGH) {\n  digitalWrite(12, HIGH);\n}\n// El verde nunca se enciende',
      validar: function (out, code) {
        var errores = [];
        if (!/digitalWrite\s*\(\s*12\s*,\s*HIGH\s*\)/.test(code)) errores.push('rojo (12) encendido en el if');
        if (!/digitalWrite\s*\(\s*11\s*,\s*LOW\s*\)/.test(code)) errores.push('verde (11) apagado en el if');
        if (!/else\s*\{/.test(code)) errores.push('la rama else');
        if (!/digitalWrite\s*\(\s*12\s*,\s*LOW\s*\)/.test(code)) errores.push('rojo (12) apagado en el else');
        if (!/digitalWrite\s*\(\s*11\s*,\s*HIGH\s*\)/.test(code)) errores.push('verde (11) encendido en el else');
        if (errores.length > 0) return { ok: false, exp: 'Faltan corregir: ' + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Mutuamente excluyentes</h3><p>En un semáforo rojo y verde no pueden estar juntos. Por eso cada rama toca las DOS salidas: prende la que corresponde y apaga la otra. Si solo tocás una, la otra se queda con el valor anterior.</p>'
  },
  {
    id: 'm4-19', mundo: 4, titulo: 'Promedio de lecturas',
    historia: 'El sensor de luminosidad del depósito da saltos y el LED se agita. Hay que promediar 5 lecturas para que el valor sea estable.',
    objetivo: 'Sumar 5 lecturas de A0 dentro de un for y dividir el total por 5.',
    xp: 47,
    pistas: ['Empezá con int suma = 0; y acumulá adentro del bucle.', 'suma = suma + analogRead(A0); suma en cada vuelta.', 'Al final: int promedio = suma / 5;'],
    aprender: '<h3>Promediar para quitar ruido</h3><p>Los sensores tienen ruido eléctrico. Leer varias veces y dividir (<code>suma / cantidad</code>) da un valor mucho más estable. Es la técnica más usada en electrónica para domesticar un sensor inquieto.</p><pre><code>int suma = 0;\nfor (int i = 0; i < 5; i++) {\n  suma = suma + analogRead(A0);\n}\nint promedio = suma / 5;</code></pre>',
    ver: '<h3>Correcto</h3><pre><code>int suma = 0;\nfor (int i = 0; i < 5; i++) {\n  suma = suma + analogRead(A0);\n  delay(10);\n}\nint promedio = suma / 5;\nSerial.println(promedio);</code></pre>',
    detectar: '<h3>Sin acumular</h3><pre><code>int suma = 0;\nfor (int i = 0; i < 5; i++) {\n  suma = analogRead(A0);\n}\nint promedio = suma;\nSerial.println(promedio);</code></pre><p>Si cada vuelta SOBRESCRIBE la variable, ¿dónde quedó la suma de las lecturas?</p>',
    reparar: {
      codigoInicial: 'int suma = 0;\nfor (int i = 0; i < 5; i++) {\n  suma = analogRead(A0);\n}\nint promedio = suma;\nSerial.println(promedio);',
      validar: function (out, code) {
        var errores = [];
        if (!/suma\s*=\s*suma\s*\+\s*analogRead/.test(code)) errores.push('suma = suma + analogRead(A0)');
        if (!/int\s+promedio\s*=\s*suma\s*\/\s*5/.test(code)) errores.push('int promedio = suma / 5;');
        if (!/for\s*\(/.test(code)) errores.push('el bucle for de 5 lecturas');
        if (errores.length > 0) return { ok: false, exp: 'Faltan corregir: ' + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Acumuladores</h3><p><code>suma = suma + analogRead(A0)</code> guarda el total sumando de a poco. Sin eso, cada vuelta pisa el valor anterior y al final solo tenés la última lectura. Después, dividir por 5 devuelve el promedio.</p>'
  },
  {
    id: 'm4-20', mundo: 4, titulo: 'Pines fijos con const',
    historia: 'El técnico cambió el número del pin del LED en seis lugares del programa y ahora el código ya no coincide con el circuito.',
    objetivo: 'Declarar const int LED = 13; y reemplazar todos los 13 por LED.',
    xp: 48,
    pistas: ['const int nombre = valor; crea una constante que no cambia.', 'Declarala antes de setup(), en el ámbito global.', 'const int LED = 13; y después pinMode(LED, OUTPUT);'],
    aprender: '<h3>const int</h3><p><code>const int LED = 13;</code> guarda un valor FIJO para todo el programa. La gran ventaja: si el LED se muda al pin 10, cambiás UNA sola línea y todo el resto del código se actualiza solo.</p><pre><code>const int LED = 13;\nvoid setup() {\n  pinMode(LED, OUTPUT);\n}</code></pre>',
    ver: '<h3>Correcto</h3><pre><code>const int LED = 13;\n\nvoid setup() {\n  pinMode(LED, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED, HIGH);\n  delay(300);\n  digitalWrite(LED, LOW);\n  delay(300);\n}</code></pre>',
    detectar: '<h3>Números repetidos</h3><pre><code>void setup() {\n  pinMode(13, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(300);\n  digitalWrite(13, LOW);\n  delay(300);\n}</code></pre><p>¿Cómo evitar repetir el 13 por todos lados del programa?</p>',
    reparar: {
      codigoInicial: 'void setup() {\n  pinMode(13, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(300);\n  digitalWrite(13, LOW);\n  delay(300);\n}',
      validar: function (out, code) {
        var errores = [];
        if (!/const\s+int\s+LED\s*=\s*13\s*;/.test(code)) errores.push('const int LED = 13;');
        if (!/pinMode\s*\(\s*LED\s*,\s*OUTPUT\s*\)/.test(code)) errores.push('pinMode(LED, OUTPUT)');
        if (!/digitalWrite\s*\(\s*LED\s*,\s*HIGH\s*\)/.test(code)) errores.push('digitalWrite(LED, HIGH)');
        if (!/digitalWrite\s*\(\s*LED\s*,\s*LOW\s*\)/.test(code)) errores.push('digitalWrite(LED, LOW)');
        if (errores.length > 0) return { ok: false, exp: 'Faltan corregir: ' + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Constantes con nombre</h3><p>Un número mágico repetido por todos lados es una bomba de tiempo. Con <code>const int</code> el código se lee mejor (LED en vez de 13) y el mantenimiento pasa a ser de un solo lugar.</p>'
  },
  {
    id: 'm4-21', mundo: 4, titulo: 'LCD sin inicializar',
    historia: 'La pantalla del taller no muestra nada. El objeto LCD existe pero nunca se creó con sus pines ni se inició en el setup.',
    objetivo: 'Crear LiquidCrystal lcd(12, 11, 5, 4, 3, 2); y llamar a lcd.begin(16, 2); dentro de setup().',
    xp: 49,
    pistas: ['El objeto se crea con LiquidCrystal lcd(rs, enable, d4, d5, d6, d7).', 'Los pines del taller son 12, 11, 5, 4, 3, 2.', 'lcd.begin(16, 2); inicializa 16 columnas y 2 filas.'],
    aprender: '<h3>LiquidCrystal</h3><p>La librería <code>LiquidCrystal</code> controla pantallas de 16x2. Primero se crea el objeto indicando los 6 pines (RS, E, D4, D5, D6, D7) y luego se inicializa con <code>lcd.begin(columnas, filas)</code> dentro de <code>setup()</code>. Sin ese begin, la pantalla no arranca.</p><pre><code>#include &lt;LiquidCrystal.h&gt;\nLiquidCrystal lcd(12, 11, 5, 4, 3, 2);\nvoid setup() {\n  lcd.begin(16, 2);\n}</code></pre>',
    ver: '<h3>Correcto</h3><pre><code>#include &lt;LiquidCrystal.h&gt;\nLiquidCrystal lcd(12, 11, 5, 4, 3, 2);\n\nvoid setup() {\n  lcd.begin(16, 2);\n}\n\nvoid loop() {\n  lcd.print("Hola");\n}</code></pre>',
    detectar: '<h3>Pantalla sin configurar</h3><pre><code>#include &lt;LiquidCrystal.h&gt;\nLiquidCrystal pantalla;\nvoid setup() {\n  // La pantalla no muestra nada\n}\nvoid loop() {\n  pantalla.print("Hola");\n}</code></pre><p>¿Qué dos líneas hacen falta: con qué pines está conectada y cómo se inicia?</p>',
    reparar: {
      codigoInicial: '#include <LiquidCrystal.h>\nLiquidCrystal pantalla;\nvoid setup() {\n  // La pantalla no muestra nada\n}\nvoid loop() {\n  pantalla.print("Hola");\n}',
      validar: function (out, code) {
        var errores = [];
        if (!/LiquidCrystal\s+lcd\s*\(\s*12\s*,\s*11\s*,\s*5\s*,\s*4\s*,\s*3\s*,\s*2\s*\)/.test(code)) errores.push('LiquidCrystal lcd(12, 11, 5, 4, 3, 2)');
        if (!/lcd\.begin\s*\(\s*16\s*,\s*2\s*\)/.test(code)) errores.push('lcd.begin(16, 2)');
        if (!/lcd\.print\s*\(/.test(code)) errores.push('lcd.print(...) usando el objeto lcd');
        if (errores.length > 0) return { ok: false, exp: 'Faltan corregir: ' + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Crear e inicializar</h3><p>Hay dos pasos distintos: <strong>crear el objeto</strong> con sus pines (dice cómo está cableado) y <strong>iniciarlo</strong> con <code>begin()</code> (enciende el controlador). Si falta cualquiera de los dos, el LCD no muestra nada.</p>'
  },
  {
    id: 'm4-22', mundo: 4, titulo: 'El valor que no aparece',
    historia: 'El LCD dice "Luz:" pero el número del sensor nunca aparece al lado. El técnico imprimió el texto y se olvidó del valor.',
    objetivo: 'Mostrar la variable con lcd.print(valor) después del texto.',
    xp: 49,
    pistas: ['lcd.print() escribe en la posición actual del cursor.', 'Primero va el texto y después la variable, en dos print seguidos.', 'lcd.print("Luz: "); lcd.print(valor);'],
    aprender: '<h3>lcd.print()</h3><p><code>lcd.print("texto")</code> escribe un texto y <code>lcd.print(valor)</code> escribe un número. El cursor avanza solo, así que dos print seguidos quedan uno al lado del otro sin necesidad de posicionar nada.</p><pre><code>lcd.print("Luz: ");\nlcd.print(valor);</code></pre>',
    ver: '<h3>Correcto</h3><pre><code>int valor = analogRead(A0);\nlcd.setCursor(0, 0);\nlcd.print("Luz: ");\nlcd.print(valor);</code></pre><p>Se muestra por ejemplo "Luz: 712".</p>',
    detectar: '<h3>Solo el texto</h3><pre><code>int valor = analogRead(A0);\nlcd.setCursor(0, 0);\nlcd.print("Luz: ");\n// El número nunca aparece</code></pre><p>¿Cómo se escribe una VARIABLE en la pantalla?</p>',
    reparar: {
      codigoInicial: 'int valor = analogRead(A0);\nlcd.setCursor(0, 0);\nlcd.print("Luz: ");\n// El número nunca aparece',
      validar: function (out, code) {
        var errores = [];
        if (!/lcd\.print\s*\(\s*"Luz: "\s*\)/.test(code)) errores.push('lcd.print("Luz: ")');
        if (!/lcd\.print\s*\(\s*valor\s*\)/.test(code)) errores.push('lcd.print(valor)');
        if (!/analogRead\s*\(\s*A0\s*\)/.test(code)) errores.push('analogRead(A0)');
        if (errores.length > 0) return { ok: false, exp: 'Faltan corregir: ' + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Texto y números</h3><p><code>lcd.print()</code> acepta tanto cadenas como variables: convierte el número a texto y lo escribe donde quedó el cursor. Por eso se usan dos llamadas seguidas: una para la etiqueta y otra para el valor.</p>'
  },
  {
    id: 'm4-23', mundo: 4, titulo: 'Servo sin attach',
    historia: 'El servomotor del cajón no se mueve: el código le pide 90 grados pero nunca le dijo en qué pin está conectado.',
    objetivo: 'Llamar a servo.attach(9) en setup() antes de servo.write(90).',
    xp: 50,
    pistas: ['Antes de moverlo hay que vincularlo a su pin: attach(pin).', 'attach() se llama dentro de setup().', 'Servo servo; en el ámbito global y servo.attach(9); en setup().'],
    aprender: '<h3>Librería Servo</h3><p>Pasos: 1) <code>#include &lt;Servo.h&gt;</code>, 2) <code>Servo servo;</code> crea el objeto, 3) <code>servo.attach(9)</code> lo vincula al pin, 4) <code>servo.write(ángulo)</code> lo mueve de 0 a 180 grados.</p>',
    ver: '<h3>Correcto</h3><pre><code>#include &lt;Servo.h&gt;\nServo servo;\n\nvoid setup() {\n  servo.attach(9);\n  servo.write(90);\n}\n\nvoid loop() {\n}</code></pre>',
    detectar: '<h3>Sin attach</h3><pre><code>#include &lt;Servo.h&gt;\nServo servo;\n\nvoid setup() {\n  servo.write(90);\n}\n\nvoid loop() {\n}</code></pre><p>¿Qué línea le falta al setup para que el servo sepa en qué pin está?</p>',
    reparar: {
      codigoInicial: '#include <Servo.h>\nServo servo;\n\nvoid setup() {\n  servo.write(90);\n}\n\nvoid loop() {\n}',
      validar: function (out, code) {
        var errores = [];
        if (!/Servo\s+servo\s*;/.test(code)) errores.push('Servo servo;');
        if (!/servo\.attach\s*\(\s*9\s*\)/.test(code)) errores.push('servo.attach(9) en setup()');
        if (!/servo\.write\s*\(\s*90\s*\)/.test(code)) errores.push('servo.write(90)');
        if (errores.length > 0) return { ok: false, exp: 'Faltan corregir: ' + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Vincular antes de mover</h3><p><code>attach()</code> le dice a la librería en qué pin trabaja y qué pulso controla. Sin eso, <code>write()</code> no tiene dónde mandar la señal y el servomotor no se mueve.</p>'
  },
  {
    id: 'm4-24', mundo: 4, titulo: 'Distancia del ultrasónico',
    historia: 'El sensor HC-SR04 del taller mide bien pero muestra "5800 cm" en pantalla: está mostrando microsegundos crudos.',
    objetivo: 'Convertir la duración a centímetros con distancia = duracion / 58.',
    xp: 51,
    pistas: ['pulseIn devuelve MICROSEGUNDOS, no centímetros.', 'El sonido tarda 58 microsegundos en recorrer 1 cm de ida y vuelta.', 'int distancia = duracion / 58;'],
    aprender: '<h3>HC-SR04</h3><p>Mandás un pulso de 10 µs por <code>TRIG</code> y medís con <code>pulseIn(ECHO, HIGH)</code> cuánto tarda el eco. Como el sonido recorre 1 cm en 58 µs (ida y vuelta), la fórmula es <strong>cm = µs / 58</strong>.</p><pre><code>long duracion = pulseIn(ECHO, HIGH);\nint distancia = duracion / 58;</code></pre>',
    ver: '<h3>Correcto</h3><pre><code>pinMode(TRIG, OUTPUT);\npinMode(ECHO, INPUT);\ndigitalWrite(TRIG, HIGH);\ndelayMicroseconds(10);\ndigitalWrite(TRIG, LOW);\nlong duracion = pulseIn(ECHO, HIGH);\nint distancia = duracion / 58;\nSerial.println(distancia);</code></pre>',
    detectar: '<h3>Valor sin convertir</h3><pre><code>pinMode(TRIG, OUTPUT);\npinMode(ECHO, INPUT);\ndigitalWrite(TRIG, HIGH);\ndelayMicroseconds(10);\ndigitalWrite(TRIG, LOW);\nlong duracion = pulseIn(ECHO, HIGH);\nint distancia = duracion;\nSerial.println(distancia); // muestra 5800 en vez de 100</code></pre><p>Si duracion = 5800, ¿cuántos centímetros es? (5800 / 58)</p>',
    reparar: {
      codigoInicial: 'pinMode(TRIG, OUTPUT);\npinMode(ECHO, INPUT);\ndigitalWrite(TRIG, HIGH);\ndelayMicroseconds(10);\ndigitalWrite(TRIG, LOW);\nlong duracion = pulseIn(ECHO, HIGH);\nint distancia = duracion;\nSerial.println(distancia); // muestra 5800 en vez de 100',
      validar: function (out, code) {
        var errores = [];
        if (!/pulseIn\s*\(\s*ECHO\s*,\s*HIGH\s*\)/.test(code)) errores.push('pulseIn(ECHO, HIGH)');
        if (!/duracion\s*\/\s*58/.test(code)) errores.push('int distancia = duracion / 58;');
        if (!/pinMode\s*\(\s*ECHO\s*,\s*INPUT\s*\)/.test(code)) errores.push('pinMode(ECHO, INPUT)');
        if (!/digitalWrite\s*\(\s*TRIG\s*,\s*LOW\s*\)/.test(code)) errores.push('cerrar el pulso con digitalWrite(TRIG, LOW)');
        if (errores.length > 0) return { ok: false, exp: 'Faltan corregir: ' + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Unidades y conversión</h3><p>El sensor devuelve el tiempo del eco en microsegundos. Para mostrar centímetros hay que convertir: el sonido tarda 58 µs en ir y volver 1 cm, por eso se divide por 58.</p>'
  },
  {
    id: 'm4-25', mundo: 4, titulo: 'Relevé con condición',
    historia: 'El relevé que conmuta la lámpara grande del taller debe activarse solo cuando el sensor supera el umbral, pero quedó enchufado sin ninguna lógica.',
    objetivo: 'Configurar el pin 7 como OUTPUT y controlar el relevé con if (temp > 500) y else.',
    xp: 52,
    pistas: ['El relevé se maneja igual que un LED: es una salida.', 'pinMode(7, OUTPUT); y digitalWrite(7, HIGH) para activarlo.', 'if (temp > 500) { digitalWrite(7, HIGH); } else { digitalWrite(7, LOW); }'],
    aprender: '<h3>Relevé (relay)</h3><p>Un relevé es un interruptor controlado: Arduino manda 5V a su bobina y él conmuta una carga de 220V. Se programa igual que un LED: <code>pinMode(7, OUTPUT)</code>, <code>HIGH</code> conecta y <code>LOW</code> desconecta.</p>',
    ver: '<h3>Correcto</h3><pre><code>int temp = analogRead(A1);\npinMode(7, OUTPUT);\nif (temp > 500) {\n  digitalWrite(7, HIGH);\n} else {\n  digitalWrite(7, LOW);\n}</code></pre>',
    detectar: '<h3>Relevé sin lógica</h3><pre><code>int temp = analogRead(A1);\npinMode(7, OUTPUT);\n// Falta decidir cuándo conectar la carga</code></pre><p>¿Qué estructura decide cuándo activar y cuándo soltar el relevé?</p>',
    reparar: {
      codigoInicial: 'int temp = analogRead(A1);\npinMode(7, OUTPUT);\n// Falta decidir cuándo conectar la carga',
      validar: function (out, code) {
        var errores = [];
        if (!/pinMode\s*\(\s*7\s*,\s*OUTPUT\s*\)/.test(code)) errores.push('pinMode(7, OUTPUT)');
        if (!/if\s*\(\s*temp\s*>\s*500\s*\)/.test(code)) errores.push('la condición if (temp > 500)');
        if (!/digitalWrite\s*\(\s*7\s*,\s*HIGH\s*\)/.test(code)) errores.push('digitalWrite(7, HIGH)');
        if (!/digitalWrite\s*\(\s*7\s*,\s*LOW\s*\)/.test(code)) errores.push('digitalWrite(7, LOW)');
        if (errores.length > 0) return { ok: false, exp: 'Faltan corregir: ' + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Actuador bajo condición</h3><p>El relevé no decide nada por sí mismo: sigue al pin. La condición <code>if (temp > 500)</code> es la que manda conectar o soltar la carga, y el <code>else</code> garantiza que se desconecte cuando baja la temperatura.</p>'
  },
  {
    id: 'm4-26', mundo: 4, titulo: 'Interrupción con bandera',
    historia: 'Un pulsador rápido se pierde porque el loop está ocupado midiendo distancias. Hay que usar una interrupción que solo MARQUE una bandera y dejar el trabajo para el loop.',
    objetivo: 'Completar la función marcar() y registrar la interrupción con attachInterrupt en setup().',
    xp: 52,
    pistas: ['attachInterrupt(digitalPinToInterrupt(pin), funcion, modo) se registra en setup().', 'La función de la interrupción debe ser cortísima: solo marcar una bandera.', 'bandera = true; dentro de marcar() y attachInterrupt(digitalPinToInterrupt(2), marcar, FALLING);'],
    aprender: '<h3>Interrupciones</h3><p><code>attachInterrupt(digitalPinToInterrupt(2), marcar, FALLING)</code> pausa lo que esté haciendo y ejecuta <code>marcar()</code> cuando el pin 2 cae de HIGH a LOW. Dentro de la interrupción no se puede usar delay(); lo habitual es marcar una <code>volatile bool</code> y procesarla en <code>loop()</code>.</p>',
    ver: '<h3>Correcto</h3><pre><code>volatile bool bandera = false;\n\nvoid marcar() {\n  bandera = true;\n}\n\nvoid setup() {\n  pinMode(2, INPUT);\n  attachInterrupt(digitalPinToInterrupt(2), marcar, FALLING);\n}\n\nvoid loop() {\n  if (bandera) {\n    digitalWrite(13, HIGH);\n    bandera = false;\n  }\n}</code></pre>',
    detectar: '<h3>Interrupción a medias</h3><pre><code>volatile bool bandera = false;\n\nvoid marcar() {\n  // La interrupción debe marcar la bandera\n}\n\nvoid setup() {\n  pinMode(2, INPUT);\n}\n\nvoid loop() {\n  if (bandera) {\n    digitalWrite(13, HIGH);\n    bandera = false;\n  }\n}</code></pre><p>¿Qué dos cosas faltan: qué hace la función marcar() y cómo se registra en setup()?</p>',
    reparar: {
      codigoInicial: 'volatile bool bandera = false;\n\nvoid marcar() {\n  // La interrupción debe marcar la bandera\n}\n\nvoid setup() {\n  pinMode(2, INPUT);\n}\n\nvoid loop() {\n  if (bandera) {\n    digitalWrite(13, HIGH);\n    bandera = false;\n  }\n}',
      validar: function (out, code) {
        var errores = [];
        if (!/volatile\s+bool\s+bandera/.test(code)) errores.push('volatile bool bandera;');
        if (!/bandera\s*=\s*true/.test(code)) errores.push('bandera = true; dentro de marcar()');
        if (!/attachInterrupt\s*\(\s*digitalPinToInterrupt\s*\(\s*2\s*\)\s*,\s*marcar\s*,\s*FALLING\s*\)/.test(code)) errores.push('attachInterrupt(digitalPinToInterrupt(2), marcar, FALLING)');
        if (errores.length > 0) return { ok: false, exp: 'Faltan corregir: ' + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Interrupción corta, trabajo después</h3><p>La interrupción se ejecuta en el momento exacto del evento, por eso debe ser mínima: solo <code>bandera = true</code>. El loop se encarga después de todo lo demás (encender el LED, limpiar la bandera). Así no se pierde ningún apretón.</p>'
  },
  {
    id: 'm4-27', mundo: 4, titulo: 'Contador de pulsos',
    historia: 'El contador de reparaciones debe sumar 1 por cada apretón del botón, pero suma de a miles mientras lo mantienen apretado.',
    objetivo: 'Detectar el flanco del botón (antes LOW, ahora HIGH) y sumar cont = cont + 1;.',
    xp: 53,
    pistas: ['Con un simple if (digitalRead(2) == HIGH) contás cada vuelta del loop, no cada apretón.', 'Guardá el estado anterior en una variable.', 'if (boton == HIGH && anterior == LOW) { cont = cont + 1; } y después anterior = boton;'],
    aprender: '<h3>Contar con flanco</h3><p>El botón apretado dura miles de vueltas del loop. Para contar UNA vez hay que detectar el <strong>flanco de subida</strong>: el pin pasó de LOW a HIGH. Se guarda el estado anterior y se compara con el actual.</p><pre><code>if (boton == HIGH && anterior == LOW) {\n  cont = cont + 1;\n}\nanterior = boton;</code></pre>',
    ver: '<h3>Correcto</h3><pre><code>int cont = 0;\nint anterior = LOW;\n\nvoid loop() {\n  int boton = digitalRead(2);\n  if (boton == HIGH && anterior == LOW) {\n    cont = cont + 1;\n  }\n  anterior = boton;\n  Serial.println(cont);\n}</code></pre>',
    detectar: '<h3>Cuenta de más</h3><pre><code>int cont = 0;\n\nvoid loop() {\n  int boton = digitalRead(2);\n  if (boton == HIGH) {\n    cont = cont + 1;\n  }\n  Serial.println(cont);\n}</code></pre><p>¿Por qué cuenta de más si mantienen el botón apretado? ¿Qué variable recuerda el estado anterior?</p>',
    reparar: {
      codigoInicial: 'int cont = 0;\n\nvoid loop() {\n  int boton = digitalRead(2);\n  if (boton == HIGH) {\n    cont = cont + 1;\n  }\n  Serial.println(cont);\n}',
      validar: function (out, code) {
        var errores = [];
        if (!/int\s+anterior\s*=\s*LOW/.test(code)) errores.push('int anterior = LOW;');
        if (!/boton\s*==\s*HIGH\s*&&\s*anterior\s*==\s*LOW/.test(code)) errores.push('la condición de flanco boton == HIGH && anterior == LOW');
        if (!/cont\s*=\s*cont\s*\+\s*1/.test(code)) errores.push('cont = cont + 1;');
        if (!/anterior\s*=\s*boton\s*;/.test(code)) errores.push('actualizar con anterior = boton;');
        if (errores.length > 0) return { ok: false, exp: 'Faltan corregir: ' + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Flanco, no nivel</h3><p>digitalRead devuelve el NIVEL actual (HIGH durante todo el apretón). El flanco es el CAMBIO: ahora HIGH y antes LOW. Solo así el contador avanza exactamente una vez por apretón.</p>'
  },
  {
    id: 'm4-28', mundo: 4, titulo: 'Dos botones en cadena',
    historia: 'El panel tiene dos botones: el del pin 2 enciende el LED 13 y el del pin 3 el LED 12. Hoy solo funciona el primero.',
    objetivo: 'Encadenar if / else if / else para atender los dos botones.',
    xp: 54,
    pistas: ['Leé los dos botones con digitalRead(2) y digitalRead(3).', 'La segunda condición va en else if (...).', 'if (digitalRead(2) == HIGH) { ... } else if (digitalRead(3) == HIGH) { ... } else { ... }'],
    aprender: '<h3>if / else if</h3><p>Cuando hay varias opciones se encadenan <code>if</code> y <code>else if</code>: se evalúan en orden y solo se ejecuta la PRIMERA que se cumple. El <code>else</code> final atiende el caso "ninguno". (También existe <code>switch</code> cuando se compara un mismo valor muchas veces).</p>',
    ver: '<h3>Correcto</h3><pre><code>pinMode(2, INPUT);\npinMode(3, INPUT);\npinMode(13, OUTPUT);\npinMode(12, OUTPUT);\n\nif (digitalRead(2) == HIGH) {\n  digitalWrite(13, HIGH);\n} else if (digitalRead(3) == HIGH) {\n  digitalWrite(12, HIGH);\n} else {\n  digitalWrite(13, LOW);\n  digitalWrite(12, LOW);\n}</code></pre>',
    detectar: '<h3>Solo un botón</h3><pre><code>pinMode(2, INPUT);\npinMode(3, INPUT);\npinMode(13, OUTPUT);\npinMode(12, OUTPUT);\n\nif (digitalRead(2) == HIGH) {\n  digitalWrite(13, HIGH);\n}\n// El botón del pin 3 nunca se atiende</code></pre><p>¿Cómo se agrega una SEGUNDA opción cuando el primer if no se cumple?</p>',
    reparar: {
      codigoInicial: 'pinMode(2, INPUT);\npinMode(3, INPUT);\npinMode(13, OUTPUT);\npinMode(12, OUTPUT);\n\nif (digitalRead(2) == HIGH) {\n  digitalWrite(13, HIGH);\n}\n// El botón del pin 3 nunca se atiende',
      validar: function (out, code) {
        var errores = [];
        if (!/else\s+if\s*\(/.test(code)) errores.push('la rama else if');
        if (!/digitalRead\s*\(\s*3\s*\)/.test(code)) errores.push('leer el botón del pin 3');
        if (!/digitalWrite\s*\(\s*12\s*,\s*HIGH\s*\)/.test(code)) errores.push('encender el LED 12 con el botón 3');
        if (!/else\s*\{/.test(code)) errores.push('la rama else final');
        if (errores.length > 0) return { ok: false, exp: 'Faltan corregir: ' + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Cadena de condiciones</h3><p><code>else if</code> se evalúa solo si el <code>if</code> anterior falló. Así cada botón tiene su propia rama y el <code>else</code> final apaga todo cuando no se toca ninguno.</p>'
  },
  {
    id: 'm4-29', mundo: 4, titulo: 'Termostato con doble umbral',
    historia: 'El ventilador del servidor vibra prendiéndose y apagándose sin parar: hay un solo umbral. Debe prender arriba de 350 y apagar recién abajo de 250.',
    objetivo: 'Mapear la lectura con map() a una escala de 0 a 500 y usar doble umbral con if / else if.',
    xp: 54,
    pistas: ['analogRead da 0-1023: usá map() para llevarlo a una escala de 0 a 500.', 'int temp = map(lectura, 0, 1023, 0, 500);', 'if (temp > 350) { ... } else if (temp < 250) { ... }'],
    aprender: '<h3>Doble umbral (histéresis)</h3><p>Con un solo umbral el sistema vibra alrededor del punto de cambio. Con DOS umbrales (enciende arriba, apaga abajo) queda estable en el medio. Además, <code>map()</code> lleva la lectura cruda a una escala de temperatura más amigable.</p><pre><code>int temp = map(lectura, 0, 1023, 0, 500);\nif (temp > 350) {\n  digitalWrite(6, HIGH);\n} else if (temp < 250) {\n  digitalWrite(6, LOW);\n}</code></pre>',
    ver: '<h3>Correcto</h3><pre><code>int lectura = analogRead(A0);\nint temp = map(lectura, 0, 1023, 0, 500);\nif (temp > 350) {\n  digitalWrite(6, HIGH);\n} else if (temp < 250) {\n  digitalWrite(6, LOW);\n}</code></pre><p>Entre 250 y 350 el ventilador conserva su estado.</p>',
    detectar: '<h3>Un solo umbral</h3><pre><code>int lectura = analogRead(A0);\nint temp = lectura;\nif (temp > 350) {\n  digitalWrite(6, HIGH);\n} else {\n  digitalWrite(6, LOW);\n}</code></pre><p>Con un solo umbral el ventilador vibra. ¿Cómo convertir la lectura con map() y usar DOS umbrales?</p>',
    reparar: {
      codigoInicial: 'int lectura = analogRead(A0);\nint temp = lectura;\nif (temp > 350) {\n  digitalWrite(6, HIGH);\n} else {\n  digitalWrite(6, LOW);\n}',
      validar: function (out, code) {
        var errores = [];
        if (!/map\s*\(\s*lectura\s*,\s*0\s*,\s*1023\s*,\s*0\s*,\s*500\s*\)/.test(code)) errores.push('map(lectura, 0, 1023, 0, 500)');
        if (!/temp\s*>\s*350/.test(code)) errores.push('encender con temp > 350');
        if (!/temp\s*<\s*250/.test(code)) errores.push('apagar con temp < 250');
        if (!/else\s+if\s*\(/.test(code)) errores.push('encadenar con else if');
        if (!/digitalWrite\s*\(\s*6\s*,\s*HIGH\s*\)/.test(code)) errores.push('digitalWrite(6, HIGH)');
        if (!/digitalWrite\s*\(\s*6\s*,\s*LOW\s*\)/.test(code)) errores.push('digitalWrite(6, LOW)');
        if (errores.length > 0) return { ok: false, exp: 'Faltan corregir: ' + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Estabilidad con dos umbrales</h3><p>Si encendés y apagás en el mismo valor, cualquier temblor del sensor dispara el cambio. Con histéresis (enciende en 350, apaga en 250) hay una zona muerta que estabiliza al sistema. <code>map()</code> hace que los números sean fáciles de leer y mantener.</p>'
  },
  {
    id: 'm4-30', mundo: 4, titulo: 'Reparación integral del sistema',
    historia: 'Sistema completo del taller: sensor de luz en A0, LED de aviso en pin 13 y buzzer en pin 8. Todo falla a la vez: pines cambiados, condición invertida y buzzer sin condición. Encontrá y corregí TODOS los errores.',
    objetivo: 'Corregir los 5 errores: pin del LED, falta pinMode del buzzer, condición invertida, buzzer fuera del if y falta el else.',
    xp: 55,
    pistas: ['Hay 5 errores distintos.', '1) El LED está en el pin 13, no en el 10. 2) Falta pinMode(8, OUTPUT) para el buzzer. 3) La condición debe ser luz < 300. 4) El tone() debe quedar DENTRO del if. 5) Falta el rama else que apague todo.', 'Corregí uno por uno y revisá el resultado completo.'],
    aprender: '<h3>Diagnóstico integral</h3><p>Un buen técnico no arregla a ciegas. Revisa los pines, los modos, las condiciones y la estructura, uno por uno, hasta que el sistema completo respeta la consigna. Escribí la solución correcta entera y validá.</p>',
    ver: '<h3>Sistema correcto</h3><pre><code>void setup() {\n  pinMode(13, OUTPUT);\n  pinMode(8, OUTPUT);\n}\nvoid loop() {\n  int luz = analogRead(A0);\n  if (luz < 300) {\n    digitalWrite(13, HIGH);\n    tone(8, 440);\n  } else {\n    digitalWrite(13, LOW);\n    noTone(8);\n  }\n}</code></pre>',
    detectar: '<h3>Sistema con 5 errores</h3><pre><code>void setup() {\n  pinMode(10, OUTPUT);\n}\nvoid loop() {\n  int luz = analogRead(A0);\n  if (luz > 300) {\n    digitalWrite(10, HIGH);\n  }\n  tone(8, 440);\n}</code></pre><p>¿Cuántos errores podés encontrar? Revisá pines, modos, la condición y el buzzer.</p>',
    reparar: {
      codigoInicial: 'void setup() {\n  pinMode(10, OUTPUT);\n}\nvoid loop() {\n  int luz = analogRead(A0);\n  if (luz > 300) {\n    digitalWrite(10, HIGH);\n  }\n  tone(8, 440);\n}',
      validar: function (out, code) {
        var errores = [];
        if (!/pinMode\s*\(\s*13\s*,\s*OUTPUT\s*\)/.test(code)) errores.push('el LED en el pin 13');
        if (!/pinMode\s*\(\s*8\s*,\s*OUTPUT\s*\)/.test(code)) errores.push('el pinMode del buzzer en el pin 8');
        if (/pinMode\s*\(\s*10\s*,/.test(code) || /digitalWrite\s*\(\s*10\s*,/.test(code)) errores.push('sigue usando el pin 10 en vez del 13');
        if (!/luz\s*<\s*300/.test(code)) errores.push('la condición luz < 300');
        if (!/if\s*\(\s*luz\s*<\s*300\s*\)\s*\{[^}]*tone\s*\(\s*8/.test(code)) errores.push('el tone(8, 440) dentro del if');
        if (!/else\s*\{/.test(code)) errores.push('la rama else');
        if (!/noTone\s*\(\s*8\s*\)/.test(code)) errores.push('noTone(8) para silenciar');
        if (errores.length > 0) return { ok: false, exp: 'Faltan corregir: ' + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Diagnóstico completo</h3><p>1) Pin equivocado: el hardware no coincide con el código. 2) Sin pinMode el buzzer no sale del estado flotante. 3) Condición invertida: la lógica queda al revés. 4) tone() afuera del if: el buzzer ignora el sensor. 5) Sin else nada se apaga. Verificá cada componente individualmente.</p>'
  }
);
