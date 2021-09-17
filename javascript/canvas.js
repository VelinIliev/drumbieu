const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
let stars = [];
let fallingStars = [];
let count = 0;

let randomRange = ( (min, max) => (( Math.random() * (max - min ) ) + min));

let randomColor = () =>  
            `rgba(  ${randomRange(250, 255).toFixed(0)},
                    ${randomRange(250, 255).toFixed(0)},
                    ${randomRange(250, 255).toFixed(0)},
                    ${randomRange(.4, .6).toFixed(1)})`;

let fillingStarsArr = ( (x,y) => {
    let element = {
        x_position: x,
        y_position: y,
        radius: randomRange(.5,1.5).toFixed(1),
        x_move: randomRange(-1,1).toFixed(1),
        y_move: randomRange(-1,1).toFixed(1),
    };
    stars = [...stars, element]

    while (stars.length > 500) {
        stars.shift()
    }
});
let creatingFallingStar = () => {
    let y_move_random_direction = [1,-1];
        let leftOrRight = y_move_random_direction[randomRange(0,1).toFixed(0)];
        let element1 = {
            x_position: randomRange(canvas.width/2-canvas.width/4, canvas.width/2+canvas.width/4),
            y_position: 0,
            radius: randomRange(2,4).toFixed(1),
            x_move: (randomRange(0,4).toFixed(0))*leftOrRight,
            y_move: 20,
        };
        fallingStars = [...fallingStars, element1];
        let element2 = {
            x_position: element1.x_position-1*leftOrRight,
            y_position: element1.y_position-5,
            radius: element1.radius - .5,
            x_move: element1.x_move,
            y_move: element1.y_move,
        };
        fallingStars = [...fallingStars, element2];
        let element3 = {
            x_position: element1.x_position-2*leftOrRight,
            y_position: element1.y_position-10,
            radius: element1.radius - 1,
            x_move: element1.x_move,
            y_move: element1.y_move,
        };
        fallingStars = [...fallingStars, element3];
}

const clearScreen = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

function draw() {
    let [x, y] = [randomRange(0, canvas.width).toFixed(0), randomRange(0, canvas.height).toFixed(0)];

    fillingStarsArr(x, y); 
    
    clearScreen();

    stars.forEach( (el) => {
        ctx.fillStyle = randomColor();
        
        ctx.beginPath();
        ctx.arc(el.x_position, el.y_position, el.radius, 0, Math.PI * 2, true);
        ctx.fill();
        
        el.x_position = el.x_position*1 + el.x_move*1;
        el.y_position = el.y_position*1 + el.y_move*1;
    });
    count++;
    
    if (count === 240 ) {
        creatingFallingStar();
        
        count = 0;
    }
    
    fallingStars.forEach( (el) => {
        ctx.fillStyle = `rgba(255,255,255,.7)`;
        
        ctx.beginPath();
        ctx.arc(el.x_position, el.y_position, el.radius, 0, Math.PI * 2, true);
        ctx.fill();
        
        el.x_position = el.x_position*1 + el.x_move*1;
        el.y_position = el.y_position*1 + el.y_move*1;
        if (el.x_position > canvas.width 
                || el.x_position < 0 
                || el.y_position > canvas.height 
                || el.y_position < -50) {

            fallingStars=[]
        };
    });
    requestAnimationFrame(draw);
};

let resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

window.addEventListener('load', function() {
    resize(); 
    draw();
});

window.addEventListener('resize', resize);

window.addEventListener('mousemove', function(e) {
    fillingStarsArr(e.x, e.y)
}, false);