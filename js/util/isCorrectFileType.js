export function isCorrectFileType(files, filetypes) {
    return [...files].every((file) => {
        for (const filetype of filetypes) {
            if (file.type === filetype) return true;
        }
        return false;
    });
}