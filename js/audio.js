import { setFileDropEventHandler, setFileInputHandler, displayFileChip } from "./fileUpload";
import { audioFileDropzone, audioFileInput, audioPlayButton, resetButton, exportButton, audio } from "./domLoader";
import { isMultipleFiles } from "./util/isMultipleFiles";
import { isCorrectFileType } from "./util/isCorrectFileType";
import { setElementActiveState } from "./util/setElementActiveState";

const audioCtx = new AudioContext();
let isRunning = false;

export function initAudio() {
    setFileDropEventHandler(audioFileDropzone, handleFileDrop);
    setFileInputHandler(audioFileInput, handleFileInput);
}

export function getAudioPlayState() {
    return isRunning;
}

function handleFileDrop(e) {
    e.preventDefault();
    setElementActiveState(e.currentTarget, false);

    const { files } = e.dataTransfer;
    
    if (isMultipleFiles(files)) {
        return alert("Only one audio file to be uploaded.");
    }  
    
    if (!isCorrectFileType(files, ["audio/mpeg", "audio/wav"])){
        return alert("File type uploaded is not correct.")
    } 

    audio.src = URL.createObjectURL(files[0]);
    audio.load();
    audioPlayButton.disabled = false;
    exportButton.disabled = false;
    resetButton.disabled = false;

    e.currentTarget.style.display = 'none';
    displayFileChip(files[0], e.currentTarget.nextElementSibling, "audio"); 
};

function handleFileInput(e) {
    const { files } = e.target;

    if (isMultipleFiles(files)) {
        return alert("Only one audio file to be uploaded.");
    }  
    
    if (!isCorrectFileType(files, ["audio/mpeg", "audio/wav"])){
        return alert("File type uploaded is not correct.")
    } 

    audio.src = URL.createObjectURL(files[0]);
    audio.load();
    audioPlayButton.disabled = false;
    exportButton.disabled = false;
    resetButton.disabled = false;
    
    e.currentTarget.parentElement.style.display = 'none';
    displayFileChip(files[0], e.currentTarget.parentElement.nextElementSibling, "audio");
    e.currentTarget.value = '';
};

function setAudioHandler() {
    audio.addEventListener('play', (e) => {
        isRunning = true;
        audioPlayButton.textContent = 'Pause';
    })
    
    audio.addEventListener('pause', (e) => {
        isRunning = false;
        audioPlayButton.textContent = 'Play';
    })

    audio.addEventListener('ended', (e) => {
        isRunning = false;
        return;
    })
}
