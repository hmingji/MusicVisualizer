export function truncate(str, n){
    const strArr = str.split('.');
    return (str.length > n) ? str.slice(0, n-1) + '&hellip;' + strArr[strArr.length - 1] : str;
};