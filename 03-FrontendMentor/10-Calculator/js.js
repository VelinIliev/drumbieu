let dom  = {
    display: document.querySelector(".display"),
    opreations: document.querySelector(".opreations")
};

let container = "";
let secondContainer = "";
let operator;

function display() {
    console.log(container);
    let resultToDisplay = container.toString();
    if (resultToDisplay.length <= 9) {
        if (resultToDisplay === "NaN"){
            dom.display.innerHTML = 'error';
        } else {
            dom.display.innerHTML = resultToDisplay;
        }
    } else if (resultToDisplay.length > 9) {
        if (resultToDisplay.includes(".") && !resultToDisplay.includes("e")) {
            let positionsToCut = resultToDisplay.length - 9;
            resultToDisplay = resultToDisplay.slice(0, -positionsToCut);
            dom.display.innerHTML = resultToDisplay;
        } else if (resultToDisplay.includes("e")) {
            dom.display.innerHTML = "too small";
        } else {
            dom.display.innerHTML = "too big";
        }
    } 
};
function preparationPhase(defineOperator) {
    if (container.length !== 0 ) {
        if (secondContainer === undefined || secondContainer.length === 0) {
            operator = defineOperator;
            secondContainer = container;
            container = "";
        }
    } else if (operator !== undefined){ 
        operator = defineOperator;
    }
};
function calculate() {
    if (container.length !== 0) {
        if (operator === "+") {
            container = secondContainer*1 + container*1;
            display();
        } else if (operator === "-") {
            container = secondContainer*1 - container*1;
            display();
        } else if (operator === "/") {
            container = (secondContainer*1) / (container*1);
            display();
        } else if (operator === "*") {
            container = (secondContainer*1) * (container*1);
            display();
        }
        operator = undefined;
        secondContainer = "";
    }
};
function reset() {
    container = "";
    secondContainer = "";
    operator = undefined;
    dom.display.innerHTML = "_";
}; 
function backspace() {
    if (typeof container === 'string') {
        container = container.slice(0, -1);
        display();
    }
};
function buttonsActions(name) {
    if (name === "1" || name === "2" || name === "3" || 
        name === "4" || name === "5" || name === "6" || 
        name === "7" || name === "8" || name === "9" || 
        name === "0" || name === ".") {
            if (container.length < 8) {
                container += name;
                display();
            }
    } else if (name === "c" || name === "C") {
        reset();
    } else if (name === "Backspace") {
        backspace();
    } else if (name === "+" || name === "-" || name === "/" || name === "*") {
        preparationPhase(name);
    } else if (name === "=" || name === "Enter") {
        calculate();
    }
};
dom.opreations.addEventListener("click", function(e) {
    if (e.target.classList.contains("button")) {
        buttonsActions(e.target.dataset.name); 
    }
}); 
document.addEventListener('keydown', function(e) {
    if (e.key === "1" || e.key === '2' || e.key === '3' ||
        e.key === '4' || e.key === '5' || e.key === '6' ||
        e.key === '7' || e.key === '8' || e.key === '9' ||
        e.key === '0' || e.key === "-" || e.key === '+' ||
        e.key === '/' || e.key === '*' || e.key === 'c' || 
        e.key === 'C' || e.key === "=" || e.key === '.' || 
        e.key === 'Enter' || e.key === "Backspace") {
        let newKey = e.key;
        if (newKey === "C") {
            newKey = "c";
        } else if (newKey === "=") {
            newKey = "Enter";
        }
        let buttonPressed = document.querySelector(`[data-name="${newKey}"]`);
        buttonPressed.classList.add('pressed');
        setTimeout( () => buttonPressed.classList.remove('pressed'), 200);
        buttonsActions(e.key);
    }
});