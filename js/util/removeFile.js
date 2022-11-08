export function removeFile(fileType) {
    switch (fileType) {
        case "audio":
            if (audio.src) URL.revokeObjectURL(audio.src);
            audio.src = '';
            audioPlayButton.disabled = true;
            exportButton.disabled = true;
            resetButton.disabled = true;
            break;
        case "image":
            if (image.src) URL.revokeObjectURL(image.src);
            image.src = '';
            break;
        case "lyrics":
            subtitleObjs = [];
            break;
        default:
            break;
    }
}