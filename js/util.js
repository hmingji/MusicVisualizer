function setActive(dropzone, active = true) {
    const hasActiveClass = dropzone.classList.contains('active');

    if (active && !hasActiveClass) {
        return dropzone.classList.add('active');
    }

    if (!active && hasActiveClass) {
        return dropzone.classList.remove('active');
    }
}

