/* ══════════════════════════════════════════════════════════════════════════
   CIRCUIT SIMULATOR — ESTADO Y CONTROL DE COMPONENTES
   ══════════════════════════════════════════════════════════════════════════ */

function setLed(state, label) {
  const led = document.getElementById('led');
  const ledLabel = document.getElementById('led-label');
  const boardDot = document.getElementById('board-led-dot');
  const boardStatus = document.getElementById('board-status-text');

  if (led) {
    led.classList.remove('on', 'error');
    if (state === 'on') {
      led.classList.add('on');
      led.style.background = '#00e676';
      led.style.boxShadow = '0 0 16px #00e676';
    } else if (state === 'error') {
      led.classList.add('error');
      led.style.background = '#ef4444';
      led.style.boxShadow = '0 0 16px #ef4444';
    } else {
      led.style.background = '#1e293b';
      led.style.boxShadow = 'none';
    }
  }

  if (ledLabel) {
    ledLabel.textContent = label || (state === 'on' ? 'LED encendido' : 'LED apagado');
  }

  if (boardDot) {
    if (state === 'on') boardDot.className = 'indicator-led-dot active';
    else if (state === 'error') boardDot.className = 'indicator-led-dot error';
    else boardDot.className = 'indicator-led-dot';
  }

  if (boardStatus && label) {
    boardStatus.textContent = label;
  }
}

function resetLed() {
  setLed('off', 'LED apagado — Circuito abierto');
}