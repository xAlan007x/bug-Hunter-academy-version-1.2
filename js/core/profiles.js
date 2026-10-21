/* ═══════════ PERFILES DE JUGADOR ═══════════ */
var PROFILES_KEY = 'tv_profiles_v1';
var LEGACY_KEY = 'tv_progress_v1';

function getProfilesDb() {
  try {
    var raw = localStorage.getItem(PROFILES_KEY);
    if (!raw) return { list: [], currentId: null };
    var db = JSON.parse(raw);
    if (!db || !Array.isArray(db.list)) return { list: [], currentId: null };
    return db;
  } catch (e) { return { list: [], currentId: null }; }
}

function saveProfilesDb(db) { localStorage.setItem(PROFILES_KEY, JSON.stringify(db)); }

function migrarProgresoViejo() {
  var db = getProfilesDb();
  if (db.list.length > 0) return;
  try {
    var raw = localStorage.getItem(LEGACY_KEY);
    if (!raw) return;
    var prog = JSON.parse(raw);
    var p = {
      id: 'p' + Date.now(),
      nombre: 'Jugador',
      apellido: '',
      curso: '—',
      creado: Date.now(),
      progress: prog && prog.completadas ? prog : { completadas: [], xp: 0, nivel: 1, pistasUsadas: {} }
    };
    db.list.push(p);
    db.currentId = p.id;
    saveProfilesDb(db);
    localStorage.removeItem(LEGACY_KEY);
  } catch (e) { /* ignorar */ }
}

function crearPerfil(nombre, apellido, curso) {
  var db = getProfilesDb();
  var p = {
    id: 'p' + Date.now() + Math.floor(Math.random() * 1000),
    nombre: nombre,
    apellido: apellido,
    curso: curso,
    creado: Date.now(),
    progress: { completadas: [], xp: 0, nivel: 1, pistasUsadas: {}, coins: 120, stars: 0 }
  };
  db.list.push(p);
  db.currentId = p.id;
  saveProfilesDb(db);
  return p;
}

function buscarPerfiles(q) {
  var db = getProfilesDb();
  var t = (q || '').toLowerCase().trim();
  if (!t) return db.list.slice();
  return db.list.filter(function (p) {
    return (p.nombre + ' ' + p.apellido).toLowerCase().indexOf(t) >= 0;
  });
}

function seleccionarPerfil(id) {
  var db = getProfilesDb();
  var p = db.list.find(function (x) { return x.id === id; });
  if (!p) return null;
  db.currentId = id;
  saveProfilesDb(db);
  return p;
}

function perfilActual() {
  var db = getProfilesDb();
  if (!db.currentId) return null;
  var p = db.list.find(function (x) { return x.id === db.currentId; }) || null;
  if (p && p.progress) {
    if (p.progress.coins == null) p.progress.coins = 120 + (p.progress.completadas ? p.progress.completadas.length * 20 : 0);
    if (p.progress.stars == null) p.progress.stars = p.progress.completadas ? p.progress.completadas.length : 0;
  }
  return p;
}

function guardarProgresoPerfil(progress) {
  var db = getProfilesDb();
  var p = db.list.find(function (x) { return x.id === db.currentId; });
  if (!p) return;
  p.progress = progress;
  saveProfilesDb(db);
}

/* Guarda el perfil COMPLETO (incluye avatarUrl, curso, etc.) en el almacenamiento.
   Acepta un objeto perfil opcional; si no se pasa, usa el perfil actual. */
function guardarPerfilCompleto(perfil) {
  var db = getProfilesDb();
  var p = perfil || db.list.find(function (x) { return x.id === db.currentId; });
  if (!p) return;
  var idx = db.list.findIndex(function (x) { return x.id === p.id; });
  if (idx >= 0) {
    // Conserva los campos existentes y sobreescribe con los del objeto recibido
    db.list[idx] = Object.assign({}, db.list[idx], p);
  } else {
    db.list.push(p);
  }
  if (!db.currentId) db.currentId = p.id;
  saveProfilesDb(db);
}

function borrarPerfil(id) {
  var db = getProfilesDb();
  db.list = db.list.filter(function (x) { return x.id !== id; });
  if (db.currentId === id) db.currentId = null;
  saveProfilesDb(db);
}

function nombreCompleto(p) {
  if (!p) return '';
  return (p.nombre + ' ' + p.apellido).trim();
}

function inicialDe(p) {
  if (!p) return '👤';
  var n = (p.nombre || '').charAt(0).toUpperCase();
  var a = (p.apellido || '').charAt(0).toUpperCase();
  return (n + a) || '👤';
}
