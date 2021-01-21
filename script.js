//fetching starter json data from local src folder
async function getColleges() {
    const data = await fetch('./src/colleges.json');
    const colleges = await data.json();
    return(colleges.colleges);
};

function createNewElement(elem, className){
    const newEl = document.createElement(elem);
    newEl.classList.add(className);
    return newEl;
}

//render college list 10 at a time
function renderColleges(list) {
    //render each card
    list.map(college => {
        const card = createNewElement('div', 'card');
        if(college["promoted"]){
            const promotion = createNewElement('div','promo')
            card.appendChild(promotion);
            promotion.innerHTML = "PROMOTED"
            const topright = createNewElement('div', 'topright')
            const bottomright = createNewElement('div', 'bottomright')
            promotion.appendChild(topright);
            promotion.appendChild(bottomright);
        }
        const top = createNewElement('div', 'top-block');
        const image = createNewElement('img', 'banner');
        image.src = `./src/${college['image']}`; 
        const overlay = createNewElement('div', 'banner-overlay');
        const ratingBlock = createNewElement('div', 'rating-block');

        card.appendChild(top);
        top.appendChild(image);
        top.appendChild(overlay);
        
        top.appendChild(ratingBlock);
        document.getElementById("container").appendChild(card);

        count += 1;
        console.log(count);
    });
}

let count = 0; //Global variable to keep track of card count

(async function loadPage(){
    const list = await getColleges();
    renderColleges(list.slice(0,10));
    //setup an listner and trigger below funtion with 10 list items at once.
    //renderColleges(list);

    window.addEventListener('scroll', () => {
        if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 700 && count < list.length){
            renderColleges(list.slice(count, count + 10));
        }
    })
})();
