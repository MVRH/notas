// Load saved note and font size from local storage when the page loads
window.onload = function() {
    var savedNote = localStorage.getItem('savedNote');
    if (savedNote) {
        document.getElementById('noteArea').value = savedNote;
    }

    var savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        var fontSize = savedFontSize + 'px';
        document.getElementById('noteArea').style.fontSize = fontSize;
        document.getElementById('fontSizeSlider').value = savedFontSize;
    }
};

// Save note to local storage whenever text area content changes
document.getElementById('noteArea').oninput = function() {
    localStorage.setItem('savedNote', this.value);
};

// Update font size when slider is moved and save it to local storage
document.getElementById('fontSizeSlider').oninput = function() {
    var fontSize = this.value + 'px';
    document.getElementById('noteArea').style.fontSize = fontSize;
    localStorage.setItem('fontSize', this.value);
};
