var currentNote = 1;  /* Default note slot */

window.onload = function() {
    loadNote();  /* Load note from default slot */
    loadFontSize();
};

function selectNote(noteNumber) {
    saveNote();  /* Save current note before switching */
    currentNote = noteNumber;
    loadNote();  /* Load note from selected slot */
}

function saveNote() {
    var noteContent = document.getElementById('noteArea').value;
    localStorage.setItem('savedNote' + currentNote, noteContent);
}

function loadNote() {
    var savedNote = localStorage.getItem('savedNote' + currentNote);
    if (savedNote) {
        document.getElementById('noteArea').value = savedNote;
    } else {
        document.getElementById('noteArea').value = '';  /* Clear text area if no saved note */
    }
}

function loadFontSize() {
    var savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        var fontSize = savedFontSize + 'px';
        document.getElementById('noteArea').style.fontSize = fontSize;
        document.getElementById('fontSizeSlider').value = savedFontSize;
    }
}

document.getElementById('noteArea').oninput = function() {
    saveNote();  /* Save note whenever text area content changes */
};

document.getElementById('fontSizeSlider').oninput = function() {
    var fontSize = this.value + 'px';
    document.getElementById('noteArea').style.fontSize = fontSize;
    localStorage.setItem('fontSize', this.value);
};
