let dom = {
    questionsContainer: document.querySelector(".questionsContainer"),
};
function showHide(node) {
    if (node.classList.contains("reveal")) {
        node.classList.remove("reveal");
        node.parentElement.querySelector('.arrow').classList.remove("rotate");
        node.parentElement.children[0].classList.remove("bold");
    } else {
        for (let i = 0; i < 5; i++) {
            dom.questionsContainer.children[i*2].children[0].
                                   classList.remove("bold");
            dom.questionsContainer.children[i*2].children[1].
                                   children[0].classList.remove("rotate");                       
            dom.questionsContainer.children[i*2].children[2].
                                   classList.remove("reveal");
            }
        node.classList.add("reveal");
        node.parentElement.querySelector('.arrow').classList.add("rotate");
        node.parentElement.children[0].classList.add("bold");
    }
};
dom.questionsContainer.addEventListener("click", function(e) {
    if (e.target.className === "question") {
        let node = e.target.querySelector(".hidden");
        showHide(node);
    } else if (e.target.className === "text" || e.target.tagName === "P") {
        let node = e.target.nextElementSibling.nextElementSibling;
        showHide(node);
    } else if (e.target.className === "arrow" || 
               e.target.tagName === "SPAN" || 
               e.target.tagName === "IMG"){ 
        let node = e.target.parentElement.nextElementSibling;
        showHide(node);
    }
});