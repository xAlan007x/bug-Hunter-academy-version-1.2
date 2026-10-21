/* ══════════════════════════════════════════════════════════════════════════
   BUG HUNTER ACADEMY — SIMULADOR DEL MUNDO 7 (PROTOBOARD + ARDUINO)
   Envoltorio delgado sobre el motor compartido SIM (js/ui/simulador.js).
   Expone la API histórica: PLACA.mount, PLACA.reset, PLACA.draw, PLACA.exito
   ══════════════════════════════════════════════════════════════════════════ */

var PLACA = (function () {
  'use strict';

  var mounted = false;
  var currentMission = null;

  function setStatus(msg) {
    var el = document.getElementById('board-status-text');
    if (el) el.textContent = msg;
  }

  function mount(container, mission) {
    if (!container || typeof SIM === 'undefined') return;
    currentMission = mission || null;
    mounted = true;

    SIM.mount(container, {
      mode: 'placa',
      mission: currentMission,
      onStatus: setStatus
    });

    bindToolbar();
  }

  function bindToolbar() {
    var picker = document.querySelector('#placa-box .wire-color-picker');
    if (picker && !picker.dataset.bound) {
      picker.dataset.bound = '1';
      picker.querySelectorAll('.color-dot-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          picker.querySelectorAll('.color-dot-btn').forEach(function (b) { b.classList.remove('selected'); });
          btn.classList.add('selected');
          SIM.setColor(btn.dataset.color);
        });
      });
    }

    var zi = document.getElementById('btn-board-zoom-in');
    var zo = document.getElementById('btn-board-zoom-out');
    var zr = document.getElementById('btn-board-zoom-reset');
    var und = document.getElementById('btn-undo-wire');
    var clr = document.getElementById('btn-clear-wires');
    var sty = document.getElementById('btn-toggle-wire-style');
    var arr = document.getElementById('btn-arrange-wires');

    if (zi) zi.onclick = function () { SIM.zoom(0.15); };
    if (zo) zo.onclick = function () { SIM.zoom(-0.15); };
    if (zr) zr.onclick = function () { SIM.zoomReset(); };
    if (und) und.onclick = function () { SIM.undo(); };
    if (clr) clr.onclick = function () { SIM.clear(); };
    if (arr) arr.onclick = function () { SIM.arrangeWires(); };
    if (sty) {
      sty.onclick = function () {
        var cur = sty.dataset.style === 'curvo' ? 'curvo' : 'tinkercad';
        var next = cur === 'tinkercad' ? 'curvo' : 'tinkercad';
        sty.dataset.style = next;
        sty.textContent = next === 'curvo' ? '〰 Curvo' : '📐 Tinkercad';
        SIM.setWireStyle(next);
      };
      sty.dataset.style = 'tinkercad';
    }
  }

  function reset() {
    setStatus('LED apagado — Circuito abierto');
    var dot = document.getElementById('board-led-dot');
    if (dot) dot.classList.remove('on');
    if (mounted) SIM.clear();
  }

  // Ejecutar código del usuario: si detecta digitalWrite HIGH en el LED, encender
  function draw(code) {
    if (!code) return;
    var encender = /digitalWrite\s*\(\s*\d+\s*,\s*HIGH/i.test(code) || /\.write\s*\(\s*HIGH/i.test(code);
    var dot = document.getElementById('board-led-dot');
    if (encender) {
      if (dot) dot.classList.add('on');
      setStatus('⚡ Salida HIGH detectada — LED encendido.');
    }
  }

  function exito() {
    if (mounted) SIM.exito();
    var dot = document.getElementById('board-led-dot');
    if (dot) dot.classList.add('on');
  }

  return { mount: mount, reset: reset, draw: draw, exito: exito };
})();
