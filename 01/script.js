// Variables globales
var currentNote = 1;
var totalNotes = 1;
var deleteMode = false;

// Inicialización al cargar la página
window.onload = function() {
    var savedTotalNotes = localStorage.getItem('totalNotes');
    if (savedTotalNotes) {
        totalNotes = parseInt(savedTotalNotes, 10);
    }

    updateNoteButtons();
    loadNote();
    loadFontSize();

    document.getElementById('noteArea').oninput = saveNote;
    document.getElementById('fontSizeSlider').oninput = updateFontSize;

    window.addEventListener('keydown', toggleDeleteMode);
};

// Toggle delete mode
function toggleDeleteMode(event) {
    if ((event.key === 'Control' || event.key === 'Alt' || event.key === 'Meta') && event.type === 'keydown') {
        deleteMode = !deleteMode;
        updateNoteButtons();
    }
}

// Actualizar botones de notas
function updateNoteButtons() {
    var buttonContainer = document.getElementById('buttonContainer');
    buttonContainer.innerHTML = '';

    for (var i = 1; i <= totalNotes; i++) {
        var noteButton = document.createElement('button');
        noteButton.textContent = i;
        noteButton.onclick = function() { selectNote(this.textContent); };
        buttonContainer.appendChild(noteButton);
    }

    var addButton = document.createElement('button');
    addButton.id = 'addButton';
    if (deleteMode) {
        addButton.textContent = '×';
        addButton.className = 'delete-mode';
        addButton.onclick = deleteLastNoteSlot;
    } else {
        addButton.textContent = '+';
        addButton.className = 'add-button';
        addButton.onclick = addNoteSlot;
    }
    buttonContainer.appendChild(addButton);
}

// Eliminar la última nota
function deleteLastNoteSlot() {
    if (totalNotes > 1) {
        localStorage.removeItem('savedNote' + totalNotes);
        totalNotes--;
        localStorage.setItem('totalNotes', totalNotes);
        if (currentNote > totalNotes) {
            currentNote = totalNotes;
        }
        updateNoteButtons();
        loadNote();
    }
}

// Añadir una nueva nota
function addNoteSlot() {
    totalNotes++;
    localStorage.setItem('totalNotes', totalNotes);
    updateNoteButtons();
}

// Seleccionar una nota
function selectNote(noteNumber) {
    saveNote();
    currentNote = noteNumber;
    loadNote();
}

// Guardar la nota actual
function saveNote() {
    var noteContent = document.getElementById('noteArea').innerHTML;
    localStorage.setItem('savedNote' + currentNote, noteContent);
}

// Cargar la nota
function loadNote() {
    var savedNote = localStorage.getItem('savedNote' + currentNote);
    if (savedNote) {
        document.getElementById('noteArea').innerHTML = savedNote;
    } else {
        document.getElementById('noteArea').innerHTML = '';
    }
}

// Cargar el tamaño de fuente guardado
function loadFontSize() {
    var savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        var fontSize = savedFontSize + 'px';
        document.getElementById('noteArea').style.fontSize = fontSize;
        document.getElementById('fontSizeSlider').value = savedFontSize;
    }
}


// Estado de los enlaces: true significa que los enlaces están activos, false que son texto plano
var linksActive = false;

function toggleLinks() {
    var noteArea = document.getElementById('noteArea');
    var htmlContent = noteArea.innerHTML;

    if (!linksActive) {
        // Si los enlaces no están activos, los convertimos en clicables
        var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])|(\bwww\.[a-z0-9.-]+\.[a-z]{2,})|(\b[a-z0-9.-]+\.[a-z]{2,}(?:\/\S*)?)/ig;
        htmlContent = htmlContent.replace(urlRegex, function(url) {
            var anchorTag = '<a href="' + (url.startsWith('http') ? '' : 'http://') + url + '" class="editable-link" target="_blank">' + url + '</a>';
            return htmlContent.includes(anchorTag) ? url : anchorTag;
        });
        noteArea.innerHTML = htmlContent;
        linksActive = true;
        linkButton.classList.add('active');
    } else {
        // Si los enlaces están activos, los convertimos de nuevo en texto plano
        var links = noteArea.querySelectorAll('a.editable-link');
        links.forEach(function(link) {
            noteArea.innerHTML = noteArea.innerHTML.replace(link.outerHTML, link.innerHTML);
        });
        linksActive = false; 
        linkButton.classList.remove('active'); // Quita la clase 'active' al botón
    }

    // Restablecer los eventos de enlaces cada vez que cambiamos su estado
    setLinkEvents();
}

function setLinkEvents() {
    if (linksActive) {
        // Solo añadir eventos si los enlaces están activos
        var links = noteArea.querySelectorAll('.editable-link');
        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                window.open(this.href, '_blank');
            });
        });
    }
}

document.getElementById('linkButton').addEventListener('click', toggleLinks);

