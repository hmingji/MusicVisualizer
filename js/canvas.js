import { getAudioCtx, getAudioPlayState, initAudioAnalyser, setAudioPlayState } from "./audio";
import { getBackgroundImage } from "./backgroundImage";
import { audioCanvas, baseCanvas, timerCanvas, audio, audioPlayButton, previewSession } from "./domLoader";
import { drawText, drawLyricsLine, drawHorizontalWaveBase, drawCircularWaveBase, drawBackground } from "./draw";
import { getFontSize } from "./font";
import { getLyricsObjs } from "./lyrics";
import { getSetting } from "./setting";
import { formatTime } from "./util/formatTime"

audioCanvas.height = window.innerHeight;
audioCanvas.width = window.innerWidth;
const audioCanvasCtx = audioCanvas.getContext('2d');

baseCanvas.height = window.innerHeight;
baseCanvas.width = window.innerWidth;
const baseCanvasCtx = baseCanvas.getContext('2d');

timerCanvas.height = window.innerHeight;
timerCanvas.width = window.innerWidth;
const timerCanvasCtx = timerCanvas.getContext('2d');

const drawTimerArgs = (mode) => { 
    const { primary } = getFontSize();
    const lyrics = getLyricsObjs();
    const { title } = getSetting();
    posXForCircularMode = (title || lyrics) ? timerCanvas.width * 0.69 : timerCanvas.width * 0.44;
    
    return {
        canvasCtx: timerCanvasCtx,
        text: formatTime(audio.currentTime),
        fontSize: primary,
        pos: {
            x: (mode === 'horizontal') ? timerCanvas.width * 0.75 : posXForCircularMode,
            y: (mode === 'horizontal') ? timerCanvas.height * 0.75 : timerCanvas.height * 0.53,
        }
    }
}

const drawLyricsArgs = (mode) => {
    const { secondary } = getFontSize();
    return {
        canvasCtx: timerCanvasCtx,
        lyrics: getLyricsObjs(),
        fontSize: secondary,
        pos: {
            x: (mode === 'horizontal') ? timerCanvas.width * 0.25/2 : timerCanvas.width * 0.01,
            y: (mode === 'horizontal') ? timerCanvas.height * 0.5 : timerCanvas.height * 0.5,
        },
        audio: audio,
    }
}

const heightOffset = 50;

export function animateTimerForHorizontalWave() {
    timerCanvasCtx.clearRect(0, 0, timerCanvas.width, timerCanvas.height);
    if (!getAudioPlayState()) return;

    const { timer } = getSetting();
    if (timer === 'enable') {
        const drawWaveBaseArgs = {
            canvasCtx: timerCanvasCtx,
            style: {
                lineWidth: 10,
                strokeStyle: '#000000',
            },
            startPos: {
                x: timerCanvas.width * 0.25/2,
                y: timerCanvas.height - heightOffset - 15,
            },
            endPos: {
                x: timerCanvas.width * (0.25/2 + 0.75 * audio.currentTime/audio.duration),
                y: timerCanvas.height - heightOffset - 15,
            }
        }
        drawHorizontalWaveBase(...Object.values(drawWaveBaseArgs));
        drawText(...Object.values(drawTimerArgs('horizontal')));
    }

    drawLyricsLine(...Object.values(drawLyricsArgs('horizontal')));
    requestAnimationFrame(animateTimerForHorizontalWave);
}

export function animateTimerForCircularWave() {
    timerCanvasCtx.clearRect(0, 0, timerCanvas.width, timerCanvas.height);
    if (!getAudioPlayState()) return;

    const lyrics = getLyricsObjs();
    const { title, timer } = getSetting();
    if (timer === 'enable') {
        const drawWaveBaseArgs = {
            canvasCtx: timerCanvasCtx,
            style: {
                lineWidth: 10,
                strokeStyle: '#000000',
            },
            centrePos: {
                x: (title || lyrics) ? timerCanvas.width / 4*3 : timerCanvas.width / 2,
                y: timerCanvas.height / 2,
            },
            radius: timerCanvas.width / 8,
            endAngle: 2 * Math.PI * audio.currentTime/audio.duration, //dynamics angle to change playback time
        }
        drawCircularWaveBase(...Object.values(drawWaveBaseArgs));
        drawText(...Object.values(drawTimerArgs('circular')));
    }
    
    drawLyricsLine(...Object.values(drawLyricsArgs('circular')));
    requestAnimationFrame(animateTimerForCircularWave);
}

