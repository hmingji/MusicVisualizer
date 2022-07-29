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