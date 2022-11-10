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

export function resetLyrics() {
    lyricsObjs = [];
}

async function handleFileDrop(e) {
    e.preventDefault();
    setElementActiveState(e.currentTarget, false);
    console.log(e.currentTarget);
    const { files } = e.dataTransfer;
    
    if (isMultipleFiles(files)) {
        return alert("Only one audio file to be uploaded.");
    }  
    
    await files[0].text().then((result) => {
        lyricsObjs = srtParser(result);  
    }).catch((error) => {
        console.log(error);
    });
    if (lyricsObjs.length == 0) return alert("Unable to read the file.");
    //need to refer to the dom directly.
    e.currentTarget.style.display = 'none';
    displayFileChip(files[0], e.currentTarget.nextElementSibling, "lyrics");
};

async function handleFileInput(e) {
    const { files } = e.target;

    if (isMultipleFiles(files)) {
        return alert("Only one file to be uploaded.");
    }  
    
    await files[0].text().then((result) => {
        lyricsObjs = srtParser(result);     
    }).catch((error) => {
        console.log(error);
    });

    if (lyricsObjs.length == 0) return alert("Unable to read the file.");
    e.target.parentElement.style.display = 'none';
    displayFileChip(files[0], e.target.parentElement.nextElementSibling, "lyrics");
    e.target.value = '';
}