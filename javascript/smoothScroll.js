const smoothScrooll = document.querySelectorAll('.smooth-scrooll');

function scrollToSection(event) {
    if (supportsSmoothScrolling()) {
        return;
    }
    event.preventDefault();

    let scrollElement = "";
    
    if (event.target.tagName === "I") {
        scrollElement = event.target.parentElement.getAttribute('href')
    } else {
        scrollElement = event.target.getAttribute('href');
    }
    const scrollToElem = document.querySelector(`${scrollElement}`);
    SmoothVerticalScrolling(scrollToElem, 500, "top");
};

function supportsSmoothScrolling() {
    const body = document.body;
    const scrollSave = body.style.scrollBehavior;
    body.style.scrollBehavior = 'smooth';
    const hasSmooth = getComputedStyle(body).scrollBehavior === 'smooth';
    body.style.scrollBehavior = scrollSave;
    return hasSmooth;
};

function SmoothVerticalScrolling(element, time, position) {
    
    var eTop = element.getBoundingClientRect().top;
    var eAmt = eTop / 100;
    var curTime = 0;
    while (curTime <= time) {
        window.setTimeout(SVS_B, curTime, eAmt, position);
        curTime += time / 100;
    }
};

function SVS_B(eAmt, position) {
    if (position == "center" || position == "")
    window.scrollBy(0, eAmt / 2);
    if (position == "top")
    window.scrollBy(0, eAmt);
};

smoothScrooll.forEach( (el)=> el.addEventListener('click', function(e) {
    scrollToSection(e)
}));
