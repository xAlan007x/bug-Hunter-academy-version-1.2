MISIONES.push(
  // ═══════════════════════════════════════════════════════════
  // MUNDO 7: PROTOBOARD — CÓMO SE CABLEA Y SE ALIMENTA (el más difícil)
  // ═══════════════════════════════════════════════════════════
  {
    id: 'm7-01', mundo: 7, titulo: 'La anatomía de la protoboard',
    historia: 'Llegaste al taller de TiendaVirtus con una protoboard nueva y un LED. Antes de enchufar nada, el jefe te hace entender qué agujeros están unidos entre sí por debajo del plástico.',
    objetivo: 'Conectar R1.p1 al agujero f7a y LED1.A al agujero f7e, demostrando que los agujeros a–e de una misma fila son el mismo punto eléctrico.',
    xp: 60,
    placa: [
      { id: 'R1', tipo: 'R', pins: { p1: 'f7a', p2: 'f5a' } },
      { id: 'LED1', tipo: 'LED', pins: { A: 'f7e', K: 'f9e' } }
    ],
    pistas: ['Los cinco agujeros del lado izquierdo de una fila (a, b, c, d, e) están soldados entre sí con una lámina de metal.', 'No hace falta ningún cable entre f7a y f7e: son el mismo punto eléctrico.', 'Conectá R1.p1 a f7a y LED1.A a f7e.'],
    aprender: '<h3>Las filas de la protoboard</h3><p>Cada fila del lado izquierdo tiene 5 agujeros (a, b, c, d, e) unidos por una lámina de metal por debajo del plástico. Si conectás un cable en f7a y el LED en f7e, quedan elécticamente unidos sin agregar nada más. Del lado derecho pasa lo mismo con los agujeros f–j (de f1f a f1j).</p><h3>La canal central</h3><p>El surco del medio SEPARA el lado izquierdo del derecho: f7a y f7f NO están conectadas. Para pasar corriente de un lado al otro hace falta un puente (un cable jumper). Entender esto te ahorra media hora de debugging.</p>',
    ver: '<h3>Conexiones correctas</h3><pre><code>conectar(R1.p1, f7a)\nconectar(LED1.A, f7e)</code></pre><p>R1 y LED1 comparten la fila 7 del lado izquierdo: quedan unidos a través de la lámina interna.</p>',
    detectar: '<h3>Conexiones incompletas</h3><pre><code>conectar(R1.p1, f7a)\nconectar(LED1.A, f3f)</code></pre><p>¿Están R1.p1 y LED1.A en la misma fila y en el mismo lado de la canal central?</p>',
    reparar: {
      codigoInicial: 'conectar(R1.p1, f7a)\nconectar(LED1.A, f3f)',
      validar: function (out, code) {
        var errores = [];
        if (!/conectar\(R1\.p1,\s*f7a\)/.test(code)) errores.push('conectar R1.p1 al agujero f7a');
        if (!/conectar\(LED1\.A,\s*f7e\)/.test(code)) errores.push('conectar LED1.A a f7e (misma fila 7, lado izquierdo)');
        if (errores.length > 0) return { ok: false, exp: (errores.length === 1 ? 'Falta: ' : 'Errores: ') + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>¿Por qué funcionan juntos f7a y f7e?</h3><p>Por debajo del plástico, los agujeros a–e de la fila 7 están unidos por una sola lámina de metal. Esa lámina es el cable invisible que une R1.p1 con LED1.A. En cambio f3f está en otra fila y del otro lado de la canal: ahí la corriente no pasa. Cuando armes un circuito, pensá la fila como un nudo de cables: todo lo que cae en la misma fila queda conectado.</p><pre><code>f7a === f7b === f7c === f7d === f7e   (unidos por la lámina)\nf7f === f7g === f7h === f7i === f7j   (unidos por la lámina)\nf7a =/= f7f                            (los separa la canal)</code></pre>'
  },
  {
    id: 'm7-02', mundo: 7, titulo: 'Alimentar los rieles de energía',
    historia: 'Los rieles rojo (+) y azul (−) de los costados de la protoboard están muertos: ningún componente recibe voltaje. Hay que llevarles energía desde el Arduino.',
    objetivo: 'Alimentar el riel+ con 5V y el riel- con GND usando alimentar(). Sin esos dos cables, ningún circuito de la protoboard funciona.',
    xp: 62,
    placa: [
    ],
    pistas: ['El riel+ (línea roja) distribuye el voltaje positivo.', 'El riel- (línea azul) es la tierra o GND: el retorno de la corriente.', 'Escribí: alimentar(5V, riel+) y alimentar(GND, riel-).'],
    aprender: '<h3>Los rieles de energía</h3><p>La protoboard tiene dos rieles verticales a los costados: el rojo (+) y el azul (−). Por debajo, TODOS los agujeros del riel+ están unidos en una sola línea, y lo mismo con todos los del riel-. Sirven para repartir 5V y GND a cualquier fila con un cable corto.</p><h3>El riel no genera energía</h3><p>La protoboard no tiene pila: el riel solo DISTRIBUYE lo que vos le traés desde el Arduino con dos jumpers. Si no alimentás el riel+ con 5V y el riel- con GND, ambos están a 0V y todo el circuito queda apagado aunque cables cada componente perfecto.</p>',
    ver: '<h3>Conexiones correctas</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)</code></pre><p>Con esto, cualquier agujero del riel+ tiene 5V y cualquier agujero del riel- tiene tierra.</p>',
    detectar: '<h3>Alimentación invertida</h3><pre><code>alimentar(5V, riel-)\nalimentar(GND, riel+)</code></pre><p>¿Qué le pasa a un LED si el positivo y el negativo están cambiados de lugar?</p>',
    reparar: {
      codigoInicial: 'alimentar(5V, riel-)\nalimentar(GND, riel+)',
      validar: function (out, code) {
        var errores = [];
        if (!/alimentar\(5V,\s*riel\+\)/.test(code)) errores.push('alimentar el riel+ con 5V');
        if (!/alimentar\(GND,\s*riel-\)/.test(code)) errores.push('alimentar el riel- con GND');
        if (/alimentar\(5V,\s*riel-\)/.test(code)) errores.push('el 5V NUNCA va al riel-: polaridad invertida');
        if (/alimentar\(GND,\s*riel\+\)/.test(code)) errores.push('GND NUNCA va al riel+: polaridad invertida');
        if (errores.length > 0) return { ok: false, exp: (errores.length === 1 ? 'Falta: ' : 'Errores: ') + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>El camino de la energía</h3><p>La corriente sale del pin 5V del Arduino, entra al riel+ y queda disponible en TODOS sus agujeros. Recorre el circuito de los componentes y vuelve por el riel- al pin GND. Sin este retorno cerrado no circula nada: por eso alimentar(GND, riel-) es tan importante como el 5V.</p><pre><code>Arduino 5V ──► riel+ ──► (componentes) ──► riel- ──► Arduino GND</code></pre>'
  },
  {
    id: 'm7-03', mundo: 7, titulo: 'Tu primer circuito con LED',
    historia: 'El mostrador del taller necesita una luz testigo. Armá el primer circuito completo de la protoboard: desde el riel+ pasando por una resistencia y un LED hasta el riel-.',
    objetivo: 'Alimentar los rieles y conectar en este orden: riel+ → R1.p1, R1.p2 → LED1.A, LED1.K → riel-.',
    xp: 65,
    placa: [
      { id: 'R1', tipo: 'R', pins: { p1: 'f5a', p2: 'f7a' } },
      { id: 'LED1', tipo: 'LED', pins: { A: 'f7b', K: 'f9b' } }
    ],
    pistas: ['La corriente siempre sale del riel+ y vuelve al riel-.', 'La resistencia va ANTES del LED, en serie, para limitar la corriente.', 'El camino completo es: riel+ → R1 → LED1 → riel-.'],
    aprender: '<h3>El camino de la corriente</h3><p>Un circuito necesita un camino cerrado: la corriente sale del riel+ (+5V), atraviesa la resistencia R1, entra al LED por el ánodo, sale por el cátodo y vuelve al riel-. Si falta cualquier tramo, no circula corriente y el LED no enciende.</p><h3>¿Por qué la resistencia?</h3><p>Un LED directo a 5V pide más corriente de la que soporta y se quema en segundos. La resistencia R1 limita esa corriente a un valor seguro (unos 20 mA). Regla de oro del taller: TODO LED lleva su resistencia en serie.</p>',
    ver: '<h3>Conexiones correctas</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, riel-)</code></pre><p>La corriente pasa por R1 y el LED en serie, de riel+ a riel-.</p>',
    detectar: '<h3>Circuito sin resistencia</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, LED1.A)\nconectar(LED1.K, riel-)</code></pre><p>¿Qué protege al LED del exceso de corriente? ¿Dónde está R1?</p>',
    reparar: {
      codigoInicial: 'alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, LED1.A)\nconectar(LED1.K, riel-)',
      validar: function (out, code) {
        var errores = [];
        if (!/alimentar\(5V,\s*riel\+\)/.test(code)) errores.push('alimentar riel+ con 5V');
        if (!/alimentar\(GND,\s*riel-\)/.test(code)) errores.push('alimentar riel- con GND');
        if (!/conectar\(riel\+,\s*R1\.p1\)/.test(code)) errores.push('conectar el riel+ a R1.p1');
        if (!/conectar\(R1\.p2,\s*LED1\.A\)/.test(code)) errores.push('conectar R1.p2 al ánodo del LED');
        if (!/conectar\(LED1\.K,\s*riel-\)/.test(code)) errores.push('conectar el cátodo del LED al riel-');
        if (/conectar\(riel\+,\s*LED1\.A\)/.test(code)) errores.push('FALTA LA RESISTENCIA: el LED no puede recibir 5V directo');
        if (/conectar\(riel\+,\s*riel-\)|conectar\(riel-,\s*riel\+\)/.test(code)) errores.push('CORTOCIRCUITO: riel+ directo a riel-');
        if (errores.length > 0) return { ok: false, exp: (errores.length === 1 ? 'Falta: ' : 'Errores: ') + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Recorrido físico de la corriente</h3><p>El cable desde riel+ hasta R1.p1 entrega 5V a la resistencia. R1.p2 comparte fila con LED1.A: el mismo voltaje (ya limitada la corriente) entra al LED. El cátodo LED1.K va al riel-, que lo devuelve al GND del Arduino. Cada cable existe porque une un tramo del camino: si sacás cualquiera, el circuito se abre y el LED se apaga.</p><pre><code>riel+ (5V) ──cable──► R1 ──fila──► LED1(A→K) ──cable──► riel- (GND)</code></pre>'
  },
  {
    id: 'm7-04', mundo: 7, titulo: 'La polaridad del LED',
    historia: 'Conectaste el LED al revés en el banco de pruebas y no enciende. El LED es un diodo: solo deja pasar la corriente en una dirección, y la pata larga marca cuál es.',
    objetivo: 'Corregir la polaridad del LED: LED1.A (pata larga, ánodo) hacia el lado positivo vía R1, y LED1.K (pata corta, cátodo) al riel-. Nada de patas invertidas.',
    xp: 65,
    placa: [
      { id: 'R1', tipo: 'R', pins: { p1: 'f5a', p2: 'f7a' } },
      { id: 'LED1', tipo: 'LED', pins: { A: 'f7b', K: 'f9b' } }
    ],
    pistas: ['La pata larga del LED es el ánodo (A).', 'La pata corta es el cátodo (K).', 'El ánodo va hacia el positivo (vía R1) y el cátodo directo al riel-.'],
    aprender: '<h3>Un LED es un diodo</h3><p>Los diodos dejan pasar la corriente en UNA sola dirección. En el LED, el ánodo (A, pata larga) debe quedar hacia el positivo y el cátodo (K, pata corta) hacia el negativo. Al revés, simplemente no enciende; si le forzás voltaje alto, se rompe.</p><h3>Cómo identificarlo en la protoboard</h3><p>Antes de clavar el LED, mirá las patas: la larga es A. También hay un lado plano en la carcasa, ese es el lado del cátodo. Conectá A hacia el lado de R1 (que viene del 5V) y K hacia el riel-.</p>',
    ver: '<h3>Conexiones correctas</h3><pre><code>alimentar(GND, riel-)\nconectar(D13, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, riel-)</code></pre><p>La corriente entra por A (pata larga) y sale por K hacia tierra.</p>',
    detectar: '<h3>LED invertido</h3><pre><code>alimentar(GND, riel-)\nconectar(D13, R1.p1)\nconectar(R1.p2, LED1.K)\nconectar(LED1.A, riel-)</code></pre><p>Si el cátodo quedó del lado del positivo, ¿puede pasar corriente? ¿Qué pata debería ir a R1.p2?</p>',
    reparar: {
      codigoInicial: 'alimentar(GND, riel-)\nconectar(D13, R1.p1)\nconectar(R1.p2, LED1.K)\nconectar(LED1.A, riel-)',
      validar: function (out, code) {
        var errores = [];
        if (!/alimentar\(GND,\s*riel-\)/.test(code)) errores.push('alimentar riel- con GND');
        if (!/conectar\(D13,\s*R1\.p1\)/.test(code)) errores.push('conectar el pin D13 a R1.p1');
        if (!/conectar\(R1\.p2,\s*LED1\.A\)/.test(code)) errores.push('conectar R1.p2 al ÁNODO (LED1.A, pata larga)');
        if (!/conectar\(LED1\.K,\s*riel-\)/.test(code)) errores.push('conectar el CÁTODO (LED1.K) al riel-');
        if (/LED1\.A,\s*riel-|LED1\.A,\s*GND/.test(code)) errores.push('el ánodo no va a tierra: quedaría invertido');
        if (/LED1\.K,\s*riel\+|LED1\.K,\s*D13/.test(code)) errores.push('el cátodo no va al lado positivo: quedaría invertido');
        if (errores.length > 0) return { ok: false, exp: (errores.length === 1 ? 'Falta: ' : 'Errores: ') + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Corriente a través del diodo</h3><p>La corriente entra por D13, pasa por R1 (que limita el fluso), entra al LED por el ánodo A y sale por el cátodo K hacia el riel-. Ese es el único sentido en que el diodo conduce. Si conectás K del lado de R1 y A al riel-, el diodo queda polarizado inverso: no hay camino y el LED permanece apagado, sin importar el resto del cableado.</p><pre><code>D13 ──► R1 ──► LED1.A (+) ▶|─ LED1.K (−) ──► riel-\n                         el triángulo del símbolo apunta hacia el cátodo</code></pre>'
  },
  {
    id: 'm7-05', mundo: 7, titulo: 'Cruzando el canal central',
    historia: 'El LED está del lado derecho de la protoboard y el riel+ solo llega cómodo al lado izquierdo. La canal del medio te corta el paso: hay que tender un puente.',
    objetivo: 'Alimentar los rieles, tirar un puente con un jumper entre f7a y f7f, y completar: f7f → R1.p1, R1.p2 → LED1.A, LED1.K → riel-.',
    xp: 68,
    placa: [
      { id: 'R1', tipo: 'R', pins: { p1: 'f7g', p2: 'f9g' } },
      { id: 'LED1', tipo: 'LED', pins: { A: 'f9h', K: 'f11h' } }
    ],
    pistas: ['La canal central corta la conexión entre el lado a–e y el lado f–j.', 'Un jumper corto en la fila 7 une ambos lados: conectar(f7a, f7f).', 'Después del puente, R1 y el LED van encadenados del lado derecho.'],
    aprender: '<h3>La canal es un muro</h3><p>La ranura central de la protoboard separa elécticamente las 5 columnas izquierdas (a–e) de las 5 derechas (f–j). El metal que une f7a con f7e no llega nunca a f7f. Si tu componente está de un lado y el voltaje del otro, necesitás un jumper que cruce la canal, fila de por medio.</p><h3>Uso del jumper</h3><p>El jumper es un cable rígido de unos 20 cm. Se clava con firmeza en dos agujeros y listo: une esos dos puntos. En el mundo real, el puente f7a ↔ f7f es el cable más común de toda protoboard.</p>',
    ver: '<h3>Conexiones correctas</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, f7a)\nconectar(f7a, f7f)\nconectar(f7f, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, riel-)</code></pre><p>El puente f7a–f7f lleva el 5V al lado derecho, donde R1 y el LED completan el camino.</p>',
    detectar: '<h3>Sin puente</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, f7a)\nconectar(f7f, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, riel-)</code></pre><p>La fila 7a tiene 5V pero la 7f está sola: ¿cómo llega la corriente al otro lado de la canal?</p>',
    reparar: {
      codigoInicial: 'alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, f7a)\nconectar(f7f, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, riel-)',
      validar: function (out, code) {
        var errores = [];
        if (!/alimentar\(5V,\s*riel\+\)/.test(code)) errores.push('alimentar riel+ con 5V');
        if (!/alimentar\(GND,\s*riel-\)/.test(code)) errores.push('alimentar riel- con GND');
        if (!/conectar\(riel\+,\s*f7a\)/.test(code)) errores.push('conectar el riel+ a la fila 7a');
        if (!/conectar\(f7a,\s*f7f\)|conectar\(f7f,\s*f7a\)/.test(code)) errores.push('tirar el PUENTE que cruza la canal: conectar(f7a, f7f)');
        if (!/conectar\(f7f,\s*R1\.p1\)/.test(code)) errores.push('conectar la fila 7f a R1.p1');
        if (!/conectar\(R1\.p2,\s*LED1\.A\)/.test(code)) errores.push('conectar R1.p2 al ánodo del LED');
        if (!/conectar\(LED1\.K,\s*riel-\)/.test(code)) errores.push('conectar el cátodo del LED al riel-');
        if (/conectar\(riel\+,\s*riel-\)|conectar\(riel-,\s*riel\+\)/.test(code)) errores.push('CORTOCIRCUITO: riel+ directo a riel-');
        if (errores.length > 0) return { ok: false, exp: (errores.length === 1 ? 'Falta: ' : 'Errores: ') + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Por qué el puente es obligatorio</h3><p>El 5V entra a f7a desde el riel+ y la lámina interna lo reparte por f7b–f7e, pero ahí se corta. El jumper f7a ↔ f7f es el único eslabón que lleva ese voltaje a la fila 7f del otro lado. Una vez allí, R1.p1 lo toma, pasa por R1 y el LED, y el cátodo vuelve por el riel- al GND. Sin el puente, R1.p1 quedaría flotando (sin voltaje) aunque todo lo demás esté perfecto.</p><pre><code>riel+ ─► f7a ══jumper══► f7f ─► R1 ─► LED1 ─► riel-</code></pre>'
  },
  {
    id: 'm7-06', mundo: 7, titulo: 'Alimentación desde el Arduino',
    historia: 'Querés entender de dónde sale la energía sin usar los rieles laterales. El Arduino es tu fuente: sus pines 5V, 3V3 y GND pueden alimentar el circuito directo.',
    objetivo: 'Conectar el pin 5V del Arduino a la fila f10a y el pin GND a f12a; después completar: f10a → R1.p1, R1.p2 → LED1.A, LED1.K → f12a.',
    xp: 70,
    placa: [
      { id: 'R1', tipo: 'R', pins: { p1: 'f10b', p2: 'f8b' } },
      { id: 'LED1', tipo: 'LED', pins: { A: 'f8c', K: 'f12b' } }
    ],
    pistas: ['El Arduino tiene pines de alimentación dedicados: 5V, 3V3 y GND.', 'Conectá el pin 5V del Arduino con un jumper a f10a y el GND a f12a.', 'El camino de la corriente es: pin 5V → f10a → R1 → LED1 → f12a → pin GND.'],
    aprender: '<h3>El Arduino como fuente</h3><p>El regulador del Arduino entrega hasta 500 mA por el pin 5V. Ese pin es una fuente real: podés cablearlo directo a una fila de la protoboard y desde ahí alimentar componentes, sin pasar por los rieles. El pin GND es el retorno obligatorio de esa energía.</p><h3>Rieles vs filas</h3><p>Alimentar por rieles reparte energía a toda la placa. Alimentar por filas (f10a, f12a) crea un circuito chico y aislado, ideal para probar un componente sin riesgo. Las dos formas son válidas: rieles para proyectos grandes, filas para pruebas rápidas.</p>',
    ver: '<h3>Conexiones correctas</h3><pre><code>conectar(5V, f10a)\nconectar(GND, f12a)\nconectar(f10a, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, f12a)</code></pre><p>El pin 5V entra por f10a, recorre R1 y el LED, y vuelve por f12a al pin GND.</p>',
    detectar: '<h3>Filas sin energía</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(f10a, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, f12a)</code></pre><p>Las filas f10a y f12a no reciben energía de ningún lado: ¿de dónde debería entrar la corriente al circuito?</p>',
    reparar: {
      codigoInicial: 'alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(f10a, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, f12a)',
      validar: function (out, code) {
        var errores = [];
        if (!/conectar\(5V,\s*f10a\)/.test(code)) errores.push('conectar el pin 5V del Arduino a la fila f10a');
        if (!/conectar\(GND,\s*f12a\)/.test(code)) errores.push('conectar el pin GND del Arduino a la fila f12a');
        if (!/conectar\(f10a,\s*R1\.p1\)/.test(code)) errores.push('conectar la fila f10a a R1.p1');
        if (!/conectar\(R1\.p2,\s*LED1\.A\)/.test(code)) errores.push('conectar R1.p2 al ánodo del LED');
        if (!/conectar\(LED1\.K,\s*f12a\)/.test(code)) errores.push('conectar el cátodo del LED a la fila f12a (retorno a GND)');
        if (/conectar\(5V,\s*GND\)|conectar\(GND,\s*5V\)/.test(code)) errores.push('CORTOCIRCUITO: el pin 5V directo al pin GND');
        if (/conectar\(riel\+,\s*riel-\)|conectar\(riel-,\s*riel\+\)/.test(code)) errores.push('CORTOCIRCUITO: riel+ directo a riel-');
        if (errores.length > 0) return { ok: false, exp: (errores.length === 1 ? 'Falta: ' : 'Errores: ') + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Circuito cerrado sin rieles</h3><p>El pin 5V del Arduino inyecta corriente en la fila f10a; la lámina de esa fila la reparte a R1.p1. R1 limita la corriente, el LED la consume y el cátodo entrega el retorno a f12a, que está unido al pin GND. Es el mismo circuito del riel+, solo que la fuente y el retorno entran por filas comunes. ¿Por qué f12a y no otra? Porque f12a es el retorno: si el LED quedara en una fila sin camino a GND, el circuito estaría abierto.</p><pre><code>pin 5V ─► f10a ─► R1 ─► LED1 ─► f12a ─► pin GND</code></pre>'
  },
  {
    id: 'm7-07', mundo: 7, titulo: '5V y 3V3: no se mezclan',
    historia: 'El sensor LDR del taller trabaja a 3.3V y el LED rojo necesita 5V. Tenés que alimentar cada componente con su voltaje correcto, sin mezclarlos en el mismo riel.',
    objetivo: 'Alimentar riel+ con 5V y riel- con GND; armar la rama del LED (riel+ → R1 → LED1 → riel-); y alimentar el LDR desde el pin 3V3 (3V3 → LDR1.p1 y LDR1.p2 → riel-).',
    xp: 70,
    placa: [
      { id: 'R1', tipo: 'R', pins: { p1: 'f5a', p2: 'f7a' } },
      { id: 'LED1', tipo: 'LED', pins: { A: 'f7b', K: 'f9b' } },
      { id: 'LDR1', tipo: 'LDR', pins: { p1: 'f15h', p2: 'f17h' } }
    ],
    pistas: ['El riel+ ya lleva 5V: no le conectes el 3V3 encima.', 'El pin 3V3 del Arduino da 3.3V estables, ideales para sensores.', 'Conectá 3V3 directo a LDR1.p1 y el otro extremo del LDR al riel-.'],
    aprender: '<h3>Dos voltajes, dos mundos</h3><p>El Arduino Uno entrega 5V por su pin 5V y 3.3V por el pin 3V3. Muchos sensores y módulos modernos trabajan a 3.3V y se dañinan con 5V. Otros (como los LEDs clásicos con resistencia) necesitan los 5V. Cada componente va con SU voltaje.</p><h3>Nunca mezclar en el mismo riel</h3><p>Si alimentás el riel+ con 5V y además le conectás el 3V3, los dos banks del Arduino se cortocircuitan entre sí y uno de los dos reguladores puede quemarse. Regla: un riel, un voltaje. Para 3.3V, usá jumpers directos desde el pin 3V3, sin tocar el riel+.</p>',
    ver: '<h3>Conexiones correctas</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, riel-)\nconectar(3V3, LDR1.p1)\nconectar(LDR1.p2, riel-)</code></pre><p>El LED vive del riel+ (5V); el LDR vive del pin 3V3; ambos comparten el riel- como retorno.</p>',
    detectar: '<h3>3V3 pegado al riel+</h3><pre><code>alimentar(5V, riel+)\nalimentar(3V3, riel+)\nalimentar(GND, riel-)\nconectar(riel+, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, riel-)\nconectar(riel+, LDR1.p1)\nconectar(LDR1.p2, riel-)</code></pre><p>Estás uniendo 5V y 3V3 en el mismo riel. ¿Qué voltaje termina recibiendo el LDR?</p>',
    reparar: {
      codigoInicial: 'alimentar(5V, riel+)\nalimentar(3V3, riel+)\nalimentar(GND, riel-)\nconectar(riel+, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, riel-)\nconectar(riel+, LDR1.p1)\nconectar(LDR1.p2, riel-)',
      validar: function (out, code) {
        var errores = [];
        if (/alimentar\(3V3,\s*riel\+\)/.test(code)) errores.push('CORTO ENTRE FUENTES: el 3V3 no puede ir al riel+ (ya tiene 5V)');
        if (!/alimentar\(5V,\s*riel\+\)/.test(code)) errores.push('alimentar riel+ con 5V');
        if (!/alimentar\(GND,\s*riel-\)/.test(code)) errores.push('alimentar riel- con GND');
        if (!/conectar\(riel\+,\s*R1\.p1\)/.test(code)) errores.push('conectar el riel+ a R1.p1');
        if (!/conectar\(R1\.p2,\s*LED1\.A\)/.test(code)) errores.push('conectar R1.p2 al ánodo del LED');
        if (!/conectar\(LED1\.K,\s*riel-\)/.test(code)) errores.push('conectar el cátodo del LED al riel-');
        if (!/conectar\(3V3,\s*LDR1\.p1\)/.test(code)) errores.push('alimentar el LDR desde el pin 3V3');
        if (!/conectar\(LDR1\.p2,\s*riel-\)/.test(code)) errores.push('conectar LDR1.p2 al riel-');
        if (/conectar\(riel\+,\s*riel-\)|conectar\(riel-,\s*riel\+\)/.test(code)) errores.push('CORTOCIRCUITO: riel+ directo a riel-');
        if (errores.length > 0) return { ok: false, exp: (errores.length === 1 ? 'Falta: ' : 'Errores: ') + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Dos ramas, dos voltajes, un retorno</h3><p>La rama del LED nace en el riel+ (5V) y vuelve al riel-. La rama del LDR nace en el pin 3V3 y también vuelve al riel-: la tierra es común para ambos, eso no genera conflicto. Lo que NUNCA se comparte es el voltaje positivo. Si el 3V3 y el 5V cuelgan del mismo riel, el regulador de 3.3V empieza a absorber corriente del de 5V y se daña. Cada fuente en su propio camino.</p><pre><code>riel+ (5V)  ─► R1 ─► LED1 ─► riel-\npin 3V3    ─► LDR1 ─► riel-          (mismo retorno, distinto voltaje)</code></pre>'
  },
  {
    id: 'm7-08', mundo: 7, titulo: 'Orden seguro de armado',
    historia: 'Un compañero conectó cables con el Arduino encendido y chispoteó el banco de pruebas. El jefe impone un orden: primero los rieles, después los componentes, y la energía positiva recién al final.',
    objetivo: 'Alimentar ambos rieles PRIMERO (las dos líneas alimentar() antes que cualquier conectar()), armar después R1.p2 → LED1.A y LED1.K → riel-, y dejar connect(riel+, R1.p1) como ÚLTIMA línea.',
    xp: 72,
    placa: [
      { id: 'R1', tipo: 'R', pins: { p1: 'f5a', p2: 'f7a' } },
      { id: 'LED1', tipo: 'LED', pins: { A: 'f7b', K: 'f9b' } }
    ],
    pistas: ['Las dos líneas alimentar() deben aparecer antes que cualquier conectar().', 'El cable desde riel+ al componente va al final, con todo ya armado.', 'Orden: rieles → componentes → positivo al último.'],
    aprender: '<h3>¿Por qué el orden importa?</h3><p>Si conectás el positivo mientras el resto del circuito está a medio armar, cada cable suelto puede tocar accidentalmente otro punto y generar un cortocircuito con el Arduino todavía encendido. El protocolo seguro del taller: 1) alimentá los rieles (son simples rutas, sin carga), 2) montá todos los componentes y puentes, 3) recién al final conectá el positivo al primer componente.</p><h3>Tierra primero, positivo después</h3><p>El riel- (tierra) puede conectarse temprano: no hace circular corriente por sí solo. El positivo es el que "arma" el circuito, por eso va al último.</p>',
    ver: '<h3>Orden correcto</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, riel-)\nconectar(riel+, R1.p1)</code></pre><p>Rieles primero, puentes después, y el positivo (riel+ a R1) al final de todo.</p>',
    detectar: '<h3>Orden peligroso</h3><pre><code>conectar(riel+, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, riel-)\nalimentar(5V, riel+)\nalimentar(GND, riel-)</code></pre><p>El positivo se conectó antes de armar los componentes y los rieles ni siquiera estaban listos. ¿En qué línea debería estar conectar(riel+, R1.p1)?</p>',
    reparar: {
      codigoInicial: 'conectar(riel+, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, riel-)\nalimentar(5V, riel+)\nalimentar(GND, riel-)',
      validar: function (out, code) {
        var errores = [];
        var c = code.replace(/\s+/g, '');
        if (!/^alimentar\(5V,riel\+\)/.test(c)) errores.push('la PRIMERA línea debe ser alimentar(5V, riel+)');
        if (!/alimentar\(GND,riel-\)/.test(c)) errores.push('falta alimentar(GND, riel-) en el bloque inicial');
        if (!/conectar\(R1\.p2,LED1\.A\)/.test(c)) errores.push('falta conectar(R1.p2, LED1.A)');
        if (!/conectar\(LED1\.K,riel-\)/.test(code.replace(/\s+/g, ''))) errores.push('falta conectar(LED1.K, riel-)');
        if (!/conectar\(riel\+,R1\.p1\)/.test(c)) errores.push('falta conectar(riel+, R1.p1)');
        var iComp = c.indexOf('conectar(R1.p2,LED1.A)');
        var iPos = c.indexOf('conectar(riel+,R1.p1)');
        if (iComp >= 0 && iPos >= 0 && iPos < iComp) errores.push('la energía (riel+ a R1.p1) debe ir DESPUÉS de armar los componentes');
        if (/conectar\(riel\+,riel-\)|conectar\(riel-,riel\+\)/.test(c)) errores.push('CORTOCIRCUITO: riel+ directo a riel-');
        if (errores.length > 0) return { ok: false, exp: (errores.length === 1 ? 'Falta: ' : 'Errores: ') + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Protocolo de armado seguro</h3><p>Cuando alimentar() está primero, los rieles quedan cargados pero inofensivos: son solo conductos. Después armás R1.p2 con LED1.A (una fila común, sin corriente circulando todavía) y el retorno LED1.K al riel-. Recién cuando todo está en su lugar, el cable riel+ → R1.p1 cierra el circuito y el LED enciende. Así, en ningún momento hubo un positivo suelto buscando dónde tocar.</p><pre><code>1) alimentar rieles   2) puentes/componentes   3) positivo al final</code></pre>'
  },
  {
    id: 'm7-09', mundo: 7, titulo: 'Dos LEDs en serie',
    historia: 'Para la cartelera del taller hacen falta dos luces que se enciendan siempre juntas. La forma más directa es poner los dos LEDs en la misma rama, uno detrás del otro.',
    objetivo: 'Armar en serie: riel+ → R1.p1, R1.p2 → LED1.A, LED1.K → LED2.A, LED2.K → riel-. La misma corriente debe atravesar los dos LEDs.',
    xp: 75,
    placa: [
      { id: 'R1', tipo: 'R', pins: { p1: 'f5a', p2: 'f7a' } },
      { id: 'LED1', tipo: 'LED', pins: { A: 'f7b', K: 'f9b' } },
      { id: 'LED2', tipo: 'LED', pins: { A: 'f9c', K: 'f11c' } }
    ],
    pistas: ['En serie, la salida de un componente entra al siguiente.', 'El cátodo de LED1 se conecta al ánodo de LED2.', 'El camino: riel+ → R1 → LED1 → LED2 → riel-.'],
    aprender: '<h3>Circuito en serie</h3><p>En serie, los componentes forman una única fila de dominó: la misma corriente pasa por todos. El cátodo de LED1 es la salida, y debe alimentar el ánodo de LED2. Si invertís alguno de los dos, la cadena se corta y ninguno enciende.</p><h3>Voltajes que se suman</h3><p>Cada LED "consume" unos 2V. Dos LEDs en serie piden unos 4V, y la resistencia R1 se queda con el resto de los 5V limitando la corriente. Por eso en serie se usa UNA sola resistencia para los dos LEDs.</p>',
    ver: '<h3>Conexiones correctas</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, LED2.A)\nconectar(LED2.K, riel-)</code></pre><p>Una sola rama: la corriente atraviesa R1, LED1 y LED2 en ese orden.</p>',
    detectar: '<h3>LED2 colgando</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED2.K, riel-)</code></pre><p>LED2 tiene el cátodo en riel- pero nada alimenta su ánodo: ¿cómo se enciende si la cadena está rota?</p>',
    reparar: {
      codigoInicial: 'alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED2.K, riel-)',
      validar: function (out, code) {
        var errores = [];
        if (!/alimentar\(5V,\s*riel\+\)/.test(code)) errores.push('alimentar riel+ con 5V');
        if (!/alimentar\(GND,\s*riel-\)/.test(code)) errores.push('alimentar riel- con GND');
        if (!/conectar\(riel\+,\s*R1\.p1\)/.test(code)) errores.push('conectar el riel+ a R1.p1');
        if (!/conectar\(R1\.p2,\s*LED1\.A\)/.test(code)) errores.push('conectar R1.p2 al ánodo de LED1');
        if (!/conectar\(LED1\.K,\s*LED2\.A\)/.test(code)) errores.push('unir el cátodo de LED1 con el ÁNODO de LED2 (los dos en la misma rama)');
        if (!/conectar\(LED2\.K,\s*riel-\)/.test(code)) errores.push('conectar el cátodo de LED2 al riel-');
        if (/conectar\(LED1\.K,\s*LED2\.K\)/.test(code)) errores.push('cátodo con cátodo: los LEDs quedarían enfrentados');
        if (/conectar\(riel\+,\s*LED1\.A\)|conectar\(riel\+,\s*LED2\.A\)/.test(code)) errores.push('FALTA LA RESISTENCIA: ningún LED va directo al riel+');
        if (/conectar\(riel\+,\s*riel-\)|conectar\(riel-,\s*riel\+\)/.test(code)) errores.push('CORTOCIRCUITO: riel+ directo a riel-');
        if (errores.length > 0) return { ok: false, exp: (errores.length === 1 ? 'Falta: ' : 'Errores: ') + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Una sola rama</h3><p>En el circuito en serie solo existe un camino para la corriente: riel+ → R1 → LED1 → LED2 → riel-. Si desconectás cualquier eslabón, los dos LEDs se apagan juntos (porque la misma corriente los alimenta). R1 va una sola vez al principio porque ella sola limita el fluso de toda la rama; ponerle una resistencia a cada LED en serie sería redundante.</p><pre><code>riel+ ─► R1 ─► LED1(A→K) ─► LED2(A→K) ─► riel-</code></pre>'
  },
  {
    id: 'm7-10', mundo: 7, titulo: 'Dos LEDs en paralelo',
    historia: 'Ahora el jefe quiere que los dos LEDs reciban el MISMO voltaje y puedan encenderse aunque uno se queme. Eso es paralelo: dos ramas que parten del mismo punto.',
    objetivo: 'Armar dos ramas en paralelo: riel+ → R1.p1; desde R1.p2 salen dos ramas (R1.p2 → LED1.A y R1.p2 → LED2.A); los dos cátodos (LED1.K y LED2.K) vuelven al riel-.',
    xp: 75,
    placa: [
      { id: 'R1', tipo: 'R', pins: { p1: 'f5a', p2: 'f7a' } },
      { id: 'LED1', tipo: 'LED', pins: { A: 'f7b', K: 'f9b' } },
      { id: 'LED2', tipo: 'LED', pins: { A: 'f7c', K: 'f9c' } }
    ],
    pistas: ['En paralelo, las ramas parten del mismo punto común.', 'Los dos ánodos comparten la fila de R1.p2.', 'Los dos cátodos van por separado al riel-.'],
    aprender: '<h3>Circuito en paralelo</h3><p>En paralelo, el punto de salida se bifurca: cada LED tiene su propia rama y recibe el mismo voltaje. La corriente total se divide entre las ramas. Si un LED se desconecta, el otro sigue recibiendo voltaje y encendido.</p><h3>Compartir filas para bifurcar</h3><p>La forma de "duplicar" una señal en la protoboard es simple: conectá varias cosas a la misma fila. Acá R1.p2, LED1.A y LED2.A comparten fila: esa fila es el punto de bifurcación.</p>',
    ver: '<h3>Conexiones correctas</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(R1.p2, LED2.A)\nconectar(LED1.K, riel-)\nconectar(LED2.K, riel-)</code></pre><p>R1.p2 es el punto común: de ahí salen las dos ramas del paralelo.</p>',
    detectar: '<h3>Paralelo cableado como serie</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, LED2.A)\nconectar(LED2.K, riel-)</code></pre><p>Los LEDs quedaron uno detrás del otro (serie). ¿De qué punto deberían partir los DOS ánodos para recibir el mismo voltaje?</p>',
    reparar: {
      codigoInicial: 'alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, LED2.A)\nconectar(LED2.K, riel-)',
      validar: function (out, code) {
        var errores = [];
        if (!/alimentar\(5V,\s*riel\+\)/.test(code)) errores.push('alimentar riel+ con 5V');
        if (!/alimentar\(GND,\s*riel-\)/.test(code)) errores.push('alimentar riel- con GND');
        if (!/conectar\(riel\+,\s*R1\.p1\)/.test(code)) errores.push('conectar el riel+ a R1.p1');
        if (!/conectar\(R1\.p2,\s*LED1\.A\)/.test(code)) errores.push('conectar R1.p2 al ánodo de LED1');
        if (!/conectar\(R1\.p2,\s*LED2\.A\)/.test(code)) errores.push('conectar R1.p2 también al ÁNODO de LED2 (bifurcar en la misma fila)');
        if (!/conectar\(LED1\.K,\s*riel-\)/.test(code)) errores.push('conectar el cátodo de LED1 al riel-');
        if (!/conectar\(LED2\.K,\s*riel-\)/.test(code)) errores.push('conectar el cátodo de LED2 al riel-');
        if (/conectar\(LED1\.K,\s*LED2\.A\)/.test(code)) errores.push('ese cable une los LEDs en SERIE; en paralelo los dos ánodos salen de R1.p2');
        if (/conectar\(riel\+,\s*LED1\.A\)|conectar\(riel\+,\s*LED2\.A\)/.test(code)) errores.push('FALTA LA RESISTENCIA: ningún LED va directo al riel+');
        if (/conectar\(riel\+,\s*riel-\)|conectar\(riel-,\s*riel\+\)/.test(code)) errores.push('CORTOCIRCUITO: riel+ directo a riel-');
        if (errores.length > 0) return { ok: false, exp: (errores.length === 1 ? 'Falta: ' : 'Errores: ') + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Dos caminos desde un mismo nudo</h3><p>La fila de R1.p2 es el nudo de bifurcación: la corriente que sale de la resistencia se divide en dos, una rama hacia LED1.A y otra hacia LED2.A. Cada LED devuelve su corriente por su propio cátodo al riel-. Ambos ven el mismo voltaje (los 5V menos la caída de R1), y si uno se desconecta, el otro mantiene su camino cerrado. Esa es la diferencia clave con el circuito en serie de la misión anterior.</p><pre><code>              ┌─► LED1(A→K) ─┐\nriel+ ─► R1 ──┤               ├─► riel-\n              └─► LED2(A→K) ─┘</code></pre>'
  },
  {
    id: 'm7-11', mundo: 7, titulo: 'El cortocircuito mortal',
    historia: 'Alguien dejó un cable suelto uniendo el riel+ con el riel-. Si encendés el Arduino así, la fuente se sobrecalienta y puede quemarse. Encontrá el cable y sacalo.',
    objetivo: 'Eliminar la conexión directa entre riel+ y riel-. Debe quedar el circuito correcto: riel+ → R1.p1, R1.p2 → LED1.A, LED1.K → riel- (con rieles alimentados).',
    xp: 78,
    placa: [
      { id: 'R1', tipo: 'R', pins: { p1: 'f5a', p2: 'f7a' } },
      { id: 'LED1', tipo: 'LED', pins: { A: 'f7b', K: 'f9b' } }
    ],
    pistas: ['Un cable directo entre riel+ y riel- no tiene ninguna carga: es un cortocircuito.', 'Borrá la línea conectar(riel+, riel-).', 'La corriente debe pasar SIEMPRE por una carga (R1 + LED1).'],
    aprender: '<h3>¿Qué es un cortocircuito?</h3><p>Es un camino de resistencia casi nula entre el positivo y el negativo. La corriente se dispara a decenas de amperes, el cable se calienta y el regulador del Arduino entra en protección (o se daña). Por eso NUNCA se une riel+ con riel- directo: siempre debe haber una carga (resistencia, LED, motor) que limite el fluso.</p><h3>Cómo detectarlo</h3><p>Mirá los cables que van al riel+: si alguno llega al riel- sin pasar por componente, es el culpable. En la protoboard real, un cortocircuito hasta deja marca de quemado en el riel.</p>',
    ver: '<h3>Conexiones correctas</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, riel-)</code></pre><p>Sin cables directos entre rieles: la corriente solo circula por R1 y el LED.</p>',
    detectar: '<h3>Cortocircuito presente</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, riel-)\nconectar(riel+, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, riel-)</code></pre><p>Hay un cable que une los dos rieles sin pasar por ningún componente. ¿Cuál es?</p>',
    reparar: {
      codigoInicial: 'alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, riel-)\nconectar(riel+, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, riel-)',
      validar: function (out, code) {
        var errores = [];
        if (/conectar\(riel\+,\s*riel-\)|conectar\(riel-,\s*riel\+\)/.test(code)) return { ok: false, exp: 'CORTOCIRCUITO: riel+ directo a riel-. Sacá ese cable: la corriente debe pasar por R1 y LED1.' };
        if (!/alimentar\(5V,\s*riel\+\)/.test(code)) errores.push('alimentar riel+ con 5V');
        if (!/alimentar\(GND,\s*riel-\)/.test(code)) errores.push('alimentar riel- con GND');
        if (!/conectar\(riel\+,\s*R1\.p1\)/.test(code)) errores.push('conectar el riel+ a R1.p1');
        if (!/conectar\(R1\.p2,\s*LED1\.A\)/.test(code)) errores.push('conectar R1.p2 al ánodo del LED');
        if (!/conectar\(LED1\.K,\s*riel-\)/.test(code)) errores.push('conectar el cátodo del LED al riel-');
        if (errores.length > 0) return { ok: false, exp: (errores.length === 1 ? 'Falta: ' : 'Errores: ') + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Por qué el LED salva al circuito</h3><p>La resistencia R1 y el LED son las "cargas" del circuito: R1 limita la corriente a unos 20 mA. Sin esas cargas, el único camino del 5V al GND sería el cable suelto, con una corriente enorme que calienta al instante el regulador. Fijate que los rieles pueden estar perfectamente alimentados: el problema no es tener 5V en el riel+, es tenerlo SIN carga.</p><pre><code>MALO:  riel+ ═══cable═══ riel-        (corriente infinita, se quema)\nBUENO: riel+ ─► R1 ─► LED1 ─► riel-   (corriente limitada, seguro)</code></pre>'
  },
  {
    id: 'm7-12', mundo: 7, titulo: 'Capacitor polarizado',
    historia: 'El LED del taller parpadea porque la alimentación es inestable. El jefe te pasa un capacitor electrolítico de filtro. Ojo: es polarizado, hay que ponerlo bien o explota.',
    objetivo: 'Armar el LED con su resistencia (riel+ → R1.p1, R1.p2 → LED1.A, LED1.K → riel-) y conectar el capacitor en paralelo a la alimentación: C1.p1 (patita larga, +) al riel+ y C1.p2 al riel-.',
    xp: 78,
    placa: [
      { id: 'R1', tipo: 'R', pins: { p1: 'f5a', p2: 'f7a' } },
      { id: 'LED1', tipo: 'LED', pins: { A: 'f7b', K: 'f9b' } },
      { id: 'C1', tipo: 'C', pins: { p1: 'f5c', p2: 'f9c' } }
    ],
    pistas: ['El capacitor electrolítico es polarizado: una patita es positiva y la otra negativa.', 'C1.p1 es la patita larga, la del (+).', 'El (+) va al riel+ y el (−) al riel-: en paralelo con la fuente.'],
    aprender: '<h3>Capacitor de filtro</h3><p>Un capacitor guarda carga como una mini batería. Conectado entre riel+ y riel-, absorbe los "bajones" de voltaje y los compensa, dejando la alimentación más estable para el LED. Es el filtro más básico de toda fuente de alimentación.</p><h3>Polaridad: no se equivoca dos veces</h3><p>El electrolítico tiene un lado marcado con una banda (el −) y patas de distinto largo (la larga es +). Si lo conectás al revés, el dieléctrico interno se degrada y el capacitor puede calentarse, hincharse e incluso reventar. (+) siempre al riel+, (−) siempre al riel-.</p>',
    ver: '<h3>Conexiones correctas</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, riel-)\nconectar(riel+, C1.p1)\nconectar(C1.p2, riel-)</code></pre><p>El capacitor queda en paralelo con la fuente: (+) al riel+, (−) al riel-.</p>',
    detectar: '<h3>Capacitor invertido</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, riel-)\nconectar(riel+, C1.p2)\nconectar(C1.p1, riel-)</code></pre><p>El (+) del capacitor quedó en el riel- y el (−) en el riel+. ¿Qué le pasa a un electrolítico con la polaridad invertida?</p>',
    reparar: {
      codigoInicial: 'alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, riel-)\nconectar(riel+, C1.p2)\nconectar(C1.p1, riel-)',
      validar: function (out, code) {
        var errores = [];
        if (!/alimentar\(5V,\s*riel\+\)/.test(code)) errores.push('alimentar riel+ con 5V');
        if (!/alimentar\(GND,\s*riel-\)/.test(code)) errores.push('alimentar riel- con GND');
        if (!/conectar\(riel\+,\s*R1\.p1\)/.test(code)) errores.push('conectar el riel+ a R1.p1');
        if (!/conectar\(R1\.p2,\s*LED1\.A\)/.test(code)) errores.push('conectar R1.p2 al ánodo del LED');
        if (!/conectar\(LED1\.K,\s*riel-\)/.test(code)) errores.push('conectar el cátodo del LED al riel-');
        if (!/conectar\(riel\+,\s*C1\.p1\)/.test(code)) errores.push('conectar la patita (+) del capacitor (C1.p1) al riel+');
        if (!/conectar\(C1\.p2,\s*riel-\)/.test(code)) errores.push('conectar la patita (−) del capacitor (C1.p2) al riel-');
        if (/conectar\(riel\+,\s*C1\.p2\)|conectar\(C1\.p2,\s*riel\+\)/.test(code)) errores.push('POLARIDAD INVERTIDA: el (−) del capacitor no va al riel+');
        if (/conectar\(C1\.p1,\s*riel-\)|conectar\(riel-,\s*C1\.p1\)/.test(code)) errores.push('POLARIDAD INVERTIDA: el (+) del capacitor no va al riel-');
        if (/conectar\(riel\+,\s*riel-\)|conectar\(riel-,\s*riel\+\)/.test(code)) errores.push('CORTOCIRCUITO: riel+ directo a riel-');
        if (errores.length > 0) return { ok: false, exp: (errores.length === 1 ? 'Falta: ' : 'Errores: ') + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>El capacitor como reserva de voltaje</h3><p>El capacitor queda colgado entre riel+ y riel-, es decir, en paralelo con la fuente: ve el mismo voltaje que el LED. Cuando la alimentación baja un instante, el capacitor entrega su carga al riel+ y mantiene el LED estable. El recorrido de la corriente del LED no cambia (riel+ → R1 → LED1 → riel-); el capacitor solo "pule" el riel. Y acá la polaridad es sagrada: C1.p1 (+) al riel+, C1.p2 (−) al riel-.</p><pre><code>riel+ ─┬─► R1 ─► LED1 ─┬─► riel-\n       │               │\n       └─► C1(+)═||(═− ┘</code></pre>'
  },
  {
    id: 'm7-13', mundo: 7, titulo: 'Potenciómetro de tres patas',
    historia: 'El volumen del buzzer del taller necesita una perilla ajustable. El potenciómetro tiene tres patas: dos extremos fijos y un cursor que se mueve al girar la perilla.',
    objetivo: 'Alimentar los rieles y conectar: riel+ → POT1.1, POT1.3 → riel- (los extremos), y la salida del cursor POT1.2 al pin analógico A0.',
    xp: 80,
    placa: [
      { id: 'POT1', tipo: 'POT', pins: { '1': 'f18a', '2': 'f20a', '3': 'f22a' } }
    ],
    pistas: ['Las patas 1 y 3 son los extremos de la resistencia interna del potenciómetro.', 'La pata 2 es el cursor (wiper): su voltaje varía entre 0 y 5V al girar.', 'POT1.2 va a A0 para que el Arduino pueda leer ese voltaje variable.'],
    aprender: '<h3>Un divisor de voltaje con perilla</h3><p>El potenciómetro es un divisor de voltaje cuyo punto medio se mueve. Entre la pata 1 y la 3 hay una pista resistiva; el cursor (pata 2) la toca en algún punto. Si 1 está a 5V y 3 a GND, el cursor entrega un voltaje entre 0 y 5V según la posición.</p><h3>Uso típico con Arduino</h3><p>Extremos a los rieles (o al pin 3V3 para leer hasta 3.3V) y el cursor a una entrada analógica. A0 mide ese valor y lo convierte en un número de 0 a 1023. En la protoboard, las tres patas del pot ocupan tres filas distintas: verificá que la pata 2 quede en su fila y no se corra una posición.</p>',
    ver: '<h3>Conexiones correctas</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, POT1.1)\nconectar(POT1.2, A0)\nconectar(POT1.3, riel-)</code></pre><p>Extremos a los rieles y cursor a A0: el Arduino lee el voltaje de la perilla.</p>',
    detectar: '<h3>Cursor pegado al riel+</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, POT1.1)\nconectar(POT1.2, riel+)\nconectar(POT1.3, riel-)</code></pre><p>Si el cursor va al riel+, A0 nunca lee nada variable. ¿A qué pin analógico debe ir POT1.2?</p>',
    reparar: {
      codigoInicial: 'alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, POT1.1)\nconectar(POT1.2, riel+)\nconectar(POT1.3, riel-)',
      validar: function (out, code) {
        var errores = [];
        if (!/alimentar\(5V,\s*riel\+\)/.test(code)) errores.push('alimentar riel+ con 5V');
        if (!/alimentar\(GND,\s*riel-\)/.test(code)) errores.push('alimentar riel- con GND');
        if (!/conectar\(riel\+,\s*POT1\.1\)/.test(code)) errores.push('conectar el riel+ al extremo POT1.1');
        if (!/conectar\(POT1\.2,\s*A0\)/.test(code)) errores.push('conectar la salida del cursor POT1.2 al pin A0');
        if (!/conectar\(POT1\.3,\s*riel-\)/.test(code)) errores.push('conectar el extremo POT1.3 al riel-');
        if (/conectar\(POT1\.2,\s*riel\+\)|conectar\(riel\+,\s*POT1\.2\)/.test(code)) errores.push('el cursor no va al riel+: POT1.2 es la SALIDA y debe ir a A0');
        if (/conectar\(riel\+,\s*riel-\)|conectar\(riel-,\s*riel\+\)/.test(code)) errores.push('CORTOCIRCUITO: riel+ directo a riel-');
        if (errores.length > 0) return { ok: false, exp: (errores.length === 1 ? 'Falta: ' : 'Errores: ') + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Recorrido del voltaje variable</h3><p>La corriente entra por POT1.1 desde el riel+, atraviesa la pista resistiva y sale por POT1.3 al riel-. Esa es la rama principal. El cursor POT1.2 "toca" la pista en un punto intermedio: entrega el voltaje de ese punto a A0. Al girar la perilla, el punto de contacto se desplaza y A0 ve desde 0V (todo al lado de riel-) hasta 5V (todo al lado de riel+). Sin los dos extremos alimentados, el cursor no tiene nada que muestrear.</p><pre><code>riel+ ─► POT1.1 ══pista resistiva══ POT1.3 ─► riel-\n                    ▲\n                 POT1.2 (cursor) ─► A0</code></pre>'
  },
  {
    id: 'm7-14', mundo: 7, titulo: 'Divisor de voltaje en la protoboard',
    historia: 'El sensor del taller entrega 5V pero el pin analógico solo debe recibir la mitad. Con dos resistencias en serie armás un divisor de voltaje: la salida está en el punto medio.',
    objetivo: 'Armar el divisor: riel+ → R1.p1; R1.p2 → R2.p1 (y desde ese punto medio, R1.p2 → A0); R2.p2 → riel-.',
    xp: 80,
    placa: [
      { id: 'R1', tipo: 'R', pins: { p1: 'f5a', p2: 'f7a' } },
      { id: 'R2', tipo: 'R', pins: { p1: 'f7b', p2: 'f9b' } }
    ],
    pistas: ['El divisor es R1 arriba y R2 abajo, encadenados en serie.', 'La salida del divisor es el punto medio entre R1.p2 y R2.p1.', 'Conectá ese punto medio a A0 con un jumper extra.'],
    aprender: '<h3>Cómo funciona el divisor</h3><p>Dos resistencias en serie dividen el voltaje entre ellas en proporción a su valor. Con R1 = R2, el punto medio entrega exactamente la mitad: 2.5V si el riel+ tiene 5V. La fórmula es Vout = Vin × R2/(R1+R2).</p><h3>Armarlo en la protoboard</h3><p>R1.p2 y R2.p1 comparten una fila: esa fila es el punto medio. A esa MISMA fila conectás el jumper que lleva la señal a A0. Fijate que R2.p2 sí vuelve al riel-: si R2 queda flotando, no hay divisor y A0 vería los 5V completos.</p>',
    ver: '<h3>Conexiones correctas</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, R1.p1)\nconectar(R1.p2, R2.p1)\nconectar(R1.p2, A0)\nconectar(R2.p2, riel-)</code></pre><p>El punto medio (fila de R1.p2/R2.p1) entrega la mitad del voltaje a A0.</p>',
    detectar: '<h3>Salida sin derivar a A0</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, R1.p1)\nconectar(R1.p2, R2.p1)\nconectar(R2.p2, riel-)</code></pre><p>El divisor está armado pero el Arduino no lee nada: ¿de qué punto debe salir el cable hacia A0?</p>',
    reparar: {
      codigoInicial: 'alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, R1.p1)\nconectar(R1.p2, R2.p1)\nconectar(R2.p2, riel-)',
      validar: function (out, code) {
        var errores = [];
        if (!/alimentar\(5V,\s*riel\+\)/.test(code)) errores.push('alimentar riel+ con 5V');
        if (!/alimentar\(GND,\s*riel-\)/.test(code)) errores.push('alimentar riel- con GND');
        if (!/conectar\(riel\+,\s*R1\.p1\)/.test(code)) errores.push('conectar el riel+ a R1.p1 (extremo superior del divisor)');
        if (!/conectar\(R1\.p2,\s*R2\.p1\)/.test(code)) errores.push('encadenar R1.p2 con R2.p1 (punto medio)');
        if (!/conectar\(R1\.p2,\s*A0\)/.test(code)) errores.push('derivar el punto medio (R1.p2) al pin A0');
        if (!/conectar\(R2\.p2,\s*riel-\)/.test(code)) errores.push('conectar R2.p2 al riel- (extremo inferior del divisor)');
        if (/conectar\(A0,\s*riel\+\)|conectar\(riel\+,\s*A0\)/.test(code)) errores.push('CUIDADO: A0 directo al riel+ recibe 5V completos, sin dividir');
        if (/conectar\(riel\+,\s*riel-\)|conectar\(riel-,\s*riel\+\)/.test(code)) errores.push('CORTOCIRCUITO: riel+ directo a riel-');
        if (errores.length > 0) return { ok: false, exp: (errores.length === 1 ? 'Falta: ' : 'Errores: ') + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>El punto medio manda</h3><p>La corriente sale del riel+, pasa por R1, sigue por R2 y vuelve al riel-. Esa rama permanente es el divisor. A0 NO consume corriente significativa: solo "mira" el voltaje del punto medio entre R1.p2 y R2.p1. Por eso el jumper a A0 se deriva de esa fila sin romper el divisor. Si R2.p2 se queda sin conectar al riel-, la rama inferior se abre y A0 flota con lecturas erráticas.</p><pre><code>riel+ ─► R1 ─┬─► A0  (solo mide)\n            R2\nriel- ◄─────┘</code></pre>'
  },
  {
    id: 'm7-15', mundo: 7, titulo: 'Botón con pull-down',
    historia: 'El botón del taller debe enviar HIGH al pin D2 solo cuando se presiona. Sin una resistencia pull-down, el pin queda flotando cuando el botón está suelto y lee valores aleatorios.',
    objetivo: 'Armar el botón con pull-down: riel+ → BTN1.1; BTN1.2 → D2; BTN1.2 también → R1.p1 (comparten fila); R1.p2 → riel-.',
    xp: 82,
    placa: [
      { id: 'BTN1', tipo: 'BTN', pins: { '1': 'f13a', '2': 'f14a' } },
      { id: 'R1', tipo: 'R', pins: { p1: 'f14b', p2: 'f16b' } }
    ],
    pistas: ['La resistencia pull-down va del PIN a GND, "tirando" el pin a LOW cuando el botón está suelto.', 'El botón conecta 5V al pin D2 solo al presionarse.', 'R1 debe compartir fila con BTN1.2 y D2, y su otra pata va al riel-.'],
    aprender: '<h3>El pin que flota</h3><p>Un pin digital en modo entrada sin nada conectado está en el aire eléctrico: capta ruido y alterna entre HIGH y LOW sin motivo. La resistencia pull-down (típicamente 10 kΩ) lo "amarra" a GND: en reposo lee LOW con firmeza.</p><h3>¿Cómo trabaja el botón?</h3><p>BTN1.1 está a 5V (riel+). BTN1.2 comparte fila con D2 y con R1. Mientras no se presiona, R1 tira BTN1.2 a GND → D2 lee LOW. Al presionar, BTN1 conecta 5V directo a BTN1.2: vence a la resistencia (casi sin corriente) y D2 lee HIGH. Lógica: LOW en reposo, HIGH al presionar.</p>',
    ver: '<h3>Conexiones correctas</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, BTN1.1)\nconectar(BTN1.2, D2)\nconectar(BTN1.2, R1.p1)\nconectar(R1.p2, riel-)</code></pre><p>La resistencia R1 va del pin (vía BTN1.2) al riel-: eso es pull-down.</p>',
    detectar: '<h3>Sin resistencia pull-down</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, BTN1.1)\nconectar(BTN1.2, D2)</code></pre><p>Cuando el botón está suelto, D2 no tiene ningún camino a GND ni a 5V. ¿Qué estado lee entonces el pin?</p>',
    reparar: {
      codigoInicial: 'alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, BTN1.1)\nconectar(BTN1.2, D2)',
      validar: function (out, code) {
        var errores = [];
        if (!/alimentar\(5V,\s*riel\+\)/.test(code)) errores.push('alimentar riel+ con 5V');
        if (!/alimentar\(GND,\s*riel-\)/.test(code)) errores.push('alimentar riel- con GND');
        if (!/conectar\(riel\+,\s*BTN1\.1\)/.test(code)) errores.push('conectar el riel+ a BTN1.1');
        if (!/conectar\(BTN1\.2,\s*D2\)/.test(code)) errores.push('conectar BTN1.2 al pin D2');
        if (!/conectar\(BTN1\.2,\s*R1\.p1\)/.test(code)) errores.push('conectar BTN1.2 a R1.p1 (la resistencia comparte la fila del pin)');
        if (!/conectar\(R1\.p2,\s*riel-\)/.test(code)) errores.push('conectar R1.p2 al riel- (pull-down)');
        if (/conectar\(BTN1\.2,\s*riel\+\)|conectar\(riel\+,\s*BTN1\.2\)/.test(code)) errores.push('BTN1.2 no va al riel+: ahí debe salir la señal hacia D2 y R1');
        if (/conectar\(riel\+,\s*riel-\)|conectar\(riel-,\s*riel\+\)/.test(code)) errores.push('CORTOCIRCUITO: riel+ directo a riel-');
        if (errores.length > 0) return { ok: false, exp: (errores.length === 1 ? 'Falta: ' : 'Errores: ') + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Dos estados, un solo botón</h3><p>En reposo: BTN1.1 está en 5V pero el botón está abierto; D2 solo tiene R1 hacia el riel-, así que R1 lo mantiene en LOW. Al presionar: BTN1 cierra y une 5V con BTN1.2/D2; la corriente por R1 es mínima (5V/10kΩ = 0.5 mA) pero el voltaje en D2 salta a HIGH. R1 existe para darle al pin un estado definido en los dos casos: sin ella, en reposo D2 flotaría.</p><pre><code>suelto:  riel+ ─(BTN abierto)─  x   D2 ─► R1 ─► riel-   → LOW\npresion.: riel+ ─(BTN cerrado)───► D2 ─► R1 ─► riel-   → HIGH</code></pre>'
  },
  {
    id: 'm7-16', mundo: 7, titulo: 'Botón con pull-up',
    historia: 'Para este panel la lógica se invierte: el botón debe leer HIGH en reposo y LOW al presionarse (es la lógica que usa INPUT_PULLUP en el Arduino). Armá la resistencia pull-up externa.',
    objetivo: 'Armar el botón con pull-up: riel+ → R1.p1; R1.p2 → D2; D2 → BTN1.1; BTN1.2 → riel-. La lectura en D2 es HIGH por defecto y LOW al presionar.',
    xp: 82,
    placa: [
      { id: 'R1', tipo: 'R', pins: { p1: 'f5a', p2: 'f7a' } },
      { id: 'BTN1', tipo: 'BTN', pins: { '1': 'f7b', '2': 'f8b' } }
    ],
    pistas: ['La resistencia pull-up va del PIN al positivo, no al GND.', 'El botón lleva el pin a tierra al presionarse.', 'R1.p2 y BTN1.1 comparten la fila de D2.'],
    aprender: '<h3>Pull-up: el espejo del pull-down</h3><p>En el pull-up, la resistencia conecta D2 al riel+: en reposo "tira" del pin hacia HIGH. El botón, en cambio, va entre D2 y riel-: al presionarlo, lleva el pin a LOW venciendo a la resistencia (la corriente por R1 es mínima). Es la configuración más usada con INPUT_PULLUP porque los botones normalmente conectan a tierra.</p><h3>Lógica invertida</h3><p>Ojo con el software: ahora presionado = LOW y suelto = HIGH. Programás if (digitalRead(D2) == LOW) para detectar la pulsación.</p>',
    ver: '<h3>Conexiones correctas</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, R1.p1)\nconectar(R1.p2, D2)\nconectar(D2, BTN1.1)\nconectar(BTN1.2, riel-)</code></pre><p>R1 tira D2 al riel+ (pull-up) y el botón lo lleva al riel- al presionarse.</p>',
    detectar: '<h3>Pull-up cableado como pull-down</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(R1.p1, D2)\nconectar(R1.p2, riel-)\nconectar(D2, BTN1.1)\nconectar(BTN1.2, riel-)</code></pre><p>R1 quedó entre D2 y riel-, eso es pull-down. ¿De qué lado debería estar el 5V de la resistencia pull-up?</p>',
    reparar: {
      codigoInicial: 'alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(R1.p1, D2)\nconectar(R1.p2, riel-)\nconectar(D2, BTN1.1)\nconectar(BTN1.2, riel-)',
      validar: function (out, code) {
        var errores = [];
        if (!/alimentar\(5V,\s*riel\+\)/.test(code)) errores.push('alimentar riel+ con 5V');
        if (!/alimentar\(GND,\s*riel-\)/.test(code)) errores.push('alimentar riel- con GND');
        if (!/conectar\(riel\+,\s*R1\.p1\)/.test(code)) errores.push('conectar el riel+ a R1.p1 (extremo del pull-up)');
        if (!/conectar\(R1\.p2,\s*D2\)/.test(code)) errores.push('conectar R1.p2 al pin D2');
        if (!/conectar\(D2,\s*BTN1\.1\)/.test(code)) errores.push('conectar D2 a BTN1.1');
        if (!/conectar\(BTN1\.2,\s*riel-\)/.test(code)) errores.push('conectar BTN1.2 al riel- (el botón lleva el pin a tierra)');
        if (/conectar\(R1\.p2,\s*riel-\)/.test(code)) errores.push('con R1.p2 al riel- eso sería PULL-DOWN; el pull-up va a riel+');
        if (/conectar\(riel\+,\s*riel-\)|conectar\(riel-,\s*riel\+\)/.test(code)) errores.push('CORTOCIRCUITO: riel+ directo a riel-');
        if (errores.length > 0) return { ok: false, exp: (errores.length === 1 ? 'Falta: ' : 'Errores: ') + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Quién tira y quién lleva a tierra</h3><p>R1 está entre riel+ y D2: le entrega una corriente chiquita que mantiene el pin en HIGH. BTN1.2 está en riel-, y BTN1.1 comparte fila con D2: al presionar, el botón une D2 con tierra y el pin cae a LOW. La resistencia limita la corriente que va del 5V al GND en esa pulsación (0.5 mA). Por eso D2 tiene DOS cables: uno de R1.p2 (su estado en reposo) y otro de BTN1.1 (su estado al presionar).</p><pre><code>riel+ ─► R1 ─┬─► D2 ─► BTN1.1 ══ BTN1.2 ─► riel- (al presionar)\n            HIGH en reposo, LOW al pulsar</code></pre>'
  },
  {
    id: 'm7-17', mundo: 7, titulo: 'LDR: el sensor de luz',
    historia: 'El LDR del taller cambia su resistencia con la luz. Para que el Arduino lo pueda leer, hay que convertir ese cambio de resistencia en un cambio de voltaje: hace falta un divisor de voltaje con una resistencia fija.',
    objetivo: 'Armar el divisor con LDR: riel+ → LDR1.p1; LDR1.p2 → A0 (salida); LDR1.p2 → R1.p1 (la resistencia de bajada); R1.p2 → riel-.',
    xp: 85,
    placa: [
      { id: 'LDR1', tipo: 'LDR', pins: { p1: 'f15c', p2: 'f16c' } },
      { id: 'R1', tipo: 'R', pins: { p1: 'f16d', p2: 'f18d' } }
    ],
    pistas: ['El LDR y R1 forman un divisor de voltaje variable.', 'La salida del divisor es LDR1.p2: de ahí sale el cable a A0.', 'Con luz alta, la resistencia del LDR baja y el voltaje en A0 sube.'],
    aprender: '<h3>Del cambio de resistencia al voltaje</h3><p>El Arduino no mide resistencias: mide voltajes. Para leer el LDR hay que ponerlo en serie con una resistencia fija entre riel+ y riel-: eso forma un divisor. La resistencia del LDR baja con mucha luz (pocos Ω) y sube con oscuridad (miles de Ω). El punto medio entre LDR1.p2 y R1.p1 se mueve junto con ella.</p><h3>Sentido de lectura</h3><p>Con el LDR arriba y R1 abajo: mucha luz → LDR en baja resistencia → A0 cerca de 5V; oscuridad → LDR en alta resistencia → A0 cerca de 0V. Acordate de esto al programar los umbrales.</p>',
    ver: '<h3>Conexiones correctas</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, LDR1.p1)\nconectar(LDR1.p2, A0)\nconectar(LDR1.p2, R1.p1)\nconectar(R1.p2, riel-)</code></pre><p>El punto medio (LDR1.p2 / R1.p1) entrega un voltaje variable a A0.</p>',
    detectar: '<h3>Sin resistencia de bajada</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, LDR1.p1)\nconectar(LDR1.p2, A0)</code></pre><p>Sin R1 hacia el riel-, no hay divisor: el voltaje de A0 no varía con la luz. ¿Dónde falta conectar R1?</p>',
    reparar: {
      codigoInicial: 'alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, LDR1.p1)\nconectar(LDR1.p2, A0)',
      validar: function (out, code) {
        var errores = [];
        if (!/alimentar\(5V,\s*riel\+\)/.test(code)) errores.push('alimentar riel+ con 5V');
        if (!/alimentar\(GND,\s*riel-\)/.test(code)) errores.push('alimentar riel- con GND');
        if (!/conectar\(riel\+,\s*LDR1\.p1\)/.test(code)) errores.push('conectar el riel+ a LDR1.p1 (extremo superior del divisor)');
        if (!/conectar\(LDR1\.p2,\s*A0\)/.test(code)) errores.push('derivar LDR1.p2 al pin A0');
        if (!/conectar\(LDR1\.p2,\s*R1\.p1\)/.test(code)) errores.push('conectar LDR1.p2 a R1.p1 (punto medio del divisor)');
        if (!/conectar\(R1\.p2,\s*riel-\)/.test(code)) errores.push('conectar R1.p2 al riel- (resistencia de bajada)');
        if (/conectar\(A0,\s*riel\+\)|conectar\(riel\+,\s*A0\)/.test(code)) errores.push('A0 directo al riel+ no mide nada variable');
        if (/conectar\(riel\+,\s*riel-\)|conectar\(riel-,\s*riel\+\)/.test(code)) errores.push('CORTOCIRCUITO: riel+ directo a riel-');
        if (errores.length > 0) return { ok: false, exp: (errores.length === 1 ? 'Falta: ' : 'Errores: ') + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>El divisor que respira con la luz</h3><p>La corriente recorre: riel+ → LDR1 → R1 → riel-. Esa rama siempre está cerrada. A0 se deriva de la fila común LDR1.p2/R1.p1 y solo mide el voltaje de ese punto, sin robarle corriente. Cuando alguien tapa el LDR, su resistencia sube y "patea" el punto medio hacia 0V; con luz plena, baja y lo empuja hacia 5V. Ambos cables del punto medio (a A0 y a R1.p1) son necesarios: uno para medir, el otro para cerrar la rama del divisor.</p><pre><code>riel+ ─► LDR1 ─┬─► A0\n              R1\nriel- ◄───────┘</code></pre>'
  },
  {
    id: 'm7-18', mundo: 7, titulo: 'Transistor como interruptor',
    historia: 'El buzzer del taller necesita más corriente de la que puede dar un pin del Arduino. Usá un transistor NPN como interruptor electrónico: un pin chico manda, y la carga grande pasa por el colector.',
    objetivo: 'Armar el interruptor: D9 → R1.p1 (resistencia de base); R1.p2 → Q1.B; riel+ → BUZ1.p1; BUZ1.p2 → Q1.C (la carga entra al colector); Q1.E → riel-.',
    xp: 85,
    placa: [
      { id: 'R1', tipo: 'R', pins: { p1: 'f20c', p2: 'f22c' } },
      { id: 'Q1', tipo: 'Q', pins: { B: 'f22d', C: 'f24d', E: 'f26d' } },
      { id: 'BUZ1', tipo: 'BUZ', pins: { p1: 'f23e', p2: 'f24e' } }
    ],
    pistas: ['La base (B) del transistor se controla SIEMPRE a través de una resistencia que limita la corriente.', 'La carga (buzzer) va entre riel+ y el colector (C).', 'El emisor (E) va directo al riel-.'],
    aprender: '<h3>Un pin que gobierna una carga grande</h3><p>El pin D9 no puede alimentar un buzzer de 30 mA cómodamente, y menos un motor. Pero puede mandar unos pocos mA a la base de un transistor NPN. Cuando la base recibe corriente, el transistor "cierra" entre colector y emisor y la carga conectada al colector fluye al riel-.</p><h3>Las tres patas</h3><p>B (base) = control, protegida por R1. C (colector) = entrada de la carga. E (emisor) = salida a tierra. NUNCA conectes la base directo al pin (se quema el pin o el transistor), ni une C y E sin carga (sería un corto cuando el transistor abre).</p>',
    ver: '<h3>Conexiones correctas</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(D9, R1.p1)\nconectar(R1.p2, Q1.B)\nconectar(riel+, BUZ1.p1)\nconectar(BUZ1.p2, Q1.C)\nconectar(Q1.E, riel-)</code></pre><p>D9 manda por R1 a la base; el buzzer fluye de riel+ a colector y sale por emisor a riel-.</p>',
    detectar: '<h3>Base sin resistencia</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(D9, Q1.B)\nconectar(riel+, BUZ1.p1)\nconectar(BUZ1.p2, Q1.C)\nconectar(Q1.E, riel-)</code></pre><p>La base está pegada directo al pin. ¿Qué componente limita la corriente de la base?</p>',
    reparar: {
      codigoInicial: 'alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(D9, Q1.B)\nconectar(riel+, BUZ1.p1)\nconectar(BUZ1.p2, Q1.C)\nconectar(Q1.E, riel-)',
      validar: function (out, code) {
        var errores = [];
        if (!/alimentar\(5V,\s*riel\+\)/.test(code)) errores.push('alimentar riel+ con 5V');
        if (!/alimentar\(GND,\s*riel-\)/.test(code)) errores.push('alimentar riel- con GND');
        if (!/conectar\(D9,\s*R1\.p1\)/.test(code)) errores.push('conectar D9 a R1.p1 (la resistencia de base va primero)');
        if (!/conectar\(R1\.p2,\s*Q1\.B\)/.test(code)) errores.push('conectar R1.p2 a la base Q1.B');
        if (!/conectar\(riel\+,\s*BUZ1\.p1\)/.test(code)) errores.push('alimentar el buzzer desde el riel+');
        if (!/conectar\(BUZ1\.p2,\s*Q1\.C\)/.test(code)) errores.push('conectar la salida del buzzer al colector Q1.C');
        if (!/conectar\(Q1\.E,\s*riel-\)/.test(code)) errores.push('conectar el emisor Q1.E al riel-');
        if (/conectar\(D9,\s*Q1\.B\)/.test(code)) errores.push('FALTA LA RESISTENCIA: la base no va directo al pin, pasá por R1');
        if (/conectar\(Q1\.C,\s*Q1\.E\)|conectar\(Q1\.E,\s*Q1\.C\)/.test(code)) errores.push('CORTOCIRCUITO interno: colector y emisor no se unen sin carga');
        if (/conectar\(riel\+,\s*riel-\)|conectar\(riel-,\s*riel\+\)/.test(code)) errores.push('CORTOCIRCUITO: riel+ directo a riel-');
        if (errores.length > 0) return { ok: false, exp: (errores.length === 1 ? 'Falta: ' : 'Errores: ') + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Control por un lado, carga por el otro</h3><p>El circuito de control: D9 → R1 → base → emisor → riel-. Pocos mA aquí abren "la puerta" entre C y E. El circuito de carga: riel+ → buzzer → colector → emisor → riel-. Esa corriente grande NUNCA pasa por el Arduino: el transistor la toma del riel+ y la devuelve al riel-. R1 existe porque la base-es emisor es un diodo: sin resistencia, D9 intentaría poner 5V sobre esa unión y se quemaría.</p><pre><code>control:  D9 ─► R1 ─► Q1.B   (pocos mA)\ncarga:   riel+ ─► BUZ1 ─► Q1.C ▶ Q1.E ─► riel-   (decenas de mA)</code></pre>'
  },
  {
    id: 'm7-19', mundo: 7, titulo: 'Módulo relé',
    historia: 'Necesitás que el Arduino encienda una lámpara de 220V del taller de forma segura. El módulo relé aísla esa carga: vos solo controlás su pin IN desde un pin digital.',
    objetivo: 'Alimentar los rieles y conectar: D7 → RLY1.IN, riel+ → RLY1.VCC y riel- → RLY1.GND. Nunca alimentes IN directo desde el riel+.',
    xp: 88,
    placa: [
      { id: 'RLY1', tipo: 'RLY', pins: { IN: 'f28a', VCC: 'f29a', GND: 'f30a' } }
    ],
    pistas: ['El módulo relé necesita su propia alimentación: VCC y GND a los rieles.', 'El pin IN se conecta a un pin digital del Arduino (D7).', 'IN directo a riel+ dejaría el relé activado sin control del programa.'],
    aprender: '<h3>Cómo se alimenta un módulo</h3><p>Los módulos de relé traen tres bornes de control: VCC (alimentación de la bobina y la electrónica del módulo, 5V), GND (retorno común) e IN (señal de mando desde el Arduino). VCC y GND van a los rieles como cualquier componente: la energía del relé sale del riel, no del pin de señal.</p><h3>El pin IN es una señal, no una fuente</h3><p>IN solo recibe un nivel HIGH/LOW del pin digital para decidir si abre o cierra el contacto de la lámpara. Si lo pegás al riel+, el relé queda activado todo el tiempo y el Arduino pierde el control. El cable correcto es D7 → RLY1.IN.</p>',
    ver: '<h3>Conexiones correctas</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(D7, RLY1.IN)\nconectar(riel+, RLY1.VCC)\nconectar(riel-, RLY1.GND)</code></pre><p>VCC y GND del módulo a los rieles; el mando, desde D7 al pin IN.</p>',
    detectar: '<h3>IN alimentado desde el riel+</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, RLY1.IN)\nconectar(riel+, RLY1.VCC)\nconectar(riel-, RLY1.GND)</code></pre><p>Con IN en riel+, el relé queda activado sin que el Arduino decida nada. ¿De qué pin debería venir la señal de mando?</p>',
    reparar: {
      codigoInicial: 'alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, RLY1.IN)\nconectar(riel+, RLY1.VCC)\nconectar(riel-, RLY1.GND)',
      validar: function (out, code) {
        var errores = [];
        if (!/alimentar\(5V,\s*riel\+\)/.test(code)) errores.push('alimentar riel+ con 5V');
        if (!/alimentar\(GND,\s*riel-\)/.test(code)) errores.push('alimentar riel- con GND');
        if (!/conectar\(D7,\s*RLY1\.IN\)/.test(code)) errores.push('conectar el pin D7 al IN del relé');
        if (!/conectar\(riel\+,\s*RLY1\.VCC\)/.test(code)) errores.push('alimentar RLY1.VCC desde el riel+');
        if (!/conectar\(riel-,\s*RLY1\.GND\)/.test(code)) errores.push('conectar RLY1.GND al riel-');
        if (/conectar\(riel\+,\s*RLY1\.IN\)|conectar\(RLY1\.IN,\s*riel\+\)/.test(code)) errores.push('IN directo al riel+: el relé quedaría sin control, mandá la señal desde D7');
        if (/conectar\(riel\+,\s*riel-\)|conectar\(riel-,\s*riel\+\)/.test(code)) errores.push('CORTOCIRCUITO: riel+ directo a riel-');
        if (errores.length > 0) return { ok: false, exp: (errores.length === 1 ? 'Falta: ' : 'Errores: ') + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Tres cables, dos mundos</h3><p>El riel+ entrega 5V a RLY1.VCC: alimenta la bobina y el optoacoplador interno. RLY1.GND vuelve al riel-: cerramos el consumo del módulo. D7 → RLY1.IN es el mando: cuando el programa pone D7 en HIGH (o LOW, según el módulo), la electrónica interna decide cerrar o abrir el contacto de 220V. El Arduino jamás toca esa alta tensión: solo maneja la señal de IN.</p><pre><code>Arduino D7 ─► IN (señal)\nriel+ ─► VCC (bobina)    riel- ─► GND (retorno)</code></pre>'
  },
  {
    id: 'm7-20', mundo: 7, titulo: 'Integrado cruzando el canal',
    historia: 'Vas a montar un integrado DIP sobre la protoboard. Su cuerpo cruza la canal central a propósito: las patas de la izquierda (filas a–e) y las de la derecha (f–j) NO se tocan entre sí.',
    objetivo: 'Montar IC1 sobre la canal. Alimentación: riel+ → f5f → IC1.p8 (VCC) e IC1.p4 → riel-. Señal de entrada: D6 → f2a → IC1.p2. Salida: IC1.p7 → R1.p1, R1.p2 → LED1.A, LED1.K → riel-.',
    xp: 88,
    placa: [
      { id: 'IC1', tipo: 'IC', pins: { p1: 'f1c', p2: 'f2c', p3: 'f3c', p4: 'f4c', p5: 'f8g', p6: 'f7g', p7: 'f6g', p8: 'f5g' } },
      { id: 'R1', tipo: 'R', pins: { p1: 'f6h', p2: 'f10h' } },
      { id: 'LED1', tipo: 'LED', pins: { A: 'f10i', K: 'f12i' } }
    ],
    pistas: ['El integrado se apoya con la muesca hacia la izquierda, atravesando la canal.', 'Cada pata cae en una fila distinta: traé los jumpers a esas filas (f5f para VCC, f2a para la entrada).', 'La entrada entra por la pata 2 y la salida sale por la pata 7, del lado opuesto.'],
    aprender: '<h3>Por qué el integrado cruza la canal</h3><p>Los chips DIP tienen las patas enfrentadas en dos filas separadas unos 7.62 mm, exactamente el ancho de la canal central de la protoboard. Al clavarlo ahí, cada pata ocupa una fila y ninguna se corta con la del otro lado: p1 y p8 quedan en filas distintas aunque estén "una enfrente de la otra".</p><h3>Traer señales con jumpers</h3><p>Las patas no se conectan cables directamente: cada una está soldada a su fila. Vos llevás la señal con jumpers hasta ESA fila (por ejemplo f5f para VCC y f2a para la entrada). Son los "cables de servicio" del integrado.</p>',
    ver: '<h3>Conexiones correctas</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, f5f)\nconectar(f5f, IC1.p8)\nconectar(IC1.p4, riel-)\nconectar(D6, f2a)\nconectar(f2a, IC1.p2)\nconectar(IC1.p7, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, riel-)</code></pre><p>Cada pata recibe su jumper en su fila: alimentación por f5f, entrada por f2a, salida hacia el LED.</p>',
    detectar: '<h3>Jumpers que no llegan a las filas</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, IC1.p8)\nconectar(IC1.p4, riel-)\nconectar(D6, IC1.p2)\nconectar(IC1.p7, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, riel-)</code></pre><p>Cada pata del integrado vive en una fila. ¿A qué filas deben llegar los jumpers de alimentación (f5f) y de entrada (f2a)?</p>',
    reparar: {
      codigoInicial: 'alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, IC1.p8)\nconectar(IC1.p4, riel-)\nconectar(D6, IC1.p2)\nconectar(IC1.p7, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, riel-)',
      validar: function (out, code) {
        var errores = [];
        if (!/alimentar\(5V,\s*riel\+\)/.test(code)) errores.push('alimentar riel+ con 5V');
        if (!/alimentar\(GND,\s*riel-\)/.test(code)) errores.push('alimentar riel- con GND');
        if (!/conectar\(riel\+,\s*f5f\)/.test(code)) errores.push('llevar el riel+ a la fila f5f (donde está la pata 8)');
        if (!/conectar\(f5f,\s*IC1\.p8\)/.test(code)) errores.push('conectar la fila f5f a IC1.p8 (VCC)');
        if (!/conectar\(IC1\.p4,\s*riel-\)/.test(code)) errores.push('conectar IC1.p4 (GND del chip) al riel-');
        if (!/conectar\(D6,\s*f2a\)/.test(code)) errores.push('llevar D6 a la fila f2a (donde está la pata 2)');
        if (!/conectar\(f2a,\s*IC1\.p2\)/.test(code)) errores.push('conectar la fila f2a a IC1.p2 (entrada)');
        if (!/conectar\(IC1\.p7,\s*R1\.p1\)/.test(code)) errores.push('conectar la salida IC1.p7 a R1.p1');
        if (!/conectar\(R1\.p2,\s*LED1\.A\)/.test(code)) errores.push('conectar R1.p2 al ánodo del LED');
        if (!/conectar\(LED1\.K,\s*riel-\)/.test(code)) errores.push('conectar el cátodo del LED al riel-');
        if (/conectar\(riel\+,\s*riel-\)|conectar\(riel-,\s*riel\+\)/.test(code)) errores.push('CORTOCIRCUITO: riel+ directo a riel-');
        if (errores.length > 0) return { ok: false, exp: (errores.length === 1 ? 'Falta: ' : 'Errores: ') + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Patas en filas opuestas</h3><p>IC1.p8 (VCC) está del lado derecho, en la fila 5f: el jumper del riel+ entra por f5f y la lámina entrega el 5V a la pata. IC1.p4 (GND) está del lado izquierdo: su jumper baja directo al riel-. La señal de D6 llega a f2a y de ahí a IC1.p2; el chip la procesa y la devuelve por IC1.p7, del lado derecho, que alimenta R1 y el LED. La canal central garantiza que la fila 2a y la 2f (pata opuesta) no se toquen: cada pata vive en su mundo.</p><pre><code>riel+ ─► f5f ─► p8 (VCC)     p4 ─► riel-\nD6 ─► f2a ─► p2 (entrada)   p7 ─► R1 ─► LED1 ─► riel-</code></pre>'
  },
  {
    id: 'm7-21', mundo: 7, titulo: 'LCD 16x2 en la protoboard',
    historia: 'La pantalla LCD del mostrador de TiendaVirtus necesita alimentación y seis cables de datos. Cada pino del LCD en su propia fila, sin apretar varios cables en un mismo agujero.',
    objetivo: 'Alimentar los rieles; riel+ → LCD1.VCC y riel- → LCD1.GND; datos: D5 → LCD1.RS, D4 → LCD1.EN, D11 → LCD1.D4, D10 → LCD1.D5, D9 → LCD1.D6, D8 → LCD1.D7.',
    xp: 90,
    placa: [
      { id: 'LCD1', tipo: 'LCD', pins: { VCC: 'f32f', GND: 'f33f', RS: 'f34f', EN: 'f35f', D4: 'f36f', D5: 'f37f', D6: 'f38f', D7: 'f39f' } }
    ],
    pistas: ['VCC y GND del LCD van a los rieles, como cualquier componente.', 'RS y EN son pines de control; D4 a D7 son los datos (modo 4 bits).', 'Cada conexión del LCD va en su fila: nada de forzar dos cables en un agujero.'],
    aprender: '<h3>Los pines del LCD 16x2</h3><p>El LCD tiene: VCC (5V) y GND para alimentarse, RS (registro: comando o dato), EN (enable: "latch" del dato) y los 8 pines de datos D0–D7 (en modo 4 bits solo se usan D4–D7). Cada pino del módulo está en una fila distinta de la placa, y vos llevas la señal con un jumper por fila.</p><h3>Orden impecable de cables</h3><p>Con 8 cables juntos, el desorden es peligroso: un cable cruzado puede llevar 5V a un pin de dato y quemar el LCD. Armá en orden: primero alimentación, después control (RS, EN) y al final los datos D4–D7. Cada fila, un solo cable: así podés auditar el cableado mirándolo.</p>',
    ver: '<h3>Conexiones correctas</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, LCD1.VCC)\nconectar(riel-, LCD1.GND)\nconectar(D5, LCD1.RS)\nconectar(D4, LCD1.EN)\nconectar(D11, LCD1.D4)\nconectar(D10, LCD1.D5)\nconectar(D9, LCD1.D6)\nconectar(D8, LCD1.D7)</code></pre><p>Alimentación a los rieles y seis jumpers de señal, cada uno en la fila de su pino.</p>',
    detectar: '<h3>Datos D6 y D7 sin conectar</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, LCD1.VCC)\nconectar(riel-, LCD1.GND)\nconectar(D5, LCD1.RS)\nconectar(D4, LCD1.EN)\nconectar(D11, LCD1.D4)\nconectar(D10, LCD1.D5)</code></pre><p>En modo 4 bits el LCD necesita los cuatro pines de datos. ¿Qué pines de datos quedaron sin cablear?</p>',
    reparar: {
      codigoInicial: 'alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, LCD1.VCC)\nconectar(riel-, LCD1.GND)\nconectar(D5, LCD1.RS)\nconectar(D4, LCD1.EN)\nconectar(D11, LCD1.D4)\nconectar(D10, LCD1.D5)',
      validar: function (out, code) {
        var errores = [];
        if (!/alimentar\(5V,\s*riel\+\)/.test(code)) errores.push('alimentar riel+ con 5V');
        if (!/alimentar\(GND,\s*riel-\)/.test(code)) errores.push('alimentar riel- con GND');
        if (!/conectar\(riel\+,\s*LCD1\.VCC\)/.test(code)) errores.push('alimentar LCD1.VCC desde el riel+');
        if (!/conectar\(riel-,\s*LCD1\.GND\)/.test(code)) errores.push('conectar LCD1.GND al riel-');
        if (!/conectar\(D5,\s*LCD1\.RS\)/.test(code)) errores.push('conectar D5 al pin RS del LCD');
        if (!/conectar\(D4,\s*LCD1\.EN\)/.test(code)) errores.push('conectar D4 al pin EN del LCD');
        if (!/conectar\(D11,\s*LCD1\.D4\)/.test(code)) errores.push('conectar D11 al pin D4 del LCD');
        if (!/conectar\(D10,\s*LCD1\.D5\)/.test(code)) errores.push('conectar D10 al pin D5 del LCD');
        if (!/conectar\(D9,\s*LCD1\.D6\)/.test(code)) errores.push('conectar D9 al pin D6 del LCD');
        if (!/conectar\(D8,\s*LCD1\.D7\)/.test(code)) errores.push('conectar D8 al pin D7 del LCD');
        if (/conectar\(riel\+,\s*riel-\)|conectar\(riel-,\s*riel\+\)/.test(code)) errores.push('CORTOCIRCUITO: riel+ directo a riel-');
        if (errores.length > 0) return { ok: false, exp: (errores.length === 1 ? 'Falta: ' : 'Errores: ') + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>El cableado completo del LCD</h3><p>La corriente del LCD entra por VCC desde el riel+ y vuelve por GND al riel-: eso lo manda vivo. Los otros seis cables no llevan corriente de potencia, llevan información: RS dice si el dato es un comando o un carácter, EN da el "pulso" que latchea, y D4–D7 transportan los 4 bits de cada carácter. Cada pino del módulo está en su fila; por eso cada jumper nace en un pin del Arduino y termina en la fila exacta de su pino del LCD.</p><pre><code>energía:  riel+ ─► VCC    GND ─► riel-\ncontrol:  D5 ─► RS   D4 ─► EN\ndatos:    D11 ─► D4  D10 ─► D5  D9 ─► D6  D8 ─► D7</code></pre>'
  },
  {
    id: 'm7-22', mundo: 7, titulo: 'Buzzer controlado por un pin',
    historia: 'El buzzer del timbre del taller debe sonar cuando el pin D10 lo activa. Traé el pin hasta la fila del buzzer con un jumper y usá esa fila como punto de unión.',
    objetivo: 'Alimentar los rieles; riel+ → BUZ1.p1; BUZ1.p2 → f10f; D10 → f10f. La fila f10f une el buzzer con el pin de control.',
    xp: 90,
    placa: [
      { id: 'BUZ1', tipo: 'BUZ', pins: { p1: 'f9h', p2: 'f10h' } }
    ],
    pistas: ['El buzzer recibe 5V por una pata y la señal de control por la otra.', 'Usá la fila 10 del lado derecho como punto de unión entre BUZ1.p2 y D10.', 'BUZ1.p2 y D10 deben terminar en la misma fila (f10f).'],
    aprender: '<h3>La fila como punto de unión</h3><p>Ya sabés que los agujeros f–j de una fila están unidos. Eso convierte a f10f en un nudo de cables: si enchufás ahí la pata del buzzer y el jumper de D10, ambos quedan elécticamente unidos. Es la técnica fundamental para repartir o jalar señales sin cables en T.</p><h3>Quién enciende al buzzer</h3><p>BUZ1.p1 está en riel+ (5V constante). El buzzer solo hace ruido cuando su otra pata encuentra camino a tierra. Ese camino lo habilita D10: en HIGH deja pasar la corriente, en LOW lo corta. El pin no alimenta al buzzer: solo autoriza el paso.</p>',
    ver: '<h3>Conexiones correctas</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, BUZ1.p1)\nconectar(BUZ1.p2, f10f)\nconectar(D10, f10f)</code></pre><p>La fila f10f une la salida del buzzer con D10: el pin controla el retorno del componente.</p>',
    detectar: '<h3>Buzzer pegado a tierra</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, BUZ1.p1)\nconectar(BUZ1.p2, riel-)</code></pre><p>Con BUZ1.p2 directo al riel-, el buzzer suena siempre y D10 no tiene ningún efecto. ¿Por dónde debería salir la señal de control?</p>',
    reparar: {
      codigoInicial: 'alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, BUZ1.p1)\nconectar(BUZ1.p2, riel-)',
      validar: function (out, code) {
        var errores = [];
        if (!/alimentar\(5V,\s*riel\+\)/.test(code)) errores.push('alimentar riel+ con 5V');
        if (!/alimentar\(GND,\s*riel-\)/.test(code)) errores.push('alimentar riel- con GND');
        if (!/conectar\(riel\+,\s*BUZ1\.p1\)/.test(code)) errores.push('alimentar BUZ1.p1 desde el riel+');
        if (!/conectar\(BUZ1\.p2,\s*f10f\)/.test(code)) errores.push('conectar BUZ1.p2 a la fila f10f');
        if (!/conectar\(D10,\s*f10f\)/.test(code)) errores.push('conectar D10 a la misma fila f10f (unir señal y buzzer)');
        if (/conectar\(BUZ1\.p2,\s*riel-\)/.test(code)) errores.push('BUZ1.p2 al riel- lo dejaría sonando siempre: D10 debe controlar ese camino');
        if (/conectar\(riel\+,\s*riel-\)|conectar\(riel-,\s*riel\+\)/.test(code)) errores.push('CORTOCIRCUITO: riel+ directo a riel-');
        if (errores.length > 0) return { ok: false, exp: (errores.length === 1 ? 'Falta: ' : 'Errores: ') + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>El retorno controlado</h3><p>El camino de la corriente del buzzer: riel+ → BUZ1.p1 → BUZ1.p2 → fila f10f → D10. Cuando D10 está en HIGH, el Arduino conecta internamente ese pin a 5V y no hay diferencia de voltaje: el buzzer se queda callado (ambos lados a 5V). Cuando D10 está en LOW, el pin se va a tierra y la corriente fluye por el buzzer: suena. La fila f10f existe porque es el punto donde el cable del componente y el jumper del pin se encuentran físicamente.</p><pre><code>riel+ ─► BUZ1 ─► f10f ◄─ jumper ─► D10   (D10 en LOW: suena)</code></pre>'
  },
  {
    id: 'm7-23', mundo: 7, titulo: 'Puntos de prueba y multímetro',
    historia: 'Para calibrar el sensor necesitás medir el voltaje del divisor con el multímetro, pero las puntas resbalan si tocás la pata del componente. La solución del taller: dejar puntos de prueba en filas libres.',
    objetivo: 'Armar el divisor riel+ → R1.p1, R1.p2 → R2.p1, R2.p2 → riel-; derivar la salida a la fila f20a (punto de prueba, con un agujero libre) y de f20a al pin A0.',
    xp: 92,
    placa: [
      { id: 'R1', tipo: 'R', pins: { p1: 'f5a', p2: 'f7a' } },
      { id: 'R2', tipo: 'R', pins: { p1: 'f7b', p2: 'f9b' } }
    ],
    pistas: ['Un punto de prueba es una fila con agujeros libres donde entra la punta del multímetro.', 'La salida del divisor (R1.p2) debe llegar primero a f20a.', 'De f20a, llevá la señal a A0: comparten fila, así que es el mismo punto.'],
    aprender: '<h3>¿Qué es un punto de prueba?</h3><p>Es una fila reservada donde solo entra un jumper del circuito y quedan agujeros libres. Ahí clavás la punta del multímetro sin tocar las patas de los componentes (que se salen con facilidad y provocan lecturas fantasma). Todo punto de prueba comparte fila con la señal que mide.</p><h3>Medir sin alterar</h3><p>El multímetro en voltímetro tiene altísima impedancia: apenas toma corriente, así que mide el punto medio del divisor sin desarmarlo. Si en cambio medieras directo entre R1.p2 y R2.p1 con puntas sueltas, podrías mover las patas y cambiar el circuito mientras medís.</p>',
    ver: '<h3>Conexiones correctas</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, R1.p1)\nconectar(R1.p2, R2.p1)\nconectar(R2.p2, riel-)\nconectar(R1.p2, f20a)\nconectar(f20a, A0)</code></pre><p>f20a es el punto de prueba: un extremo del jumper del divisor, con agujeros libres para las puntas.</p>',
    detectar: '<h3>Divisor sin punto de prueba</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, R1.p1)\nconectar(R1.p2, R2.p1)\nconectar(R2.p2, riel-)\nconectar(R1.p2, A0)</code></pre><p>La señal llega a A0 pero no queda ningún punto intermedio con agujeros libres para el multímetro. ¿Por qué fila conviene derivar la salida?</p>',
    reparar: {
      codigoInicial: 'alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, R1.p1)\nconectar(R1.p2, R2.p1)\nconectar(R2.p2, riel-)\nconectar(R1.p2, A0)',
      validar: function (out, code) {
        var errores = [];
        if (!/alimentar\(5V,\s*riel\+\)/.test(code)) errores.push('alimentar riel+ con 5V');
        if (!/alimentar\(GND,\s*riel-\)/.test(code)) errores.push('alimentar riel- con GND');
        if (!/conectar\(riel\+,\s*R1\.p1\)/.test(code)) errores.push('conectar el riel+ a R1.p1');
        if (!/conectar\(R1\.p2,\s*R2\.p1\)/.test(code)) errores.push('encadenar R1.p2 con R2.p1 (punto medio)');
        if (!/conectar\(R2\.p2,\s*riel-\)/.test(code)) errores.push('conectar R2.p2 al riel-');
        if (!/conectar\(R1\.p2,\s*f20a\)/.test(code)) errores.push('derivar la salida del divisor a la fila f20a (punto de prueba)');
        if (!/conectar\(f20a,\s*A0\)/.test(code)) errores.push('conectar el punto de prueba f20a al pin A0');
        if (/conectar\(A0,\s*riel\+\)|conectar\(riel\+,\s*A0\)/.test(code)) errores.push('A0 directo al riel+ no mide el divisor');
        if (/conectar\(riel\+,\s*riel-\)|conectar\(riel-,\s*riel\+\)/.test(code)) errores.push('CORTOCIRCUITO: riel+ directo a riel-');
        if (errores.length > 0) return { ok: false, exp: (errores.length === 1 ? 'Falta: ' : 'Errores: ') + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Un nudo para medir y para leer</h3><p>La fila de R1.p2/R2.p1 es el corazón del divisor. De esa fila nace un jumper hacia f20a: al compartir fila, f20a queda en el MISMO voltaje que el punto medio. Ahí entran las puntas del multímetro y también el jumper hacia A0. Es decir, medís exactamente lo que lee el Arduino, sin cableados extra que alteren la lectura. La corriente del divisor no se entera: sigue su rama R1 → R2 con destino riel-.</p><pre><code>riel+ ─► R1 ─┬─► f20a (puntas del multímetro)\n            R2 ─┬─► A0 (el Arduino mide lo mismo)\nriel- ◄───────┘</code></pre>'
  },
  {
    id: 'm7-24', mundo: 7, titulo: 'Tierra común',
    historia: 'El LED, el buzzer y el capacitor están en filas distintas del taller, pero todos sus retornos deben llegar al MISMO riel-. Si cada componente inventa su propia tierra, la corriente no encuentra el camino de vuelta.',
    objetivo: 'Alimentar los rieles y llevar TODOS los retornos al riel-: LED1.K → riel-, BUZ1.p2 → riel- y C1.p2 → riel-. Lado positivo: riel+ → R1.p1 → LED1.A, riel+ → BUZ1.p1, riel+ → C1.p1.',
    xp: 92,
    placa: [
      { id: 'R1', tipo: 'R', pins: { p1: 'f5a', p2: 'f7a' } },
      { id: 'LED1', tipo: 'LED', pins: { A: 'f7b', K: 'f9b' } },
      { id: 'BUZ1', tipo: 'BUZ', pins: { p1: 'f13h', p2: 'f14h' } },
      { id: 'C1', tipo: 'C', pins: { p1: 'f5c', p2: 'f9c' } }
    ],
    pistas: ['El riel- es la tierra común de todo el circuito.', 'Cada componente negativo necesita su propio cable hasta el riel-.', 'Ningún retorno puede quedarse "colgado" en una fila sin volver a riel-.'],
    aprender: '<h3>¿Qué es la tierra común?</h3><p>GND (riel-) es el punto de referencia al que vuelve TODA la corriente del circuito. No importa cuántos componentes tengas: todos comparten la misma tierra. Si el buzzer volviera a una fila suelta y no al riel-, su corriente no llegaría al GND del Arduino y no funcionaría, aunque el LED de al lado sí.</p><h3>Un riel, muchos retornos</h3><p>Por eso el riel- tiene tantos agujeros: es una barra común de retorno. Cada componente negativo clava su cable en cualquier agujero del riel- y queda unido a todos los demás. En proyectos grandes se usa riel- arriba y abajo, siempre comunicados, para no quedarse sin retornos.</p>',
    ver: '<h3>Conexiones correctas</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, riel-)\nconectar(riel+, BUZ1.p1)\nconectar(BUZ1.p2, riel-)\nconectar(riel+, C1.p1)\nconectar(C1.p2, riel-)</code></pre><p>Tres componentes, tres caminos de ida desde riel+ y TRES retornos al mismo riel-.</p>',
    detectar: '<h3>Retorno colgado</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, riel-)\nconectar(riel+, BUZ1.p1)\nconectar(BUZ1.p2, f30a)\nconectar(riel+, C1.p1)\nconectar(C1.p2, riel-)</code></pre><p>BUZ1.p2 terminó en f30a, una fila que no vuelve a ninguna parte. ¿Por dónde debe circular la corriente del buzzer para completar su circuito?</p>',
    reparar: {
      codigoInicial: 'alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, riel-)\nconectar(riel+, BUZ1.p1)\nconectar(BUZ1.p2, f30a)\nconectar(riel+, C1.p1)\nconectar(C1.p2, riel-)',
      validar: function (out, code) {
        var errores = [];
        if (!/alimentar\(5V,\s*riel\+\)/.test(code)) errores.push('alimentar riel+ con 5V');
        if (!/alimentar\(GND,\s*riel-\)/.test(code)) errores.push('alimentar riel- con GND');
        if (!/conectar\(riel\+,\s*R1\.p1\)/.test(code)) errores.push('conectar el riel+ a R1.p1');
        if (!/conectar\(R1\.p2,\s*LED1\.A\)/.test(code)) errores.push('conectar R1.p2 al ánodo del LED');
        if (!/conectar\(LED1\.K,\s*riel-\)/.test(code)) errores.push('volver del LED al riel- (LED1.K → riel-)');
        if (!/conectar\(riel\+,\s*BUZ1\.p1\)/.test(code)) errores.push('alimentar BUZ1.p1 desde el riel+');
        if (!/conectar\(BUZ1\.p2,\s*riel-\)/.test(code)) errores.push('volver del buzzer al riel- (BUZ1.p2 → riel-)');
        if (!/conectar\(riel\+,\s*C1\.p1\)/.test(code)) errores.push('conectar la patita (+) del capacitor al riel+');
        if (!/conectar\(C1\.p2,\s*riel-\)/.test(code)) errores.push('volver del capacitor al riel- (C1.p2 → riel-)');
        if (/conectar\((LED1\.K|BUZ1\.p2|C1\.p2),\s*riel\+\)/.test(code)) errores.push('los retornos van al riel-, nunca al riel+');
        if (/conectar\(riel\+,\s*riel-\)|conectar\(riel-,\s*riel\+\)/.test(code)) errores.push('CORTOCIRCUITO: riel+ directo a riel-');
        if (errores.length > 0) return { ok: false, exp: (errores.length === 1 ? 'Falta: ' : 'Errores: ') + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Tres circuitos, una sola tierra</h3><p>Cada componente es un circuito chico con su ida y su vuelta: LED (riel+ → R1 → LED1 → riel-), buzzer (riel+ → BUZ1 → riel-) y capacitor (riel+ → C1 → riel-). Lo que comparten es la VUELTA: el riel-, que está unido al pin GND del Arduino. La corriente de los tres se junta en esa barra común y regresa junta a la fuente. Por eso ningún retorno puede quedar en una fila suelta: sería un camino a ninguna parte.</p><pre><code>         ┌─► R1 ─► LED1 ─┐\nriel+ ───┼─► BUZ1 ────────┼─► riel- (tierra común) ─► Arduino GND\n         └─► C1 ──────────┘</code></pre>'
  },
  {
    id: 'm7-25', mundo: 7, titulo: 'Errores comunes: resistencia y fila',
    historia: 'Este circuito del taller tiene DOS fallas típicas de principiante: el LED quedó pegado directo al 5V sin resistencia, y la resistencia quedó en la fila equivocada. Tenés que detectar ambas.',
    objetivo: 'Corregir los dos errores: la resistencia R1 debe quedar EN SERIE entre riel+ y el LED, y R1.p2 debe compartir fila con LED1.A en f10f (no en f9f: la fila 9 y la 10 no se tocan).',
    xp: 94,
    placa: [
      { id: 'R1', tipo: 'R', pins: { p1: 'f8g', p2: 'f10g' } },
      { id: 'LED1', tipo: 'LED', pins: { A: 'f10h', K: 'f12h' } }
    ],
    pistas: ['Las filas 9 y 10 están una al lado de la otra pero NO están conectadas.', 'El LED no puede recibir 5V directo: siempre va después de R1.', 'Conectá R1.p2 a f10f, la fila donde está LED1.A.'],
    aprender: '<h3>Los dos clásicos del banco de pruebas</h3><p>Error 1: LED directo a 5V. Sin la resistencia, la corriente se dispara y el LED se quema. Siempre: fuente → resistencia → LED → tierra. Error 2: fila equivocada. f9f y f10f están físicamente pegadas pero elécticamente separadas (cada fila tiene su lámina propia). Un cable en f9f no toca nada de f10f: el circuito queda abierto y ni se entera.</p><h3>Cómo auditar un circuito</h3><p>Seguí la corriente con el dedo: de la fuente al primer componente, al siguiente, hasta tierra. En cada salto, preguntate: ¿comparten fila? Si el cable cae en una fila vecina, lo detectás al instante.</p>',
    ver: '<h3>Conexiones correctas</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, R1.p1)\nconectar(R1.p2, f10f)\nconectar(f10f, LED1.A)\nconectar(LED1.K, riel-)</code></pre><p>R1 en serie y compartiendo fila f10f con el ánodo del LED: circuito cerrado y protegido.</p>',
    detectar: '<h3>Dos errores a la vez</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, LED1.A)\nconectar(R1.p2, f9f)\nconectar(LED1.K, riel-)</code></pre><p>Un error deja al LED sin protección y el otro deja a R1 en una fila que no toca al LED. ¿En qué fila está LED1.A?</p>',
    reparar: {
      codigoInicial: 'alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, LED1.A)\nconectar(R1.p2, f9f)\nconectar(LED1.K, riel-)',
      validar: function (out, code) {
        var errores = [];
        if (/conectar\(riel\+,\s*LED1\.A\)/.test(code)) errores.push('FALTA LA RESISTENCIA: el LED no puede recibir 5V directo');
        if (!/alimentar\(5V,\s*riel\+\)/.test(code)) errores.push('alimentar riel+ con 5V');
        if (!/alimentar\(GND,\s*riel-\)/.test(code)) errores.push('alimentar riel- con GND');
        if (!/conectar\(riel\+,\s*R1\.p1\)/.test(code)) errores.push('el 5V debe entrar a R1.p1, no al LED');
        if (!/conectar\(R1\.p2,\s*f10f\)/.test(code)) errores.push('R1.p2 debe ir a f10f, la fila donde está LED1.A (f9f no toca f10f: son filas separadas)');
        if (!/conectar\(f10f,\s*LED1\.A\)/.test(code)) errores.push('conectar la fila f10f al ánodo del LED');
        if (!/conectar\(LED1\.K,\s*riel-\)/.test(code)) errores.push('conectar el cátodo del LED al riel-');
        if (/conectar\(riel\+,\s*riel-\)|conectar\(riel-,\s*riel\+\)/.test(code)) errores.push('CORTOCIRCUITO: riel+ directo a riel-');
        if (errores.length > 0) return { ok: false, exp: (errores.length === 1 ? 'Falta: ' : 'Errores: ') + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Las dos fallas, resueltas</h3><p>Protección: el 5V entra a R1.p1, la resistencia limita la corriente y recién después llega al LED. Si el cable saltara del riel+ al LED, R1 quedaría sin uso y el LED moriría. Conexión: R1.p2 y LED1.A comparten f10f, así que la lámina de esa fila une resistencia y LED. Antes, R1.p2 estaba en f9f: una fila hermosa pero desconectada del resto. Corregidos los dos, la corriente fluye: riel+ → R1 → f10f → LED1 → riel-.</p><pre><code>antes:  riel+ ─► LED1        (se quema)   R1.p2 en f9f (huérfano)\ndespués: riel+ ─► R1 ─► f10f ─► LED1 ─► riel-  (protegido y cerrado)</code></pre>'
  },
  {
    id: 'm7-26', mundo: 7, titulo: 'El orden del armado seguro',
    historia: 'El jefe del taller exige un protocolo estricto de armado: 1) rieles alimentados, 2) puentes y componentes entre filas, 3) la tierra del circuito, 4) recién al final, el positivo. Armá el circuito respetando ese orden al pie de la letra.',
    objetivo: 'Empezar con las dos líneas alimentar(). Después: conectar(R1.p2, LED1.A), luego conectar(LED1.K, f12a) y conectar(f12a, riel-). Y como ÚLTIMA línea del archivo, conectar(riel+, R1.p1).',
    xp: 94,
    placa: [
      { id: 'R1', tipo: 'R', pins: { p1: 'f5a', p2: 'f7a' } },
      { id: 'LED1', tipo: 'LED', pins: { A: 'f7b', K: 'f12b' } }
    ],
    pistas: ['La primera línea del editor debe ser alimentar(5V, riel+).', 'El cable del positivo (riel+ a R1.p1) va al final de todo, después de armar el LED.', 'El orden: rieles → puentes y componentes → tierra → positivo al último.'],
    aprender: '<h3>Protocolo del taller</h3><p>El orden no es caprichoso: mientras el positivo no esté conectado, podés meter las manos en la protoboard sin riesgo de cerrar un circuito con un cable suelto. Los rieles pueden quedar cargados desde el principio porque son solo vías. La tierra (riel-) se conecta temprana porque no "arma" el circuito por sí sola. El positivo a R1 es el interruptor final: lo conectás cuando todo ya está verificado.</p><h3>En la práctica</h3><p>Primero mirá, después cableá, y al final conectá la energía. Este hábito te evita la mayoría de los quemados de componentes.</p>',
    ver: '<h3>Orden correcto</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, f12a)\nconectar(f12a, riel-)\nconectar(riel+, R1.p1)</code></pre><p>Rieles, después el LED y su retorno, y el positivo recién en la última línea.</p>',
    detectar: '<h3>Positivo primero</h3><pre><code>conectar(riel+, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, f12a)\nconectar(f12a, riel-)\nalimentar(5V, riel+)\nalimentar(GND, riel-)</code></pre><p>El positivo se conectó antes de armar el LED y los rieles ni siquiera estaban listos. ¿En qué posición del archivo debería estar conectar(riel+, R1.p1)?</p>',
    reparar: {
      codigoInicial: 'conectar(riel+, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, f12a)\nconectar(f12a, riel-)\nalimentar(5V, riel+)\nalimentar(GND, riel-)',
      validar: function (out, code) {
        var errores = [];
        var c = code.replace(/\s+/g, '');
        if (!/^alimentar\(5V,riel\+\)/.test(c)) errores.push('empezar el archivo con alimentar(5V, riel+)');
        if (!/alimentar\(GND,riel-\)/.test(c)) errores.push('falta alimentar(GND, riel-) junto al 5V');
        if (!/conectar\(R1\.p2,LED1\.A\)/.test(c)) errores.push('falta conectar(R1.p2, LED1.A) en el bloque de componentes');
        if (!/conectar\(LED1\.K,f12a\)/.test(c)) errores.push('falta conectar(LED1.K, f12a)');
        if (!/conectar\(f12a,riel-\)/.test(c)) errores.push('falta conectar(f12a, riel-) para el retorno a tierra');
        if (!/conectar\(riel\+,R1\.p1\)/.test(c)) errores.push('falta conectar(riel+, R1.p1), el paso final');
        var iComp = c.indexOf('conectar(R1.p2,LED1.A)');
        var iPos = c.indexOf('conectar(riel+,R1.p1)');
        if (iComp >= 0 && iPos >= 0 && iPos < iComp) errores.push('el positivo (riel+ a R1.p1) debe ser la ÚLTIMA línea, después de armar el LED');
        if (/conectar\(riel\+,riel-\)|conectar\(riel-,riel\+\)/.test(c)) errores.push('CORTOCIRCUITO: riel+ directo a riel-');
        if (errores.length > 0) return { ok: false, exp: (errores.length === 1 ? 'Falta: ' : 'Errores: ') + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Cada línea en su momento</h3><p>Línea 1 y 2: los rieles quedan cargados, inofensivos. Línea 3: R1.p2 y LED1.A comparten fila; es una unión sin voltaje todavía, no pasa corriente. Líneas 4 y 5: el cátodo busca la tierra vía f12a; el camino de vuelta está listo pero el circuito sigue abierto por el lado positivo. Línea 6 (la última): riel+ → R1.p1 cierra el circuito y el LED enciende. En ningún instante hubo un positivo suelto sobre una protoboard a medio armar.</p><pre><code>1-2) rieles cargados   3) LED armado   4-5) tierra lista   6) positivo: ¡encendido!</code></pre>'
  },
  {
    id: 'm7-27', mundo: 7, titulo: 'Protoboard doble: extender rieles',
    historia: 'La protoboard del proyecto es doble y larga: los rieles del costado izquierdo no llegan al extremo derecho donde tenés los componentes. Hay que extender la energía con jumpers, como se hace en la vida real.',
    objetivo: 'Alimentar rieles; extender el riel+ hasta la zona lejana: conectar(riel+, f63a) y puente conectar(f63a, f63f); extender el riel-: conectar(riel-, f62a) y puente conectar(f62a, f62f); después armar el LED lejano: f63f → R1.p1, R1.p2 → LED1.A, LED1.K → f62f.',
    xp: 96,
    placa: [
      { id: 'R1', tipo: 'R', pins: { p1: 'f63g', p2: 'f61g' } },
      { id: 'LED1', tipo: 'LED', pins: { A: 'f61h', K: 'f62h' } }
    ],
    pistas: ['En protoboardes dobles, los rieles suelen estar partidos en el centro: la mitad derecha queda sin energía.', 'Usá f63 como riel+ lejano y f62 como riel- lejano, ambos en el lado lejano de la placa.', 'Los puentes f63a↔f63f y f62a↔f62f llevan la energía al otro lado del surco.'],
    aprender: '<h3>Rieles partidos</h3><p>En muchas protoboardes dobles, la barra roja de arriba está cortada en el medio: la mitad izquierda y la derecha NO están unidas. Si tus componentes están en la mitad lejana, necesitás jumpers que extiendan el 5V y el GND hasta allá. Sin esos puentes, la mitad derecha del riel está muerta y el circuito no arranca aunque todo lo demás esté bien.</p><h3>Modelo de la misión</h3><p>Acá representamos la zona lejana con las filas 62 y 63: f63a recibe el 5V del riel+ y el puente f63a↔f63f lo reparte al otro lado del surco; f63f es entonces el "riel+ lejano" del que se alimenta el LED.</p>',
    ver: '<h3>Conexiones correctas</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, f63a)\nconectar(f63a, f63f)\nconectar(riel-, f62a)\nconectar(f62a, f62f)\nconectar(f63f, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, f62f)</code></pre><p>Los rieles se extienden hasta las filas 62/63, que alimentan al LED de la zona lejana.</p>',
    detectar: '<h3>Rieles que no llegan</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, f63a)\nconectar(riel-, f62a)\nconectar(f63f, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, f62f)</code></pre><p>f63a y f62a tienen energía pero f63f y f62f están solas del otro lado del surco. ¿Qué puentes faltan?</p>',
    reparar: {
      codigoInicial: 'alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, f63a)\nconectar(riel-, f62a)\nconectar(f63f, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, f62f)',
      validar: function (out, code) {
        var errores = [];
        if (!/alimentar\(5V,\s*riel\+\)/.test(code)) errores.push('alimentar riel+ con 5V');
        if (!/alimentar\(GND,\s*riel-\)/.test(code)) errores.push('alimentar riel- con GND');
        if (!/conectar\(riel\+,\s*f63a\)/.test(code)) errores.push('extender el riel+ hasta la fila f63a');
        if (!/conectar\(f63a,\s*f63f\)|conectar\(f63f,\s*f63a\)/.test(code)) errores.push('tirar el puente f63a ↔ f63f (energía al otro lado del surco)');
        if (!/conectar\(riel-,\s*f62a\)/.test(code)) errores.push('extender el riel- hasta la fila f62a');
        if (!/conectar\(f62a,\s*f62f\)|conectar\(f62f,\s*f62a\)/.test(code)) errores.push('tirar el puente f62a ↔ f62f (tierra al otro lado del surco)');
        if (!/conectar\(f63f,\s*R1\.p1\)/.test(code)) errores.push('alimentar R1.p1 desde el riel+ lejano f63f');
        if (!/conectar\(R1\.p2,\s*LED1\.A\)/.test(code)) errores.push('conectar R1.p2 al ánodo del LED');
        if (!/conectar\(LED1\.K,\s*f62f\)/.test(code)) errores.push('volver del LED al riel- lejano f62f');
        if (/conectar\(riel\+,\s*riel-\)|conectar\(riel-,\s*riel\+\)/.test(code)) errores.push('CORTOCIRCUITO: riel+ directo a riel-');
        if (errores.length > 0) return { ok: false, exp: (errores.length === 1 ? 'Falta: ' : 'Errores: ') + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Energía que viaja por la placa</h3><p>El 5V entra al riel+ y por su lámina llega a f63a (la fila más lejana del lado izquierdo). El puente f63a ↔ f63f cruza el surco y lo deja disponible en f63f: a partir de ahí, la fila 63 del lado derecho funciona como riel+ lejano. Igual con la tierra: riel- → f62a → f62f. Recién entonces R1.p1 y LED1.K encuentran energía y retorno cerca de su ubicación. Sin los dos puentes, R1.p1 quedaría en una fila sin voltaje y el LED no encendería aunque estuviera perfectamente cableado.</p><pre><code>riel+ ─► f63a ═puente══ f63f ─► R1 ─► LED1 ─► f62f ═puente══ f62a ─► riel-</code></pre>'
  },
  {
    id: 'm7-28', mundo: 7, titulo: 'Botón, LED y buzzer juntos',
    historia: 'El panel de control del taller necesita un botón de atención que, al presionarse, active a la vez una luz y un sonido. Todo gobernado por pines del Arduino sobre una misma protoboard.',
    objetivo: 'Alimentar rieles; botón: BTN1.1 → D2 y BTN1.2 → riel- (con INPUT_PULLUP); luz: D4 → R1.p1, R1.p2 → LED1.A, LED1.K → riel-; sonido: D4 → BUZ1.p1, BUZ1.p2 → riel-.',
    xp: 96,
    placa: [
      { id: 'BTN1', tipo: 'BTN', pins: { '1': 'f13a', '2': 'f14a' } },
      { id: 'R1', tipo: 'R', pins: { p1: 'f5a', p2: 'f7a' } },
      { id: 'LED1', tipo: 'LED', pins: { A: 'f7b', K: 'f9b' } },
      { id: 'BUZ1', tipo: 'BUZ', pins: { p1: 'f13h', p2: 'f14h' } }
    ],
    pistas: ['El botón con INPUT_PULLUP lleva su otra pata a riel-: suelta lee HIGH, presionado lee LOW.', 'El LED y el buzzer comparten el pin D4 como señal de mando.', 'Al LED SIEMPRE le toca su resistencia R1 en serie; el buzzer no la necesita.'],
    aprender: '<h3>Una entrada y dos salidas</h3><p>Este circuito junta todo lo aprendido: D2 es ENTRADA (lee el botón con pull-up a riel-) y D4 es SALIDA que gobierna dos cargas en paralelo: la rama del LED (con su resistencia) y la rama del buzzer. D4 no alimenta las cargas: autoriza el paso de la corriente desde riel+ hacia riel- a través de ellas.</p><h3>Cargas en paralelo desde un pin</h3><p>Las dos ramas parten de D4 y vuelven por separado al riel-. Dentro del Arduino, el pin puede ceder unos 20–40 mA en total: un LED (~15 mA) y un buzzer de bajo consumo entran justo. Para cargas más grandes, volvé al transistor de la misión 18.</p>',
    ver: '<h3>Conexiones correctas</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(BTN1.1, D2)\nconectar(BTN1.2, riel-)\nconectar(D4, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, riel-)\nconectar(D4, BUZ1.p1)\nconectar(BUZ1.p2, riel-)</code></pre><p>Botón en D2 (pull-up interno), y D4 bifurcando en la rama del LED (con R1) y la del buzzer.</p>',
    detectar: '<h3>Sin rama de sonido</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(BTN1.1, D2)\nconectar(BTN1.2, riel-)\nconectar(D4, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, riel-)</code></pre><p>La luz ya responde a D4 pero el buzzer quedó en la caja. ¿Desde qué pin debe partir la rama del buzzer y a qué retorno debe volver?</p>',
    reparar: {
      codigoInicial: 'alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(BTN1.1, D2)\nconectar(BTN1.2, riel-)\nconectar(D4, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, riel-)',
      validar: function (out, code) {
        var errores = [];
        if (!/alimentar\(5V,\s*riel\+\)/.test(code)) errores.push('alimentar riel+ con 5V');
        if (!/alimentar\(GND,\s*riel-\)/.test(code)) errores.push('alimentar riel- con GND');
        if (!/conectar\(BTN1\.1,\s*D2\)/.test(code)) errores.push('conectar BTN1.1 al pin D2');
        if (!/conectar\(BTN1\.2,\s*riel-\)/.test(code)) errores.push('conectar BTN1.2 al riel- (botón con pull-up interno)');
        if (!/conectar\(D4,\s*R1\.p1\)/.test(code)) errores.push('conectar D4 a R1.p1 (rama de la luz)');
        if (!/conectar\(R1\.p2,\s*LED1\.A\)/.test(code)) errores.push('conectar R1.p2 al ánodo del LED');
        if (!/conectar\(LED1\.K,\s*riel-\)/.test(code)) errores.push('volver del LED al riel-');
        if (!/conectar\(D4,\s*BUZ1\.p1\)/.test(code)) errores.push('conectar D4 también a BUZ1.p1 (rama del sonido)');
        if (!/conectar\(BUZ1\.p2,\s*riel-\)/.test(code)) errores.push('volver del buzzer al riel-');
        if (/conectar\(D4,\s*LED1\.A\)|conectar\(riel\+,\s*LED1\.A\)/.test(code)) errores.push('FALTA LA RESISTENCIA: el LED va detrás de R1, no directo al pin ni al riel+');
        if (/conectar\(riel\+,\s*riel-\)|conectar\(riel-,\s*riel\+\)/.test(code)) errores.push('CORTOCIRCUITO: riel+ directo a riel-');
        if (errores.length > 0) return { ok: false, exp: (errores.length === 1 ? 'Falta: ' : 'Errores: ') + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>El panel completo</h3><p>Entrada: BTN1 con D2; en reposo la resistencia interna pull-up lee HIGH, al presionar el botón lleva D2 a riel- y lee LOW. Salida luz: D4 → R1 → LED1 → riel-; R1 limita la corriente del LED. Salida sonido: D4 → BUZ1 → riel-; el buzzer tiene electrónica propia y no necesita resistencia extra. Las dos salidas comparten D4 y comparten la tierra riel-, pero cada una tiene su rama independiente: por eso puedes tener luz sin sonido solo si el buzzer fallara, y viceversa.</p><pre><code>entrada:  D2 ◄─ BTN1 ─► riel-\nsalidas:  D4 ─┬─► R1 ─► LED1 ─► riel-\n             └─► BUZ1 ──────────► riel-</code></pre>'
  },
  {
    id: 'm7-29', mundo: 7, titulo: 'LDR + transistor + motor',
    historia: 'El ventilador del taller debe arrancar solo cuando se oscurece. El LDR mide la luz, un transistor conmuta el motor: un sensor gobernando una carga grande, sin que el Arduino toque la corriente del motor.',
    objetivo: 'Alimentar rieles; divisor de luz: riel+ → LDR1.p1, LDR1.p2 → A0, LDR1.p2 → R1.p1, R1.p2 → riel-; base: LDR1.p2 → Q1.B; motor: riel+ → MOT1.p1, MOT1.p2 → Q1.C, Q1.E → riel-.',
    xp: 98,
    placa: [
      { id: 'LDR1', tipo: 'LDR', pins: { p1: 'f15c', p2: 'f16c' } },
      { id: 'R1', tipo: 'R', pins: { p1: 'f16d', p2: 'f18d' } },
      { id: 'Q1', tipo: 'Q', pins: { B: 'f16h', C: 'f18h', E: 'f20h' } },
      { id: 'MOT1', tipo: 'MOT', pins: { p1: 'f17i', p2: 'f18i' } }
    ],
    pistas: ['La salida del divisor de luz (LDR1.p2) también alimenta la base del transistor.', 'El motor va entre riel+ y el colector Q1.C.', 'El emisor Q1.E siempre vuelve al riel-.'],
    aprender: '<h3>Sensor que gobierna carga</h3><p>La cadena completa: el divisor LDR/R1 genera un voltaje variable en LDR1.p2 (más luz → más voltaje con esta configuración). Ese mismo punto alimenta la base del transistor: cuando el voltaje supera ~0.7V, el transistor abre el paso entre colector y emisor y el motor arranca. A0 solo observa el mismo punto para que el Arduino pueda registrar el valor.</p><h3>¿Por qué el transistor y no directo?</h3><p>Un motor chico pide cientos de mA y genera picos de voltaje al parar (contra-FFM). Nada de eso debe pasar por los pines del Arduino. El transistor (y eventualmente un diodo de protección) se ocupa de la carga; el sensor y el pin solo mandan la señal de control.</p>',
    ver: '<h3>Conexiones correctas</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, LDR1.p1)\nconectar(LDR1.p2, A0)\nconectar(LDR1.p2, R1.p1)\nconectar(R1.p2, riel-)\nconectar(LDR1.p2, Q1.B)\nconectar(riel+, MOT1.p1)\nconectar(MOT1.p2, Q1.C)\nconectar(Q1.E, riel-)</code></pre><p>El punto medio del divisor manda a A0 y a la base; el motor fluye de riel+ al colector y sale por el emisor a riel-.</p>',
    detectar: '<h3>Transistor sin control</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, LDR1.p1)\nconectar(LDR1.p2, A0)\nconectar(LDR1.p2, R1.p1)\nconectar(R1.p2, riel-)\nconectar(riel+, MOT1.p1)\nconectar(MOT1.p2, Q1.C)\nconectar(Q1.E, riel-)</code></pre><p>El motor está cableado pero la base de Q1 no recibe señal: el transistor nunca abre. ¿Desde qué punto del divisor debe llegar el mando a Q1.B?</p>',
    reparar: {
      codigoInicial: 'alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, LDR1.p1)\nconectar(LDR1.p2, A0)\nconectar(LDR1.p2, R1.p1)\nconectar(R1.p2, riel-)\nconectar(riel+, MOT1.p1)\nconectar(MOT1.p2, Q1.C)\nconectar(Q1.E, riel-)',
      validar: function (out, code) {
        var errores = [];
        if (!/alimentar\(5V,\s*riel\+\)/.test(code)) errores.push('alimentar riel+ con 5V');
        if (!/alimentar\(GND,\s*riel-\)/.test(code)) errores.push('alimentar riel- con GND');
        if (!/conectar\(riel\+,\s*LDR1\.p1\)/.test(code)) errores.push('alimentar LDR1.p1 desde el riel+');
        if (!/conectar\(LDR1\.p2,\s*A0\)/.test(code)) errores.push('derivar LDR1.p2 al pin A0');
        if (!/conectar\(LDR1\.p2,\s*R1\.p1\)/.test(code)) errores.push('completar el divisor: LDR1.p2 a R1.p1');
        if (!/conectar\(R1\.p2,\s*riel-\)/.test(code)) errores.push('conectar R1.p2 al riel-');
        if (!/conectar\(LDR1\.p2,\s*Q1\.B\)/.test(code)) errores.push('mandar la señal del divisor (LDR1.p2) a la base Q1.B');
        if (!/conectar\(riel\+,\s*MOT1\.p1\)/.test(code)) errores.push('alimentar MOT1.p1 desde el riel+');
        if (!/conectar\(MOT1\.p2,\s*Q1\.C\)/.test(code)) errores.push('la salida del motor va al colector Q1.C');
        if (!/conectar\(Q1\.E,\s*riel-\)/.test(code)) errores.push('conectar el emisor Q1.E al riel-');
        if (/conectar\(D\d+,\s*MOT1\.p[12]\)|conectar\(MOT1\.p[12],\s*D\d+\)/.test(code)) errores.push('el motor NUNCA se conecta directo a un pin digital: pasá por el transistor');
        if (/conectar\(riel\+,\s*riel-\)|conectar\(riel-,\s*riel\+\)/.test(code)) errores.push('CORTOCIRCUITO: riel+ directo a riel-');
        if (errores.length > 0) return { ok: false, exp: (errores.length === 1 ? 'Falta: ' : 'Errores: ') + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Tres etapas cableadas</h3><p>Etapa sensor: riel+ → LDR1 → R1 → riel-; LDR1.p2 es el punto medio. Etapa mando: ese mismo punto va a Q1.B; con oscuridad la resistencia del LDR sube, el punto medio baja... y el umbral de la base decide arrancar o no (el Arduino, vía A0, solo registra). Etapa carga: riel+ → MOT1 → Q1.C ▶ Q1.E → riel-. La corriente del motor NUNCA pasa por el sensor ni por A0: toma la energía del riel+ y vuelve al riel- por el transistor. Cada etapa existe porque cumple una función distinta: medir, decidir y mover.</p><pre><code>sensor:   riel+ ─► LDR1 ─┬─► A0 (mide)\n                       Q1.B (manda)\n                       R1 ─► riel-\ncarga:    riel+ ─► MOT1 ─► Q1.C ▶ Q1.E ─► riel-</code></pre>'
  },
  {
    id: 'm7-30', mundo: 7, titulo: 'Proyecto final: alarma de luz',
    historia: 'Cerrás el mundo PROTOBOARD con el proyecto completo del taller: una alarma donde el LDR detecta la luz, el LED avisa, el buzzer suena y el botón silencia. Todo cableado impecable, con rieles alimentados y sin un solo cable de más.',
    objetivo: 'Alimentar rieles. Sensor: riel+ → LDR1.p1, LDR1.p2 → A0, LDR1.p2 → R2.p1, R2.p2 → riel-. Luz: D9 → R1.p1, R1.p2 → LED1.A, LED1.K → riel-. Sonido: D8 → BUZ1.p1, BUZ1.p2 → riel-. Botón: D2 → BTN1.1, BTN1.2 → riel-.',
    xp: 100,
    placa: [
      { id: 'LDR1', tipo: 'LDR', pins: { p1: 'f15c', p2: 'f16c' } },
      { id: 'R2', tipo: 'R', pins: { p1: 'f16d', p2: 'f18d' } },
      { id: 'R1', tipo: 'R', pins: { p1: 'f5a', p2: 'f7a' } },
      { id: 'LED1', tipo: 'LED', pins: { A: 'f7b', K: 'f9b' } },
      { id: 'BUZ1', tipo: 'BUZ', pins: { p1: 'f13h', p2: 'f14h' } },
      { id: 'BTN1', tipo: 'BTN', pins: { '1': 'f13a', '2': 'f14a' } }
    ],
    pistas: ['Empezá por los rieles y después el divisor del LDR hacia A0.', 'Cada salida (LED y buzzer) necesita su camino desde su pin; el LED, además, su resistencia en serie.', 'El botón va entre D2 y riel-: con INPUT_PULLUP no necesita resistencia externa.'],
    aprender: '<h3>La protoboard del sistema completo</h3><p>Un sistema real concentra varios circuitos chicos en una misma placa, pero cada uno conserva su lógica: el divisor del LDR (entrada analógica), el LED con R1 (salida luminosa), el buzzer (salida sonora) y el botón (entrada digital). Lo único que comparten son LOS RIELES: una sola alimentación reparte 5V y una sola tierra recoge todos los retornos.</p><h3>Buen cableado = debuggable</h3><p>Cada conexión en su fila, los rieles alimentados una sola vez, resistencias donde corresponden: así, cuando algo falla, podés seguir la corriente con el dedo. Si el sistema no anda, el problema está en el último cable que agregaste.</p>',
    ver: '<h3>Conexiones correctas</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, LDR1.p1)\nconectar(LDR1.p2, A0)\nconectar(LDR1.p2, R2.p1)\nconectar(R2.p2, riel-)\nconectar(D9, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, riel-)\nconectar(D8, BUZ1.p1)\nconectar(BUZ1.p2, riel-)\nconectar(D2, BTN1.1)\nconectar(BTN1.2, riel-)</code></pre><p>Sistema completo: sensor a A0, LED con resistencia, buzzer y botón, todo sobre los mismos rieles.</p>',
    detectar: '<h3>Sistema incompleto</h3><pre><code>alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, LDR1.p1)\nconectar(LDR1.p2, A0)\nconectar(LDR1.p2, R2.p1)\nconectar(R2.p2, riel-)\nconectar(D9, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, riel-)</code></pre><p>El sensor y la luz están, pero ni el buzzer ni el botón tienen cablear. ¿Desde qué pines deben arrancar y a dónde deben volver?</p>',
    reparar: {
      codigoInicial: 'alimentar(5V, riel+)\nalimentar(GND, riel-)\nconectar(riel+, LDR1.p1)\nconectar(LDR1.p2, A0)\nconectar(LDR1.p2, R2.p1)\nconectar(R2.p2, riel-)\nconectar(D9, R1.p1)\nconectar(R1.p2, LED1.A)\nconectar(LED1.K, riel-)',
      validar: function (out, code) {
        var errores = [];
        if (!/alimentar\(5V,\s*riel\+\)/.test(code)) errores.push('alimentar riel+ con 5V');
        if (!/alimentar\(GND,\s*riel-\)/.test(code)) errores.push('alimentar riel- con GND');
        if (!/conectar\(riel\+,\s*LDR1\.p1\)/.test(code)) errores.push('alimentar LDR1.p1 desde el riel+');
        if (!/conectar\(LDR1\.p2,\s*A0\)/.test(code)) errores.push('derivar la salida del sensor LDR1.p2 a A0');
        if (!/conectar\(LDR1\.p2,\s*R2\.p1\)/.test(code)) errores.push('completar el divisor: LDR1.p2 a R2.p1');
        if (!/conectar\(R2\.p2,\s*riel-\)/.test(code)) errores.push('conectar R2.p2 al riel-');
        if (!/conectar\(D9,\s*R1\.p1\)/.test(code)) errores.push('conectar D9 a R1.p1 (control del LED)');
        if (!/conectar\(R1\.p2,\s*LED1\.A\)/.test(code)) errores.push('conectar R1.p2 al ánodo del LED');
        if (!/conectar\(LED1\.K,\s*riel-\)/.test(code)) errores.push('volver del LED al riel-');
        if (!/conectar\(D8,\s*BUZ1\.p1\)/.test(code)) errores.push('conectar D8 a BUZ1.p1 (control del buzzer)');
        if (!/conectar\(BUZ1\.p2,\s*riel-\)/.test(code)) errores.push('volver del buzzer al riel-');
        if (!/conectar\(D2,\s*BTN1\.1\)/.test(code)) errores.push('conectar D2 a BTN1.1 (lectura del botón)');
        if (!/conectar\(BTN1\.2,\s*riel-\)/.test(code)) errores.push('conectar BTN1.2 al riel- (pull-up interno)');
        if (/conectar\(riel\+,\s*riel-\)|conectar\(riel-,\s*riel\+\)/.test(code)) errores.push('CORTOCIRCUITO: riel+ directo a riel-');
        if (/conectar\(riel\+,\s*LED1\.A\)|conectar\(D9,\s*LED1\.A\)/.test(code)) errores.push('FALTA LA RESISTENCIA: el LED necesita R1 en serie');
        if (errores.length > 0) return { ok: false, exp: (errores.length === 1 ? 'Falta: ' : 'Errores: ') + errores.join(', ') };
        return { ok: true };
      }
    },
    comprender: '<h3>Cómo respira el sistema completo</h3><p>Una sola alimentación (alimentar 5V y GND) alimenta los cuatro bloques. El divisor LDR1/R2 convierte la luz en voltaje y lo ofrece a A0 y —en proporción— a la lógica del sistema. D9 atraviesa R1 para encender el LED sin quemarlo; D8 activa el buzzer; D2 lee el botón que, con INPUT_PULLUP, solo necesita BTN1.2 a riel-. Todas las idas parten de rieles o pines, y TODAS las vueltas terminan en el mismo riel-. Si mañana querés agregar un quinto componente, ya sabés el protocolo: rieles primero, componente después, positivo al final.</p><pre><code>sensor: riel+ ─► LDR1 ─┬─► A0   (medir)\n                     R2 ─► riel-\nluz:    D9 ─► R1 ─► LED1 ─► riel-\nsonido: D8 ─► BUZ1 ─► riel-\nbotón:  D2 ◄─ BTN1 ─► riel-</code></pre>'
  }
);
