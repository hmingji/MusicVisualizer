const audioFileDropzone = document.querySelector('.audiofile-dropzone');
const audio = document.querySelector('#audio'); 
const audioFileInput = document.querySelector('#audio-file');

audioFileDropzone.addEventListener('dragenter', (e) => {
    e.preventDefault();
    setActive(audioFileDropzone);
})

audioFileDropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    setActive(audioFileDropzone);
})

audioFileDropzone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    setActive(audioFileDropzone, false);
})

audioFileDropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    setActive(audioFileDropzone, false);

    const { files } = e.dataTransfer;
    
    if (isMultipleFiles(files)) {
        return alert("Only one audio file to be uploaded.");
    }  
    
    if (!isCorrectFileType(files)){
        return alert("File type uploaded is not correct.")
    } 

    //get the audio file and assign to the audio element
    audio.src = URL.createObjectURL(files[0]);
    audio.load();
})

function isMultipleFiles(files) {
    if (files.length > 1) return true;
    return false;
}

function isCorrectFileType(files) {
    return [...files].every((file) => {
        //console.log(file.type);
        return file.type === "audio/mpeg" || file.type === "audio/wav"
    });
}

audioFileInput.addEventListener('change', (e) => {
    const { files } = e.target;

    if (isMultipleFiles(files)) {
        return alert("Only one audio file to be uploaded.");
    }  
    
    if (!isCorrectFileType(files)){
        return alert("File type uploaded is not correct.")
    } 

    //get the audio file and assign to the audio element
    audio.src = URL.createObjectURL(files[0]);
    audio.load();
})

document.addEventListener('dragover', (e) => e.preventDefault());
document.addEventListener('drop', (e) => e.preventDefault());

const audioCtx = new AudioContext();
const audioCanvas = document.getElementById("audio-visualizer-canvas");

/** @type {HTMLCanvasElement} */
const baseCanvas = document.getElementById('base-canvas');

const audioPlayButton = document.querySelector('#audioplay-button');

audioCanvas.height = window.innerHeight;
audioCanvas.width = window.innerWidth;
const audioCanvasCtx = audioCanvas.getContext('2d');

baseCanvas.height = window.innerHeight;
baseCanvas.width = window.innerWidth;
const baseCanvasCtx = baseCanvas.getContext('2d');

let audioSource;
let audioAnalyser;
var wavePathOption = "horizontal";

const wavePathButtons = document.querySelectorAll('input[name="wavepath"]');

for (const wavePathButton of wavePathButtons) {
    wavePathButton.addEventListener('change', function(event){
        if (this.checked) wavePathOption = this.value;
        return;
    })
}

audioPlayButton.addEventListener('click', (e) => {
    audioCtx.resume();
    audio.play();
    audioSource = audioCtx.createMediaElementSource(audio);
    audioAnalyser = audioCtx.createAnalyser();
    audioSource.connect(audioAnalyser);
    audioAnalyser.connect(audioCtx.destination);
    audioAnalyser.fftSize = 256;
    audioAnalyser.smoothingTimeConstant = 0.8;
    audioAnalyser.minDecibels = -80;
    audioAnalyser.maxDecibels = -10;
    const bufferLength = audioAnalyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const widthOffset = audioCanvas.width * 0.25 / 2;
    const heightOffset = 50;
    const baseHeight = 12;
    const baseWidth = audioCanvas.width * 0.75;
    const dataArrayOffset = 10;
    const barWidth = audioCanvas.width / (bufferLength + 10) * 0.75;
    let barHeight;
    let x;

    isRunning = !isRunning;

    function drawBase(displayOption) {
        if (displayOption === "circular") {
            baseCanvasCtx.beginPath();
            baseCanvasCtx.lineWidth = 20;
            baseCanvasCtx.strokeStyle = '#40e0d0';
            baseCanvasCtx.arc(baseCanvas.width / 2, baseCanvas.height / 2, 190, 0, 2 * Math.PI);
            baseCanvasCtx.stroke();
        } else {
            baseCanvasCtx.beginPath();
            baseCanvasCtx.lineWidth = 20;
            baseCanvasCtx.strokeStyle = '#40e0d0';
            baseCanvasCtx.moveTo(baseCanvas.width*0.25/2, baseCanvas.height - heightOffset - 20);
            baseCanvasCtx.lineTo(baseCanvas.width*(0.25/2+0.75), baseCanvas.height - heightOffset - 20);
            baseCanvasCtx.stroke();
        }
    }

    function horizontalAnimate() {
        x = 0;
        audioCanvasCtx.clearRect(0, 0, audioCanvas.width, audioCanvas.height);
        audioAnalyser.getByteFrequencyData(dataArray);
       
        for (let i = 0; i < bufferLength + dataArrayOffset; i++){
            (i < dataArrayOffset) ? barHeight = 0 : barHeight = dataArray[i - dataArrayOffset];

            audioCanvasCtx.fillStyle = "#40e0d0";
            audioCanvasCtx.fillRect(x + widthOffset, audioCanvas.height - barHeight - baseHeight - heightOffset, barWidth, barHeight);
            
            x += barWidth;
        }
        
        requestAnimationFrame(horizontalAnimate);

    }

    function circularAnimate() {
        x = 0;        
        audioCanvasCtx.clearRect(0, 0, audioCanvas.width, audioCanvas.height);
        audioAnalyser.getByteFrequencyData(dataArray);

        for (let i = 0; i < bufferLength + dataArrayOffset; i++){
            (i < dataArrayOffset) ? barHeight = 0 : barHeight = dataArray[i - dataArrayOffset];
            
            audioCanvasCtx.save();
            audioCanvasCtx.translate(audioCanvas.width / 2, audioCanvas.height / 2);
            audioCanvasCtx.rotate(i * Math.PI * 2 / (bufferLength + dataArrayOffset));
            
            audioCanvasCtx.fillStyle = "#40e0d0";
            audioCanvasCtx.fillRect(0, 190, barWidth, barHeight);

            x += barWidth;
            audioCanvasCtx.restore();
        }
        
        requestAnimationFrame(circularAnimate);
    }

    if (wavePathOption === "horizontal") {
        drawBase("horizontal");
        horizontalAnimate();
        return;
    }

    if (wavePathOption === "circular") {
        drawBase("circular");
        circularAnimate();
        return;
    }

    return;
})

