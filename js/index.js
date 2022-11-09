import { initAudio } from "./audio";
import { initBackgroundImage } from "./backgroundImage";
import { initCanvas } from "./canvas";
import { initResponsiveFont } from "./font";
import { initExport } from "./export";
import { initLyrics } from "./lyrics";
import { initSetting } from "./setting";
import { initReset } from "./reset";

document.addEventListener('dragover', (e) => e.preventDefault());
document.addEventListener('drop', (e) => e.preventDefault());

function initApp() {
    initResponsiveFont();
    initAudio();
    initCanvas();
    initBackgroundImage();
    initExport();
    initLyrics();
    initReset();
    initSetting();
}

initApp();