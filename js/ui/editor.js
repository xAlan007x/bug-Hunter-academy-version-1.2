function initEditor() {
  const ta = document.getElementById('code-editor');
  if (!ta) return;
  if (state.codemirror) return;
  if (typeof CodeMirror === 'undefined') return;
  state.codemirror = CodeMirror.fromTextArea(ta, {
    mode: 'javascript',
    theme: 'dracula',
    lineNumbers: true,
    tabSize: 2,
    indentWithTabs: false,
    autoCloseBrackets: true,
    matchBrackets: true
  });
}

function setCode(s) {
  var val = s || '';
  if (state.codemirror) {
    state.codemirror.setValue(val);
    state.codemirror.clearHistory();
    setTimeout(function () { state.codemirror.refresh(); }, 50);
  } else {
    var ta = document.getElementById('code-editor');
    if (ta) ta.value = val;
  }
}

function getCode() {
  if (state.codemirror) return state.codemirror.getValue();
  var ta = document.getElementById('code-editor');
  return ta ? ta.value : '';
}