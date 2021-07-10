export let randomFloat = (min, max) => Math.random() * (max - min) + min;
export let randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export let randomAlphaNum = (max) => {
    var result = '';
    let length = Math.floor(Math.random() * max)
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


export const getFileSize = (arr) => {
    if (arr.length === 0) return 0;
    let len = new Blob(arr).size;
    len += arr.length; // to get comma's size
    return parseFloat(parseFloat(len) / 1024).toFixed(2)
}


export function isAlphaNumeric(str) {
    let code, i, len;
    let int = 0;
    let char = 0;
    for (i = 0, len = str.length; i < len; i++) {
        code = str.charCodeAt(i);
        if (code > 47 && code < 58) {
            int++;
        }
        if ((code > 64 && code < 91) || (code > 96 && code < 123)) {
            char++;
        }
    }
    return int > 0 && char > 0;
};