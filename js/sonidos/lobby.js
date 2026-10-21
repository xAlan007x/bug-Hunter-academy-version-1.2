/* ══════════════════════════════════════════════════════════════════════════
   BUG HUNTER ACADEMY — SISTEMA DE SONIDO UNIFICADO
   Generado 100% con Web Audio API (sin archivos externos).

   - Ambiente continuo suave del lobby (pad + blips de tecnología)
   - Efecto "subir de nivel" (arpegio ascendente)
   - Volumen master ajustable de 0% a 100%
   - Interruptores independientes para: Ambiente del lobby / Sonido de nivel
   - Persistencia en localStorage:
       tv_sound_on      -> master ON/OFF ('1'/'0')   (compatibilidad)
       tv_sound_vol     -> volumen master 0..1
       tv_sound_lobby   -> ambiente ON/OFF
       tv_sound_levelup -> sonido de nivel ON/OFF

   API: SONIDOS.start() / stop() / toggle() / isOn()
        SONIDOS.blip() / SONIDOS.nivelArriba() / SONIDOS.paraPantalla(id)
        SONIDOS.setVolumen(0..100) / getVolumen() / setLobbyOn(bool) /
        setNivelOn(bool) / setMasterOn(bool) / getEstado()
   ══════════════════════════════════════════════════════════════════════════ */

