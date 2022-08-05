function setActive(dropzone, active = true) {
    const hasActiveClass = dropzone.classList.contains('active');

    if (active && !hasActiveClass) {
        return dropzone.classList.add('active');
    }

    if (!active && hasActiveClass) {
        return dropzone.classList.remove('active');
    }
}

var PF_SRT = (function () {
    var pattern =
      /(\d+)\n([\d:,]+)\s+-{2}\>\s+([\d:,]+)\n([\s\S]*?(?=\n\d+$|EndOfString))/gm;
    var _regExp;
  
    var init = function () {
      _regExp = new RegExp(pattern);
    };
  
    var parse = function (f) {
      if (typeof f != "string") throw "Sorry, Parser accept string only.";
  
      var result = [];
      if (f == null) return result;
  
      f = f.replace(/\r\n|\r|\n/g, "\n");
      f = f.concat("EndOfString");
      
      while ((matches = pattern.exec(f)) != null) {
        result.push(toLineObj(matches));
      }

      return result;
    };
  
    var toLineObj = function (group) {
      return {
        line: group[1],
        startTime: group[2],
        endTime: group[3],
        text: group[4],
      };
    };
    init();
    return {
      parse: parse,
    };
})();

function convertTimecodeIntoSeconds(timecode) {
    var split = timecode.split(":");
    var seconds = 0;
    seconds += parseInt(split[0]) * 60 * 60;
    seconds += parseInt(split[1]) * 60;
    seconds += parseInt(split[2]);
    return seconds;
}

function isMultipleFiles(files) {
    if (files.length > 1) return true;
    return false;
}

function isCorrectFileType(files, filetypes) {
    return [...files].every((file) => {
        for (const filetype of filetypes) {
            if (file.type === filetype) return true;
        }
        return false;
    });
}

function record(stream, time) {
    var recordedChunks = [];
    return new Promise(function (res, rej) {
        mediaRecorder = new MediaRecorder(stream, {
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
            var blob = new Blob(recordedChunks, {type: "video/webm" });
            var url = URL.createObjectURL(blob);
            res(url);
        }
    })
}

function removeFile(fileType) {
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

function truncate(str, n){
    const strArr = str.split('.');
    return (str.length > n) ? str.slice(0, n-1) + '&hellip;' + strArr[strArr.length - 1] : str;
};