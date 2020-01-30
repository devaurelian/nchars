
let maxEditorLength = 280;

const maxlengthInput = document.getElementById("maxlength-input");
const editorTextarea = document.getElementById("editor-textarea");
const editorCounter = document.getElementById("editor-counter");
const copyButton = document.getElementById("copy-button");
const pasteButton = document.getElementById("paste-button");

maxlengthInput.addEventListener("change", () => {
    maxEditorLength = maxlengthInput.value;
    // editorTextarea.maxLength = `${maxEditorLength}`;
    editorTextarea.maxLength = maxEditorLength;
    updateCounter();
});

copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(editorTextarea.value)
        .then(() => {
            console.log('Text copied to clipboard');
        })
        .catch(err => {
            // This can happen if the user denies clipboard permissions:
            console.error('Could not copy text: ', err);
        });
});

pasteButton.addEventListener("click", () => {
    navigator.clipboard.readText()
        .then(text => {
            editorTextarea.value = text.substr(0, maxEditorLength);
            console.log('Pasted content: ', text);
            updateCounter();
        })
        .catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        });
});


function updateCounter() {
    editorCounter.textContent = `${editorTextarea.value.length}/${editorTextarea.maxLength}`;
}

editorTextarea.addEventListener("input", () => updateCounter());

updateCounter();

