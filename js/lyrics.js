import { setFileDropEventHandler, setFileInputHandler, displayFileChip } from "./fileUpload";
import { lyricsFileDropzone, lyricsFileInput } from "./domLoader";
import { isMultipleFiles } from "./util/isMultipleFiles";
import { setElementActiveState } from "./util/setElementActiveState";
import { srtParser } from "./util/srtParser";

let lyricsObjs = [];

export function initLyrics() {
    setFileDropEventHandler(lyricsFileDropzone, handleFileDrop);
    setFileInputHandler(lyricsFileInput, handleFileInput);
}

export function getLyricsObjs() {
    return lyricsObjs;
}

function handleFileDrop(e) {
    e.preventDefault();
    setElementActiveState(e.currentTarget, false);

    const { files } = e.dataTransfer;
    
    if (isMultipleFiles(files)) {
        return alert("Only one audio file to be uploaded.");
    }  
    
    files[0].text().then((result) => {
        lyricsObjs = srtParser(result);
        if (lyricsObjs.length == 0) alert("Unable to read the file.");
    }).catch((error) => {
        console.log(error);
    });
    
    e.currentTarget.style.display = 'none';
    displayFileChip(files[0], e.currentTarget.nextElementSibling, "lyrics");
};

function handleFileInput(e) {
    const { files } = e.target;

    if (isMultipleFiles(files)) {
        return alert("Only one file to be uploaded.");
    }  
    
    files[0].text().then((result) => {
        lyricsObjs = srtParser(result);
        if (lyricsObjs.length == 0) alert("Unable to read the file.");
    }).catch((error) => {
        console.log(error);
    });

    e.currentTarget.parentElement.style.display = 'none';
    displayFileChip(files[0], e.currentTarget.parentElement.nextElementSibling, "lyrics");
    e.currentTarget.value = '';
}