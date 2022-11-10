import { setElementActiveState } from "./util/setElementActiveState";
import { removeFile } from "./util/removeFile";
import { truncate } from "./util/truncate"

export function setFileDropEventHandler(element, fileDropHandler) {
    element.addEventListener('dragenter', (e) => {
        e.preventDefault();
        setElementActiveState(e.currentTarget);
    });
    
    element.addEventListener('dragover', (e) => {
        e.preventDefault();
        setElementActiveState(e.currentTarget);
    });
    
    element.addEventListener('dragleave', (e) => {
        e.preventDefault();
        setElementActiveState(e.currentTarget, false);
    });
    
    element.addEventListener('drop', fileDropHandler);
}

export function setFileInputHandler(element, handler) {
    element.addEventListener('change', handler);
}

export function displayFileChip(file, displayElement, fileType) {
    const div = document.createElement('div');
    div.classList.add('chip');
    div.innerHTML = `
        <div style="display: flex; align-items: center;">
            <i class="fa-solid fa-file"></i>
            <p style="padding-left: 4px">${truncate(file.name, 15)}</p>
        </div>
        <span class="closebtn ${fileType}">&times;</span>
    `;
    
    displayElement.appendChild(div);

    const spanElement = document.querySelector(`.closebtn.${fileType}`);
    spanElement.addEventListener('click', function() {
        this.parentElement.parentElement.previousElementSibling.style.display = 'flex';
        const elementToRemove = this.parentElement;
        elementToRemove.parentElement.removeChild(elementToRemove);
        removeFile(fileType);
    })
};