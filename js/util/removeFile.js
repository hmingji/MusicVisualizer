import { resetAudio } from "../audio";
import { getBackgroundImage, resetBackgroundImage } from "../backgroundImage";
import { audio, audioPlayButton, exportButton, resetButton } from "../domLoader";
import { resetLyrics } from "../lyrics";

export function removeFile(fileType) {
    switch (fileType) {
        case "audio":
            resetAudio();
            audioPlayButton.disabled = true;
            exportButton.disabled = true;
            resetButton.disabled = true;
            break;
        case "image":
            resetBackgroundImage();
            break;
        case "lyrics":
            resetLyrics();
            break;
        default:
            break;
    }
}