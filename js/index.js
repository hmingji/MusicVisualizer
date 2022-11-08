
const lyricsFileDropzone = document.querySelector('.file-dropzone.lyricsfile');
const imageFileDropzone = document.querySelector('.file-dropzone.imagefile');
const canvasContainer = document.querySelector('.canvas-container');
const lyricsFileInput = document.querySelector('#lyrics-file');
const imageFileInput = document.querySelector('#image-file');
const titleInput = document.querySelector('.title-input');
const audioPlayButton = document.querySelector('#audioplay-button');
const exportButton = document.querySelector('#export-button');
const resetButton = document.querySelector('#reset-button');
const previewSession = document.querySelector('.preview-container');
const backdrops = document.querySelectorAll('.backdrop');
const wavePathButtons = document.querySelectorAll('input[name="wavepath"]');
const wordLengthSpan = document.getElementById('wordlength-span');
const timerButtons = document.querySelectorAll('input[name=timer]');
const timerOption = "enable";
var subtitleObjs;
var image = new Image();
var fontSize_main;
var fontSize_secondary;

function checkFontSize(mediaQuery) {
    if (mediaQuery.matches) {
        fontSize_main = 4;
        fontSize_secondary = 2;
    } else {
        fontSize_main = 2;
        fontSize_secondary = 1;
    }
}

var mediaQuery = window.matchMedia("(min-width: 965px)");
checkFontSize(mediaQuery);
mediaQuery.addListener(checkFontSize);

/** @type {HTMLCanvasElement} */
const baseCanvas = document.getElementById('base-canvas');
/** @type {HTMLCanvasElement} */
const timerCanvas = document.getElementById('timer-canvas');
/** @type {HTMLCanvasElement} */
const audioCanvas = document.getElementById("audio-visualizer-canvas");

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

