// Global variables to keep track of the current note, total notes, and delete mode status
var currentNote = 1;
var totalNotes = 1;
var deleteMode = false;

// Function to run once the page has loaded
window.onload = function() {
 // Load total notes count from local storage
    var savedTotalNotes = localStorage.getItem('totalNotes');
    if (savedTotalNotes) {
        totalNotes = parseInt(savedTotalNotes, 10);  // Parse the saved total notes count as an integer
    }
    
    updateNoteButtons();  // Update the note buttons based on the current state
    loadNote();  // Load the note for the current note number
    loadFontSize();  // Load the saved font size

    // Set up event listeners for the text area and font size slider
    document.getElementById('noteArea').oninput = saveNote;  // Save note whenever text area content changes
    document.getElementById('fontSizeSlider').oninput = updateFontSize;  // Update font size when slider is moved

    // Set up event listeners to toggle delete mode when certain keys are pressed or released
    window.addEventListener('keydown', toggleDeleteMode);
};

// Function to toggle delete mode on or off based on key events
function toggleDeleteMode(event) {
console.log('toggleDeleteMode called', event.key, event.type);
    if (event.key === 'Control' || event.key === 'Alt' || event.key === 'Meta' && event.type === 'keydown') {  // Check if the Alt key was pressed
        deleteMode = !deleteMode;  // Toggle the deleteMode variable
        updateNoteButtons();  // Update the note buttons to reflect the new delete mode state
    }
}

// ... other functions remain unchanged ...

// Function to update the font size based on the slider value
function updateFontSize() {
    var fontSize = this.value + 'px';  // Convert slider value to pixel units
    document.getElementById('noteArea').style.fontSize = fontSize;  // Set the new font size
    localStorage.setItem('fontSize', this.value);  // Save the new font size to local storage
}

// Function to update the note buttons based on the current state
function updateNoteButtons() {
console.log('updateNoteButtons called', deleteMode);
    var buttonContainer = document.getElementById('buttonContainer');
    buttonContainer.innerHTML = '';  // Clear any existing buttons
    
    // Create a button for each note
    for (var i = 1; i <= totalNotes; i++) {
        var noteButton = document.createElement('button');
        noteButton.textContent = i;
        noteButton.onclick = function() { selectNote(this.textContent); };  // Set up click handler to select note
        buttonContainer.appendChild(noteButton);  // Add the button to the container
    }
    
    // Create the add/delete button
    var addButton = document.createElement('button');
    addButton.id = 'addButton';  // Assign an ID for CSS styling
    if (deleteMode) {
        addButton.textContent = '×';
        addButton.className = 'delete-mode';
        addButton.onclick = deleteLastNoteSlot;  // Set up click handler to delete the last note slot
    } else {
        addButton.textContent = '+';
        addButton.className = 'add-button';
        addButton.onclick = addNoteSlot;  // Set up click handler to add a new note slot
    }
    buttonContainer.appendChild(addButton);  // Add the button to the container
}

// Function to delete the last note slot
function deleteLastNoteSlot() {
console.log('deleteLastNoteSlot called', totalNotes);
    if (totalNotes > 1) {  // Ensure there's more than one note slot
        localStorage.removeItem('savedNote' + totalNotes);  // Remove the last note slot from local storage
        totalNotes--;  // Decrement the total notes count
        localStorage.setItem('totalNotes', totalNotes);  // Update total notes count in local storage
        if (currentNote > totalNotes) {
            currentNote = totalNotes;  // Update the current note number if necessary
        }
        updateNoteButtons();  // Update the note buttons
        loadNote();  // Load the note for the new current note number
    }
}

// Function to add a new note slot
function addNoteSlot() {
    totalNotes++;  // Increment the total notes count
    localStorage.setItem('totalNotes', totalNotes);  // Update total notes count in local storage
    updateNoteButtons();  // Update the note buttons
}

// Function to select a note
function selectNote(noteNumber) {
    saveNote();  // Save the current note
    currentNote = noteNumber;  // Update the current note number
    loadNote();  // Load the note for the new current note number
}

// Function to save the current note
function saveNote() {
    var noteContent = document.getElementById('noteArea').value;  // Get the current note content
    localStorage.setItem('savedNote' + currentNote, noteContent);  // Save the current note to local storage
}

// Function to load the note for the current note number
function loadNote() {
    var savedNote = localStorage.getItem('savedNote' + currentNote);  // Get the saved note from local storage
    if (savedNote) {
        document.getElementById('noteArea').value = savedNote;  // Set the text area content to the saved note
    } else {
        document.getElementById('noteArea').value = '';  // Clear the text area if no saved note
    }
}

// Function to load the saved font size
function loadFontSize() {
    var savedFontSize = localStorage.getItem('fontSize');  // Get the saved font size from local storage
    if (savedFontSize) {
        var fontSize = savedFontSize + 'px';  // Convert the saved font size to pixel units
        document.getElementById('noteArea').style.fontSize = fontSize;  // Set the text area font size
        document.getElementById('fontSizeSlider').value = savedFontSize;  // Set the slider value
    }
}
