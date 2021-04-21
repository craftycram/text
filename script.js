let text = '';

function changeText() {
  var input = prompt("Please enter your text", text);
  if (input !== null) {
    text = input;
    document.getElementById('text').innerText = text;
    document.title = text;
  }
}