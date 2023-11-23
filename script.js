// Variables globales
var currentNote = 1;
var totalNotes = 1;
var linksActive = false;

// Inicialización al cargar la página
window.onload = function() {
    loadNote();
    loadFontSize();

    document.getElementById('noteArea').oninput = saveNote;
    document.getElementById('fontSizeSlider').oninput = updateFontSize;
    document.getElementById('linkButton').addEventListener('click', toggleLinks);
};
    document.getElementById('clearTextButton').addEventListener('click', clearText);


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

// Función para cargar el tamaño de fuente guardado
function loadFontSize() {
    var savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        document.getElementById('noteArea').style.fontSize = savedFontSize + 'px';
        document.getElementById('fontSizeSlider').value = savedFontSize;
    }
}

// Function to update the font size based on the slider value
function updateFontSize() {
    var fontSize = this.value + 'px';  // Convert slider value to pixel units
    document.getElementById('noteArea').style.fontSize = fontSize;  // Set the new font size
    localStorage.setItem('fontSize', this.value);  // Save the new font size to local storage
}


// Función para alternar los enlaces clickeables
function toggleLinks() {
    var noteArea = document.getElementById('noteArea');
    var htmlContent = noteArea.innerHTML;
    var linkButton = document.getElementById('linkButton');

    if (!linksActive) {
        // Convertir URL de texto en enlaces clicables
        var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])|(\bwww\.[a-z0-9.-]+\.[a-z]{2,})|(\b[a-z0-9.-]+\.[a-z]{2,}(?:\/\S*)?)/ig;
        htmlContent = htmlContent.replace(urlRegex, function(url) {
            return '<a href="' + (url.startsWith('http') ? url : 'http://' + url) + '" target="_blank">' + url + '</a>';
        });
        noteArea.innerHTML = htmlContent;
        linksActive = true;
        linkButton.classList.add('active');
    } else {
        // Revertir enlaces clicables a texto
        var links = noteArea.querySelectorAll('a');
        links.forEach(function(link) {
            noteArea.innerHTML = noteArea.innerHTML.replace(link.outerHTML, link.textContent);
        });
        linksActive = false;
        linkButton.classList.remove('active');
    }
}

// Función para limpiar el área de notas
function clearText() {
    var noteArea = document.getElementById('noteArea');
    noteArea.innerHTML = ''; // Limpia el contenido
    saveNote(); // Guarda el cambio en localStorage, si deseas mantener la nota vacía como el estado guardado
}


