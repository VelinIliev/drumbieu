let ctgWords = {
    towns: ["софия", "пловдив", "варна", "бургас", "смолян"],
    fruits: ["ябълка", "круша", "праскова", "портокал", "слива"],
    vegetables: ["краставица", "домат", "морков", "зеле", "чушка"],
};
let ctgDict = {
    towns: "градове",
    fruits: "плодове",
    vegetables: "зеленчуци",
};
let dom = {
    btnOK: document.querySelector(".btnOK"),
    selectCategorie: document.querySelector('#selectCategorie'),
    playWord: document.querySelector('.playWord'),
    chosenCategorie: document.querySelector(".chosenCategorie"),
    categorie: document.querySelector(".categorie"),
    displayAlphabet: document.querySelector(".displayAlphabet"),
    btnNewGame: document.querySelector(".btnNewGame"),
    hangManImage: document.querySelector("#hangManImage"),
    finalState: document.querySelector('.finalState'),
    remainingAttempts: document.querySelector('.remainingAttempts'),
    container: document.querySelector('.container'),
    wordToguess: document.querySelector('.wordToguess')
};
let imgDict = {
    img00: "images/hangman_00.svg",
    img1: "images/hangman_1.svg",
    img2: "images/hangman_2.svg",
    img3: "images/hangman_3.svg",
    img4: "images/hangman_4.svg",
    img5: "images/hangman_5.svg",
    img6: "images/hangman_6.svg",
    img7: "images/hangman_7.svg",
    img8: "images/hangman_8.svg",
    img9: "images/hangman_9.svg",
    img10: "images/hangman_10.svg",
    img11: "images/hangman_11.svg",
    img12: "images/hangman_12.svg",
    img13: "images/hangman_13.svg",
    img14: "images/hangman_14.svg",
    img15: "images/hangman_15.svg",
    imgWin: "images/hangman_win.svg",
    backgroundWin: "images/background_win.jpg",
    background: "images/background.jpg",
    imgLoose: "images/hangman_loose.svg",
};
let wordToGuess;
let displayWord_ = []; 
let countTries = 0;

function displayTries() {
    dom.remainingAttempts.innerHTML = `Остават ви ${14-countTries} опита.`
};
function displayWord(){
    dom.playWord.innerHTML = displayWordToString();
};
function displayWordToString() {
    let str = "";
    for (let i = 0; i < displayWord_.length; i++) {
        str = str + displayWord_[i];
    }
    return str;
};
function displayImage() {
    if (countTries<15) {
        let img = `img`+`${countTries}`
        dom.hangManImage.src = imgDict[img];
        if (countTries === 14) {
            loosing();
        } 
    }
};
function loosing() {
    dom.playWord.classList.add('hidden');
    dom.finalState.classList.remove('hidden');
    dom.displayAlphabet.classList.add('hidden');
    dom.chosenCategorie.classList.add('hidden');
    dom.remainingAttempts.classList.add('hidden');
    dom.wordToguess.classList.remove('hidden');
    dom.finalState.innerHTML = "ЗАГУБА";
    dom.hangManImage.src = imgDict.imgLoose;
    dom.wordToguess.innerHTML = `Думата беше: ${wordToGuess}.`
};
function winning(){
    dom.playWord.classList.add('hidden');
    dom.finalState.classList.remove('hidden');
    dom.displayAlphabet.classList.add('hidden');
    dom.chosenCategorie.classList.add('hidden');
    dom.remainingAttempts.classList.add('hidden');
    dom.container.style.backgroundImage = `url('${imgDict.backgroundWin}')`;
    dom.finalState.innerHTML = "ПОБЕДА";
    dom.hangManImage.src = imgDict.imgWin;
};
function chekForWIn() {
    let stringToGoIntoTheRegex1 = displayWordToString();
    let re = new RegExp(stringToGoIntoTheRegex1);
    if (wordToGuess.match(re)) {
        winning();
    } else {
        // console.log("not yet");
    }
};


function selectCategories(selectedCategorie) {
    let randomNumber = Math.round(Math.random() * ( (ctgWords[selectedCategorie].length-1) - 0 ) + 0 ) ;
    wordToGuess = ctgWords[selectedCategorie][randomNumber];
    console.log(wordToGuess);
    for (let i = 1; i < wordToGuess.length+1; i++) {
        displayWord_.push("_");
    };
    dom.categorie.classList.add('hidden');
    dom.chosenCategorie.classList.remove('hidden');
    dom.btnNewGame.classList.remove('hidden');
    dom.chosenCategorie.innerHTML = `Избрали сте категоря ${ctgDict[selectedCategorie]}.`;
    dom.displayAlphabet.classList.remove('hidden');
    dom.remainingAttempts.classList.remove('hidden');
    displayWord();
    displayTries();
};
function play(letter) {
    let stringToGoIntoTheRegex = letter;
    let re = new RegExp(stringToGoIntoTheRegex);
    if (re.test(wordToGuess)) {
        for (let i = 0; i < wordToGuess.length; i++) {
            if (wordToGuess[i] === letter) {
                displayWord_.splice(i, 1, letter);
                displayWord();
            }
        }
        chekForWIn();
    } else {
        countTries++;
        displayImage();
        chekForWIn();
        displayTries();
    }
};
function initState() {
    dom.container.style.backgroundImage = `url('${imgDict.background}')`;
    dom.categorie.classList.remove('hidden');
    dom.chosenCategorie.classList.add('hidden');
    dom.displayAlphabet.classList.add('hidden');
    dom.finalState.classList.add('hidden');
    dom.btnNewGame.classList.add('hidden');
    dom.playWord.classList.remove('hidden');
    dom.remainingAttempts.classList.add('hidden');
    dom.wordToguess.classList.add('hidden');
    dom.playWord.innerHTML = "";
    displayWord_ = [];
    countTries = 0;
    dom.hangManImage.src = imgDict.img00;
    for (let i = 0; i < 30; i++) {
        dom.displayAlphabet.children[i].classList.remove('hideLetters');
    }
};

initState();

dom.btnNewGame.addEventListener('click', initState);

dom.btnOK.addEventListener('click', function() {
    let selectedCategorie = dom.selectCategorie.value;
    selectCategories(selectedCategorie);
});
document.addEventListener('click', function (e) {
    if (e.target.className === "letters") {
        e.target.classList.add("hideLetters")
        play(e.target.innerHTML);
    }
});