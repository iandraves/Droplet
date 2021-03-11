// Retrieving global DOM elements
let flow_switcher = document.getElementById('flow-switcher');

// Highlight text function
function highlightText(text) {
    let range = document.createRange();
    range.selectNodeContents(text);

    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}