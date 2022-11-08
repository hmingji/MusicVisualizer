import { wavePathButtons, timerButtons, titleInput, wordLengthSpan } from "./domLoader";

let wavePathOption = "horizontal";
let timerOption = "enable";

export function initSetting() {
    for (const wavePathButton of wavePathButtons) {
        wavePathButton.addEventListener('change', function(event){
            if (this.checked) wavePathOption = this.value;
            return;
        })
    }
    
    for (const timerButton of timerButtons) {
        timerButton.addEventListener('change', function(event){
            if (this.checked) timerOption = this.value;
            return;
        })
    }
    
    titleInput.addEventListener('input', function(event) {
        wordLengthSpan.textContent = `${this.value.length} / 50`;
        return; 
    })
}

export function getSetting() {
    return {
        wavePath: wavePathOption,
        timer: timerOption,
        title: titleInput.value,
    };
}