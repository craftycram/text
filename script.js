let textElement;

function updateURL(text) {
  const url = new URL(window.location);
  if (text && text !== 'Click to edit the text!') {
    url.searchParams.set('text', encodeURIComponent(text));
  } else {
    url.searchParams.delete('text');
  }
  window.history.replaceState({}, '', url);
}

function loadTextFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const text = urlParams.get('text');
  if (text) {
    return decodeURIComponent(text);
  }
  return null;
}

document.addEventListener('DOMContentLoaded', function() {
  textElement = document.getElementById('text');
  
  // Load text from URL if present
  const savedText = loadTextFromURL();
  if (savedText) {
    textElement.innerText = savedText;
    document.title = savedText;
  }
  
  // Update document title and URL when text changes
  textElement.addEventListener('input', function() {
    const currentText = textElement.innerText;
    document.title = currentText || 'Marc Rufeis';
    updateURL(currentText);
  });
  
  // Also update URL when editing is finished (blur event)
  textElement.addEventListener('blur', function() {
    updateURL(textElement.innerText);
  });
  
  // Handle Enter key to prevent line breaks (optional)
  textElement.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      textElement.blur(); // Remove focus to finish editing
    }
  });
  
  // Select all text when clicking if it's the placeholder text
  textElement.addEventListener('focus', function() {
    if (textElement.innerText === 'Click to edit the text!') {
      // Select all text
      const range = document.createRange();
      range.selectNodeContents(textElement);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });
});
