export function formatTime(seconds) {
    const minuteNum = Math.floor(seconds / 60);
    const minuteStr = (minuteNum >= 10) ? minuteNum : "0" + minuteNum;
    const secondNum = Math.floor(seconds % 60);
    const secondStr = (secondNum >= 10) ? secondNum : "0" + secondNum;
    return minuteStr + ":" + secondStr;
}