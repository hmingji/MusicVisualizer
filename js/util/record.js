export function record(stream, time) {
    let recordedChunks = [];
    return new Promise(function (res, rej) {
        const mediaRecorder = new MediaRecorder(stream, {
            mimeType: "video/webm; codecs=vp9"
        });

        mediaRecorder.start(time || 4000);

        mediaRecorder.ondataavailable = function (event) {
            recordedChunks.push(event.data);

            if (!isRunning) {
                mediaRecorder.stop();
            }
        }

        mediaRecorder.onstop = function (event) {
            const blob = new Blob(recordedChunks, {type: "video/webm" });
            const url = URL.createObjectURL(blob);
            res(url);
        }
    })
}