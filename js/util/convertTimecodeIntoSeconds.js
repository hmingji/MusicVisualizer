export function convertTimecodeIntoSeconds(timecode) {
    const split = timecode.split(":");
    let seconds = 0;
    seconds += parseInt(split[0]) * 60 * 60;
    seconds += parseInt(split[1]) * 60;
    seconds += parseInt(split[2]);
    return seconds;
};
