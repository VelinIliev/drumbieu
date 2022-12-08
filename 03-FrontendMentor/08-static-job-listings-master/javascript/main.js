const apiURL = 'data.json';

const tasksContainer = document.querySelector(".tasksContainer");
const filtersDOM = document.querySelector(".filters");

let filters = [];
let workData = [];
let idContainer = [];

function displayNew(el) {
    if (el.new === true) {
        return `<div class="new">New!</div>`
    } else return "";
};

function displayFeatured(el) {
    if (el.featured === true) {
        return `<div class="featured">Featured</div>`
    } else return ""; 
};
function markFeatured(el) {
    if (el.featured === true) {
        return "markFeatured"
    }else {
        return "";
    }
};

function displaySkills(el) {
    let span = "";
    // console.log(skills);
    el.forEach(element => {
        span += `<span>${element}</span>`
    })
    return span;
};

function renderJobs(el) {
    tasksContainer.innerHTML += `
        <div class="jobs ${markFeatured(el)}">
            <div class="logo">
                <img src="${el.logo}" alt="${el.company} logo">
            </div>
            <div class="midSection">
                <div class="top">
                    <div class="company">${el.company}</div>
                    ${displayNew(el)}
                    ${displayFeatured(el)}
                </div>
                <div class="middle">
                    <div class="position">${el.position}</div>
                </div>
                <div class="bottom">
                    <div class="postedAt">${el.postedAt}</div> 
                    <div class="dot"> • </div> 
                    <div class="contract">${el.contract}</div> 
                    <div class="dot"> • </div> 
                    <div class="location">${el.location}</div>
                </div>
            </div>
            <div class="right">
                <span>${el.role}</span>
                <span>${el.level}</span>
                ${displaySkills(el.languages)}
                ${displaySkills(el.tools)}
            </div>
        </div>`
};

function displayFilters() {
    if (filters.length > 0) {
        filtersDOM.classList.remove("nonvisible");
        filtersDOM.innerHTML = ""
        for (let i = 0; i < filters.length; i++) {
            const element = filters[i];
            filtersDOM.innerHTML += `
                <div>${element}</div>`; 
        }  
    } else if (filters.length === 0){
        filtersDOM.classList.add("nonvisible");
    }
};

function addFilters() {
    idContainer=[];
    for (let i = 0; i < filters.length; i++) {
        const element = filters[i];
        workData.forEach(el => {
            if (el.languages.includes(filters[i]) || el.tools.includes(filters[i]) ||
                el.role === filters[i] || el.level === filters[i]){
                if (idContainer.includes(el.id)){

                } else {
                    idContainer.push(el.id)
                }
            }
        });
        displayJobs();
    }
};
function removeFilters(target) {
    const index = filters.indexOf(`${target.innerHTML}`);
    if (index > -1) {
        filters.splice(index, 1); 
        addFilters();
    }
    displayFilters();
    displayJobs();
}

function displayJobs() {
    if (filters.length === 0 ) {
        tasksContainer.innerHTML = "";
        workData.forEach(el => {
            renderJobs(el);
        });
    } else if (filters.length !== 0 ){
        tasksContainer.innerHTML = "";
        displayFilters();
        for (let i = 0; i < idContainer.length; i++) {
            const element = idContainer[i];
            for (let j = 0; j < workData.length; j++) {
                const element = workData[j];
                if (idContainer[i] === workData[j].id){
                    el=workData[j];
                    renderJobs(el);
                }
            }
        }
    }
};

window.addEventListener('DOMContentLoaded', function() {
    fetch(`${apiURL}`) 
    .then(response => response.json())
    .then(data => {
        workData = data;
        displayJobs();
    })
    .catch(err => console.log(err))
});

tasksContainer.addEventListener('click', function(e){
    if (e.target.tagName === 'SPAN') {
        if (filters.includes(e.target.innerHTML)) {

        } else {
            filters.push(e.target.innerHTML);    
            addFilters();
        }
    }
    
});

filtersDOM.addEventListener("click", function(e) {
    if (e.target.tagName === 'DIV') { 
        removeFilters(e.target)
    }
})