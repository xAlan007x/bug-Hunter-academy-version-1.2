/* ══════════════════════════════════════════════════════════════════════════
   SAFE RUNNER — EJECUCIÓN SEGURA DE JAVASCRIPT Y SIMULACIÓN ARDUINO C++
   ══════════════════════════════════════════════════════════════════════════ */

function runUserCode(rawCode) {
  const logs = [];
  const origLog = console.log;
  const origWarn = console.warn;
  const origErr = console.error;

  console.log = function (...a) {
    logs.push(a.map(x => {
      if (typeof x === 'string') return x;
      try {
        return JSON.stringify(x);
      } catch (e) {
        return String(x);
      }
    }).join(' '));
  };
  console.warn = console.log;
  console.error = console.log;

  let ok = true;
  let err = null;

  try {
    let codeToRun = rawCode || '';

    // Soporte para DSL de Protoboard: alimentar(...) y conectar(...)
    if (/alimentar|conectar/i.test(codeToRun)) {
      // Registrar cables en la consola simulada
      const alimMatches = codeToRun.match(/alimentar\([^)]+\)/gi) || [];
      const conexMatches = codeToRun.match(/conectar\([^)]+\)/gi) || [];
      
      alimMatches.forEach(m => logs.push('⚡ ' + m + ' [Línea de energía conectada]'));
      conexMatches.forEach(m => logs.push('🔌 ' + m + ' [Conexión establecida]'));

      if (alimMatches.length === 0 && conexMatches.length === 0) {
        logs.push('(Sin instrucciones de conexión detectadas)');
      }
      return { ok: true, err: null, logs };
    }

    // Soporte para sketches de Arduino en C++: convertir a JS ejecutable
    if (/void\s+setup|void\s+loop/i.test(codeToRun)) {
      codeToRun = codeToRun
        .replace(/void\s+setup\s*\(\s*\)/gi, 'function setup()')
        .replace(/void\s+loop\s*\(\s*\)/gi, 'function loop()')
        .replace(/\bint\b|\bfloat\b|\bboolean\b|\bchar\b|\bbyte\b/gi, 'let ');

      codeToRun = `
        const OUTPUT = 1, INPUT = 0, HIGH = 1, LOW = 0;
        function pinMode(pin, mode) { console.log("Arduino: pinMode(" + pin + ", " + (mode === 1 ? "OUTPUT" : "INPUT") + ")"); }
        function digitalWrite(pin, val) { console.log("Arduino: digitalWrite(" + pin + ", " + (val === 1 ? "HIGH" : "LOW") + ")"); }
        function digitalRead(pin) { return HIGH; }
        function delay(ms) { /* simulación de tiempo */ }
        ${codeToRun}
        if (typeof setup === 'function') setup();
        if (typeof loop === 'function') loop();
      `;
    }

    const fn = new Function(codeToRun);
    fn();
  } catch (e) {
    ok = false;
    err = e && e.message ? e.message : String(e);
  } finally {
    console.log = origLog;
    console.warn = origWarn;
    console.error = origErr;
  }

  return {
    ok,
    err,
    logs
  };
}