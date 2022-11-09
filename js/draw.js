import { convertTimecodeIntoSeconds } from "./util/convertTimecodeIntoSeconds"

export function drawText(canvasCtx, text, fontSize, pos) {
    canvasCtx.font = `${fontSize}rem Inter`;
    canvasCtx.fillStyle = '#40e0d0';
    canvasCtx.fillText(text, pos.x, pos.y);
}

export function drawBackground(canvasCtx, image, canvas) {
    if (image.src) canvasCtx.drawImage(image, 0, 0, canvas.width, canvas.height);    
}

export function drawHorizontalWaveBase(canvasCtx, style, startPos, endPos) {
    canvasCtx.beginPath();
    canvasCtx.lineWidth = style.lineWidth;
    canvasCtx.strokeStyle = style.strokeStyle;
    canvasCtx.moveTo(startPos.x, startPos.y);
    canvasCtx.lineTo(endPos.x, endPos.y);
    canvasCtx.stroke();
}

export function drawCircularWaveBase(canvasCtx, style, centrePos, radius, endAngle) {
    canvasCtx.beginPath();
    canvasCtx.lineWidth = style.lineWidth;
    canvasCtx.strokeStyle = style.strokeStyle;
    canvasCtx.arc(centrePos.x, centrePos.y, radius, 0, endAngle);
    canvasCtx.stroke();
}

export function drawLyricsLine(canvasCtx, lyrics, fontSize, pos, audio) {
    canvasCtx.fillStyle = '#40e0d0'
    canvasCtx.font = `${fontSize}rem Inter`;
    if (lyrics) {
        lyrics.forEach((line) => {
            const startInSeconds = convertTimecodeIntoSeconds(line.startTime);
            const endInSeconds = convertTimecodeIntoSeconds(line.endTime);
            if (audio.currentTime > startInSeconds && audio.currentTime < endInSeconds) canvasCtx.fillText(line.text, pos.x, pos.y );
        });
    }    
}