const KEY = 'bha_progress_v1';
const def = {
  nivel: 1,
  xp: 0,
  unlockedMundos: [1],
  completadas: [],
  pistasUsadas: {},
  racha: 0,
  last: 0,
  bib: []
};

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return JSON.parse(JSON.stringify(def));
    const parsed = JSON.parse(raw);
    return Object.assign(JSON.parse(JSON.stringify(def)), parsed);
  } catch (e) {
    return JSON.parse(JSON.stringify(def));
  }
}

function save(p) {
  localStorage.setItem(KEY, JSON.stringify(p));
}