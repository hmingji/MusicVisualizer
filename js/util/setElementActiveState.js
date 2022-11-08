export function setElementActiveState(element, active = true) {
    const hasActiveClass = element.classList.contains('active');

    if (active && !hasActiveClass) {
        return element.classList.add('active');
    }

    if (!active && hasActiveClass) {
        return element.classList.remove('active');
    }
}