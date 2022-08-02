const audioFileDropzone = document.querySelector('.file-dropzone.audiofile');
const lyricsFileDropzone = document.querySelector('.file-dropzone.lyricsfile');
const imageFileDropzone = document.querySelector('.file-dropzone.imagefile');
const audio = document.querySelector('#audio'); 
const audioFileInput = document.querySelector('#audio-file');
const lyricsFileInput = document.querySelector('#lyrics-file');
const imageFileInput = document.querySelector('#image-file');
const titleInput = document.querySelector('.title-input');
const audioPlayButton = document.querySelector('#audioplay-button');
const exportButton = document.querySelector('#export-button');
const audioCtx = new AudioContext();
const wavePathButtons = document.querySelectorAll('input[name="wavepath"]');
const wordLengthSpan = document.getElementById('wordlength-span');
const timerButtons = document.querySelectorAll('input[name=timer]');
const timerOption = "enable";
var subtitleObjs;
var image = new Image();

/** @type {HTMLCanvasElement} */
const baseCanvas = document.getElementById('base-canvas');
/** @type {HTMLCanvasElement} */
const timerCanvas = document.getElementById('timer-canvas');
/** @type {HTMLCanvasElement} */
const audioCanvas = document.getElementById("audio-visualizer-canvas");
/** @type {HTMLCanvasElement} */
const exportCanvas = document.getElementById("export-canvas");

audioCanvas.height = window.innerHeight;
audioCanvas.width = window.innerWidth;
const audioCanvasCtx = audioCanvas.getContext('2d');

baseCanvas.height = window.innerHeight;
baseCanvas.width = window.innerWidth;
const baseCanvasCtx = baseCanvas.getContext('2d');

timerCanvas.height = window.innerHeight;
timerCanvas.width = window.innerWidth;
const timerCanvasCtx = timerCanvas.getContext('2d');

exportCanvas.height = window.innerHeight;
exportCanvas.width = window.innerWidth;
const exportCanvasCtx = exportCanvas.getContext('2d');

let audioSource;
let audioAnalyser;
var wavePathOption = "horizontal";
var isRunning = false;

audioFileDropzone.addEventListener('dragenter', (e) => {
    e.preventDefault();
    setActive(e.currentTarget);
})

audioFileDropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    setActive(e.currentTarget);
})

audioFileDropzone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    setActive(e.currentTarget, false);
})

audioFileDropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    setActive(e.currentTarget, false);

    const { files } = e.dataTransfer;
    
    if (isMultipleFiles(files)) {
        return alert("Only one audio file to be uploaded.");
    }  
    
    if (!isCorrectFileType(files, ["audio/mpeg", "audio/wav"])){
        return alert("File type uploaded is not correct.")
    } 

    //get the audio file and assign to the audio element
    audio.src = URL.createObjectURL(files[0]);
    audio.load();
    audioPlayButton.disabled = false;
})

lyricsFileDropzone.addEventListener('dragenter', (e) => {
    e.preventDefault();
    setActive(e.currentTarget);
})

lyricsFileDropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    setActive(e.currentTarget);
})

lyricsFileDropzone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    setActive(e.currentTarget, false);
})

lyricsFileDropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    setActive(e.currentTarget, false);

    const { files } = e.dataTransfer;
    
    if (isMultipleFiles(files)) {
        return alert("Only one audio file to be uploaded.");
    }  
    
    files[0].text().then((result) => {
        subtitleObjs = PF_SRT.parse(result);
        if (subtitleObjs.length == 0) alert("Unable to read the file.");
    }).catch((error) => {
        console.log(error);
    });   
})

imageFileDropzone.addEventListener('dragenter', (e) => {
    e.preventDefault();
    setActive(e.currentTarget);
})

imageFileDropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    setActive(e.currentTarget);
})

imageFileDropzone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    setActive(e.currentTarget, false);
})

imageFileDropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    setActive(e.currentTarget, false);

    const { files } = e.dataTransfer;
    
    if (isMultipleFiles(files)) {
        return alert("Only one audio file to be uploaded.");
    }  
    
    if (!isCorrectFileType(files, ["image/jpeg", "image/png"])){
        return alert("File type uploaded is not correct.")
    } 

    image.src = URL.createObjectURL(files[0]);
})

function isMultipleFiles(files) {
    if (files.length > 1) return true;
    return false;
}

function isCorrectFileType(files, filetypes) {
    return [...files].every((file) => {
        console.log(file);
        for (const filetype of filetypes) {
            if (file.type === filetype) return true;
        }
        return false;
    });
}

audioFileInput.addEventListener('change', (e) => {
    const { files } = e.target;

    if (isMultipleFiles(files)) {
        return alert("Only one audio file to be uploaded.");
    }  
    
    if (!isCorrectFileType(files, ["audio/mpeg", "audio/wav"])){
        return alert("File type uploaded is not correct.")
    } 

    //get the audio file and assign to the audio element
    audio.src = URL.createObjectURL(files[0]);
    audio.load();
    audioPlayButton.disabled = false;
})

lyricsFileInput.addEventListener('change', (e) => {
    const { files } = e.target;

    if (isMultipleFiles(files)) {
        return alert("Only one file to be uploaded.");
    }  
    
    files[0].text().then((result) => {
        subtitleObjs = PF_SRT.parse(result);
        if (subtitleObjs.length == 0) alert("Unable to read the file.");
    }).catch((error) => {
        console.log(error);
    });  
})


document.addEventListener('dragover', (e) => e.preventDefault());
document.addEventListener('drop', (e) => e.preventDefault());

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
            if (image.src) baseCanvasCtx.drawImage(image, 0, 0, baseCanvas.width, baseCanvas.height);
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
            if (image.src) baseCanvasCtx.drawImage(image, 0, 0, baseCanvas.width, baseCanvas.height);
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
        
        timerCanvasCtx.font = "2rem Inter";
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
        if (timerOption === "enable") horizontalAnimateTimer();
        return;
    }

    if (wavePathOption === "circular") {
        drawBase("circular");
        circularAnimate();
        return;
    }

    return;
})

function record(canvas, time) {
    var recordedChunks = [];
    return new Promise(function (res, rej) {
        var stream = canvas.captureStream(25 /*fps*/);
        mediaRecorder = new MediaRecorder(stream, {
            mimeType: "video/webm; codecs=vp9"
        });
        
        //ondataavailable will fire in interval of `time || 4000 ms`
        mediaRecorder.start(time || 4000);

        mediaRecorder.ondataavailable = function (event) {
            recordedChunks.push(event.data);
             // after stop `dataavilable` event run one more time
            if (mediaRecorder.state === 'recording') {
                mediaRecorder.stop();
            }

        }

        mediaRecorder.onstop = function (event) {
            var blob = new Blob(recordedChunks, {type: "video/webm" });
            var url = URL.createObjectURL(blob);
            res(url);
        }
    })
}

exportButton.addEventListener('click', (e) => {
    //to start the play procedure, need to be optimized afterwards
    audioPlayButton.click();

    function exportCanvasAnimate() {
        exportCanvasCtx.clearRect(0, 0, exportCanvas.width, exportCanvas.height);
        if(!isRunning) return;

        exportCanvasCtx.drawImage(baseCanvas, 0, 0);
        exportCanvasCtx.drawImage(audioCanvas, 0, 0);
        exportCanvasCtx.drawImage(timerCanvas, 0, 0);

        requestAnimationFrame(exportCanvasAnimate);
    }

    exportCanvasAnimate();

    const recording = record(exportCanvas, 10000);
    let link$ = document.createElement('a');
    link$.setAtribute('download','recordingVideo');
    recording.then(url => {
        link$.setAttribute('href', url);
        link$.click();
    })

})