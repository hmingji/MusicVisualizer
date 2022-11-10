import { titleInput, wordLengthSpan, resetButton } from "./domLoader";
import { removeFile } from "./util/removeFile"

export function initReset() {
    resetButton.addEventListener('click', function(e) {
        const chipElements = document.querySelectorAll(".chip");
        const fileDropElements = document.querySelectorAll(".file-dropzone");
    
        ["audio", "image", "lyrics"].forEach((item) => removeFile(item));
        chipElements.forEach((item) => item.parentElement.removeChild(item));
        fileDropElements.forEach((item) => item.style.display = 'flex');
        titleInput.value = '';
        wordLengthSpan.textContent = '0 / 50';
    })
}

