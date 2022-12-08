// 10K PAGEVIEWS $8.00
// 50K PAGEVIEWS $12.00
// 100K PAGEVIEWS $16.00
// 500K PAGEVIEWS $24.00
// 1M PAGEVIEWS $36.00
let dom = {
    priceValue: document.querySelector(".priceValue"),
    previewsValue: document.querySelector(".previewsValue"),
    slider: document.querySelector(".slider"),
    toggle: document.querySelector(".toggle"),
    circle: document.querySelector(".circle")
};

let multiplicator = 1;
let data = {
    pageviews: ["10K", "50K", "100K", "500K", "1M" ], 
    price: [8, 12, 16, 24, 36 ]
};

function render() {
    let x = dom.slider.value;
    dom.slider.style.background = `linear-gradient(90deg, 
                                    var(--sliderBackround) ${x*25}%, 
                                    var(--emptySliderBar) ${x*25}%)`;
    dom.previewsValue.innerHTML = data.pageviews[x];
    dom.priceValue.innerHTML = (data.price[x]*multiplicator).toFixed(2);
};

function toggle() {
    if (dom.circle.classList.contains("monthly")){
        dom.circle.classList.remove("monthly");
        dom.circle.classList.add("yearly");
        dom.toggle.style.backgroundColor = "var(--sliderBackround)"
        multiplicator = .75;

    } else if (dom.circle.classList.contains("yearly")) {
        dom.circle.classList.remove("yearly");
        dom.circle.classList.add("monthly")
        dom.toggle.style.backgroundColor = "var(--toggleBackground)"
        multiplicator = 1;
    }
    render();
}

dom.slider.addEventListener("input", render);

dom.toggle.addEventListener("click", toggle);
