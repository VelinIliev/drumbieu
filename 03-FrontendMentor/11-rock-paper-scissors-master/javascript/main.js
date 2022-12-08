let rules = document.querySelector(".rules");
let id01 = document.querySelector("#id01");
let closeTag = document.querySelector(".closeTag");
let paper = document.querySelector(".paper");
let scissors = document.querySelector(".scissors");
let rock = document.querySelector(".rock");
let paperW = document.querySelector(".paper-w");
let scissorsW = document.querySelector(".scissors-w");
let rockW = document.querySelector(".rock-w");
let playContainer = document.querySelector(".playContainer");
let yourChoice = document.querySelector(".yourChoice");
let computerChoice = document.querySelector(".computerChoice");
let winStatusDOM = document.querySelector(".winStatus");
let playAgain = document.querySelector(".playAgain")
let scoreResult = document.querySelector(".scoreResult");
let playerResults = document.querySelector(".playerResults");
let drawResults = document.querySelector(".drawResults");
let computerResults = document.querySelector(".computerResults")


let selectedItem = "";
let randomItem = ["paper", "scissors", "rock"];
let winStaus = "";
let player = 0;
let draw = 0;
let computer = 0;

function initState() {
    paper.style.display = "block";
    scissors.style.display = "block";
    rock.style.display = "block";
    paperW.style.display = "none";
    scissorsW.style.display = "none";
    rockW.style.display = "none"; 
    paper.classList.add("clickable");
    paper.firstElementChild.classList.add("clickable");
    scissors.classList.add("clickable");
    scissors.firstElementChild.classList.add("clickable");
    rock.classList.add("clickable");
    rock.firstElementChild.classList.add("clickable");

    paper.style.top = "1.1em";
    paper.style.left = "7.3em";
    paper.style.transform = "scaleX(1) scaleY(1)";

    rock.style.top = "15.5em";
    rock.style.left = "16em";
    rock.style.transform = "scaleX(1) scaleY(1)";

    scissors.style.top = "1.1em";
    scissors.style.left = "24.6em";
    scissors.style.transform = "scaleX(1) scaleY(1)";

    playContainer.style.backgroundImage = `url(./images/bg-triangle.svg)`;
    
    rockW.style.display = "none";
    scissorsW.style.display = "none";
    paperW.style.display = "none";

    rockW.style.top = "1.1em";
    rockW.style.left = "45em";

    scissorsW.style.top = "1.1em";
    scissorsW.style.left = "45em";

    paperW.style.top = "1.1em";
    paperW.style.left = "45em";
   
    yourChoice.style.display = "none";
    computerChoice.style.display = "none";
    winStatusDOM.style.display = "none";
    playAgain.style.display = "none";

    selectedItem = "";
    winStaus = "";
};

function winCheck(randomItem, selectedItem) {
    if (randomItem === selectedItem) {
        winStaus = "DRAW";
        draw += 1; 
    } else if ( randomItem !== selectedItem) {
        if (selectedItem === "paper" && randomItem === "rock" || 
            selectedItem === "scissors" && randomItem === "paper" || 
            selectedItem === "rock" && randomItem === "scissors") {
            winStaus = "YOU WIN";
            player += 1; 
        } else {
            winStaus = "YOU LOOSE";
            computer += 1; 
        }
    }
    setTimeout(() => {
        yourChoice.style.display = "block";
        computerChoice.style.display = "block";
        winStatusDOM.style.display = "block";
        winStatusDOM.innerHTML = `${winStaus}`;
        playAgain.style.display = "block";
        playerResults.innerHTML = player;
        drawResults.innerHTML = draw;
        computerResults.innerHTML = computer;
    }, 700);
};

function displayOponentSelection() {
    
    random = Math.floor(Math.random() * 3);

    if (randomItem[random] === "rock") {
       item = rockW;
       winCheck(randomItem[random], selectedItem);
    } else if (randomItem[random] === "scissors") {
        item = scissorsW;
        winCheck(randomItem[random], selectedItem);
    } else if (randomItem[random] === "paper") {
        item = paperW;
        winCheck(randomItem[random], selectedItem);
    }
    setTimeout(() => {
        item.style.display = "block";
        item.style.top = "2em";
        item.style.left = "30em";
        item.style.transform = "scaleX(1.3) scaleY(1.3)";
    }, 500);
    // console.log(`random item: ${randomItem[x]}`);
    // console.log(`user choics: ${selectedItem}`);
    // console.log(winStaus);
    // console.log(score);
};

function displaySelectedElement(item) {
    if (item === "paper") {
        selectedItem = item;
        item = paper;
        toRemoveOne = rock;
        toRemoveTwo = scissors;
    } else if ( item === "scissors") {
        selectedItem = item;
        item = scissors;
        toRemoveOne = rock;
        toRemoveTwo = paper;

    } else if ( item === "rock") {
        selectedItem = item;
        item = rock;
        toRemoveOne = scissors;
        toRemoveTwo = paper;
    }
    toRemoveOne.style.display = "none";
    toRemoveTwo.style.display = "none";
    playContainer.style.backgroundImage = `none`;
    item.style.top = "2em";
    item.style.left = "2em";
    item.style.transform = "scaleX(1.3) scaleY(1.3)";
    displayOponentSelection();
};

initState();

rules.addEventListener("click", function() {
    if (id01.style.display==='' || id01.style.display==='none'){
        id01.style.display='block';
    } else if (id01.style.display==='block') {
        id01.style.display='none';
    }
});
closeTag.addEventListener("click",function () {
    id01.style.display='none';
});

playContainer.addEventListener("click", function(e) {
    if (e.target.classList.contains("clickable") && e.target.classList.contains('inner')) {
        e.target.classList.remove("clickable");
        e.target.parentElement.classList.remove("clickable");
        let item = e.target.parentElement.className;
        displaySelectedElement(item);
    } else if (e.target.classList.contains("clickable")) {
        e.target.classList.remove("clickable");
        e.target.firstElementChild.classList.remove("clickable");
        let item  = e.target.className;
        displaySelectedElement(item);
    }
});

playAgain.addEventListener("click", initState);