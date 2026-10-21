/* ══════════════════════════════════════════════════════════════════════════
   BUG HUNTER ACADEMY & TIENDAVIRTUS — MOTOR PRINCIPAL
   - Badges de Lenguajes (Python, HTML, CSS, JavaScript, Arduino C++)
   - Protoboard y Arduino SOLO en el Mundo 7
   - Subida de foto de perfil personalizada
   - Modo Oscuro y Claro con persistencia
   - Integración con Modo Libre (Sandbox Tinkercad)
   ══════════════════════════════════════════════════════════════════════════ */

var state = {
  profile: null,
  progress: null,
  currentMision: null,
  currentCategoria: 1,
  codemirror: null,
  pistas: 3,
  pistaIdx: 0,
  activeFilter: 'todos',
  bibQuery: '',
  dockHidden: false
};

/* ═══════════ CATEGORÍAS FORMATIVAS ═══════════ */
var CATEGORIAS = [
  { id: 1, nombre: 'Los fundamentos', desc: 'Qué es programar, algoritmos, variables y tipos de datos', icon: '📘', lang: 'HTML & Fundamentos' },
  { id: 2, nombre: 'Cazadores de errores', desc: 'Sintaxis, lógica, condiciones y bucles', icon: '🔍', lang: 'Python' },
  { id: 3, nombre: 'Electrónica desde cero', desc: 'Circuitos, ley de Ohm y componentes', icon: '⚡', lang: 'CSS & Electrónica' },
  { id: 4, nombre: 'Reparaciones reales', desc: 'Sketches de microcontrolador, pines y actuadores', icon: '🔧', lang: 'Arduino C++' },
  { id: 5, nombre: 'Automatización inteligente', desc: 'Sensores de luz, botones y automatismos', icon: '🤖', lang: 'Python' },
  { id: 6, nombre: 'Proyecto final', desc: 'Sistema completo integrado para auditar y reparar', icon: '🏆', lang: 'JavaScript' },
  { id: 7, nombre: 'Protoboard interactiva', desc: 'Cableado físico de jumpers, rieles y componentes en protoboard real', icon: '🧩', dificultad: 'LAB', lang: 'Protoboard' }
];

/* ═══════════ LOGROS / INSIGNIAS ═══════════ */
var LOGROS = [
  { id: 'primera', icon: '🎯', nombre: 'Primer programa', desc: 'Completar tu primera misión con éxito' },
  { id: 'm5', icon: '🔥', nombre: 'En racha', desc: 'Completar 5 misiones' },
  { id: 'm15', icon: '⚡', nombre: 'Cazador de errores', desc: 'Completar 15 misiones' },
  { id: 'm30', icon: '🚀', nombre: 'Treinta misiones', desc: 'Completar 30 misiones' },
  { id: 'sinAyuda', icon: '🌟', nombre: 'Genio electrónico', desc: 'Resolver 5 misiones sin usar pistas' },
  { id: 'proto1', icon: '🧩', nombre: 'Maestro Protoboard', desc: 'Cablear correctamente tu primer circuito en protoboard' },
  { id: 'fundamentos', icon: '📘', nombre: 'Bases sólidas', desc: 'Dominar el Mundo 1: Los fundamentos' },
  { id: 'arduino', icon: '🔌', nombre: 'Técnico Arduino', desc: 'Completar las misiones de reparación de microcontrolador' }
];

function calcNext(nivel) {
  return Math.round(60 * Math.pow(1.25, (nivel || 1) - 1) + 40);
}

function saveProgress() {
  if (state.progress) {
    guardarProgresoPerfil(state.progress);
    if (state.profile) {
      state.profile.progress = state.progress;
      guardarPerfilCompleto(state.profile);
    }
    updateTopBar();
  }
}

function addXp(n) {
  if (!state.progress) return;
  state.progress.xp += n;
  while (state.progress.xp >= calcNext(state.progress.nivel)) {
    state.progress.xp -= calcNext(state.progress.nivel);
    state.progress.nivel++;
    toast('🎉 ¡Subiste a Nivel ' + state.progress.nivel + '!');
    if (typeof SONIDOS !== 'undefined') SONIDOS.nivelArriba();
  }
  saveProgress();
}

function toast(msg) {
  var t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(t._timer);
  t._timer = setTimeout(function () { t.classList.add('hidden'); }, 3000);
}

/* ═══════════ TEMA CLARO / OSCURO ═══════════ */
function initTheme() {
  var saved = localStorage.getItem('tv_theme');
  if (saved === 'light') {
    document.body.classList.add('light-theme');
  }
}

function toggleTheme() {
  var isLight = document.body.classList.toggle('light-theme');
  localStorage.setItem('tv_theme', isLight ? 'light' : 'dark');
  toast(isLight ? '☀️ Modo Claro activado' : '🌙 Modo Oscuro activado');
}

/* ═══════════ BARRA INFERIOR: OCULTAR / MOSTRAR ═══════════ */
function setDockHidden(hidden) {
  state.dockHidden = !!hidden;
  document.body.classList.toggle('dock-hidden', state.dockHidden);
  localStorage.setItem('tv_dock_hidden', state.dockHidden ? '1' : '0');
  var btn = document.getElementById('dock-toggle');
  if (btn) btn.title = state.dockHidden ? 'Mostrar barra de navegación' : 'Ocultar barra de navegación';
}

function setupDockToggle() {
  var btn = document.getElementById('dock-toggle');
  if (btn) {
    btn.onclick = function () { setDockHidden(!state.dockHidden); };
  }
  setDockHidden(localStorage.getItem('tv_dock_hidden') === '1');
}

