function display_experience(start, end){
    let total_months = (end.getFullYear() - start.getFullYear()) * 12 - start.getMonth() + end.getMonth();
    let years = Math.floor(total_months / 12);
    let months = total_months - years * 12;
    return `${years}.${months} years`
}

function fill_experience() {
    const html_experience = document.querySelector("#html_experience");
    const css_experience = document.querySelector('#css_experience');
    const js_experience = document.querySelector('#js_experience');
    const git_experience = document.querySelector('#git_experience');
    const python_experience = document.querySelector('#python_experience');
    const django_experience = document.querySelector('#django_experience');
    const postgre_experience = document.querySelector('#postgre_experience');
    const react_experience = document.querySelector('#react_experience');
    const fastapi_experience = document.querySelector( '#fastapi_experience');
    const vuejs_experience = document.querySelector( '#vuejs_experience');

    html_experience.innerHTML = display_experience(new Date("Sep 01, 2020 00:00:00"), new Date);
    css_experience.innerHTML = display_experience(new Date("Sep 01, 2020 00:00:00"), new Date);
    js_experience.innerHTML = display_experience(new Date("Sep 01, 2020 00:00:00"), new Date);
    git_experience.innerHTML = display_experience(new Date("Sep 01, 2020 00:00:00"), new Date);
    python_experience.innerHTML = display_experience(new Date("Jul 01, 2022 00:00:00"), new Date);
    django_experience.innerHTML = display_experience(new Date("May 01, 2023 00:00:00"), new Date);
    postgre_experience.innerHTML = display_experience(new Date("May 01, 2023 00:00:00"), new Date);
    react_experience.innerHTML = display_experience(new Date("Sep 01, 2023 00:00:00"), new Date);
    fastapi_experience.innerHTML = display_experience(new Date("Nov 01, 2023 00:00:00"), new Date);
    vuejs_experience.innerHTML = display_experience(new Date("Nov 01, 2023 00:00:00"), new Date);
}

function fill_footer() {
    const footer = document.querySelector('#footer');
    current_year = new Date;
    footer.innerHTML = `Copyright © 2020-${current_year.getFullYear()} | Design and coding by Velin Iliev.`
}

window.addEventListener('DOMContentLoaded', function() {
    fill_experience();
    fill_footer();
});