let dom = {
    modeText: document.querySelector(".modeText"),
    toggleSwitch: document.querySelector(".toggleSwitch"),
    body: document.getElementsByTagName("BODY"),
    circle: document.querySelector(".circle")
};

dom.toggleSwitch.addEventListener('click', function(){
    if (dom.modeText.innerHTML === "Dark Mode") {
        dom.modeText.innerHTML = "Light Mode";
        document.body.setAttribute('data-theme', "light");
        dom.circle.classList.remove('dark');
        dom.circle.classList.add('light');
        
    } else if (dom.modeText.innerHTML === "Light Mode") {
        dom.modeText.innerHTML = "Dark Mode";
        document.body.setAttribute('data-theme', "dark");
        dom.circle.classList.remove('light');
        dom.circle.classList.add('dark');
    };
    
})