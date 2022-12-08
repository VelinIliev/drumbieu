function observedForAnimation() {
    const skillsColumns = document.querySelectorAll('.skills-column');
    const mainTitles = document.querySelectorAll('.category-title');
    let obsrvedObjects = [...skillsColumns,  ...mainTitles];

    const observerAnimation = new IntersectionObserver( (entries) => {
        entries.forEach((entrie) => {
            if (entrie.intersectionRatio > 0) {
                    entrie.target.classList.add('appear');
            } 
            else {
                entrie.target.classList.remove('appear');
            }
        })
    });
    obsrvedObjects.forEach((item) => observerAnimation.observe(item));
}

window.addEventListener("load", observedForAnimation);