/* ═══════════ ACTUALIZAR BARRA SUPERIOR ═══════════ */
function updateTopBar() {
  var p = state.profile;
  if (!p || !p.progress) return;

  var nameEl = document.getElementById('top-player-name');
  var lvlEl = document.getElementById('top-level-badge');
  var barEl = document.getElementById('top-xp-bar');
  var starsEl = document.getElementById('top-stars');
  var coinsEl = document.getElementById('top-coins');
  var avatarImg = document.getElementById('top-avatar-img');

  if (nameEl) nameEl.textContent = p.nombre || 'Jugador';
  if (lvlEl) lvlEl.textContent = 'Nivel ' + (p.progress.nivel || 1);

  var maxExp = calcNext(p.progress.nivel || 1);
  var curExp = p.progress.xp || 0;
  var pct = Math.min(100, Math.round((curExp / maxExp) * 100));
  if (barEl) {
    barEl.style.width = pct + '%';
    barEl.parentElement.title = 'XP: ' + curExp + ' / ' + maxExp + ' (' + pct + '%)';
  }

  if (starsEl) starsEl.textContent = p.progress.stars != null ? p.progress.stars : p.progress.completadas.length;
  if (coinsEl) coinsEl.textContent = p.progress.coins != null ? p.progress.coins : (120 + p.progress.completadas.length * 20);

  // Avatar personalizado si existe
  if (avatarImg && p.avatarUrl) {
    avatarImg.src = p.avatarUrl;
  }
}

/* ═══════════ NAVEGACIÓN ENTRE PANTALLAS ═══════════ */
function navTo(screenId) {
  showScreen(screenId);
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function (s) { s.classList.remove('active'); });
  var target = document.getElementById('screen-' + id);
  if (target) target.classList.add('active');

  // Actualizar botones de la barra dock
  document.querySelectorAll('.dock-btn').forEach(function (b) {
    b.classList.toggle('active', b.dataset.screen === id);
  });

  window.scrollTo(0, 0);

  if (id === 'mapa') {
    renderMapaDual();
  } else if (id === 'sandbox') {
    if (typeof SANDBOX !== 'undefined') {
      SANDBOX.mount(document.getElementById('sandbox-canvas'));
    }
  } else if (id === 'biblioteca') {
    renderBiblioteca();
  } else if (id === 'perfil') {
    renderPerfil();
  } else if (id === 'logros') {
    renderLogros();
  } else if (id === 'redes') {
    renderRedes();
  } else if (id === 'docente') {
    var aluEl = document.getElementById('doc-alumnos-count');
    if (aluEl) aluEl.textContent = getProfilesDb().list.length || 1;
  }

  updateTopBar();

  // Ambiente sonoro: más presente en el lobby, más tenue en el resto
  if (typeof SONIDOS !== 'undefined') SONIDOS.paraPantalla(id);
}

/* ═══════════ PANTALLA 2: MAPA DE NIVELES ═══════════ */
function renderMapaDual() {
  var listContainer = document.getElementById('mundos-list-container');
  if (!listContainer) return;
  listContainer.innerHTML = '';

  var prog = state.progress || { completadas: [] };

  CATEGORIAS.forEach(function (cat) {
    var misiones = MISIONES.filter(function (m) { return m.mundo === cat.id; });
    var completadas = misiones.filter(function (m) { return prog.completadas.indexOf(m.id) >= 0; }).length;
    var pct = misiones.length > 0 ? Math.round((completadas / misiones.length) * 100) : 0;
    var isCurrent = state.currentCategoria === cat.id;

    var item = document.createElement('div');
    item.className = 'mundo-card-item' + (isCurrent ? ' active' : '') + (cat.id === 7 ? ' mundo-7' : '');
    item.innerHTML =
      '<div class="mundo-card-header">' +
        '<div class="mundo-card-title-group">' +
          '<span class="mundo-card-icon">' + cat.icon + '</span>' +
          '<strong class="mundo-card-title">Mundo ' + cat.id + ': ' + cat.nombre + '</strong>' +
        '</div>' +
        '<span class="mundo-card-ratio">' + completadas + '/' + misiones.length + '</span>' +
      '</div>' +
      '<div class="mundo-card-bar-track">' +
        '<div class="mundo-card-bar-fill" style="width: ' + pct + '%;"></div>' +
      '</div>' +
      '<div style="display:flex; justify-content:space-between; align-items:center; margin-top:4px;">' +
        '<span style="font-size:0.7rem; color:var(--cyan-neon); font-family:monospace; font-weight:700;">' + (cat.lang || 'Código') + '</span>' +
        (cat.dificultad ? '<span class="mundo-badge-hard">🔬 Dificultad ' + cat.dificultad + '</span>' : '') +
      '</div>';

    item.addEventListener('click', function () {
      state.currentCategoria = cat.id;
      renderMapaDual();
    });

    listContainer.appendChild(item);
  });

  // Área derecha: Camino de niveles
  var activeCat = CATEGORIAS.find(function (c) { return c.id === state.currentCategoria; }) || CATEGORIAS[0];
  var titleEl = document.getElementById('mapa-current-name');
  var iconEl = document.getElementById('mapa-current-icon');
  var descEl = document.getElementById('mapa-current-desc');
  var countEl = document.getElementById('mapa-current-count');

  if (titleEl) titleEl.textContent = 'Mundo ' + activeCat.id + ': ' + activeCat.nombre;
  if (iconEl) iconEl.textContent = activeCat.icon;
  if (descEl) descEl.textContent = activeCat.desc;

  var catMisiones = MISIONES.filter(function (m) { return m.mundo === activeCat.id; });
  var catCompletadas = catMisiones.filter(function (m) { return prog.completadas.indexOf(m.id) >= 0; }).length;
  if (countEl) countEl.textContent = catCompletadas + '/' + catMisiones.length;

  var nodesContainer = document.getElementById('mapa-nodes-container');
  if (!nodesContainer) return;
  nodesContainer.innerHTML = '';

  catMisiones.forEach(function (mi, idx) {
    var isDone = prog.completadas.indexOf(mi.id) >= 0;
    var btn = document.createElement('button');
    btn.className = 'node-btn' + (isDone ? ' completado' : '');
    btn.innerHTML =
      '<span>' + (idx + 1) + '</span>' +
      (isDone ? '<div class="node-check">✓</div>' : '');
    btn.title = 'Misión ' + (idx + 1) + ': ' + mi.titulo;

    btn.addEventListener('click', function () {
      abrirMision(mi);
    });

    nodesContainer.appendChild(btn);
  });
}

