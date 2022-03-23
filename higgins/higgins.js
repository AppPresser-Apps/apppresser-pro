console.log('higgins js loaded');


console.log('custom opw block');

async function higgins_opw_block() {

    const content = document.querySelector('#higgins-homepage');
 
    content.innerHTML = '';

    var latitude = '';
    var longitude = '';

    const position = await getLongAndLat();
    console.log(position);

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    const $api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=<?php echo $api_key; ?>&cnt=5&units=imperial&exclude=minutely,alerts`;

    const response = await fetch($api);
    const data = await response.json();

    console.log('custom', data);

    content.innerHTML = `<div>this is the custom block</div>`;
}
setTimeout(() => {
higgins_opw_block();
}, 500);