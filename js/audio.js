import { setFileDropEventHandler, setFileInputHandler, displayFileChip } from "./fileUpload";
import { audioFileDropzone, audioFileInput, audioPlayButton, resetButton, exportButton, audio, settingPanelBackdrop, backdrops } from "./domLoader";
import { isMultipleFiles } from "./util/isMultipleFiles";
import { isCorrectFileType } from "./util/isCorrectFileType";
import { setElementActiveState } from "./util/setElementActiveState";
import { animateCanvas } from "./canvas";

let audioCtx;
let isRunning = false;
let audioSource;
let audioAnalyser;

export function initAudio() {
    setFileDropEventHandler(audioFileDropzone, handleFileDrop);
    setFileInputHandler(audioFileInput, handleFileInput);
    setAudioHandler();
}

export function getAudioPlayState() {
    return isRunning;
}

export function setAudioPlayState(state) {
    isRunning = state;
}

export function resetAudio() {
    if (audio.src) URL.revokeObjectURL(audio.src);
    audio.src = ''
}

export function getAudioCtx() {
    return audioCtx;
}

export function initAudioAnalyser() {
    if (!audioSource) audioSource = audioCtx.createMediaElementSource(audio);
    audioAnalyser = audioCtx.createAnalyser();
    audioSource.connect(audioAnalyser);
    audioAnalyser.connect(audioCtx.destination);
    audioAnalyser.fftSize = 256;
    audioAnalyser.smoothingTimeConstant = 0.8;
    audioAnalyser.minDecibels = -80;
    audioAnalyser.maxDecibels = -10;

    return audioAnalyser;
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
    audioCtx = new AudioContext();
    audioPlayButton.disabled = false;
    exportButton.disabled = false;
    resetButton.disabled = false;

    audioFileDropzone.style.display = 'none';
    displayFileChip(files[0], audioFileDropzone.nextElementSibling, "audio"); 
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
    audioCtx = new AudioContext();
    audioPlayButton.disabled = false;
    exportButton.disabled = false;
    resetButton.disabled = false;
    
    audioFileInput.parentElement.style.display = 'none';
    displayFileChip(files[0], audioFileInput.parentElement.nextElementSibling, "audio");
    audioFileInput.value = '';
};

function setAudioHandler() {
    audio.addEventListener('play', (e) => {
        isRunning = true;
        audioPlayButton.textContent = 'Pause';
        if (backdrops.style.display !== 'block') settingPanelBackdrop.style.display = 'block';
        resetButton.disabled = true;
        exportButton.disabled = true;
        animateCanvas();
    })
    
    audio.addEventListener('pause', (e) => {
        isRunning = false;
        audioPlayButton.textContent = 'Play';
        settingPanelBackdrop.style.display = 'none';
        resetButton.disabled = false;
        exportButton.disabled = false;
    })

    audio.addEventListener('ended', (e) => {
        isRunning = false;
        audioPlayButton.textContent = 'Play';
        settingPanelBackdrop.style.display = 'none';
        resetButton.disabled = false;
        exportButton.disabled = false;
    })
}
