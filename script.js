// Load saved note from local storage when the page loads
window.onload = function() {
    var savedNote = localStorage.getItem('savedNote');
    if (savedNote) {
        document.getElementById('noteArea').value = savedNote;
    }
};

// Save note to local storage whenever text area content changes
document.getElementById('noteArea').oninput = function() {
    localStorage.setItem('savedNote', this.value);
};