function drawBaseForHorizontalWave() {
    baseCanvasCtx.clearRect(0, 0, baseCanvas.width, baseCanvas.height);
    drawBackground(baseCanvasCtx, getBackgroundImage(), baseCanvas);
    const { primary } = getFontSize();
    const { title } = getSetting();
    const drawWaveBaseArgs = {
        canvasCtx: baseCanvasCtx,
        style: {
            lineWidth: 20,
            strokeStyle: '#40e0d0',
        },
        startPos: {
            x: baseCanvas.width * 0.25/2,
            y: baseCanvas.height - heightOffset - 20,
        },
        endPos: {
            x: baseCanvas.width * (0.75+0.25/2),
            y: baseCanvas.height - heightOffset - 20,
        }
    }
    drawHorizontalWaveBase(...Object.values(drawWaveBaseArgs));
    drawText(baseCanvasCtx, title, primary, { x: baseCanvas.width * 0.25/2, y: baseCanvas.height * 0.3 });
}

function drawBaseForCircularWave() {
    baseCanvasCtx.clearRect(0, 0, baseCanvas.width, baseCanvas.height);
    drawBackground(baseCanvasCtx, getBackgroundImage(), baseCanvas);

    const { primary } = getFontSize();
    const lyrics = getLyricsObjs();
    const { title } = getSetting();

    const drawWaveBaseArgs = {
        canvasCtx: baseCanvasCtx,
        style: {
            lineWidth: 20,
            strokeStyle: '#40e0d0',
        },
        centrePos: {
            x: (title || lyrics) ? timerCanvas.width / 4*3 : timerCanvas.width / 2,
            y: baseCanvas.height / 2,
        },
        radius: baseCanvas.width / 8,
        endAngle: 2 * Math.PI,
    }
    drawCircularWaveBase(...Object.values(drawWaveBaseArgs));
    drawText(baseCanvasCtx, title, primary, { x: baseCanvas.width * 0.01, y: baseCanvas.height * 0.3 });
}

export function animateCanvas() {
    const audioAnalyser = initAudioAnalyser();
    const bufferLength = audioAnalyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const widthOffset = audioCanvas.width * 0.25 / 2;
    const heightOffset = 50;
    const baseHeight = 12;
    const dataArrayOffset = 10;
    const barWidth = audioCanvas.width / (bufferLength + 10) * 0.75;
    let barHeight;
    let x;
    const { wavePath } = getSetting();
    
    function horizontalWaveAnimate() {
        x = 0;
        audioCanvasCtx.clearRect(0, 0, audioCanvas.width, audioCanvas.height);
        if (!getAudioPlayState()) return;
        audioAnalyser.getByteFrequencyData(dataArray);

        for (let i = 0; i < bufferLength + dataArrayOffset; i++){
            (i < dataArrayOffset) ? barHeight = 0 : barHeight = dataArray[i - dataArrayOffset];

            audioCanvasCtx.fillStyle = "#40e0d0";
            audioCanvasCtx.fillRect(x + widthOffset, audioCanvas.height - barHeight - baseHeight - heightOffset, barWidth, barHeight);
            
            x += barWidth;
        }
        requestAnimationFrame(horizontalWaveAnimate);
    }

    function circularWaveAnimate() {
        x = 0;        
        audioCanvasCtx.clearRect(0, 0, audioCanvas.width, audioCanvas.height);
        if (!getAudioPlayState()) return;
        audioAnalyser.getByteFrequencyData(dataArray);

        for (let i = 0; i < bufferLength + dataArrayOffset; i++){
            (i < dataArrayOffset) ? barHeight = 0 : barHeight = dataArray[i - dataArrayOffset] * 0.75;
            
            audioCanvasCtx.save();
            let centerX = (getSetting().title || getLyricsObjs()) ? baseCanvas.width / 4 * 3 : baseCanvas.width / 2;
            audioCanvasCtx.translate(centerX, audioCanvas.height / 2);
            audioCanvasCtx.rotate(i * Math.PI * 2 / (bufferLength + dataArrayOffset));
            
            audioCanvasCtx.fillStyle = "#40e0d0";
            audioCanvasCtx.fillRect(0, audioCanvas.width / 8, barWidth, barHeight);

            x += barWidth;
            audioCanvasCtx.restore();
        }
        requestAnimationFrame(circularWaveAnimate);
    }

    if (wavePath === "horizontal") {
        drawBaseForHorizontalWave();
        horizontalWaveAnimate();
        animateTimerForHorizontalWave();
    }

    if (wavePath === "circular") {
        drawBaseForCircularWave();
        circularWaveAnimate();
        animateTimerForCircularWave();
    }
}

export function initCanvas() {
    audioPlayButton.addEventListener('click', (e) => {
        const audioCtx = getAudioCtx();
        if (getAudioPlayState()) {
            if (audioCtx) audioCtx.suspend();
            audio.pause();
            return;
        }
        if (audioCtx) audioCtx.resume();
        audio.play();
        setAudioPlayState(true);
        previewSession.scrollIntoView({ behavior: "smooth", block: "end" });
    })
}