const secTextTop = document.querySelector(".secTextTop");
const secTextBot = document.querySelector(".secTextBot");
const minTextTop = document.querySelector(".minTextTop");
const minTextBot = document.querySelector(".minTextBot");
const hourTextTop = document.querySelector(".hourTextTop");
const hourTextBot = document.querySelector(".hourTextBot");
const dayTextBot = document.querySelector(".dayTextBot");
const dayTextTop = document.querySelector(".dayTextTop");

const second = 1000;
const minute = second*60;
const hour = minute*60;
const day = hour*24;

let birthday = "Nov 23, 2023 00:00:00";
let countDown = new Date(birthday).getTime();

function dropDownBlock(textTop, textBottom) {
    let topBox = textTop.parentElement;
    let bottomBox = textBottom.parentElement;
    
    topBox.style.transformOrigin = "bottom right";
    bottomBox.style.transformOrigin = "top center";
    
    topBox.style.transform = "scaleY(0.1) skew(-30deg, 0deg)";
    setTimeout(function(){
        topBox.style.transform = "scaleY(1)";
        bottomBox.style.transform = "scaleY(0.1) skew(30deg, 0deg) ";
        setTimeout(function(){
            bottomBox.style.transform = "scaleY(1)";
        },100)
    },100)
};

setInterval(function() {
    let now = new Date().getTime();
    let distance = countDown - now;
    
    let days = Math.floor(distance / day);
    let hours = Math.floor((distance % day) / hour);
    let minutes = Math.floor((distance % hour) / minute);
    let seconds = Math.floor((distance % minute) / second); 
    // console.log(now);
    // console.log(`day: ${(distance/day)}`)
    // console.log(`hour: ${(distance%day)/hour}`);
    // console.log(`minute: ${(distance%hour)/minute}`);
    // console.log(`second: ${(distance%minute)/second}`);

    days = (days < 10) ? `0${days}` : days;
    hours = (hours < 10) ? `0${hours}` : hours;
    minutes = (minutes < 10) ? `0${minutes}` : minutes;
    seconds = (seconds < 10) ? `0${seconds}` : seconds;
    
    dayTextBot.innerHTML = dayTextTop.innerHTML = days;
    hourTextTop.innerHTML = hourTextBot.innerHTML = hours;
    minTextTop.innerHTML = minTextBot.innerHTML = minutes;
    secTextTop.innerHTML = secTextBot.innerHTML = seconds;
    
    dropDownBlock(secTextTop, secTextBot);
    
    if (seconds === 59 || seconds === "59") {
        dropDownBlock(minTextTop, minTextBot);
    };
    if (minutes === 59 && seconds === 59 || 
        minutes === "59" && seconds === "59")  {
        dropDownBlock(hourTextTop, hourTextBot);
    };
    if (hours === 23 && minutes === 59 && seconds === 59 || 
        hours === "23" && minutes === "59" && seconds === "59") {
        dropDownBlock(dayTextTop, dayTextBot);
    }
    // console.log(typeof(seconds));
}, 1000);




