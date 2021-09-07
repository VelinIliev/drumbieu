const sandwichMenu = document.querySelector(".sandwichMenu");

sandwichMenu.addEventListener("click", function() {
    const dropdown = document.querySelector(".dropdown");
    dropdown.classList.toggle("active");
    
    const line = document.querySelectorAll(".line");
    line.forEach(el => {
        el.classList.toggle ("activated")
    })
});