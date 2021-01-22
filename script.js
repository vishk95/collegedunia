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
        const rating = createNewElement('div', 'rating');
        const ratingRemark = createNewElement('div', 'rating-remark');
        const outFive = createNewElement('div', 'outfive');

        const topEnd = createNewElement('div', 'top-end');
        const tags = createNewElement('div', 'tags');
        college["tags"].map(tag => {
            const pill = createNewElement('div', 'pill');
            pill.innerHTML = tag;
            tags.appendChild(pill);
        });
        const ranking = createNewElement('div', 'ranking');
        const bottom = createNewElement('div', 'bottom-block');
        const name = createNewElement('div', 'name');
        name.innerHTML = college['college_name'];
        const stars = createNewElement('div', 'stars');
        for(let i=0; i < +college['rating']; i++){
            stars.innerHTML += '&#9733;'; 
        }
        name.appendChild(stars);      

        const rate = createNewElement('div', 'rate');
        rate.innerHTML = (college['original_fees']).toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).slice(0, -3);
        name.appendChild(rate);

        const discount = createNewElement('div', 'discount');
        
        discount.innerHTML = college['discount'];
        const triangle = createNewElement('div', 'triangle-left');
        discount.appendChild(triangle);
        name.appendChild(discount);

        const nearest = createNewElement('div', 'nearest');
        nearest.innerHTML = college['nearest_place'][0] + " | ";
        const nearest_nxt = createNewElement('div', 'nearest-nxt');
        nearest_nxt.innerHTML = college['nearest_place'][1];
        nearest.appendChild(nearest_nxt);

        const famousDiv = createNewElement('div', 'famous');
        const match = createNewElement('div', 'match');
        match.innerHTML = "93% Match : ";
        famousDiv.appendChild(match);
        famousDiv.innerHTML += college['famous_nearest_places'];

        const offerDiv = createNewElement('div', 'offer');
        const offerPill = createNewElement('div', 'offer-pill');
        offerPill.innerHTML = college['offertext'];
        offerDiv.appendChild(offerPill);
        const amenties = createNewElement('div', 'amenties');
        amenties.innerHTML = college['amenties'][0];
        const dot = createNewElement('div', 'dot');
        amenties.appendChild(dot);
        amenties.innerHTML += college['amenties'][1];
        offerDiv.appendChild(amenties);

        const fee = createNewElement('div', 'fee');
        fee.innerHTML = (college['discounted_fees']).toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).slice(0, -3);
        const cycle = createNewElement('div', 'cycle');
        cycle.innerHTML = college['fees_cycle'];
        
        famousDiv.appendChild(cycle);

        nearest_nxt.appendChild(fee);

        rating.innerHTML = college['rating'];
        outFive.innerHTML = '/5'
        ratingRemark.innerHTML = college['rating_remarks'];
        ratingBlock.appendChild(rating);
        ratingBlock.appendChild(outFive);
        ratingBlock.appendChild(ratingRemark);

        ranking.innerHTML = "#" + college['ranking'];

        card.appendChild(top);
        top.appendChild(image);
        top.appendChild(overlay);
        top.appendChild(ratingBlock);
        top.appendChild(topEnd);
        topEnd.appendChild(tags);
        topEnd.appendChild(ranking);

        bottom.appendChild(name);
        bottom.appendChild(nearest);
        bottom.appendChild(famousDiv);
        bottom.appendChild(offerDiv);
        card.appendChild(bottom);
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
