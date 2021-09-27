const apiURL = './javascript/dataprojects.json';
const optionSelector = document.querySelector('#option-slelctor');
let ptojectsData = [];

function renderProjects(data) {
    const projectsContainer = document.querySelector("#projectsContainer");
    projectsContainer.innerHTML = "";
    let html, css, responsive, javascript = "";
    data.forEach(el => {
        projectsContainer.innerHTML += `
        <div class="project">
            <div class="image">
                <img src="${el.image}" alt="">
            </div>
            <div class="wraper">
                <div class="name">${el.name}</div>
                <div class="tools"> 
                    ${html = el.html === true ? 
                        '<span class="HTML">HTML</span>' : ''}
                    ${css = el.CSS === true 
                        ? el.sass === true 
                            ? '<span class="CSS">SASS</span>' 
                            : '<span class="CSS">CSS</span>'
                        : ''}
                    ${responsive = el.responsive === true ? 
                        '<span class="CSS">(FLEX)</span>' : ''}
                    ${javascript = el.javascript === true ? 
                        '<span class="javascript">JS</span>' : ''}
                </div>
                <div class="description">${el.description}</div>
            </div>
            <div class="links">
                    <a href="${el.sitelink}" target="_blank">PREVIEW SITE</a>
                    <a href="${el.codelink}" target="_blank">VIEW CODE</a>
            </div>
        </div>`;
    }); 
};
function renderError() {
    const projectsContainer = document.querySelector("#projectsContainer");
    projectsContainer.innerHTML = `<div class=alert>SOMETHING WENT WRONG! <br>
    NO DATA LOADED</div>`;
}

window.addEventListener('DOMContentLoaded', function() {
    fetch(`${apiURL}`)
    .then(response => response.json())
    .then(data => {
        ptojectsData = data;
        renderProjects(ptojectsData);
    })
    .catch(err => {
        console.log(err);
        renderError();
    });
});

optionSelector.addEventListener('change', function(){
    let [key] = [optionSelector.value];
    let newData = (key === 'all') 
        ? ptojectsData 
        : ptojectsData.filter((data) => data[key] === true);
    renderProjects(newData);
})
