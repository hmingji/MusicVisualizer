import { canvasContainer, audioPlayButton, backdrops, audio, exportButton } from "./domLoader";
import { getAudioPlayState } from "./audio";
import { record } from "./util/record";

export function initExport() {
    exportButton.addEventListener('click', async (e) => {
        if (!("CropTarget" in self && "fromElement" in CropTarget)) {
            return alert("Export is not supported by current browser used. Please use chrome 104 or above.");
        }
        const cropTarget = await CropTarget.fromElement(canvasContainer);
        if(getAudioPlayState()) audioPlayButton.click();
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
    });
};
