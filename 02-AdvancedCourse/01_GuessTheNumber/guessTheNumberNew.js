let dom = {
    btnPlay: document.querySelector("#btnPlay"),
    btnGuess: document.querySelector("#btnGuess"),
    btnReset: document.querySelector("#btnReset"),
    btnNewGame: document.querySelector("#btnNewGame"),
    playGround: document.querySelector(".playGround"),
    results: document.querySelector(".results"),
    userNumberInput: document.querySelector("#userNumber"),
    selectLevelTab: document.querySelector("#selectLevel"),
    guessTheNumberText: document.querySelector(".guessTheNumberText"),
    selectLevelText: document.querySelector(".selectLevelText"),
    countTries: document.querySelector("#countTries"),
    endGame: document.querySelector(".endGame"),
    dipslayLevel: document.querySelector(".dipslayLevel"),
    firstEnter: document.querySelector(".firstEnter"),
    endText: document.querySelector(".endText"),
};

let methods = {
    generateRandomNumber(start, end) {
        gameVars.randomNumber = Math.round(Math.random() * 
                                ( end - start ) + start );
    },
    displayLevel(levelName){
        dom.selectLevelTab.classList.add('hidden');
        dom.btnPlay.classList.add('hidden');
        dom.dipslayLevel.classList.remove('hidden'); 
        dom.dipslayLevel.innerHTML = `${levelName}`;
    },
    calculateTries(range) {
        for ( let i = range; i > 1; i = i / 2) {
            gameVars.tries++;
        }
        // gameVars.tries = Math.ceil(Math.log2(gameVars.maxRange - gameVars.minRange));
    },
    displayTries() {
        dom.countTries.innerHTML = 
        `you have ${gameVars.tries-gameVars.count} tries left from ${gameVars.tries}`;
    },
    displayGuessStatus(highOrLow) {
        let div = document.createElement("DIV");
        document.querySelector(".results").appendChild(div)
        div.innerHTML = `${gameVars.userNumber} - ${highOrLow}`;
    },
    userNumberIsWrong () {        
        if (gameVars.userNumber > gameVars.randomNumber) {
            methods.displayGuessStatus("High");
        } else if (gameVars.userNumber < gameVars.randomNumber){
            methods.displayGuessStatus("Low");
        }
    },
    displayFinished(status) {
        dom.playGround.classList.add('hidden');
        dom.endGame.classList.remove("hidden");
        dom.firstEnter.classList.add('hidden');
        dom.btnNewGame.classList.remove("hidden");
        
        if (status === "win") {
            dom.endText.innerText = 
            `You WIN! You guess the number ${gameVars.randomNumber} from ${gameVars.count} tries.`;
        } else if (status === "loose") {
            dom.endText.innerText = 
            `You loose! My number was: ${gameVars.randomNumber}`;
        }
        dom.btnNewGame.focus();
    },
};
let gameVars = {
    randomNumber: undefined,
    level: undefined,
    minRange: undefined,
    maxRange: undefined,
    userNumber: undefined,
    tries: 0,
    count: 0,
};
let levelDict = {
    level1: {
        minRange: 1,
        maxRange: 10,
        name: "Easy",
    },
    level2: {
        minRange: 1,
        maxRange: 50,
        name: "Medium",
    },
    level3: {
        minRange: 1,
        maxRange: 100,
        name: "Advanced",
    },
};
let gamePlay = {
    initState() {
        dom.selectLevelTab.classList.remove('hidden');
        dom.btnPlay.classList.remove('hidden');
        dom.firstEnter.classList.remove('hidden');

        dom.dipslayLevel.classList.add('hidden'); 
        dom.results.classList.add('hidden');
        dom.playGround.classList.add('hidden');
        dom.endGame.classList.add('hidden'); 

        gameVars.randomNumber = undefined;
        gameVars.level = undefined; 
        gameVars.minRange = undefined;
        gameVars.maxRange = undefined;
        gameVars.userNumber = undefined;
        gameVars.tries = 0;
        gameVars.count = 0;

        while (dom.results.children[1]) {
            dom.results.removeChild(dom.results.children[1]);
        }
        dom.selectLevelTab.focus();
    },
    selectLevel() {  
        gameVars.level = dom.selectLevelTab.value;
        gameVars.minRange = levelDict[gameVars.level].minRange;
        gameVars.maxRange = levelDict[gameVars.level].maxRange;
        gameVars.name = levelDict[gameVars.level].name
        
        // console.log(gameVars.minRange, gameVars.maxRange,gameVars.name);
        
        methods.calculateTries((gameVars.maxRange-gameVars.minRange));
        methods.displayLevel(gameVars.name);
        methods.generateRandomNumber(gameVars.minRange, gameVars.maxRange);
        methods.calculateTries(gameVars.level);
        
        console.log(`generated number: ${gameVars.randomNumber}`);
        dom.playGround.classList.remove('hidden');
        dom.guessTheNumberText.innerHTML = 
        `Guess the number I came up with, from ${gameVars.minRange} to ${gameVars.maxRange}`;
        methods.displayTries();
        dom.userNumberInput.focus();
    },
    guessTheNumber() {  
        gameVars.userNumber = dom.userNumberInput.value;
        console.log(`user number: ${gameVars.userNumber}`);
        gameVars.count = gameVars.count + 1;
        // console.log(`count: ${gameVars.count}`);
        
        if (gameVars.userNumber < gameVars.minRange || 
            gameVars.userNumber > gameVars.maxRange) {
            alert (`The number isn't in range 1 - ${gameVars.level}!`);
            dom.userNumberInput.value = "";
            gameVars.count = gameVars.count - 1;
            methods.displayTries();
        } else if ( gameVars.userNumber != gameVars.randomNumber) {
            methods.userNumberIsWrong ();
            dom.results.classList.remove('hidden');
            // gameVars.count = gameVars.count + 1;
            if (gameVars.count === gameVars.tries ){
                methods.displayFinished("loose");
            }
            methods.displayTries();
        } else if (gameVars.userNumber == gameVars.randomNumber) {
            methods.displayGuessStatus("WIN!");
            methods.displayFinished("win");
        }
        dom.userNumberInput.value="";
        dom.userNumberInput.focus();
    },
    
};

gamePlay.initState();

dom.btnPlay.addEventListener('click', gamePlay.selectLevel);
dom.selectLevelTab.addEventListener("keypress", function(e) {
    if (e.key === 'Enter') {
        gamePlay.selectLevel()
    }
});

dom.btnGuess.addEventListener('click',gamePlay.guessTheNumber);
dom.userNumberInput.addEventListener("keypress", function(e) {
    if (e.key === 'Enter') {
        gamePlay.guessTheNumber()
        dom.userNumberInput.value="";
    }
});

dom.btnReset.addEventListener('click', gamePlay.initState);
dom.btnNewGame.addEventListener('click', gamePlay.initState);