/* ═══════════ DETERMINAR LENGUAJE / TECNOLOGÍA ═══════════ */
function obtenerInfoLenguaje(mi) {
  var mId = mi.mundo;
  var code = (mi.reparar && mi.reparar.codigoInicial) || '';

  if (mId === 7) {
    return { name: '🧩 PROTOBOARD & CABLES', cls: 'tech-proto' };
  } else if (mId === 4 || /void\s+setup|pinMode|digitalWrite/i.test(code)) {
    return { name: '🔌 ARDUINO C++', cls: 'tech-arduino' };
  } else if (mId === 2 || mId === 5 || /def\s+|print\(|elif/i.test(code)) {
    return { name: '🐍 PYTHON', cls: 'tech-python' };
  } else if (mId === 3 || /color:|background:|border:|display:/i.test(code)) {
    return { name: '🎨 CSS & ELECTRÓNICA', cls: 'tech-css' };
  } else if (/<html>|<div|<button|<p>/i.test(code)) {
    return { name: '🌐 HTML', cls: 'tech-html' };
  } else {
    return { name: '⚡ JAVASCRIPT', cls: 'tech-js' };
  }
}

/* ═══════════ ABRIR MISIÓN ═══════════ */
function abrirMision(mi) {
  state.currentMision = mi;
  state.pistas = 3;
  state.pistaIdx = 0;

  document.getElementById('mision-titulo').textContent = mi.titulo;
  document.getElementById('mision-mundo').textContent = 'Mundo ' + mi.mundo + ' — ' + (CATEGORIAS.find(function (c) { return c.id === mi.mundo; }) || {}).nombre;
  document.getElementById('mision-xp').textContent = '+' + (mi.xp || 30) + ' XP';
  document.getElementById('mision-pistas').textContent = '💡 ' + state.pistas + ' pistas';
  document.getElementById('pistas-restantes').textContent = state.pistas;
  document.getElementById('situacion-text').textContent = mi.historia || '';
  document.getElementById('situacion-objetivo').innerHTML = '<strong>Objetivo:</strong> ' + mi.objetivo;

  // BADGE DE LENGUAJE ARRIBA DE LA SITUACIÓN PROBLEMÁTICA
  var techInfo = obtenerInfoLenguaje(mi);
  var techBadge = document.getElementById('mision-tech-badge');
  if (techBadge) {
    techBadge.className = 'tech-badge ' + techInfo.cls;
    techBadge.textContent = techInfo.name;
  }

  var langLabel = document.getElementById('editor-lang-label');
  if (langLabel) langLabel.textContent = techInfo.name;

  document.getElementById('consola').textContent = '';
  document.getElementById('btn-validar').classList.remove('hidden');
  document.getElementById('pista-box').classList.add('hidden');
  cerrarGanado();

  // Inicializar editor
  setCode(mi.reparar && mi.reparar.codigoInicial ? mi.reparar.codigoInicial : '');

  // PROTOBOARD Y ARDUINO FOTO: SOLO EN MUNDO 7
  var placaBox = document.getElementById('placa-box');
  var ledRow = document.getElementById('led-row');

  if (mi.mundo === 7) {
    // Exclusivo para Mundo 7: se despliega la protoboard real y Arduino
    placaBox.classList.remove('hidden');
    if (ledRow) ledRow.style.display = 'none';
    if (typeof PLACA !== 'undefined') {
      PLACA.mount(document.getElementById('placa-svg'), mi);
    }
  } else {
    // Mundos 1 al 6: NO se muestra la protoboard ni el Arduino
    placaBox.classList.add('hidden');
    if (ledRow) ledRow.style.display = (mi.mundo >= 3 && mi.mundo <= 6) ? 'flex' : 'none';
    resetLed();
  }

  // Fases educativas: activar fase 1 (Aprender) por defecto
  mostrarFase('aprender', mi);
  document.querySelectorAll('.fase-step').forEach(function (st) {
    st.classList.toggle('active', st.dataset.fase === 'aprender');
  });

  showScreen('mision');
  setTimeout(function () { if (state.codemirror) state.codemirror.refresh(); }, 80);
}

/* ═══════════ FASES EDUCATIVAS (STEPPER 1..6) ═══════════ */
function mostrarFase(fase, mi) {
  var content = document.getElementById('fase-content');
  if (!content) return;

  var html = '';
  if (fase === 'aprender') {
    html = mi.aprender || '<h3>Fase 1: Aprender</h3><p>Lee atentamente el problema en la columna izquierda y comprende el objetivo propuesto.</p>';
  } else if (fase === 'ejemplo' || fase === 'ver') {
    html = mi.ver || '<h3>Fase 2: Ejemplo</h3><p>Revisa la estructura de código o conexiones esperadas.</p>';
  } else if (fase === 'detectar') {
    html = mi.detectar || '<h3>Fase 3: Detectar el error</h3><p>Identifica qué está causando que el programa o circuito falle.</p>';
  } else if (fase === 'reparar') {
    html = '<h3>Fase 4: Reparar y aplicar</h3><p>Modifica el código o ajusta el circuito hasta que funcione correctamente.</p>' +
           (mi.ver ? '<div style="margin-top: 14px;"><strong>Referencia:</strong>' + mi.ver + '</div>' : '');
  } else if (fase === 'comprender') {
    html = mi.comprender || '<h3>Fase 5: Comprender la solución</h3><p>Al entender la causa del error, adquieres solidez técnica.</p>';
  } else if (fase === 'aplicar') {
    html = '<h3>Fase 6: Aplicación en proyectos reales</h3><p>¡Este mismo principio se utiliza en el desarrollo de software y electrónica profesional!</p>';
  }

  content.innerHTML = html;
}

/* ═══════════ VALIDAR MISIÓN ═══════════ */
function validarMision() {
  var mi = state.currentMision;
  if (!mi || !state.profile) {
    toast('Debes seleccionar un perfil para registrar el progreso.');
    return;
  }

  var code = getCode();
  var r = runUserCode(code);
  var out = r.logs.join('\n');

  if (mi.reparar && mi.reparar.validar) {
    var vr = mi.reparar.validar(out, code);
    if (!vr.ok) {
      setLed('error', vr.exp || 'Error en la verificación');
      if (typeof PLACA !== 'undefined') PLACA.reset();
      toast('❌ ' + (vr.exp || 'Revisá la solución'));
      var consola = document.getElementById('consola');
      if (consola) consola.textContent = '❌ ' + (vr.exp || 'Error en la solución');
      return;
    }
  }

  setLed('on', '¡LED encendido! Solución completada');
  if (typeof PLACA !== 'undefined' && mi.mundo === 7) PLACA.exito();

  var primeraVez = state.progress.completadas.indexOf(mi.id) < 0;
  if (primeraVez) {
    state.progress.completadas.push(mi.id);
    state.progress.stars = (state.progress.stars || 0) + 1;
    state.progress.coins = (state.progress.coins || 0) + 20;
    addXp(mi.xp || 30);
    saveProgress();
  }

  document.getElementById('btn-validar').classList.add('hidden');
  mostrarGanado(mi);
  toast('✅ ¡Misión completada con éxito!');
}

/* ═══════════ PANTALLA DE RESULTADOS / TROFEO ═══════════ */
function mostrarGanado(mi) {
  var overlay = document.getElementById('win-overlay');
  var sub = document.getElementById('win-subtitle');
  var xpVal = document.getElementById('win-xp-val');
  var coinsVal = document.getElementById('win-coins-val');

  if (sub) sub.textContent = mi.titulo;
  if (xpVal) xpVal.textContent = '+' + (mi.xp || 30) + ' XP';
  if (coinsVal) coinsVal.textContent = '+20';

  var catMisiones = MISIONES.filter(function (m) { return m.mundo === mi.mundo; });
  var curIdx = catMisiones.findIndex(function (m) { return m.id === mi.id; });
  var siguiente = catMisiones[curIdx + 1] || null;

  var btnSig = document.getElementById('btn-win-siguiente');
  if (btnSig) {
    btnSig.innerHTML = siguiente ? 'Siguiente nivel →' : '🗺️ Volver al mapa';
    btnSig.onclick = function () {
      cerrarGanado();
      if (siguiente) abrirMision(siguiente);
      else {
        renderMapaDual();
        showScreen('mapa');
      }
    };
  }

  var btnExp = document.getElementById('btn-win-ver-exp');
  if (btnExp) {
    btnExp.onclick = function () {
      cerrarGanado();
      mostrarFase('comprender', mi);
      document.querySelectorAll('.fase-step').forEach(function (st) {
        st.classList.toggle('active', st.dataset.fase === 'comprender');
      });
    };
  }

  overlay.classList.remove('hidden');
}

function cerrarGanado() {
  var overlay = document.getElementById('win-overlay');
  if (overlay) overlay.classList.add('hidden');
}

/* ═══════════ PANTALLA 3 & 9: BIBLIOTECA ═══════════ */
function renderBiblioteca() {
  var grid = document.getElementById('bib-grid');
  if (!grid) return;
  grid.innerHTML = '';

  var q = (state.bibQuery || '').toLowerCase().trim();

  var lista = CONCEPTS.filter(function (c) {
    var pasaFiltro = state.activeFilter === 'todos' || c.cat === state.activeFilter;
    if (!pasaFiltro) return false;
    if (!q) return true;
    return (c.titulo + ' ' + c.desc + ' ' + (c.cat || '')).toLowerCase().indexOf(q) >= 0;
  });

  // Contadores de cada píldora de filtro
  var counts = { todos: 0 };
  CONCEPTS.forEach(function (c) {
    counts.todos++;
    if (c.cat) counts[c.cat] = (counts[c.cat] || 0) + 1;
  });
  Object.keys(counts).forEach(function (k) {
    var el = document.getElementById('count-' + k);
    if (el) el.textContent = counts[k];
  });

  if (lista.length === 0) {
    grid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 40px 16px; color: var(--text-secondary); font-weight: 700;">🔍 No se encontraron conceptos para «' + (state.bibQuery || '') + '».</div>';
    return;
  }

  lista.forEach(function (c) {
    var card = document.createElement('div');
    card.className = 'concept-card';
    card.innerHTML =
      '<div class="concept-icon-box">' + (c.icon || '📘') + '</div>' +
      '<h3 class="concept-title">' + c.titulo + '</h3>' +
      '<p class="concept-desc">' + c.desc + '</p>' +
      (c.ejemplo ? '<div class="concept-meta"><span>Ejemplo disponible</span><span>✓</span></div>' : '');

    card.addEventListener('click', function () {
      if (c.ejemplo) {
        toast('📖 ' + c.titulo + ': ' + c.desc);
      }
    });

    grid.appendChild(card);
  });
}

function setupBibliotecaBusqueda() {
  var input = document.getElementById('bib-search-input');
  var clear = document.getElementById('btn-clear-bib-search');
  if (input) {
    input.oninput = function () {
      state.bibQuery = input.value;
      if (clear) clear.classList.toggle('hidden', !input.value);
      renderBiblioteca();
    };
  }
  if (clear) {
    clear.onclick = function () {
      input.value = '';
      state.bibQuery = '';
      clear.classList.add('hidden');
      renderBiblioteca();
      input.focus();
    };
  }
}

/* ═══════════ DESBLOQUEO REAL DE LOGROS ═══════════ */
function misionesDeMundo(mundoId) {
  return MISIONES.filter(function (m) { return m.mundo === mundoId; });
}

function mundoCompletado(mundoId, completadas) {
  var mis = misionesDeMundo(mundoId);
  return mis.length > 0 && mis.every(function (m) { return completadas.indexOf(m.id) >= 0; });
}

function misionesSinPistas(prog) {
  var usadas = prog.pistasUsadas || {};
  return (prog.completadas || []).filter(function (id) { return !usadas[id]; }).length;
}

function isLogroDesbloqueado(logroId, prog) {
  var done = (prog && prog.completadas) || [];
  var n = done.length;
  switch (logroId) {
    case 'primera': return n >= 1;
    case 'm5': return n >= 5;
    case 'm15': return n >= 15;
    case 'm30': return n >= 30;
    case 'sinAyuda': return misionesSinPistas(prog) >= 5;
    case 'proto1': return done.some(function (id) { return id.indexOf('m7-') === 0; });
    case 'fundamentos': return mundoCompletado(1, done);
    case 'arduino': return mundoCompletado(4, done);
  }
  return false;
}

/* ═══════════ PANTALLA: VITRINA DE COPAS / LOGROS ═══════════ */
function renderLogros() {
  var shelf = document.getElementById('logros-shelf-container');
  if (!shelf) return;

  var prog = state.progress || { completadas: [] };
  var completadas = prog.completadas || [];

  var copasGanadas = 0;
  var mundosCompletos = 0;
  var xpTotal = 0;

  MISIONES.forEach(function (mi) {
    if (completadas.indexOf(mi.id) >= 0) {
      copasGanadas++;
      xpTotal += mi.xp || 30;
    }
  });

  var totalCopas = MISIONES.length || 1;

  CATEGORIAS.forEach(function (cat) {
    var mis = misionesDeMundo(cat.id);
    var hechas = mis.filter(function (m) { return completadas.indexOf(m.id) >= 0; }).length;
    var completo = mis.length > 0 && hechas === mis.length;
    if (completo) mundosCompletos++;
  });

  var chipCopas = document.getElementById('logros-trofeos-total');
  var chipMundos = document.getElementById('logros-mundos-total');
  var chipXp = document.getElementById('logros-xp-total');
  if (chipCopas) chipCopas.textContent = copasGanadas + '/' + totalCopas;
  if (chipMundos) chipMundos.textContent = mundosCompletos + '/' + CATEGORIAS.length;
  if (chipXp) chipXp.textContent = xpTotal;

  shelf.innerHTML = '';

  CATEGORIAS.forEach(function (cat) {
    var mis = misionesDeMundo(cat.id);
    var hechas = mis.filter(function (m) { return completadas.indexOf(m.id) >= 0; }).length;
    var completo = mis.length > 0 && hechas === mis.length;

    var section = document.createElement('div');
    section.className = 'logros-world-section';

    var header = document.createElement('div');
    header.className = 'logros-world-header';
    header.innerHTML =
      '<div class="logros-world-title-group">' +
        '<span class="logros-world-icon">' + cat.icon + '</span>' +
        '<div>' +
          '<div class="logros-world-name">Mundo ' + cat.id + ': ' + cat.nombre + '</div>' +
          '<div class="logros-world-lang">' + (cat.lang || 'Código') + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="logros-world-right">' +
        (completo ? '<span class="logros-world-cup" title="¡Mundo completado!">🏆</span>' : '') +
        '<span class="logros-world-progress">' + hechas + '/' + mis.length + '</span>' +
      '</div>';
    section.appendChild(header);

    var grid = document.createElement('div');
    grid.className = 'logros-trophy-grid';

    mis.forEach(function (mi, idx) {
      var isDone = completadas.indexOf(mi.id) >= 0;
      var card = document.createElement('button');
      card.type = 'button';
      card.className = 'trofeo-card ' + (isDone ? 'won' : 'locked');
      card.style.setProperty('--i', idx);
      card.innerHTML =
        '<span class="trofeo-icon">' + (isDone ? '🏆' : '🔒') + '</span>' +
        '<strong class="trofeo-name">Nivel ' + (idx + 1) + '</strong>' +
        '<span class="trofeo-meta">' + mi.titulo + '</span>' +
        (isDone ? '<span class="trofeo-xp">+' + (mi.xp || 30) + ' XP</span>'
                : '<span class="trofeo-xp" style="color: var(--text-muted);">Sin completar</span>');
      card.title = (isDone ? '🏆 ' : '🔒 ') + mi.titulo + ' — hacé clic para jugar';
      card.addEventListener('click', function () { abrirMision(mi); });
      grid.appendChild(card);
    });

    section.appendChild(grid);
    shelf.appendChild(section);
  });
}

/* ═══════════ PANTALLA: REDES SOCIALES DE TIENDAVIRTUS ═══════════ */
var REDES_SOCIALES = [
  { red: 'Instagram', usuario: '@tiendavirtus.oficial', url: 'https://www.instagram.com/tiendavirtus.oficial/', logo: 'img/icon_instagram.svg', cls: 'ig', cta: 'Ir al perfil →' },
  { red: 'WhatsApp', usuario: '+54 9 11 7649-6327', url: 'https://wa.me/5491176496327?text=Hola%20TiendaVirtus!', logo: 'img/icon_whatsapp.svg', cls: 'wa', cta: 'Enviar mensaje →' },
  { red: 'GitHub', usuario: 'Xalan007x', url: 'https://github.com/Xalan007x', logo: 'img/icon_github.svg', cls: 'gh', cta: 'Ver repositorios →' },
  { red: 'YouTube', usuario: 'Tiendavirtus', url: 'https://www.youtube.com/@Tiendavirtus', logo: 'img/icon_youtube.svg', cls: 'yt', cta: 'Ver canal →' }
];

function renderRedes() {
  var grid = document.getElementById('redes-grid');
  if (!grid) return;
  grid.innerHTML = '';

  REDES_SOCIALES.forEach(function (r) {
    var a = document.createElement('a');
    a.className = 'red-card ' + r.cls;
    a.href = r.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.title = r.red + ': ' + r.usuario;
    a.innerHTML =
      '<div class="red-card-logo"><img src="' + r.logo + '" alt="' + r.red + '" onerror="this.style.display=\'none\'"></div>' +
      '<div class="red-card-text">' +
        '<span class="red-card-network">' + r.red + '</span>' +
        '<strong class="red-card-user">' + r.usuario + '</strong>' +
        '<span class="red-card-cta">' + r.cta + '</span>' +
      '</div>';
    grid.appendChild(a);
  });
}

/* ═══════════ PANTALLA 8: PANEL DEL JUGADOR & AVATAR PERSONALIZADO ═══════════ */
function renderPerfil() {
  var p = state.profile;
  if (!p) return;

  var nameEl = document.getElementById('pd-nombre');
  var gradeEl = document.getElementById('pd-curso');
  var lvlVal = document.getElementById('pd-nivel-val');
  var xpVal = document.getElementById('pd-xp-val');
  var compVal = document.getElementById('pd-comp-val');
  var coinsVal = document.getElementById('pd-coins-val');
  var avatarImg = document.getElementById('pd-avatar-img');

  if (nameEl) nameEl.textContent = nombreCompleto(p);
  if (gradeEl) gradeEl.textContent = (p.curso || '3° año') + ' · Bug Hunter';

  var maxExp = calcNext(p.progress.nivel || 1);
  if (lvlVal) lvlVal.textContent = 'Nivel ' + (p.progress.nivel || 1);
  if (xpVal) xpVal.textContent = (p.progress.xp || 0) + ' / ' + maxExp + ' XP';
  if (compVal) compVal.textContent = (p.progress.completadas || []).length + ' misiones';
  if (coinsVal) coinsVal.textContent = '🪙 ' + (p.progress.coins || 320);

  if (avatarImg && p.avatarUrl) {
    avatarImg.src = p.avatarUrl;
  }

  // Gráfico de progreso circular
  var total = MISIONES.length || 50;
  var done = (p.progress.completadas || []).length;
  var pct = Math.round((done / total) * 100);

  var gaugeText = document.getElementById('pd-gauge-text');
  var gaugeCircle = document.getElementById('pd-gauge-circle');
  if (gaugeText) gaugeText.textContent = pct + '%';
  if (gaugeCircle) {
    var offset = 283 - (283 * (pct / 100));
    gaugeCircle.style.strokeDashoffset = offset;
  }

  // Insignias
  var gridLogros = document.getElementById('logros-grid');
  var countLogros = document.getElementById('pd-logros-count');
  if (gridLogros) {
    gridLogros.innerHTML = '';
    var unlockedCount = 0;
    LOGROS.forEach(function (l, i) {
      var isUnlocked = isLogroDesbloqueado(l.id, p.progress);
      if (isUnlocked) unlockedCount++;

      var b = document.createElement('div');
      b.className = 'insignia-badge' + (isUnlocked ? ' unlocked' : '');
      b.style.setProperty('--i', i);
      b.innerHTML =
        '<span class="insignia-icon">' + (isUnlocked ? l.icon : '🔒') + '</span>' +
        '<strong class="insignia-name">' + l.nombre + '</strong>';
      b.title = l.desc + (isUnlocked ? ' — ¡Desbloqueado!' : ' — Bloqueado');
      gridLogros.appendChild(b);
    });
    if (countLogros) countLogros.textContent = unlockedCount + '/' + LOGROS.length;
  }
}

/* ═══════════ SUBIDA DE FOTO DE PERFIL ═══════════ */
function setupAvatarUpload() {
  var btnUpload = document.getElementById('btn-upload-avatar');
  var fileInput = document.getElementById('input-avatar-file');
  if (!btnUpload || !fileInput) return;

  btnUpload.onclick = function () {
    fileInput.click();
  };

  fileInput.onchange = function () {
    if (!fileInput.files || !fileInput.files[0]) return;
    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
      // Reescalar a través de canvas para optimizar tamaño en localStorage
      var img = new Image();
      img.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, 128, 128);
        var dataUrl = canvas.toDataURL('image/jpeg', 0.85);

        if (state.profile) {
          state.profile.avatarUrl = dataUrl;
          guardarPerfilCompleto(state.profile);
          guardarProgresoPerfil(state.profile.progress);

          var pdImg = document.getElementById('pd-avatar-img');
          var topImg = document.getElementById('top-avatar-img');
          var perfImg = document.getElementById('perfil-avatar');

          if (pdImg) pdImg.src = dataUrl;
          if (topImg) topImg.src = dataUrl;
          if (perfImg) perfImg.src = dataUrl;

          toast('📸 ¡Foto de perfil actualizada correctamente!');
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };
}

/* ═══════════ GESTIÓN DE PERFILES ═══════════ */
function refrescarInicio() {
  var p = state.profile;
  var display = document.getElementById('perfil-actual');
  if (!display) return;

  if (p) {
    var avEl = document.getElementById('perfil-avatar');
    if (avEl && p.avatarUrl) avEl.src = p.avatarUrl;
    document.getElementById('perfil-actual-nombre').textContent = nombreCompleto(p);
    document.getElementById('perfil-actual-curso').textContent = '📚 ' + (p.curso || '—') + ' · Nivel ' + (p.progress.nivel || 1);
    display.style.display = 'flex';
  } else {
    display.style.display = 'none';
  }
  updateTopBar();
}

function renderResultadosBusqueda(q) {
  var box = document.getElementById('perfil-results');
  if (!box) return;
  var perfiles = buscarPerfiles(q);

  if (perfiles.length === 0) {
    box.innerHTML = '<div style="padding: 10px; font-size: 0.8rem; color: #94a3b8;">No se encontró ese perfil. Creá uno con el botón ➕.</div>';
    return;
  }
  box.innerHTML = '';
  perfiles.forEach(function (p) {
    var item = document.createElement('div');
    item.className = 'perfil-item-result';
    item.innerHTML =
      '<span>👤 ' + nombreCompleto(p) + ' (' + (p.curso || '') + ')</span>' +
      '<span style="color: var(--green-neon); font-family: monospace;">Nv ' + (p.progress.nivel || 1) + '</span>';
    item.addEventListener('click', function () {
      elegirPerfil(p.id);
    });
    box.appendChild(item);
  });
}

function elegirPerfil(id) {
  var p = seleccionarPerfil(id);
  if (!p) return;
  state.profile = p;
  state.progress = p.progress;
  var res = document.getElementById('perfil-results');
  if (res) res.innerHTML = '';
  var s = document.getElementById('perfil-search');
  if (s) s.value = '';
  refrescarInicio();
  toast('👤 ¡Bienvenido/a, ' + nombreCompleto(p) + '!');
}

/* ═══════════ INICIALIZACIÓN ═══════════ */
function init() {
  initTheme();
  migrarProgresoViejo();
  state.profile = perfilActual();
  if (state.profile) {
    state.progress = state.profile.progress;
  } else {
    var defaultP = crearPerfil('Alan', '', '3° año');
    state.profile = defaultP;
    state.progress = defaultP.progress;
  }

  // Botón comenzar misiones
  var btnIniciar = document.getElementById('btn-iniciar');
  if (btnIniciar) {
    btnIniciar.onclick = function () {
      navTo('mapa');
    };
  }

  // Toggles de Tema Claro/Oscuro
  var btnTheme = document.getElementById('btn-theme-toggle');
  if (btnTheme) btnTheme.onclick = toggleTheme;
  var btnCfgTheme = document.getElementById('btn-cfg-theme-toggle');
  if (btnCfgTheme) btnCfgTheme.onclick = toggleTheme;

  // Buscador de perfiles
  var search = document.getElementById('perfil-search');
  if (search) {
    search.oninput = function () { renderResultadosBusqueda(search.value); };
    search.onfocus = function () { renderResultadosBusqueda(search.value); };
  }

  // Modal crear perfil
  var btnCrearP = document.getElementById('btn-crear-perfil');
  if (btnCrearP) {
    btnCrearP.onclick = function () {
      document.getElementById('perfil-overlay').classList.remove('hidden');
    };
  }
  var btnCerrarP = document.getElementById('btn-cerrar-perfil');
  if (btnCerrarP) {
    btnCerrarP.onclick = function () {
      document.getElementById('perfil-overlay').classList.add('hidden');
    };
  }
  var btnConfirmP = document.getElementById('btn-crear-confirm');
  if (btnConfirmP) {
    btnConfirmP.onclick = function () {
      var n = document.getElementById('np-nombre').value.trim();
      var a = document.getElementById('np-apellido').value.trim();
      var c = document.getElementById('np-curso').value;
      if (!n) { toast('Por favor ingresá tu nombre'); return; }
      var p = crearPerfil(n, a, c || '1° año');
      state.profile = p;
      state.progress = p.progress;
      document.getElementById('perfil-overlay').classList.add('hidden');
      refrescarInicio();
      toast('🎉 ¡Perfil creado con éxito, ' + n + '!');
      navTo('mapa');
    };
  }

  var btnCambiarP = document.getElementById('btn-cambiar-perfil');
  if (btnCambiarP) {
    btnCambiarP.onclick = function () {
      var s = document.getElementById('perfil-search');
      if (s) { s.focus(); renderResultadosBusqueda(s.value); }
    };
  }

  var btnEliminarP = document.getElementById('btn-eliminar-perfil');
  if (btnEliminarP) {
    btnEliminarP.onclick = function () {
      if (!state.profile) return;
      if (confirm('¿Eliminar perfil de ' + nombreCompleto(state.profile) + '?')) {
        borrarPerfil(state.profile.id);
        state.profile = null;
        state.progress = null;
        refrescarInicio();
        showScreen('inicio');
      }
    };
  }

  // Subida de foto de perfil
  setupAvatarUpload();

  // Búsqueda de conceptos en la biblioteca
  setupBibliotecaBusqueda();

  // Flecha ocultar / mostrar barra inferior
  setupDockToggle();

  // Barra Dock inferior
  document.querySelectorAll('.dock-btn').forEach(function (btn) {
    if (btn.id === 'dock-sound-toggle') return;
    btn.onclick = function () {
      navTo(btn.dataset.screen);
    };
  });

  // Botón de sonido del dock: silencia/activa TODO el sonido (general)
  var soundBtn = document.getElementById('dock-sound-toggle');
  if (soundBtn && typeof SONIDOS !== 'undefined') {
    soundBtn.onclick = function (e) {
      e.stopPropagation();
      var est = SONIDOS.getEstado();
      SONIDOS.setMasterOn(!est.masterOn);
    };
  }

  // Botón volver a mapa desde misión
  var btnVolverMapa = document.getElementById('btn-volver-mapa');
  if (btnVolverMapa) {
    btnVolverMapa.onclick = function () {
      navTo('mapa');
    };
  }

  // Stepper de Fases en Misión
  document.querySelectorAll('.fase-step').forEach(function (st) {
    st.onclick = function () {
      document.querySelectorAll('.fase-step').forEach(function (s) { s.classList.remove('active'); });
      st.classList.add('active');
      mostrarFase(st.dataset.fase, state.currentMision);
    };
  });

  // Filtros de Biblioteca
  document.querySelectorAll('.filter-pill').forEach(function (pill) {
    pill.onclick = function () {
      document.querySelectorAll('.filter-pill').forEach(function (p) { p.classList.remove('active'); });
      pill.classList.add('active');
      state.activeFilter = pill.dataset.filter;
      renderBiblioteca();
    };
  });

  // Acciones del editor
  var btnEjecutar = document.getElementById('btn-ejecutar');
  if (btnEjecutar) {
    btnEjecutar.onclick = function () {
      var code = getCode();
      var r = runUserCode(code);
      var out = r.logs.join('\n');
      if (r.err) out += '\n[ERROR] ' + r.err;
      var cEl = document.getElementById('consola');
      if (cEl) cEl.textContent = out || '▶ Ejecutado sin errores.';
      if (typeof PLACA !== 'undefined' && state.currentMision && state.currentMision.mundo === 7) {
        PLACA.draw(code);
      }
    };
  }

  var btnReiniciar = document.getElementById('btn-reiniciar');
  if (btnReiniciar) {
    btnReiniciar.onclick = function () {
      if (!state.currentMision) return;
      setCode(state.currentMision.reparar && state.currentMision.reparar.codigoInicial ? state.currentMision.reparar.codigoInicial : '');
      var cEl = document.getElementById('consola');
      if (cEl) cEl.textContent = '';
      resetLed();
      if (typeof PLACA !== 'undefined') PLACA.reset();
      document.getElementById('btn-validar').classList.remove('hidden');
    };
  }

  var btnPista = document.getElementById('btn-pista');
  if (btnPista) {
    btnPista.onclick = function () {
      var mi = state.currentMision;
      if (!mi || !mi.pistas || state.pistas <= 0) {
        toast('No quedan pistas en esta misión.');
        return;
      }
      var box = document.getElementById('pista-box');
      box.textContent = '💡 Pista ' + (state.pistaIdx + 1) + ': ' + mi.pistas[state.pistaIdx];
      box.classList.remove('hidden');
      state.pistaIdx++;
      state.pistas--;
      if (state.progress) {
        if (!state.progress.pistasUsadas) state.progress.pistasUsadas = {};
        state.progress.pistasUsadas[mi.id] = (state.progress.pistasUsadas[mi.id] || 0) + 1;
        saveProgress();
      }
      document.getElementById('pistas-restantes').textContent = state.pistas;
      document.getElementById('mision-pistas').textContent = '💡 ' + state.pistas + ' pistas';
    };
  }

  var btnValidar = document.getElementById('btn-validar');
  if (btnValidar) btnValidar.onclick = validarMision;

  // Modales de configuración
  var btnTopCfg = document.getElementById('btn-top-config');
  if (btnTopCfg) btnTopCfg.onclick = function () { document.getElementById('config-overlay').classList.remove('hidden'); };
  var btnIniCfg = document.getElementById('btn-inicio-config');
  if (btnIniCfg) btnIniCfg.onclick = function () { document.getElementById('config-overlay').classList.remove('hidden'); };

  // Menú "Más opciones" del inicio simplificado
  var btnMore = document.getElementById('btn-inicio-more');
  var menuMore = document.getElementById('inicio-more-menu');
  if (btnMore && menuMore) {
    btnMore.onclick = function (e) {
      e.stopPropagation();
      var abierto = !menuMore.classList.contains('hidden');
      menuMore.classList.toggle('hidden', abierto);
      btnMore.setAttribute('aria-expanded', abierto ? 'false' : 'true');
      btnMore.textContent = abierto ? '⋯ Más opciones' : '✕ Cerrar opciones';
    };
    document.addEventListener('click', function (e) {
      if (!menuMore.classList.contains('hidden') && !menuMore.contains(e.target) && e.target !== btnMore) {
        menuMore.classList.add('hidden');
        btnMore.setAttribute('aria-expanded', 'false');
        btnMore.textContent = '⋯ Más opciones';
      }
    });
  }
  var btnCerrarCfg = document.getElementById('btn-cerrar-config');
  if (btnCerrarCfg) btnCerrarCfg.onclick = function () { document.getElementById('config-overlay').classList.add('hidden'); };

  // ─── Controles de sonido en Configuración ───
  if (typeof SONIDOS !== 'undefined') {
    var cfgSound = document.getElementById('cfg-sound');
    if (cfgSound) cfgSound.onchange = function () { SONIDOS.setMasterOn(cfgSound.checked); };

    var cfgVol = document.getElementById('cfg-volume');
    if (cfgVol) cfgVol.oninput = function () { SONIDOS.setVolumen(cfgVol.value); };

    var cfgLobby = document.getElementById('cfg-sound-lobby');
    if (cfgLobby) cfgLobby.onchange = function () { SONIDOS.setLobbyOn(cfgLobby.checked); };

    var cfgNivel = document.getElementById('cfg-sound-levelup');
    if (cfgNivel) cfgNivel.onchange = function () { SONIDOS.setNivelOn(cfgNivel.checked); };

    SONIDOS.actualizarBoton();
  }

  var btnResetProg = document.getElementById('btn-reset-config');
  if (btnResetProg) {
    btnResetProg.onclick = function () {
      if (confirm('¿Reiniciar todo el progreso y volver al inicio?')) {
        localStorage.clear();
        location.reload();
      }
    };
  }

  initEditor();
  refrescarInicio();
  updateTopBar();
}

window.addEventListener('DOMContentLoaded', init);
