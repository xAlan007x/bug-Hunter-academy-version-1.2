/* ══════════════════════════════════════════════════════════════════════════
   BUG HUNTER ACADEMY — DATOS COMPARTIDOS DE COMPONENTES
   Usado por el simulador del Mundo 7 (placa.js) y el Modo Libre (sandbox.js).
   Define:
   - Pines del Arduino Uno (coordenadas relativas a la imagen 586x426)
   - Tamaños estándar de cada componente
   - Imágenes/fotos usadas
   ══════════════════════════════════════════════════════════════════════════ */

var COMP = {
  // Imágenes disponibles en img/ (solo fotos reales; LCD/R/LED se dibujan)
  IMG: {
    arduino: 'img/arduino_uno.png',
    protoboard: 'img/protoboard_real.png'
  },

  // Tamaños base de cada componente (en unidades del lienzo)
  SIZE: {
    arduino: { w: 360, h: 262 },
    protoboard: { w: 520, h: 520 },
    led: { w: 44, h: 46 },
    resistor: { w: 90, h: 30 },
    lcd: { w: 260, h: 120 },
    button: { w: 44, h: 44 },
    pot: { w: 52, h: 40 },
    buzzer: { w: 48, h: 48 },
    ldr: { w: 60, h: 44 },
    IC: { w: 96, h: 60 },
    C: { w: 46, h: 44 },
    RLY: { w: 84, h: 62 },
    MOT: { w: 64, h: 64 },
    Q: { w: 56, h: 56 },
    BUZ: { w: 48, h: 48 },
    BTN: { w: 50, h: 46 },
    generic: { w: 68, h: 48 }
  },

  // Nombres legibles
  NAME: {
    arduino: 'Arduino Uno R3',
    protoboard: 'Protoboard 830 puntos',
    led: 'LED',
    led_red: 'LED Rojo',
    led_green: 'LED Verde',
    led_blue: 'LED Azul',
    led_yellow: 'LED Amarillo',
    resistor: 'Resistencia (220Ω)',
    lcd: 'Display LCD 16x2',
    button: 'Pulsador',
    pot: 'Potenciómetro',
    buzzer: 'Buzzer',
    ldr: 'Fotoresistencia (LDR)'
  },

  // Colores de LED por tipo
  LED_COLOR: {
    led: '#ff3b30',
    led_red: '#ff3b30',
    led_green: '#34c759',
    led_blue: '#007aff',
    led_yellow: '#ffd60a'
  },

  /* Pines del Arduino: coordenadas en fracción (0..1) sobre la imagen.
     Cabecera superior (digital) y cabecera inferior (power/analog).
     Calibrado sobre arduino_uno.png (586x426). */
  ARD_PINS: {
    // Cabecera superior
    AREF: { fx: 0.393, fy: 0.133 }, GND: { fx: 0.419, fy: 0.133 },
    D13: { fx: 0.444, fy: 0.133 }, D12: { fx: 0.470, fy: 0.133 },
    D11: { fx: 0.496, fy: 0.133 }, D10: { fx: 0.521, fy: 0.133 },
    D9: { fx: 0.547, fy: 0.133 }, D8: { fx: 0.571, fy: 0.133 },
    D7: { fx: 0.623, fy: 0.133 }, D6: { fx: 0.648, fy: 0.133 },
    D5: { fx: 0.674, fy: 0.133 }, D4: { fx: 0.699, fy: 0.133 },
    D3: { fx: 0.725, fy: 0.133 }, D2: { fx: 0.751, fy: 0.133 },
    D1: { fx: 0.780, fy: 0.133 }, D0: { fx: 0.804, fy: 0.133 },
    // Cabecera inferior
    IOREF: { fx: 0.462, fy: 0.865 }, RESET: { fx: 0.487, fy: 0.865 },
    '3V3': { fx: 0.512, fy: 0.865 }, '5V': { fx: 0.538, fy: 0.865 },
    GND1: { fx: 0.564, fy: 0.865 }, GND2: { fx: 0.589, fy: 0.865 },
    VIN: { fx: 0.615, fy: 0.865 }, A0: { fx: 0.665, fy: 0.865 },
    A1: { fx: 0.690, fy: 0.865 }, A2: { fx: 0.716, fy: 0.865 },
    A3: { fx: 0.741, fy: 0.865 }, A4: { fx: 0.767, fy: 0.865 },
    A5: { fx: 0.793, fy: 0.865 }
  },

  // Filas (bloques a-e y f-j) y rieles
  ROWS_TOP: ['a', 'b', 'c', 'd', 'e'],
  ROWS_BOT: ['f', 'g', 'h', 'i', 'j'],
  COLS: 64,

  esLed: function (tipo) { return /^led/.test(tipo || ''); },
  colorLed: function (tipo) { return COMP.LED_COLOR[tipo] || '#ff3b30'; },
  nombre: function (tipo) { return COMP.NAME[tipo] || tipo; },
  size: function (tipo) { return COMP.SIZE[COMP.esLed(tipo) ? 'led' : tipo] || { w: 60, h: 40 }; }
};
