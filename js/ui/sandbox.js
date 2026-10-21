/* ══════════════════════════════════════════════════════════════════════════
   BUG HUNTER ACADEMY — MODO LIBRE / SANDBOX
   Envoltorio delgado sobre el motor compartido SIM (js/ui/simulador.js).
   Expone la API histórica: SANDBOX.mount, SANDBOX.addComponent
   ══════════════════════════════════════════════════════════════════════════ */

var SANDBOX = (function () {
  'use strict';

  var mounted = false;

  function setStatus(msg) {
    var el = document.getElementById('sb-status-text');
    if (el) el.textContent = msg;
  }

  function mount(container) {
    if (!container || typeof SIM === 'undefined') return;
    mounted = true;

    SIM.mount(container, {
      mode: 'sandbox',
      onStatus: setStatus
    });

    bindToolbar();
    setStatus('Banco de trabajo listo. Hacé clic en los pines para conectar jumpers.');
  }

  function bindToolbar() {
    var picker = document.querySelector('#screen-sandbox .wire-color-picker');
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

    var st = document.getElementById('btn-sb-wire-mode');
    var arr = document.getElementById('btn-sb-arrange');
    var clr = document.getElementById('btn-sb-clear');
    var zi = document.getElementById('btn-sb-zoom-in');
    var zo = document.getElementById('btn-sb-zoom-out');

    if (st) {
      st.dataset.style = 'tinkercad';
      st.onclick = function () {
        var next = st.dataset.style === 'tinkercad' ? 'curvo' : 'tinkercad';
        st.dataset.style = next;
        st.textContent = next === 'curvo' ? '〰 Curvo' : '📐 Ortogonal Tinkercad';
        SIM.setWireStyle(next);
      };
    }
    if (arr) arr.onclick = function () { SIM.arrangeWires(); };
    if (clr) clr.onclick = function () { SIM.clear(); setStatus('Lienzo vaciado.'); };
    if (zi) zi.onclick = function () { SIM.zoom(0.15); };
    if (zo) zo.onclick = function () { SIM.zoom(-0.15); };
  }

  function addComponent(tipo) {
    if (!mounted) return;
    var map = { 'arduino': 'arduino', 'protoboard': 'protoboard' };
    if (map[tipo]) {
      setStatus('Ese componente ya está fijo en el lienzo.');
      return;
    }
    // Coloca el nuevo componente en una posición libre-ish según cuántos haya
    var n = SIM.getWires().length; // no-op reference; posición incremental simple
    var x = 760 + (Math.random() * 180);
    var y = 120 + (Math.random() * 520);
    SIM.addComponent(tipo, x, y);
    setStatus('Componente agregado: ' + tipo + '. Hacé clic en sus pines para conectar.');
  }

  return { mount: mount, addComponent: addComponent };
})();
