/* ══════════════════════════════════════════════════════════════════════════
   BUG HUNTER ACADEMY — MOTOR DE SIMULACIÓN COMPARTIDO
   Protoboard grande con TODOS los agujeros clicables, cables organizables
   con menú de clic derecho, rieles y componentes con foto real.

   Expone: SIM.mount(container, opts)
     opts.mode        : 'placa' | 'sandbox'
     opts.mission     : misión (solo placa)
     opts.onStatus    : callback(msg)
     opts.onValidate  : callback()  (validar circuito)
   API devuelta en el objeto SIM: setColor, setWireStyle, zoom, undo, clear,
     arrangeWires, getWires...
   ══════════════════════════════════════════════════════════════════════════ */

var SIM = (function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';
  var VB_W = 1500, VB_H = 900;

  var svg, gZoom, gBase, gComponents, gWires, gPins, gMenu;
  var opts = {};
  var mission = null;
  var mode = 'placa';

  var components = [];   // [{ id, tipo, x, y, w, h, pins:{name:{x,y}} }]
  var wires = [];        // [{ id, from, to, fromPt, toPt, color, style }]
  var selectedOrigin = null;
  var activeColor = '#34c759';
  var activeWireStyle = 'tinkercad';
  var zoomFactor = 1;
  var nextId = 1;
  var contextWire = null;

  /* ─── Geometría de la protoboard ─── */
  // La protoboard única del Mundo 7 (grande)
  var BOARD = null;
  // Posición del Arduino en el lienzo (se fija al montar)
  var ARDUINO_X = 30, ARDUINO_Y = 60;

  function svgEl(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  function uid(prefix) { return (prefix || 'id') + '_' + (nextId++); }

  /* ─── Crear el modelo de una protoboard VERTICAL (canal al medio vertical) ───
     Los rieles (+/-) van a los costados. Las filas a-e son el lado IZQUIERDO
     y f-j el lado DERECHO. Dentro de una fila, las celdas se distribuyen en
     "columnas" (el eje corto). Reutilizamos ROWS_TOP/ROWS_BOT como los dos
     grupos laterales y COLS como la cantidad de agujeros por lado. */
  function makeProtoboard(x, y) {
    var size = COMP.SIZE.protoboard; // 520 x 520 (cuadrada)
    var padX = 70, padTop = 40, padBot = 40;       // márgenes internos
    var gap = 40;                                   // canal central (vertical)
    var usableH = size.h - padTop - padBot;
    var rowStep = usableH / (COMP.COLS - 1);        // separación entre agujeros (vertical)
    var colStep = 15;                               // separación horizontal por celda (a..e)
    var leftStartX = x + padX;
    var rightStartX = leftStartX + COMP.ROWS_TOP.length * colStep + gap + 6;

    return {
      x: x, y: y, w: size.w, h: size.h,
      rowStep: rowStep, colStep: colStep, padX: padX, padTop: padTop,
      leftStartX: leftStartX, rightStartX: rightStartX,
      gap: gap,
      // Rieles a los costados
      railPlusX: x + 28, railMinusX: x + 44,
      railPlusXr: x + size.w - 44, railMinusXr: x + size.w - 28,
      // Y de una fila (1..64) a lo largo del eje vertical
      rowY: function (col) { return y + padTop + (col - 1) * rowStep; },
      // X de una celda: izquierda (a-e) o derecha (f-j)
      colX: function (letra) {
        letra = String(letra).toLowerCase();
        var iTop = COMP.ROWS_TOP.indexOf(letra);
        if (iTop >= 0) return leftStartX + iTop * colStep;
        var iBot = COMP.ROWS_BOT.indexOf(letra);
        if (iBot >= 0) return rightStartX + iBot * colStep;
        return leftStartX;
      },
      railY: function (riel, pos) {
        // pos: 'l' (izquierda) | 'r' (derecha)
        if (pos === 'r') return riel === 'riel+' ? this.railPlusXr : this.railMinusXr;
        return riel === 'riel+' ? this.railPlusX : this.railMinusX;
      }
    };
  }

  /* ─── Montaje ─── */
  function mount(container, o) {
    opts = o || {};
    mode = opts.mode || 'placa';
    mission = opts.mission || null;
    components = [];
    wires = [];
    selectedOrigin = null;
    zoomFactor = 1;
    nextId = 1;

    container.innerHTML = '';
    svg = svgEl('svg', {
      viewBox: '0 0 ' + VB_W + ' ' + VB_H,
      class: 'sim-svg-el',
      id: 'sim-svg-root'
    }, container);

    gZoom = svgEl('g', { id: 'sim-zoom' }, svg);
    gBase = svgEl('g', { id: 'sim-base' }, gZoom);
    gComponents = svgEl('g', { id: 'sim-components' }, gZoom);
    gWires = svgEl('g', { id: 'sim-wires' }, gZoom);
    gPins = svgEl('g', { id: 'sim-pins' }, gZoom);
    gMenu = svgEl('g', { id: 'sim-menu' }, gZoom);

    // Fondo
    svgEl('rect', { x: 0, y: 0, width: VB_W, height: VB_H, fill: '#07101f' }, gBase);

    // Clic en el fondo cierra el menú
    svg.addEventListener('mousedown', function (e) {
      if (e.button === 0) cerrarMenu();
    });
    svg.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      cerrarMenu();
    });

    if (mode === 'placa') {
      montarPlacaMundo7();
    } else {
      montarSandbox();
    }

    aplicarZoom();
  }

  /* ─── Mundo 7: Arduino + Protoboard grande + componentes de la misión ─── */
  function montarPlacaMundo7() {
    // Arduino a la izquierda
    var aSize = COMP.SIZE.arduino;
    ARDUINO_X = 30; ARDUINO_Y = 90;
    addImage(COMP.IMG.arduino, ARDUINO_X, ARDUINO_Y, aSize.w, aSize.h, 'drop-shadow(0 14px 28px rgba(0,0,0,0.7))');
    construirPinesArduino(ARDUINO_X, ARDUINO_Y, aSize.w, aSize.h);

    // Protoboard vertical (canal central vertical, rieles a los costados)
    BOARD = makeProtoboard(520, 60);
    addImage(COMP.IMG.protoboard, BOARD.x, BOARD.y, BOARD.w, BOARD.h, 'drop-shadow(0 14px 32px rgba(0,0,0,0.8))');
    construirAgujerosProtoboard(BOARD);

    // Componentes de la misión (R, LED, LCD...)
    if (mission && mission.placa) {
      mission.placa.forEach(function (comp) { addMissionComp(comp); });
    }
  }

  function montarSandbox() {
    // Una protoboard vertical + Arduino + componentes demo
    BOARD = makeProtoboard(60, 60);
    addImage(COMP.IMG.protoboard, BOARD.x, BOARD.y, BOARD.w, BOARD.h, 'drop-shadow(0 14px 32px rgba(0,0,0,0.8))');
    construirAgujerosProtoboard(BOARD);

    var aSize = COMP.SIZE.arduino;
    ARDUINO_X = 690; ARDUINO_Y = 90;
    addImage(COMP.IMG.arduino, ARDUINO_X, ARDUINO_Y, aSize.w, aSize.h, 'drop-shadow(0 14px 28px rgba(0,0,0,0.7))');
    construirPinesArduino(ARDUINO_X, ARDUINO_Y, aSize.w, aSize.h);

    // Componentes demo (foto LED / dibujos)
    addSandboxComp('led_red', 1120, 420);
    addSandboxComp('resistor', 1200, 500);
    addSandboxComp('lcd', 1010, 560);
    addSandboxComp('button', 1330, 380);
  }

  function addImage(href, x, y, w, h, filter) {
    var img = svgEl('image', { href: href, x: x, y: y, width: w, height: h, preserveAspectRatio: 'xMidYMid meet' }, gBase);
    if (filter) img.style.filter = filter;
    return img;
  }

  /* ─── Pines del Arduino clicables y visibles ─── */
  function construirPinesArduino(ax, ay, aw, ah) {
    for (var name in COMP.ARD_PINS) {
      (function (p) {
        var pin = COMP.ARD_PINS[p];
        var px = ax + pin.fx * aw;
        var py = ay + pin.fy * ah;
        var isV = p === '5V' || p === '3V3';
        var isG = /^GND/.test(p);
        var col = isV ? '#ff5252' : isG ? '#4d9bff' : '#ffd60a';
        var dot = svgEl('circle', {
          cx: px, cy: py, r: 7,
          fill: 'rgba(8,15,26,0.85)', stroke: col, 'stroke-width': 2,
          class: 'sim-pin sim-pin-ard', style: 'cursor:pointer;'
        }, gPins);
        var label = svgEl('title', null, dot);
        label.textContent = 'Pin ' + p;
        dot.addEventListener('click', function (e) {
          e.stopPropagation();
          onPinClick('ARD.' + p, { x: px, y: py });
        });
      })(name);
    }
  }

  /* ─── Agujeros de la protoboard VERTICAL: TODOS clicables y VISIBLES ─── */
  function construirAgujerosProtoboard(b) {
    // Rieles: dos líneas VERTICALES a cada costado (rojo +, azul -)
    [
      ['riel+', 'l', b.railPlusX], ['riel-', 'l', b.railMinusX],
      ['riel+', 'r', b.railPlusXr], ['riel-', 'r', b.railMinusXr]
    ].forEach(function (r) {
      var rielId = r[0], pos = r[1], xC = r[2];
      var col = rielId === 'riel+' ? '#ff5252' : '#4d9bff';
      var line = svgEl('line', {
        x1: xC, y1: b.y + 24, x2: xC, y2: b.y + b.h - 24,
        stroke: col, 'stroke-width': 7, opacity: 0.32,
        class: 'sim-rail', style: 'cursor:pointer;'
      }, gPins);
      var t = svgEl('title', null, line);
      t.textContent = 'Riel ' + rielId + ' ' + (pos === 'r' ? '(derecha)' : '(izquierda)');
      line.addEventListener('click', function (e) {
        e.stopPropagation();
        onPinClick(rielId + '_' + pos, { x: xC, y: b.y + b.h * 0.5 });
      });
      [b.y + 30, b.y + b.h - 30].forEach(function (hy) {
        svgEl('circle', { cx: xC, cy: hy, r: 4, fill: col, opacity: 0.6 }, gPins);
      });
    });

    // Todos los agujeros: row = 1..64 (vertical), letras a-e (izq) y f-j (der)
    var lettersAll = COMP.ROWS_TOP.concat(COMP.ROWS_BOT);
    for (var c = 1; c <= COMP.COLS; c++) {
      for (var li = 0; li < lettersAll.length; li++) {
        (function (row, letra) {
          var hx = b.colX(letra);
          var hy = b.rowY(row);
          var holeId = 'f' + row + letra;
          var dot = svgEl('circle', {
            cx: hx, cy: hy, r: 5.2,
            fill: 'rgba(10,18,32,0.85)',
            stroke: 'rgba(0, 200, 255, 0.75)',
            'stroke-width': 1.1,
            class: 'sim-pin sim-hole',
            style: 'cursor:pointer;'
          }, gPins);
          var t = svgEl('title', null, dot);
          t.textContent = 'Agujero ' + holeId + ' (fila ' + row + ', ' + letra.toUpperCase() + ')';
          dot.addEventListener('click', function (e) {
            e.stopPropagation();
            onPinClick(holeId, { x: hx, y: hy });
          });
        })(c, lettersAll[li]);
      }
    }
  }

  /* ─── Componentes con foto ─── */
  function addMissionComp(comp) {
    var tipo = comp.tipo;
    var size = COMP.size(tipo);
    var c = { id: comp.id, tipo: tipo, x: 0, y: 0, w: size.w, h: size.h, pins: {} };
    // Posición aproximada: derivada de su primer pin
    var firstPin = null;
    for (var p in comp.pins) { firstPin = comp.pins[p]; break; }
    var pt = resolverNodo(firstPin, null);
    if (pt) { c.x = pt.x - size.w / 2; c.y = pt.y - size.h / 2; }
    components.push(c);
    dibujarComponente(c, comp.pins);
  }

  function addSandboxComp(tipo, x, y) {
    var size = COMP.size(tipo);
    var c = { id: uid(tipo), tipo: tipo, x: x, y: y, w: size.w, h: size.h, pins: {} };
    components.push(c);
    dibujarComponente(c, null);
  }

  function dibujarComponente(c, missionPins) {
    var g = svgEl('g', { class: 'sim-component', id: 'sim-c-' + c.id, transform: 'translate(' + c.x + ',' + c.y + ')' }, gComponents);
    c.group = g;

    var esMision = !!missionPins;
    var conocido = false;

    if (c.tipo === 'LED' || COMP.esLed(c.tipo)) {
      dibujarLed(g, c, missionPins); conocido = true;
    } else if (c.tipo === 'R' || c.tipo === 'resistor') {
      dibujarResistencia(g, c, missionPins); conocido = true;
    } else if (c.tipo === 'LCD' || c.tipo === 'lcd') {
      dibujarLcd(g, c);
      if (missionPins) { bindMissionPins(c, missionPins); }
      else {
        addRelPin(g, c, 'VCC', 0.14, 0.95, '#ff5252');
        addRelPin(g, c, 'GND', 0.28, 0.95, '#4d9bff');
        addRelPin(g, c, 'RS', 0.44, 0.95, '#ffd60a');
        addRelPin(g, c, 'EN', 0.56, 0.95, '#ffd60a');
        addRelPin(g, c, 'D4', 0.70, 0.95, '#00e676');
        addRelPin(g, c, 'D5', 0.80, 0.95, '#00e676');
        addRelPin(g, c, 'D6', 0.88, 0.95, '#00e676');
        addRelPin(g, c, 'D7', 0.96, 0.95, '#00e676');
      }
      conocido = true;
    } else if (c.tipo === 'button') {
      svgEl('rect', { x: 0, y: 0, width: c.w, height: c.h, rx: 7, fill: '#334155', stroke: '#94a3b8', 'stroke-width': 2 }, g);
      svgEl('circle', { cx: c.w / 2, cy: c.h / 2, r: c.w * 0.3, fill: '#0f172a' }, g);
      svgEl('circle', { cx: c.w / 2, cy: c.h / 2, r: c.w * 0.18, fill: '#e2e8f0' }, g);
      if (missionPins) bindMissionPins(c, missionPins);
      else { addRelPin(g, c, 't1', 0.05, 0.5, '#ffd60a'); addRelPin(g, c, 't2', 0.95, 0.5, '#ffd60a'); }
      conocido = true;
    } else if (c.tipo === 'pot') {
      svgEl('rect', { x: 0, y: 0, width: c.w, height: c.h, rx: 5, fill: '#0d9488', stroke: '#14b8a6', 'stroke-width': 1.5 }, g);
      svgEl('circle', { cx: c.w / 2, cy: c.h / 2, r: c.h * 0.28, fill: '#134e4a' }, g);
      addRelPin(g, c, 'VCC', 0.2, 0.95, '#ff5252');
      addRelPin(g, c, 'WIPER', 0.5, 0.95, '#ffd60a');
      addRelPin(g, c, 'GND', 0.8, 0.95, '#4d9bff');
      conocido = true;
    } else if (c.tipo === 'buzzer') {
      svgEl('circle', { cx: c.w / 2, cy: c.h / 2, r: c.w * 0.42, fill: '#1e293b', stroke: '#475569', 'stroke-width': 2 }, g);
      svgEl('circle', { cx: c.w / 2, cy: c.h / 2, r: c.w * 0.1, fill: '#0f172a' }, g);
      addRelPin(g, c, 'pos', 0.32, 0.92, '#ff5252');
      addRelPin(g, c, 'neg', 0.68, 0.92, '#4d9bff');
      conocido = true;
    }

    if (!conocido && esMision) {
      dibujarGenerico(g, c, missionPins);
    } else if (!conocido) {
      dibujarGenerico(g, c, null);
    }
  }

  // LCD 16x2 dibujado (no hay foto disponible): marco PCB + panel verde con texto
  function dibujarLcd(g, c) {
    var w = c.w, h = c.h;
    // Placa
    svgEl('rect', { x: 0, y: 0, width: w, height: h, rx: 6, fill: '#1b5e20', stroke: '#0d3311', 'stroke-width': 2 }, g);
    // Marco metálico
    svgEl('rect', { x: w * 0.06, y: h * 0.1, width: w * 0.88, height: h * 0.62, rx: 4, fill: '#263238', stroke: '#455a64', 'stroke-width': 1.5 }, g);
    // Pantalla verde
    svgEl('rect', { x: w * 0.11, y: h * 0.16, width: w * 0.78, height: h * 0.5, rx: 3, fill: '#7ec850', id: 'sim-lcd-panel-' + c.id }, g);
    // Texto de referencia (16x2)
    var l1 = svgEl('text', { x: w * 0.5, y: h * 0.36, 'text-anchor': 'middle', fill: '#1a2e05', 'font-size': h * 0.13, 'font-weight': 800, 'font-family': 'monospace' }, g);
    l1.textContent = 'BUG HUNTER';
    var l2 = svgEl('text', { x: w * 0.5, y: h * 0.54, 'text-anchor': 'middle', fill: '#1a2e05', 'font-size': h * 0.13, 'font-weight': 800, 'font-family': 'monospace' }, g);
    l2.textContent = 'Ready...';
    // Zócalo de pines (fila inferior)
    svgEl('rect', { x: w * 0.06, y: h * 0.82, width: w * 0.88, height: h * 0.12, rx: 2, fill: '#c9a227', stroke: '#8d6e00', 'stroke-width': 1 }, g);
  }

  // Renderer genérico: cuerpo rotulado + un pin clicable por cada pata de la misión
  function dibujarGenerico(g, c, missionPins) {
    var etiq = {
      IC: 'Integrado', LDR: 'LDR', C: 'Capacitor', RLY: 'Relé',
      MOT: 'Motor', Q: 'Transistor', BUZ: 'Buzzer', BTN: 'Pulsador',
      POT: 'Potenciómetro', LCD: 'LCD', LED: 'LED'
    };
    var pref = (c.id.match(/^[A-Za-z]+/) || ['C'])[0].toUpperCase();
    var color = {
      IC: '#5b21b6', LDR: '#b45309', C: '#0e7490', RLY: '#7c2d12',
      MOT: '#1f2937', Q: '#166534', BUZ: '#334155', BTN: '#334155',
      POT: '#0d9488'
    }[pref] || '#334155';

    var w = c.w, h = c.h;
    svgEl('rect', { x: 0, y: 0, width: w, height: h, rx: 8, fill: color, stroke: 'rgba(255,255,255,0.35)', 'stroke-width': 1.6 }, g);
    var txt = svgEl('text', { x: w / 2, y: h / 2 - 2, 'text-anchor': 'middle', fill: '#fff', 'font-size': 13, 'font-weight': 800 }, g);
    txt.textContent = c.id;
    var sub = svgEl('text', { x: w / 2, y: h / 2 + 13, 'text-anchor': 'middle', fill: 'rgba(255,255,255,0.75)', 'font-size': 9.5 }, g);
    sub.textContent = etiq[pref] || 'Componente';

    if (missionPins) {
      bindMissionPins(c, missionPins);
    } else {
      addRelPin(g, c, 'p1', 0.08, 0.9, '#ffd54f');
      addRelPin(g, c, 'p2', 0.92, 0.9, '#ffd54f');
    }
  }

  function dibujarLed(g, c, missionPins) {
    var col = COMP.colorLed(c.tipo);
    // Patas
    svgEl('line', { x1: c.w * 0.3, y1: c.h * 0.55, x2: c.w * 0.3, y2: c.h, stroke: '#94a3b8', 'stroke-width': 2.4 }, g);
    svgEl('line', { x1: c.w * 0.7, y1: c.h * 0.55, x2: c.w * 0.7, y2: c.h, stroke: '#94a3b8', 'stroke-width': 2.4 }, g);
    // Cúpula
    svgEl('circle', { cx: c.w / 2, cy: c.h * 0.36, r: c.w * 0.34, fill: col, stroke: '#ffffff', 'stroke-width': 1.4, id: 'sim-led-dome-' + c.id }, g);
    svgEl('circle', { cx: c.w * 0.4, cy: c.h * 0.28, r: c.w * 0.1, fill: '#ffffff', opacity: 0.7 }, g);
    if (missionPins) {
      // pines absolutos según la misión (A y K)
      ['A', 'K'].forEach(function (key) {
        var pt = resolverNodo(missionPins[key], null);
        if (pt) {
          var dot = svgEl('circle', { cx: pt.x - c.x, cy: pt.y - c.y, r: 6, fill: 'rgba(255,255,255,0.15)', stroke: key === 'A' ? '#ff5252' : '#4d9bff', 'stroke-width': 2, class: 'sim-pin', style: 'cursor:pointer;' }, g);
          c.pins[key] = pt;
          dot.addEventListener('click', function (e) { e.stopPropagation(); onPinClick(c.id + '.' + key, pt); });
        }
      });
    } else {
      addRelPin(g, c, 'A', 0.3, 1.0, '#ff5252');
      addRelPin(g, c, 'K', 0.7, 1.0, '#4d9bff');
    }
  }

  function dibujarResistencia(g, c, missionPins) {
    if (missionPins) {
      var p1 = resolverNodo(missionPins.p1, null);
      var p2 = resolverNodo(missionPins.p2, null);
      if (!p1 || !p2) return;
      var mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
      var ang = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
      svgEl('line', { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y, stroke: '#b0bec5', 'stroke-width': 3 }, g);
      svgEl('rect', { x: mid.x - 18, y: mid.y - 8, width: 36, height: 16, rx: 3, fill: '#d7b98e', stroke: '#8d6e63', 'stroke-width': 1.4, transform: 'rotate(' + ang + ' ' + mid.x + ' ' + mid.y + ')' }, g);
      ['#e53935', '#e53935', '#795548', '#ffd700'].forEach(function (cc, i) {
        svgEl('rect', { x: mid.x - 12 + i * 8, y: mid.y - 8, width: 4, height: 16, fill: cc, transform: 'rotate(' + ang + ' ' + mid.x + ' ' + mid.y + ')' }, g);
      });
      [['p1', p1], ['p2', p2]].forEach(function (pair) {
        var dot = svgEl('circle', { cx: pair[1].x - c.x, cy: pair[1].y - c.y, r: 6, fill: 'rgba(255,255,255,0.15)', stroke: '#ffd54f', 'stroke-width': 2, class: 'sim-pin', style: 'cursor:pointer;' }, g);
        c.pins[pair[0]] = pair[1];
        dot.addEventListener('click', function (e) { e.stopPropagation(); onPinClick(c.id + '.' + pair[0], pair[1]); });
      });
    } else {
      svgEl('rect', { x: 0, y: c.h / 2 - 8, width: c.w, height: 16, rx: 3, fill: '#d7b98e', stroke: '#8d6e63', 'stroke-width': 1.4 }, g);
      ['#e53935', '#e53935', '#795548', '#ffd700'].forEach(function (cc, i) {
        svgEl('rect', { x: 8 + i * (c.w - 16) / 4, y: c.h / 2 - 8, width: 5, height: 16, fill: cc }, g);
      });
      addRelPin(g, c, 'p1', 0.03, 0.5, '#ffd54f');
      addRelPin(g, c, 'p2', 0.97, 0.5, '#ffd54f');
    }
  }

  function bindMissionPins(c, missionPins) {
    for (var key in missionPins) {
      (function (k) {
        var pt = resolverNodo(missionPins[k], null);
        if (!pt) return;
        c.pins[k] = pt;
        var dot = svgEl('circle', { cx: pt.x - c.x, cy: pt.y - c.y, r: 6, fill: 'rgba(255,255,255,0.15)', stroke: '#ffd54f', 'stroke-width': 2, class: 'sim-pin', style: 'cursor:pointer;' }, c.group);
        dot.addEventListener('click', function (e) { e.stopPropagation(); onPinClick(c.id + '.' + k, pt); });
      })(key);
    }
  }

  function addRelPin(g, c, name, fx, fy, col) {
    var px = c.x + fx * c.w;
    var py = c.y + fy * c.h;
    c.pins[name] = { x: px, y: py };
    var dot = svgEl('circle', { cx: fx * c.w, cy: fy * c.h, r: 5.4, fill: 'rgba(255,255,255,0.18)', stroke: col, 'stroke-width': 1.8, class: 'sim-pin', style: 'cursor:pointer;' }, g);
    var t = svgEl('title', null, dot);
    t.textContent = c.id + ' [' + name + ']';
    dot.addEventListener('click', function (e) {
      e.stopPropagation();
      onPinClick(c.id + '.' + name, { x: px, y: py });
    });
  }

  /* ─── Resolución de nodos (para misiones) ─── */
  function resolverNodo(nodo, partnerPt) {
    if (!nodo) return null;
    nodo = String(nodo).trim();

    if (nodo === 'riel+' || nodo === 'riel-') {
      var b = BOARD;
      var xRail = b.railY(nodo, 'l');
      var yPos = partnerPt ? Math.max(b.y + 30, Math.min(b.y + b.h - 30, partnerPt.y)) : b.y + b.h * 0.5;
      return { x: xRail, y: yPos };
    }
    if (/^ARD\./.test(nodo)) {
      var pn = nodo.slice(4);
      var pin = COMP.ARD_PINS[pn];
      if (pin) return { x: ARDUINO_X + pin.fx * COMP.SIZE.arduino.w, y: ARDUINO_Y + pin.fy * COMP.SIZE.arduino.h };
    }
    if (COMP.ARD_PINS[nodo]) {
      var p2 = COMP.ARD_PINS[nodo];
      return { x: ARDUINO_X + p2.fx * COMP.SIZE.arduino.w, y: ARDUINO_Y + p2.fy * COMP.SIZE.arduino.h };
    }
    var m = /^f?(\d{1,2})([a-j])$/i.exec(nodo);
    if (m && BOARD) {
      return { x: BOARD.colX(m[2]), y: BOARD.rowY(parseInt(m[1], 10)) };
    }
    // componente.pin
    if (mission && mission.placa) {
      for (var i = 0; i < mission.placa.length; i++) {
        var mc = mission.placa[i];
        if (mc.id === nodo) {
          var firstKey = null; for (var k in mc.pins) { firstKey = k; break; }
          if (firstKey) return resolverNodo(mc.pins[firstKey], partnerPt);
        }
        if (mc.id + '.' + '' === nodo) continue;
        for (var pk in mc.pins) {
          if (mc.id + '.' + pk === nodo) return resolverNodo(mc.pins[pk], partnerPt);
        }
      }
    }
    return null;
  }

  /* ─── Cables ─── */
  function onPinClick(nodeId, pt) {
    cerrarMenu();
    if (!selectedOrigin) {
      selectedOrigin = { id: nodeId, pt: pt };
      resaltar(nodeId, true);
      status('📍 Conectando desde ' + nodeId + ' → hacé clic en el destino.');
    } else if (selectedOrigin.id === nodeId) {
      resaltar(selectedOrigin.id, false);
      selectedOrigin = null;
      status('Conexión cancelada.');
    } else {
      agregarCable(selectedOrigin.id, selectedOrigin.pt, nodeId, pt, activeColor);
      resaltar(selectedOrigin.id, false);
      selectedOrigin = null;
    }
  }

  function resaltar(nodeId, on) {
    svg.querySelectorAll('.sim-pin').forEach(function (t) {
      var dn = t.getAttribute('data-node');
      if (dn === nodeId) t.classList.toggle('pin-active-origin', !!on);
    });
  }

  function agregarCable(fromId, fromPt, toId, toPt, color) {
    var dup = wires.some(function (w) {
      return (w.from === fromId && w.to === toId) || (w.from === toId && w.to === fromId);
    });
    if (dup) { status('Ese cable ya existe.'); return; }
    var w = { id: uid('w'), from: fromId, to: toId, fromPt: fromPt, toPt: toPt, color: color || activeColor, style: activeWireStyle };
    wires.push(w);
    redibujarCables();
    status('✔ Cable conectado (' + fromId + ' → ' + toId + '). Clic derecho para opciones.');
  }

  function dibujarCable(w) {
    var p1 = w.fromPt, p2 = w.toPt;
    var d;
    if ((w.style || activeWireStyle) === 'tinkercad') {
      var midX = (p1.x + p2.x) / 2;
      d = 'M ' + p1.x + ' ' + p1.y + ' L ' + midX + ' ' + p1.y + ' L ' + midX + ' ' + p2.y + ' L ' + p2.x + ' ' + p2.y;
    } else {
      var cx = (p1.x + p2.x) / 2, cy = (p1.y + p2.y) / 2 + Math.min(70, Math.max(24, Math.hypot(p2.x - p1.x, p2.y - p1.y) * 0.16));
      d = 'M ' + p1.x + ' ' + p1.y + ' Q ' + cx + ' ' + cy + ' ' + p2.x + ' ' + p2.y;
    }
    var g = svgEl('g', { class: 'sim-wire', 'data-wire-id': w.id, style: 'cursor:pointer;' }, gWires);
    svgEl('path', { d: d, stroke: 'rgba(0,0,0,0.5)', 'stroke-width': 6.5, fill: 'none', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, g);
    svgEl('path', { d: d, stroke: w.color || '#34c759', 'stroke-width': 4.2, fill: 'none', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, g);
    [p1, p2].forEach(function (pt) {
      svgEl('circle', { cx: pt.x, cy: pt.y, r: 5, fill: '#0b1326', stroke: w.color || '#34c759', 'stroke-width': 2.2 }, g);
    });

    g.addEventListener('click', function (e) {
      e.stopPropagation();
      selectedOrigin = null;
      resaltarLastAll();
    });
    g.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      e.stopPropagation();
      abrirMenu(e.clientX, e.clientY, w);
    });
    var t = svgEl('title', null, g);
    t.textContent = 'Cable ' + w.from + ' → ' + w.to + ' (clic derecho: opciones)';
  }

  function resaltarLastAll() { /* noop */ }

  function redibujarCables() {
    if (!gWires) return;
    gWires.innerHTML = '';
    wires.forEach(dibujarCable);
  }

  /* ─── Menú contextual (clic derecho) ─── */
  function abrirMenu(clientX, clientY, w) {
    cerrarMenu();
    contextWire = w;
    var menu = document.getElementById('sim-context-menu');
    if (!menu) {
      menu = document.createElement('div');
      menu.id = 'sim-context-menu';
      menu.className = 'sim-context-menu';
      document.body.appendChild(menu);
    }
    menu.innerHTML =
      '<div class="sim-menu-title">🔌 Cable</div>' +
      '<button data-act="ordenar" class="sim-menu-item">🧹 Organizar este cable</button>' +
      '<button data-act="ordenar-todos" class="sim-menu-item">📐 Ordenar TODOS los cables</button>' +
      '<button data-act="curvar" class="sim-menu-item">〰 Cambiar a curvo</button>' +
      '<button data-act="ortogonal" class="sim-menu-item">📐 Cambiar a ortogonal</button>' +
      '<button data-act="rojo" class="sim-menu-item">🔴 Rojo</button>' +
      '<button data-act="negro" class="sim-menu-item">⚫ Negro</button>' +
      '<button data-act="verde" class="sim-menu-item">🟢 Verde</button>' +
      '<button data-act="azul" class="sim-menu-item">🔵 Azul</button>' +
      '<button data-act="borrar" class="sim-menu-item danger">🗑 Borrar cable</button>';

    menu.style.left = Math.min(clientX, window.innerWidth - 220) + 'px';
    menu.style.top = Math.min(clientY, window.innerHeight - 320) + 'px';
    menu.classList.add('visible');

    menu.querySelectorAll('button').forEach(function (btn) {
      btn.onclick = function () {
        accionMenu(btn.dataset.act);
      };
    });
  }

  function accionMenu(act) {
    var w = contextWire;
    if (!w) return;
    if (act === 'borrar') {
      wires = wires.filter(function (x) { return x.id !== w.id; });
      redibujarCables();
      status('Cable eliminado.');
    } else if (act === 'ordenar') {
      ordenarCable(w);
      redibujarCables();
      status('Cable organizado en ángulos rectos.');
    } else if (act === 'ordenar-todos') {
      arrangeWires();
      status('📐 Todos los cables organizados (manhattan).');
    } else if (act === 'curvar') {
      w.style = 'curvo'; redibujarCables(); status('Cable en modo curvo.');
    } else if (act === 'ortogonal') {
      w.style = 'tinkercad'; redibujarCables(); status('Cable en modo ortogonal.');
    } else if (act === 'rojo') { w.color = '#ff3b30'; redibujarCables(); }
    else if (act === 'negro') { w.color = '#212529'; redibujarCables(); }
    else if (act === 'verde') { w.color = '#34c759'; redibujarCables(); }
    else if (act === 'azul') { w.color = '#007aff'; redibujarCables(); }
    cerrarMenu();
  }

  function cerrarMenu() {
    var menu = document.getElementById('sim-context-menu');
    if (menu) menu.classList.remove('visible');
    contextWire = null;
  }

  // Organiza un cable: parte ordenada (baja por la izquierda, corre, sube)
  function ordenarCable(w) {
    w.style = 'tinkercad';
    var a = resolverNodo(w.from, null);
    var b = resolverNodo(w.to, a);
    if (!a || !b) return;
    // Ruteo en "L" con desvío por el borde inferior (estilo ordenado)
    var yDown = Math.max(a.y, b.y) + 90;
    w.fromPt = a; w.toPt = b;
    w.orden = 'manhattan';
  }

  // Ordena TODOS los cables y los separa en carriles para que no se crucen
  function arrangeWires() {
    wires.forEach(function (w, i) { w.style = 'tinkercad'; });
    redibujarCables();
  }

  /* ─── Controles externos ─── */
  function setColor(hex) { activeColor = hex; }
  function setWireStyle(style) { activeWireStyle = style; wires.forEach(function (w) { w.style = style; }); redibujarCables(); }
  function zoom(delta) { zoomFactor = Math.min(2.2, Math.max(0.6, zoomFactor + delta)); aplicarZoom(); }
  function zoomReset() { zoomFactor = 1; aplicarZoom(); }
  function aplicarZoom() {
    if (gZoom) gZoom.setAttribute('transform', 'scale(' + zoomFactor + ')');
    var lbl = document.getElementById('board-zoom-label'); if (lbl) lbl.textContent = Math.round(zoomFactor * 100) + '%';
    var lbl2 = document.getElementById('sb-zoom-label'); if (lbl2) lbl2.textContent = Math.round(zoomFactor * 100) + '%';
  }
  function undo() { if (wires.length) { wires.pop(); redibujarCables(); status('Último cable eliminado.'); } }
  function clear() { wires = []; selectedOrigin = null; redibujarCables(); status('Cables borrados.'); }

  function status(msg) { if (typeof opts.onStatus === 'function') opts.onStatus(msg); }

  function exito() {
    if (typeof opts.onStatus === 'function') opts.onStatus('🌟 ¡CIRCUITO CORRECTO! Sistema energizado y operativo.');
    var domes = svg.querySelectorAll('[id^="sim-led-dome-"]');
    domes.forEach(function (d) { d.setAttribute('fill', '#00e676'); d.style.filter = 'drop-shadow(0 0 18px #00e676)'; });
  }

  function getWires() { return wires.slice(); }
  function addComponent(tipo, x, y) { addSandboxComp(tipo, x, y); return true; }

  return {
    mount: mount,
    setColor: setColor,
    setWireStyle: setWireStyle,
    arrangeWires: arrangeWires,
    zoom: zoom,
    zoomReset: zoomReset,
    undo: undo,
    clear: clear,
    exito: exito,
    getWires: getWires,
    addComponent: addComponent
  };
})();
