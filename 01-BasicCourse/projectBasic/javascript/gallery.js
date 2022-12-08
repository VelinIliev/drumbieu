let btnDecrease = document.querySelector('.red_arrow_left');
let btnIncrease = document.querySelector('.red_arrow_right');
btnIncrease.style = "cursor: pointer";
btnDecrease.style = "cursor: pointer";

let BigImagesPath = [];
let SmallImagesPath = [];
let imagesAlt = [];

let reInitialiasing = function() {  
    for (i = 0; i < 16; i++) { 
        document.querySelector(`.img${i}>:first-child`).src = SmallImagesPath[i];
  
    };
    let bigImage = document.querySelector('.bigImage');
    let caption = document.querySelector('.caption');
    bigImage.src = BigImagesPath[0];
    caption.innerHTML = imagesAlt[0];
};
let rotateUp = function(array) {
    let lastElement = array.pop();
    array.unshift(lastElement);
};
let rotateDown = function(array) {
    let firstElementAlt = array.shift();
    array.push(firstElementAlt);
};
let decrease = function(rotations) {
    for (i = 0; i < rotations; i++) {
        rotateUp(imagesAlt);
        rotateUp(BigImagesPath);
        rotateUp(SmallImagesPath);
    };
    reInitialiasing();
};
let increase = function(rotations) {
    for (i = 0; i < rotations; i++) {
        rotateDown(imagesAlt);
        rotateDown(BigImagesPath);
        rotateDown(SmallImagesPath);
    };
    reInitialiasing();
};

for (let i = 0; i < 16; i++) {
    SmallImagesPath.push(document.querySelector(`.img${i}>:first-child`).src);
    
    BigImagesPath.push(SmallImagesPath[i]);
    BigImagesPath[i] = BigImagesPath[i].replace("thumbs", "BIG");
    BigImagesPath[i] = BigImagesPath[i].replace("-thumb", "");
    
    imagesAlt.push(document.querySelector(`.img${i}>:first-child`).alt);

    document.querySelector(`.img${i}`).style = "cursor: pointer";

    document.querySelector(`.img${i}`).addEventListener('click', function() {
        increase(i);
    });
};
function incr(){
    return increase(1)
}
function decr(){
    return decrease(1)
}
btnIncrease.addEventListener('click', incr)
btnDecrease.addEventListener('click', decr)



