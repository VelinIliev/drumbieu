let bigImage = document.querySelector('.bigImage');
let caption = document.querySelector('.caption');
let btnDecrease = document.querySelector('.red_arrow_left');
let btnIncrease = document.querySelector('.red_arrow_right');
let index = 0;

let imagesPath = [];
let imagesAlt = [];

let changeThumbs = function(tmpIndex){
    bigImage.src = `${imagesPath[tmpIndex]}`;
    caption.innerHTML = imagesAlt[tmpIndex];
    index = tmpIndex;
    return index;
};
let changeOpacity = function(opacityD, opacityI) {
    btnDecrease.style.opacity = `${opacityD}`;
    btnIncrease.style.opacity = `${opacityI}`;
};
let decrease = function() {
    index = index-1; 
    if (index>=0 && index<=15) {
        changeThumbs(index)
        changeOpacity(1,1);
    } else if (index<0) {
        index=0;
        changeOpacity(0,1);
    }
};
let increase = function() {
    index = index+1;
    if (index>=0 && index<=15) {
        changeOpacity(1,1);
        changeThumbs(index)
    } else if (index>15) {
        changeOpacity(1,0);
        index=15;
    }
};
let clickThumbs = function(i) {
    document.querySelector(`.img${i}`).style.backgroundColor = "#555555";
    changeOpacity(1,1);
    changeThumbs(i);
};
for (let i = 0; i < 16; i++){
    imagesPath.push(document.querySelector(`.img${i}>:first-child`).src);
    imagesPath[i]=imagesPath[i].replace("thumbs", "BIG");
    imagesPath[i]=imagesPath[i].replace("-thumb", "");
   
    imagesAlt.push(document.querySelector(`.img${i}>:first-child`).alt);

    document.querySelector(`.img${i}`).addEventListener('click', function(){
        clickThumbs(i)
    });
};
btnDecrease.addEventListener('click', decrease);
btnIncrease.addEventListener('click', increase);


