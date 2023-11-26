// Variables globales
var currentNote = 1;
var totalNotes = 1;

// Inicialización al cargar la página
window.onload = function() {
  loadNote();
  loadFontSize();
  document.getElementById('noteArea').oninput = saveNote;
};

// Función para guardar la nota actual
function saveNote() {
  var noteContent = document.getElementById('noteArea').innerHTML;
  localStorage.setItem('savedNote' + currentNote, noteContent);
}

// Función para cargar la nota
function loadNote() {
  var savedNote = localStorage.getItem('savedNote' + currentNote);
  document.getElementById('noteArea').innerHTML = savedNote || '';
}