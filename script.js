//fetching json data from local src folder
fetch('./src/colleges.json')
.then(response => response.json())
.then(data => {
    const colleges = data;
    console.log(colleges);


});