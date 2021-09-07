function inViewPort(el) {
    let rect = el.getBoundingClientRect();
    return (
        (rect.top <= 0 && rect.bottm > 0) ||
        (rect.bottm >= window.innerHeight && rect.top <= window.innerHeight) ||
        (rect.top >= 0 && rect.bottom <= window.innerHeight)
    )
}
function animation() {
   
    const skillsColumns = document.querySelectorAll('.skills-column')
    skillsColumns.forEach( (item) => inViewPort(item) 
                                    ? item.classList.add('appear-skills')
                                    : item.classList.remove('appear-skills'))


    window.requestAnimationFrame(animation);
}
window.requestAnimationFrame(animation)