document.addEventListener('dragover', (e) => e.preventDefault());
document.addEventListener('drop', (e) => e.preventDefault());

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

    previewSession.scrollIntoView({ behavior: "smooth", block: "end" });
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
            if (image.src) baseCanvasCtx.drawImage(image, 0, 0, baseCanvas.width, baseCanvas.height);
            baseCanvasCtx.beginPath();
            baseCanvasCtx.lineWidth = 20;
            baseCanvasCtx.strokeStyle = '#40e0d0';

            let centerX = (titleInput.value || subtitleObjs) ? baseCanvas.width / 4 * 3 : baseCanvas.width / 2;
            baseCanvasCtx.arc(centerX, baseCanvas.height / 2, baseCanvas.width / 8, 0, 2 * Math.PI);
            baseCanvasCtx.stroke();

            baseCanvasCtx.font = `${fontSize_main}rem Inter`;
            baseCanvasCtx.fillStyle = '#40e0d0';
            const title = titleInput.value;
            baseCanvasCtx.fillText(title, baseCanvas.width*0.01, baseCanvas.height*0.3);
            
        } else {
            baseCanvasCtx.clearRect(0, 0, baseCanvas.width, baseCanvas.height);
            if (image.src) baseCanvasCtx.drawImage(image, 0, 0, baseCanvas.width, baseCanvas.height);
            baseCanvasCtx.beginPath();
            baseCanvasCtx.lineWidth = 20;
            baseCanvasCtx.strokeStyle = '#40e0d0';
            baseCanvasCtx.moveTo(baseCanvas.width*0.25/2, baseCanvas.height - heightOffset - 20);
            baseCanvasCtx.lineTo(baseCanvas.width*(0.25/2+0.75), baseCanvas.height - heightOffset - 20);
            baseCanvasCtx.stroke();

            baseCanvasCtx.font = `${fontSize_main}rem Inter`;
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
        timerCanvasCtx.font = `${fontSize_main}rem Inter`;
        timerCanvasCtx.fillText(formatTime(audio.currentTime), timerCanvas.width*(0.75), baseCanvas.height*0.75);
        
        timerCanvasCtx.font = `${fontSize_secondary}rem Inter`;
        if (subtitleObjs) {
            subtitleObjs.forEach((sub) => {
                const startInSeconds = convertTimecodeIntoSeconds(sub.startTime);
                const endInSeconds = convertTimecodeIntoSeconds(sub.endTime);
                if (audio.currentTime > startInSeconds && audio.currentTime < endInSeconds) timerCanvasCtx.fillText(sub.text, timerCanvas.width*(0.25/2), baseCanvas.height*0.5 );
            });
        }

        timerCanvasCtx.fillStyle = '#000000'
        timerCanvasCtx.fillRect(timerCanvas.width*(0.25/2), baseCanvas.height - heightOffset - 20, timerCanvas.width*(0.75*audio.currentTime/audio.duration), 10);
        
        requestAnimationFrame(horizontalAnimateTimer);
    }

    function circularAnimateTimer() {
        timerCanvasCtx.clearRect(0, 0, timerCanvas.width, timerCanvas.height);
        if (!isRunning) return;

        timerCanvasCtx.fillStyle = '#40e0d0'
        timerCanvasCtx.font = `${fontSize_main}rem Inter`
        let timeLocX = (titleInput.value || subtitleObjs) ? baseCanvas.width *0.69 : baseCanvas.width * 0.44;
        timerCanvasCtx.fillText(formatTime(audio.currentTime), timeLocX, baseCanvas.height*0.53);
        
        timerCanvasCtx.font = `${fontSize_secondary}rem Inter`
        if (subtitleObjs) {
            subtitleObjs.forEach((sub) => {
                const startInSeconds = convertTimecodeIntoSeconds(sub.startTime);
                const endInSeconds = convertTimecodeIntoSeconds(sub.endTime);
                if (audio.currentTime > startInSeconds && audio.currentTime < endInSeconds) timerCanvasCtx.fillText(sub.text, timerCanvas.width*0.01, baseCanvas.height*0.5 );
            });
        }

        timerCanvasCtx.fillStyle = '#000000'
        timerCanvasCtx.beginPath();
        timerCanvasCtx.lineWidth = 10;
        timerCanvasCtx.strokeStyle = '#000000';

        let centerX = (titleInput.value || subtitleObjs) ? timerCanvas.width / 4 * 3 : timerCanvas.width / 2;
        timerCanvasCtx.arc(centerX, timerCanvas.height / 2, timerCanvas.width / 8, 0, 2 * Math.PI * audio.currentTime/audio.duration);
        timerCanvasCtx.stroke();

        requestAnimationFrame(circularAnimateTimer);
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
            (i < dataArrayOffset) ? barHeight = 0 : barHeight = dataArray[i - dataArrayOffset] * 0.75;
            
            audioCanvasCtx.save();
            let centerX = (titleInput.value || subtitleObjs) ? baseCanvas.width / 4 * 3 : baseCanvas.width / 2;
            audioCanvasCtx.translate(centerX, audioCanvas.height / 2);
            audioCanvasCtx.rotate(i * Math.PI * 2 / (bufferLength + dataArrayOffset));
            
            audioCanvasCtx.fillStyle = "#40e0d0";
            audioCanvasCtx.fillRect(0, audioCanvas.width / 8, barWidth, barHeight);

            x += barWidth;
            audioCanvasCtx.restore();
        }
        
        requestAnimationFrame(circularAnimate);
    }

    if (wavePathOption === "horizontal") {
        drawBase("horizontal");
        horizontalAnimate();
        if (timerOption === "enable") horizontalAnimateTimer();
        return;
    }

    if (wavePathOption === "circular") {
        drawBase("circular");
        circularAnimate();
        if (timerOption === "enable") circularAnimateTimer();
        return;
    }

    return;
})

exportButton.addEventListener('click', async (e) => {
    if (!("CropTarget" in self && "fromElement" in CropTarget)) {
        return alert("Export is not supported by current browser used. Please use chrome 104 or above.");
    }
    const cropTarget = await CropTarget.fromElement(canvasContainer);
    if(isRunning) audioPlayButton.click();
    const stream = await navigator.mediaDevices.getDisplayMedia({
        preferCurrentTab: true,
        audio: true,
        video: true
    });
    backdrops.forEach((backdrop) => backdrop.style.display = 'block');

    const [videoTrack] = stream.getVideoTracks();
    await videoTrack.cropTo(cropTarget);
    audio.currentTime = 0;
    audioPlayButton.click();
    const mediaStreamAudioDestinationNode = new MediaStreamAudioDestinationNode(audioCtx);
    stream.addTrack(mediaStreamAudioDestinationNode.stream.getAudioTracks()[0]);

    const recording = record(stream, 10000);

    let link$ = document.createElement('a');
    link$.setAttribute('download','music_visual');
    recording.then(url => {
        link$.setAttribute('href', url);
        link$.click();
        backdrops.forEach((backdrop) => backdrop.style.display = 'none');
    })

})


