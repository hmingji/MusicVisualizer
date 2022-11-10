
function convertIntoLineObj(group) {
    return {
        line: group[1],
        startTime: group[2],
        endTime: group[3],
        text: group[4],
    };
};

export function srtParser(strContent) {
    const pattern = /(\d+)\n([\d:,]+)\s+-{2}\>\s+([\d:,]+)\n([\s\S]*?(?=\n\d+$|EndOfString))/gm;
    let result = [];

    if (typeof strContent != "string") throw new Error("Sorry, Parser accept string only.");

    if (strContent == null) return result;

    strContent = strContent.replace(/\r\n|\r|\n/g, "\n");
    strContent = strContent.concat("EndOfString");

    while ((matches = pattern.exec(strContent)) != null) {
        result.push(convertIntoLineObj(matches));
    }

    return result;
};