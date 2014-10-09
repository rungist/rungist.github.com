function aceHighlighter(element, language){
  editor = ace.edit(element);
  editorSession = editor.getSession();

  editor.setTheme('ace/theme/github');
  editor.setShowPrintMargin(false);
  editor.setReadOnly(true);
  editor.renderer.setShowGutter(false);
  editor.setHighlightActiveLine(false);
  editorSession.setMode('ace/mode/' + language);
  editorSession.setUseWrapMode(true);
  editorSession.setTabSize(2);
  editorSession.setUseSoftTabs(true);
  codeHeight = editorSession.getScreenLength() * 16;
  element.style.height = codeHeight + 'px';
  editor.resize();  
}
module.exports = aceHighlighter;
