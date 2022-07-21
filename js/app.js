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
const audioPlayButton = document.querySelector('#audioplay-button');
audioCanvas.height = window.innerHeight;
audioCanvas.width = window.innerWidth;
const audioCanvasCtx = audioCanvas.getContext('2d');
console.log(audioCanvasCtx)
let audioSource;
let audioAnalyser;

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
    console.log(dataArray);
    const barWidth = audioCanvas.width/(bufferLength)*0.75;
    let barHeight;
    let x;


    function animate() {
        x = 0;
        audioCanvasCtx.clearRect(0, 0, audioCanvas.width, audioCanvas.height);
        audioAnalyser.getByteFrequencyData(dataArray);
        audioCanvasCtx.fillStyle = '#40e0d0';
        audioCanvasCtx.fillRect(audioCanvas.width*0.25/2, audioCanvas.height - 10 - 20, audioCanvas.width*0.75, 10);

        for (let i = 0; i < bufferLength; i++){
            barHeight = dataArray[i];

            let grd = audioCanvasCtx.createLinearGradient(x + audioCanvas.width*0.25/2, audioCanvas.height - 10 - 20, x + audioCanvas.width*0.25/2, audioCanvas.height - barHeight - 10 - 20);
            grd.addColorStop(0, "#40e0d0");
            grd.addColorStop(0.5, "#ff8c00");
            grd.addColorStop(1, "#ff0080");
            audioCanvasCtx.fillStyle = grd;
            
            audioCanvasCtx.fillRect(x + audioCanvas.width*0.25/2, audioCanvas.height - barHeight - 10 - 20, barWidth, barHeight);
            
            //audioCanvasCtx.fillStyle = '#ff8c00';
            //audioCanvasCtx.fillRect(x + audioCanvas.width*0.25/2, audioCanvas.height - (barHeight*0.5) - 10 - 20, barWidth, barHeight*0.5);
            x += barWidth;
        }
        //need to add another canvas to cover the rounded bottom
        //audioCanvasCtx.clearRect(audioCanvas.width*0.25/2, audioCanvas.height - 20 - 10 - 20, audioCanvas.width*(0.25/2+0.75), 30);
        requestAnimationFrame(animate);
    }
    animate();
})

