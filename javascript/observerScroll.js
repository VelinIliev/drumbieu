window.addEventListener("load", function () {
    const skillsColumns = document.querySelectorAll('.skills-column');

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entrie) => {
            if (entrie.intersectionRatio > 0 &&  
                entrie.intersectionRatio <= 1) {
                    entrie.target.classList.add('appear-skills');
            } 
            else {
                entrie.target.classList.remove('appear-skills');
            }
        })
    });
    skillsColumns.forEach((el) => observer.observe(el))
})