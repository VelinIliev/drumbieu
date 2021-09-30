window.addEventListener("load", function () {
    const skillsColumns = document.querySelectorAll('.skills-column');
    const categoryTitles = this.document.querySelectorAll('.category-title');

    const observerSkills = new IntersectionObserver( (entries) => {
        entries.forEach((entrie) => {
            // console.log(entrie);
            if (entrie.intersectionRatio > 0) {
                    entrie.target.classList.add('appear-skills');
            } 
            else {
                entrie.target.classList.remove('appear-skills');
            }
        })
    });
    skillsColumns.forEach((item) => observerSkills.observe(item));


    const observerTitles = new IntersectionObserver( (entries) => {
        entries.forEach((entrie) => {
            // console.log(entrie);
            if (entrie.intersectionRatio > 0) {
                    entrie.target.classList.add('appear-title');
            } 
            else {
                entrie.target.classList.remove('appear-title');
            }
        })
    });
    categoryTitles.forEach((item) => observerTitles.observe(item));

})