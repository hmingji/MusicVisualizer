let fontSize = {
    primary: 1,
    secondary: 2,
};

function assignFontSize(mediaQuery) {
    if (mediaQuery.matches) {
        fontSize.primary = 4;
        fontSize.secondary = 2;
    } else {
        fontSize.primary = 2;
        fontSize.secondary = 1;
    }
}

const mediaQuery = window.matchMedia("(min-width: 965px)");

export function initResponsiveFont() {
    assignFontSize(mediaQuery);
    mediaQuery.addEventListener('change', assignFontSize);
} 

export function getFontSize() {
    
    return fontSize;
}