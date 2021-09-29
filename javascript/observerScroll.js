window.addEventListener("load", function () {
    const skillsColumnnLeft = document.getElementById('column-left');
    const skillsColumnnRight = document.getElementById('column-right');

    const observer = new IntersectionObserver(function (entries) {
        // console.log(entries);
        if (entries[0].intersectionRatio > 0 &&  
            entries[0].intersectionRatio <= 1) {
                entries[0].target.classList.add('appear-skills');
                skillsColumnnRight.classList.add('appear-skills');
        } 
        else {
            entries[0].target.classList.remove('appear-skills');
            skillsColumnnRight.classList.remove('appear-skills');
        }
    });
    observer.observe(skillsColumnnLeft);
})