var SONIDOS = (function () {
  'use strict';

  var KEY_MASTER = 'tv_sound_on';
  var KEY_VOL = 'tv_sound_vol';
  var KEY_LOBBY = 'tv_sound_lobby';
  var KEY_LEVELUP = 'tv_sound_levelup';

  var ctx = null;
  var masterGain = null;
  var ambientNodes = [];
  var blipTimer = null;
  var running = false;          // ambiente del lobby activo
  var masterOn = true;          // interruptor general
  var volumen = 0.5;            // 0..1
  var lobbyOn = true;           // permiso para reproducir ambiente
  var nivelOn = true;           // permiso para reproducir sonido de nivel
  var pantallaActual = 'inicio';

  /* ─── Preferencias ─── */
  function leerBool(key, def) {
    try { var v = localStorage.getItem(key); return v === null ? def : v !== '0'; } catch (e) { return def; }
  }
  function guardarBool(key, val) { try { localStorage.setItem(key, val ? '1' : '0'); } catch (e) {} }
  function leerVol() {
    try { var v = localStorage.getItem(KEY_VOL); return v === null ? 0.5 : Math.max(0, Math.min(1, parseFloat(v))); }
    catch (e) { return 0.5; }
  }
  function guardarVol(v) { try { localStorage.setItem(KEY_VOL, String(v)); } catch (e) {} }

  function cargarPrefs() {
    masterOn = leerBool(KEY_MASTER, true);
    lobbyOn = leerBool(KEY_LOBBY, true);
    nivelOn = leerBool(KEY_LEVELUP, true);
    volumen = leerVol();
  }
  cargarPrefs();

  /* ─── Núcleo de audio ─── */
  function init() {
    if (ctx) return;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.0;
    masterGain.connect(ctx.destination);
  }

  function ahora() { return ctx ? ctx.currentTime : 0; }

  // Volumen efectivo del ambiente (aplica master + volumen + si estás en lobby)
  function targetAmbientVolume() {
    if (!masterOn || !lobbyOn || volumen <= 0) return 0.0;
    var base = (pantallaActual === 'inicio') ? 1.0 : 0.44;
    return base * volumen; // 0..1 (se multiplica por la ganancia interna del pad)
  }

  function aplicarVolumenAmbiente(inmediato) {
    if (!ctx || !masterGain) return;
    var objetivo = targetAmbientVolume();
    masterGain.gain.cancelScheduledValues(ahora());
    masterGain.gain.setValueAtTime(masterGain.gain.value, ahora());
    if (inmediato) masterGain.gain.setValueAtTime(objetivo, ahora());
    else masterGain.gain.linearRampToValueAtTime(objetivo, ahora() + 1.2);
  }

  /* ─── Ambiente: pad de notas suaves con filtro y LFO ─── */
  function buildAmbient() {
    var filtro = ctx.createBiquadFilter();
    filtro.type = 'lowpass';
    filtro.frequency.value = 900;
    filtro.Q.value = 0.7;
    filtro.connect(masterGain);

    var notas = [110, 164.81, 220, 277.18]; // A2, E3, A3, C#4 (A mayor, cálido)
    notas.forEach(function (f, i) {
      var osc = ctx.createOscillator();
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.value = f;

      var g = ctx.createGain();
      g.gain.value = 0.0;
      osc.connect(g);
      g.connect(filtro);

      var lfo = ctx.createOscillator();
      lfo.frequency.value = 0.05 + i * 0.017;
      var lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.05;
      lfo.connect(lfoGain);
      lfoGain.connect(g.gain);

      osc.start();
      lfo.start();

      g.gain.setValueAtTime(0.0, ahora());
      g.gain.linearRampToValueAtTime(0.09 + i * 0.01, ahora() + 3 + i * 0.4);

      ambientNodes.push({ osc: osc, lfo: lfo, g: g });
    });
  }

  /* ─── Blips de tecnología dispersos ─── */
  function blip() {
    if (!ctx || !running || !masterOn || !lobbyOn || volumen <= 0) return;
    var t = ahora();
    var freqs = [880, 1174, 1567, 2093];
    var f = freqs[Math.floor(Math.random() * freqs.length)];
    var osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(f, t);
    osc.frequency.exponentialRampToValueAtTime(f * 0.6, t + 0.12);
    var g = ctx.createGain();
    var amp = 0.035 * volumen;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, amp), t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
    osc.connect(g); g.connect(masterGain);
    osc.start(t); osc.stop(t + 0.3);
  }

  function programarBlips() {
    clearTimeout(blipTimer);
    var delay = 2500 + Math.random() * 5500;
    blipTimer = setTimeout(function () {
      blip();
      if (running) programarBlips();
    }, delay);
  }

  /* ─── Efecto: subir de nivel (arpegio ascendente) ─── */
  function nivelArriba() {
    init();
    if (!ctx || !masterOn || !nivelOn || volumen <= 0) return;
    if (ctx.state === 'suspended') ctx.resume();
    var t0 = ahora() + 0.02;
    // Do-Mi-Sol-Do (arpegio mayor ascendente, brillante)
    var notas = [523.25, 659.25, 783.99, 1046.5];
    notas.forEach(function (f, i) {
      var t = t0 + i * 0.11;
      var osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, t);
      var g = ctx.createGain();
      var amp = 0.22 * volumen;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(Math.max(0.0002, amp), t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
      osc.connect(g); g.connect(ctx.destination);
      osc.start(t); osc.stop(t + 0.65);

      // Capa aguda para más brillo
      var osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(f * 2, t);
      var g2 = ctx.createGain();
      g2.gain.setValueAtTime(0.0001, t);
      g2.gain.exponentialRampToValueAtTime(Math.max(0.0002, amp * 0.35), t + 0.02);
      g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
      osc2.connect(g2); g2.connect(ctx.destination);
      osc2.start(t); osc2.stop(t + 0.55);
    });
  }

  /* ─── Control del ambiente ─── */
  function start() {
    init();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    if (running) return;
    running = true;
    if (ambientNodes.length === 0) buildAmbient();
    else ambientNodes.forEach(function (n) {
      n.g.gain.cancelScheduledValues(ahora());
      n.g.gain.linearRampToValueAtTime(0.08, ahora() + 2);
    });
    aplicarVolumenAmbiente(false);
    programarBlips();
    actualizarBoton();
  }

  function stop() {
    if (!ctx || !running) { running = false; actualizarBoton(); return; }
    running = false;
    clearTimeout(blipTimer);
    aplicarVolumenAmbiente(false);
    actualizarBoton();
  }

  function toggle() { if (running) stop(); else start(); }
  function isOn() { return running; }

  // Cambia el carácter del ambiente según la pantalla
  function paraPantalla(id) {
    pantallaActual = id || 'inicio';
    if (!ctx || !running) return;
    aplicarVolumenAmbiente(false);
  }

  /* ─── Ajustes desde Configuración ─── */
  function setMasterOn(on) {
    masterOn = !!on;
    guardarBool(KEY_MASTER, masterOn);
    if (masterOn) { init(); if (ctx && ctx.state === 'suspended') ctx.resume(); if (!running) start(); }
    aplicarVolumenAmbiente(false);
    actualizarBoton();
  }

  function setLobbyOn(on) {
    lobbyOn = !!on;
    guardarBool(KEY_LOBBY, lobbyOn);
    if (lobbyOn && masterOn) { if (!running) start(); } else { if (running) stop(); }
    aplicarVolumenAmbiente(false);
    actualizarBoton();
  }

  function setNivelOn(on) {
    nivelOn = !!on;
    guardarBool(KEY_LEVELUP, nivelOn);
  }

  function setVolumen(pct) {
    volumen = Math.max(0, Math.min(1, (parseFloat(pct) || 0) / 100));
    guardarVol(volumen);
    aplicarVolumenAmbiente(true);
    actualizarBoton();
  }
  function getVolumen() { return Math.round(volumen * 100); }

  function getEstado() {
    return {
      masterOn: masterOn,
      volumen: getVolumen(),
      lobbyOn: lobbyOn,
      nivelOn: nivelOn,
      running: running
    };
  }

  function actualizarBoton() {
    var btns = document.querySelectorAll('.btn-sound-toggle');
    btns.forEach(function (b) {
      var activo = masterOn && (running || lobbyOn);
      b.textContent = activo ? '🔊' : '🔇';
      b.title = masterOn ? 'Silenciar sonido' : 'Activar sonido';
      b.classList.toggle('sound-on', activo);
    });
    var masterChk = document.getElementById('cfg-sound');
    if (masterChk) masterChk.checked = masterOn;
    var lobbyChk = document.getElementById('cfg-sound-lobby');
    if (lobbyChk) lobbyChk.checked = lobbyOn;
    var nivelChk = document.getElementById('cfg-sound-levelup');
    if (nivelChk) nivelChk.checked = nivelOn;
    var slider = document.getElementById('cfg-volume');
    if (slider) slider.value = getVolumen();
    var volLbl = document.getElementById('cfg-volume-value');
    if (volLbl) volLbl.textContent = getVolumen() + '%';
    actualizarVolumenDeshabilitado();
  }

  function actualizarVolumenDeshabilitado() {
    var off = !masterOn;
    ['cfg-volume', 'cfg-sound-lobby', 'cfg-sound-levelup'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.disabled = off;
      var row = el.closest ? el.closest('.config-toggle-row') : null;
      if (row) row.style.opacity = off ? '0.45' : '1';
    });
  }

  /* ─── Auto-init ─── */
  function autoInit() {
    var arrancado = false;
    function primerGesto() {
      if (arrancado) return;
      arrancado = true;
      init();
      if (masterOn && lobbyOn) start();
      actualizarBoton();
      document.removeEventListener('click', primerGesto);
      document.removeEventListener('keydown', primerGesto);
    }
    document.addEventListener('click', primerGesto);
    document.addEventListener('keydown', primerGesto);
    actualizarBoton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }

  return {
    start: start,
    stop: stop,
    toggle: toggle,
    isOn: isOn,
    blip: blip,
    nivelArriba: nivelArriba,
    paraPantalla: paraPantalla,
    setMasterOn: setMasterOn,
    setLobbyOn: setLobbyOn,
    setNivelOn: setNivelOn,
    setVolumen: setVolumen,
    getVolumen: getVolumen,
    getEstado: getEstado,
    actualizarBoton: actualizarBoton
  };
})();
