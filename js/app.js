const audioFileDropzone = document.querySelector('.audiofile-dropzone');
const audio = document.querySelector('#audio'); 
const audioFileInput = document.querySelector('#audio-file');
const titleInput = document.querySelector('.title-input');
const audioPlayButton = document.querySelector('#audioplay-button');
const audioCtx = new AudioContext();
const audioCanvas = document.getElementById("audio-visualizer-canvas");
const wavePathButtons = document.querySelectorAll('input[name="wavepath"]');

/** @type {HTMLCanvasElement} */
const baseCanvas = document.getElementById('base-canvas');
/** @type {HTMLCanvasElement} */
const timerCanvas = document.getElementById('timer-canvas');

audioCanvas.height = window.innerHeight;
audioCanvas.width = window.innerWidth;
const audioCanvasCtx = audioCanvas.getContext('2d');

baseCanvas.height = window.innerHeight;
baseCanvas.width = window.innerWidth;
const baseCanvasCtx = baseCanvas.getContext('2d');

timerCanvas.height = window.innerHeight;
timerCanvas.width = window.innerWidth;
const timerCanvasCtx = timerCanvas.getContext('2d');

let audioSource;
let audioAnalyser;
var wavePathOption = "horizontal";
var isRunning = false;

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
    audioPlayButton.disabled = false;
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
    audioPlayButton.disabled = false;
})

document.addEventListener('dragover', (e) => e.preventDefault());
document.addEventListener('drop', (e) => e.preventDefault());

for (const wavePathButton of wavePathButtons) {
    wavePathButton.addEventListener('change', function(event){
        if (this.checked) wavePathOption = this.value;
        return;
    })
}

audioPlayButton.addEventListener('click', (e) => {
    if (isRunning) {
        isRunning = !isRunning;
        audioCtx.suspend();
        audio.pause();
        
        return;
    }
    isRunning = !isRunning;
    audioCtx.resume();
    audio.play();
    if (!audioSource) audioSource = audioCtx.createMediaElementSource(audio);
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

    function drawBase(displayOption) {
        if (displayOption === "circular") {
            baseCanvasCtx.clearRect(0, 0, baseCanvas.width, baseCanvas.height);
            baseCanvasCtx.beginPath();
            baseCanvasCtx.lineWidth = 20;
            baseCanvasCtx.strokeStyle = '#40e0d0';
            baseCanvasCtx.arc(baseCanvas.width / 2, baseCanvas.height / 2, 190, 0, 2 * Math.PI);
            baseCanvasCtx.stroke();

            baseCanvasCtx.font = "4rem Inter";
            baseCanvasCtx.fillStyle = '#40e0d0';
            const title = titleInput.value;
            baseCanvasCtx.fillText(title, baseCanvas.width*0.25/2, baseCanvas.height*0.25/2);

        } else {
            baseCanvasCtx.clearRect(0, 0, baseCanvas.width, baseCanvas.height);
            baseCanvasCtx.beginPath();
            baseCanvasCtx.lineWidth = 20;
            baseCanvasCtx.strokeStyle = '#40e0d0';
            baseCanvasCtx.moveTo(baseCanvas.width*0.25/2, baseCanvas.height - heightOffset - 20);
            baseCanvasCtx.lineTo(baseCanvas.width*(0.25/2+0.75), baseCanvas.height - heightOffset - 20);
            baseCanvasCtx.stroke();

            baseCanvasCtx.font = "4rem Inter";
            baseCanvasCtx.fillStyle = '#40e0d0';
            const title = titleInput.value;
            baseCanvasCtx.fillText(title, baseCanvas.width*0.25/2, baseCanvas.height*0.3);
        }
    }

    function formatTime(seconds) {
        minutes = Math.floor(seconds / 60);
        minutes = (minutes >= 10) ? minutes : "0" + minutes;
        seconds = Math.floor(seconds % 60);
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        return minutes + ":" + seconds;
      }

    function horizontalAnimateTimer() {
        timerCanvasCtx.clearRect(0, 0, timerCanvas.width, timerCanvas.height);
        if (!isRunning) return;

        timerCanvasCtx.fillStyle = '#40e0d0'
        timerCanvasCtx.font = "4rem Inter";
        timerCanvasCtx.fillText(formatTime(audio.currentTime), timerCanvas.width*(0.75), baseCanvas.height*0.75);

        timerCanvasCtx.fillStyle = '#000000'
        timerCanvasCtx.fillRect(timerCanvas.width*(0.25/2), baseCanvas.height - heightOffset - 20, timerCanvas.width*(0.75*audio.currentTime/audio.duration), 10);
        
        requestAnimationFrame(horizontalAnimateTimer);
    }

    function horizontalAnimate() {
        x = 0;
        audioCanvasCtx.clearRect(0, 0, audioCanvas.width, audioCanvas.height);
        if (!isRunning) return;
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
        if (!isRunning) return;
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
        horizontalAnimateTimer();
        return;
    }

    if (wavePathOption === "circular") {
        drawBase("circular");
        circularAnimate();
        return;
    }

    return;
})


