import { setFileDropEventHandler, setFileInputHandler, displayFileChip } from "./fileUpload";
import { imageFileDropzone, imageFileInput } from "./domLoader";
import { isMultipleFiles } from "./util/isMultipleFiles";
import { isCorrectFileType } from "./util/isCorrectFileType";
import { setElementActiveState } from "./util/setElementActiveState";

let image = new Image();

export function initBackgroundImage() {
    setFileDropEventHandler(imageFileDropzone, handleFileDrop);
    setFileInputHandler(imageFileInput, handleFileInput);
}

export function getBackgroundImage() {
    return image;
}

export function resetBackgroundImage() {
    if (image.src) URL.revokeObjectURL(image.src);
    image.src = '';
}

function handleFileDrop(e) {
    e.preventDefault();
    setElementActiveState(e.currentTarget, false);

    const { files } = e.dataTransfer;
    
    if (isMultipleFiles(files)) {
        return alert("Only one image file to be uploaded.");
    }  
    
    if (!isCorrectFileType(files, ["image/jpeg", "image/png"])){
        return alert("File type uploaded is not correct.")
    } 

    image.src = URL.createObjectURL(files[0]);

    e.currentTarget.style.display = 'none';
    displayFileChip(files[0], e.currentTarget.nextElementSibling, "image");
};

function handleFileInput(e) {
    const { files } = e.target;
    
    if (isMultipleFiles(files)) {
        return alert("Only one image file to be uploaded.");
    }  
    
    if (!isCorrectFileType(files, ["image/jpeg", "image/png"])){
        return alert("File type uploaded is not correct.")
    } 

    image.src = URL.createObjectURL(files[0]);

    e.currentTarget.parentElement.style.display = 'none';
    displayFileChip(files[0], e.currentTarget.parentElement.nextElementSibling, "image");
    e.currentTarget.value = '';
}; 
